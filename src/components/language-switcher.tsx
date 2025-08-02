"use client";

import { usePathname, useRouter } from "@/navigation";
import { useLocale } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const localeNames: { [key: string]: string } = {
    en: "English (US)",
    es: "Español (ES)",
    "pt-BR": "Português (BR)",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          disabled={locale === "pt-BR"}
          onSelect={() => handleLocaleChange("pt-BR")}
        >
          Português (BR)
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={locale === "en"}
          onSelect={() => handleLocaleChange("en")}
        >
          English (US)
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={locale === "es"}
          onSelect={() => handleLocaleChange("es")}
        >
          Español (ES)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
