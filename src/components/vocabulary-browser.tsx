'use client';

import { useState } from 'react';
import { vocabularyEntries, type VocabularyEntry } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, Search } from 'lucide-react';

interface VocabularyBrowserProps {
  language: 'en' | 'de';
}

export function VocabularyBrowser({ language }: VocabularyBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredEntries = vocabularyEntries.filter(entry => {
    const matchesSearch = searchTerm === '' || 
      entry.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.german.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || entry.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(vocabularyEntries.map(e => e.category).filter(Boolean))];

  const handleSpeak = (text: string, lang: 'en' | 'de') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-US' : 'de-DE';
      utterance.rate = 0.8;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vocabulary..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEntries.slice(0, 50).map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {language === 'en' ? entry.english : entry.german}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSpeak(language === 'en' ? entry.english : entry.german, language)}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">
                {language === 'en' ? entry.german : entry.english}
              </p>
              <div className="flex flex-wrap gap-1">
                {entry.category && (
                  <Badge variant="secondary" className="text-xs">
                    {entry.category}
                  </Badge>
                )}
                {entry.ageGroups.map(age => (
                  <Badge key={age} variant="outline" className="text-xs">
                    {age}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEntries.length > 50 && (
        <p className="text-center text-muted-foreground">
          Showing first 50 results. Refine your search to see more.
        </p>
      )}
    </div>
  );
}