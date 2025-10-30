import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { livroService } from '../services/api';
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validação
    if (!formData.titulo || !formData.quantidade || !formData.isbn || !formData.dataPublicacao) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      const livroData = {
        titulo: formData.titulo,
        data_publicacao: formData.dataPublicacao,
        quantidade: parseInt(formData.quantidade),
        isbn: formData.isbn
      };

      const response = await livroService.cadastrar(livroData);
      
      if (response.status_code === 201) {
        alert('Livro cadastrado com sucesso!');
        navigate('/dashboard');
      } else {
        setError('Erro ao cadastrar livro. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao cadastrar livro. Verifique os dados.');
      console.error('Erro no cadastro:', err);
    } finally {
      setLoading(false);
    }
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
          {error && <div className="error-message">{error}</div>}
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
            <button type="submit" className="form-button submit-button" disabled={loading}>
              {loading ? 'CADASTRANDO...' : 'CADASTRAR'}
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
