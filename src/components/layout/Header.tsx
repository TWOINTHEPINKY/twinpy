import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-twinpy-surface/20 bg-twinpy-bg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Логотип (пока текстовый, с градиентом) */}
        <Link href="/" className="text-3xl font-bold tracking-tighter select-none">
          <span className="text-twinpy-neon">Twin</span>
          <span className="text-twinpy-turquoise">py</span>
        </Link>

        {/* Навигация */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/movies" className="text-twinpy-muted hover:text-twinpy-neon transition-colors duration-300">Фильмы</Link>
          <Link href="/series" className="text-twinpy-muted hover:text-twinpy-neon transition-colors duration-300">Сериалы</Link>
          <Link href="/animations" className="text-twinpy-muted hover:text-twinpy-neon transition-colors duration-300">Мультфильмы</Link>
          <Link href="/profile" className="text-twinpy-muted hover:text-twinpy-neon transition-colors duration-300">Профиль</Link>
        </nav>

        {/* Кнопка смены темы (заглушка) */}
        <button className="px-5 py-2 rounded-full border border-twinpy-neon text-twinpy-neon hover:bg-twinpy-neon hover:text-white transition-all duration-300 text-sm font-medium">
          Сменить тему
        </button>
      </div>
    </header>
  );
}