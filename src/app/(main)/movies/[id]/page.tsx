import { mockMovies } from '@/lib/mockData';
import CassetteAnimation from '@/components/movie/CassetteAnimation';
import Link from 'next/link';
import BackToCatalog from '@/components/layout/BackToCatalog';

// Добавляем async и меняем тип params на Promise
export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Разворачиваем Promise
  const { id } = await params;
  
  // 2. Ищем фильм по полученному id
  const movie = mockMovies.find((m) => m.id === id);

  // Если фильм не найден — показываем красивую 404
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-twinpy-bg text-twinpy-text pt-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-twinpy-neon mb-4">404</h1>
          <p className="text-twinpy-muted text-xl mb-8">Фильм не найден. Возможно, эта пленка утеряна.</p>
          <Link href="/movies" className="px-6 py-3 rounded-full border border-twinpy-turquoise text-twinpy-turquoise hover:bg-twinpy-turquoise hover:text-twinpy-bg transition-all">
            ← Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-twinpy-bg">
      {/* Кнопка "Назад" */}
      <div className="fixed top-24 left-6 z-50">
        <BackToCatalog />
      </div>

      {/* Анимация и контент */}
      <CassetteAnimation movieData={movie} movieId={id} />
      
      {/* Пустое пространство внизу, чтобы можно было доскроллить форму */}
      <div className="h-[50vh]"></div>
    </div>
  );
}