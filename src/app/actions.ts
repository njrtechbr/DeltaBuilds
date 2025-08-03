'use server';

import { suggestPlaystyleTags } from '@/ai/flows/suggest-playstyle-tags';
import { parseShareCode } from '@/ai/flows/parse-share-code';
import { translateText } from '@/ai/flows/translate-text';
import { z } from 'zod';

const suggestionSchema = z.object({
  description: z.string().min(20, { message: 'Description must be at least 20 characters long.' }),
});

const parseCodeSchema = z.object({
    importCode: z.string().min(10, { message: 'Import code is too short.' }),
});

const translationSchema = z.object({
    text: z.string().min(1, { message: 'Text to translate cannot be empty.' }),
    targetLocale: z.string().min(2, { message: 'Target locale is required.' }),
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

type TranslationState = {
    translatedText?: string;
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

export async function parseCode(input: { importCode: string }): Promise<ParsedCodeState> {
    const validatedFields = parseCodeSchema.safeParse(input);

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors.importCode?.join(', '),
        };
    }

    try {
        const result = await parseShareCode({ importCode: validatedFields.data.importCode });
        return {
            baseWeapon: result.baseWeapon,
            tags: result.tags,
        };
    } catch (error) {
        console.error('AI Parse Error:', error);
        return {
            error: 'Failed to parse import code. Please check the code and try again.',
        };
    }
}


export async function getTranslation(input: { text: string, targetLocale: string }): Promise<TranslationState> {
    const validatedFields = translationSchema.safeParse(input);

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors.text?.join(', ') || validatedFields.error.flatten().fieldErrors.targetLocale?.join(', '),
        };
    }

    try {
        const result = await translateText({ text: validatedFields.data.text, targetLocale: validatedFields.data.targetLocale });
        return {
            translatedText: result.translatedText,
        };
    } catch (error) {
        console.error('AI Translation Error:', error);
        return {
            error: 'Failed to translate text. Please try again.',
        };
    }
}
