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
  fr: 'Qui apprend aujourd\'hui ?',
  es: '¿Quién está aprendiendo hoy?',
  hi: 'आज कौन सीख रहा है?',
};

const yearsLabel: Record<Language, string> = {
  en: 'Years',
  de: 'Jahre',
  fr: 'Ans',
  es: 'Años',
  hi: 'साल',
};

export function AgeSelector({ ageGroups, onSelect, language }: AgeSelectorProps) {
  const getAgeColor = (age: AgeGroup) => {
    switch (age) {
      case '1-3': return 'from-pink-400 to-rose-400';
      case '3-5': return 'from-rose-400 to-orange-400';
      case '5-8': return 'from-amber-300 to-yellow-500';
      case '8-12': return 'from-primary to-indigo-500';
      case '13-15': return 'from-indigo-500 to-purple-600';
      case '15-18': return 'from-emerald-400 to-teal-500';
      default: return 'from-primary to-secondary';
    }
  };

  return (
    <div className="w-full text-center py-8">
      <h2 className="text-3xl font-bold font-headline mb-12 text-foreground/90 md:text-4xl lg:text-5xl">
        {titles[language]}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
        {ageGroups.map((ageGroup, idx) => (
          <div
            key={ageGroup}
            onClick={() => onSelect(ageGroup)}
            className={`group relative cursor-pointer overflow-hidden rounded-3xl p-1 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-8 fill-mode-both`}
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${getAgeColor(ageGroup)} opacity-80 transition-opacity group-hover:opacity-100`} />
            <div className="relative glass h-full rounded-[1.4rem] p-8 flex flex-col items-center justify-center space-y-4">
              <div className={`text-4xl md:text-5xl font-bold font-headline bg-gradient-to-br ${getAgeColor(ageGroup)} bg-clip-text text-transparent`}>
                {ageGroup}
              </div>
              <div className="text-lg font-semibold text-muted-foreground uppercase tracking-widest">
                {yearsLabel[language]}
              </div>
              <Button
                variant="ghost"
                className="mt-4 rounded-full bg-white/50 group-hover:bg-white shadow-sm transition-colors"
                size="sm"
              >
                Select
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
