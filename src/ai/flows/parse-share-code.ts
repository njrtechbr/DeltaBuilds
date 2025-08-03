'use server';

/**
 * @fileOverview An AI agent to parse weapon build share codes.
 *
 * - parseShareCode - A function that parses a share code and extracts build details.
 * - ParseShareCodeInput - The input type for the parseShareCode function.
 * - ParseShareCodeOutput - The return type for the parseShareCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseShareCodeInputSchema = z.object({
  shareCode: z.string().describe('The full share code string for a weapon build.'),
});
export type ParseShareCodeInput = z.infer<typeof ParseShareCodeInputSchema>;

const ParseShareCodeOutputSchema = z.object({
  buildName: z.string().describe("The name of the build, extracted from the code. E.g., 'Conquista'"),
  baseWeapon: z.string().describe("The base weapon name, extracted from the code. E.g., 'G3'"),
  tags: z.array(z.string()).describe("An array of tags, including the weapon type. E.g., ['Fuzil de combate', 'Conquista']"),
});
export type ParseShareCodeOutput = z.infer<typeof ParseShareCodeOutputSchema>;

export async function parseShareCode(input: ParseShareCodeInput): Promise<ParseShareCodeOutput> {
  return parseShareCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseShareCodePrompt',
  input: {schema: ParseShareCodeInputSchema},
  output: {schema: ParseShareCodeOutputSchema},
  prompt: `You are an expert in Delta Force weapon builds. Your task is to parse a given share code and extract structured information from it.

The share code format is: "[Weapon Type] [Weapon Name]-[Build Name]-[Alphanumeric Code]"

Examples:
- Input: "Fuzil de combate G3-Conquista-6H3LATG081MQDPAGJAK1I"
  - Output: { buildName: "Conquista", baseWeapon: "G3", tags: ["Fuzil de combate", "Conquista"] }
- Input: "Fuzil de assalto K416-Conquista-6H07U6S0FU6KO0LH9IPIA"
  - Output: { buildName: "Conquista", baseWeapon: "K416", tags: ["Fuzil de assalto", "Conquista"] }
- Input: "Submetralhadora SMG-45-Conquista-6H07UAC0FU6KO0LH9IPIA"
  - Output: { buildName: "Conquista", baseWeapon: "SMG-45", tags: ["Submetralhadora", "Conquista"] }

Now, parse the following share code:
Share Code: {{{shareCode}}}
`,
});

const parseShareCodeFlow = ai.defineFlow(
  {
    name: 'parseShareCodeFlow',
    inputSchema: ParseShareCodeInputSchema,
    outputSchema: ParseShareCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
