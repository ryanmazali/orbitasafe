# OrbitaSafe 🛰️

Plataforma de monitoramento climático inteligente para São Paulo, desenvolvida como projeto acadêmico da **Global Solution 2026** da FIAP — tema **Economia Espacial**.

---

## 📋 Sobre o Projeto

O OrbitaSafe usa inteligência artificial e dados satelitais para monitorar riscos de alagamento nas 32 subprefeituras de São Paulo, emitindo alertas em tempo real para usuários cadastrados.

### Funcionalidades
- 🗺️ **Explorar** — consulte o risco de qualquer subprefeitura sem precisar cadastrar
- 📍 **Monitoramento** — cadastre regiões e acompanhe o risco em tempo real
- 🔔 **Alertas** — receba notificações para riscos MÉDIO e ALTO
- 📊 **Dashboard** — visualize todas as suas regiões com badges de risco (BAIXO/MÉDIO/ALTO)
- 🤖 **IA Preditiva** — dois modelos de machine learning treinados com dados reais da CGE-SP

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/ryanmazali/orbitasafe.git
cd orbitasafe

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com a URL da API

# Execute em desenvolvimento
npm run dev
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL=https://api-orbitasafe.onrender.com
```

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19 | Framework frontend |
| TypeScript | 5 | Tipagem estática |
| Vite | 6 | Build tool |
| Tailwind CSS | 4 | Estilização |
| React Router | 7 | Roteamento |
| Lucide React | — | Ícones |
| React Icons | — | Ícones sociais |

---

## 📁 Estrutura do Projeto

```
src/
├── api/          # Funções de integração com a API
├── assets/       # Imagens e recursos estáticos
├── components/   # Componentes reutilizáveis
├── context/      # AuthContext (sessão do usuário)
├── pages/        # Páginas da aplicação
│   ├── Home/
│   ├── Sobre/
│   ├── Integrantes/
│   ├── FAQ/
│   ├── Auth/     # Login e Cadastro
│   └── App/      # Dashboard, Explorar, Regiões, Alertas
├── styles/       # Variáveis CSS e tema global
├── types/        # Tipos TypeScript
└── utils/        # Utilitários
```

---

## 🔗 Links

- **Deploy (Frontend):** https://orbitasafe.vercel.app
- **API (Backend):** https://api-orbitasafe.onrender.com
- **Repositório Frontend:** https://github.com/ryanmazali/orbitasafe
- **Repositório Backend:** https://github.com/DiegoCPaulino/API-OrbitaSafe
- **Vídeo de Apresentação:** (a ser adicionado após gravação)

---

## 🖼️ Telas do Projeto

| Landing Page | Dashboard | Explorar |
|---|---|---|
| ![Home](./docs/home.png) | ![Dashboard](./docs/dashboard.png) | ![Explorar](./docs/explorar.png) |

| Login | Nova Região | Alertas |
|---|---|---|
| ![Login](./docs/login.png) | ![Nova Região](./docs/nova-regiao.png) | ![Alertas](./docs/alertas.png) |

> Prints das telas em dispositivo mobile (390px)

---

## 👥 Equipe — 1TDSPR

| Nome | RM | Turma | GitHub | LinkedIn |
|---|---|---|---|---|
| Guilherme Dabul | 559901 | 1TDSPR | [@guidabuul](https://github.com/guidabuul) | [LinkedIn](https://www.linkedin.com/in/guilhermedabul/) |
| Diego Paulino | 566841 | 1TDSPR | [@DiegoCPaulino](https://github.com/DiegoCPaulino) | [LinkedIn](https://www.linkedin.com/in/diego-paulino-9bb31b36a/) |
| Renan Lima | — | 1TDSPR | — | — |
| Ryan Mazali | 567168 | 1TDSPR | [@ryanmazali](https://github.com/ryanmazali) | [LinkedIn](https://linkedin.com/in/ryanmazali/) |

---

## 📐 Padrões do Projeto

- **Mobile First** — breakpoints: 480px (mobile), 768px (tablet), 1280px (desktop)
- **Dark Mode** — paleta azul escuro + âmbar
- **Sem bibliotecas de UI** — 100% Tailwind CSS customizado
- **Fetch nativo** — sem Axios
- **Autenticação** — sessionStorage (sem JWT)

---

## 📬 Contato

Dúvidas ou sugestões sobre o projeto? Entre em contato com a equipe:

- **Ryan Mazali** — [LinkedIn](https://linkedin.com/in/ryanmazali/) · [@ryanmazali](https://github.com/ryanmazali)
- **Diego Paulino** — [LinkedIn](https://www.linkedin.com/in/diego-paulino-9bb31b36a/) · [@DiegoCPaulino](https://github.com/DiegoCPaulino)
- **Guilherme Dabul** — [LinkedIn](https://www.linkedin.com/in/guilhermedabul/) · [@guidabuul](https://github.com/guidabuul)

---

## 📄 Licença

Projeto acadêmico — FIAP Global Solution 2026/1.

---

*OrbitaSafe · Orbit Analytics · FIAP · 1TDSPR · 2026*
