import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import '@/styles/global.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SaaS Platform',
  description: 'A SaaS Platform Kit',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();
  const locale = useLocale();
  if (params.locale !== locale) {
    console.log(locale, params);
  }
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
