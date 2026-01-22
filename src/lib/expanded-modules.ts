import type { Word, Sentence, Paragraph, Story, AgeGroup, Language } from './data';

export interface Quiz {
    id: string;
    moduleId: string;
    questions: QuizQuestion[];
    passingScore: number;
}

export interface QuizQuestion {
    id: string;
    type: 'multiple-choice' | 'fill-blank' | 'matching' | 'true-false';
    question: Record<Language, string>;
    options?: Record<Language, string[]>;
    correctAnswer: Record<Language, string | number>;
    explanation?: Record<Language, string>;
}

export interface LearningModule {
    id: string;
    title: Record<Language, string>;
    description: Record<Language, string>;
    ageGroups: AgeGroup[];
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number; // in minutes
    content: (Word | Sentence | Paragraph | Story)[];
    quiz?: Quiz;
    badge?: {
        id: string;
        name: Record<Language, string>;
        icon: string;
    };
}

// Expanded modules for ages 1-3
export const toddlerModules: LearningModule[] = [
    {
        id: 'toddler-colors-basic',
        title: { en: 'My First Colors', de: 'Meine ersten Farben' },
        description: { en: 'Learn basic colors with fun images', de: 'Lerne Grundfarben mit lustigen Bildern' },
        ageGroups: ['1-3'],
        category: 'colors',
        difficulty: 'beginner',
        estimatedTime: 10,
        content: [],
        badge: {
            id: 'color-explorer',
            name: { en: 'Color Explorer', de: 'Farben-Entdecker' },
            icon: '🎨'
        }
    },
    {
        id: 'toddler-numbers-1-10',
        title: { en: 'Count to 10', de: 'Zähle bis 10' },
        description: { en: 'Learn numbers 1 to 10', de: 'Lerne die Zahlen 1 bis 10' },
        ageGroups: ['1-3'],
        category: 'numbers',
        difficulty: 'beginner',
        estimatedTime: 15,
        content: [],
        badge: {
            id: 'number-star',
            name: { en: 'Number Star', de: 'Zahlen-Stern' },
            icon: '⭐'
        }
    },
    {
        id: 'toddler-body-parts',
        title: { en: 'My Body', de: 'Mein Körper' },
        description: { en: 'Learn body parts', de: 'Lerne Körperteile' },
        ageGroups: ['1-3'],
        category: 'body',
        difficulty: 'beginner',
        estimatedTime: 12,
        content: [],
        badge: {
            id: 'body-expert',
            name: { en: 'Body Expert', de: 'Körper-Experte' },
            icon: '👶'
        }
    }
];

// Expanded modules for ages 3-5
export const preschoolModules: LearningModule[] = [
    {
        id: 'preschool-alphabet',
        title: { en: 'ABC Adventure', de: 'ABC Abenteuer' },
        description: { en: 'Learn the alphabet with fun activities', de: 'Lerne das Alphabet mit Spaß' },
        ageGroups: ['3-5'],
        category: 'alphabet',
        difficulty: 'beginner',
        estimatedTime: 20,
        content: [],
        badge: {
            id: 'alphabet-master',
            name: { en: 'Alphabet Master', de: 'Alphabet-Meister' },
            icon: '🔤'
        }
    },
    {
        id: 'preschool-shapes',
        title: { en: 'Shape Explorer', de: 'Formen-Entdecker' },
        description: { en: 'Discover circles, squares, and triangles', de: 'Entdecke Kreise, Quadrate und Dreiecke' },
        ageGroups: ['3-5'],
        category: 'shapes',
        difficulty: 'beginner',
        estimatedTime: 15,
        content: [],
        badge: {
            id: 'shape-wizard',
            name: { en: 'Shape Wizard', de: 'Formen-Zauberer' },
            icon: '🔷'
        }
    },
    {
        id: 'preschool-weather',
        title: { en: 'Weather Wonders', de: 'Wetter-Wunder' },
        description: { en: 'Learn about sun, rain, and snow', de: 'Lerne über Sonne, Regen und Schnee' },
        ageGroups: ['3-5'],
        category: 'nature',
        difficulty: 'beginner',
        estimatedTime: 18,
        content: [],
        badge: {
            id: 'weather-watcher',
            name: { en: 'Weather Watcher', de: 'Wetter-Beobachter' },
            icon: '🌤️'
        }
    },
    {
        id: 'preschool-emotions',
        title: { en: 'Feelings & Emotions', de: 'Gefühle & Emotionen' },
        description: { en: 'Understand happy, sad, and angry', de: 'Verstehe glücklich, traurig und wütend' },
        ageGroups: ['3-5'],
        category: 'emotions',
        difficulty: 'beginner',
        estimatedTime: 16,
        content: [],
        badge: {
            id: 'emotion-expert',
            name: { en: 'Emotion Expert', de: 'Emotions-Experte' },
            icon: '😊'
        }
    }
];

// Expanded modules for ages 5-8
export const elementaryModules: LearningModule[] = [
    {
        id: 'elementary-days-week',
        title: { en: 'Days of the Week', de: 'Wochentage' },
        description: { en: 'Learn all seven days', de: 'Lerne alle sieben Tage' },
        ageGroups: ['5-8'],
        category: 'time',
        difficulty: 'beginner',
        estimatedTime: 20,
        content: [],
        badge: {
            id: 'time-keeper',
            name: { en: 'Time Keeper', de: 'Zeit-Hüter' },
            icon: '📅'
        }
    },
    {
        id: 'elementary-seasons',
        title: { en: 'Four Seasons', de: 'Vier Jahreszeiten' },
        description: { en: 'Explore spring, summer, fall, and winter', de: 'Erkunde Frühling, Sommer, Herbst und Winter' },
        ageGroups: ['5-8'],
        category: 'nature',
        difficulty: 'intermediate',
        estimatedTime: 25,
        content: [],
        badge: {
            id: 'season-explorer',
            name: { en: 'Season Explorer', de: 'Jahreszeiten-Forscher' },
            icon: '🍂'
        }
    },
    {
        id: 'elementary-community-helpers',
        title: { en: 'Community Helpers', de: 'Helfer in der Gemeinde' },
        description: { en: 'Meet doctors, firefighters, and teachers', de: 'Triff Ärzte, Feuerwehrleute und Lehrer' },
        ageGroups: ['5-8'],
        category: 'people',
        difficulty: 'intermediate',
        estimatedTime: 22,
        content: [],
        badge: {
            id: 'community-champion',
            name: { en: 'Community Champion', de: 'Gemeinde-Champion' },
            icon: '👨‍🚒'
        }
    },
    {
        id: 'elementary-transportation',
        title: { en: 'Getting Around', de: 'Unterwegs sein' },
        description: { en: 'Learn about cars, trains, and planes', de: 'Lerne über Autos, Züge und Flugzeuge' },
        ageGroups: ['5-8'],
        category: 'transportation',
        difficulty: 'intermediate',
        estimatedTime: 20,
        content: [],
        badge: {
            id: 'transport-expert',
            name: { en: 'Transport Expert', de: 'Transport-Experte' },
            icon: '🚗'
        }
    }
];

// Expanded modules for ages 8-12
export const middleSchoolModules: LearningModule[] = [
    {
        id: 'middle-hobbies',
        title: { en: 'Hobbies & Activities', de: 'Hobbys & Aktivitäten' },
        description: { en: 'Talk about sports, music, and art', de: 'Sprich über Sport, Musik und Kunst' },
        ageGroups: ['8-12'],
        category: 'activities',
        difficulty: 'intermediate',
        estimatedTime: 30,
        content: [],
        badge: {
            id: 'hobby-master',
            name: { en: 'Hobby Master', de: 'Hobby-Meister' },
            icon: '⚽'
        }
    },
    {
        id: 'middle-geography',
        title: { en: 'Countries & Continents', de: 'Länder & Kontinente' },
        description: { en: 'Explore the world map', de: 'Erkunde die Weltkarte' },
        ageGroups: ['8-12'],
        category: 'geography',
        difficulty: 'intermediate',
        estimatedTime: 35,
        content: [],
        badge: {
            id: 'geography-guru',
            name: { en: 'Geography Guru', de: 'Geografie-Guru' },
            icon: '🌍'
        }
    },
    {
        id: 'middle-daily-routine',
        title: { en: 'My Daily Routine', de: 'Mein Tagesablauf' },
        description: { en: 'Describe your day from morning to night', de: 'Beschreibe deinen Tag von morgens bis abends' },
        ageGroups: ['8-12'],
        category: 'daily-life',
        difficulty: 'intermediate',
        estimatedTime: 28,
        content: [],
        badge: {
            id: 'routine-pro',
            name: { en: 'Routine Pro', de: 'Routine-Profi' },
            icon: '⏰'
        }
    },
    {
        id: 'middle-environment',
        title: { en: 'Protecting Our Planet', de: 'Unseren Planeten schützen' },
        description: { en: 'Learn about recycling and conservation', de: 'Lerne über Recycling und Naturschutz' },
        ageGroups: ['8-12'],
        category: 'environment',
        difficulty: 'advanced',
        estimatedTime: 32,
        content: [],
        badge: {
            id: 'eco-warrior',
            name: { en: 'Eco Warrior', de: 'Öko-Krieger' },
            icon: '♻️'
        }
    }
];

// Expanded modules for ages 13-15
export const teenModules: LearningModule[] = [
    {
        id: 'teen-social-media',
        title: { en: 'Digital Communication', de: 'Digitale Kommunikation' },
        description: { en: 'Navigate social media in another language', de: 'Navigiere soziale Medien in einer anderen Sprache' },
        ageGroups: ['13-15'],
        category: 'technology',
        difficulty: 'intermediate',
        estimatedTime: 35,
        content: [],
        badge: {
            id: 'digital-native',
            name: { en: 'Digital Native', de: 'Digital-Eingeborener' },
            icon: '💬'
        }
    },
    {
        id: 'teen-current-events',
        title: { en: 'News & Current Events', de: 'Nachrichten & Aktuelles' },
        description: { en: 'Discuss world news and events', de: 'Diskutiere Weltnachrichten und Ereignisse' },
        ageGroups: ['13-15'],
        category: 'current-events',
        difficulty: 'advanced',
        estimatedTime: 40,
        content: [],
        badge: {
            id: 'news-analyst',
            name: { en: 'News Analyst', de: 'Nachrichten-Analyst' },
            icon: '📰'
        }
    },
    {
        id: 'teen-career-exploration',
        title: { en: 'Future Careers', de: 'Zukünftige Karrieren' },
        description: { en: 'Explore different professions', de: 'Erkunde verschiedene Berufe' },
        ageGroups: ['13-15'],
        category: 'careers',
        difficulty: 'intermediate',
        estimatedTime: 38,
        content: [],
        badge: {
            id: 'career-explorer',
            name: { en: 'Career Explorer', de: 'Karriere-Forscher' },
            icon: '💼'
        }
    },
    {
        id: 'teen-culture-traditions',
        title: { en: 'Cultural Traditions', de: 'Kulturelle Traditionen' },
        description: { en: 'Learn about holidays and customs', de: 'Lerne über Feiertage und Bräuche' },
        ageGroups: ['13-15'],
        category: 'culture',
        difficulty: 'advanced',
        estimatedTime: 42,
        content: [],
        badge: {
            id: 'culture-ambassador',
            name: { en: 'Culture Ambassador', de: 'Kultur-Botschafter' },
            icon: '🎭'
        }
    }
];

// Expanded modules for ages 15-18
export const highSchoolModules: LearningModule[] = [
    {
        id: 'highschool-debate',
        title: { en: 'Debate & Discussion', de: 'Debatte & Diskussion' },
        description: { en: 'Express opinions and argue points', de: 'Äußere Meinungen und argumentiere Punkte' },
        ageGroups: ['15-18'],
        category: 'communication',
        difficulty: 'advanced',
        estimatedTime: 45,
        content: [],
        badge: {
            id: 'debate-champion',
            name: { en: 'Debate Champion', de: 'Debatier-Champion' },
            icon: '🎤'
        }
    },
    {
        id: 'highschool-literature',
        title: { en: 'Classic Literature', de: 'Klassische Literatur' },
        description: { en: 'Read and analyze famous works', de: 'Lese und analysiere berühmte Werke' },
        ageGroups: ['15-18'],
        category: 'literature',
        difficulty: 'advanced',
        estimatedTime: 50,
        content: [],
        badge: {
            id: 'literature-scholar',
            name: { en: 'Literature Scholar', de: 'Literatur-Gelehrter' },
            icon: '📚'
        }
    },
    {
        id: 'highschool-business',
        title: { en: 'Business Language', de: 'Geschäftssprache' },
        description: { en: 'Professional communication skills', de: 'Professionelle Kommunikationsfähigkeiten' },
        ageGroups: ['15-18'],
        category: 'business',
        difficulty: 'advanced',
        estimatedTime: 48,
        content: [],
        badge: {
            id: 'business-pro',
            name: { en: 'Business Pro', de: 'Business-Profi' },
            icon: '💰'
        }
    },
    {
        id: 'highschool-science',
        title: { en: 'Scientific Terminology', de: 'Wissenschaftliche Terminologie' },
        description: { en: 'Learn scientific vocabulary', de: 'Lerne wissenschaftliches Vokabular' },
        ageGroups: ['15-18'],
        category: 'science',
        difficulty: 'advanced',
        estimatedTime: 46,
        content: [],
        badge: {
            id: 'science-expert',
            name: { en: 'Science Expert', de: 'Wissenschafts-Experte' },
            icon: '🔬'
        }
    }
];

// Combine all expanded modules
export const expandedModules: LearningModule[] = [
    ...toddlerModules,
    ...preschoolModules,
    ...elementaryModules,
    ...middleSchoolModules,
    ...teenModules,
    ...highSchoolModules
];

// Sample quizzes
export const sampleQuizzes: Quiz[] = [
    {
        id: 'quiz-colors-basic',
        moduleId: 'toddler-colors-basic',
        passingScore: 70,
        questions: [
            {
                id: 'q1',
                type: 'multiple-choice',
                question: { en: 'What color is the sky?', de: 'Welche Farbe hat der Himmel?' },
                options: {
                    en: ['Red', 'Blue', 'Green', 'Yellow'],
                    de: ['Rot', 'Blau', 'Grün', 'Gelb']
                },
                correctAnswer: { en: 'Blue', de: 'Blau' },
                explanation: { en: 'The sky is blue!', de: 'Der Himmel ist blau!' }
            }
        ]
    }
];
