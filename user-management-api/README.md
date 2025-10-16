# User Management API

API backend para o sistema de controle de ponto com autenticação e gerenciamento de usuários.

## 🚀 Tecnologias

- **Node.js** + **Express.js**
- **TypeScript**
- **Prisma** + **PostgreSQL**
- **JWT** para autenticação
- **Zod** para validação
- **bcryptjs** para hash de senhas

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- npm ou yarn

## 🛠️ Instalação

1. **Instalar dependências:**

```bash
npm install
```

2. **Configurar variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/clock_timer_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Server
NODE_ENV="development"
PORT="3001"

# Security
BCRYPT_ROUNDS="10"

# CORS
CORS_ORIGIN="http://localhost:3000"
```

3. **Configurar banco de dados:**

```bash
# Gerar cliente Prisma
npm run generate

# Executar migrações
npm run migrate
```

## 🏃‍♂️ Executando

### Desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm run build
npm start
```

## 📚 Endpoints da API

### Autenticação

- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login

### Usuários

- `GET /api/users/profile` - Obter perfil do usuário logado
- `PUT /api/users/profile` - Atualizar perfil do usuário logado
- `GET /api/users` - Listar usuários (Admin/Manager)
- `GET /api/users/:id` - Obter usuário por ID (Admin/Manager)
- `PUT /api/users/:id` - Atualizar usuário (Admin)
- `DELETE /api/users/:id` - Deletar usuário (Admin)
- `PATCH /api/users/:id/deactivate` - Desativar usuário (Admin)

### Sistema de Ponto

- `POST /api/clock/clock-in` - Registrar entrada
- `POST /api/clock/clock-out` - Registrar saída
- `POST /api/clock/break/start` - Iniciar pausa
- `POST /api/clock/break/end` - Finalizar pausa
- `GET /api/clock/status` - Status atual do ponto
- `GET /api/clock/records` - Histórico de registros
- `GET /api/clock/stats` - Estatísticas de horas trabalhadas
- `GET /api/clock/admin/records` - Todos os registros (Admin/Manager)

### Health Check

- `GET /health` - Status da API

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Inclua o token no header:

```
Authorization: Bearer <token>
```

## 📊 Modelos de Dados

### User

- `id`: UUID (chave primária)
- `name`: Nome completo
- `email`: Email único
- `phone`: Telefone
- `employeeId`: ID do funcionário único
- `password`: Senha hasheada
- `avatar`: URL do avatar (opcional)
- `role`: USER | ADMIN | MANAGER
- `isActive`: Status ativo/inativo

### ClockRecord

- `id`: UUID (chave primária)
- `userId`: ID do usuário
- `clockIn`: Horário de entrada
- `clockOut`: Horário de saída
- `breakStart`: Início da pausa
- `breakEnd`: Fim da pausa
- `totalHours`: Total de horas trabalhadas
- `date`: Data do registro
- `notes`: Observações
- `status`: ACTIVE | COMPLETED | CANCELLED

## 🛡️ Segurança

- Senhas hasheadas com bcrypt
- Rate limiting (100 requests/15min)
- CORS configurado
- Helmet para headers de segurança
- Validação com Zod
- Autenticação JWT

## 📝 Scripts Disponíveis

- `npm run dev` - Executar em modo desenvolvimento
- `npm run build` - Compilar TypeScript
- `npm start` - Executar versão compilada
- `npm run migrate` - Executar migrações do banco
- `npm run generate` - Gerar cliente Prisma
- `npm run db:push` - Sincronizar schema com banco
- `npm run db:studio` - Abrir Prisma Studio

## 🔧 Desenvolvimento

### Estrutura do Projeto

```
src/
├── config/          # Configurações (DB, env)
├── controllers/     # Controllers das rotas
├── middleware/      # Middlewares (auth, validation)
├── routes/          # Definição das rotas
├── schemas/         # Schemas de validação Zod
├── services/        # Lógica de negócio
├── types/           # Tipos TypeScript
├── utils/           # Utilitários (JWT, password)
└── app.ts           # Arquivo principal
```

### Adicionando Novas Funcionalidades

1. Defina o schema no Prisma
2. Execute a migração: `npm run migrate`
3. Crie o serviço em `services/`
4. Crie o controller em `controllers/`
5. Defina as rotas em `routes/`
6. Adicione validações em `schemas/`
