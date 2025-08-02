'use server';

import { suggestPlaystyleTags } from '@/ai/flows/suggest-playstyle-tags';
import { z } from 'zod';

const suggestionSchema = z.object({
  description: z.string().min(20, { message: 'Description must be at least 20 characters long.' }),
});

type SuggestionState = {
  tags?: string[];
  error?: string;
}

export async function getTagSuggestions(input: { description: string }): Promise<SuggestionState> {
  const validatedFields = suggestionSchema.safeParse(input);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.description?.join(', '),
    };
  }

  try {
    const result = await suggestPlaystyleTags({ description: validatedFields.data.description });
    return {
      tags: result.tags,
    };
  } catch (error) {
    console.error('AI Suggestion Error:', error);
    return {
      error: 'Failed to get suggestions from AI. Please try again later.',
    };
  }
}
