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
        <Label htmlFor="en" className="font-bold cursor-pointer">EN</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="de" id="de" />
        <Label htmlFor="de" className="font-bold cursor-pointer">DE</Label>
      </div>
    </RadioGroup>
  );
}
