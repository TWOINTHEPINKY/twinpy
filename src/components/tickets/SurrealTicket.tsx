'use client';

import { motion } from 'framer-motion';

interface TicketProps {
  movieTitle: string;
  cinema: string;
  date: string;
  time: string;
  seat: string;
  color: string;
}

export default function SurrealTicket({ movieTitle, cinema, date, time, seat, color }: TicketProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, rotate: 1 }}
      className="relative w-full max-w-md mx-auto group cursor-pointer"
    >
      {/* Основной фон билета с вырезами (через mask или псевдоэлементы, здесь упрощенный CSS) */}
      <div className={`relative bg-gradient-to-br ${color} p-[2px] rounded-xl overflow-hidden shadow-lg group-hover:shadow-[0_0_25px_rgba(255,0,110,0.4)] transition-shadow duration-500`}>
        <div className="bg-twinpy-bg rounded-[10px] p-6 relative">
          
          {/* Декоративные вырезы по бокам */}
          <div className="absolute top-1/2 -left-3 w-6 h-6 bg-twinpy-bg rounded-full -translate-y-1/2"></div>
          <div className="absolute top-1/2 -right-3 w-6 h-6 bg-twinpy-bg rounded-full -translate-y-1/2"></div>
          
          {/* Пунктирная линия посередине */}
          <div className="absolute top-0 bottom-0 left-1/2 border-l-2 border-dashed border-twinpy-surface/50 -translate-x-1/2 hidden md:block"></div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Левая часть: Информация */}
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-twinpy-muted text-xs uppercase tracking-widest mb-1">Фильм</p>
                <h3 className="text-xl font-bold text-twinpy-text leading-tight">{movieTitle}</h3>
              </div>
              <div>
                <p className="text-twinpy-muted text-xs uppercase tracking-widest mb-1">Кинотеатр</p>
                <p className="text-twinpy-text font-medium">{cinema}</p>
              </div>
            </div>

            {/* Правая часть: Детали */}
            <div className="flex-1 space-y-4 md:border-l md:border-twinpy-surface/30 md:pl-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-twinpy-muted text-xs uppercase tracking-widest mb-1">Дата</p>
                  <p className="text-twinpy-gold font-bold">{date}</p>
                </div>
                <div>
                  <p className="text-twinpy-muted text-xs uppercase tracking-widest mb-1">Время</p>
                  <p className="text-twinpy-text font-bold">{time}</p>
                </div>
              </div>
              <div>
                <p className="text-twinpy-muted text-xs uppercase tracking-widest mb-1">Место</p>
                <p className="text-twinpy-turquoise font-mono text-lg tracking-wider">{seat}</p>
              </div>
            </div>
          </div>

          {/* Нижний штрих-код (декоративный) */}
          <div className="mt-6 pt-4 border-t border-twinpy-surface/30 flex justify-center opacity-50">
            <div className="h-8 w-3/4 bg-[linear-gradient(to_right,#fff_2px,transparent_2px)] bg-[length:8px_100%]"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}