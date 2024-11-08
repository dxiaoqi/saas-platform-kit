import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const localeItems = [
  { name: 'English', code: 'en', iso: 'en-US', dir: 'ltr' },
  { name: '中文', code: 'zh-CN', iso: 'zh-CN', dir: 'ltr' },
];

export const routing = defineRouting({
  locales: ['en', 'zh-CN'],
  defaultLocale: 'zh-CN',
});

export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);
