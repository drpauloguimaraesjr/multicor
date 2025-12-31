# Guia de Configuração - Multicor

## 🔥 Configuração do Firebase

### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Nome do projeto: `multicor` (ou outro nome de sua preferência)
4. Desabilite Google Analytics (opcional)
5. Clique em "Criar projeto"

### 2. Configurar Authentication

1. No menu lateral, clique em "Authentication"
2. Clique em "Começar"
3. Selecione "Email/senha"
4. Ative a opção "Email/senha"
5. Clique em "Salvar"

### 3. Configurar Firestore Database

1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Selecione "Iniciar no modo de produção"
4. Escolha a localização (recomendado: `southamerica-east1` para Brasil)
5. Clique em "Ativar"

**Configurar Regras de Segurança:**

Clique em "Regras" e substitua por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública do conteúdo
    match /content/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Permitir leitura pública do portfólio
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Clique em "Publicar"

### 4. Configurar Storage

1. No menu lateral, clique em "Storage"
2. Clique em "Começar"
3. Aceite as regras padrão
4. Escolha a mesma localização do Firestore
5. Clique em "Concluído"

**Configurar Regras de Segurança:**

Clique em "Regras" e substitua por:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /portfolio/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Clique em "Publicar"

### 5. Obter Credenciais do Firebase

1. Clique no ícone de engrenagem ⚙️ ao lado de "Visão geral do projeto"
2. Clique em "Configurações do projeto"
3. Role até "Seus aplicativos"
4. Clique no ícone `</>` (Web)
5. Apelido do app: `Multicor Web`
6. **NÃO** marque "Configurar Firebase Hosting"
7. Clique em "Registrar app"
8. Copie as credenciais do `firebaseConfig`

### 6. Configurar Variáveis de Ambiente

Crie o arquivo `.env.local` na raiz do projeto com as credenciais:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

### 7. Criar Usuário Admin

1. No Firebase Console, vá em "Authentication"
2. Clique na aba "Users"
3. Clique em "Add user"
4. Email: `admin@multicor.com` (ou seu email)
5. Senha: Crie uma senha forte
6. Clique em "Add user"

## 📦 Instalação do Node.js

### Windows

1. Acesse [nodejs.org](https://nodejs.org/)
2. Baixe a versão LTS (recomendada)
3. Execute o instalador
4. Siga as instruções (aceite as opções padrão)
5. Reinicie o terminal/PowerShell

**Verificar instalação:**
```bash
node --version
npm --version
```

## 🚀 Executar o Projeto

1. Abra o terminal na pasta do projeto
2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra o navegador em `http://localhost:3000`

## 🔐 Primeiro Acesso ao Admin

1. Acesse `http://localhost:3000/admin/login`
2. Faça login com o email e senha criados no Firebase
3. Você será redirecionado para o dashboard

## ✅ Checklist de Configuração

- [ ] Projeto Firebase criado
- [ ] Authentication configurado (Email/senha)
- [ ] Firestore Database criado
- [ ] Regras do Firestore configuradas
- [ ] Storage configurado
- [ ] Regras do Storage configuradas
- [ ] Credenciais copiadas
- [ ] Arquivo `.env.local` criado
- [ ] Usuário admin criado
- [ ] Node.js instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Projeto rodando (`npm run dev`)
- [ ] Login admin funcionando

## 🆘 Problemas Comuns

### "Firebase: Error (auth/invalid-api-key)"
- Verifique se as credenciais no `.env.local` estão corretas
- Certifique-se de que não há espaços extras

### "Firebase: Error (auth/user-not-found)"
- Verifique se o usuário foi criado no Firebase Console
- Confirme o email digitado

### Imagens não aparecem
- Verifique se as regras do Storage foram configuradas
- Confirme que o domínio está em `next.config.js`

### Erro ao fazer upload
- Verifique se está logado no admin
- Confirme que as regras do Storage permitem escrita para usuários autenticados
