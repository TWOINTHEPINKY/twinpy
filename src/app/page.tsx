'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center relative overflow-hidden px-6">
      
      {/* Сюрреалистичный фон: пульсирующие цветные пятна */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-twinpy-purple/30 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-twinpy-neon/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-twinpy-turquoise/10 rounded-full blur-[100px]"></div>

      {/* Основной контент */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-tight">
          {t('homeTitle')} <br />
          <span className="bg-gradient-to-r from-twinpy-neon via-twinpy-purple to-twinpy-turquoise bg-clip-text text-transparent">
            {t('homeTitleAccent')}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-twinpy-muted mb-12 max-w-2xl mx-auto leading-relaxed">
          {t('homeDescription')}
        </p>
        
        <Link href="/movies" className="group relative px-10 py-5 bg-twinpy-neon text-white rounded-full text-lg font-semibold overflow-hidden transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,0,110,0.4)] inline-block">
  <span className="relative z-10">{t('homeCta')}</span>
  <div className="absolute inset-0 bg-gradient-to-r from-twinpy-neon to-twinpy-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</Link>
      </div>
    </div>
  );
}