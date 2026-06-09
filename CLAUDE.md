# CLAUDE.md — OrbitaSafe

> Arquivo de contexto para o Claude Code. Leia integralmente antes de executar qualquer tarefa.

---

## 1. Visão geral do projeto

**OrbitaSafe** é uma plataforma de monitoramento climático inteligente para São Paulo,
desenvolvida como projeto acadêmico da **Global Solution 2026** da FIAP (turma 1TDSPR),
tema **Economia Espacial**.

A plataforma usa dois modelos de machine learning treinados com dados reais da CGE-SP
para classificar risco de alagamento (BAIXO / MÉDIO / ALTO) por subprefeitura e emitir
alertas em tempo real para usuários cadastrados.

---

## 2. Equipe

| Nome | RM | GitHub | LinkedIn |
|---|---|---|---|
| Guilherme Dabul | 559901 | https://github.com/guidabuul | https://www.linkedin.com/in/guilhermedabul/ |
| Diego Paulino | 566841 | https://github.com/DiegoCPaulino | https://www.linkedin.com/in/diego-paulino-9bb31b36a/ |
| Renan Lima | — | — | — |
| Ryan Mazali | 567168 | https://github.com/ryanmazali | https://linkedin.com/in/ryanmazali/ |

---

## 3. Repositório

- **Nome:** `orbitasafe`
- **Branch principal:** `main`
- **Mínimo de commits:** 15 totais, 5 por integrante
- **Commits com author:** usar `git commit --author="Nome <email>"` para atribuir corretamente

---

## 4. Stack do frontend (este repositório)

| Item | Tecnologia |
|---|---|
| Framework | React 19 + Vite + TypeScript |
| Estilização | Tailwind CSS v4 (100% inline no TSX — zero arquivos .css nos componentes) |
| Roteamento | react-router v7 |
| Ícones | lucide-react + react-icons (FaGithub, FaLinkedin) |
| HTTP | fetch nativo (Axios é **proibido** — zera a nota) |
| Auth | sessionStorage (sem JWT) |
| Deploy | Vercel |

---

## 5. Regras obrigatórias do professor (desviar pode zerar a nota)

1. **100% Tailwind no TSX** — nunca criar arquivos `.css` para componentes
2. **Breakpoints customizados** definidos no `@theme` do CSS:
   - `mobile: 480px`
   - `tablet: 768px`
   - `desktop: 1280px`
3. **Mobile first** — estilos base para mobile, `tablet:` e `desktop:` para telas maiores
4. **`lazy()` + `<Suspense>`** para todas as páginas no `App.tsx`
5. **`sessionStorage`** para persistir sessão do usuário (chave: `orbitasafe_usuario`)
6. **`useEffect`** setando `document.title` em cada página
7. **`fetch` nativo** — nunca Axios
8. **IDs gerados pelo front** com `Date.now()` (o backend usa PK manual)
9. **Dados estáticos** em arquivos `data.ts` separados por página (ex: `faqData.ts`)
10. **Animações** de transição (hambúrguer, modais) via `style` inline — Tailwind não garante transição em mudança de estado
11. **Barrel file** `src/components/index.ts` exportando todos os componentes
12. **Sem Bootstrap, Material UI, NextJS, Vue, Angular ou templates prontos**

---

## 6. Estrutura de pastas

```
src/
├── api/                        # Uma função por arquivo, nomeada pelo verbo HTTP
│   ├── postAuthCadastro.ts
│   ├── postAuthLogin.ts
│   ├── getSubprefeituras.ts
│   ├── getRegioesByUsuario.ts
│   ├── postRegiao.ts
│   ├── postAnalisarRegiao.ts
│   ├── getAlertasByRegiao.ts
│   ├── getNotificacoesByUsuario.ts
│   ├── putMarcarNotificacaoLida.ts
│   └── deleteRegiao.ts
├── assets/                     # Imagens importadas diretamente (não como string de path)
├── components/
│   ├── Badge/Badge.tsx
│   ├── Button/Button.tsx
│   ├── Card/Card.tsx
│   ├── FAQItem/FAQItem.tsx
│   ├── Footer/Footer.tsx
│   ├── Input/Input.tsx
│   ├── IntegranteCard/IntegranteCard.tsx
│   ├── Layouts/
│   │   ├── PublicLayout/PublicLayout.tsx   # Navbar + Footer institucional
│   │   └── AppLayout/AppLayout.tsx         # Layout da plataforma (sidebar/topbar)
│   ├── Logo/Logo.tsx
│   ├── Navbar/Navbar.tsx
│   ├── PrivateRoutes/PrivateRoutes.tsx
│   └── index.ts                            # Barrel file — exporta tudo
├── context/
│   └── AuthContext.tsx
├── pages/
│   ├── Home/Home.tsx
│   ├── Sobre/Sobre.tsx
│   ├── Integrantes/
│   │   ├── Integrantes.tsx
│   │   └── integrantesData.ts
│   ├── FAQ/
│   │   ├── FAQ.tsx
│   │   └── faqData.ts
│   ├── Auth/
│   │   ├── Login/Login.tsx
│   │   └── Cadastro/Cadastro.tsx
│   └── App/
│       ├── Dashboard/Dashboard.tsx
│       ├── Regioes/
│       │   ├── NovaRegiao/NovaRegiao.tsx
│       │   └── RegiaoDetalhe/RegiaoDetalhe.tsx   # rota dinâmica /:id
│       └── Alertas/Alertas.tsx
├── styles/
│   ├── variables.css           # CSS Variables + @theme (breakpoints, fontes, cores)
│   └── style.css               # @import variables.css + tailwindcss + reset global
├── types/
│   ├── user.types.ts
│   ├── regiao.types.ts
│   ├── alerta.types.ts
│   └── index.ts
└── utils/
    └── navItems.tsx
```

---

## 7. Identidade visual

| Item | Valor |
|---|---|
| Fundo principal | `hsla(222, 47%, 6%, 1)` — `var(--interface-darkest)` |
| Fundo card | `hsla(222, 40%, 10%, 1)` — `var(--interface-dark)` |
| Accent primário | `hsla(38, 92%, 50%, 1)` — `var(--brand-primary)` (âmbar/laranja) |
| Texto principal | `hsla(210, 40%, 98%, 1)` — `var(--text-darkest)` |
| Fonte títulos | Orbitron (Google Fonts) — `var(--font-display)` |
| Fonte corpo | Inter (Google Fonts) — `var(--font-body)` |
| Risco BAIXO | `var(--interface-success)` — verde |
| Risco MÉDIO | `var(--interface-warning)` — âmbar |
| Risco ALTO | `var(--interface-error)` — vermelho |
| Logo | ShieldCheck (lucide) + texto "Orbita**Safe**" (Safe em âmbar) |

---

## 8. Contrato da API (backend Java/Quarkus)

**URL base:** `import.meta.env.VITE_API_URL` (`.env`: `VITE_API_URL=http://localhost:8080`)

**CORS:** apenas `http://localhost:5173` liberado localmente.

### Endpoints principais

| Método | Path | O que faz |
|---|---|---|
| POST | `/auth/cadastro` | Cadastra usuário (retorna sem senha) |
| POST | `/auth/login` | Autentica, retorna `UsuarioResposta` |
| GET | `/usuarios/{id}/regioes` | Lista regiões de um usuário |
| POST | `/regioes` | Cadastra região **e dispara análise automática** |
| POST | `/regioes/{id}/analisar` | Dispara análise sob demanda (botão atualizar) |
| GET | `/regioes/{id}/alertas` | Histórico de alertas de uma região |
| GET | `/subprefeituras` | Lista as 32 subprefeituras (para o select) |
| GET | `/usuarios/{id}/notificacoes` | Todas as notificações do usuário |
| GET | `/usuarios/{id}/notificacoes/nao-lidas` | Só não lidas (badge contador) |
| PUT | `/notificacoes/{id}/marcar-lida` | Marca notificação como lida |
| DELETE | `/regioes/{id}` | Remove região |

### Regras críticas do backend

- **PK manual:** o front gera o `id` com `Date.now()` e envia no body do POST
- **Sem JWT:** após login, salvar o objeto do usuário no `sessionStorage`
- **POST /regioes** já dispara análise — buscar `/regioes/{id}/alertas` em seguida
- **Notificação só para MEDIO/ALTO** — BAIXO gera alerta no histórico mas não notifica
- **Erro padrão:** `{ "erro": "mensagem" }` — sempre checar `resp.ok` e ler `body.erro`
- **Datas:** string ISO `"YYYY-MM-DD"` — gerar com `new Date().toISOString().split("T")[0]`

### Tipos TypeScript (contracts)

```ts
// Autenticação
interface UsuarioResposta { idUsu: number; nmUsu: string; emailUsu: string; tpUsu: string; dtCadastro: string; }
interface LoginPayload { emailUsu: string; senhaUsu: string; }

// Região
interface Regiao { idReg: number; nmReg: string; dtCadastro?: string; fkUsuarioIdUsu: number; fkSubprefeituraIdSubpref: number; }
interface CriarRegiaoPayload { idReg: number; nmReg: string; fkUsuarioIdUsu: number; fkSubprefeituraIdSubpref: number; dtCadastro?: string; }

// Subprefeitura
interface Subprefeitura { idSubpref: number; cdSubpref: number; nmSubpref: string; latitudeSubpref: number; longitudeSubpref: number; qtAlagamento: number; }

// Alertas e Notificações
type NivelAlerta = "BAIXO" | "MEDIO" | "ALTO";
type EstadoNotif = "LIDA" | "NAO_LIDA";
interface Alerta { idAlerta: number; nivelAlerta: NivelAlerta; tpEvento: string; dsAlerta: string; dtAlerta: string; fkRegiaoIdReg: number; fkLeituraIdLeitura: number; }
interface Notificacao { idNotif: number; dsNotif: string; dtNotif: string; estadoNotif: EstadoNotif; fkUsuarioIdUsu: number; fkAlertaIdAlerta: number; }
interface ErroApi { erro: string; }
```

---

## 9. AuthContext

Salva o usuário no `sessionStorage` com a chave `orbitasafe_usuario`.

```ts
// Estrutura do context
type AuthContextType = {
  usuario: UsuarioResposta | null;
  autenticado: boolean;
  login: (usuario: UsuarioResposta) => void;
  logout: () => void;
}
```

O `PrivateRoutes` lê o `sessionStorage` diretamente — se não tiver usuário, redireciona para `/login`.

---

## 10. Roteamento (App.tsx)

```
/ → Home (PublicLayout)
/sobre → Sobre (PublicLayout)
/integrantes → Integrantes (PublicLayout)
/faq → FAQ (PublicLayout)
/login → Login (sem layout)
/cadastro → Cadastro (sem layout)
/app → PrivateRoutes → AppLayout
  /app → Dashboard (index)
  /app/regioes/nova → NovaRegiao
  /app/regioes/:id → RegiaoDetalhe (rota dinâmica)
  /app/alertas → Alertas
```

---

## 11. O que já está pronto

- ✅ Toda a estrutura base (styles, types, App.tsx, roteamento público)
- ✅ Componentes: Badge, Button, Card, FAQItem, Footer, Input, IntegranteCard, Logo, Navbar
- ✅ Layouts: PublicLayout (Navbar hambúrguer + Footer)
- ✅ Páginas institucionais: Home, Sobre, Integrantes, FAQ
- ✅ Arquivos de API: todos os 10 arquivos em `src/api/`
- ✅ Types: user.types.ts, regiao.types.ts, alerta.types.ts

## 12. O que falta implementar

- ⬜ `AuthContext` + `PrivateRoutes`
- ⬜ `AppLayout` (layout da plataforma autenticada)
- ⬜ Página: Login
- ⬜ Página: Cadastro
- ⬜ Página: Dashboard
- ⬜ Página: NovaRegiao
- ⬜ Página: RegiaoDetalhe (rota dinâmica `/:id`)
- ⬜ Página: Alertas
- ⬜ Atualizar `App.tsx` com rotas privadas
- ⬜ README.md completo
- ⬜ Deploy na Vercel

---

## 13. Padrão de commits

Cada integrante precisa de **mínimo 5 commits significativos**.

```bash
# Commit com author específico
git commit --author="Ryan Mazali <email@email.com>" -m "feat: descrição da tarefa"
```

Prefixos de commit:
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `style:` ajuste visual sem lógica
- `refactor:` refatoração
- `docs:` documentação (README, CLAUDE.md)
- `chore:` configuração, dependências

---

## 14. Checklist de entrega (disciplina Front-End)

- [ ] Rotas estáticas e dinâmicas com passagem de parâmetro (`/app/regioes/:id`)
- [ ] TypeScript com tipos específicos, interfaces, Union Types
- [ ] Responsividade completa mobile/tablet/desktop com Tailwind
- [ ] Deploy funcional na Vercel
- [ ] Integração com API Java (GET, POST, PUT, DELETE, tratamento de erros)
- [ ] GitHub com mínimo 15 commits totais e 5 por integrante
- [ ] README.md completo
- [ ] Vídeo no YouTube (máx. 3 min)
- [ ] Páginas obrigatórias: Home, Integrantes, Sobre, FAQ + mínimo 2 da solução
