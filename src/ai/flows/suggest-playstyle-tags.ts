'use server';

/**
 * @fileOverview A playstyle tag suggestion AI agent.
 *
 * - suggestPlaystyleTags - A function that handles the playstyle tag suggestion process.
 * - SuggestPlaystyleTagsInput - The input type for the suggestPlaystyleTags function.
 * - SuggestPlaystyleTagsOutput - The return type for the suggestPlaystyleTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPlaystyleTagsInputSchema = z.object({
  description: z.string().describe('The description of the build.'),
});
export type SuggestPlaystyleTagsInput = z.infer<typeof SuggestPlaystyleTagsInputSchema>;

const SuggestPlaystyleTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of suggested playstyle tags.'),
});
export type SuggestPlaystyleTagsOutput = z.infer<typeof SuggestPlaystyleTagsOutputSchema>;

export async function suggestPlaystyleTags(input: SuggestPlaystyleTagsInput): Promise<SuggestPlaystyleTagsOutput> {
  return suggestPlaystyleTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPlaystyleTagsPrompt',
  input: {schema: SuggestPlaystyleTagsInputSchema},
  output: {schema: SuggestPlaystyleTagsOutputSchema},
  prompt: `You are an expert in Delta Force weapon builds and playstyles. Based on the provided build description, suggest relevant playstyle tags. Return ONLY the tags, one per line.

Description: {{{description}}}`,
});

const suggestPlaystyleTagsFlow = ai.defineFlow(
  {
    name: 'suggestPlaystyleTagsFlow',
    inputSchema: SuggestPlaystyleTagsInputSchema,
    outputSchema: SuggestPlaystyleTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
