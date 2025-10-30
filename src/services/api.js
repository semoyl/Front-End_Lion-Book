const API_BASE_URL = 'http://localhost:8080/v1/lionbook';

// Função auxiliar para fazer requisições
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    // Retorna sempre os dados, mesmo em caso de erro HTTP
    // O componente que chama deve verificar o status_code
    return data;
  } catch (error) {
    console.error('Erro na API:', error);
    throw error;
  }
};

// Serviços de Autenticação
export const authService = {
  login: async (login, senha) => {
    return fetchAPI('/login', {
      method: 'POST',
      body: JSON.stringify({ login, senha }),
    });
  },
};

// Serviços de Livros
export const livroService = {
  listarTodos: async () => {
    return fetchAPI('/livros');
  },

  buscarPorId: async (id) => {
    return fetchAPI(`/livro/${id}`);
  },

  buscarPorTitulo: async (titulo) => {
    return fetchAPI(`/livros/buscar/${titulo}`);
  },

  cadastrar: async (livro) => {
    return fetchAPI('/livro', {
      method: 'POST',
      body: JSON.stringify(livro),
    });
  },

  atualizar: async (id, livro) => {
    return fetchAPI(`/livro/${id}`, {
      method: 'PUT',
      body: JSON.stringify(livro),
    });
  },

  deletar: async (id) => {
    return fetchAPI(`/livro/${id}`, {
      method: 'DELETE',
    });
  },
};

// Serviços de Movimentações
export const movimentacaoService = {
  listarTodas: async () => {
    return fetchAPI('/movimentacoes');
  },

  buscarPorId: async (id) => {
    return fetchAPI(`/movimentacao/${id}`);
  },

  listarPorLivro: async (idLivro) => {
    return fetchAPI(`/movimentacoes/livro/${idLivro}`);
  },

  registrar: async (movimentacao) => {
    return fetchAPI('/movimentacao', {
      method: 'POST',
      body: JSON.stringify(movimentacao),
    });
  },

  listarTipos: async () => {
    return fetchAPI('/tipos-movimentacao');
  },
};

// Serviços de Usuários
export const usuarioService = {
  listarTodos: async () => {
    return fetchAPI('/usuarios');
  },

  buscarPorId: async (id) => {
    return fetchAPI(`/usuario/${id}`);
  },

  cadastrar: async (usuario) => {
    return fetchAPI('/usuario', {
      method: 'POST',
      body: JSON.stringify(usuario),
    });
  },
};

const api = {
  auth: authService,
  livro: livroService,
  movimentacao: movimentacaoService,
  usuario: usuarioService,
};

export default api;
