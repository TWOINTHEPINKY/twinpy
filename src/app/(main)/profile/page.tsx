'use client';

import { useState } from 'react';
import { useMovieStore, Ticket } from '@/store/movieStore';
import { mockMovies } from '@/lib/mockData';
import SurrealTicket from '@/components/tickets/SurrealTicket';
import Link from 'next/link';

export default function ProfilePage() {
  const { ratedMovies, tickets, addTicket } = useMovieStore();
  const [isAddingTicket, setIsAddingTicket] = useState(false);
  
  // Состояние для формы нового билета
  const [newTicket, setNewTicket] = useState({
    movieTitle: '', cinema: '', date: '', time: ''
  });

  const totalRated = ratedMovies.length;
  const avgRating = totalRated > 0 
    ? (ratedMovies.reduce((acc, curr) => acc + curr.rating, 0) / totalRated).toFixed(1) 
    : '0.0';

  const handleAddTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.movieTitle || !newTicket.cinema) return;

    addTicket({
      id: `t-${Date.now()}`,
      ...newTicket,
      seat: 'Свободная посадка', // Заглушка
      color: 'from-twinpy-gold to-twinpy-neon', // Дефолтный цвет для ручных билетов
    });

    setNewTicket({ movieTitle: '', cinema: '', date: '', time: '' });
    setIsAddingTicket(false);
  };

  return (
    <div className="min-h-screen bg-twinpy-bg py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Шапка профиля */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 pb-8 border-b border-twinpy-surface/30">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-twinpy-neon to-twinpy-purple p-1">
            <div className="w-full h-full rounded-full bg-twinpy-bg flex items-center justify-center text-4xl">
              🎭
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-bold text-twinpy-text mb-2">Киноман Сновидец</h1>
            <p className="text-twinpy-muted mb-6">Даю честные обещания кинематографу с 2024 года.</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <div className="bg-twinpy-surface/30 px-6 py-3 rounded-xl border border-twinpy-purple/30 text-center">
                <p className="text-2xl font-bold text-twinpy-gold">{totalRated}</p>
                <p className="text-xs text-twinpy-muted uppercase tracking-wider">Обещаний дано</p>
              </div>
              <div className="bg-twinpy-surface/30 px-6 py-3 rounded-xl border border-twinpy-turquoise/30 text-center">
                <p className="text-2xl font-bold text-twinpy-turquoise">{avgRating}</p>
                <p className="text-xs text-twinpy-muted uppercase tracking-wider">Средний рейтинг</p>
              </div>
              <div className="bg-twinpy-surface/30 px-6 py-3 rounded-xl border border-twinpy-neon/30 text-center">
                <p className="text-2xl font-bold text-twinpy-neon">{tickets.length}</p>
                <p className="text-xs text-twinpy-muted uppercase tracking-wider">Билетов</p>
              </div>
            </div>
          </div>
        </div>

        {/* Секция: Мои билеты */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-twinpy-text flex items-center gap-3">
              <span className="text-twinpy-gold">🎟️</span> Мои цифровые артефакты
            </h2>
            <button 
              onClick={() => setIsAddingTicket(!isAddingTicket)}
              className="px-4 py-2 rounded-lg border border-twinpy-turquoise text-twinpy-turquoise hover:bg-twinpy-turquoise hover:text-twinpy-bg transition-all text-sm"
            >
              {isAddingTicket ? 'Отмена' : '+ Добавить билет'}
            </button>
          </div>

          {/* Форма добавления билета */}
          {isAddingTicket && (
            <form onSubmit={handleAddTicket} className="mb-8 p-6 bg-twinpy-surface/30 rounded-xl border border-twinpy-turquoise/30 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Название фильма"
                  value={newTicket.movieTitle}
                  onChange={(e) => setNewTicket({...newTicket, movieTitle: e.target.value})}
                  className="bg-twinpy-bg border border-twinpy-surface rounded-lg px-4 py-2 text-twinpy-text focus:ring-2 focus:ring-twinpy-turquoise outline-none"
                />
                <input
                  placeholder="Кинотеатр"
                  value={newTicket.cinema}
                  onChange={(e) => setNewTicket({...newTicket, cinema: e.target.value})}
                  className="bg-twinpy-bg border border-twinpy-surface rounded-lg px-4 py-2 text-twinpy-text focus:ring-2 focus:ring-twinpy-turquoise outline-none"
                />
                <input
                  type="date"
                  value={newTicket.date}
                  onChange={(e) => setNewTicket({...newTicket, date: e.target.value})}
                  className="bg-twinpy-bg border border-twinpy-surface rounded-lg px-4 py-2 text-twinpy-text focus:ring-2 focus:ring-twinpy-turquoise outline-none"
                />
                <input
                  type="time"
                  value={newTicket.time}
                  onChange={(e) => setNewTicket({...newTicket, time: e.target.value})}
                  className="bg-twinpy-bg border border-twinpy-surface rounded-lg px-4 py-2 text-twinpy-text focus:ring-2 focus:ring-twinpy-turquoise outline-none"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-twinpy-turquoise text-twinpy-bg font-bold rounded-lg hover:opacity-90 transition-opacity">
                Сохранить артефакт
              </button>
            </form>
          )}

          {tickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tickets.map((ticket) => (
                <SurrealTicket key={ticket.id} {...ticket} />
              ))}
            </div>
          ) : (
            <p className="text-twinpy-muted text-center py-10">Пока нет сохраненных билетов.</p>
          )}
        </div>

        {/* Секция: История обещаний */}
        <div>
          <h2 className="text-2xl font-bold text-twinpy-text mb-6 flex items-center gap-3">
            <span className="text-twinpy-neon">🤙</span> История обещаний
          </h2>
          {ratedMovies.length > 0 ? (
            <div className="space-y-4">
              {ratedMovies.map((rated, index) => {
                const movie = mockMovies.find((m) => m.id === rated.movieId);
                if (!movie) return null;
                return (
                  <Link key={index} href={`/movies/${movie.id}`} className="block group">
                    <div className="flex items-center justify-between p-4 bg-twinpy-surface/20 rounded-xl border border-twinpy-surface/30 hover:border-twinpy-neon/50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-16 rounded bg-gradient-to-br ${movie.posterColor}`}></div>
                        <div>
                          <h3 className="font-bold text-twinpy-text group-hover:text-twinpy-neon transition-colors">{movie.title}</h3>
                          <p className="text-sm text-twinpy-muted">{rated.date}</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-twinpy-gold">
                        {rated.rating}<span className="text-sm text-twinpy-muted">/10</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-twinpy-muted text-center py-10">Ты еще не давал обещаний кино.</p>
          )}
        </div>

      </div>
    </div>
  );
}