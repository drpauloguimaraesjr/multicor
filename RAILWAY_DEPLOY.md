# 🚀 Como fazer Deploy no Railway

O deploy no Railway é extremamente simples e rápido. Siga os passos abaixo:

## Passo 1: Preparar o GitHub

Você precisa que seu código esteja no GitHub.

1. **Inicialize o Git (se ainda não fez):**
   *(No terminal do Visual Studio Code)*
   ```bash
   git init
   git add .
   git commit -m "Site completo Multicor"
   ```

2. **Crie um repositório no GitHub:**
   - Acesse: https://github.com/new
   - Nome: `multicor`
   - Clique em "Create repository"

3. **Conecte e envie o código:**
   *(Copie os comandos que o GitHub mostrar na tela "push an existing repository", que serão parecidos com isso)*:
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/multicor.git
   git branch -M main
   git push -u origin main
   ```

## Passo 2: Criar Projeto no Railway

1. Acesse: https://railway.app/
2. Faça login com seu GitHub.
3. Clique em **"New Project"** → **"Deploy from GitHub repo"**.
4. Selecione o repositório `multicor` que você acabou de criar.
5. Clique em **"Deploy Now"**.

## Passo 3: Configurar Variáveis de Ambiente (Para o Admin funcionar)

1. No painel do seu projeto no Railway, clique na aba **"Variables"**.
2. Adicione as mesmas variáveis que estão no seu arquivo `.env.local`:

   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

   *(Copie os valores do seu arquivo local)*

3. O Railway vai redeployar automaticamente quando você salvar.

## 🎉 Pronto!

O Railway vai gerar um link (ex: `multicor-production.up.railway.app`) onde seu site estará no ar, mundialmente acessível, com SSL (https) e alta performance.

---

### Dica: Domínio Personalizado

Se quiser usar `multicor.com.br` depois:
1. No Railway, vá em **Settings** → **Domains**.
2. Clique em **Custom Domain**.
3. Digite seu domínio.
4. Siga as instruções de DNS que aparecerem.
