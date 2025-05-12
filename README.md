# 📋 To-Do List API

Projeto de backend para uma To-Do List utilizando Firebase Functions, Express, TypeScript, SWC, e Swagger para documentação de API.

⚙️ Tecnologias Utilizadas
Node.js

Firebase Functions

Express

SWC

TypeScript

Zod

Swagger

tsyringe

📁 Estrutura Esperada
pgsql
Copiar código
functions-to-do-list/
│
├── src/               # Código-fonte TypeScript
├── lib/               # Código compilado (gerado automaticamente)
├── package.json
├── tsconfig.json
└── README.md
🚀 Como Executar o Projeto
1. Pré-requisitos
Node.js instalado (recomenda-se a versão LTS)

Firebase CLI instalado e configurado (npm install -g firebase-tools)

Conta no Firebase + projeto criado

2. Instale as dependências
bash
Copiar código
npm install
3. Compile o projeto
Compila os arquivos TypeScript (em src/) para JavaScript (em lib/) usando SWC:

bash
Copiar código
npm run build
Para modo watch (recompilação automática), use:

bash
Copiar código
npm run build:watch
4. Inicie o emulador local do Firebase
Executa o emulador apenas para as funções, com suporte a debugging:

bash
Copiar código
npm run dev
🧹 Scripts Disponíveis
Comando	Descrição
npm run clean	Remove a pasta lib/ compilada
npm run build	Compila os arquivos TypeScript usando SWC
npm run build:watch	Compila em modo watch (modo desenvolvimento)
npm run dev	Inicia o Firebase Emulator com build automático
npm test	Placeholder para testes

📚 Documentação da API
A documentação da API está disponível via Swagger, acessível durante a execução local na url http://127.0.0.1:5001/to-do-list-d8a09/southamerica-east1/app/api-docs/.

## 🚀 Tecnologias

- Node.js
- Express
- TypeScript
- SWC (para build)
- tsyringe (injeção de dependência)
- Zod (validação)
- (opcional) JWT para autenticação

---

## 📂 Endpoints

### 🧑‍💼 /users

#### 📌 Endpoints da Rota /users
▶️ Criar novo usuário
POST /users/create

Cria um novo usuário fornecendo nome, e-mail e senha.

Requisição:

POST /users/create
Content-Type: application/json

{
  "name": "João da Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
Respostas possíveis:

201 Created: Usuário criado com sucesso

401 Unauthorized: Dados inválidos ou e-mail já cadastrado

🔍 Buscar usuário por ID
GET /users/{id}

Retorna os dados de um usuário específico com base no ID.

Exemplo de requisição:

GET /users/user_123abc
Resposta de sucesso:

json
Copiar código
{
  "id": "user_123abc",
  "name": "João da Silva",
  "email": "joao@email.com"
}
Respostas possíveis:

200 OK: Usuário encontrado

404 Not Found: Usuário não encontrado

✅ Endpoints da Rota /to-do (Autenticados)
⚠️ Todas as rotas exigem autenticação. É necessário incluir o token JWT no header da requisição:

makefile
Copiar código
Authorization: Bearer <seu_token_aqui>
###📋 Listar tarefas
GET /to-do/

Retorna a lista de tarefas do usuário autenticado.

Exemplo:
GET /to-do/
Authorization: Bearer <token>
Resposta:

json
[
  {
    "id": "1a2b3c",
    "description": "Estudar Node.js",
    "priority": "high",
    "completed": false
  }
]
###➕ Criar nova tarefa
POST /to-do/

Cria uma nova tarefa associada ao usuário autenticado.

Body:

json
{
  "description": "Estudar Node.js",
  "priority": "high"
}
Resposta esperada (201 Created):

json
{
  "id": "abc123",
  "message": "Tarefa criada com sucesso"
}
###✅ Marcar tarefa como concluída
PUT /to-do/

Atualiza o status de uma tarefa para "concluído".

Body:

json
{
  "id": "1a2b3c"
}
Resposta esperada:

json
{
  "description": "Tarefa marcada como completa!"
}
❌ Deletar uma tarefa
DELETE /to-do/:id

Deleta uma tarefa específica.

Exemplo:

DELETE /to-do/1a2b3c
Authorization: Bearer <token>
Resposta esperada:

json
{
  "message": "Tarefa excluída com sucesso"
}
