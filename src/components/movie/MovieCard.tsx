'use client';

import Link from 'next/link';

interface Movie {
  id: string;
  title: string;
  originalTitle: string;
  year: number;
  genres: string[];
  posterColor: string;
  rating: number;
}

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movies/${movie.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl border border-twinpy-surface/30 bg-twinpy-surface/20 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-twinpy-neon/50 hover:shadow-[0_0_30px_rgba(255,0,110,0.3)]">
        {/* Имитация постера — градиентный блок */}
        <div className={`aspect-[2/3] bg-gradient-to-br ${movie.posterColor} relative overflow-hidden`}>
          {/* Декоративные элементы "постера" */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
          
          {/* Рейтинг в углу */}
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg border border-twinpy-gold/50">
            <span className="text-twinpy-gold font-bold text-sm">★ {movie.rating}</span>
          </div>

          {/* Название на "постере" */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">{movie.title}</h3>
            <p className="text-white/70 text-xs mt-1">{movie.originalTitle}</p>
          </div>
        </div>

        {/* Информация под постером */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-twinpy-muted text-sm">{movie.year}</span>
            <div className="flex gap-1 flex-wrap justify-end">
              {movie.genres.slice(0, 2).map((genre) => (
                <span key={genre} className="text-xs px-2 py-0.5 rounded-full bg-twinpy-purple/20 text-twinpy-purple border border-twinpy-purple/30">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}