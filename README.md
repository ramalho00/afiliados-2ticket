# Área do afiliado · 2TICKET (protótipo)

Protótipo navegável da área do afiliado (`afiliados.2ticket.pt`), com a identidade do design system 2TICKET.
Stack igual à do frontend 2TICKET: **React + Vite + Tailwind CSS v4**.

## Correr

```bash
npm install
npm run dev
```

Abre em http://localhost:5180/login

## Ecrãs

| Rota | Ecrã |
|---|---|
| `/login` | Entrar com o utilizador e a palavra-passe dados pela organização |
| `/primeiro-acesso` | Trocar a palavra-passe temporária |
| `/` | Início: link geral, totais, bilhetes por dia, por evento, últimas vendas |
| `/eventos` | Eventos onde o link conta, com mensagem pronta a partilhar |
| `/vendas` | Lista de encomendas com filtros e paginação |
| `/conta` | Dados, palavra-passe e avisos por email |

## Notas

- Dados de exemplo em `src/data/mock.js` (substituir pela API).
- Tokens de cor/tipo em `src/index.css` (`@theme`). Só hex: a paleta oklch do Tailwind está desligada por causa da WebView dos Sunmi D3 mini.
- Logótipo: coloca `public/logo-2ticket.svg` (azul) e `public/logo-2ticket-branco.svg`. Sem os ficheiros, aparece o wordmark em texto.
- O formato do link geral (`2ticket.pt/r/<utilizador>`) é provisório.
