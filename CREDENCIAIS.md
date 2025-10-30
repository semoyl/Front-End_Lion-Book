# 🔐 Credenciais e Troubleshooting - LionBook

## ✅ ERRO 401 CORRIGIDO!

O erro 401 (Unauthorized) que aparecia no console foi **corrigido**. Agora a aplicação trata corretamente as respostas da API.

## 📋 Credenciais de Acesso

### Usuário Padrão
```
Login: admin
Senha: admin123
```

## 🔧 Checklist - Antes de Fazer Login

### 1. Back-End deve estar rodando
```bash
cd Back-End_Lion-Book
node app.js
```

**Deve aparecer:** "API rodando na porta 8080" ou similar

### 2. Banco de Dados deve estar configurado
- MySQL rodando
- Database `db_lionbooks` criado
- Tabelas criadas (via scriptSQL.sql)

### 3. Front-End rodando
```bash
cd Front-End_Lion-Book
npm run dev
```

**Acesse:** http://localhost:3003

## 🐛 Troubleshooting

### Erro: "Usuário ou senha inválidos"
✅ **Causa:** Credenciais incorretas
🔧 **Solução:** Use `admin` / `admin123`

### Erro: "Erro de conexão com o servidor"
✅ **Causa:** Back-end não está rodando
🔧 **Solução:** 
1. Abra um terminal
2. Navegue até `Back-End_Lion-Book`
3. Execute `node app.js`
4. Verifique se aparece a mensagem de sucesso

### Erro: "Failed to load resource: net::ERR_CONNECTION_REFUSED"
✅ **Causa:** Back-end não iniciou ou está em porta diferente
🔧 **Solução:**
1. Verifique se o back-end está na porta 8080
2. Se estiver em outra porta, altere em `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:PORTA_CORRETA/v1/lionbook';
```

## 📊 Verificação da API

### Teste direto no navegador:
```
http://localhost:8080/v1/lionbook/status
```

Se retornar algo, a API está funcionando!

## 🎯 Fluxo de Login Correto

1. Usuário digita credenciais
2. Clica em "LOGIN"
3. Front-end envia POST para `/v1/lionbook/login`
4. Back-end valida e retorna status 200 + dados do usuário
5. Front-end salva no localStorage
6. Redireciona para Dashboard

---

**🎉 Com essas correções, o login deve funcionar perfeitamente!**
