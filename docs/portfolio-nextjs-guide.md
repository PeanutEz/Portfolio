# 🔴 Portfolio Next.js – Tông đỏ, mượt, có Loading & Scroll Reveal

Tài liệu này mô tả ý tưởng, thiết kế và code mẫu để làm website portfolio bằng **Next.js (App Router)**.

---

## 1. Mục tiêu

- Giao diện **màu đỏ dễ nhìn** (không chói mắt, dùng đỏ trầm + nền tối/kem).
- **UI/UX mượt**: smooth scroll, hover tinh tế, animation nhẹ.
- **Scroll xuống thì thông tin hiện dần** (fade + trượt lên).
- Có **trang Loading** (intro) trước khi vào web.
- Responsive (mobile / tablet / desktop).

---

## 2. Tech stack

| Công nghệ | Dùng để |
|---|---|
| Next.js 14/15 (App Router) | Framework |
| TypeScript | Type an toàn |
| Tailwind CSS | Styling nhanh |
| Framer Motion | Animation, scroll reveal, loading |
| Lenis | Smooth scroll |
| next/font | Font tối ưu |
| Vercel | Deploy |

### Khởi tạo

```bash
npx create-next-app@latest my-portfolio --typescript --tailwind --app --eslint
cd my-portfolio
npm install framer-motion lenis lucide-react
npm run dev
```

---

## 3. Bảng màu (đỏ dễ nhìn)

Tránh đỏ thuần `#FF0000` vì rất chói. Dùng đỏ **crimson / coral trầm** kết hợp nền tối ấm.

### Dark theme (khuyên dùng)

| Vai trò | Màu | Hex |
|---|---|---|
| Background | Đen ấm | `#0F0A0B` |
| Surface (card) | Nâu đỏ đậm | `#1A1214` |
| Border | Đỏ rất tối | `#2E1B1E` |
| Primary | Đỏ crimson | `#E5484D` |
| Primary hover | Đỏ coral nhạt | `#F2777A` |
| Primary đậm | Đỏ rượu | `#B3282D` |
| Text chính | Kem | `#F5EDEE` |
| Text phụ | Xám hồng | `#A89497` |

### Light theme (tuỳ chọn)

| Vai trò | Hex |
|---|---|
| Background | `#FFF8F7` |
| Surface | `#FFFFFF` |
| Primary | `#D63B40` |
| Text | `#2A1618` |

---

## 4. Cấu trúc thư mục

```
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ globals.css
├─ components/
│  ├─ Loader.tsx          # Màn hình loading
│  ├─ SmoothScroll.tsx    # Lenis
│  ├─ Reveal.tsx          # Wrapper scroll reveal
│  ├─ Navbar.tsx
│  └─ sections/
│     ├─ Hero.tsx
│     ├─ About.tsx
│     ├─ Skills.tsx
│     ├─ Projects.tsx
│     ├─ Experience.tsx
│     └─ Contact.tsx
└─ data/
   └─ projects.ts
```

---

## 5. Các section của Portfolio

1. **Hero** – Tên, chức danh, câu giới thiệu ngắn, nút *Xem dự án* / *Liên hệ*.
2. **About** – Giới thiệu bản thân, ảnh, số liệu (năm kinh nghiệm, số dự án).
3. **Skills** – Icon/tag kỹ năng, thanh tiến độ hoặc nhóm (Frontend, Backend, Tools).
4. **Projects** – Card dự án: ảnh, mô tả, tech, link demo/GitHub.
5. **Experience** – Timeline học vấn / công việc.
6. **Contact** – Form hoặc email, social links.
7. **Footer** – Copyright, link.

---

## 6. Code mẫu

### 6.1 `globals.css` (Tailwind v4)

```css
@import "tailwindcss";

@theme {
  --color-bg: #0f0a0b;
  --color-surface: #1a1214;
  --color-line: #2e1b1e;
  --color-primary: #e5484d;
  --color-primary-soft: #f2777a;
  --color-primary-deep: #b3282d;
  --color-text: #f5edee;
  --color-muted: #a89497;
}

html {
  scroll-behavior: auto; /* để Lenis xử lý */
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: var(--color-primary);
  color: white;
}

/* Scrollbar đỏ */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb {
  background: var(--color-primary-deep);
  border-radius: 8px;
}
```

> Nếu dùng Tailwind v3, khai báo màu trong `tailwind.config.ts` ở mục `theme.extend.colors`.

---

### 6.2 `components/Loader.tsx` – Trang Loading

Đếm từ 0 → 100%, sau đó cả màn hình trượt lên để lộ website.

```tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
  }, [done]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setDone(true), 400);
          return 100;
        }
        return p + Math.floor(Math.random() * 6) + 2;
      });
    }, 70);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!done && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0f0a0b]"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold tracking-widest text-[#f5edee]"
            >
              YOUR<span className="text-[#e5484d]">NAME</span>
            </motion.h1>

            {/* Thanh tiến độ */}
            <div className="mt-8 h-[3px] w-56 overflow-hidden rounded-full bg-[#2e1b1e]">
              <motion.div
                className="h-full bg-[#e5484d]"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            <p className="mt-4 font-mono text-sm text-[#a89497]">
              {Math.min(progress, 100)}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
```

---

### 6.3 `components/SmoothScroll.tsx` – Cuộn mượt

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });

    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

---

### 6.4 `components/Reveal.tsx` – Scroll xuống thì hiện thông tin

Bọc bất kỳ nội dung nào để nó fade-in + trượt lên khi vào màn hình.

```tsx
"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
};

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: Props) {
  const offset = {
    up: { y: 50, x: 0 },
    left: { y: 0, x: -50 },
    right: { y: 0, x: 50 },
  }[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

**Cách dùng:**

```tsx
<Reveal>
  <h2>Về tôi</h2>
</Reveal>

<Reveal delay={0.15}>
  <p>Mình là lập trình viên...</p>
</Reveal>
```

---

### 6.5 `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const metadata: Metadata = {
  title: "Tên bạn | Portfolio",
  description: "Portfolio của Tên bạn – Frontend Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="font-[var(--font-inter)]">
        <Loader>
          <SmoothScroll>{children}</SmoothScroll>
        </Loader>
      </body>
    </html>
  );
}
```

---

### 6.6 `components/sections/Hero.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Glow đỏ nền */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[#e5484d]/20 blur-[140px]" />

      <div className="relative z-10 max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}   // chờ loader xong
          className="mb-4 font-mono text-sm tracking-widest text-[#f2777a]"
        >
          XIN CHÀO, MÌNH LÀ
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-5xl font-bold leading-tight md:text-7xl"
        >
          Nguyễn Văn <span className="text-[#e5484d]">A</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-6 text-lg text-[#a89497]"
        >
          Frontend Developer – xây dựng giao diện đẹp, mượt và dễ dùng.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-[#e5484d] px-8 py-3 font-medium text-white transition hover:bg-[#f2777a] hover:shadow-[0_0_30px_rgba(229,72,77,0.5)]"
          >
            Xem dự án
          </a>
          <a
            href="#contact"
            className="rounded-full border border-[#2e1b1e] px-8 py-3 font-medium transition hover:border-[#e5484d] hover:text-[#e5484d]"
          >
            Liên hệ
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-10 text-[#a89497]"
      >
        <ArrowDown />
      </motion.div>
    </section>
  );
}
```

---

### 6.7 `components/sections/Projects.tsx` – Card hiện lần lượt

```tsx
import Reveal from "../Reveal";

const projects = [
  { title: "Shop Online", desc: "Website bán hàng với Next.js & Stripe.", tech: ["Next.js", "Tailwind", "Stripe"] },
  { title: "Dashboard", desc: "Trang quản trị realtime.", tech: ["React", "Chart.js"] },
  { title: "Blog CMS", desc: "Blog với headless CMS.", tech: ["Next.js", "Sanity"] },
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <h2 className="mb-14 text-4xl font-bold">
          Dự án <span className="text-[#e5484d]">nổi bật</span>
        </h2>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.15}>
            <div className="group h-full rounded-2xl border border-[#2e1b1e] bg-[#1a1214] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#e5484d]/60 hover:shadow-[0_10px_40px_rgba(229,72,77,0.15)]">
              <h3 className="text-xl font-semibold transition group-hover:text-[#e5484d]">
                {p.title}
              </h3>
              <p className="mt-3 text-[#a89497]">{p.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[#e5484d]/10 px-3 py-1 text-xs text-[#f2777a]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

---

### 6.8 `app/page.tsx`

```tsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
```

---

## 7. Gợi ý hiệu ứng UX cho cảm giác "mượt"

- **Progress bar cuộn trang** ở trên cùng (dùng `useScroll` của Framer Motion).
- **Navbar** ẩn khi cuộn xuống, hiện khi cuộn lên; đổi nền blur khi rời khỏi top.
- **Cursor tuỳ chỉnh**: chấm đỏ đi theo chuột (chỉ desktop).
- **Stagger**: các phần tử con hiện lần lượt cách nhau 0.1–0.15s.
- **Hover**: nâng card lên `-translate-y-2`, viền đỏ, glow nhẹ.
- **Parallax** nhẹ cho ảnh/hình tròn glow nền.
- **Tôn trọng `prefers-reduced-motion`** để tắt animation cho người nhạy cảm.

Ví dụ progress bar cuộn:

```tsx
"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-[#e5484d]"
    />
  );
}
```

---

## 8. Mẹo để màu đỏ dễ nhìn

1. Dùng đỏ làm **màu nhấn** (nút, tiêu đề phụ, hover) – **không** tô đỏ cả nền lớn.
2. Nền tối ấm (`#0F0A0B`) thay vì đen thuần để đỡ chói.
3. Chữ dùng **kem** `#F5EDEE`, không dùng trắng tinh.
4. Glow đỏ dùng `blur` lớn + opacity thấp (10–20%).
5. Kiểm tra **contrast** chữ/nền ≥ 4.5:1 (dùng WebAIM Contrast Checker).

---

## 9. Checklist hoàn thành

- [ ] Khởi tạo project Next.js + cài thư viện
- [ ] Cấu hình màu & font
- [ ] Làm `Loader` và test thời gian hiển thị
- [ ] Cài `SmoothScroll` (Lenis)
- [ ] Làm component `Reveal`
- [ ] Làm đủ các section: Hero, About, Skills, Projects, Experience, Contact
- [ ] Navbar + scroll progress
- [ ] Responsive mobile/tablet
- [ ] Tối ưu ảnh bằng `next/image`
- [ ] SEO: metadata, Open Graph, favicon
- [ ] Test Lighthouse (Performance ≥ 90)
- [ ] Deploy lên Vercel + gắn domain

---

## 10. Deploy

```bash
npm run build
```

1. Đẩy code lên GitHub.
2. Vào [vercel.com](https://vercel.com) → **Import Project** → chọn repo.
3. Bấm **Deploy** – xong.

---

## 11. Tài nguyên tham khảo

- Next.js Docs – https://nextjs.org/docs
- Framer Motion – https://www.framer.com/motion
- Lenis – https://lenis.darkroom.engineering
- Tailwind CSS – https://tailwindcss.com
- Lucide Icons – https://lucide.dev
- Cảm hứng thiết kế: Awwwards, Dribbble, Behance
