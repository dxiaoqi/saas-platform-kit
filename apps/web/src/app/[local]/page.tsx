import LangSwitcher from '@/components/language-switch';
import { useTranslations } from 'next-intl';
export default function Home() {
  const t = useTranslations('common');

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('language')}</p>
      <LangSwitcher />
    </div>
  );
}
