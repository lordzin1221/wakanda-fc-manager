import { useState } from 'react';
import '../styles/AdminLogin.css';

interface AdminLoginProps {
  onAdminLogin: (adminName: string) => void;
  onNavigate: (page: 'home' | 'register' | 'dashboard' | 'communication' | 'competitive' | 'admin') => void;
}

const ADMIN_EMAIL = 'samuelrique0@gmail.com';
const ADMIN_PASSWORD = 'rique1221R!';
const ADMIN_NAME = 'Samuel Henrique Santos Reis';

export default function AdminLogin({ onAdminLogin, onNavigate }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular delay de autenticação
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        onAdminLogin(ADMIN_NAME);
      } else if (email === ADMIN_EMAIL) {
        setError('Senha incorreta. Acesso negado.');
      } else {
        setError('Email não autorizado para acesso administrativo. Apenas samuelrique0@gmail.com tem permissão.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <img src="/wakanda-logo.png" alt="Wakanda FC Logo" className="admin-logo" />
          <h1>Acesso Administrativo</h1>
          <p>Wakanda FC Manager - Painel de Controle</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Email Administrativo *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu-email@empresa.com"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha *</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              disabled={isLoading}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={isLoading} className="btn-login">
            {isLoading ? 'Autenticando...' : 'Acessar Painel Admin'}
          </button>
        </form>

        <div className="admin-info">
          <h3>⚠️ Acesso Restrito</h3>
          <p>
            Este é um painel administrativo exclusivo para o dono da empresa e equipe de gestão.
          </p>
          <p>
            Apenas emails autorizados têm permissão de acesso.
          </p>
          <p>
            Se você é um administrador autorizado e precisa de acesso, entre em contato com o desenvolvedor.
          </p>
        </div>

        <button onClick={() => onNavigate('home')} className="btn-back">
          ← Voltar para Home
        </button>
      </div>
    </div>
  );
}
