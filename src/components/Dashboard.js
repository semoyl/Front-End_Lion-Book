import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dados mockados para a tabela
  const [livros] = useState([
    { id: 120, titulo: 'A Volta ao Mundo em 80 Dias', isbn: '978-0-123456-78-9', dataPublicacao: '2020-01-15', status: 'Disponível' },
    { id: 456, titulo: 'O velho e o menino', isbn: '978-0-987654-32-1', dataPublicacao: '2019-05-20', status: 'Emprestado' },
    { id: 987, titulo: 'As coisas que você só vê quando desacelera', isbn: '978-0-456789-12-3', dataPublicacao: '2021-03-10', status: 'Disponível' },
    { id: 321, titulo: 'O Homem que Calculava', isbn: '978-0-321654-98-7', dataPublicacao: '2018-11-30', status: 'Disponível' }
  ]);

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
          <table className="books-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>TÍTULO</th>
                <th>ISBN</th>
                <th>DATA PUBLICAÇÃO</th>
                <th>STATUS</th>
                <th>AÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {livrosFiltrados.map((livro) => (
                <tr key={livro.id}>
                  <td>{livro.id}</td>
                  <td>{livro.titulo}</td>
                  <td>{livro.isbn}</td>
                  <td>{new Date(livro.dataPublicacao).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <span className={`status-badge ${livro.status === 'Disponível' ? 'status-disponivel' : 'status-emprestado'}`}>
                      {livro.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button className="icon-button edit-button" title="Editar">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="icon-button delete-button" title="Excluir">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
