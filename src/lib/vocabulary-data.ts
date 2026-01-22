// Vocabulary data from German-English dictionaries
// This file contains comprehensive vocabulary for language learning

export interface VocabularyEntry {
  id: string;
  english: string;
  german: string;
  french: string;
  spanish: string;
  hindi: string;
  category?: string;
  ageGroups: string[];
}

// Comprehensive dictionaries
const translations: Record<string, { de: string, fr: string, es: string, hi: string }> = {
  "turn": { de: "Wendung", fr: "tourner", es: "girar", hi: "मोड़" },
  "evening": { de: "Abend", fr: "soir", es: "tarde", hi: "शाम" },
  "dinner": { de: "Abendessen", fr: "dîner", es: "cena", hi: "रात का खाना" },
  "adventure": { de: "Abenteuer", fr: "aventure", es: "aventura", hi: "साहसिक कार्य" },
  "but": { de: "sondern", fr: "mais", es: "pero", hi: "लेकिन" },
  "start": { de: "starten", fr: "démarrer", es: "empezar", hi: "शुरू" },
  "account": { de: "Konto", fr: "compte", es: "cuenta", hi: "खाता" },
  "departure": { de: "Abreise", fr: "départ", es: "salida", hi: "प्रस्थान" },
  "intention": { de: "Absicht", fr: "intention", es: "intención", hi: "इरादा" },
  "purpose": { de: "Zweck", fr: "but", es: "propósito", hi: "उद्देश्य" },
  "eight": { de: "acht", fr: "huit", es: "ocho", hi: "आठ" },
  "cat": { de: "Katze", fr: "chat", es: "gato", hi: "बिल्ली" },
  "dog": { de: "Hund", fr: "chien", es: "perro", hi: "कुत्ता" },
  "house": { de: "Haus", fr: "maison", es: "casa", hi: "घर" },
  "apple": { de: "Apfel", fr: "pomme", es: "manzana", hi: "सेब" },
  "good": { de: "gut", fr: "bon", hi: "अच्छा", es: "bueno" },
  "morning": { de: "Morgen", fr: "matin", es: "mañana", hi: "सुबह" },
  "thank you": { de: "danke", fr: "merci", es: "gracias", hi: "शुक्रिया" },
  "please": { de: "bitte", fr: "s'il vous plaît", es: "por favor", hi: "कृपया" },
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
    hindi: trans.hi,
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
