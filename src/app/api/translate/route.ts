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
            'es': 'Spanish',
            'hi': 'Hindi'
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
            const errorText = await response.text().catch(() => 'Unknown error');
            console.error(`Translation API error: ${response.status} - ${errorText}`);
            
            if (response.status === 429) {
                return NextResponse.json(
                    { error: 'Translation service rate limit exceeded. Please try again later.' },
                    { status: 429 }
                );
            }
            
            if (response.status === 401 || response.status === 403) {
                return NextResponse.json(
                    { error: 'Translation service authentication failed' },
                    { status: 500 }
                );
            }
            
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json().catch(() => {
            throw new Error('Invalid response format from translation service');
        });
        
        const translatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (!translatedText) {
            console.error('Empty translation response:', data);
            throw new Error('No translation received from service');
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
