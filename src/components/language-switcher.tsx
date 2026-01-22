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
      className="flex items-center space-x-4"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="en" id="en" />
        <Label htmlFor="en" className="font-bold cursor-pointer underline decoration-primary/30">EN 🇺🇸</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="de" id="de" />
        <Label htmlFor="de" className="font-bold cursor-pointer underline decoration-primary/30">DE 🇩🇪</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="fr" id="fr" />
        <Label htmlFor="fr" className="font-bold cursor-pointer underline decoration-primary/30">FR 🇫🇷</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="es" id="es" />
        <Label htmlFor="es" className="font-bold cursor-pointer underline decoration-primary/30">ES 🇪🇸</Label>
      </div>
    </RadioGroup>
  );
}
