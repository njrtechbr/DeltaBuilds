# DeltaBuilds - Lógica e Funcionalidades

Este documento descreve a lógica de negócios principal e o conjunto de funcionalidades da aplicação DeltaBuilds.

## Funcionalidades Principais

- **Envio de Builds:** Usuários autenticados podem enviar novas builds de armas, incluindo nome, arma base, descrição, tags, códigos de importação para várias plataformas e mídias opcionais como vídeos do YouTube e galerias de imagens.
- **Versionamento de Builds:** Usuários podem enviar novas versões para suas builds existentes, incluindo notas de patch para descrever as mudanças.
- **Descoberta de Builds:** Todos os usuários podem navegar, pesquisar e filtrar uma lista de todas as builds ativas. A filtragem está disponível por nome da arma, estilo de jogo e plataformas de código disponíveis (Steam, Garena, Mobile).
- **Sistema de Votação:** Usuários autenticados podem votar positivamente ou negativamente nas builds para refletir sua qualidade e eficácia.
- **Comentários:** Usuários autenticados podem deixar comentários nas builds para discuti-las com a comunidade.
- **Autenticação de Usuário:** Registro e login de usuários, preparado para integração com Supabase Auth (e-mail/senha e provedores sociais).
- **Perfis de Usuário:** Perfis de usuário públicos exibem builds enviadas, builds favoritas, reputação, biografia e links para redes sociais.
- **Edição de Perfil:** Usuários autenticados podem editar suas próprias informações de perfil.
- **Validação de Build:** As builds são marcadas com um status (`Válida`, `Inválida`, `Pendente`) para dar aos usuários um indicador visual rápido de sua viabilidade. Builds `Pendentes` requerem aprovação de um administrador.
- **Sugestões de Tags com IA:** Ao criar uma build, os usuários podem obter sugestões de tags de estilo de jogo geradas por IA com base na descrição da build.
- **Análise de Código com IA:** O sistema tenta extrair automaticamente a arma base e o tipo de arma de um código de importação fornecido.
- **Tradução com IA:** Os usuários podem traduzir descrições de builds para seu próprio idioma com um clique.
- **Internacionalização (i18n):** A interface do usuário é traduzida para inglês, espanhol e português.
- **Painel de Administração:** Uma seção dedicada para administradores gerenciarem a plataforma.
  - **Dashboard:** Uma visão geral das principais estatísticas da plataforma.
  - **Gerenciamento de Builds:** Admins podem aprovar, desativar, editar ou deletar qualquer build.
  - **Gerenciamento de Usuários:** Admins podem gerenciar as funções dos usuários (admin/user) e o status (ativo/banido).
  - **Gerenciamento de Denúncias:** Admins podem revisar e agir sobre denúncias de códigos de importação que não funcionam.

## Lógica Principal

### Sistema de Reputação

O sistema de reputação é projetado para recompensar os usuários por contribuições positivas para a comunidade. Os pontos são calculados da seguinte forma:

- **+25 pontos** para cada nova build enviada.
  - *Justificativa: Incentiva a criação de novo conteúdo.*
- **+10 pontos** para cada voto positivo (upvote) recebido em uma build enviada.
  - *Justificativa: Recompensa a criação de conteúdo de alta qualidade e popular.*
- **-2 pontos** para cada voto negativo (downvote) recebido em uma build enviada.
  - *Justificativa: Desencoraja builds de baixa qualidade ou mal construídas.*
- **+1 ponto** por cada comentário postado em qualquer build.
  - *Justificativa: Incentiva a discussão e o engajamento da comunidade.*

A pontuação de reputação é exibida no perfil de um usuário e serve como uma medida de sua posição na comunidade.

### Fluxo de Status da Build

1.  Um usuário envia uma nova build. O status inicial da versão é definido como **`pending`** (pendente).
2.  Um administrador revisa a build pendente no painel de administração.
3.  O administrador pode **aprovar** a build, alterando seu status para **`active`** (ativa). A build agora aparece nas páginas de descoberta pública.
4.  O administrador pode **desativar** a build, alterando seu status para **`disabled`** (desativada). A build fica oculta da visualização pública. Isso é útil para builds que estão desatualizadas, quebradas ou que violam as regras.
5.  Usuários podem denunciar códigos de importação que não funcionam. Os administradores podem revisar essas denúncias e, se necessário, alterar o status de uma build para **`disabled`**.
