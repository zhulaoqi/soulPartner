import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "心灵陪伴 - 您的专属心理陪伴导师",
  description: "温暖、专业的心理咨询与陪伴服务，随时随地倾听您的心声。基于AI的流式智能对话，提供情感支持和心理疏导。",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "心灵陪伴 - 您的专属心理陪伴导师",
    description: "温暖、专业的心理咨询与陪伴服务，基于AI的流式智能对话",
    images: ["/og-image.svg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "心灵陪伴 - 您的专属心理陪伴导师",
    description: "温暖、专业的心理咨询与陪伴服务",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

