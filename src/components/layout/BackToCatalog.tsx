'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function BackToCatalog() {
  const { t } = useI18n();

  return (
    <Link href="/movies" className="flex items-center gap-2 text-twinpy-muted hover:text-twinpy-neon transition-colors bg-twinpy-bg/50 backdrop-blur-sm px-4 py-2 rounded-full">
      <span aria-hidden="true">←</span> {t('backToCatalog')}
    </Link>
  );
}
