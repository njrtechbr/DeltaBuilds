"use client";

import { usePathname, useRouter } from "@/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
  };

  const locales: { code: string; name: string }[] = [
    { code: "pt-BR", name: "PT" },
    { code: "en", name: "EN" },
    { code: "es", name: "ES" },
  ];

  return (
    <div className="flex items-center gap-1 p-1 rounded-md border bg-secondary">
      {locales.map(({ code, name }) => (
        <Button
          key={code}
          variant={locale === code ? "default" : "ghost"}
          size="sm"
          className="px-2.5 py-1 h-auto text-xs"
          onClick={() => handleLocaleChange(code)}
        >
          {name}
        </Button>
      ))}
    </div>
  );
}
