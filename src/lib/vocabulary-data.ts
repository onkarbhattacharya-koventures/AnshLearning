// Vocabulary data from German-English dictionaries
// This file contains comprehensive vocabulary for language learning

export interface VocabularyEntry {
  id: string;
  english: string;
  german: string;
  category?: string;
  ageGroups: string[];
}

// English to German vocabulary
const englishToGermanDict: Record<string, string> = {
  "turn": "Wendung",
  "evening": "Abend",
  "dinner": "Abendessen",
  "evening dress": "Abendkleidung",
  "adventure": "Abenteuer",
  "but": "sondern",
  "leave (irr.)": "zurücklassen",
  "rubbish": "Abfall",
  "waste": "verschwenden",
  "start": "starten",
  "tax": "Steuer",
  "withdrawn": "abgehoben",
  "worn-out": "abgenutzt",
  "representative": "Vertreter",
  "boundary": "Abgrenzung",
  "hillside": "Hang",
  "slope": "Abhang",
  "depend": "abhängen",
  "dependent": "abhängig",
  "dependence": "Abhängigkeit",
  "depend on": "Abhängig sein von",
  "harden": "härten",
  "withdraw (irr.)": "zurückziehen",
  "clear": "klären",
  "cool": "kühlen",
  "refuse": "verweigern",
  "refusal": "Ablehnung",
  "arrangement": "Reservierung",
  "decrease": "abnehmen",
  "lessening": "Minderung",
  "take off": "starten (abheben) (Flugzeug)",
  "wear down": "abnutzen",
  "wear": "Abnutzung",
  "account": "Konto",
  "departure": "Abreise",
  "depart": "abreisen",
  "leave for": "abreisen nach",
  "heel": "Ferse",
  "copy": "Nachahmung",
  "out of the way": "abseits vom Wege",
  "sender": "Absender",
  "intention": "Absicht",
  "purpose": "Zweck",
  "on purpose": "absichtlich",
  "lock": "Türschloß",
  "descend from": "abstammen von",
  "dust": "Staub",
  "vote": "Stimme des Wählers",
  "crash": "zusammenstoßen",
  "department": "Abteilung",
  "downwards": "abwärts",
  "variety": "Spielart",
  "absent": "abwesend",
  "absence": "Abwesenheit",
  "fence off": "abzäunen",
  "print": "Foto",
  "eight": "acht",
  "eighth": "achte",
  "take care (of)": "achtgeben (auf)",
  "eighteen": "achtzehn",
  "eighteenth": "achtzehnte",
  "eighty": "achtzig",
  "eightieth": "achtzigste",
  "nobility": "Adel",
  "Lord": "Herrgott"
};

// German to English vocabulary
const germanToEnglishDict: Record<string, string> = {
  "abbiegen": "turn",
  "Abend": "evening",
  "Abendessen": "dinner",
  "Abendkleidung": "evening dress",
  "Abenteuer": "adventure",
  "aber": "but",
  "abfahren": "leave (irr.)",
  "Abfall": "waste",
  "abfliegen": "start",
  "Abgabe": "tax",
  "abgehoben": "withdrawn",
  "abgenutzt": "worn-out",
  "Abgeordneter": "representative",
  "Abgrenzung": "boundary",
  "Abhang": "slope",
  "abhängen": "depend",
  "abhängig": "dependent",
  "Abhängigkeit": "dependence"
};

// Generate vocabulary entries from dictionaries
export function generateVocabularyEntries(): VocabularyEntry[] {
  let idCounter = 1;

  return Object.entries(englishToGermanDict).map(([english, german]) => ({
    id: `vocab-en-${idCounter++}`,
    english,
    german,
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
