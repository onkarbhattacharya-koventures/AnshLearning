'use client';

import type { AgeGroup, Language } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface AgeSelectorProps {
  ageGroups: AgeGroup[];
  onSelect: (ageGroup: AgeGroup) => void;
  language: Language;
}

const titles: Record<Language, string> = {
    en: 'Who is learning today?',
    de: 'Wer lernt heute?',
};

export function AgeSelector({ ageGroups, onSelect, language }: AgeSelectorProps) {
  return (
    <div className="w-full text-center">
      <h2 className="text-3xl font-bold font-headline mb-8 text-primary-foreground/90">{titles[language]}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 md:gap-6">
        {ageGroups.map((ageGroup) => (
          <Card
            key={ageGroup}
            onClick={() => onSelect(ageGroup)}
            className="cursor-pointer bg-card hover:bg-primary/20 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
          >
            <CardHeader className="p-6">
              <CardTitle className="text-xl md:text-2xl font-bold text-center">
                {ageGroup}
                <span className="block text-sm text-muted-foreground mt-1">Years</span>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
