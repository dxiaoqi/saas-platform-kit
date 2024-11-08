'use client';
import { localeItems, usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
type LanDataType = {
  code?: string;
  name?: string;
};
export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  console.log(locale);

  const handleChange = (e: { target: { value: any } }) => {
    router.push(pathname, { locale: e.target.value });
  };

  return (
    <div>
      <select value={locale} onChange={handleChange} className="h-8 m-2 p-1 rounded border-current">
        <option value={locale}> {GetLangData(locale).name}</option>

        {localeItems.map((item: LanDataType) => {
          if (item.code === locale) return null;
          return (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
export function GetLangData(defaultLocale: string): LanDataType {
  var res = {};
  {
    localeItems.map((locale: { code?: any }) => {
      if (locale.code === defaultLocale) {
        console.log(locale);
        res = locale;
      }
    });
  }
  return res;
}
