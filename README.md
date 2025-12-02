````markdown
# 📄 Front-End Chatbot PDF

Este é o front-end do projeto onde o usuário pode **criar um chatbot**, **enviar PDFs** e **conversar com a IA** diretamente pela interface.

**ANTES DE TUDO, RODE O BACK END**

---

## ▶️ Como Rodar o Projeto

### 1. Instalar dependências

```sh
npm install
```
````

````

### 3. Rodar o projeto

```sh
npm run dev
````

Acesse no navegador:

```
http://localhost:3000
```

---

## 💬 Como Usar o Sistema (Passo a Passo)

### ⭐ 1. Criar um novo chatbot

Na tela inicial:

1. Clique no botão **Criar Chatbot** (ou semelhante no seu layout).
2. Preencha o nome do chatbot.
3. Ao salvar, o chatbot será criado no backend.
4. O sistema exibirá o **ID do chatbot**, que será usado no front.

> Esse ID é o identificador principal para salvar mensagens, PDFs e respostas da IA.

---

### ⭐ 2. Selecionar o chatbot e entrar no chat

Ao abrir a interface de chat:

- O sistema pode pegar automaticamente o `chatbotId` do localStorage
  **ou**
- Você escolhe o chatbot manualmente em uma lista (dependendo do seu front).

Depois disso, você será direcionado para a área de conversa.

---

### ⭐ 3. Enviar PDFs (opcional)

No componente **ChatInput**, clique no botão de PDF:

1. Escolha um PDF.
2. Clique em **Enviar**.
3. O PDF será enviado ao backend.
4. A IA irá processar o documento e gerar mensagens automaticamente.

As mensagens aparecerão na área de:

```
<ChatMessages />
```

---

### ⭐ 4. Conversar com a IA

Na parte inferior da tela existe o campo de texto:

```
Digite sua mensagem...
```

Como funciona:

1. Escreva sua pergunta ou comando.
2. clique no botão de enviar.
3. O front:

   - envia a mensagem ao backend
   - exibe a resposta da IA assim que retornar

Você pode perguntar sobre:

- Informações do PDF
- Resumo
- Explicações
- Conversa normal

---

### ⭐ 5. A IA responde em tempo real

As mensagens aparecem em ordem:

- **User** → alinhado à direita
- **Assistant** → alinhado à esquerda

Com ícones:

- 💬 para mensagens normais
- 📄 para mensagens baseadas em PDFs

A interface atualiza automaticamente sempre que o backend retorna algo.

---

## ✔️ Pronto!

O usuário agora pode criar chatbots, enviar documentos e conversar com a IA de forma contínua.
