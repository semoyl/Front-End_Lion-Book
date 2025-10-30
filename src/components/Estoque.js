import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import './Estoque.css';

function Estoque() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    tipoMovimento: '',
    quantidade: ''
  });

  // Lista mockada de livros para o dropdown
  const livrosDisponiveis = [
    'A Volta ao Mundo em 80 Dias',
    'O velho e o menino',
    'As coisas que você só vê quando desacelera',
    'O Homem que Calculava'
  ];

  const tiposMovimento = [
    'Entrada',
    'Saída'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui virá a integração com a API
    console.log('Registrando movimento:', formData);
    navigate('/dashboard');
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
          <div className="form-group">
            <div className="select-wrapper">
              <select
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">TÍTULO</option>
                {livrosDisponiveis.map((livro, index) => (
                  <option key={index} value={livro}>{livro}</option>
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
                {tiposMovimento.map((tipo, index) => (
                  <option key={index} value={tipo}>{tipo}</option>
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
            <button type="submit" className="form-button submit-button">
              SALVAR
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
