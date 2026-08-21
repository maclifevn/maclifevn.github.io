# MFinder 1.6.0

## English

- Add a native Finder Action Extension so MFinder actions work from system Quick Actions across local files, iCloud/File Provider locations, and external volumes without changing Finder Sync scope or volume icons.
- Add a contextual MFinder action picker that preserves the existing validation, operation history, undo, and error-handling routes for rename, PDF, copy/move, and folder protection tools.
- Safely hand off only original in-place File Provider URLs, preserve multi-selection order, wake the host app through a durable App Group queue, and keep the extension context alive until the host writes its acknowledgement receipt.
- Match Finder file selections explicitly and expose a template-icon toolbar item so MFinder Actions remains discoverable for local, File Provider, and external-volume items.
- Add a toolbar-only Finder Automation fallback to the existing MFinder button when Finder Sync cannot return a cloud selection, without changing the established local/context-menu rows from 1.5.2.
- Add a Finder-only macOS Service entry so `MFinder Actions…` can appear directly in Finder's context menu and reuse the same picker for local, File Provider, and external-volume selections.

## Tiếng Việt

- Thêm Finder Action Extension chuẩn để dùng MFinder từ Quick Actions trên file local, iCloud/File Provider và ổ ngoài mà không mở rộng Finder Sync scope hoặc đổi icon volume.
- Thêm picker action theo ngữ cảnh, tiếp tục dùng chung validation, lịch sử thao tác, undo và xử lý lỗi hiện có cho đổi tên, PDF, copy/move và bảo vệ folder.
- Chỉ bàn giao URL gốc in-place của File Provider, giữ đúng thứ tự multi-selection, wake app qua App Group queue bền vững và giữ extension context đến khi host ghi receipt xác nhận.
- Match trực tiếp selection dạng file của Finder và thêm toolbar item dùng template icon để Tác vụ MFinder luôn xuất hiện với file local, File Provider và ổ ngoài.
- Thêm fallback Tự động hóa Finder chỉ cho toolbar của nút MFinder cũ khi Finder Sync không trả được cloud selection, không thay đổi các row local/context menu đã ổn định trong 1.5.2.
- Thêm macOS Service chỉ dành cho Finder để `Tác vụ MFinder…` có thể xuất hiện trực tiếp trong menu chuột phải và dùng chung picker cho selection local, File Provider và ổ ngoài.
