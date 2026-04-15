import { useState } from 'react';
import '../styles/Dashboard.css';

interface DashboardProps {
  userName: string;
  onNavigate: (page: 'home' | 'register' | 'dashboard' | 'communication' | 'competitive') => void;
  onLogout: () => void;
}

interface Game {
  id: number;
  date: string;
  time: string;
  location: string;
  confirmed: number;
  total: number;
}

export default function Dashboard({ userName, onNavigate, onLogout }: DashboardProps) {
  const [games, setGames] = useState<Game[]>([
    { id: 1, date: '2026-04-18', time: '19:00', location: 'Campo do Parque', confirmed: 8, total: 11 },
    { id: 2, date: '2026-04-25', time: '19:00', location: 'Campo Municipal', confirmed: 5, total: 11 },
    { id: 3, date: '2026-05-02', time: '19:00', location: 'Campo do Parque', confirmed: 0, total: 11 },
  ]);

  const [showNewGame, setShowNewGame] = useState(false);
  const [newGame, setNewGame] = useState({
    date: '',
    time: '',
    location: '',
  });

  const handleAddGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGame.date && newGame.time && newGame.location) {
      const game: Game = {
        id: games.length + 1,
        ...newGame,
        confirmed: 0,
        total: 11,
      };
      setGames([...games, game]);
      setNewGame({ date: '', time: '', location: '' });
      setShowNewGame(false);
    }
  };

  const handleConfirmPresence = (gameId: number) => {
    setGames(games.map(game =>
      game.id === gameId && game.confirmed < game.total
        ? { ...game, confirmed: game.confirmed + 1 }
        : game
    ));
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <img src="/wakanda-logo.png" alt="Wakanda FC Logo" className="header-logo" />
          <div className="header-info">
            <h1>Dashboard - Wakanda FC</h1>
            <p>Bem-vinda, <strong>{userName}</strong>!</p>
          </div>
          <div className="header-actions">
            <button onClick={() => onNavigate('communication')} className="nav-btn">💬 Comunicação</button>
            <button onClick={() => onNavigate('competitive')} className="nav-btn">🏆 Competitivo</button>
            <button onClick={onLogout} className="nav-btn logout">Sair</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="stats">
          <div className="stat-card">
            <h3>Próximos Jogos</h3>
            <p className="stat-number">{games.length}</p>
          </div>
          <div className="stat-card">
            <h3>Confirmadas</h3>
            <p className="stat-number">{games.reduce((sum, g) => sum + g.confirmed, 0)}</p>
          </div>
          <div className="stat-card">
            <h3>Taxa de Presença</h3>
            <p className="stat-number">
              {games.length > 0
                ? Math.round((games.reduce((sum, g) => sum + g.confirmed, 0) / (games.length * 11)) * 100)
                : 0}%
            </p>
          </div>
          <div className="stat-card">
            <h3>Membros Ativos</h3>
            <p className="stat-number">11</p>
          </div>
        </section>

        <section className="games-section">
          <div className="section-header">
            <h2>Gestão de Jogos</h2>
            <button onClick={() => setShowNewGame(!showNewGame)} className="btn-add">
              {showNewGame ? '✕ Cancelar' : '+ Novo Jogo'}
            </button>
          </div>

          {showNewGame && (
            <div className="new-game-form">
              <h3>Agendar Novo Jogo</h3>
              <form onSubmit={handleAddGame}>
                <div className="form-group">
                  <label htmlFor="date">Data *</label>
                  <input
                    type="date"
                    id="date"
                    value={newGame.date}
                    onChange={(e) => setNewGame({ ...newGame, date: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Hora *</label>
                  <input
                    type="time"
                    id="time"
                    value={newGame.time}
                    onChange={(e) => setNewGame({ ...newGame, time: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Local *</label>
                  <input
                    type="text"
                    id="location"
                    value={newGame.location}
                    onChange={(e) => setNewGame({ ...newGame, location: e.target.value })}
                    placeholder="Ex: Campo do Parque"
                    required
                  />
                </div>
                <button type="submit" className="btn-submit">Agendar</button>
              </form>
            </div>
          )}

          <div className="games-list">
            {games.map(game => (
              <div key={game.id} className="game-card">
                <div className="game-info">
                  <div className="game-date">
                    <span className="date">{new Date(game.date).toLocaleDateString('pt-BR')}</span>
                    <span className="time">{game.time}</span>
                  </div>
                  <div className="game-details">
                    <h3>📍 {game.location}</h3>
                    <p>Confirmadas: <strong>{game.confirmed}/{game.total}</strong></p>
                  </div>
                </div>
                <div className="game-actions">
                  <button
                    onClick={() => handleConfirmPresence(game.id)}
                    disabled={game.confirmed >= game.total}
                    className="btn-confirm"
                  >
                    ✓ Confirmar Presença
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cooperation-section">
          <h2>Cooperação - Gestão Financeira</h2>
          <div className="cooperation-grid">
            <div className="cooperation-card">
              <h3>💰 Mensalidade</h3>
              <p className="amount">R$ 50,00</p>
              <p className="status">Próximo vencimento: 30/04/2026</p>
              <button className="btn-pay">Pagar Agora</button>
            </div>
            <div className="cooperation-card">
              <h3>⚽ Aluguel do Campo</h3>
              <p className="amount">R$ 200,00</p>
              <p className="status">Rateado entre 11 membros</p>
              <p className="info">Sua parte: R$ 18,18</p>
            </div>
            <div className="cooperation-card">
              <h3>📊 Saldo da Patota</h3>
              <p className="amount">R$ 450,00</p>
              <p className="status">Fundo para materiais</p>
              <button className="btn-view">Ver Detalhes</button>
            </div>
          </div>
        </section>

        <section className="communication-preview">
          <h2>Últimas Mensagens</h2>
          <div className="messages-preview">
            <div className="message">
              <strong>Ana Silva:</strong> Alguém sabe se vai chover no sábado?
            </div>
            <div className="message">
              <strong>Maria Santos:</strong> Vou levar garrafas de água para o jogo!
            </div>
            <div className="message">
              <strong>Coordenadora:</strong> 📢 Lembrete: Jogo confirmado para 18/04 às 19h
            </div>
          </div>
          <button onClick={() => onNavigate('communication')} className="btn-view-all">
            Ver Todas as Mensagens →
          </button>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2026 Wakanda FC Manager - Gestão Colaborativa & Inclusiva</p>
      </footer>
    </div>
  );
}
