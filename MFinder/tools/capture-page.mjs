#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url, output, rawWidth = '1440', rawHeight = '1000', rawScale = '1', rawMode = 'viewport'] = process.argv.slice(2);
if (!url || !output) {
  console.error('Usage: capture-page.mjs <url> <output.png> [width] [height] [scale]');
  process.exit(2);
}

const width = Number(rawWidth);
const height = Number(rawHeight);
const deviceScaleFactor = Number(rawScale);
const fullPage = rawMode === 'full';
const profile = await mkdtemp(join(tmpdir(), 'mfinder-chrome-'));
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--remote-debugging-port=0',
  `--user-data-dir=${profile}`,
  'about:blank',
], { stdio: 'ignore' });

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

try {
  let port;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const activePort = await readFile(join(profile, 'DevToolsActivePort'), 'utf8');
      port = activePort.split('\n')[0];
      break;
    } catch {
      await delay(50);
    }
  }
  if (!port) throw new Error('Chrome DevTools port was not ready.');

  const targetResponse = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent('about:blank')}`, { method: 'PUT' });
  const target = await targetResponse.json();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  let commandID = 0;
  const pending = new Map();
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });

  const command = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++commandID;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

  await command('Page.enable');
  await command('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor,
    mobile: width <= 600,
    screenWidth: width,
    screenHeight: height,
  });
  await command('Page.navigate', { url });
  await delay(1800);
  if (fullPage) {
    await command('Runtime.evaluate', {
      expression: `document.querySelectorAll('img[loading="lazy"]').forEach((image) => { image.loading = 'eager'; })`,
    });
    await delay(650);
    const initialMetrics = await command('Page.getLayoutMetrics');
    const initialSize = initialMetrics.cssContentSize ?? initialMetrics.contentSize;
    const scrollStep = Math.max(600, Math.floor(height * 0.8));
    for (let y = 0; y < initialSize.height; y += scrollStep) {
      await command('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` });
      await delay(90);
    }
  }
  await command('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
  if (fullPage) {
    await command('Runtime.evaluate', {
      expression: `document.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'))`,
    });
  }
  await delay(150);
  if (process.env.CAPTURE_DEBUG) {
    const debug = await command('Runtime.evaluate', {
      expression: `JSON.stringify({
        innerWidth,
        innerHeight,
        scrollY,
        hero: document.querySelector('.hero')?.getBoundingClientRect().toJSON(),
        copy: document.querySelector('.hero-copy')?.getBoundingClientRect().toJSON(),
        visual: document.querySelector('.hero-visual')?.getBoundingClientRect().toJSON(),
        heroWindow: document.querySelector('.hero-window')?.getBoundingClientRect().toJSON(),
        search: document.querySelector('.floating-search')?.getBoundingClientRect().toJSON()
      })`,
      returnByValue: true,
    });
    console.error(debug.result.value);
  }
  const screenshotOptions = {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: fullPage,
  };
  if (fullPage) {
    const metrics = await command('Page.getLayoutMetrics');
    const size = metrics.cssContentSize ?? metrics.contentSize;
    screenshotOptions.clip = { x: 0, y: 0, width: size.width, height: size.height, scale: 1 };
  }
  const result = await command('Page.captureScreenshot', screenshotOptions);
  await writeFile(output, Buffer.from(result.data, 'base64'));
  socket.close();
} finally {
  chrome.kill('SIGTERM');
  await delay(100);
  await rm(profile, { recursive: true, force: true });
}
