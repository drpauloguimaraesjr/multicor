# 🚀 Guia Rápido - Como Rodar o Site Localmente

## Passo 1: Instalar Node.js

### Windows

1. **Baixar Node.js:**
   - Acesse: https://nodejs.org/
   - Clique no botão verde **"LTS"** (versão recomendada)
   - Baixe o instalador para Windows (.msi)

2. **Instalar:**
   - Execute o arquivo baixado
   - Clique em "Next" em todas as telas
   - Aceite os termos de licença
   - **IMPORTANTE:** Marque a opção "Automatically install the necessary tools"
   - Clique em "Install"
   - Aguarde a instalação (pode demorar alguns minutos)
   - Clique em "Finish"

3. **Verificar instalação:**
   - Feche e abra novamente o PowerShell/Terminal
   - Digite: `node --version`
   - Deve aparecer algo como: `v20.x.x`
   - Digite: `npm --version`
   - Deve aparecer algo como: `10.x.x`

---

## Passo 2: Instalar Dependências do Projeto

Após instalar o Node.js:

1. **Abra o PowerShell** na pasta do projeto
   - Navegue até: `c:\Users\Dr. Paulo\Downloads\drPaulo\multicor`
   - Ou clique com botão direito na pasta e escolha "Abrir no Terminal"

2. **Instale as dependências:**
   ```bash
   npm install
   ```
   - Aguarde (pode demorar 2-5 minutos)
   - Muitos arquivos serão baixados na pasta `node_modules`

---

## Passo 3: Rodar o Servidor Local

1. **Execute o comando:**
   ```bash
   npm run dev
   ```

2. **Aguarde a mensagem:**
   ```
   ✓ Ready in 2.5s
   ○ Local:   http://localhost:3000
   ```

3. **Abra o navegador:**
   - Acesse: http://localhost:3000
   - O site estará rodando! 🎉

---

## ⚠️ Observações Importantes

### Site sem Firebase (Primeira vez)

Na primeira execução, o site vai funcionar mas:
- ❌ Admin não vai funcionar (precisa configurar Firebase)
- ❌ Portfólio não vai carregar imagens (precisa Firebase)
- ✅ Todas as animações e design vão funcionar perfeitamente
- ✅ Você pode ver como o site ficou visualmente

### Para Funcionar Completamente

Você precisa configurar o Firebase seguindo o arquivo `SETUP.md`:
1. Criar conta no Firebase (gratuito)
2. Criar projeto
3. Copiar credenciais
4. Criar arquivo `.env.local`
5. Colar as credenciais

---

## 🎨 O Que Você Vai Ver

Mesmo sem Firebase, você vai conseguir ver:
- ✨ Hero section com animações parallax
- 📊 Seção Sobre com estatísticas
- 🎯 Cards de Serviços com hover effects
- 📸 Layout do Portfólio (sem imagens ainda)
- 📧 Formulário de Contato
- 🌈 Todas as cores e gradientes
- 💫 Todas as animações de scroll

---

## 🆘 Problemas Comuns

### "npm: comando não encontrado"
- Node.js não foi instalado corretamente
- Feche e abra o terminal novamente
- Reinstale o Node.js

### "Port 3000 already in use"
- Outra aplicação está usando a porta 3000
- Feche outros servidores
- Ou use: `npm run dev -- -p 3001` (porta 3001)

### Erros de Firebase
- Normal se ainda não configurou
- O site vai funcionar parcialmente
- Configure depois seguindo SETUP.md

---

## 📝 Comandos Úteis

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Parar o servidor
Ctrl + C (no terminal)

# Limpar cache e reinstalar
rm -rf node_modules
npm install
```

---

## ✅ Checklist Rápido

- [ ] Node.js instalado
- [ ] Terminal aberto na pasta do projeto
- [ ] `npm install` executado
- [ ] `npm run dev` executado
- [ ] Navegador aberto em localhost:3000
- [ ] Site funcionando!

---

## 🎉 Próximo Passo

Depois de ver o site funcionando localmente:
1. Configure o Firebase (SETUP.md)
2. Adicione as fotos dos trabalhos
3. Personalize textos e cores
4. Faça deploy na Vercel!
