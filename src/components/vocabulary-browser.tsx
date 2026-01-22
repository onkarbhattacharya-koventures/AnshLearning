'use client';

import { useState, useEffect } from 'react';
import { vocabularyEntries, type VocabularyEntry } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, Search, Inbox, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

import type { Language } from '@/lib/data';
import { cn } from '@/lib/utils';

interface VocabularyBrowserProps {
  language: Language;
}

export function VocabularyBrowser({ language }: VocabularyBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  const filteredEntries = vocabularyEntries.filter(entry => {
    const matchesSearch = searchTerm === '' ||
      entry.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.german.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.spanish.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.hindi.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !selectedCategory || entry.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(vocabularyEntries.map(e => e.category).filter(Boolean))];

  const handleSpeak = (text: string, lang: Language) => {
    if ('speechSynthesis' in window) {
      const langMap: Record<Language, string> = {
        en: 'en-US',
        de: 'de-DE',
        fr: 'fr-FR',
        es: 'es-ES',
        hi: 'hi-IN'
      };
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langMap[lang] || 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const getDisplayWord = (entry: VocabularyEntry, lang: Language) => {
    switch (lang) {
      case 'en': return entry.english;
      case 'de': return entry.german;
      case 'fr': return entry.french;
      case 'es': return entry.spanish;
      case 'hi': return entry.hindi;
      default: return entry.english;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 py-6">
      <div className="glass rounded-[2.5rem] p-8 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-6">
        <div className="flex flex-col gap-8">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-primary group-focus-within:scale-110 transition-transform" />
            <Input
              placeholder="Search vocabulary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-14 h-16 rounded-[1.25rem] bg-white/50 border-none ring-1 ring-black/5 focus-visible:ring-primary text-xl shadow-inner"
            />
          </div>
          <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={selectedCategory === null ? "default" : "secondary"}
              className={cn(
                "h-12 rounded-2xl px-8 text-sm font-bold transition-all shrink-0",
                selectedCategory === null ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/50 hover:bg-white/80'
              )}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className={cn(
                  "h-12 rounded-2xl px-8 text-sm font-bold transition-all shrink-0",
                  selectedCategory === category ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/50 hover:bg-white/80'
                )}
                onClick={() => setSelectedCategory(category as string)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-[2rem] bg-white p-7 shadow-md ring-1 ring-black/5 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-8 w-32" />
                </div>
                <Skeleton className="h-12 w-12 rounded-2xl" />
              </div>
              <Skeleton className="h-20 w-full rounded-2xl" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-xl" />
                <Skeleton className="h-6 w-16 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredEntries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.slice(0, 50).map((entry, idx) => (
            <div
              key={entry.id}
              className="group relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Vocabulary</span>
                  <h3 className="font-headline text-2xl font-bold text-foreground">
                    {getDisplayWord(entry, language)}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-2xl bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all active:scale-95"
                  onClick={() => handleSpeak(getDisplayWord(entry, language), language)}
                >
                  <Volume2 className="h-6 w-6" />
                </Button>
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl bg-slate-50 p-4 transition-colors group-hover:bg-primary/[0.02]">
                  <p className="text-base font-semibold text-slate-700">
                    {language === 'en' ? entry.german : entry.english}
                  </p>
                  <div className="flex flex-wrap gap-x-3 text-[11px] font-medium text-slate-400 mt-2">
                    {language !== 'fr' && <span>• {entry.french}</span>}
                    {language !== 'es' && <span>• {entry.spanish}</span>}
                    {language !== 'hi' && <span>• {entry.hindi}</span>}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {entry.category && (
                    <div className="rounded-xl bg-primary/10 px-3 py-1.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                      {entry.category}
                    </div>
                  )}
                  {entry.ageGroups.map(age => (
                    <div key={age} className="rounded-xl bg-secondary/10 px-3 py-1.5 text-[10px] font-bold text-secondary uppercase tracking-wider">
                      {age}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center glass rounded-[2.5rem] animate-in fade-in zoom-in duration-500">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Inbox className="h-12 w-12 text-primary/40" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No words found</h3>
          <p className="text-muted-foreground max-w-xs">
            We couldn't find any words matching "{searchTerm}". Try a different search term or category.
          </p>
          <Button
            variant="ghost"
            className="mt-6 text-primary hover:bg-primary/5"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory(null);
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {filteredEntries.length > 50 && (
        <div className="glass rounded-[2.5rem] p-8 text-center border-dashed border-2">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-bold uppercase tracking-widest">
              Showing first 50 results. Refine your search to see more.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
