# Estratégia de Branches e Commits

## Estrutura de Branches

### Branches Principais
- **`main`** - Branch de produção, sempre estável
- **`develop`** - Branch de desenvolvimento, integração de features

### Branches de Feature
- **`feature/nome-da-feature`** - Novas funcionalidades
  - `feature/admin-dashboard` - Dashboard do administrador
  - `feature/schedule-management` - Gerenciamento de escalas
  - `feature/reports-system` - Sistema de relatórios
  - `feature/backend-integration` - Integração com backend
  - `feature/authentication-backend` - Autenticação com backend

### Branches de Hotfix
- **`hotfix/nome-do-fix`** - Correções urgentes em produção
  - `hotfix/urgent-fixes` - Correções críticas

### Branches de Style
- **`style/nome-da-melhoria`** - Melhorias de UI/UX
  - `style/ui-improvements` - Melhorias na interface

### Branches de Refactor
- **`refactor/nome-da-refatoracao`** - Refatoração de código
  - `refactor/code-optimization` - Otimização de código

### Branches de Documentação
- **`docs/nome-da-documentacao`** - Documentação
  - `docs/documentation` - Documentação do projeto

### Branches de Teste
- **`test/nome-do-teste`** - Testes
  - `test/unit-tests` - Testes unitários

## Convenções de Commits

### Formato
```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos de Commit
- **`feat`** - Nova funcionalidade
- **`fix`** - Correção de bug
- **`style`** - Mudanças de formatação, espaços, etc.
- **`refactor`** - Refatoração de código
- **`perf`** - Melhoria de performance
- **`test`** - Adição ou correção de testes
- **`docs`** - Mudanças na documentação
- **`chore`** - Mudanças em ferramentas, configurações, etc.
- **`ci`** - Mudanças em CI/CD
- **`build`** - Mudanças no sistema de build

### Escopos (opcional)
- `auth` - Autenticação
- `clock` - Sistema de ponto
- `admin` - Dashboard administrativo
- `ui` - Interface do usuário
- `api` - API/Backend
- `db` - Banco de dados
- `config` - Configurações

### Exemplos de Commits

#### Feature
```bash
feat(clock): adiciona rastreamento GPS no clock in/out
feat(admin): implementa dashboard de estatísticas
feat(auth): adiciona validação de email no cadastro
```

#### Fix
```bash
fix(clock): corrige cálculo de horas trabalhadas
fix(ui): corrige layout responsivo no mobile
fix(auth): corrige validação de senha
```

#### Style
```bash
style(ui): melhora espaçamento dos cards
style(clock): ajusta cores dos botões de status
style(admin): melhora tipografia das tabelas
```

#### Refactor
```bash
refactor(clock): extrai lógica de cálculo para utils
refactor(auth): simplifica validação de formulários
refactor(api): melhora estrutura das rotas
```

#### Docs
```bash
docs: adiciona guia de instalação
docs(api): documenta endpoints de autenticação
docs(clock): adiciona exemplos de uso
```

#### Test
```bash
test(clock): adiciona testes para ClockInOutButton
test(auth): adiciona testes para validação
test(utils): adiciona testes para formatação de data
```

## Fluxo de Trabalho

### 1. Desenvolvimento de Feature
```bash
# Criar branch a partir de develop
git checkout develop
git pull origin develop
git checkout -b feature/nova-funcionalidade

# Fazer commits pequenos e frequentes
git add .
git commit -m "feat(scope): descrição curta"

# Push da branch
git push origin feature/nova-funcionalidade

# Merge para develop após review
git checkout develop
git merge feature/nova-funcionalidade
```

### 2. Hotfix Urgente
```bash
# Criar branch a partir de main
git checkout main
git pull origin main
git checkout -b hotfix/correcao-urgente

# Fazer correção
git add .
git commit -m "fix(scope): descrição da correção"

# Merge para main e develop
git checkout main
git merge hotfix/correcao-urgente
git checkout develop
git merge hotfix/correcao-urgente
```

### 3. Release
```bash
# Criar branch de release
git checkout develop
git checkout -b release/v1.0.0

# Fazer ajustes finais
git commit -m "chore: prepara release v1.0.0"

# Merge para main
git checkout main
git merge release/v1.0.0
git tag v1.0.0

# Merge para develop
git checkout develop
git merge release/v1.0.0
```

## Regras Importantes

1. **Commits pequenos e frequentes** - Um commit por mudança lógica
2. **Mensagens claras** - Descreva o que foi feito, não como
3. **Sempre testar** - Antes de fazer commit, testar localmente
4. **Review obrigatório** - Pull requests para merge em develop/main
5. **Nunca commitar diretamente** - Sempre usar branches de feature
6. **Manter main estável** - Apenas código testado e aprovado
7. **Documentar mudanças** - Atualizar README quando necessário

## Comandos Úteis

```bash
# Ver branches
git branch -a

# Mudar de branch
git checkout nome-da-branch

# Criar e mudar para nova branch
git checkout -b feature/nova-feature

# Ver status
git status

# Ver histórico
git log --oneline

# Ver diferenças
git diff

# Stash (guardar mudanças temporariamente)
git stash
git stash pop

# Rebase (reorganizar commits)
git rebase -i HEAD~3
```
