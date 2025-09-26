# Clock Timer

Sistema de controle de ponto para micro empresas com dashboard para funcionários e administradores.

## 📋 Descrição

O Clock Timer é uma aplicação web moderna desenvolvida em Next.js que permite o controle eficiente de ponto de funcionários em micro empresas. O sistema oferece duas interfaces principais: uma para funcionários realizarem o clock in/out e visualizarem seus horários, e outra para administradores gerenciarem escalas e visualizarem relatórios.

## ✨ Funcionalidades

### Dashboard do Funcionário

- ✅ Realizar clock in/out
- ✅ Visualizar horários de trabalho do dia
- ✅ Histórico de sessões recentes
- ✅ Estatísticas mensais
- ✅ Interface responsiva para mobile

### Dashboard do Administrador

- ✅ Visualizar estatísticas gerais
- ✅ Gerenciar escalas de trabalho
- ✅ Atribuir escalas aos funcionários
- ✅ Relatórios individuais por funcionário
- ✅ Exportação de relatórios
- ✅ Controle de atividades recentes

### Sistema de Clock

- ✅ Registro de entrada e saída
- ✅ Controle de pausas
- ✅ Geolocalização (opcional)
- ✅ Histórico completo de registros

### Gerenciamento de Escalas

- ✅ Criar e editar escalas
- ✅ Configurar dias de trabalho
- ✅ Definir horários e pausas
- ✅ Atribuir escalas aos funcionários

### Relatórios

- ✅ Relatórios diários
- ✅ Relatórios mensais
- ✅ Estatísticas por funcionário
- ✅ Exportação em PDF, Excel e CSV

## 🚀 Tecnologias

- **Framework**: Next.js 15.5.4
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS
- **Componentes**: shadcn/ui
- **Gerenciador de Pacotes**: npm

## 📱 Design

- **Tema**: Neutral (shadcn/ui)
- **Responsivo**: Suporte completo para mobile, tablet e desktop
- **Acessibilidade**: Componentes acessíveis seguindo padrões WCAG
- **UX**: Interface intuitiva e moderna

## 🏗️ Estrutura do Projeto

```
src/
├── app/                 # Páginas da aplicação (App Router)
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── employee/       # Componentes do dashboard do funcionário
│   ├── admin/          # Componentes do dashboard do admin
│   └── common/         # Componentes compartilhados
├── lib/                # Utilitários e configurações
├── types/              # Definições TypeScript
└── hooks/              # Custom hooks
```

## 🎯 Status do Projeto

### ✅ Concluído

- [x] Configuração inicial do projeto
- [x] Instalação e configuração do shadcn/ui
- [x] Criação das interfaces TypeScript
- [x] Constantes e utilitários do sistema

### 🔄 Em Progresso

- [ ] Layout base responsivo
- [ ] Sistema de autenticação
- [ ] Dashboard do funcionário
- [ ] Dashboard do administrador

### 📋 Próximos Passos

- [ ] Sistema de clock in/out
- [ ] Gerenciamento de escalas
- [ ] Sistema de relatórios
- [ ] Integração com banco de dados
- [ ] Testes automatizados
- [ ] Deploy da aplicação

## 🚀 Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/arthurobs542/clock-timer.git
cd clock-timer
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## 📝 Scripts Disponíveis

- `npm run dev` - Executa o projeto em modo de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run start` - Executa a build de produção
- `npm run lint` - Executa o linter
- `npm run type-check` - Verifica os tipos TypeScript

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Arthur Robson**

- GitHub: [@arthurobs542](https://github.com/arthurobs542)

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões, por favor abra uma [issue](https://github.com/arthurobs542/clock-timer/issues) no repositório.

---

Desenvolvido com ❤️ para micro empresas que precisam de um controle de ponto eficiente e moderno.
