# DeltaBuilds

![DeltaBuilds](/public/readme-screenshot.png)

DeltaBuilds é uma plataforma completa para jogadores de Delta Force compartilharem, descobrirem e avaliarem builds de armas. O projeto foi construído com Next.js, Tailwind CSS e utiliza IA generativa com o Genkit para funcionalidades avançadas como sugestão de tags e tradução.

## ✨ Funcionalidades Principais

- **Envio e Versionamento de Builds:** Usuários podem submeter suas builds de armas e atualizá-las com novas versões e notas de patch.
- **Descoberta Avançada:** Um sistema de busca e filtros permite encontrar builds por nome, autor, arma base, tags de estilo de jogo e plataformas de código (Steam, Garena, Mobile).
- **Interação da Comunidade:** Um sistema de votação (upvotes/downvotes) e comentários para discutir e avaliar as builds.
- **Perfis de Usuário:** Perfis públicos com informações do usuário, builds enviadas, builds favoritas, sistema de reputação e links para redes sociais.
- **Funcionalidades com IA (Genkit):**
  - **Sugestão de Tags:** Geração de tags de estilo de jogo com base na descrição da build.
  - **Análise de Código:** Extração automática da arma base e tipo de arma a partir dos códigos de importação do jogo.
  - **Tradução:** Tradução de descrições de builds com um clique.
- **Internacionalização (i18n):** Suporte completo para Português, Inglês e Espanhol.
- **Painel de Administração:** Uma área dedicada para administradores gerenciarem builds, usuários e denúncias da comunidade.

## 🚀 Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [Shadcn/ui](https://ui.shadcn.com/)
- **Inteligência Artificial:** [Genkit](https://firebase.google.com/docs/genkit)
- **Banco de Dados (Planejado):** [Supabase](https://supabase.io/)
- **Internacionalização:** [next-intl](https://next-intl.com/)
- **Formulários:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## ⚙️ Como Começar

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/your-username/deltabuilds.git
    cd deltabuilds
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    - Renomeie o arquivo `.env.example` para `.env`.
    - Preencha as variáveis de ambiente necessárias. Para a integração com o Genkit, você precisará de uma chave de API do Google AI Studio. Para o Supabase, você precisará das chaves da sua instância.
    ```env
    # Genkit (Google AI)
    GEMINI_API_KEY="SUA_API_KEY_AQUI"

    # Supabase (para futura integração)
    NEXT_PUBLIC_SUPABASE_URL="SUA_URL_SUPABASE"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="SUA_CHAVE_ANON_SUPABASE"
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Acesse a aplicação:**
    Abra [http://localhost:9002](http://localhost:9002) no seu navegador para ver a aplicação em funcionamento.
