import type { LucideIcon } from 'lucide-react';
import { Cat, Dog, House, Car, Apple, Sprout, Building, Users, Rocket, Globe } from 'lucide-react';
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

export const placeholderImages = placeholderData.placeholderImages;
