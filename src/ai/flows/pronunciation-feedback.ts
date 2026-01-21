'use server';

import { ai } from '@/ai/genkit';
import { z, media } from 'genkit';

const PronunciationFeedbackInputSchema = z.object({
  word: z.string().describe('The word to provide pronunciation feedback on.'),
  spokenWord: z.string().describe('The spoken word by the user as a base64 encoded audio file.'),
  language: z.enum(['en', 'de']).describe('The language of the word.'),
});
export type PronunciationFeedbackInput = z.infer<typeof PronunciationFeedbackInputSchema>;

const PronunciationFeedbackOutputSchema = z.object({
  feedback: z.string().describe('The pronunciation feedback.'),
  score: z.number().describe('Pronunciation accuracy score 0-1.'),
});
export type PronunciationFeedbackOutput = z.infer<typeof PronunciationFeedbackOutputSchema>;

export async function getPronunciationFeedback(input: PronunciationFeedbackInput): Promise<PronunciationFeedbackOutput> {
  return pronunciationFeedbackFlow(input);
}

const pronunciationFeedbackFlow = ai.defineFlow(
  {
    name: 'pronunciationFeedbackFlow',
    inputSchema: PronunciationFeedbackInputSchema,
    outputSchema: PronunciationFeedbackOutputSchema,
  },
  async (input) => {
    const { word, spokenWord, language } = input;

    const llmResponse = await ai.generate({
      prompt: `You are a language teacher. Your task is to provide feedback on the user's pronunciation of a word.
        The user is trying to pronounce the word: "${word}" in ${language}.
        You will be given the user's spoken word as an audio file.
        Your task is to provide a short, encouraging, and constructive feedback on the user's pronunciation.
        Also, provide a pronunciation accuracy score from 0 to 1, where 1 is a perfect pronunciation.
        Your response should be in the language of the word.`,
      model: 'gemini-1.5-flash',
      input: {
        spokenWord: media({
          url: spokenWord,
          contentType: 'audio/webm',
        }),
      },
      output: {
        format: 'json',
        schema: PronunciationFeedbackOutputSchema,
      },
    });

    return llmResponse.output() ?? { feedback: 'Error: No response from the model', score: 0 };
  }
);
