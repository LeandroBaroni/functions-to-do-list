# 📋 To-Do List API

API RESTful para gerenciamento de tarefas (to-dos) com autenticação de usuários.

---

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

#### 📥 POST `/users`

Cria um novo usuário.

- **Body JSON:**

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
