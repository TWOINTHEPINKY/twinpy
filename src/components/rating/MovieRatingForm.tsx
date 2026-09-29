'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMovieStore } from '@/store/movieStore';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n';

const createRatingSchema = (reviewTooShort: string) => z.object({
  originality: z.number().min(1).max(10),
  conflict: z.number().min(1).max(10),
  acting: z.number().min(1).max(10),
  chemistry: z.number().min(1).max(10),
  composition: z.number().min(1).max(10),
  soundtrack: z.number().min(1).max(10),
  emotions: z.number().min(1).max(10),
  rewatch: z.number().min(1).max(10),
  review: z.string().min(10, reviewTooShort).max(5000),
});

type RatingFormData = z.infer<ReturnType<typeof createRatingSchema>>;

export function MovieRatingForm({ movieId }: { movieId: string }) {
  const { t } = useI18n();
  const ratingSchema = createRatingSchema(t('reviewTooShort'));
  const criteriaLabels: Record<keyof Omit<RatingFormData, 'review'>, string> = {
    originality: t('originality'), conflict: t('conflict'), acting: t('acting'), chemistry: t('chemistry'),
    composition: t('composition'), soundtrack: t('soundtrack'), emotions: t('emotions'), rewatch: t('rewatch'),
  };
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RatingFormData>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      originality: 5, conflict: 5, acting: 5, chemistry: 5,
      composition: 5, soundtrack: 5, emotions: 5, rewatch: 5, review: ""
    }
  });

  const { addRating } = useMovieStore();
  const router = useRouter();

  const onSubmit = async (data: RatingFormData) => {
    // Считаем средний рейтинг
    const criteriaSum = data.originality + data.conflict + data.acting + data.chemistry + 
                        data.composition + data.soundtrack + data.emotions + data.rewatch;
    const avgRating = Math.round((criteriaSum / 8) * 10) / 10;

    addRating(movieId, avgRating, data.review);

    alert(t('reviewSaved'));
    reset();
    router.push('/profile');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto p-8 bg-twinpy-surface/50 backdrop-blur-sm rounded-2xl border border-twinpy-purple/30">
      <h3 className="text-2xl font-bold text-twinpy-gold mb-6 text-center">{t('ratingFormTitle')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(Object.keys(criteriaLabels) as Array<keyof typeof criteriaLabels>).map((key) => (
          <div key={key} className="space-y-2">
            <label htmlFor={key} className="text-sm font-medium text-twinpy-muted flex justify-between">
              {criteriaLabels[key]}
              <span className="text-twinpy-neon">1-10</span>
            </label>
            <input 
              id={key}
              type="number" 
              min="1" 
              max="10" 
              {...register(key, { valueAsNumber: true })}
              className="w-full bg-twinpy-bg border border-twinpy-purple/50 rounded-lg px-4 py-2 text-twinpy-text focus:outline-none focus:ring-2 focus:ring-twinpy-neon focus:border-transparent transition-all"
            />
            {errors[key] && <span className="text-xs text-red-400">{errors[key]?.message}</span>}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label htmlFor="review" className="text-sm font-medium text-twinpy-muted">{t('review')}</label>
        <textarea 
          id="review"
          {...register('review')} 
          rows={5}
          placeholder={t('reviewPlaceholder')}
          className="w-full bg-twinpy-bg border border-twinpy-purple/50 rounded-lg px-4 py-3 text-twinpy-text focus:outline-none focus:ring-2 focus:ring-twinpy-turquoise focus:border-transparent transition-all resize-none"
        />
        {errors.review && <span className="text-xs text-red-400">{errors.review.message}</span>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-twinpy-neon to-twinpy-purple text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(255,0,110,0.5)] transition-all duration-300 disabled:opacity-50"
      >
        {isSubmitting ? t('saving') : t('saveRating')}
      </button>
    </form>
  );
}