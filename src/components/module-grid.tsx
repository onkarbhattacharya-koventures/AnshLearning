
import type { Language } from '@/lib/data';
import type { Module } from '@/lib/modules';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface ModuleGridProps {
  modules: Module[];
  onSelect: (module: Module) => void;
  language: Language;
}

import { Book, GraduationCap, Star, Sparkles } from 'lucide-react';

export function ModuleGrid({ modules, onSelect, language }: ModuleGridProps) {
  const getModuleIcon = (idx: number) => {
    const icons = [<Book key="bk" />, <GraduationCap key="gc" />, <Star key="st" />, <Sparkles key="sp" />];
    return icons[idx % icons.length];
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 py-4">
      {modules.map((module, idx) => (
        <div
          key={module.id}
          className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom-6 fill-mode-both"
          style={{ animationDelay: `${idx * 100}ms` }}
          onClick={() => onSelect(module)}
        >
          <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              {getModuleIcon(idx)}
            </div>

            <h3 className="font-headline text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
              {module.title[language]}
            </h3>

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {module.content.length} {language === 'hi' ? 'आइटम' : 'Items'}
              </span>
              <div className="rounded-full bg-secondary/10 px-3 py-1 text-[10px] font-bold text-secondary uppercase tracking-tight">
                {module.ageGroups.join(', ')}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
