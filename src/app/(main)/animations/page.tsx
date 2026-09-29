'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function AnimationsPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-twinpy-bg py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-twinpy-gold font-semibold uppercase tracking-[0.25em]">{t('comingSoon')}</p>
        <h1 className="mt-4 text-5xl font-bold text-twinpy-text">{t('animationsTitle')}</h1>
        <p className="mt-6 text-lg text-twinpy-muted">{t('animationsDescription')}</p>
        <Link href="/movies" className="mt-10 inline-block rounded-full border border-twinpy-neon px-6 py-3 text-twinpy-neon transition-colors hover:bg-twinpy-neon hover:text-white">
          {t('goToMovies')}
        </Link>
      </div>
    </div>
  );
}
