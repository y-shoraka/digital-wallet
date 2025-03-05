import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "کیف پول دیجیتال",
  description: "یک کیف پول دیجیتال ساده",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-100">{children}</main>
      </body>
    </html>
  );
}

import "./globals.css";
