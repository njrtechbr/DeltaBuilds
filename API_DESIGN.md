# DeltaBuilds - Design da API

Este documento descreve a interface de backend da aplicação. Como esta é uma aplicação Next.js, não temos uma API REST ou GraphQL tradicional. Em vez disso, a funcionalidade é exposta através de **Next.js Server Actions** e **Fluxos de IA do Genkit**.

## 1. Server Actions (`src/app/actions.ts`)

Server Actions são funções que rodam apenas no servidor e podem ser chamadas diretamente de Componentes de Cliente (Client Components). Elas são a principal forma de lidar com a mutação de dados e interações com a IA.

---

### `getTagSuggestions(input: { description: string }): Promise<SuggestionState>`

- **Descrição:** Recebe a descrição de uma build e usa um fluxo de IA para sugerir tags de estilo de jogo relevantes.
- **Entrada:**
  - `description`: Uma string contendo a descrição da build (mínimo de 20 caracteres).
- **Saída (`SuggestionState`):**
  - `tags?: string[]`: Um array de tags sugeridas.
  - `error?: string`: Uma mensagem de erro se a operação falhar.
- **Fluxo de IA Utilizado:** `suggestPlaystyleTags`

---

### `parseCode(input: { importCode: string }): Promise<ParsedCodeState>`

- **Descrição:** Analisa um código de importação do jogo para extrair automaticamente a arma base e as tags de tipo de arma.
- **Entrada:**
  - `importCode`: A string bruta do código de importação do jogo.
- **Saída (`ParsedCodeState`):**
  - `baseWeapon?: string`: O nome da arma base extraído.
  - `tags?: string[]`: Um array contendo a tag de tipo de arma extraída.
  - `error?: string`: Uma mensagem de erro se a análise falhar.
- **Fluxo de IA Utilizado:** `parseShareCode`

---

### `getTranslation(input: { text: string, targetLocale: string }): Promise<TranslationState>`

- **Descrição:** Traduz um texto para um idioma de destino.
- **Entrada:**
  - `text`: A string a ser traduzida.
  - `targetLocale`: O código do local de destino (ex: 'en', 'es').
- **Saída (`TranslationState`):**
  - `translatedText?: string`: O texto traduzido.
  - `error?: string`: Uma mensagem de erro se a tradução falhar.
- **Fluxo de IA Utilizado:** `translateText`

---

### Futuras Server Actions (A Serem Implementadas)

- `submitBuild(formData)`: Lida com a criação de uma nova build e sua primeira versão.
- `updateBuild(formData)`: Lida com o envio de uma nova versão para uma build existente.
- `handleVote(buildId, voteType)`: Registra um voto positivo ou negativo de um usuário em uma build.
- `postComment(buildId, text)`: Adiciona um novo comentário a uma build.
- `toggleFavorite(buildId)`: Adiciona ou remove uma build dos favoritos de um usuário.
- `reportCode(versionId, reason)`: Envia uma denúncia para um código de importação que não funciona.
- `updateProfile(formData)`: Atualiza as informações de perfil de um usuário.
- `admin_updateBuildStatus(versionId, status)`: Ação de admin para alterar o status da versão de uma build.
- `admin_updateUserRole(userId, role)`: Ação de admin para alterar a função de um usuário.
- `admin_updateUserStatus(userId, status)`: Ação de admin para banir/desbanir um usuário.

## 2. Fluxos de IA do Genkit (`src/ai/flows/`)

Esses fluxos são o núcleo da funcionalidade de IA, gerenciados pelo framework Genkit. Eles são chamados pelas Server Actions.

---

### `suggestPlaystyleTagsFlow`

- **Arquivo:** `suggest-playstyle-tags.ts`
- **Descrição:** O fluxo subjacente para gerar sugestões de tags a partir de uma descrição. Ele recebe o texto, formata um prompt para um LLM e estrutura a saída como um array de strings.
- **Esquema de Entrada:** `{ description: z.string() }`
- **Esquema de Saída:** `{ tags: z.array(z.string()) }`

---

### `parseShareCodeFlow`

- **Arquivo:** `parse-share-code.ts`
- **Descrição:** O fluxo para analisar códigos de importação. Ele usa "few-shot prompting" para instruir o LLM sobre como extrair a `baseWeapon` (arma base) e `tags` de tipo de arma de diferentes formatos de código.
- **Esquema de Entrada:** `{ importCode: z.string() }`
- **Esquema de Saída:** `{ baseWeapon: z.string(), tags: z.array(z.string()) }`

---

### `translateTextFlow`

- **Arquivo:** `translate-text.ts`
- **Descrição:** O fluxo para traduzir texto. Ele recebe o texto e o local de destino e pede ao LLM para realizar a tradução.
- **Esquema de Entrada:** `{ text: z.string(), targetLocale: z.string() }`
- **Esquema de Saída:** `{ translatedText: z.string() }`
