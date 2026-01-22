
import type { Language } from '@/lib/data';
import type { Module } from '@/lib/modules';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ModuleGridProps {
  modules: Module[];
  onSelect: (module: Module) => void;
  language: Language;
}

import { Book, GraduationCap, Star, Sparkles, LayoutGrid, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ModuleGrid({ modules, onSelect, language }: ModuleGridProps) {
  const getModuleIcon = (idx: number) => {
    const icons = [
      <Book key="bk" className="h-6 w-6" />,
      <GraduationCap key="gc" className="h-6 w-6" />,
      <Star key="st" className="h-6 w-6" />,
      <Sparkles key="sp" className="h-6 w-6" />
    ];
    return icons[idx % icons.length];
  };

  if (modules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center glass rounded-[2.5rem] animate-in fade-in zoom-in duration-500 w-full max-w-4xl mx-auto">
        <div className="h-24 w-24 rounded-full bg-accent/10 flex items-center justify-center mb-6">
          <LayoutGrid className="h-12 w-12 text-accent/40" />
        </div>
        <h3 className="text-2xl font-bold mb-2">No modules found</h3>
        <p className="text-muted-foreground max-w-sm">
          We haven't added modules for this age group yet. Please check back soon or try another age group.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 py-6 w-full max-w-6xl">
      {modules.map((module, idx) => (
        <div
          key={module.id}
          className="group relative cursor-pointer overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
          style={{ animationDelay: `${idx * 100}ms` }}
          onClick={() => onSelect(module)}
        >
          <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-primary via-accent to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="flex flex-col gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:rotate-6">
              {getModuleIcon(idx)}
            </div>

            <div className="space-y-2">
              <h3 className="font-headline text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                {module.title[language]}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Learn essential {module.id} vocabulary and grammar with interactive activities.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-auto border-t">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Content</span>
                <span className="text-sm font-bold text-foreground">
                  {module.content.length} {language === 'hi' ? 'आइटम' : 'Items'}
                </span>
              </div>
              <Button size="icon" variant="ghost" className="rounded-full bg-slate-50 group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="absolute top-8 right-8">
            <div className="rounded-full bg-secondary/10 px-4 py-1.5 text-[10px] font-black text-secondary uppercase tracking-widest ring-1 ring-secondary/20">
              {module.ageGroups[0]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
