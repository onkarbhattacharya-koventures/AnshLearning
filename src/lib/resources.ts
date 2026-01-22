import type { Language } from './data';

export interface Resource {
    id: string;
    title: Record<Language, string>;
    description: Record<Language, string>;
    url: string;
    type: 'ebook' | 'video' | 'worksheet' | 'tool';
    languages: Language[];
    tags: string[];
}

export const resources: Resource[] = [
    // Ebooks
    {
        id: 'storyberries',
        title: {
            en: 'Storyberries - Free Fairy Tales & Bedtime Stories',
            de: 'Storyberries - Kostenlose Märchen & Schlafenszeit-Geschichten',
            fr: 'Storyberries - Contes de fées et histoires pour dormir gratuits',
            es: 'Storyberries - Cuentos de hadas e historias para dormir gratis',
        },
        description: {
            en: 'A huge collection of free online children\'s books, bedtime stories, and fairy tales in many languages.',
            de: 'Eine riesige Sammlung kostenloser Online-Kinderbücher, Gute-Nacht-Geschichten und Märchen in vielen Sprachen.',
            fr: 'Une vaste collection de livres pour enfants en ligne, d\'histoires pour dormir et de contes de fées gratuits dans de nombreuses langues.',
            es: 'Una enorme colección de libros infantiles en línea, historias para dormir y cuentos de hadas gratuitos en muchos idiomas.',
        },
        url: 'https://www.storyberries.com/',
        type: 'ebook',
        languages: ['en', 'de', 'fr', 'es'],
        tags: ['stories', 'reading', 'multilingual'],
    },
    {
        id: 'fable-cottage',
        title: {
            en: 'The Fable Cottage - Bilingual Stories',
            de: 'The Fable Cottage - Zweisprachige Geschichten',
            fr: 'The Fable Cottage - Histoires bilingues',
            es: 'The Fable Cottage - Historias bilingües',
        },
        description: {
            en: 'Classic children\'s stories translated into multiple languages with parallel text and slow audio.',
            de: 'Klassische Kindergeschichten, übersetzt in mehrere Sprachen mit Paralleltext und langsamem Audio.',
            fr: 'Histoires classiques pour enfants traduites en plusieurs langues avec texte parallèle et audio lent.',
            es: 'Historias clásicas para niños traducidas a varios idiomas con texto paralelo y audio lento.',
        },
        url: 'https://www.thefablecottage.com/',
        type: 'ebook',
        languages: ['en', 'de', 'fr', 'es'],
        tags: ['bilingual', 'audio', 'classics'],
    },
    {
        id: 'unite-for-literacy',
        title: {
            en: 'Unite for Literacy',
            de: 'Unite for Literacy',
            fr: 'Unite for Literacy',
            es: 'Unite for Literacy',
        },
        description: {
            en: 'Over 100 original e-books in English and Spanish with audio narration in 43 languages.',
            de: 'Über 100 Original-E-Books in Englisch und Spanisch mit Audio-Erzählung in 43 Sprachen.',
            fr: 'Plus de 100 livres électroniques originaux en anglais et en espagnol avec narration audio en 43 langues.',
            es: 'Más de 100 libros electrónicos originales en inglés y español con narración de audio en 43 idiomas.',
        },
        url: 'https://www.uniteforliteracy.com/',
        type: 'ebook',
        languages: ['en', 'es'],
        tags: ['picture books', 'audio'],
    },
    // Video Channels
    {
        id: 'easy-german-kids',
        title: {
            en: 'Easy German - Learning for Kids',
            de: 'Easy German - Lernen für Kinder',
            fr: 'Easy German - Apprentissage pour enfants',
            es: 'Easy German - Aprendizaje para niños',
        },
        description: {
            en: 'Authentic German language learning through fun street interviews and daily life videos.',
            de: 'Authentisches Deutschlernen durch lustige Straßeninterviews und Alltagsvideos.',
            fr: 'Apprentissage authentique de l\'allemand à travers des interviews de rue amusantes et des vidéos de la vie quotidienne.',
            es: 'Aprendizaje auténtico de la lengua alemana a través de divertidas entrevistas callejeras y vídeos de la vida diaria.',
        },
        url: 'https://www.youtube.com/c/EasyGerman',
        type: 'video',
        languages: ['de'],
        tags: ['youtube', 'conversational', 'culture'],
    },
    {
        id: 'super-simple-songs',
        title: {
            en: 'Super Simple Songs - English',
            de: 'Super Simple Songs - Englisch',
            fr: 'Super Simple Songs - Anglais',
            es: 'Super Simple Songs - Inglés',
        },
        description: {
            en: 'High-quality animated nursery rhymes and children\'s songs designed for learning English.',
            de: 'Hochwertige animierte Kinderreime und Kinderlieder zum Englischlernen.',
            fr: 'Des comptines et des chansons pour enfants animées de haute qualité conçues pour l\'apprentissage de l\'anglais.',
            es: 'Canciones infantiles animadas de alta calidad diseñadas für das Erlernen von Englisch.',
        },
        url: 'https://www.youtube.com/user/SuperSimpleSongs',
        type: 'video',
        languages: ['en'],
        tags: ['songs', 'nursery rhymes', 'youtube'],
    },
    {
        id: 'petit-ours-brun',
        title: {
            en: 'Petit Ours Brun - French Stories',
            de: 'Petit Ours Brun - Französische Geschichten',
            fr: 'Petit Ours Brun - Histoires en français',
            es: 'Petit Ours Brun - Historias en francés',
        },
        description: {
            en: 'Gentle animated stories about daily routines and family themes in French.',
            de: 'Sanfte animierte Geschichten über Alltagsroutinen und Familienthemen auf Französisch.',
            fr: 'De douces histoires animées sur les routines quotidiennes et les thèmes familiaux en français.',
            es: 'Tiernas historias animadas sobre rutinas diarias y temas familiares en francés.',
        },
        url: 'https://www.youtube.com/c/PetitOursBrun',
        type: 'video',
        languages: ['fr'],
        tags: ['stories', 'daily life', 'youtube'],
    },
    {
        id: 'toy-cantando-spanish',
        title: {
            en: 'Toy Cantando - Spanish Songs',
            de: 'Toy Cantando - Spanische Lieder',
            fr: 'Toy Cantando - Chansons espagnoles',
            es: 'Toy Cantando - Canciones en español',
        },
        description: {
            en: 'Classic Spanish nursery rhymes, fairy tales, and educational music for kids.',
            de: 'Klassische spanische Kinderreime, Märchen und Lernmusik für Kinder.',
            fr: 'Comptines espagnoles classiques, contes de fées et musique éducative pour enfants.',
            es: 'Clásicos villancicos, cuentos de hadas y música educativa para niños en español.',
        },
        url: 'https://www.youtube.com/user/toycantando',
        type: 'video',
        languages: ['es'],
        tags: ['songs', 'stories', 'youtube'],
    },
    // Worksheets
    {
        id: 'studycat-printables',
        title: {
            en: 'Studycat - Free Language Printables',
            de: 'Studycat - Kostenlose Sprachausdrucke',
            fr: 'Studycat - Imprimables linguistiques gratuits',
            es: 'Studycat - Imprimibles de idiomas gratuitos',
        },
        description: {
            en: 'Free printable worksheets for English, Spanish, French, and German for kids.',
            de: 'Kostenlose druckbare Arbeitsblätter für Englisch, Spanisch, Französisch und Deutsch für Kinder.',
            fr: 'Fiches d\'exercices gratuites à imprimer en anglais, espagnol, français et allemand pour les enfants.',
            es: 'Fichas de trabajo gratuitas para imprimir en inglés, español, francés y alemán para niños.',
        },
        url: 'https://studycat.com/printables/',
        type: 'worksheet',
        languages: ['en', 'de', 'fr', 'es'],
        tags: ['printables', 'exercises', 'vocabulary'],
    },
    {
        id: 'education-com-spanish',
        title: {
            en: 'Education.com - Spanish Worksheets',
            de: 'Education.com - Spanische Arbeitsblätter',
            fr: 'Education.com - Fiches d\'espagnol',
            es: 'Education.com - Fichas de español',
        },
        description: {
            en: 'A wide range of Spanish learning worksheets from coloring pages to grammar exercises.',
            de: 'Eine breite Palette von Spanisch-Lernarbeitsblättern von Malvorlagen bis hin zu Grammatikübungen.',
            fr: 'Une large gamme de fiches d\'apprentissage de l\'espagnol, des coloriages aux exercices de grammaire.',
            es: 'Una amplia gama de fichas de aprendizaje de español, desde páginas para colorear hasta ejercicios de gramática.',
        },
        url: 'https://www.education.com/worksheets/spanish/',
        type: 'worksheet',
        languages: ['es'],
        tags: ['grammar', 'coloring', 'printables'],
    },
    // Tools
    {
        id: 'duolingo-kids',
        title: {
            en: 'Duolingo ABC',
            de: 'Duolingo ABC',
            fr: 'Duolingo ABC',
            es: 'Duolingo ABC',
        },
        description: {
            en: 'A free app that helps children learn to read through fun, interactive games.',
            de: 'Eine kostenlose App, die Kindern hilft, das Lesen durch lustige, interaktive Spiele zu lernen.',
            fr: 'Une application gratuite qui aide les enfants à apprendre à lire grâce à des jeux amusantes.',
            es: 'Una aplicación gratuita que ayuda a los niños a aprender a leer a través de divertidos juegos interactivos.',
        },
        url: 'https://www.duolingo.com/abc',
        type: 'tool',
        languages: ['en', 'es', 'fr'],
        tags: ['app', 'reading', 'gamified'],
    },
    {
        id: 'british-council-kids',
        title: {
            en: 'British Council - LearnEnglish Kids',
            de: 'British Council - LearnEnglish Kids',
            fr: 'British Council - LearnEnglish Kids',
            es: 'British Council - LearnEnglish Kids',
        },
        description: {
            en: 'Free online games, songs, stories, and activities for children learning English.',
            de: 'Kostenlose Online-Spiele, Lieder, Geschichten und Aktivitäten für Kinder, die Englisch lernen.',
            fr: 'Jeux, chansons, histoires et activités en ligne gratuits pour les enfants qui apprennent l\'anglais.',
            es: 'Juegos, canciones, historias y actividades en línea gratuitos para niños que aprenden inglés.',
        },
        url: 'https://learnenglishkids.britishcouncil.org/',
        type: 'tool',
        languages: ['en'],
        tags: ['games', 'activities', 'educational'],
    },
    {
        id: 'duolingo-podcast',
        title: {
            en: 'Duolingo Spanish/French Podcasts',
            de: 'Duolingo Spanisch/Französisch Podcasts',
            fr: 'Podcasts Duolingo Espagnol/Français',
            es: 'Podcasts de Duolingo en Español/Francés',
        },
        description: {
            en: 'Fascinating true stories for intermediate learners, delivered in easy-to-understand Spanish and French.',
            de: 'Faszinierende wahre Geschichten für Fortgeschrittene, erzählt in leicht verständlichem Spanisch und Französisch.',
            fr: 'Des histoires vraies fascinantes pour les apprenants intermédiaires, livrées en espagnol et en français faciles à comprendre.',
            es: 'Fascinantes historias reales para estudiantes de nivel intermedio, presentadas en español y francés fáciles de entender.',
        },
        url: 'https://podcast.duolingo.com/',
        type: 'video',
        languages: ['es', 'fr'],
        tags: ['podcast', 'listening', 'stories'],
    },
    {
        id: 'digital-dialects',
        title: {
            en: 'Digital Dialects - Language Games',
            de: 'Digital Dialects - Sprachspiele',
            fr: 'Digital Dialects - Jeux linguistiques',
            es: 'Digital Dialects - Juegos de idiomas',
        },
        description: {
            en: 'Free to use games for learning 80 languages, including English, German, French, and Spanish.',
            de: 'Kostenlose Spiele zum Erlernen von 80 Sprachen, darunter Englisch, Deutsch, Französisch und Spanisch.',
            fr: 'Jeux gratuits pour apprendre 80 langues, dont l\'anglais, l\'allemand, le français et l\'espagnol.',
            es: 'Juegos gratuitos para aprender 80 idiomas, incluidos inglés, alemán, francés y español.',
        },
        url: 'https://www.digitaldialects.com/',
        type: 'tool',
        languages: ['en', 'de', 'fr', 'es'],
        tags: ['games', 'vocabulary', 'interactive'],
    },
];
