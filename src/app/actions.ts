// src/app/actions.ts
'use server';

import {
  getPronunciationFeedback,
  type PronunciationFeedbackInput,
} from '@/ai/flows/pronunciation-feedback';

export async function getPronunciationFeedbackAction(
  input: PronunciationFeedbackInput
) {
  try {
    const result = await getPronunciationFeedback(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in getPronunciationFeedbackAction:', error);
    return { success: false, error: 'Failed to get pronunciation feedback.' };
  }
}
