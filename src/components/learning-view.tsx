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
import { Volume2, Star, CheckCircle2, Award, ArrowRight, RefreshCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LearningViewProps {
  module: {
    id: string;
    content: (Word | Sentence | Paragraph | Story)[];
  };
  language: Language;
  onComplete?: () => void;
}

export function LearningView({ module, language, onComplete }: LearningViewProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

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

  const handleComplete = () => {
    setIsCompleted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899']
    });
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-2xl">
            <Award className="h-16 w-16 text-white" />
          </div>
        </div>
        <h2 className="font-headline text-5xl font-bold mb-4 tracking-tight">Amazing Job!</h2>
        <p className="text-xl text-muted-foreground max-w-md mb-10">
          You just finished the <span className="text-primary font-bold">"{module.id}"</span> module.
          Keep up the great work!
        </p>
        <div className="flex gap-4">
          <Button
            size="lg"
            className="rounded-2xl h-14 px-8 text-lg font-bold shadow-xl hover:scale-105 transition-transform"
            onClick={onComplete}
          >
            Explore More <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-2xl h-14 px-8 text-lg font-bold border-2"
            onClick={() => {
              setIsCompleted(false);
              setCurrent(0);
              api?.scrollTo(0);
            }}
          >
            Practice Again <RefreshCcw className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  if (content.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-20">
        <Star className="h-16 w-16 mx-auto mb-4 text-muted-foreground/20" />
        <p className="text-xl">No content available for this module yet. Stay tuned!</p>
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
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentItem = content[current];
  const isLastItem = current === content.length - 1;

  return (
    <div className="w-full flex flex-col items-center gap-10 py-6">
      <div className="flex w-full max-w-2xl items-center justify-between px-4">
        <div className="flex gap-1.5 focus-visible:outline-none">
          {content.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]' : idx < current ? 'w-2 bg-primary/40' : 'w-2 bg-muted'}`}
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
                <div className={`overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-black/5 transition-transform duration-500 ${idx === current ? 'scale-100 shadow-primary/20' : 'scale-95 opacity-50'}`}>
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
                        <Star className="h-24 w-24 text-primary/20 animate-pulse" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-10 left-10 right-10">
                      <h3 className="line-clamp-2 font-headline text-4xl font-bold text-white md:text-5xl leading-tight">
                        {'text' in item ? item.text[language] : item.title[language]}
                      </h3>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="-left-20 glass h-14 w-14 border-2" />
          <CarouselNext className="-right-20 glass h-14 w-14 border-2" />
        </div>
      </Carousel>

      {currentItem && (
        <div className="flex w-full max-w-2xl flex-col items-center gap-8 rounded-[2.5rem] bg-white p-10 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom-10">
          <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between border-b pb-8">
            <div className="flex flex-col gap-1 text-left">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">Current Word</span>
              <h2 className="font-headline text-5xl font-bold text-foreground">
                {'text' in currentItem ? currentItem.text[language] : currentItem.title[language]}
              </h2>
            </div>
            <div className="flex gap-4">
              <Button
                size="icon"
                className="h-16 w-16 rounded-2xl bg-primary text-white shadow-lg hover:shadow-primary/50 transition-all hover:scale-110 active:scale-95"
                onClick={() => {
                  const text = 'text' in currentItem ? currentItem.text[language] : (currentItem as any).content[language];
                  handleSpeak(text, language);
                }}
              >
                <Volume2 className="h-8 w-8" />
                <span className="sr-only">Listen</span>
              </Button>
              {isLastItem && (
                <Button
                  className="h-16 px-8 rounded-2xl bg-secondary text-white font-bold text-xl shadow-lg hover:shadow-secondary/50 transition-all hover:scale-110 active:scale-95"
                  onClick={handleComplete}
                >
                  <CheckCircle2 className="mr-2 h-6 w-6" />
                  Finish
                </Button>
              )}
            </div>
          </div>

          <div className="w-full">
            <div className="mb-4 text-center">
              <span className="text-sm font-medium text-muted-foreground">Practice your pronunciation</span>
            </div>
            <PronunciationTool word={currentItem as Word} language={language} />
          </div>
        </div>
      )}
    </div>
  );
}
