'use client';

import { useState } from 'react';
import type { Language, AgeGroup } from '@/lib/data';
import { ageGroups } from '@/lib/data';
import { modules } from '@/lib/modules';
import { LanguageSwitcher } from '@/components/language-switcher';
import { AgeSelector } from '@/components/age-selector';
import { ModuleGrid } from '@/components/module-grid';
import { LearningView } from '@/components/learning-view';
import { VocabularyBrowser } from '@/components/vocabulary-browser';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, Search } from 'lucide-react';
import { TranslationFooter } from '@/components/translation-footer';
import { ResourceLibrary } from '@/components/resource-library';
import { Library } from 'lucide-react';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentAgeGroup, setCurrentAgeGroup] = useState<AgeGroup | null>(null);
  const [currentModule, setCurrentModule] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('learn');

  const tabTranslations = {
    learn: { en: 'Learn', de: 'Lernen', fr: 'Apprendre', es: 'Aprender' },
    vocabulary: { en: 'Vocabulary', de: 'Wortschatz', fr: 'Vocabulaire', es: 'Vocabulario' },
    library: { en: 'Library', de: 'Bibliothek', fr: 'Bibliothèque', es: 'Biblioteca' },
  };

  const backTranslations = {
    modules: { en: 'Back to Modules', de: 'Zurück zu den Modulen', fr: 'Retour aux modules', es: 'Volver a los módulos' },
    ageGroups: { en: 'Back to Age Groups', de: 'Zurück zu den Altersgruppen', fr: 'Retour aux groupes d\'âge', es: 'Volver a los grupos de edad' },
  };

  const handleAgeSelect = (ageGroup: AgeGroup) => {
    setCurrentAgeGroup(ageGroup);
    setCurrentModule(null);
  };

  const handleModuleSelect = (module: any) => {
    setCurrentModule(module);
  };

  const resetModule = () => {
    setCurrentModule(null);
  };

  const resetAgeGroup = () => {
    setCurrentAgeGroup(null);
    setCurrentModule(null);
    setActiveTab('learn');
  };

  const filteredModules = currentAgeGroup
    ? modules.filter(m => m.ageGroups.includes(currentAgeGroup))
    : [];

  const renderLearningContent = () => {
    if (!currentAgeGroup) {
      return (
        <AgeSelector
          ageGroups={ageGroups}
          onSelect={handleAgeSelect}
          language={language}
        />
      );
    }
    if (!currentModule) {
      return (
        <ModuleGrid
          modules={filteredModules}
          onSelect={handleModuleSelect}
          language={language}
        />
      );
    }
    return (
      <LearningView
        module={currentModule}
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
          {activeTab === 'learn' && currentAgeGroup && (
            <div className="mb-6 flex justify-start">
              <Button variant="ghost" onClick={currentModule ? resetModule : resetAgeGroup}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {currentModule
                  ? backTranslations.modules[language]
                  : backTranslations.ageGroups[language]}
              </Button>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="learn" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {tabTranslations.learn[language]}
              </TabsTrigger>
              <TabsTrigger value="vocabulary" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                {tabTranslations.vocabulary[language]}
              </TabsTrigger>
              <TabsTrigger value="library" className="flex items-center gap-2">
                <Library className="h-4 w-4" />
                {tabTranslations.library[language]}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="learn" className="mt-0">
              {renderLearningContent()}
            </TabsContent>

            <TabsContent value="vocabulary" className="mt-0">
              <VocabularyBrowser language={language} />
            </TabsContent>

            <TabsContent value="library" className="mt-0">
              <ResourceLibrary language={language} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="w-full max-w-5xl text-center mt-8 py-4 mb-20">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} LanguageKids. A fun way to learn languages.
        </p>
      </footer>

      {/* Translation Footer */}
      <TranslationFooter defaultLanguage={language} />
    </div>
  );
}
