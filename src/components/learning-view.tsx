'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Category, Language, Word } from '@/lib/data';
import { placeholderImages } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { PronunciationTool } from '@/components/pronunciation-tool';
import { Volume2 } from 'lucide-react';

interface LearningViewProps {
  words: Word[];
  category: Category;
  language: Language;
}

export function LearningView({ words, category, language }: LearningViewProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  if (words.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No words available for this category and age group yet. Stay tuned!</p>
      </div>
    );
  }

  const handleSpeak = (text: string, lang: Language) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-US' : 'de-DE';
      utterance.rate = 0.8;
      window.speechSynthesis.cancel(); // Cancel any previous speech
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentWord = words[current];
  const image = placeholderImages.find(img => img.id === currentWord?.imageId);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <Carousel setApi={setApi} className="w-full max-w-2xl">
        <CarouselContent>
          {words.map((word) => {
            const wordImage = placeholderImages.find(img => img.id === word.imageId);
            return (
              <CarouselItem key={word.id}>
                <Card className="overflow-hidden shadow-xl">
                  <CardContent className="p-0">
                    <div className="aspect-[3/2] relative w-full">
                       {wordImage && <Image
                        src={wordImage.imageUrl}
                        alt={wordImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={wordImage.imageHint}
                      />}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>

      {currentWord && (
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
            <div className='flex items-center gap-4'>
                <h2 className="text-5xl font-bold font-headline text-primary-foreground/90">
                    {currentWord.text[language]}
                </h2>
                <Button variant="outline" size="icon" onClick={() => handleSpeak(currentWord.text[language], language)}>
                    <Volume2 className="h-6 w-6" />
                    <span className="sr-only">Listen</span>
                </Button>
            </div>

          <PronunciationTool word={currentWord} language={language} />
        </div>
      )}
    </div>
  );
}
