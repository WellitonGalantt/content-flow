# 📹 ContentFlow

ContentFlow é um sistema backend desenvolvido como um desafio pessoal de backend. O objetivo é ajudar criadores de conteúdo a gerar e organizar ideias de roteiros para vídeos com o auxílio de uma IA baseada em LLM, salvando e gerenciando os dados em um banco de dados relacional.

---

![License](https://img.shields.io/badge/license-MIT-blue)
![Last Commit](https://img.shields.io/github/last-commit/WellitonGalantt/ContentFlow)

---

## 🚀 Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Knex.js
- PostgreSQL
- Yup (validação de schemas)
- JWT (autenticação)
- OpenRouter (DeepSeek V3 LLM)
- ts-node (execução TS com ESModules)

---

## 📁 Estrutura de Pastas

```
src/
├── agents/             # Agentes de IA (LLM)
├── controllers/        # Lógica das rotas
├── database/           # Migrations e config do Knex
├── middlewares/        # Middlewares de validação, autenticação etc.
├── models/             # Models de acesso ao banco
├── routes/             # Rotas da API
├── services/           # Regras de negócio / integrações
├── shared/             # Tipagens e dados compartilhados
├── utils/              # Utilitários gerais
└── server.ts           # Arquivo principal
```

---

## 📦 Instalação

### 1. Pré-requisitos

- Node.js 18+
- PostgreSQL
- Conta no [OpenRouter](https://openrouter.ai) e chave da DeepSeek API

### 2. Clone o repositório

```bash
git clone https://github.com/WellitonGalantt/ContentFlow.git
cd ContentFlow
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o `.env`

Crie um arquivo `.env` na raiz com as seguintes variáveis:

```env
PORT=3333
DB_NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_DBNAME=seu_banco
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
SECRET=sua_chave_jwt
DEEPSEEK_API_KEY=sua_api_key_openrouter
```

### 5. Ajuste o `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "rootDir": "./src",
    "moduleResolution": "node",
    "typeRoots": ["./node_modules/@types", "./types"],
    "resolveJsonModule": true,
    "outDir": "./build",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "ts-node": {
    "esm": true,
    "experimentalSpecifierResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["./build", "./node_modules", "./tests", "./jest.config.ts"]
}

```

### 6. Rode as migrations

```bash
node --loader ts-node/esm ./node_modules/knex/bin/cli.js migrate:latest --knexfile ./src/database/knex/knexfile.ts
```

### 7. Inicie o servidor

```bash
npm run dev
```

---

## 🔐 Rotas da API

### 🧑‍💻 Autenticação

| Método | Rota               | Descrição                 |
|--------|--------------------|---------------------------|
| POST   | `/register`        | Criar usuário             |
| POST   | `/login`           | Login e gerar token       |
| GET    | `/user/:id`        | Buscar usuário por ID     |
| DELETE | `/delete/:id`      | Deletar usuário           |

---

### 📁 Projetos

| Método | Rota                 | Descrição                   |
|--------|----------------------|-----------------------------|
| POST   | `/project`           | Criar um novo projeto       |
| GET    | `/project`           | Listar todos os projetos    |
| GET    | `/project/:id`       | Obter um projeto específico |
| PUT    | `/project/:id`       | Atualizar um projeto        |
| DELETE | `/project/:id`       | Deletar um projeto          |

---

### 🏷️ Tags

| Método | Rota                     | Descrição                  |
|--------|--------------------------|----------------------------|
| POST   | `/project-tag`           | Criar uma tag              |
| GET    | `/project-tags`          | Listar todas as tags       |
| GET    | `/project-tag/:id`       | Obter tag por ID           |
| DELETE | `/project-tag/:id`       | Deletar uma tag            |

---

## 🤖 Integração com IA

A aplicação utiliza o modelo **DeepSeek V3 (0324)** via [OpenRouter](https://openrouter.ai/) para auxiliar na criação de ideias e roteiros baseados em prompts inteligentes. A API Key deve ser inserida no `.env`.

---

## 🧪 Testes e Validações

- Todas as rotas protegidas utilizam JWT.
- Os dados são validados com Yup antes de qualquer operação.
- Integração com o Knex para queries seguras e performáticas.

---

## 📜 Licença

Este projeto está licenciado sob a Licença MIT.  
Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 👤 Autor

Desenvolvido por [Welliton Galantt](https://github.com/WellitonGalantt)