'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MovieRatingForm } from '@/components/rating/MovieRatingForm';
import { useI18n } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

interface MovieData {
  title: string;
  originalTitle: string;
  year: number;
  director: string;
  genres: string[];
  synopsis: string;
  posterColor: string;
}

export default function CassetteAnimation({ movieData, movieId }: { movieData: MovieData, movieId: string }) {
  const { t } = useI18n();
  const animContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Анимация распаковки (короткая, 150vh скролла)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: animContainerRef.current,
          start: "top top",
          end: "+=150%", // Уменьшили с 500vh до 150% высоты экрана
          scrub: 1,
          pin: true,
        }
      });

      // 1. Коробка улетает
      tl.to(".layer-box", { y: -200, opacity: 0, scale: 0.5, duration: 0.8 })
      // 2. Кассета выдвигается
        .to(".layer-cassette", { y: -30, scale: 1.1, duration: 0.6 }, "-=0.4")
      // 3. Кассета раскрывается, пленка тянется
        .to(".layer-film", { height: "100vh", opacity: 1, duration: 1 })
      // 4. Контент проявляется
        .to(".layer-content", { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
      // 5. Анимация завершается, контент остаётся на экране
        .to(".layer-content", { opacity: 1, duration: 0.2 });

    }, animContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {/* Секция анимации (фиксированная во время скролла) */}
      <div ref={animContainerRef} className="relative h-screen bg-twinpy-bg overflow-hidden">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          
          {/* Слой 1: Коробка */}
          <div className="layer-box absolute w-64 h-44 bg-gradient-to-br from-twinpy-purple to-twinpy-surface rounded-lg shadow-2xl border border-twinpy-neon/30 flex items-center justify-center z-30">
            <span className="text-twinpy-gold font-bold text-xl tracking-widest">TWINPY</span>
          </div>

          {/* Слой 2: Кассета */}
          <div className="layer-cassette absolute w-72 h-48 bg-twinpy-surface rounded-md shadow-xl border-2 border-twinpy-muted z-20 flex flex-col items-center justify-center gap-4">
            <div className="w-56 h-24 bg-twinpy-bg rounded border border-twinpy-purple/50 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-twinpy-neon flex items-center justify-center">
                <div className="w-4 h-4 bg-twinpy-gold rounded-full"></div>
              </div>
            </div>
            <div className="text-twinpy-muted text-xs tracking-widest">VHS • ART HOUSE</div>
          </div>

          {/* Слой 3: Пленка */}
          <div className="layer-film absolute top-0 left-1/2 -translate-x-1/2 w-80 bg-black/90 border-x-4 border-twinpy-gold/50 opacity-0 z-10 flex items-center justify-center overflow-hidden" style={{ height: '0vh' }}>
            <div className="absolute left-1 top-0 bottom-0 w-4 bg-[linear-gradient(to_bottom,#fff_50%,transparent_50%)] bg-[length:100%_20px] opacity-30"></div>
            <div className="absolute right-1 top-0 bottom-0 w-4 bg-[linear-gradient(to_bottom,#fff_50%,transparent_50%)] bg-[length:100%_20px] opacity-30"></div>
          </div>

          {/* Слой 4: Контент (проявляется в конце анимации) */}
          <div className="layer-content absolute inset-0 flex flex-col items-center justify-center px-6 opacity-0 translate-y-10 z-20">
            <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${movieData.posterColor} text-white text-sm font-bold mb-4`}>
              {movieData.genres.join(" • ")}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-twinpy-text mb-2 text-center">{movieData.title}</h1>
            <p className="text-twinpy-neon text-xl mb-6">{movieData.originalTitle} ({movieData.year})</p>
            <p className="text-twinpy-muted text-lg mb-2">{t('director')} <span className="text-twinpy-text">{movieData.director}</span></p>
            <p className="text-twinpy-text/80 text-lg leading-relaxed max-w-2xl mx-auto text-center">
              {movieData.synopsis}
            </p>
            <div className="mt-8 text-twinpy-gold text-sm animate-pulse">{t('scrollToRate')}</div>
          </div>

        </div>
      </div>

      {/* Секция с формой (обычный скролл после анимации) */}
      <div ref={contentRef} className="min-h-screen bg-twinpy-bg py-20 px-6">
        <MovieRatingForm movieId={movieId} />
        <div className="h-[30vh]"></div>
      </div>
    </div>
  );
}