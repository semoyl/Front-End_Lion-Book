import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { livroService } from '../services/api';
import Logo from './Logo';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Carregar livros ao montar o componente
  useEffect(() => {
    carregarLivros();
  }, []);

  const carregarLivros = async () => {
    try {
      setLoading(true);
      const response = await livroService.listarTodos();
      if (response.status_code === 200) {
        setLivros(response.data);
      }
    } catch (err) {
      setError('Erro ao carregar livros');
      console.error('Erro ao carregar livros:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await livroService.deletar(id);
        setLivros(livros.filter(livro => livro.id !== id));
      } catch (err) {
        alert('Erro ao excluir livro');
        console.error('Erro ao excluir:', err);
      }
    }
  };

  // Filtro de busca
  const livrosFiltrados = livros.filter(livro =>
    livro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <Logo className="logo-icon" />
            <h1 className="dashboard-title">LionBook</h1>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="actions-bar">
          <button 
            className="action-button"
            onClick={() => navigate('/cadastro')}
          >
            NOVO LIVRO
          </button>
          <button 
            className="action-button"
            onClick={() => navigate('/estoque')}
          >
            ESTOQUE
          </button>
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
        </div>

        <div className="table-container">
          {loading ? (
            <div className="loading-message">Carregando livros...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <table className="books-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TÍTULO</th>
                  <th>ISBN</th>
                  <th>DATA PUBLICAÇÃO</th>
                  <th>AÇÃO</th>
                </tr>
              </thead>
              <tbody>
                {livrosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{textAlign: 'center'}}>Nenhum livro encontrado</td>
                  </tr>
                ) : (
                  livrosFiltrados.map((livro) => (
                    <tr key={livro.id}>
                      <td>{livro.id}</td>
                      <td>{livro.titulo}</td>
                      <td>{livro.isbn}</td>
                      <td>{new Date(livro.data_publicacao).toLocaleDateString('pt-BR')}</td>
                      <td className="actions-cell">
                        <button className="icon-button edit-button" title="Editar">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button 
                          className="icon-button delete-button" 
                          title="Excluir"
                          onClick={() => handleDelete(livro.id)}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
