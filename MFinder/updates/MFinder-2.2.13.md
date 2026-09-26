# MFinder 2.2.13

## English

1. Fixed Preview filmstrip thumbnails failing to load after resizing the filmstrip. Previously they showed an error badge until Preview was closed and reopened.
2. Filmstrip thumbnails now retry briefly when memory is temporarily busy, for example while a large RAW photo opens, instead of showing an error.
3. Zooming back into a large JPEG (over 32 megapixels) after Fit is now immediate and no longer rewrites the full-resolution image to disk each time.
4. Fixed a Folder Sync crash when a network share contains two file names that differ only in Unicode normalization, such as the same Vietnamese name saved by different systems. These names are reported as conflicts, and Mirror never moves them or their folder to the Trash.
5. Prevented a potential crash in recent Folder Size results when the same folder was recorded under two Unicode spellings.
6. The memory warning now ignores the temporary memory reserved while a RAW photo is being decoded, reducing false warnings that paused AI indexing until restart on Macs with 8–12 GB of memory.
7. Improved Preview stability by hardening the viewer background and Pen suggestion drawing code that could crash in earlier versions.

## Tiếng Việt

1. Sửa lỗi thumbnail trong filmstrip của Preview không tải được sau khi kéo đổi kích thước filmstrip. Trước đây thumbnail hiện biểu tượng lỗi cho đến khi đóng và mở lại Preview.
2. Thumbnail trong filmstrip tự thử lại khi bộ nhớ đang tạm bận, ví dụ lúc mở ảnh RAW lớn, thay vì báo lỗi.
3. Phóng to lại ảnh JPEG lớn (trên 32 megapixel) sau khi bấm Fit giờ hiển thị ngay và không còn ghi lại toàn bộ ảnh độ phân giải đầy đủ xuống ổ đĩa mỗi lần.
4. Sửa lỗi crash của Folder Sync khi ổ mạng chứa hai tên tệp chỉ khác nhau về chuẩn hoá Unicode, ví dụ cùng một tên tiếng Việt được lưu bởi các hệ thống khác nhau. Các tên này được báo là xung đột, và chế độ Mirror không bao giờ đưa chúng hoặc thư mục chứa chúng vào Thùng rác.
5. Phòng ngừa lỗi crash trong danh sách Folder Size gần đây khi cùng một thư mục được ghi dưới hai cách viết Unicode.
6. Cảnh báo bộ nhớ giờ không tính phần bộ nhớ tạm dành cho việc giải mã ảnh RAW, giảm các cảnh báo nhầm từng làm tạm dừng AI indexing cho đến khi khởi động lại trên máy Mac 8–12 GB bộ nhớ.
7. Cải thiện độ ổn định của Preview bằng cách gia cố mã vẽ nền trình xem và gợi ý nét Pen, vốn có thể gây crash ở các phiên bản trước.
