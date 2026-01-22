// Vocabulary data from German-English dictionaries
// This file contains comprehensive vocabulary for language learning

export interface VocabularyEntry {
  id: string;
  english: string;
  german: string;
  french: string;
  spanish: string;
  category?: string;
  ageGroups: string[];
}

// Comprehensive dictionaries
const translations: Record<string, { de: string, fr: string, es: string }> = {
  "turn": { de: "Wendung", fr: "tourner", es: "girar" },
  "evening": { de: "Abend", fr: "soir", es: "tarde" },
  "dinner": { de: "Abendessen", fr: "dîner", es: "cena" },
  "adventure": { de: "Abenteuer", fr: "aventure", es: "aventura" },
  "but": { de: "sondern", fr: "mais", es: "pero" },
  "start": { de: "starten", fr: "démarrer", es: "empezar" },
  "account": { de: "Konto", fr: "compte", es: "cuenta" },
  "departure": { de: "Abreise", fr: "départ", es: "salida" },
  "intention": { de: "Absicht", fr: "intention", es: "intención" },
  "purpose": { de: "Zweck", fr: "but", es: "propósito" },
  "eight": { de: "acht", fr: "huit", es: "ocho" },
  "cat": { de: "Katze", fr: "chat", es: "gato" },
  "dog": { de: "Hund", fr: "chien", es: "perro" },
  "house": { de: "Haus", fr: "maison", es: "casa" },
  "apple": { de: "Apfel", fr: "pomme", es: "manzana" },
  "good": { de: "gut", fr: "bon", es: "bueno" },
  "morning": { de: "Morgen", fr: "matin", es: "mañana" },
  "thank you": { de: "danke", fr: "merci", es: "gracias" },
  "please": { de: "bitte", fr: "s'il vous plaît", es: "por favor" },
};



// Generate vocabulary entries from dictionaries
export function generateVocabularyEntries(): VocabularyEntry[] {
  let idCounter = 1;

  return Object.entries(translations).map(([english, trans]) => ({
    id: `vocab-en-${idCounter++}`,
    english,
    german: trans.de,
    french: trans.fr,
    spanish: trans.es,
    category: categorizeWord(english),
    ageGroups: determineAgeGroups(english)
  }));
}

// Helper function to categorize words
function categorizeWord(word: string): string {
  if (!word || typeof word !== 'string') {
    return 'general';
  }

  const categories = {
    'basic': ['the', 'a', 'an', 'is', 'are', 'am', 'be', 'have', 'do'],
    'numbers': ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
    'family': ['father', 'mother', 'brother', 'sister', 'family', 'parent'],
    'animals': ['dog', 'cat', 'bird', 'fish', 'animal'],
    'food': ['bread', 'milk', 'cheese', 'food', 'eat', 'drink'],
    'time': ['day', 'night', 'morning', 'evening', 'today', 'tomorrow'],
    'colors': ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    'body': ['hand', 'foot', 'head', 'eye', 'nose', 'mouth'],
    'verbs': ['go', 'come', 'see', 'look', 'make', 'take', 'give', 'speak', 'walk', 'run']
  };

  const lowerWord = word.toLowerCase();
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerWord.includes(keyword))) {
      return category;
    }
  }

  return 'general';
}

// Helper function to determine appropriate age groups
function determineAgeGroups(word: string): string[] {
  if (!word || typeof word !== 'string') {
    return ['8-12', '13-15'];
  }

  const lowerWord = word.toLowerCase();

  // Basic/common words suitable for younger learners
  const basicWords = ['the', 'a', 'is', 'cat', 'dog', 'house', 'car', 'sun', 'moon', 'red', 'blue'];

  // Intermediate words
  const intermediateWords = ['because', 'although', 'however', 'different', 'important'];

  // Advanced words
  const advancedWords = ['consequently', 'nevertheless', 'furthermore', 'sophisticated'];

  if (basicWords.some(w => lowerWord.includes(w))) {
    return ['3-5', '5-8', '8-12'];
  } else if (intermediateWords.some(w => lowerWord.includes(w))) {
    return ['8-12', '13-15'];
  } else if (advancedWords.some(w => lowerWord.includes(w))) {
    return ['13-15', '15-18'];
  }

  // Default to middle age groups
  return ['8-12', '13-15'];
}

export const vocabularyCategories = [
  'basic',
  'numbers',
  'family',
  'animals',
  'food',
  'time',
  'colors',
  'body',
  'verbs',
  'general'
] as const;

export type VocabularyCategory = typeof vocabularyCategories[number];
