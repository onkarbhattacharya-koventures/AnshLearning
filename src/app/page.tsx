'use client';

import { useState } from 'react';
import type { Category, Word, Language, AgeGroup } from '@/lib/data';
import { ageGroups, categories as allCategories, words as allWords } from '@/lib/data';
import { LanguageSwitcher } from '@/components/language-switcher';
import { AgeSelector } from '@/components/age-selector';
import { CategoryGrid } from '@/components/category-grid';
import { LearningView } from '@/components/learning-view';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAgeSelect = (ageGroup: AgeGroup) => {
    setSelectedAgeGroup(ageGroup);
    setSelectedCategory(null);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const resetCategory = () => {
    setSelectedCategory(null);
  };

  const resetAgeGroup = () => {
    setSelectedAgeGroup(null);
    setSelectedCategory(null);
  };

  const filteredCategories = selectedAgeGroup
    ? allCategories.filter(c => c.ageGroups.includes(selectedAgeGroup))
    : [];

  const filteredWords = selectedCategory && selectedAgeGroup
    ? allWords.filter(w => w.categoryId === selectedCategory.id && w.ageGroups.includes(selectedAgeGroup))
    : [];

  const renderContent = () => {
    if (!selectedAgeGroup) {
      return (
        <AgeSelector
          ageGroups={ageGroups}
          onSelect={handleAgeSelect}
          language={language}
        />
      );
    }
    if (!selectedCategory) {
      return (
        <CategoryGrid
          categories={filteredCategories}
          onSelect={handleCategorySelect}
          language={language}
        />
      );
    }
    return (
      <LearningView
        words={filteredWords}
        category={selectedCategory}
        language={language}
      />
    );
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="flex w-full max-w-5xl items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="h-10 w-10 text-primary" />
          <h1 className="font-headline text-2xl font-bold text-primary-foreground sm:text-3xl md:text-4xl">
            LanguageKids
          </h1>
        </div>
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
      </header>
      
      <main className="flex flex-1 flex-col w-full max-w-5xl items-center justify-center mt-8">
        <div className="w-full">
          {selectedAgeGroup && (
            <div className="mb-6 flex justify-start">
              <Button variant="ghost" onClick={selectedCategory ? resetCategory : resetAgeGroup}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {selectedCategory
                  ? `Back to Categories`
                  : `Back to Age Groups`}
              </Button>
            </div>
          )}
          {renderContent()}
        </div>
      </main>

      <footer className="w-full max-w-5xl text-center mt-8 py-4">
          <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} LanguageKids. A fun way to learn languages.
          </p>
      </footer>
    </div>
  );
}
