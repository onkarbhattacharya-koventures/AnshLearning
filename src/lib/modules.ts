
import type { Word, Sentence, Paragraph, Story, AgeGroup, Language } from './data';
import { words, sentences, paragraphs, stories } from './data';

export interface Module {
  id: string;
  title: Record<Language, string>;
  ageGroups: AgeGroup[];
  content: (Word | Sentence | Paragraph | Story)[];
}

export const modules: Module[] = [
  {
    id: 'module-1-3-animals',
    title: { en: 'Fun with Animals', de: 'Spaß mit Tieren' },
    ageGroups: ['1-3'],
    content: [
      words.find(w => w.id === 'cat')!,
      words.find(w => w.id === 'dog')!,
      words.find(w => w.id === 'bird')!,
      words.find(w => w.id === 'fish')!,
    ],
  },
  {
    id: 'module-1-3-home',
    title: { en: 'My Home', de: 'Mein Zuhause' },
    ageGroups: ['1-3'],
    content: [
      words.find(w => w.id === 'house')!,
      words.find(w => w.id === 'car')!,
      words.find(w => w.id === 'ball')!,
      words.find(w => w.id === 'bed')!,
    ],
  },
  {
    id: 'module-1-3-food',
    title: { en: 'Yummy Food', de: 'Leckeres Essen' },
    ageGroups: ['1-3'],
    content: [
      words.find(w => w.id === 'bread')!,
      words.find(w => w.id === 'milk')!,
    ],
  },
  {
    id: 'module-3-5-nature',
    title: { en: 'Exploring Nature', de: 'Die Natur entdecken' },
    ageGroups: ['3-5'],
    content: [
      words.find(w => w.id === 'apple')!,
      words.find(w => w.id === 'tree')!,
      words.find(w => w.id === 'flower')!,
      words.find(w => w.id === 'sun')!,
      words.find(w => w.id === 'moon')!,
      words.find(w => w.id === 'star')!,
    ],
  },
    {
    id: 'module-3-5-food',
    title: { en: 'More Yummy Food', de: 'Mehr leckeres Essen' },
    ageGroups: ['3-5'],
    content: [
      words.find(w => w.id === 'cheese')!,
      sentences.find(s => s.id === 's8')!,
    ],
  },
  {
    id: 'module-5-8-school',
    title: { en: 'Fun at School', de: 'Spaß in der Schule' },
    ageGroups: ['5-8'],
    content: [
      words.find(w => w.id === 'book')!,
      words.find(w => w.id === 'school-building')!,
      sentences.find(s => s.id === 's3')!,
      paragraphs.find(p => p.id === 'p2')!,
    ],
  },
  {
    id: 'module-5-8-people',
    title: { en: 'My Friends and Family', de: 'Meine Freunde und Familie' },
    ageGroups: ['5-8'],
    content: [
      words.find(w => w.id === 'family')!,
      words.find(w => w.id === 'friend')!,
      sentences.find(s => s.id === 's1')!,
      sentences.find(s => s.id === 's2')!,
    ],
  },
  {
    id: 'module-8-12-technology',
    title: { en: 'Tech and the World', de: 'Technik und die Welt' },
    ageGroups: ['8-12', '13-15'],
    content: [
      words.find(w => w.id === 'computer')!,
      words.find(w => w.id === 'phone')!,
      stories.find(s => s.id === 'story-1')!,
    ],
  },
  {
    id: 'module-13-15-world',
    title: { en: 'Our World', de: 'Unsere Welt' },
    ageGroups: ['13-15'],
    content: [
      paragraphs.find(p => p.id === 'p1')!,
      stories.find(s => s.id === 'story-2')!,
    ],
  },
  {
    id: 'module-15-18-future',
    title: { en: 'The Future of the World', de: 'Die Zukunft der Welt' },
    ageGroups: ['15-18'],
    content: [
      words.find(w => w.id === 'bicycle')!,
      stories.find(s => s.id === 'story-1')!,
      stories.find(s => s.id === 'story-2')!,
    ],
  },
];
