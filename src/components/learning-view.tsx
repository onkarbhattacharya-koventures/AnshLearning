'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Language, Word, Sentence, Paragraph, Story } from '@/lib/data';
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
import { Volume2, Star } from 'lucide-react';

interface LearningViewProps {
  module: {
    content: (Word | Sentence | Paragraph | Story)[];
  };
  language: Language;
}

export function LearningView({ module, language }: LearningViewProps) {
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

  const { content } = module;

  if (content.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No content available for this module yet. Stay tuned!</p>
      </div>
    );
  }

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
      window.speechSynthesis.cancel(); // Cancel any previous speech
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentItem = content[current];
  let image;
  if (currentItem && 'imageId' in currentItem) {
    image = placeholderImages.find(img => img.id === currentItem.imageId);
  }

  return (
    <div className="w-full flex flex-col items-center gap-10 py-6">
      <div className="flex w-full max-w-2xl items-center justify-between px-4">
        <div className="flex gap-1.5 focus-visible:outline-none">
          {content.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-primary' : 'w-2 bg-muted'}`}
            />
          ))}
        </div>
        <span className="text-sm font-bold text-muted-foreground tabular-nums">
          {current + 1} / {content.length}
        </span>
      </div>

      <Carousel setApi={setApi} className="w-full max-w-3xl">
        <CarouselContent className="-ml-4">
          {content.map((item: any, idx: number) => {
            let itemImage;
            if ('imageId' in item) {
              itemImage = placeholderImages.find(img => img.id === item.imageId);
            }
            return (
              <CarouselItem key={item.id} className="pl-4">
                <div className={`overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-black/5 transition-transform duration-500 ${idx === current ? 'scale-100' : 'scale-95 opacity-50'}`}>
                  <div className="relative aspect-video w-full overflow-hidden">
                    {itemImage ? (
                      <Image
                        src={itemImage.imageUrl}
                        alt={itemImage.description}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        data-ai-hint={itemImage.imageHint}
                        priority={idx === current}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                        <Star className="h-20 w-20 text-primary/20 animate-pulse" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="line-clamp-2 font-headline text-3xl font-bold text-white md:text-4xl">
                        {'text' in item ? item.text[language] : item.title[language]}
                      </h3>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-16 glass" />
        <CarouselNext className="hidden md:flex -right-16 glass" />
      </Carousel>

      {currentItem && (
        <div className="flex w-full max-w-2xl flex-col items-center gap-8 rounded-[2.5rem] bg-white p-8 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom-10">
          <div className="flex w-full items-center justify-between border-b pb-6">
            <div className="flex flex-col gap-1 text-left">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Discover</span>
              <h2 className="font-headline text-4xl font-bold text-foreground">
                {'text' in currentItem ? currentItem.text[language] : currentItem.title[language]}
              </h2>
            </div>
            <Button
              size="icon"
              className="h-14 w-14 rounded-2xl bg-primary text-white shadow-lg hover:shadow-primary/50 transition-all hover:scale-105"
              onClick={() => {
                const text = 'text' in currentItem ? currentItem.text[language] : currentItem.content[language];
                handleSpeak(text, language);
              }}
            >
              <Volume2 className="h-7 w-7" />
              <span className="sr-only">Listen</span>
            </Button>
          </div>

          <div className="w-full">
            <PronunciationTool word={currentItem as Word} language={language} />
          </div>
        </div>
      )}
    </div>
  );
}
