import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Twinpy — Честные оценки кино",
  description: "Артхаусный сервис для оценки фильмов. Сцепи мизинцы с кинематографом.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Добавляем класс 'dark', чтобы тёмная тема работала по умолчанию
    <html lang="ru" className="dark"> 
      <body className="antialiased min-h-screen bg-twinpy-bg text-twinpy-text">
        <Header />
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}