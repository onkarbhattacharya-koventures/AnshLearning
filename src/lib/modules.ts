
import type { Word, Sentence, Paragraph, Story, AgeGroup, Language } from './data';
import { words, sentences, paragraphs, stories, vocabularyEntries } from './data';

// Generate vocabulary-focused modules
function generateVocabularyModules(): Module[] {
  const vocabModules: Module[] = [];
  
  // Group vocabulary by category and age
  const categories = ['basic', 'numbers', 'family', 'animals', 'food', 'time', 'colors', 'body', 'verbs'];
  const ageGroupsList: AgeGroup[] = ['3-5', '5-8', '8-12', '13-15', '15-18'];
  
  categories.forEach(category => {
    ageGroupsList.forEach(ageGroup => {
      const categoryWords = words.filter(w => {
        try {
          return w.categoryId === category && 
                 w.ageGroups && 
                 w.ageGroups.includes(ageGroup);
        } catch {
          return false;
        }
      }).slice(0, 8); // Limit to 8 words per module
      
      if (categoryWords.length > 0) {
        vocabModules.push({
          id: `vocab-${category}-${ageGroup}`,
          title: { 
            en: `${category.charAt(0).toUpperCase() + category.slice(1)} Vocabulary`, 
            de: `${category.charAt(0).toUpperCase() + category.slice(1)} Wortschatz` 
          },
          ageGroups: [ageGroup],
          content: categoryWords
        });
      }
    });
  });
  
  return vocabModules;
}

const vocabularyModules = generateVocabularyModules();

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
      words.find(w => w.id === 'cat'),
      words.find(w => w.id === 'dog'),
      words.find(w => w.id === 'bird'),
      words.find(w => w.id === 'fish'),
    ].filter(Boolean) as (Word | Sentence | Paragraph | Story)[],
  },
  {
    id: 'module-1-3-home',
    title: { en: 'My Home', de: 'Mein Zuhause' },
    ageGroups: ['1-3'],
    content: [
      words.find(w => w.id === 'house'),
      words.find(w => w.id === 'car'),
      words.find(w => w.id === 'ball'),
      words.find(w => w.id === 'bed'),
    ].filter(Boolean) as (Word | Sentence | Paragraph | Story)[],
  },
  {
    id: 'module-1-3-food',
    title: { en: 'Yummy Food', de: 'Leckeres Essen' },
    ageGroups: ['1-3'],
    content: [
      words.find(w => w.id === 'bread'),
      words.find(w => w.id === 'milk'),
    ].filter(Boolean) as (Word | Sentence | Paragraph | Story)[],
  },
  {
    id: 'module-3-5-nature',
    title: { en: 'Exploring Nature', de: 'Die Natur entdecken' },
    ageGroups: ['3-5'],
    content: [
      words.find(w => w.id === 'apple'),
      words.find(w => w.id === 'tree'),
      words.find(w => w.id === 'flower'),
      words.find(w => w.id === 'sun'),
      words.find(w => w.id === 'moon'),
      words.find(w => w.id === 'star'),
    ].filter(Boolean) as (Word | Sentence | Paragraph | Story)[],
  },
    {
    id: 'module-3-5-food',
    title: { en: 'More Yummy Food', de: 'Mehr leckeres Essen' },
    ageGroups: ['3-5'],
    content: [
      words.find(w => w.id === 'cheese'),
      sentences.find(s => s.id === 's8'),
    ].filter(Boolean) as (Word | Sentence | Paragraph | Story)[],
  },
  {
    id: 'module-5-8-school',
    title: { en: 'Fun at School', de: 'Spaß in der Schule' },
    ageGroups: ['5-8'],
    content: [
      words.find(w => w.id === 'book'),
      words.find(w => w.id === 'school-building'),
      sentences.find(s => s.id === 's3'),
      paragraphs.find(p => p.id === 'p2'),
    ].filter(Boolean) as (Word | Sentence | Paragraph | Story)[],
  },
  {
    id: 'module-5-8-people',
    title: { en: 'My Friends and Family', de: 'Meine Freunde und Familie' },
    ageGroups: ['5-8'],
    content: [
      words.find(w => w.id === 'family'),
      words.find(w => w.id === 'friend'),
      sentences.find(s => s.id === 's1'),
      sentences.find(s => s.id === 's2'),
    ].filter(Boolean) as (Word | Sentence | Paragraph | Story)[],
  },
  {
    id: 'module-8-12-technology',
    title: { en: 'Tech and the World', de: 'Technik und die Welt' },
    ageGroups: ['8-12', '13-15'],
    content: [
      words.find(w => w.id === 'computer'),
      words.find(w => w.id === 'phone'),
      stories.find(s => s.id === 'story-1'),
    ].filter(Boolean) as (Word | Sentence | Paragraph | Story)[],
  },
  {
    id: 'module-13-15-world',
    title: { en: 'Our World', de: 'Unsere Welt' },
    ageGroups: ['13-15'],
    content: [
      paragraphs.find(p => p.id === 'p1'),
      stories.find(s => s.id === 'story-2'),
    ].filter(Boolean) as (Word | Sentence | Paragraph | Story)[],
  },
  {
    id: 'module-15-18-future',
    title: { en: 'The Future of the World', de: 'Die Zukunft der Welt' },
    ageGroups: ['15-18'],
    content: [
      words.find(w => w.id === 'bicycle'),
      stories.find(s => s.id === 'story-1'),
      stories.find(s => s.id === 'story-2'),
    ].filter(Boolean) as (Word | Sentence | Paragraph | Story)[],
  },
  ...vocabularyModules,
];
