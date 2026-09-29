import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { I18nProvider } from "@/lib/i18n";

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
        <I18nProvider>
          <Header />
          <main className="pt-28 md:pt-20">{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}