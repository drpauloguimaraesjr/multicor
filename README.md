# Multicor - Site de Comunicação Visual

Site moderno e responsivo para empresa de comunicação visual, desenvolvido com Next.js 14, TypeScript, Tailwind CSS e Firebase.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Firebase** - Backend (Auth, Firestore, Storage)
- **Framer Motion** - Animações avançadas

## ✨ Funcionalidades

### Site Principal
- Hero section com animações parallax
- Seção Sobre com estatísticas
- Serviços com cards animados
- Portfólio com filtros por categoria
- Formulário de contato
- Design responsivo e moderno
- Animações suaves de scroll
- Glassmorphism e gradientes

### Painel Administrativo
- Login seguro com Firebase Auth
- Dashboard com navegação intuitiva
- Editor de Hero Section
- Gerenciador de Portfólio com upload de imagens
- Interface moderna e responsiva

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ instalado
- Conta Firebase (gratuita)

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/drpauloguimaraesjr/multicor.git
cd multicor
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o Firebase**

a) Crie um projeto no [Firebase Console](https://console.firebase.google.com/)

b) Ative os seguintes serviços:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage

c) Copie as credenciais do Firebase

d) Crie o arquivo `.env.local` na raiz do projeto:
```bash
cp .env.local.example .env.local
```

e) Edite `.env.local` e adicione suas credenciais do Firebase

4. **Crie o primeiro usuário admin**

No Firebase Console:
- Vá em Authentication
- Clique em "Add user"
- Adicione email e senha para o admin

5. **Execute o projeto**
```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`

## 🎨 Estrutura do Projeto

```
multicor/
├── app/
│   ├── admin/          # Páginas do painel admin
│   ├── globals.css     # Estilos globais
│   ├── layout.tsx      # Layout raiz
│   └── page.tsx        # Homepage
├── components/
│   ├── admin/          # Componentes do admin
│   ├── Hero.tsx        # Seção Hero
│   ├── About.tsx       # Seção Sobre
│   ├── Services.tsx    # Seção Serviços
│   ├── Portfolio.tsx   # Seção Portfólio
│   ├── Contact.tsx     # Seção Contato
│   └── Footer.tsx      # Rodapé
├── lib/
│   └── firebase.ts     # Configuração Firebase
└── public/             # Arquivos estáticos
```

## 🔐 Acesso ao Admin

1. Acesse `http://localhost:3000/admin/login`
2. Faça login com as credenciais criadas no Firebase
3. Gerencie o conteúdo do site

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Conecte o repositório no [Vercel](https://vercel.com)
3. Adicione as variáveis de ambiente do Firebase
4. Deploy automático!

## 📝 Personalização

### Cores
Edite `tailwind.config.ts` para alterar as cores do tema.

### Conteúdo
Use o painel admin para editar:
- Textos do Hero
- Imagens do portfólio
- Informações de contato

### Serviços
Edite `components/Services.tsx` para adicionar/remover serviços.

## 🤝 Suporte

Para dúvidas ou problemas, abra uma issue no GitHub.

## 📄 Licença

Este projeto é privado e pertence à Multicor.
