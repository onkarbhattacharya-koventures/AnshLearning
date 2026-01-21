'use client';

import type { Category, Language } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryGridProps {
  categories: Category[];
  onSelect: (category: Category) => void;
  language: Language;
}

export function CategoryGrid({ categories, onSelect, language }: CategoryGridProps) {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold font-headline mb-8 text-center text-primary-foreground/90">
        {language === 'en' ? 'Choose a Category' : 'Wähle eine Kategorie'}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => {
          const { Icon } = category;
          return (
            <Card
              key={category.id}
              onClick={() => onSelect(category)}
              className="cursor-pointer group overflow-hidden bg-card hover:bg-primary/20 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                <Icon className="h-16 w-16 text-primary group-hover:text-primary-foreground transition-colors" />
                <h3 className="text-lg font-bold text-center">{category.name[language]}</h3>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
