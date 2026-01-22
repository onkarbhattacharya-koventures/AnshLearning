
import type { LucideIcon } from 'lucide-react';
import { Cat, Dog, House, Car, Apple, Sprout, Building, Users, Rocket, Globe, MessageSquareText, AlignLeft, BookOpen, Utensils } from 'lucide-react';
import placeholderData from './placeholder-images.json';
import { generateVocabularyEntries, type VocabularyEntry } from './vocabulary-data';

export type Language = 'en' | 'de' | 'fr' | 'es';
export type AgeGroup = '1-3' | '3-5' | '5-8' | '8-12' | '13-15' | '15-18';

// Enhanced vocabulary integration
const vocabularyEntries = generateVocabularyEntries();

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
    name: { en: 'Animals', de: 'Tiere', fr: 'Animaux', es: 'Animales' },
    Icon: Cat,
    ageGroups: ['1-3', '3-5', '5-8'],
  },
  {
    id: 'home',
    name: { en: 'At Home', de: 'Zuhause', fr: 'À la maison', es: 'En casa' },
    Icon: House,
    ageGroups: ['1-3', '3-5', '5-8', '8-12'],
  },
  {
    id: 'nature',
    name: { en: 'Nature', de: 'Natur', fr: 'Nature', es: 'Naturaleza' },
    Icon: Sprout,
    ageGroups: ['3-5', '5-8', '8-12'],
  },
  {
    id: 'food',
    name: { en: 'Food', de: 'Essen', fr: 'Nourriture', es: 'Comida' },
    Icon: Utensils,
    ageGroups: ['1-3', '3-5', '5-8'],
  },
  {
    id: 'people',
    name: { en: 'People', de: 'Menschen', fr: 'Gens', es: 'Gente' },
    Icon: Users,
    ageGroups: ['5-8', '8-12', '13-15', '15-18'],
  },
  {
    id: 'school',
    name: { en: 'School', de: 'Schule', fr: 'École', es: 'Escuela' },
    Icon: Building,
    ageGroups: ['5-8', '8-12', '13-15'],
  },
  {
    id: 'technology',
    name: { en: 'Technology', de: 'Technologie', fr: 'Technologie', es: 'Tecnología' },
    Icon: Rocket,
    ageGroups: ['8-12', '13-15', '15-18'],
  },
  {
    id: 'world',
    name: { en: 'The World', de: 'Die Welt', fr: 'Le monde', es: 'El mundo' },
    Icon: Globe,
    ageGroups: ['13-15', '15-18'],
  },
  {
    id: 'sentences',
    name: { en: 'Sentences', de: 'Sätze', fr: 'Phrases', es: 'Oraciones' },
    Icon: MessageSquareText,
    ageGroups: ['5-8', '8-12', '13-15', '15-18'],
  },
  {
    id: 'paragraphs',
    name: { en: 'Paragraphs', de: 'Absätze', fr: 'Paragraphes', es: 'Párrafos' },
    Icon: AlignLeft,
    ageGroups: ['8-12', '13-15', '15-18'],
  },
  {
    id: 'stories',
    name: { en: 'Stories', de: 'Geschichten', fr: 'Histoires', es: 'Historias' },
    Icon: BookOpen,
    ageGroups: ['8-12', '13-15', '15-18'],
  },
];

// Convert vocabulary entries to words format
function convertVocabularyToWords(): Word[] {
  const baseWords: Word[] = [
    // Core words with images
    { id: 'cat', categoryId: 'animals', text: { en: 'Cat', de: 'Katze', fr: 'Chat', es: 'Gato' }, imageId: 'cat-1', ageGroups: ['1-3', '3-5'] },
    { id: 'dog', categoryId: 'animals', text: { en: 'Dog', de: 'Hund', fr: 'Chien', es: 'Perro' }, imageId: 'dog-1', ageGroups: ['1-3', '3-5'] },
    { id: 'house', categoryId: 'home', text: { en: 'House', de: 'Haus', fr: 'Maison', es: 'Casa' }, imageId: 'house-1', ageGroups: ['1-3', '3-5'] },
    { id: 'apple', categoryId: 'food', text: { en: 'Apple', de: 'Apfel', fr: 'Pomme', es: 'Manzana' }, imageId: 'apple-1', ageGroups: ['3-5', '5-8'] },
  ];

  // Add vocabulary entries as words
  const vocabWords = vocabularyEntries.map(entry => ({
    id: entry.id,
    categoryId: entry.category || 'general',
    text: {
      en: entry.english,
      de: entry.german,
      fr: entry.french || entry.english,
      es: entry.spanish || entry.english
    },
    imageId: `placeholder-${entry.id}`,
    ageGroups: entry.ageGroups as AgeGroup[]
  }));

  return [...baseWords, ...vocabWords];
}

export const words: Word[] = convertVocabularyToWords();

export const sentences: Sentence[] = [
  { id: 's1', categoryId: 'sentences', text: { en: 'The cat is sleeping on the mat.', de: 'Die Katze schläft auf der Matte.', fr: 'Le chat dort sur le tapis.', es: 'El gato está durmiendo en la alfombra.' }, ageGroups: ['5-8'] },
  { id: 's2', categoryId: 'sentences', text: { en: 'The dog is playing in the garden.', de: 'Der Hund spielt im Garten.', fr: 'Le chien joue dans le jardin.', es: 'El perro está jugando en el jardín.' }, ageGroups: ['5-8'] },
  { id: 's3', categoryId: 'sentences', text: { en: 'I like to read books.', de: 'Ich lese gerne Bücher.', fr: 'J\'aime lire des livres.', es: 'Me gusta leer libros.' }, ageGroups: ['5-8', '8-12'] },
  { id: 's4', categoryId: 'sentences', text: { en: 'The sun is shining brightly.', de: 'Die Sonne scheint hell.', fr: 'Le soleil brille fort.', es: 'El sol brilla intensamente.' }, ageGroups: ['5-8', '8-12'] },
  { id: 's5', categoryId: 'sentences', text: { en: 'My favorite color is blue.', de: 'Meine Lieblingsfarbe ist blau.', fr: 'Ma couleur préférée est le bleu.', es: 'Mi color favorito es el azul.' }, ageGroups: ['5-8', '8-12'] },
  { id: 's6', categoryId: 'sentences', text: { en: 'The bird is singing a song.', de: 'Der Vogel singt ein Lied.', fr: 'L\'oiseau chante une chanson.', es: 'El pájaro está cantando una canción.' }, ageGroups: ['5-8'] },
  { id: 's7', categoryId: 'sentences', text: { en: 'The fish is swimming in the water.', de: 'Der Fisch schwimmt im Wasser.', fr: 'Le poisson nage dans l\'eau.', es: 'El pez está nadando en el agua.' }, ageGroups: ['5-8'] },
  { id: 's8', categoryId: 'sentences', text: { en: 'I drink milk every morning.', de: 'Ich trinke jeden Morgen Milch.', fr: 'Je bois du lait tous les matins.', es: 'Bebo leche todas las mañanas.' }, ageGroups: ['5-8', '8-12'] },
];

export const paragraphs: Paragraph[] = [
  {
    id: 'p1',
    categoryId: 'paragraphs',
    text: {
      en: 'Once upon a time, in a small village nestled in a valley, lived a young girl named Lily. She was known for her kindness and her love for animals. Every day, she would wander into the forest to spend time with her furry and feathered friends.',
      de: 'Es war einmal in einem kleinen Dorf in einem Tal ein junges Mädchen namens Lily. Sie war bekannt für ihre Freundlichkeit und ihre Liebe zu Tieren. Jeden Tag wanderte sie in den Wald, um Zeit mit ihren pelzigen und gefiederten Freunden zu verbringen.',
      fr: 'Il était une fois, dans un petit village niché dans une vallée, vivait une jeune fille nommée Lily. Elle était connue pour sa gentillesse et son amour pour les animaux. Chaque jour, elle s\'aventurait dans la forêt pour passer du temps avec ses amis à poils et à plumes.',
      es: 'Érase una vez, en un pequeño pueblo enclavado en un valle, vivía una joven llamada Lily. Era conocida por su amabilidad y su amor por los animales. Todos los días, se adentraba en el bosque para pasar tiempo con sus amigos peludos y emplumados.',
    },
    ageGroups: ['8-12', '13-15'],
  },
  {
    id: 'p2',
    categoryId: 'paragraphs',
    text: {
      en: 'The school was a large, old building with ivy-covered walls. Inside, there were many classrooms, a library filled with books, and a playground where children could run and play. The teachers were kind and patient, and they made learning fun.',
      de: 'Die Schule war ein großes, altes Gebäude mit efeubewachsenen Mauern. Im Inneren gab es viele Klassenzimmer, eine Bibliothek voller Bücher und einen Spielplatz, auf dem die Kinder rennen und spielen konnten. Die Lehrer waren freundlich und geduldig, und sie machten das Lernen zum Vergnügen.',
      fr: 'L\'école était un grand bâtiment ancien aux murs couverts de lierre. À l\'intérieur, il y avait de nombreuses salles de classe, une bibliothèque remplie de livres et une cour de récréation où les enfants pouvaient courir et jouer. Les enseignants étaient gentils et patients, et ils rendaient l\'apprentissage amusant.',
      es: 'La escuela era un edificio grande y antiguo con paredes cubiertas de hiedra. En su interior había muchas aulas, una biblioteca llena de libros y un patio de recreo donde los niños podían correr y jugar. Los profesores eran amables y pacientes, y hacían que el aprendizaje fuera divertido.',
    },
    ageGroups: ['8-12', '13-15'],
  },
];

export const stories: Story[] = [
  {
    id: 'story-1',
    categoryId: 'stories',
    title: { en: 'The Magical Tree', de: 'Der magische Baum', fr: 'L\'arbre magique', es: 'El árbol mágico' },
    content: {
      en: `In the heart of an ancient forest stood a tree unlike any other. Its leaves shimmered with all the colors of the rainbow, and it was said to possess magical powers. One day, a curious boy named Tom discovered the tree and his life was changed forever.`,
      de: `Im Herzen eines alten Waldes stand ein Baum, der anders war als alle anderen. Seine Blätter schimmerten in allen Farben des Regenbogens, und es wurde gesagt, dass er magische Kräfte besitze. Eines Tages entdeckte ein neugieriger Junge namens Tom den Baum und sein Leben veränderte sich für immer.`,
      fr: `Au cœur d'une forêt ancienne se dressait un arbre pas comme les autres. Ses feuilles miroitaient de toutes les couleurs de l'arc-en-ciel, et on disait qu'il possédait des pouvoirs magiques. Un jour, un garçon curieux nommé Tom découvrit l'arbre et sa vie fut changée à jamais.`,
      es: `En el corazón de un bosque antiguo se alzaba un árbol como ningún otro. Sus hojas brillaban con todos los colores del arco iris, y se decía que poseía poderes mágicos. Un día, un niño curioso llamado Tom descubrió el árbol y su vida cambió para siempre.`,
    },
    ageGroups: ['8-12', '13-15', '15-18'],
  },
  {
    id: 'story-2',
    categoryId: 'stories',
    title: { en: 'The Lost Astronaut', de: 'Der verlorene Astronaut', fr: 'L\'astronaute perdu', es: 'El astronauta perdido' },
    content: {
      en: `Captain Eva was on a mission to explore a distant galaxy when her spaceship was hit by a meteor shower. She crash-landed on a strange planet with purple skies and glowing flora. Now, Eva must find a way to repair her ship and return to Earth.`,
      de: `Kapitänin Eva war auf einer Mission, um eine ferne Galaxie zu erforschen, als ihr Raumschiff von einem Meteoritenschauer getroffen wurde. Sie machte eine Bruchlandung auf einem seltsamen Planeten mit lila Himmel und leuchtender Flora. Jetzt muss Eva einen Weg finden, um ihr Schiff zu reparieren und zur Erde zurückzukehren.`,
      fr: `Le capitaine Eva était en mission pour explorer une galaxie lointaine lorsque son vaisseau spatial a été frappé par une pluie de météores. Elle s'est écrasée sur une étrange planète aux cieux violets et à la flore rougeoyante. Maintenant, Eva doit trouver un moyen de réparer son vaisseau et de retourner sur Terre.`,
      es: `La capitana Eva estaba en una misión para explorar una galaxia distante cuando su nave espacial fue alcanzada por una lluvia de meteoritos. Aterrizó de emergencia en un planeta extraño con cielos púrpuras y flora brillante. Ahora, Eva debe encontrar una manera de reparar su nave y regresar a la Tierra.`,
    },
    ageGroups: ['13-15', '15-18'],
  },
];


export const placeholderImages = placeholderData.placeholderImages;

// Export vocabulary utilities
export { vocabularyEntries };
export type { VocabularyEntry };
