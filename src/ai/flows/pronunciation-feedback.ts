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

const pronunciationFeedbackFlow = ai.defineFlow(
  {
    name: 'pronunciationFeedbackFlow',
    inputSchema: PronunciationFeedbackInputSchema,
    outputSchema: PronunciationFeedbackOutputSchema,
  },
  async input => {
    // Return a mock response instead of calling the Gemini API.
    return {
      feedback: `This is a mocked feedback for the word "${input.word}". Your pronunciation was great!`,
      score: 0.95,
    };
  }
);
