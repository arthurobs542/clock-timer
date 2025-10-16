# 📋 Página de Perfil - Clock Timer System

## 🎯 Visão Geral

A página de perfil é uma interface completa que permite aos usuários gerenciar suas informações pessoais, visualizar estatísticas de trabalho e configurar preferências de conta.

## ✨ Funcionalidades Implementadas

### 🔧 **Gerenciamento de Perfil**

- **Visualização de informações**: Nome, email, telefone, ID do funcionário
- **Edição inline**: Modo de edição com validação em tempo real
- **Avatar personalizado**: Suporte a URLs de imagem para avatar
- **Status da conta**: Indicador visual do status ativo/inativo
- **Cargo do usuário**: Badge com role (USER, ADMIN, MANAGER)

### 📊 **Estatísticas de Trabalho**

- **Total de horas trabalhadas**: Soma de todas as horas registradas
- **Total de dias trabalhados**: Contagem de dias com registros
- **Média diária**: Cálculo automático de horas por dia
- **Horas da semana atual**: Total de horas da semana corrente
- **Horas do mês atual**: Total de horas do mês corrente

### 🔐 **Segurança**

- **Alteração de senha**: Modal para alterar senha com validação
- **Sessão segura**: Integração com JWT para autenticação
- **Validação de dados**: Validação client-side e server-side

### 🎨 **Interface Moderna**

- **Design responsivo**: Funciona em desktop, tablet e mobile
- **Tabs organizadas**: Perfil, Segurança e Preferências
- **Loading states**: Indicadores de carregamento
- **Toast notifications**: Feedback visual para ações
- **Avatar com fallback**: Iniciais do nome quando não há foto

## 📁 **Estrutura de Arquivos**

```
src/app/profile/
├── page.tsx                 # Página principal do perfil

src/hooks/
├── use-toast.ts            # Hook para gerenciar notificações

src/components/ui/
├── separator.tsx           # Componente de separador
├── toast.tsx               # Componente de toast
└── toaster.tsx             # Gerenciador global de toasts
```

## 🚀 **Como Usar**

### 1. **Acessar a Página**

- Clique no avatar no header
- Selecione "Perfil" no dropdown menu
- Ou navegue diretamente para `/profile`

### 2. **Editar Informações**

- Clique no botão "Editar" na seção de informações pessoais
- Modifique os campos desejados
- Clique em "Salvar" para confirmar ou "Cancelar" para descartar

### 3. **Alterar Senha**

- Vá para a aba "Segurança"
- Clique em "Alterar Senha"
- Preencha os campos no modal
- Confirme a alteração

### 4. **Visualizar Estatísticas**

- As estatísticas são exibidas automaticamente na sidebar
- Atualizadas em tempo real conforme novos registros de ponto

## 🔗 **Integração com API**

### **Endpoints Utilizados**

```typescript
// Buscar perfil do usuário
GET / api / users / profile;
Headers: Authorization: Bearer<token>;

// Atualizar perfil
PUT / api / users / profile;
Headers: Authorization: Bearer<token>;
Body: {
  name, email, phone, avatar;
}

// Buscar estatísticas
GET / api / clock / stats;
Headers: Authorization: Bearer<token>;
```

### **Estrutura de Dados**

```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  avatar?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ClockStats {
  totalHours: number;
  totalDays: number;
  averageHoursPerDay: number;
  currentWeekHours: number;
  currentMonthHours: number;
}
```

## 🎨 **Componentes UI Utilizados**

- **Card**: Containers para seções
- **Avatar**: Exibição de foto do usuário
- **Badge**: Indicador de cargo/role
- **Button**: Ações de editar/salvar/cancelar
- **Input**: Campos de formulário
- **Label**: Rótulos dos campos
- **Tabs**: Navegação entre seções
- **Dialog**: Modal para alterar senha
- **Toast**: Notificações de feedback
- **Separator**: Divisores visuais

## 🔧 **Estados da Aplicação**

### **Loading States**

- Carregamento inicial do perfil
- Salvamento de alterações
- Busca de estatísticas

### **Error Handling**

- Falha na conexão com API
- Validação de dados
- Token expirado/inválido

### **Success Feedback**

- Perfil atualizado com sucesso
- Senha alterada com sucesso
- Operações concluídas

## 📱 **Responsividade**

### **Desktop (1024px+)**

- Layout em 3 colunas
- Sidebar com estatísticas
- Área principal com tabs

### **Tablet (768px - 1023px)**

- Layout em 2 colunas
- Sidebar reorganizada
- Tabs mantidas

### **Mobile (< 768px)**

- Layout em coluna única
- Sidebar no topo
- Tabs empilhadas

## 🛡️ **Segurança**

- **Autenticação**: Verificação de token JWT
- **Autorização**: Apenas dados do próprio usuário
- **Validação**: Sanitização de inputs
- **HTTPS**: Comunicação segura com API

## 🚀 **Próximas Funcionalidades**

- [ ] Upload de avatar via arquivo
- [ ] Preferências de notificação
- [ ] Histórico de alterações
- [ ] Exportar dados pessoais
- [ ] Configurações de privacidade
- [ ] Integração com 2FA

## 🐛 **Troubleshooting**

### **Erro de Token**

- Verificar se o token está salvo no localStorage
- Fazer logout e login novamente

### **Dados não carregam**

- Verificar conexão com API
- Verificar se o backend está rodando

### **Avatar não aparece**

- Verificar se a URL é válida
- Verificar se a imagem é acessível publicamente

A página de perfil está totalmente funcional e integrada com o backend, proporcionando uma experiência completa de gerenciamento de conta para os usuários do sistema.
