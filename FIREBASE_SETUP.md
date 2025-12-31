# 🔥 Configuração Firebase - Multicor

## ✅ Suas Credenciais do Firebase

Você já criou o projeto Firebase! Agora precisa criar o arquivo de configuração.

## 📝 Criar arquivo .env.local

1. **Abra a pasta do projeto:**
   ```
   c:\Users\Dr. Paulo\Downloads\drPaulo\multicor
   ```

2. **Crie um novo arquivo chamado `.env.local`** (com o ponto no início)
   - Clique com botão direito na pasta
   - Novo → Arquivo de Texto
   - Renomeie para `.env.local` (apague o .txt)

3. **Abra o arquivo `.env.local` e cole este conteúdo:**

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC5GPgbui8Scuf6Gk1wnErAl6Ne78__qME
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=multicor-5ee3a.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=multicor-5ee3a
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=multicor-5ee3a.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1068738865374
NEXT_PUBLIC_FIREBASE_APP_ID=1:1068738865374:web:1c1aa56c5511f37070ba4f
```

4. **Salve o arquivo**

## 🔐 Próximos Passos no Firebase Console

Agora você precisa configurar os serviços no Firebase:

### 1. Ativar Authentication

1. Acesse: https://console.firebase.google.com/project/multicor-5ee3a/authentication
2. Clique em "Get Started" ou "Começar"
3. Clique em "Email/Password"
4. **Ative** a opção "Email/senha"
5. Clique em "Save" ou "Salvar"

### 2. Criar Firestore Database

1. Acesse: https://console.firebase.google.com/project/multicor-5ee3a/firestore
2. Clique em "Create database" ou "Criar banco de dados"
3. Selecione "Start in production mode"
4. Escolha localização: **southamerica-east1** (São Paulo)
5. Clique em "Enable" ou "Ativar"

**Configurar Regras:**
1. Clique na aba "Rules" ou "Regras"
2. Substitua o conteúdo por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /content/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Clique em "Publish" ou "Publicar"

### 3. Ativar Storage

1. Acesse: https://console.firebase.google.com/project/multicor-5ee3a/storage
2. Clique em "Get Started" ou "Começar"
3. Aceite as regras padrão
4. Escolha a mesma localização: **southamerica-east1**
5. Clique em "Done" ou "Concluído"

**Configurar Regras:**
1. Clique na aba "Rules" ou "Regras"
2. Substitua o conteúdo por:

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

3. Clique em "Publish" ou "Publicar"

### 4. Criar Usuário Admin

1. Acesse: https://console.firebase.google.com/project/multicor-5ee3a/authentication/users
2. Clique em "Add user" ou "Adicionar usuário"
3. Email: `admin@multicor.com` (ou seu email preferido)
4. Senha: Crie uma senha forte (anote!)
5. Clique em "Add user" ou "Adicionar usuário"

## ✅ Checklist de Configuração

- [ ] Arquivo `.env.local` criado com as credenciais
- [ ] Authentication ativado (Email/Password)
- [ ] Firestore Database criado
- [ ] Regras do Firestore configuradas
- [ ] Storage ativado
- [ ] Regras do Storage configuradas
- [ ] Usuário admin criado

## 🚀 Testar o Projeto

Depois de completar tudo acima:

1. **Instale as dependências** (se ainda não instalou):
   ```bash
   npm install
   ```

2. **Rode o servidor:**
   ```bash
   npm run dev
   ```

3. **Acesse o site:**
   - Site: http://localhost:3000
   - Admin: http://localhost:3000/admin/login

4. **Faça login no admin** com o email e senha que você criou!

## 🎉 Pronto!

Agora o site está 100% funcional com:
- ✅ Todas as animações
- ✅ Painel admin funcionando
- ✅ Upload de imagens do portfólio
- ✅ Edição de conteúdo

---

## 🆘 Problemas?

### Erro ao fazer login
- Verifique se criou o usuário no Firebase Authentication
- Confirme email e senha

### Erro ao fazer upload de imagem
- Verifique se configurou as regras do Storage
- Confirme que está logado no admin

### Site não carrega
- Verifique se o arquivo `.env.local` está na raiz do projeto
- Reinicie o servidor (`Ctrl+C` e `npm run dev` novamente)
