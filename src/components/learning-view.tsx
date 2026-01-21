'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Category, Language, Word, Sentence, Paragraph, Story } from '@/lib/data';
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
  sentences: Sentence[];
  paragraphs: Paragraph[];
  stories: Story[];
  category: Category;
  language: Language;
}

export function LearningView({ words, sentences, paragraphs, stories, category, language }: LearningViewProps) {
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

  const content = [...words, ...sentences, ...paragraphs, ...stories];

  if (content.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No content available for this category and age group yet. Stay tuned!</p>
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

  const currentItem = content[current];
  let image;
  if (currentItem && 'imageId' in currentItem) {
    image = placeholderImages.find(img => img.id === currentItem.imageId);
  }

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <Carousel setApi={setApi} className="w-full max-w-2xl">
        <CarouselContent>
          {content.map((item) => {
            let itemImage;
            if ('imageId' in item) {
              itemImage = placeholderImages.find(img => img.id === item.imageId);
            }
            return (
              <CarouselItem key={item.id}>
                <Card className="overflow-hidden shadow-xl">
                  <CardContent className="p-0">
                    <div className="aspect-[3/2] relative w-full">
                       {itemImage && <Image
                        src={itemImage.imageUrl}
                        alt={itemImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={itemImage.imageHint}
                      />}
                      {/* @ts-ignore */}
                      {!itemImage && item.text && (
                        <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
                           {/* @ts-ignore */}
                          <p className="text-2xl text-center p-8">{item.text[language]}</p>
                        </div>
                      )}
                       {/* @ts-ignore */}
                      {!itemImage && item.title && (
                        <div className="flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
                           {/* @ts-ignore */}
                          <h2 className="text-3xl font-bold mb-4">{item.title[language]}</h2>
                           {/* @ts-ignore */}
                          <p className="text-lg text-center p-8">{item.content[language]}</p>
                        </div>
                      )}
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

      {currentItem && (
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
          <div className='flex items-center gap-4'>
            {/* @ts-ignore */}
            <h2 className="text-5xl font-bold font-headline text-primary-foreground/90">
              {/* @ts-ignore */}
              {currentItem.text ? currentItem.text[language] : currentItem.title[language]}
            </h2>
            <Button variant="outline" size="icon" onClick={() => handleSpeak(currentItem.text ? currentItem.text[language] : currentItem.content[language], language)}>
              <Volume2 className="h-6 w-6" />
              <span className="sr-only">Listen</span>
            </Button>
          </div>
          {/* @ts-ignore */}
          <PronunciationTool word={currentItem} language={language} />
        </div>
      )}
    </div>
  );
}
