import { create } from 'zustand';
import { mockMovies } from '@/lib/mockData';

export interface RatedMovie {
  movieId: string;
  rating: number;
  date: string;
}

export interface Ticket {
  id: string;
  movieTitle: string;
  cinema: string;
  date: string;
  time: string;
  seat: string;
  color: string;
}

interface UserProfileState {
  // Фильтры каталога
  searchQuery: string;
  selectedGenre: string | null;
  minRating: number;
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genre: string | null) => void;
  setMinRating: (rating: number) => void;
  resetFilters: () => void;
  
  // Профиль
  ratedMovies: RatedMovie[];
  tickets: Ticket[];
  addRating: (movieId: string, rating: number) => void;
  addTicket: (ticket: Ticket) => void;
}

export const useMovieStore = create<UserProfileState>((set) => ({
  // Фильтры
  searchQuery: '',
  selectedGenre: null,
  minRating: 0,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  setMinRating: (rating) => set({ minRating: rating }),
  resetFilters: () => set({ searchQuery: '', selectedGenre: null, minRating: 0 }),

  // Профиль (моковые данные для старта)
  ratedMovies: [
    { movieId: '1', rating: 9, date: '2024-05-10' },
    { movieId: '3', rating: 8, date: '2024-05-12' },
  ],
  tickets: [
    {
      id: 't1',
      movieTitle: 'Эхо Снов',
      cinema: 'Кинотеатр "Иллюзия"',
      date: '10 Мая 2024',
      time: '21:30',
      seat: 'Ряд 4, Место 12',
      color: 'from-twinpy-purple to-twinpy-neon',
    },
    {
      id: 't2',
      movieTitle: 'Тихий Океан Памяти',
      cinema: 'Арт-хаус "Зеркало"',
      date: '12 Мая 2024',
      time: '19:00',
      seat: 'Ряд 2, Место 5',
      color: 'from-twinpy-turquoise to-twinpy-purple',
    }
  ],
  addRating: (movieId, rating) => set((state) => ({
    ratedMovies: [...state.ratedMovies, { movieId, rating, date: new Date().toISOString().split('T')[0] }]
  })),
  addTicket: (ticket) => set((state) => ({
    tickets: [...state.tickets, ticket]
  })),
}));