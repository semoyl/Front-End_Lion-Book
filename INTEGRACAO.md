# Guia de Integração Front-End + Back-End LionBook

## ✅ Integração Completa

A integração entre o front-end e back-end foi concluída com sucesso! Todos os componentes estão conectados à API.

## 🔧 Configuração

### 1. Inicie o Back-End

Certifique-se de que o back-end está rodando em `http://localhost:8080`:

```bash
cd Back-End_Lion-Book
node app.js
```

### 2. Inicie o Front-End

```bash
cd Front-End_Lion-Book
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 📋 Funcionalidades Integradas

### 🔐 Login
- **Endpoint:** `POST /v1/lionbook/login`
- **Funcionalidade:** Autentica usuário e armazena dados no localStorage
- **Credenciais padrão:** 
  - Login: `admin`
  - Senha: `admin123`

### 📚 Dashboard
- **Endpoint:** `GET /v1/lionbook/livros`
- **Funcionalidades:**
  - Lista todos os livros cadastrados
  - Busca por título
  - Exclusão de livros (`DELETE /v1/lionbook/livro/:id`)
  - Navegação para cadastro e estoque

### ➕ Cadastro de Livros
- **Endpoint:** `POST /v1/lionbook/livro`
- **Campos:**
  - Título
  - ISBN
  - Quantidade
  - Data de Publicação
- **Validação:** Todos os campos são obrigatórios

### 📦 Gestão de Estoque
- **Endpoint:** `POST /v1/lionbook/movimentacao`
- **Funcionalidades:**
  - Registra entrada de livros (id_movimentacao: 1)
  - Registra saída de livros (id_movimentacao: 2)
  - Lista dinâmica de livros disponíveis
- **Validação:** Quantidade e tipo de movimento obrigatórios

## 🗂️ Estrutura de Arquivos

```
src/
├── services/
│   └── api.js              # Serviço de comunicação com API
├── components/
│   ├── Login.js            # Autenticação
│   ├── Dashboard.js        # Listagem de livros
│   ├── CadastroLivro.js    # Cadastro de livros
│   └── Estoque.js          # Movimentações de estoque
```

## 🔄 Fluxo de Dados

1. **Login:** Usuário faz login → Dados salvos no localStorage
2. **Dashboard:** Carrega livros da API → Exibe na tabela
3. **Cadastro:** Preenche formulário → Envia para API → Retorna ao Dashboard
4. **Estoque:** Seleciona livro e tipo → Registra movimentação → Atualiza estoque

## ⚙️ Configuração da API

O arquivo `src/services/api.js` contém a URL base da API:

```javascript
const API_BASE_URL = 'http://localhost:8080/v1/lionbook';
```

Se o back-end estiver rodando em outra porta, altere esta constante.

## 🛡️ Tratamento de Erros

Todos os componentes incluem:
- Validação de campos obrigatórios
- Mensagens de erro amigáveis
- Estados de loading durante requisições
- Tratamento de erros de conexão

## 📝 Formato de Dados

### Login
```json
{
  "login": "admin",
  "senha": "admin123"
}
```

### Cadastro de Livro
```json
{
  "titulo": "Nome do Livro",
  "data_publicacao": "2024-01-15",
  "quantidade": 10,
  "isbn": "978-0-123456-78-9"
}
```

### Movimentação de Estoque
```json
{
  "id_movimentacao": 1,
  "id_usuario": 1,
  "quantidade": 5,
  "data_movimentacao": "2024-10-30",
  "id_livro": 1
}
```

## 🎨 Melhorias Implementadas

- ✅ Integração completa com API REST
- ✅ Validação de formulários
- ✅ Mensagens de erro e sucesso
- ✅ Estados de loading
- ✅ Persistência de sessão (localStorage)
- ✅ Listagem dinâmica de livros
- ✅ Exclusão de livros com confirmação
- ✅ Busca por título em tempo real

## 🚀 Próximos Passos Sugeridos

1. Implementar edição de livros
2. Adicionar paginação na listagem
3. Criar dashboard com estatísticas
4. Implementar logout
5. Adicionar filtros avançados
6. Criar histórico de movimentações

---

**Sistema LionBook v1.0** - Front-End totalmente integrado com o Back-End
