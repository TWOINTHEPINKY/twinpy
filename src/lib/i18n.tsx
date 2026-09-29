'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Locale = 'ru' | 'en';

type TranslationKey =
  | 'navProfile' | 'navFriends' | 'theme' | 'language'
  | 'homeTitle' | 'homeTitleAccent' | 'homeDescription' | 'homeCta'
  | 'catalogTitle' | 'catalogSubtitle' | 'searchPlaceholder' | 'allGenres'
  | 'anyRating' | 'from7' | 'from8' | 'from9' | 'reset' | 'foundMovies'
  | 'noMovies' | 'changeFilters'
  | 'profileName' | 'profileBio' | 'promises' | 'averageRating' | 'tickets'
  | 'ticketsTitle' | 'addTicket' | 'cancel' | 'movieTitle' | 'cinema'
  | 'date' | 'time' | 'saveArtifact' | 'noTickets' | 'history' | 'noPromises'
  | 'reviewSaved' | 'ratingFormTitle' | 'originality' | 'conflict' | 'acting'
  | 'chemistry' | 'composition' | 'soundtrack' | 'emotions' | 'rewatch'
  | 'review' | 'reviewPlaceholder' | 'reviewTooShort' | 'saving' | 'saveRating'
  | 'film' | 'theater' | 'seat' | 'backToCatalog' | 'director' | 'scrollToRate'
  | 'comingSoon' | 'friendsTitle' | 'friendsDescription' | 'goToMovies'
  | 'seriesTitle' | 'seriesDescription' | 'animationsTitle' | 'animationsDescription';

const translations: Record<Locale, Record<TranslationKey, string>> = {
  ru: {
    navProfile: 'Профиль', navFriends: 'Друзья', theme: 'Сменить тему', language: 'Язык',
    homeTitle: 'Оценивай кино', homeTitleAccent: 'честно.',
    homeDescription: 'Twinpy — место, где искусство встречается с твоим мнением. Здесь нет скучных звёзд. Только искренние эмоции и обещание быть честным.',
    homeCta: 'Начать оценивать',
    catalogTitle: 'Каталог', catalogSubtitle: 'Выбери фильм и дай своё честное обещание',
    searchPlaceholder: 'Поиск по названию...', allGenres: 'Все жанры', anyRating: 'Любой рейтинг',
    from7: 'От 7.0', from8: 'От 8.0', from9: 'От 9.0', reset: 'Сбросить', foundMovies: 'Найдено фильмов:',
    noMovies: 'Ничего не найдено 🎭', changeFilters: 'Попробуй изменить фильтры',
    profileName: 'Киноман Сновидец', profileBio: 'Даю честные обещания кинематографу с 2024 года.',
    promises: 'Обещаний дано', averageRating: 'Средний рейтинг', tickets: 'Билетов',
    ticketsTitle: 'Мои цифровые артефакты', addTicket: '+ Добавить билет', cancel: 'Отмена',
    movieTitle: 'Название фильма', cinema: 'Кинотеатр', date: 'Дата', time: 'Время',
    saveArtifact: 'Сохранить артефакт', noTickets: 'Пока нет сохраненных билетов.',
    history: 'История обещаний', noPromises: 'Ты еще не давал обещаний кино.',
    reviewSaved: '🤙 Обещание дано! Оценка и рецензия сохранены в истории.',
    ratingFormTitle: 'Дай своё обещание кино', originality: 'Оригинальность идеи',
    conflict: 'Конфликт, развитие, финал', acting: 'Актёрская игра', chemistry: 'Химия между персонажами',
    composition: 'Композиция, свет, цвет', soundtrack: 'Саундтрек', emotions: 'Вызванные чувства',
    rewatch: 'Хочется ли пересматривать?', review: 'Твоя рецензия',
    reviewPlaceholder: 'Опиши свои ощущения... (минимум 10 символов)', reviewTooShort: 'Рецензия слишком короткая',
    saving: 'Сохранение...', saveRating: 'Сцепить мизинцы и сохранить оценку 🤙', film: 'Фильм',
    theater: 'Кинотеатр', seat: 'Место', backToCatalog: 'Назад к каталогу', director: 'Режиссёр:',
    scrollToRate: '↓ Скролль вниз для оценки ↓', comingSoon: 'Раздел в работе', friendsTitle: 'Друзья скоро появятся',
    friendsDescription: 'Мы готовим пространство, где можно будет находить друзей и делиться кинематографическими обещаниями.',
    goToMovies: 'Перейти к фильмам', seriesTitle: 'Сериалы скоро появятся',
    seriesDescription: 'Мы готовим отдельную коллекцию сериалов с теми же честными оценками и рецензиями.',
    animationsTitle: 'Мультфильмы скоро появятся',
    animationsDescription: 'Здесь будет отдельная подборка анимации для оценки, рецензий и коллекционирования.',
  },
  en: {
    navProfile: 'Profile', navFriends: 'Friends', theme: 'Switch theme', language: 'Language',
    homeTitle: 'Rate movies', homeTitleAccent: 'honestly.',
    homeDescription: 'Twinpy is where art meets your opinion. No boring stars here. Only honest emotions and a promise to stay sincere.',
    homeCta: 'Start rating',
    catalogTitle: 'Catalog', catalogSubtitle: 'Choose a movie and make your honest promise',
    searchPlaceholder: 'Search by title...', allGenres: 'All genres', anyRating: 'Any rating',
    from7: 'From 7.0', from8: 'From 8.0', from9: 'From 9.0', reset: 'Reset', foundMovies: 'Movies found:',
    noMovies: 'Nothing found 🎭', changeFilters: 'Try changing the filters',
    profileName: 'Dreaming Cinephile', profileBio: 'Making honest promises to cinema since 2024.',
    promises: 'Promises made', averageRating: 'Average rating', tickets: 'Tickets',
    ticketsTitle: 'My digital artifacts', addTicket: '+ Add ticket', cancel: 'Cancel',
    movieTitle: 'Movie title', cinema: 'Cinema', date: 'Date', time: 'Time',
    saveArtifact: 'Save artifact', noTickets: 'No saved tickets yet.',
    history: 'Promise history', noPromises: 'You have not made any movie promises yet.',
    reviewSaved: '🤙 Promise made! Your rating and review were saved.',
    ratingFormTitle: 'Make your movie promise', originality: 'Originality of the idea',
    conflict: 'Conflict, development, ending', acting: 'Acting', chemistry: 'Chemistry between characters',
    composition: 'Composition, light, color', soundtrack: 'Soundtrack', emotions: 'Emotions evoked',
    rewatch: 'Would you rewatch it?', review: 'Your review',
    reviewPlaceholder: 'Describe your feelings... (at least 10 characters)', reviewTooShort: 'Review is too short',
    saving: 'Saving...', saveRating: 'Link pinkies and save rating 🤙', film: 'Film',
    theater: 'Cinema', seat: 'Seat', backToCatalog: 'Back to catalog', director: 'Director:',
    scrollToRate: '↓ Scroll down to rate ↓', comingSoon: 'Coming soon', friendsTitle: 'Friends are coming soon',
    friendsDescription: 'We are preparing a space where you can find friends and share cinematic promises.',
    goToMovies: 'Go to movies', seriesTitle: 'Series are coming soon',
    seriesDescription: 'We are preparing a dedicated series collection with the same honest ratings and reviews.',
    animationsTitle: 'Animations are coming soon',
    animationsDescription: 'A dedicated animation collection for ratings, reviews and collecting is on the way.',
  },
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ru');

  useEffect(() => {
    const savedLocale = window.localStorage.getItem('twinpy-locale');
    const timeoutId = window.setTimeout(() => {
      if (savedLocale === 'ru' || savedLocale === 'en') setLocaleState(savedLocale);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem('twinpy-locale', locale);
  }, [locale]);

  const setLocale = (nextLocale: Locale) => setLocaleState(nextLocale);
  const t = (key: TranslationKey) => translations[locale][key];

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
}
