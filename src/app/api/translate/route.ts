import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { text, sourceLanguage, targetLanguage } = await request.json();

        if (!text || !sourceLanguage || !targetLanguage) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Use Google Generative AI for translation
        const apiKey = process.env.GOOGLE_GENAI_API_KEY;

        if (!apiKey) {
            console.error('GOOGLE_GENAI_API_KEY is not set');
            return NextResponse.json(
                { error: 'Translation service not configured' },
                { status: 500 }
            );
        }

        const langMap: Record<string, string> = {
            'en': 'English',
            'de': 'German',
            'fr': 'French',
            'es': 'Spanish'
        };

        const sourceLang = langMap[sourceLanguage] || 'English';
        const targetLang = langMap[targetLanguage] || 'English';

        const prompt = `Translate the following ${sourceLang} text to ${targetLang}. Only provide the translation, nothing else:\n\n${text}`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt,
                                },
                            ],
                        },
                    ],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 1000,
                    },
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Translation API request failed');
        }

        const data = await response.json();
        const translatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (!translatedText) {
            throw new Error('No translation received');
        }

        return NextResponse.json({ translatedText });
    } catch (error) {
        console.error('Translation error:', error);
        return NextResponse.json(
            { error: 'Translation failed' },
            { status: 500 }
        );
    }
}
