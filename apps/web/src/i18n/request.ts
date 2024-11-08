import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that the incoming `locale` is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (
      await (locale === 'zh-CN'
        ? // When using Turbopack, this will enable HMR for `en`
          import('../../public/locales/zh-CN/common.json')
        : import(`../../public/locales/en/common.json`))
    ).default,
  };
});
