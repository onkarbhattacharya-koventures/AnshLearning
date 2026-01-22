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
  // Space & Science (Ages 8-12, 13-15)
  "planet": { de: "Planet", fr: "planète", es: "planeta", hi: "ग्रह" },
  "universe": { de: "Universum", fr: "univers", es: "universo", hi: "ब्रह्मांड" },
  "gravity": { de: "Schwerkraft", fr: "gravité", es: "gravedad", hi: "गुरुत्वाकर्षण" },
  "galaxy": { de: "Galaxie", fr: "galaxie", es: "galaxia", hi: "आकाशगंगा" },
  "astronaut": { de: "Astronaut", fr: "astronaute", es: "astronauta", hi: "अंतरिक्ष यात्री" },
  "telescope": { de: "Teleskop", fr: "télescope", es: "telescopio", hi: "दूरबीन" },
  // Nature & Earth (Ages 5-8, 8-12)
  "volcano": { de: "Vulkan", fr: "volcan", es: "volcán", hi: "ज्वालामुखी" },
  "mountain": { de: "Berg", fr: "montagne", es: "montaña", hi: "पहाड़" },
  "ocean": { de: "Ozean", fr: "océan", es: "océano", hi: "समुद्र" },
  "glacier": { de: "Gletscher", fr: "glacier", es: "glaciar", hi: "ग्लेशियर" },
  "forest": { de: "Wald", fr: "forêt", es: "bosque", hi: "जंगल" },
  "island": { de: "Insel", fr: "île", es: "isla", hi: "द्वीप" },
  // History & Culture (Ages 8-12, 13-15)
  "castle": { de: "Schloss", fr: "château", es: "castillo", hi: "किला" },
  "pyramid": { de: "Pyramide", fr: "pyramide", es: "pirámide", hi: "पिरामिड" },
  "history": { de: "Geschichte", fr: "histoire", es: "historia", hi: "इतिहास" },
  "empire": { de: "Reich", fr: "empire", es: "imperio", hi: "साम्राज्य" },
  "ancient": { de: "antik", fr: "ancien", es: "antiguo", hi: "प्राचीन" },
  "knight": { de: "Ritter", fr: "chevalier", es: "caballero", hi: "योद्धा" },
  // Human Body (Ages 3-5, 5-8, 8-12)
  "brain": { de: "Gehirn", fr: "cerveau", es: "cerebro", hi: "मस्तिष्क" },
  "heart": { de: "Herz", fr: "cœur", es: "corazón", hi: "दिल" },
  "skeleton": { de: "Skelett", fr: "squelette", es: "esqueleto", hi: "कंकाल" },
  "muscle": { de: "Muskel", fr: "muscle", es: "músculo", hi: "मांसपेशी" },
  "stomach": { de: "Magen", fr: "estomac", es: "estómago", hi: "पेट" },
  "blood": { de: "Blut", fr: "sang", es: "sangre", hi: "रक्त" },
  // Technology (Ages 8-12, 13-15, 15-18)
  "internet": { de: "Internet", fr: "internet", es: "internet", hi: "इंटरनेट" },
  "software": { de: "Software", fr: "logiciel", es: "software", hi: "सॉफ्टवेयर" },
  "energy": { de: "Energie", fr: "énergie", es: "energía", hi: "ऊर्जा" },
  "robot": { de: "Roboter", fr: "robot", es: "robot", hi: "रोबोट" },
  "electricity": { de: "Elektrizität", fr: "électricité", es: "electricidad", hi: "बिजली" },
  "satellite": { de: "Satellit", fr: "satellite", es: "satélite", hi: "उपग्रह" },
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
    'body': ['hand', 'foot', 'head', 'eye', 'nose', 'mouth', 'brain', 'heart', 'skeleton', 'muscle', 'stomach', 'blood'],
    'verbs': ['go', 'come', 'see', 'look', 'make', 'take', 'give', 'speak', 'walk', 'run'],
    'space': ['planet', 'universe', 'gravity', 'galaxy', 'astronaut', 'telescope', 'satellite'],
    'earth': ['volcano', 'mountain', 'ocean', 'glacier', 'forest', 'island'],
    'history': ['castle', 'pyramid', 'history', 'empire', 'ancient', 'knight'],
    'technology': ['internet', 'software', 'energy', 'robot', 'electricity']
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

  // Space & Tech keywords (Intermediate/Advanced)
  const spaceTech = ['planet', 'universe', 'gravity', 'internet', 'software', 'robot', 'satellite'];

  // History & Geography
  const historyGeo = ['history', 'empire', 'ancient', 'glacier', 'volcano'];

  if (basicWords.some(w => lowerWord.includes(w))) {
    return ['1-3', '3-5', '5-8'];
  } else if (spaceTech.some(w => lowerWord.includes(w))) {
    return ['8-12', '13-15', '15-18'];
  } else if (historyGeo.some(w => lowerWord.includes(w))) {
    return ['5-8', '8-12', '13-15'];
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
  'space',
  'earth',
  'history',
  'technology',
  'general'
] as const;

export type VocabularyCategory = typeof vocabularyCategories[number];
