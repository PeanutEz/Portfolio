# Luke — Backend Portfolio

Portfolio cho Luke (嘉乐), dựa trên `docs/portfolio-nextjs-guide.md` và profile đã cung cấp. Giao diện doanh nghiệp với nền trắng, chữ navy và điểm nhấn xanh dương. Guide trong `docs/` giữ lại bản gốc; bảng màu hiện tại nằm trong `:root` của `src/app/globals.css`. Sử dụng Next.js App Router, TypeScript, Tailwind CSS 4, Framer Motion, Lenis và font Geist lưu cục bộ.

## Chạy local

```sh
npm install
npm run dev
```

Mở http://localhost:3000. Project dùng Node.js 22.x, được cố định trong `package.json` và `.nvmrc`.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Cấu trúc thư mục

```text
portfolio/
├── src/
│   ├── app/               # Trang chính, layout, CSS, metadata và API
│   │   └── api/hello/     # Endpoint thật cho terminal tương tác
│   ├── components/       # Navbar, Footer, terminal, modal, motion
│   │   └── sections/     # Hero, About, Skills, Projects, Approach, Contact
│   ├── data/             # Toàn bộ nội dung portfolio
│   └── lib/              # Kiểm tra và đọc cấu hình liên hệ
├── docs/                 # Guide thiết kế ban đầu
├── tests/                # Playwright và accessibility checks
├── .env.example          # Mẫu cấu hình liên hệ
└── package.json          # Lệnh chạy, build, lint và test
```

`src/app/page.tsx` chỉ ghép các section. Muốn đổi nội dung, bắt đầu từ `src/data/portfolio.ts`. Chạy `npm run format` để định dạng code.

## Cá nhân hóa

- `src/data/portfolio.ts`: profile, tech stack, capabilities, concept studies.
- `src/app/page.tsx`: lời giới thiệu, cách làm việc, bố cục các section.
- `src/app/globals.css`: màu sắc, typography, responsive.
- `src/app/layout.tsx`: SEO metadata.
- `src/app/opengraph-image.tsx`: ảnh chia sẻ mạng xã hội.

Email liên hệ mặc định là `lacpham985@gmail.com`, khai báo tại `src/data/portfolio.ts`. Có thể ghi đè bằng `NEXT_PUBLIC_CONTACT_EMAIL`. Copy `.env.example` thành `.env.local` nếu muốn đổi email hoặc bổ sung GitHub, LinkedIn và domain riêng. Nút email và social links chỉ xuất hiện khi có giá trị hợp lệ. Khởi động lại dev server hoặc build lại sau khi đổi env. Nút email mở ứng dụng mail của người xem; website không lưu hoặc gửi tin nhắn.

Ba exploration được ghi rõ là **concept studies**, không phải dự án thực tế đã hoàn thành. Thay bằng dự án và link thật khi có. Không có số liệu, công ty hay kinh nghiệm được bịa. Section approach thay cho career timeline chưa có dữ liệu.

## Tương tác

- Terminal gọi endpoint thật `/api/hello`, có trạng thái pending, success và retry.
- Dialog chi tiết concept hỗ trợ bàn phím, Escape và khôi phục focus.
- Điều hướng có active states và menu mobile.
- Intro chạy một lần mỗi session. Smooth scroll và reveal tôn trọng reduced motion. Nội dung SSR đọc được khi tắt JavaScript.
- Font, minh họa và favicon nằm cục bộ.

## Kiểm tra trình duyệt

```sh
npm run test:e2e
```

Tests mặc định dùng Microsoft Edge trên Windows. Đặt `PLAYWRIGHT_CHANNEL=chromium` để dùng Chromium của Playwright, sau khi cài bằng `npx playwright install chromium`.

## Deploy lên Vercel

Project đã có `vercel.json` cho Next.js, cài bằng `npm ci`, build bằng `npm run build`, Node.js 22.x và API region Singapore (`sin1`). Không cần đặt Output Directory hoặc thêm rewrite catch-all. Trang và tài nguyên tĩnh vẫn được Vercel phân phối qua CDN.

### Qua GitHub

1. Đẩy source lên repository GitHub, bao gồm `package-lock.json` và `vercel.json`.
2. Trong Vercel chọn **Add New → Project → Import Git Repository**.
3. Chọn thư mục chứa `package.json` làm **Root Directory** (`./` nếu repo chỉ chứa project này). Framework chọn **Next.js**; giữ Build/Install Command theo config.
4. Trong **Environment Variables**, thêm các giá trị liên hệ bên dưới nếu đã có. Website vẫn build được khi bỏ trống.
5. Bấm **Deploy**. Sau deploy, kiểm tra trang chủ, `/api/hello`, nút Send request và ảnh `/opengraph-image`.

| Biến                        | Giá trị                                  |
| --------------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email thật của bạn                       |
| `NEXT_PUBLIC_GITHUB_URL`    | URL GitHub bắt đầu bằng https://         |
| `NEXT_PUBLIC_LINKEDIN_URL`  | URL LinkedIn bắt đầu bằng https://       |
| `NEXT_PUBLIC_SITE_URL`      | Tùy chọn: domain chính thức gồm https:// |

Nếu chưa có domain riêng, để trống `NEXT_PUBLIC_SITE_URL`: metadata tự dùng `VERCEL_PROJECT_PRODUCTION_URL`, rồi `VERCEL_URL`. Không đặt localhost trên Production. Giữ bật **Automatically expose System Environment Variables** trong Project Settings. Thay env hoặc domain thì redeploy để cập nhật trang đã prerender.

### Qua CLI

Từ thư mục project, sau khi đăng nhập tài khoản Vercel:

```sh
npx vercel
npx vercel --prod
```

Lệnh đầu tạo preview và liên kết project; lệnh sau deploy production. Thư mục `.vercel/` được gitignore. `.vercelignore` loại bỏ thư viện cục bộ, build cache, guide và artifacts kiểm tra khỏi upload CLI.

Tham khảo: [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json), [Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [System environment variables](https://vercel.com/docs/environment-variables/system-environment-variables).
