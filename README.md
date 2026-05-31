# Wedding Invitation Website

Bộ source website thiệp cưới online dạng tĩnh, giống phong cách CineLove: mobile-first, pastel, album ảnh, countdown, bản đồ, RSVP, QR mừng cưới.

## Cách chạy nhanh

Cài Node.js, sau đó mở terminal trong thư mục này:

```bash
npm install
npm run dev
```

Mở link Vite hiển thị trên terminal, thường là:

```txt
http://localhost:5173
```

## Cách sửa thông tin

Mở file `index.html` và thay:

- Tên cô dâu/chú rể
- Ngày cưới
- Địa điểm
- Số điện thoại
- QR ngân hàng
- Link Google Maps
- Ảnh cưới

Mở file `src/main.js` và sửa ngày cưới ở dòng:

```js
const WEDDING_DATE = new Date('2026-12-22T17:00:00+07:00');
```

## Thay ảnh cưới

Cách đơn giản nhất: thay các link ảnh `https://images.unsplash.com/...` trong `index.html` bằng ảnh thật của bạn.

Hoặc bạn có thể đặt ảnh vào thư mục:

```txt
assets/images/
```

Ví dụ:

```html
<img src="./assets/images/anh-cuoi-1.jpg" alt="Ảnh cưới" />
```

## Thêm nhạc nền

Đặt file nhạc vào:

```txt
assets/music/wedding-music.mp3
```

Sau đó nút nhạc sẽ hoạt động.

## Deploy lên Vercel

```bash
npm run build
```

Sau đó upload project lên GitHub và import vào Vercel.

## Lưu ý RSVP

Bản hiện tại lưu RSVP vào `localStorage` trên trình duyệt để demo. Nếu muốn nhận phản hồi thật, nên đổi form sang Google Form hoặc Formspree.
