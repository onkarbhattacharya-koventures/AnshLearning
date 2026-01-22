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
    learn: { en: 'Learn', de: 'Lernen', fr: 'Apprendre', es: 'Aprender', hi: 'सीखें' },
    vocabulary: { en: 'Vocabulary', de: 'Wortschatz', fr: 'Vocabulaire', es: 'Vocabulario', hi: 'शब्दावली' },
    library: { en: 'Library', de: 'Bibliothek', fr: 'Bibliothèque', es: 'Biblioteca', hi: 'पुस्तकालय' },
  };

  const backTranslations = {
    modules: { en: 'Back to Modules', de: 'Zurück zu den Modulen', fr: 'Retour aux modules', es: 'Volver a los módulos', hi: 'मॉड्यूल पर वापस जाएं' },
    ageGroups: { en: 'Back to Age Groups', de: 'Zurück zu den Altersgruppen', fr: 'Retour aux groupes d\'âge', es: 'Volver a los grupos de edad', hi: 'आयु समूहों पर वापस जाएं' },
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
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden p-4 sm:p-6 md:p-8">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-40 left-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <header className="z-10 flex w-full max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-lg ring-1 ring-black/5 animate-float transform transition-transform hover:scale-110 sm:h-12 sm:w-12">
            <Logo className="h-full w-full text-primary" />
          </div>
          <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-gradient">Language</span>
            <span className="text-foreground shrink-0">Kids</span>
          </h1>
        </div>
        <div className="glass flex w-auto items-center gap-2 rounded-2xl px-3 py-2 ring-1 ring-black/5 sm:gap-4 sm:px-4 sm:py-2">
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>
      </header>

      <main className="z-10 mt-12 flex w-full max-w-5xl flex-1 flex-col items-center justify-start">
        <div className="w-full">
          {activeTab === 'learn' && currentAgeGroup && (
            <div className="mb-8 flex justify-start">
              <Button
                variant="ghost"
                onClick={currentModule ? resetModule : resetAgeGroup}
                className="hover:bg-primary/5 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="font-medium">
                  {currentModule
                    ? backTranslations.modules[language]
                    : backTranslations.ageGroups[language]}
                </span>
              </Button>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-10 w-full overflow-x-auto pb-2 scrollbar-hide">
              <TabsList className="glass flex min-w-max w-full justify-start gap-2 overflow-hidden rounded-2xl p-2 ring-1 ring-black/5 sm:grid sm:grid-cols-3 sm:min-w-0">
                <TabsTrigger
                  value="learn"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl px-6 transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg sm:px-3"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="font-semibold whitespace-nowrap">{tabTranslations.learn[language]}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="vocabulary"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl px-6 transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg sm:px-3"
                >
                  <Search className="h-4 w-4" />
                  <span className="font-semibold whitespace-nowrap">{tabTranslations.vocabulary[language]}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="library"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl px-6 transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg sm:px-3"
                >
                  <Library className="h-4 w-4" />
                  <span className="font-semibold whitespace-nowrap">{tabTranslations.library[language]}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="learn" className="mt-0 focus-visible:outline-none">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                {renderLearningContent()}
              </div>
            </TabsContent>

            <TabsContent value="vocabulary" className="mt-0 focus-visible:outline-none">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <VocabularyBrowser language={language} />
              </div>
            </TabsContent>

            <TabsContent value="library" className="mt-0 focus-visible:outline-none">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ResourceLibrary language={language} />
              </div>
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
