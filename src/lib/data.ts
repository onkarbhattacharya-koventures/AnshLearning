
import type { LucideIcon } from 'lucide-react';
import { Cat, Dog, House, Car, Apple, Sprout, Building, Users, Rocket, Globe, MessageSquareText, AlignLeft, BookOpen } from 'lucide-react';
import placeholderData from './placeholder-images.json';

export type Language = 'en' | 'de';
export type AgeGroup = '1-3' | '3-5' | '5-8' | '8-12' | '13-15' | '15-18';

export interface Category {
  id: string;
  name: Record<Language, string>;
  Icon: LucideIcon;
  ageGroups: AgeGroup[];
}

export interface Word {
  id: string;
  categoryId: string;
  text: Record<Language, string>;
  imageId: string;
  ageGroups: AgeGroup[];
}

export interface Sentence {
  id: string;
  categoryId: string;
  text: Record<Language, string>;
  ageGroups: AgeGroup[];
}

export interface Paragraph {
  id: string;
  categoryId: string;
  text: Record<Language, string>;
  ageGroups: AgeGroup[];
}

export interface Story {
  id: string;
  categoryId: string;
  title: Record<Language, string>;
  content: Record<Language, string>;
  ageGroups: AgeGroup[];
}


export const ageGroups: AgeGroup[] = ['1-3', '3-5', '5-8', '8-12', '13-15', '15-18'];

export const categories: Category[] = [
  {
    id: 'animals',
    name: { en: 'Animals', de: 'Tiere' },
    Icon: Cat,
    ageGroups: ['1-3', '3-5', '5-8'],
  },
  {
    id: 'home',
    name: { en: 'At Home', de: 'Zuhause' },
    Icon: House,
    ageGroups: ['1-3', '3-5', '5-8', '8-12'],
  },
    {
    id: 'nature',
    name: { en: 'Nature', de: 'Natur' },
    Icon: Sprout,
    ageGroups: ['3-5', '5-8', '8-12'],
  },
  {
    id: 'people',
    name: { en: 'People', de: 'Menschen' },
    Icon: Users,
    ageGroups: ['5-8', '8-12', '13-15', '15-18'],
  },
  {
    id: 'school',
    name: { en: 'School', de: 'Schule' },
    Icon: Building,
    ageGroups: ['5-8', '8-12', '13-15'],
  },
  {
    id: 'technology',
    name: { en: 'Technology', de: 'Technologie' },
    Icon: Rocket,
    ageGroups: ['8-12', '13-15', '15-18'],
  },
  {
    id: 'world',
    name: { en: 'The World', de: 'Die Welt' },
    Icon: Globe,
    ageGroups: ['13-15', '15-18'],
  },
  {
    id: 'sentences',
    name: { en: 'Sentences', de: 'Sätze' },
    Icon: MessageSquareText,
    ageGroups: ['5-8', '8-12', '13-15', '15-18'],
  },
  {
    id: 'paragraphs',
    name: { en: 'Paragraphs', de: 'Absätze' },
    Icon: AlignLeft,
    ageGroups: ['8-12', '13-15', '15-18'],
  },
  {
    id: 'stories',
    name: { en: 'Stories', de: 'Geschichten' },
    Icon: BookOpen,
    ageGroups: ['8-12', '13-15', '15-18'],
  },
];

export const words: Word[] = [
  // Animals
  { id: 'cat', categoryId: 'animals', text: { en: 'Cat', de: 'Katze' }, imageId: 'cat-1', ageGroups: ['1-3', '3-5'] },
  { id: 'dog', categoryId: 'animals', text: { en: 'Dog', de: 'Hund' }, imageId: 'dog-1', ageGroups: ['1-3', '3-5'] },
  // Home
  { id: 'house', categoryId: 'home', text: { en: 'House', de: 'Haus' }, imageId: 'house-1', ageGroups: ['1-3', '3-5'] },
  { id: 'car', categoryId: 'home', text: { en: 'Car', de: 'Auto' }, imageId: 'car-1', ageGroups: ['1-3', '3-5', '5-8'] },
  { id: 'ball', categoryId: 'home', text: { en: 'Ball', de: 'Ball' }, imageId: 'ball-1', ageGroups: ['1-3'] },
  // Nature
  { id: 'apple', categoryId: 'nature', text: { en: 'Apple', de: 'Apfel' }, imageId: 'apple-1', ageGroups: ['3-5', '5-8'] },
  { id: 'tree', categoryId: 'nature', text: { en: 'Tree', de: 'Baum' }, imageId: 'tree-1', ageGroups: ['3-5', '5-8'] },
  { id: 'flower', categoryId: 'nature', text: { en: 'Flower', de: 'Blume' }, imageId: 'flower-1', ageGroups: ['3-5', '5-8'] },
  { id: 'sun', categoryId: 'nature', text: { en: 'Sun', de: 'Sonne' }, imageId: 'sun-1', ageGroups: ['3-5', '5-8'] },
  { id: 'moon', categoryId: 'nature', text: { en: 'Moon', de: 'Mond' }, imageId: 'moon-1', ageGroups: ['3-5', '5-8'] },
  { id: 'star', categoryId: 'nature', text: { en: 'Star', de: 'Stern' }, imageId: 'star-1', ageGroups: ['3-5', '5-8'] },
  // People
  { id: 'family', categoryId: 'people', text: { en: 'Family', de: 'Familie' }, imageId: 'family-1', ageGroups: ['5-8', '8-12'] },
  { id: 'friend', categoryId: 'people', text: { en: 'Friend', de: 'Freund' }, imageId: 'friend-1', ageGroups: ['5-8', '8-12', '13-15'] },
  // School
  { id: 'book', categoryId: 'school', text: { en: 'Book', de: 'Buch' }, imageId: 'book-1', ageGroups: ['5-8', '8-12'] },
  { id: 'school-building', categoryId: 'school', text: { en: 'School', de: 'Schule' }, imageId: 'school-1', ageGroups: ['5-8', '8-12'] },
  // Technology
  { id: 'computer', categoryId: 'technology', text: { en: 'Computer', de: 'Computer' }, imageId: 'computer-1', ageGroups: ['8-12', '13-15', '15-18'] },
  { id: 'phone', categoryId: 'technology', text: { en: 'Phone', de: 'Handy' }, imageId: 'phone-1', ageGroups: ['8-12', '13-15', '15-18'] },
  { id: 'bicycle', categoryId: 'technology', text: { en: 'Bicycle', de: 'Fahrrad' }, imageId: 'bicycle-1', ageGroups: ['8-12', '13-15'] },
];

export const sentences: Sentence[] = [
  { id: 's1', categoryId: 'sentences', text: { en: 'The cat is sleeping on the mat.', de: 'Die Katze schläft auf der Matte.' }, ageGroups: ['5-8'] },
  { id: 's2', categoryId: 'sentences', text: { en: 'The dog is playing in the garden.', de: 'Der Hund spielt im Garten.' }, ageGroups: ['5-8'] },
  { id: 's3', categoryId: 'sentences', text: { en: 'I like to read books.', de: 'Ich lese gerne Bücher.' }, ageGroups: ['5-8', '8-12'] },
  { id: 's4', categoryId: 'sentences', text: { en: 'The sun is shining brightly.', de: 'Die Sonne scheint hell.' }, ageGroups: ['5-8', '8-12'] },
  { id: 's5', categoryId: 'sentences', text: { en: 'My favorite color is blue.', de: 'Meine Lieblingsfarbe ist blau.' }, ageGroups: ['5-8', '8-12'] },
];

export const paragraphs: Paragraph[] = [
  {
    id: 'p1',
    categoryId: 'paragraphs',
    text: {
      en: 'Once upon a time, in a small village nestled in a valley, lived a young girl named Lily. She was known for her kindness and her love for animals. Every day, she would wander into the forest to spend time with her furry and feathered friends.',
      de: 'Es war einmal in einem kleinen Dorf in einem Tal ein junges Mädchen namens Lily. Sie war bekannt für ihre Freundlichkeit und ihre Liebe zu Tieren. Jeden Tag wanderte sie in den Wald, um Zeit mit ihren pelzigen und gefiederten Freunden zu verbringen.',
    },
    ageGroups: ['8-12', '13-15'],
  },
];

export const stories: Story[] = [
  {
    id: 'story-1',
    categoryId: 'stories',
    title: { en: 'The Magical Tree', de: 'Der magische Baum' },
    content: {
      en: `In the heart of an ancient forest stood a tree unlike any other. Its leaves shimmered with all the colors of the rainbow, and it was said to possess magical powers. One day, a curious boy named Tom discovered the tree and his life was changed forever.`,
      de: `Im Herzen eines alten Waldes stand ein Baum, der anders war als alle anderen. Seine Blätter schimmerten in allen Farben des Regenbogens, und es wurde gesagt, dass er magische Kräfte besitze. Eines Tages entdeckte ein neugieriger Junge namens Tom den Baum und sein Leben veränderte sich für immer.`,
    },
    ageGroups: ['8-12', '13-15', '15-18'],
  },
];


export const placeholderImages = placeholderData.placeholderImages;
