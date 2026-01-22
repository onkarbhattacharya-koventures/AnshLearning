'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Mic,
    MicOff,
    Volume2,
    ArrowRightLeft,
    Copy,
    Check,
    Loader2,
    ChevronUp,
    ChevronDown,
    Globe,
    Languages
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Language } from '@/lib/data';

interface TranslationFooterProps {
    defaultLanguage?: Language;
}

export function TranslationFooter({ defaultLanguage = 'en' }: TranslationFooterProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [sourceLanguage, setSourceLanguage] = useState<Language>(defaultLanguage);
    const [targetLanguage, setTargetLanguage] = useState<Language>(defaultLanguage === 'en' ? 'de' : 'en');
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const languages: { code: Language; name: string; flag: string; locale: string }[] = [
        { code: 'en', name: 'English', flag: '🇺🇸', locale: 'en-US' },
        { code: 'de', name: 'German', flag: '🇩🇪', locale: 'de-DE' },
        { code: 'fr', name: 'French', flag: '🇫🇷', locale: 'fr-FR' },
        { code: 'es', name: 'Spanish', flag: '🇪🇸', locale: 'es-ES' },
        { code: 'hi', name: 'Hindi', flag: '🇮🇳', locale: 'hi-IN' },
    ];

    const getLangInfo = (code: Language) => languages.find(l => l.code === code) || languages[0];

    const recognitionRef = useRef<any>(null);

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = getLangInfo(sourceLanguage).locale;

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInputText(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setError('Could not recognize speech. Please try again.');
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [sourceLanguage]);

    // Update recognition language when source language changes
    useEffect(() => {
        if (recognitionRef.current) {
            recognitionRef.current.lang = getLangInfo(sourceLanguage).locale;
        }
    }, [sourceLanguage]);

    // Auto-translate when input changes (with debounce)
    useEffect(() => {
        if (!inputText.trim()) {
            setTranslatedText('');
            return;
        }

        const timeoutId = setTimeout(() => {
            handleTranslate();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [inputText, sourceLanguage, targetLanguage]);

    const handleTranslate = async () => {
        if (!inputText.trim()) return;

        setIsTranslating(true);
        setError(null);

        try {
            // Call translation API
            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: inputText,
                    sourceLanguage,
                    targetLanguage,
                }),
            });

            if (!response.ok) {
                throw new Error('Translation failed');
            }

            const data = await response.json();
            setTranslatedText(data.translatedText);
        } catch (err) {
            console.error('Translation error:', err);
            // Fallback to simple word-by-word translation for demo
            setTranslatedText(getFallbackTranslation(inputText, sourceLanguage, targetLanguage));
        } finally {
            setIsTranslating(false);
        }
    };

    const getFallbackTranslation = (text: string, from: Language, to: Language): string => {
        // Simple fallback translations for common phrases
        const translations: Record<string, Record<Language, string>> = {
            'hello': { en: 'hello', de: 'hallo', fr: 'bonjour', es: 'hola', hi: 'नमस्ते' },
            'goodbye': { en: 'goodbye', de: 'auf wiedersehen', fr: 'au revoir', es: 'adiós', hi: 'नमस्ते (विदाई)' },
            'thank you': { en: 'thank you', de: 'danke', fr: 'merci', es: 'gracias', hi: 'शुक्रिया' },
            'please': { en: 'please', de: 'bitte', fr: 's\'il vous plaît', es: 'por favor', hi: 'कृपया' },
            'yes': { en: 'yes', de: 'ja', fr: 'oui', es: 'sí', hi: 'हाँ' },
            'no': { en: 'no', de: 'nein', fr: 'non', es: 'no', hi: 'नहीं' },
            'good morning': { en: 'good morning', de: 'guten morgen', fr: 'bonjour', es: 'buenos días', hi: 'शुभ प्रभात' },
            'good night': { en: 'good night', de: 'gute nacht', fr: 'bonne nuit', es: 'buenas noches', hi: 'शुभ रात्रि' },
            'how are you': { en: 'how are you', de: 'wie geht es dir', fr: 'comment ça va', es: 'cómo estás', hi: 'आप कैसे हैं' },
            'i love you': { en: 'i love you', de: 'ich liebe dich', fr: 'je t\'aime', es: 'te amo', hi: 'मैं तुमसे प्यार करता हूँ' },
        };

        const lowerText = text.toLowerCase().trim();
        if (translations[lowerText]) {
            return translations[lowerText][to];
        }

        return `[Translation: ${text}]`;
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            setError('Speech recognition is not supported in your browser.');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            setError(null);
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleSpeak = (text: string, lang: Language) => {
        if ('speechSynthesis' in window && text) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = getLangInfo(lang).locale;
            utterance.rate = 0.9;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
    };

    const swapLanguages = () => {
        setSourceLanguage(targetLanguage);
        setTargetLanguage(sourceLanguage);
        setInputText(translatedText);
        setTranslatedText(inputText);
    };

    const copyToClipboard = async () => {
        if (translatedText) {
            try {
                await navigator.clipboard.writeText(translatedText);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    };

    const clearAll = () => {
        setInputText('');
        setTranslatedText('');
        setError(null);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg">
            {/* Collapse/Expand Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full py-2 px-4 flex items-center justify-between hover:bg-accent transition-colors"
            >
                <div className="flex items-center gap-2">
                    <ArrowRightLeft className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">
                        {getLangInfo(sourceLanguage).name} → {getLangInfo(targetLanguage).name} Translator
                    </span>
                    <Badge variant="secondary" className="text-xs">
                        EN, DE, FR, ES, HI Supported
                    </Badge>
                </div>
                {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                ) : (
                    <ChevronUp className="h-4 w-4" />
                )}
            </button>

            {/* Translation Interface */}
            {isExpanded && (
                <div className="p-4 max-w-6xl mx-auto max-h-[70vh] overflow-y-auto sm:max-h-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Input Section */}
                        <Card>
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Select value={sourceLanguage} onValueChange={(val) => setSourceLanguage(val as Language)}>
                                            <SelectTrigger className="w-[130px] h-8">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {languages.map(lang => (
                                                    <SelectItem key={lang.code} value={lang.code}>
                                                        {lang.flag} {lang.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={swapLanguages}
                                            className="h-7"
                                        >
                                            <ArrowRightLeft className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant={isListening ? 'destructive' : 'outline'}
                                            size="sm"
                                            onClick={toggleListening}
                                            disabled={isTranslating}
                                        >
                                            {isListening ? (
                                                <>
                                                    <MicOff className="h-4 w-4 mr-1" />
                                                    Stop
                                                </>
                                            ) : (
                                                <>
                                                    <Mic className="h-4 w-4 mr-1" />
                                                    Speak
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleSpeak(inputText, sourceLanguage)}
                                            disabled={!inputText || isTranslating}
                                        >
                                            <Volume2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <Textarea
                                    placeholder={`Type in ${getLangInfo(sourceLanguage).name}...`}
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    className="min-h-[120px] resize-none"
                                    disabled={isListening}
                                />

                                {isListening && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <div className="flex gap-1">
                                            <div className="w-1 h-4 bg-red-500 animate-pulse" />
                                            <div className="w-1 h-4 bg-red-500 animate-pulse delay-75" />
                                            <div className="w-1 h-4 bg-red-500 animate-pulse delay-150" />
                                        </div>
                                        Listening...
                                    </div>
                                )}

                                <div className="flex justify-between items-center text-xs text-muted-foreground">
                                    <span>{inputText.length} characters</span>
                                    {inputText && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={clearAll}
                                            className="h-6 text-xs"
                                        >
                                            Clear
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Output Section */}
                        <Card>
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <Select value={targetLanguage} onValueChange={(val) => setTargetLanguage(val as Language)}>
                                        <SelectTrigger className="w-[130px] h-8">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {languages.map(lang => (
                                                <SelectItem key={lang.code} value={lang.code}>
                                                    {lang.flag} {lang.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={copyToClipboard}
                                            disabled={!translatedText}
                                        >
                                            {isCopied ? (
                                                <>
                                                    <Check className="h-4 w-4 mr-1" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-4 w-4 mr-1" />
                                                    Copy
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleSpeak(translatedText, targetLanguage)}
                                            disabled={!translatedText}
                                        >
                                            <Volume2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="min-h-[120px] p-3 bg-accent rounded-md relative">
                                    {isTranslating ? (
                                        <div className="flex items-center justify-center h-full">
                                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                        </div>
                                    ) : translatedText ? (
                                        <p className="text-sm leading-relaxed">{translatedText}</p>
                                    ) : (
                                        <p className="text-sm text-muted-foreground italic">
                                            Translation will appear here...
                                        </p>
                                    )}
                                </div>

                                {error && (
                                    <div className="text-xs text-destructive bg-destructive/10 p-2 rounded">
                                        {error}
                                    </div>
                                )}

                                <div className="text-xs text-muted-foreground">
                                    {translatedText && `${translatedText.length} characters`}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Phrases */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="text-xs text-muted-foreground">Quick phrases:</span>
                        {['Hello', 'Thank you', 'Good morning', 'How are you', 'Goodbye'].map((phrase) => (
                            <Button
                                key={phrase}
                                variant="outline"
                                size="sm"
                                onClick={() => setInputText(phrase)}
                                className="h-7 text-xs"
                            >
                                {phrase}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
