# DeltaBuilds - API Design

This document describes the application's backend interface. Since this is a Next.js application, we don't have a traditional REST or GraphQL API. Instead, functionality is exposed through **Next.js Server Actions** and **Genkit AI Flows**.

## 1. Server Actions (`src/app/actions.ts`)

Server Actions are functions that run only on the server and can be called directly from Client Components. They are the primary way to handle data mutation and AI interactions.

---

### `getTagSuggestions(input: { description: string }): Promise<SuggestionState>`

- **Description:** Takes a build description and uses an AI flow to suggest relevant playstyle tags.
- **Input:**
  - `description`: A string containing the build's description (min 20 characters).
- **Output (`SuggestionState`):**
  - `tags?: string[]`: An array of suggested tags.
  - `error?: string`: An error message if the operation fails.
- **AI Flow Used:** `suggestPlaystyleTags`

---

### `parseCode(input: { importCode: string }): Promise<ParsedCodeState>`

- **Description:** Parses a game import code to automatically extract the base weapon and weapon type tags.
- **Input:**
  - `importCode`: The raw import code string from the game.
- **Output (`ParsedCodeState`):**
  - `baseWeapon?: string`: The extracted base weapon name.
  - `tags?: string[]`: An array containing the extracted weapon type tag.
  - `error?: string`: An error message if parsing fails.
- **AI Flow Used:** `parseShareCode`

---

### `getTranslation(input: { text: string, targetLocale: string }): Promise<TranslationState>`

- **Description:** Translates a given text into a target language.
- **Input:**
  - `text`: The string to translate.
  - `targetLocale`: The target locale code (e.g., 'en', 'es').
- **Output (`TranslationState`):**
  - `translatedText?: string`: The translated text.
  - `error?: string`: An error message if translation fails.
- **AI Flow Used:** `translateText`

---

### Future Server Actions (To Be Implemented)

- `submitBuild(formData)`: Handles the creation of a new build and its first version.
- `updateBuild(formData)`: Handles the submission of a new version for an existing build.
- `handleVote(buildId, voteType)`: Records a user's upvote or downvote on a build.
- `postComment(buildId, text)`: Adds a new comment to a build.
- `toggleFavorite(buildId)`: Adds or removes a build from a user's favorites.
- `reportCode(versionId, reason)`: Submits a report for a non-working import code.
- `updateProfile(formData)`: Updates a user's profile information.
- `admin_updateBuildStatus(versionId, status)`: Admin action to change a build version's status.
- `admin_updateUserRole(userId, role)`: Admin action to change a user's role.
- `admin_updateUserStatus(userId, status)`: Admin action to ban/unban a user.

## 2. Genkit AI Flows (`src/ai/flows/`)

These flows are the core of the AI functionality, managed by the Genkit framework. They are called by the Server Actions.

---

### `suggestPlaystyleTagsFlow`

- **File:** `suggest-playstyle-tags.ts`
- **Description:** The underlying flow for generating tag suggestions from a description. It takes the text, formats a prompt for an LLM, and structures the output as an array of strings.
- **Input Schema:** `{ description: z.string() }`
- **Output Schema:** `{ tags: z.array(z.string()) }`

---

### `parseShareCodeFlow`

- **File:** `parse-share-code.ts`
- **Description:** The flow for parsing import codes. It uses few-shot prompting to instruct the LLM on how to extract the `baseWeapon` and weapon `tags` from different code formats.
- **Input Schema:** `{ importCode: z.string() }`
- **Output Schema:** `{ baseWeapon: z.string(), tags: z.array(z.string()) }`

---

### `translateTextFlow`

- **File:** `translate-text.ts`
- **Description:** The flow for translating text. It takes the text and target locale and asks the LLM to perform the translation.
- **Input Schema:** `{ text: z.string(), targetLocale: z.string() }`
- **Output Schema:** `{ translatedText: z.string() }`
