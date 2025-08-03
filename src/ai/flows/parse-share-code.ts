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
  baseWeapon: z.string().describe("The base weapon name, extracted from the code. E.g., 'G3' or 'QBZ95-1'"),
  tags: z.array(z.string()).describe("An array of tags, including just the weapon type. E.g., ['Fuzil de combate'] or ['Assault Rifle']"),
});
export type ParseShareCodeOutput = z.infer<typeof ParseShareCodeOutputSchema>;

export async function parseShareCode(input: ParseShareCodeInput): Promise<ParseShareCodeOutput> {
  return parseShareCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseShareCodePrompt',
  input: {schema: ParseShareCodeInputSchema},
  output: {schema: ParseShareCodeOutputSchema},
  prompt: `You are an expert in Delta Force weapon builds. Your task is to parse a given share code and extract structured information from it. The game modes "Conquista" and "Warfare" must be ignored.

The base weapon is just the weapon name.
The tags should contain only the weapon type.

There are two main formats for the share codes.

**Format 1 (Portuguese):** "[Weapon Type] [Weapon Name]-[Game Mode]-[Alphanumeric Code]"
- Input: "Fuzil de combate G3-Conquista-6H3LATG081MQDPAGJAK1I"
  - Output: { baseWeapon: "G3", tags: ["Fuzil de combate"] }
- Input: "Fuzil de assalto K416-Conquista-6H07U6S0FU6KO0LH9IPIA"
  - Output: { baseWeapon: "K416", tags: ["Fuzil de assalto"] }
- Input: "Submetralhadora SMG-45-Conquista-6H07UAC0FU6KO0LH9IPIA"
  - Output: { baseWeapon: "SMG-45", tags: ["Submetralhadora"] }

**Format 2 (English):** "[Weapon Name] [Weapon Type]-[Game Mode]-[Alphanumeric Code]"
- Input: "QBZ95-1 Assault Rifle-Warfare-6GUA5D0063I9AG60CNV35"
  - Output: { baseWeapon: "QBZ95-1", tags: ["Assault Rifle"] }
- Input: "SMG-45 Submachine Gun-Warfare-6GU9BT8063I9AG60CNV35"
  - Output: { baseWeapon: "SMG-45", tags: ["Submachine Gun"] }


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
