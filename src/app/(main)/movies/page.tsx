'use client';

import { useMemo } from 'react';
import { mockMovies } from '@/lib/mockData';
import { useMovieStore } from '@/store/movieStore';
import MovieCard from '@/components/movie/MovieCard';

// Собираем все уникальные жанры
const allGenres = Array.from(new Set(mockMovies.flatMap((m) => m.genres))).sort();

export default function MoviesPage() {
  const { searchQuery, selectedGenre, minRating, setSearchQuery, setSelectedGenre, setMinRating, resetFilters } = useMovieStore();

  // Фильтрация фильмов
  const filteredMovies = useMemo(() => {
    return mockMovies.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            movie.originalTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = !selectedGenre || movie.genres.includes(selectedGenre);
      const matchesRating = movie.rating >= minRating;
      return matchesSearch && matchesGenre && matchesRating;
    });
  }, [searchQuery, selectedGenre, minRating]);

  return (
    <div className="min-h-screen bg-twinpy-bg py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-twinpy-neon via-twinpy-purple to-twinpy-turquoise bg-clip-text text-transparent">
              Каталог
            </span>
          </h1>
          <p className="text-twinpy-muted text-lg">Выбери фильм и дай своё честное обещание</p>
        </div>

        {/* Панель фильтров */}
        <div className="mb-10 p-6 bg-twinpy-surface/30 backdrop-blur-sm rounded-2xl border border-twinpy-purple/20 space-y-4">
          {/* Поиск */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-twinpy-bg border border-twinpy-purple/30 rounded-xl px-5 py-3 text-twinpy-text focus:outline-none focus:ring-2 focus:ring-twinpy-neon transition-all"
            />
            
            {/* Жанр */}
            <select
              value={selectedGenre || ''}
              onChange={(e) => setSelectedGenre(e.target.value || null)}
              className="bg-twinpy-bg border border-twinpy-purple/30 rounded-xl px-5 py-3 text-twinpy-text focus:outline-none focus:ring-2 focus:ring-twinpy-turquoise transition-all"
            >
              <option value="">Все жанры</option>
              {allGenres.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>

            {/* Рейтинг */}
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="bg-twinpy-bg border border-twinpy-purple/30 rounded-xl px-5 py-3 text-twinpy-text focus:outline-none focus:ring-2 focus:ring-twinpy-gold transition-all"
            >
              <option value={0}>Любой рейтинг</option>
              <option value={7}>От 7.0</option>
              <option value={8}>От 8.0</option>
              <option value={9}>От 9.0</option>
            </select>

            {/* Сброс */}
            <button
              onClick={resetFilters}
              className="px-6 py-3 rounded-xl border border-twinpy-neon/50 text-twinpy-neon hover:bg-twinpy-neon hover:text-white transition-all"
            >
              Сбросить
            </button>
          </div>

          {/* Счётчик */}
          <div className="text-twinpy-muted text-sm">
            Найдено фильмов: <span className="text-twinpy-gold font-bold">{filteredMovies.length}</span>
          </div>
        </div>

        {/* Сетка фильмов */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-twinpy-muted text-xl">Ничего не найдено 🎭</p>
            <p className="text-twinpy-muted text-sm mt-2">Попробуй изменить фильтры</p>
          </div>
        )}
      </div>
    </div>
  );
}