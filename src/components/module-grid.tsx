
import type { Language } from '@/lib/data';
import type { Module } from '@/lib/modules';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface ModuleGridProps {
  modules: Module[];
  onSelect: (module: Module) => void;
  language: Language;
}

export function ModuleGrid({ modules, onSelect, language }: ModuleGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {modules.map(module => (
        <Card
          key={module.id}
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => onSelect(module)}
        >
          <CardHeader>
            <CardTitle className="text-lg">
              {module.title[language]}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
