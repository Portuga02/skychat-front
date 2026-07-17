# SkyChat Web — Páginas iniciais

Três telas do SkyChat como **componentes standalone do Angular 17+**, prontas pra colar no seu projeto Ionic existente: Login, Lista de Conversas e Chat.

## Como integrar no seu projeto

1. Copie a pasta `src/app/pages/` pra dentro do seu projeto Ionic (`ionic start SkyChat blank --type=angular`, se ainda não tiver criado).
2. Copie o conteúdo de `src/theme/variables.scss` pro `src/theme/variables.scss` do seu projeto (ou mescle com o que já existir).
3. Adicione as rotas de `src/app/app.routes.ts` no seu arquivo de rotas principal.
4. No `main.ts`, garanta que os ícones do Ionicons usados aqui estejam registrados (ou use `addIcons()` do `ionicons`, dependendo da versão do Ionic que você está usando).

## O que está pronto

- **Login** — formulário com e-mail/senha, botão de convidado, visual com o "moon badge" da marca
- **Conversas** — lista com avatar, status online, badge de não lidas, busca, tab bar inferior
- **Chat** — bolhas de mensagem, indicador de lida (double-check), composer com botão de enviar/microfone dinâmico

## O que está propositalmente como mock

Marquei com `// TODO` nos `.ts` os pontos exatos onde entra a integração real:
- `login.page.ts` → chamada ao endpoint de autenticação (Spring Security + JWT)
- `conversations.page.ts` → lista real de conversas via WebSocket/STOMP + REST
- `chat.page.ts` → histórico de mensagens (REST) e stream de mensagens ao vivo (STOMP)

Não implementei a camada de rede de propósito — isso depende de como você já estruturou os DTOs e endpoints no backend, e não quis assumir um contrato de API que não vi.

## Próximas telas sugeridas (não incluídas ainda)

- Chamada de vídeo (WebRTC) — a mais complexa, envolve sinalização
- Tela de contatos
- Configurações / tema claro-escuro
