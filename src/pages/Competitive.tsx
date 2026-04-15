import { useState } from 'react';
import '../styles/Competitive.css';

interface CompetitiveProps {
  userName: string;
  onNavigate: (page: 'home' | 'register' | 'dashboard' | 'communication' | 'competitive') => void;
  onLogout: () => void;
}

interface Tournament {
  id: number;
  name: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'finished';
  teams: number;
  matches: number;
}

export default function Competitive({ onNavigate, onLogout }: CompetitiveProps) {
  const [tournaments] = useState<Tournament[]>([
    { id: 1, name: 'Campeonato Municipal Feminino 2026', date: '2026-05-15', status: 'upcoming', teams: 12, matches: 22 },
    { id: 2, name: 'Copa Estadual Feminina', date: '2026-06-01', status: 'upcoming', teams: 16, matches: 30 },
    { id: 3, name: 'Torneio Amistoso Regional', date: '2026-04-20', status: 'ongoing', teams: 8, matches: 7 },
  ]);

  const [stats] = useState({
    gamesPlayed: 24,
    wins: 16,
    draws: 4,
    losses: 4,
    goalsFor: 52,
    goalsAgainst: 28,
  });

  const [showRegistration, setShowRegistration] = useState(false);

  const winRate = ((stats.wins / stats.gamesPlayed) * 100).toFixed(1);
  const goalDifference = stats.goalsFor - stats.goalsAgainst;

  return (
    <div className="competitive">
      <header className="competitive-header">
        <div className="header-content">
          <div className="header-info">
            <h1>🏆 Competitivo - Wakanda FC</h1>
            <p>Transição para o futebol competitivo</p>
          </div>
          <div className="header-actions">
            <button onClick={() => onNavigate('dashboard')} className="nav-btn">← Dashboard</button>
            <button onClick={() => onNavigate('communication')} className="nav-btn">💬 Comunicação</button>
            <button onClick={onLogout} className="nav-btn logout">Sair</button>
          </div>
        </div>
      </header>

      <main className="competitive-main">
        <section className="stats-overview">
          <h2>Estatísticas da Patota</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <h3>Jogos</h3>
              <p className="big-number">{stats.gamesPlayed}</p>
            </div>
            <div className="stat-box">
              <h3>Vitórias</h3>
              <p className="big-number" style={{ color: '#4caf50' }}>{stats.wins}</p>
            </div>
            <div className="stat-box">
              <h3>Empates</h3>
              <p className="big-number" style={{ color: '#ff9800' }}>{stats.draws}</p>
            </div>
            <div className="stat-box">
              <h3>Derrotas</h3>
              <p className="big-number" style={{ color: '#f44336' }}>{stats.losses}</p>
            </div>
            <div className="stat-box">
              <h3>Taxa de Vitória</h3>
              <p className="big-number">{winRate}%</p>
            </div>
            <div className="stat-box">
              <h3>Saldo de Gols</h3>
              <p className="big-number" style={{ color: goalDifference > 0 ? '#4caf50' : '#f44336' }}>
                {goalDifference > 0 ? '+' : ''}{goalDifference}
              </p>
            </div>
            <div className="stat-box">
              <h3>Gols Marcados</h3>
              <p className="big-number">{stats.goalsFor}</p>
            </div>
            <div className="stat-box">
              <h3>Gols Sofridos</h3>
              <p className="big-number">{stats.goalsAgainst}</p>
            </div>
          </div>
        </section>

        <section className="tournaments-section">
          <div className="section-header">
            <h2>Campeonatos & Torneios</h2>
            <button onClick={() => setShowRegistration(!showRegistration)} className="btn-register">
              {showRegistration ? '✕ Cancelar' : '+ Inscrever-se'}
            </button>
          </div>

          {showRegistration && (
            <div className="registration-form">
              <h3>Inscrever-se em um Campeonato</h3>
              <form onSubmit={(e) => { e.preventDefault(); setShowRegistration(false); }}>
                <div className="form-group">
                  <label htmlFor="tournament">Selecione o Campeonato *</label>
                  <select id="tournament" required>
                    <option value="">Escolha um campeonato</option>
                    {tournaments.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name} - {new Date(t.date).toLocaleDateString('pt-BR')}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="category">Categoria *</label>
                  <select id="category" required>
                    <option value="">Selecione a categoria</option>
                    <option value="sub20">Sub-20</option>
                    <option value="sub23">Sub-23</option>
                    <option value="livre">Livre</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="notes">Observações</label>
                  <textarea
                    id="notes"
                    placeholder="Alguma informação importante?"
                    rows={3}
                  />
                </div>
                <button type="submit" className="btn-submit">Confirmar Inscrição</button>
              </form>
            </div>
          )}

          <div className="tournaments-list">
            {tournaments.map(tournament => (
              <div key={tournament.id} className={`tournament-card ${tournament.status}`}>
                <div className="tournament-header">
                  <h3>{tournament.name}</h3>
                  <span className={`status ${tournament.status}`}>
                    {tournament.status === 'upcoming' && '📅 Próximo'}
                    {tournament.status === 'ongoing' && '🔴 Em Andamento'}
                    {tournament.status === 'finished' && '✓ Finalizado'}
                  </span>
                </div>
                <div className="tournament-info">
                  <p><strong>Data:</strong> {new Date(tournament.date).toLocaleDateString('pt-BR')}</p>
                  <p><strong>Times:</strong> {tournament.teams}</p>
                  <p><strong>Partidas:</strong> {tournament.matches}</p>
                </div>
                <button className="btn-details">Ver Detalhes →</button>
              </div>
            ))}
          </div>
        </section>

        <section className="training-section">
          <h2>Programação de Treinos</h2>
          <div className="training-schedule">
            <div className="training-card">
              <h3>🏃 Segunda-feira</h3>
              <p><strong>Horário:</strong> 19:00 - 20:30</p>
              <p><strong>Local:</strong> Campo do Parque</p>
              <p><strong>Foco:</strong> Técnica e Passe</p>
            </div>
            <div className="training-card">
              <h3>🏃 Quarta-feira</h3>
              <p><strong>Horário:</strong> 19:00 - 20:30</p>
              <p><strong>Local:</strong> Campo Municipal</p>
              <p><strong>Foco:</strong> Táticas e Jogadas</p>
            </div>
            <div className="training-card">
              <h3>🏃 Sexta-feira</h3>
              <p><strong>Horário:</strong> 19:00 - 20:30</p>
              <p><strong>Local:</strong> Campo do Parque</p>
              <p><strong>Foco:</strong> Condicionamento Físico</p>
            </div>
            <div className="training-card">
              <h3>⚽ Sábado</h3>
              <p><strong>Horário:</strong> 19:00 - 21:00</p>
              <p><strong>Local:</strong> Campo do Parque</p>
              <p><strong>Foco:</strong> Jogo Amistoso / Competitivo</p>
            </div>
          </div>
        </section>

        <section className="resources-section">
          <h2>Recursos & Desenvolvimento</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>📚 Guia de Regras</h3>
              <p>Conheça as regras oficiais do futebol feminino e das competições.</p>
              <button className="btn-resource">Acessar</button>
            </div>
            <div className="resource-card">
              <h3>🎥 Vídeos de Treino</h3>
              <p>Assista a vídeos de técnicas, táticas e preparação física.</p>
              <button className="btn-resource">Acessar</button>
            </div>
            <div className="resource-card">
              <h3>👥 Mentoria</h3>
              <p>Conecte-se com técnicas e atletas experientes para orientação.</p>
              <button className="btn-resource">Acessar</button>
            </div>
            <div className="resource-card">
              <h3>📊 Análise de Desempenho</h3>
              <p>Acompanhe seu desempenho individual e coletivo.</p>
              <button className="btn-resource">Acessar</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="competitive-footer">
        <p>&copy; 2026 Wakanda FC Manager - Gestão Colaborativa & Inclusiva</p>
        <p>Projeto de Extensão: Transição do Lazer para o Competitivo</p>
      </footer>
    </div>
  );
}
