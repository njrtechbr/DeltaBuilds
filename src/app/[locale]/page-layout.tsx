import { useTranslations } from 'next-intl';
import { Header } from '@/components/header';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('Footer');

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm border-t">
        <p>&copy; {new Date().getFullYear()} {t('copyright')}</p>
      </footer>
    </>
  );
}
