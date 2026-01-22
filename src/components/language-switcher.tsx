'use client';

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Language } from "@/lib/data";

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

export function LanguageSwitcher({ language, setLanguage }: LanguageSwitcherProps) {
  return (
    <RadioGroup
      defaultValue={language}
      onValueChange={(value) => setLanguage(value as Language)}
      className="flex flex-wrap items-center gap-2 sm:gap-4"
    >
      <div className="flex items-center space-x-1 sm:space-x-2">
        <RadioGroupItem value="en" id="en" className="h-4 w-4" />
        <Label htmlFor="en" className="text-xs font-bold cursor-pointer sm:text-sm">
          <span className="hidden xs:inline">EN 🇺🇸</span>
          <span className="xs:hidden">🇺🇸</span>
        </Label>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
        <RadioGroupItem value="de" id="de" className="h-4 w-4" />
        <Label htmlFor="de" className="text-xs font-bold cursor-pointer sm:text-sm">
          <span className="hidden xs:inline">DE 🇩🇪</span>
          <span className="xs:hidden">🇩🇪</span>
        </Label>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
        <RadioGroupItem value="fr" id="fr" className="h-4 w-4" />
        <Label htmlFor="fr" className="text-xs font-bold cursor-pointer sm:text-sm">
          <span className="hidden xs:inline">FR 🇫🇷</span>
          <span className="xs:hidden">🇫🇷</span>
        </Label>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
        <RadioGroupItem value="es" id="es" className="h-4 w-4" />
        <Label htmlFor="es" className="text-xs font-bold cursor-pointer sm:text-sm">
          <span className="hidden xs:inline">ES 🇪🇸</span>
          <span className="xs:hidden">🇪🇸</span>
        </Label>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
        <RadioGroupItem value="hi" id="hi" className="h-4 w-4" />
        <Label htmlFor="hi" className="text-xs font-bold cursor-pointer sm:text-sm">
          <span className="hidden xs:inline">HI 🇮🇳</span>
          <span className="xs:hidden">🇮🇳</span>
        </Label>
      </div>
    </RadioGroup>
  );
}
