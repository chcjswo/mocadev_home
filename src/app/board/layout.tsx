import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import './board.css';

const plexMono = IBM_Plex_Mono({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '제작 현황판',
  robots: { index: false, follow: false },
};

export default function BoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body className={plexMono.variable}>{children}</body>
    </html>
  );
}
