import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import './CadastroLivro.css';

function CadastroLivro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    quantidade: '',
    isbn: '',
    dataPublicacao: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui virá a integração com a API
    console.log('Cadastrando livro:', formData);
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="cadastro-container">
      <header className="cadastro-header">
        <div className="header-content">
          <div className="logo-section">
            <Logo className="logo-icon" />
            <h1 className="page-title">LionBook - CADASTRO</h1>
          </div>
        </div>
      </header>

      <div className="cadastro-content">
        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="form-group">
            <input
              type="text"
              name="titulo"
              placeholder="TÍTULO"
              value={formData.titulo}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="quantidade"
              placeholder="QUANTIDADE"
              value={formData.quantidade}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="isbn"
              placeholder="ISBN"
              value={formData.isbn}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="dataPublicacao"
              placeholder="DATA DE PUBLICAÇÃO"
              value={formData.dataPublicacao}
              onChange={handleChange}
              className="form-input"
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => !e.target.value && (e.target.type = 'text')}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="form-button submit-button">
              CADASTRAR
            </button>
            <button type="button" onClick={handleCancel} className="form-button cancel-button">
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroLivro;
