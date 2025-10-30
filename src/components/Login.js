import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!username || !password) {
      setError('Por favor, preencha usuário e senha.');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(username, password);
      
      if (response.status_code === 200 && response.data && response.data.length > 0) {
        // Salva os dados do usuário no localStorage
        localStorage.setItem('usuario', JSON.stringify(response.data[0]));
        navigate('/dashboard');
      } else if (response.status_code === 401) {
        setError('Usuário ou senha inválidos.');
      } else {
        setError(response.message || 'Erro ao fazer login. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor. Verifique se o back-end está rodando.');
      console.error('Erro no login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="cart-icon">
          <img src="/Group.png" alt="Cart Icon" />
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="error-message">{error}</div>}
          <div className="input-group">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              required
            />
          </div>

          <div className="input-group">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'ENTRANDO...' : 'LOGIN'}
          </button>

          <button type="button" className="forgot-password" onClick={() => {}}>
            Forgot password?
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
