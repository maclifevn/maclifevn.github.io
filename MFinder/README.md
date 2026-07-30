# MFinder landing page

Landing page tĩnh, không cần build tool hoặc dependency bên ngoài.

## Chạy local

Từ thư mục gốc project:

```bash
python3 -m http.server 8080
```

Mở `http://localhost:8080/Website/`.

CTA tải app trỏ tới bản build trong `dist/`, vì vậy nên serve từ thư mục gốc
thay vì chỉ serve riêng thư mục `Website`.

## Chụp kiểm tra responsive

```bash
node Website/tools/capture-page.mjs \
  http://localhost:8080/Website/ /tmp/mfinder-mobile.png 390 844 2
```

Thêm đối số `full` ở cuối để chụp toàn bộ chiều dài trang.
