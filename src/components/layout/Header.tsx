"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { useI18n } from '@/lib/i18n';

export default function Header() {
  const { locale, setLocale, t } = useI18n();

  useEffect(() => {
    const shouldUseLightTheme = window.localStorage.getItem('twinpy-theme') === 'light';
    document.documentElement.classList.toggle('light', shouldUseLightTheme);
  }, []);

  const toggleTheme = () => {
    const nextIsLightTheme = !document.documentElement.classList.contains('light');
    document.documentElement.classList.toggle('light', nextIsLightTheme);
    window.localStorage.setItem('twinpy-theme', nextIsLightTheme ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-twinpy-surface/20 bg-twinpy-bg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-20 py-3 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="text-3xl font-bold tracking-tighter select-none" aria-label="Twinpy">
          <span className="text-twinpy-neon">Twin</span>
          <span className="text-twinpy-turquoise">py</span>
        </Link>

        <nav className="order-3 basis-full md:order-none md:basis-auto flex justify-center items-center gap-2 sm:gap-3" aria-label="Primary navigation">
          <Link href="/profile" className="rounded-full border border-twinpy-surface/60 px-4 py-2 text-sm text-twinpy-text transition-colors hover:border-twinpy-neon hover:text-twinpy-neon">
            {t('navProfile')}
          </Link>
          <Link href="/friends" className="rounded-full border border-twinpy-surface/60 px-4 py-2 text-sm text-twinpy-text transition-colors hover:border-twinpy-turquoise hover:text-twinpy-turquoise">
            {t('navFriends')}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleTheme} aria-label={t('theme')} className="rounded-full border border-twinpy-neon px-3 py-2 text-sm text-twinpy-neon transition-colors hover:bg-twinpy-neon hover:text-white">
            <span className="hidden sm:inline">{t('theme')}</span>
            <span className="sm:hidden">☼</span>
          </button>
          <button
            type="button"
            onClick={() => setLocale(locale === 'ru' ? 'en' : 'ru')}
            aria-label={t('language')}
            className="rounded-full border border-twinpy-turquoise px-3 py-2 text-sm font-semibold text-twinpy-turquoise transition-colors hover:bg-twinpy-turquoise hover:text-twinpy-bg"
          >
            {locale.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
}