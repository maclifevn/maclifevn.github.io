# MFinder landing page

Landing page tĩnh, không cần build tool hoặc dependency bên ngoài.

## Chạy local

Từ thư mục gốc project:

```bash
python3 -m http.server 8080
```

Mở `http://localhost:8080/Website/`.

CTA tải app trỏ tới DMG mới nhất trên GitHub Releases. Có thể serve trực tiếp
thư mục `Website` hoặc serve từ thư mục gốc như ví dụ trên.

## Chụp kiểm tra responsive

```bash
node Website/tools/capture-page.mjs \
  http://localhost:8080/Website/ /tmp/mfinder-mobile.png 390 844 2
```

Thêm đối số `full` ở cuối để chụp toàn bộ chiều dài trang.
