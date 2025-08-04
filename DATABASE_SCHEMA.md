# DeltaBuilds - Esquema do Banco de Dados Supabase

Este documento descreve o esquema de banco de dados proposto para a aplicação DeltaBuilds usando Supabase (PostgreSQL).

## Tabelas

### 1. `users` (usuários)

Armazena informações de perfil público dos usuários, estendendo a tabela nativa `auth.users`.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Chave Primária, Chave Estrangeira para `auth.users.id` | Referencia o `id` na tabela `auth.users` do Supabase. |
| `username` | `text` | Único, Não Nulo | Nome de exibição público para o usuário. |
| `avatar_url` | `text` | | URL para a foto de perfil do usuário. |
| `bio` | `text` | | Uma pequena biografia do usuário. |
| `socials` | `jsonb` | | Objeto JSON contendo links para perfis de redes sociais (ex: `{ "youtube": "...", "twitch": "..." }`). |
| `role` | `text` | Não Nulo, Padrão: `'user'` | Função do usuário (`'user'` ou `'admin'`). |
| `status` | `text` | Não Nulo, Padrão: `'active'` | Status da conta do usuário (`'active'` ou `'banned'`). |
| `created_at` | `timestamptz` | Não Nulo, Padrão: `now()` | Timestamp de quando o perfil foi criado. |
| `updated_at` | `timestamptz` | Não Nulo, Padrão: `now()` | Timestamp da última atualização do perfil. |

**Políticas de RLS (Row Level Security):**
- Usuários podem visualizar todos os perfis.
- Usuários só podem atualizar o seu próprio perfil.
- Admins podem atualizar qualquer perfil.

---

### 2. `builds`

Armazena as informações centrais de cada build de arma.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Chave Primária, Padrão: `gen_random_uuid()` | Identificador único para a build. |
| `author_id` | `uuid` | Não Nulo, Chave Estrangeira para `users.id` | O usuário que criou a build. |
| `name` | `text` | Não Nulo | O nome da build. |
| `base_weapon` | `text` | Não Nulo | A arma base para a build (ex: 'M4A1'). |
| `description` | `text` | Não Nulo | Uma descrição detalhada da build. |
| `youtube_url` | `text` | | URL opcional para um vídeo do YouTube mostrando a build. |
| `gallery_image_urls` | `text[]` | | Array de URLs para imagens da galeria. |
| `created_at` | `timestamptz` | Não Nulo, Padrão: `now()` | Timestamp de quando a build foi criada pela primeira vez. |

**Políticas de RLS:**
- Todos os usuários podem ver todas as builds.
- Usuários autenticados podem criar novas builds.
- Usuários só podem atualizar/deletar suas próprias builds.
- Admins podem atualizar/deletar qualquer build.

---

### 3. `build_versions` (versões da build)

Armazena o histórico de versões para cada build.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Chave Primária, Padrão: `gen_random_uuid()` | Identificador único para a versão. |
| `build_id` | `uuid` | Não Nulo, Chave Estrangeira para `builds.id` | A build à qual esta versão pertence. |
| `version` | `text` | Não Nulo | Número da versão (ex: '1.0', '1.1'). |
| `steam_code` | `text` | | Código de importação para a plataforma Steam. |
| `garena_code` | `text` | | Código de importação para a plataforma Garena. |
| `mobile_code` | `text` | | Código de importação para a plataforma Mobile. |
| `patch_notes` | `text` | | Notas descrevendo as mudanças nesta versão. |
| `status` | `text` | Não Nulo, Padrão: `'pending'` | Status da versão (`'active'`, `'pending'`, `'disabled'`). |
| `created_at` | `timestamptz` | Não Nulo, Padrão: `now()` | Timestamp de quando esta versão foi enviada. |

**Políticas de RLS:**
- Todos os usuários podem ver as versões de builds ativas.
- Usuários autenticados podem criar novas versões para suas próprias builds.
- Admins podem atualizar qualquer versão.

---

### 4. `tags`

Armazena todas as tags de estilo de jogo disponíveis.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `serial` | Chave Primária | Identificador único para a tag. |
| `name` | `text` | Único, Não Nulo | O nome da tag (ex: 'Agressivo'). |

---

### 5. `build_tags` (Tabela de Junção)

Liga as builds às suas tags.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `build_id` | `uuid` | Chave Primária, Chave Estrangeira para `builds.id` | |
| `tag_id` | `integer` | Chave Primária, Chave Estrangeira para `tags.id` | |

---

### 6. `comments` (comentários)

Armazena os comentários feitos nas builds.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Chave Primária, Padrão: `gen_random_uuid()` | Identificador único para o comentário. |
| `build_id` | `uuid` | Não Nulo, Chave Estrangeira para `builds.id` | A build onde o comentário foi feito. |
| `author_id` | `uuid` | Não Nulo, Chave Estrangeira para `users.id` | O usuário que escreveu o comentário. |
| `text` | `text` | Não Nulo | O conteúdo do comentário. |
| `created_at` | `timestamptz` | Não Nulo, Padrão: `now()` | Timestamp de quando o comentário foi postado. |

**Políticas de RLS:**
- Todos os usuários podem ler os comentários.
- Usuários autenticados podem criar comentários.
- Usuários podem atualizar/deletar seus próprios comentários.
- Admins podem deletar qualquer comentário.

---

### 7. `votes` (votos)

Armazena os votos positivos (upvotes) e negativos (downvotes) para as builds.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `build_id` | `uuid` | Chave Primária, Chave Estrangeira para `builds.id` | |
| `user_id` | `uuid` | Chave Primária, Chave Estrangeira para `users.id` | |
| `vote_type` | `integer` | Não Nulo, Verificação `(-1 ou 1)` | `1` para um upvote, `-1` para um downvote. |
| `created_at` | `timestamptz` | Não Nulo, Padrão: `now()` | |

**Políticas de RLS:**
- Usuários autenticados podem inserir/atualizar/deletar seus próprios votos.

---

### 8. `favorites` (favoritos)

Armazena quais usuários favoritaram quais builds.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `build_id` | `uuid` | Chave Primária, Chave Estrangeira para `builds.id` | |
| `user_id` | `uuid` | Chave Primária, Chave Estrangeira para `users.id` | |
| `created_at` | `timestamptz` | Não Nulo, Padrão: `now()` | |

**Políticas de RLS:**
- Usuários autenticados podem inserir/deletar seus próprios favoritos.

---

### 9. `reports` (denúncias)

Armazena denúncias de códigos de importação que não funcionam.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Chave Primária, Padrão: `gen_random_uuid()` | |
| `version_id` | `uuid` | Não Nulo, Chave Estrangeira para `build_versions.id` | A versão específica da build que está sendo denunciada. |
| `reporter_id` | `uuid` | Não Nulo, Chave Estrangeira para `users.id` | O usuário que enviou a denúncia. |
| `reason` | `text` | | Motivo opcional para a denúncia. |
| `status` | `text` | Não Nulo, Padrão: `'open'` | Status da denúncia (`'open'`, `'resolved_valid'`, `'resolved_invalid'`). |
| `created_at` | `timestamptz` | Não Nulo, Padrão: `now()` | |

**Políticas de RLS:**
- Usuários autenticados podem criar denúncias.
- Admins podem ler e atualizar denúncias.
