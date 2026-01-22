// src/app/actions.ts
// Mock implementation for static export - pronunciation feedback disabled

import {
  type PronunciationFeedbackInput,
} from '@/ai/flows/pronunciation-feedback';

export async function getPronunciationFeedbackAction(
  input: PronunciationFeedbackInput
) {
  // Mock response for static export
  return { 
    success: false, 
    error: 'Pronunciation feedback is not available in the static version. Please use the full deployment for AI features.',
    data: null
  };
}
