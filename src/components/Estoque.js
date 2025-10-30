import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { livroService, movimentacaoService } from '../services/api';
import Logo from './Logo';
import './Estoque.css';

function Estoque() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idLivro: '',
    tipoMovimento: '',
    quantidade: ''
  });
  const [livros, setLivros] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const tiposMovimento = [
    { id: 1, nome: 'Entrada' },
    { id: 2, nome: 'Saída' }
  ];

  // Carregar livros ao montar o componente
  useEffect(() => {
    carregarLivros();
  }, []);

  const carregarLivros = async () => {
    try {
      const response = await livroService.listarTodos();
      if (response.status_code === 200) {
        setLivros(response.data);
      }
    } catch (err) {
      console.error('Erro ao carregar livros:', err);
    }
  };

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
    if (!formData.idLivro || !formData.tipoMovimento || !formData.quantidade) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      // Obter o usuário do localStorage
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      if (!usuario) {
        setError('Usuário não encontrado. Faça login novamente.');
        setLoading(false);
        return;
      }

      const movimentacaoData = {
        id_movimentacao: parseInt(formData.tipoMovimento),
        id_usuario: usuario.id,
        quantidade: parseInt(formData.quantidade),
        data_movimentacao: new Date().toISOString().split('T')[0],
        id_livro: parseInt(formData.idLivro)
      };

      const response = await movimentacaoService.registrar(movimentacaoData);
      
      if (response.status_code === 201) {
        alert('Movimentação registrada com sucesso!');
        navigate('/dashboard');
      } else {
        setError('Erro ao registrar movimentação. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao registrar movimentação. Verifique os dados.');
      console.error('Erro ao registrar movimentação:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="estoque-container">
      <header className="estoque-header">
        <div className="header-content">
          <div className="logo-section">
            <Logo className="logo-icon" />
            <h1 className="page-title">LionBook - ESTOQUE</h1>
          </div>
        </div>
      </header>

      <div className="estoque-content">
        <form onSubmit={handleSubmit} className="estoque-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <div className="select-wrapper">
              <select
                name="idLivro"
                value={formData.idLivro}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">TÍTULO</option>
                {livros.map((livro) => (
                  <option key={livro.id} value={livro.id}>{livro.titulo}</option>
                ))}
              </select>
              <div className="select-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="select-wrapper">
              <select
                name="tipoMovimento"
                value={formData.tipoMovimento}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">TIPO DE MOVIMENTO</option>
                {tiposMovimento.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                ))}
              </select>
              <div className="select-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
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

          <div className="form-actions">
            <button type="submit" className="form-button submit-button" disabled={loading}>
              {loading ? 'SALVANDO...' : 'SALVAR'}
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

export default Estoque;
