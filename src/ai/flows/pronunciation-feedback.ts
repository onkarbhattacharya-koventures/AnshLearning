// src/ai/flows/pronunciation-feedback.ts
'use server';

/**
 * @fileOverview A pronunciation feedback AI agent.
 *
 * - getPronunciationFeedback - A function that provides pronunciation feedback on a given word.
 * - PronunciationFeedbackInput - The input type for the getPronunciationFeedback function.
 * - PronunciationFeedbackOutput - The return type for the getPronunciationFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PronunciationFeedbackInputSchema = z.object({
  word: z.string().describe('The word to provide pronunciation feedback on.'),
  spokenWord: z
    .string()
    .describe('The spoken word by the user as a base64 encoded audio file.'),
  language: z.enum(['en', 'de']).describe('The language of the word.'),
});
export type PronunciationFeedbackInput = z.infer<
  typeof PronunciationFeedbackInputSchema
>;

const PronunciationFeedbackOutputSchema = z.object({
  feedback: z.string().describe('The pronunciation feedback.'),
  score: z.number().describe('Pronunciation accuracy score 0-1.'),
});
export type PronunciationFeedbackOutput = z.infer<
  typeof PronunciationFeedbackOutputSchema
>;

export async function getPronunciationFeedback(
  input: PronunciationFeedbackInput
): Promise<PronunciationFeedbackOutput> {
  return pronunciationFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pronunciationFeedbackPrompt',
  input: {schema: PronunciationFeedbackInputSchema},
  output: {schema: PronunciationFeedbackOutputSchema},
  prompt: `You are a language learning assistant that helps children improve their pronunciation.

You will be provided with a word, the user's spoken attempt, and the language.

Provide feedback on the user's pronunciation of the word. Include a score between 0 and 1 of how accurate the pronunciation was.

Word: {{{word}}}
Spoken Word: {{media url=spokenWord}}
Language: {{{language}}}`,
});

const pronunciationFeedbackFlow = ai.defineFlow(
  {
    name: 'pronunciationFeedbackFlow',
    inputSchema: PronunciationFeedbackInputSchema,
    outputSchema: PronunciationFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
