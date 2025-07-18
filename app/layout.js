import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogoutButton from "./LogoutButton";
import Providers from "./providers";

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // 필요한 굵기만 지정
  display: 'swap',
  preload: true,
})

export const metadata = {
  title: "정글 게시판",
  description: "나만무 대비 Next.js 기반 게시판 만들기",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="ko" className={notoSansKr.className}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-…"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <Providers>
          <div className="navbar">
            <div style={{ marginLeft: '20px', fontWeight: 'bold' }}>Jungle-Board</div>
            <LogoutButton />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
