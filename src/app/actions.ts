'use server';

import { suggestPlaystyleTags } from '@/ai/flows/suggest-playstyle-tags';
import { parseShareCode } from '@/ai/flows/parse-share-code';
import { z } from 'zod';

const suggestionSchema = z.object({
  description: z.string().min(20, { message: 'Description must be at least 20 characters long.' }),
});

const parseCodeSchema = z.object({
    shareCode: z.string().min(10, { message: 'Share code is too short.' }),
});

type SuggestionState = {
  tags?: string[];
  error?: string;
}

type ParsedCodeState = {
    baseWeapon?: string;
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

export async function parseCode(input: { shareCode: string }): Promise<ParsedCodeState> {
    const validatedFields = parseCodeSchema.safeParse(input);

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors.shareCode?.join(', '),
        };
    }

    try {
        const result = await parseShareCode({ shareCode: validatedFields.data.shareCode });
        return {
            baseWeapon: result.baseWeapon,
            tags: result.tags,
        };
    } catch (error) {
        console.error('AI Parse Error:', error);
        return {
            error: 'Failed to parse share code. Please check the code and try again.',
        };
    }
}
