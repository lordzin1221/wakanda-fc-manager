import { useState } from 'react';
import '../styles/AdminDashboard.css';
import { generateReport } from '../services/reportGenerator';

interface AdminDashboardProps {
  adminName: string;
  onNavigate: (page: 'home' | 'register' | 'dashboard' | 'communication' | 'competitive' | 'admin') => void;
  onLogout: () => void;
}

interface User {
  id: number;
  name: string;
  email: string;
  position: string;
  experience: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalGames: number;
  totalMessages: number;
  systemUptime: string;
}

export default function AdminDashboard({ adminName, onNavigate, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'games' | 'reports' | 'settings'>('overview');
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Ana Silva', email: 'ana@example.com', position: 'Atacante', experience: 'Intermediária', joinDate: '2026-01-15', status: 'active' },
    { id: 2, name: 'Maria Santos', email: 'maria@example.com', position: 'Meia', experience: 'Avançada', joinDate: '2026-01-20', status: 'active' },
    { id: 3, name: 'Juliana Costa', email: 'juliana@example.com', position: 'Defensora', experience: 'Iniciante', joinDate: '2026-02-10', status: 'active' },
    { id: 4, name: 'Carla Oliveira', email: 'carla@example.com', position: 'Goleira', experience: 'Profissional', joinDate: '2026-01-05', status: 'active' },
  ]);

  const [stats] = useState<SystemStats>({
    totalUsers: 24,
    activeUsers: 20,
    totalGames: 48,
    totalMessages: 1250,
    systemUptime: '99.8%',
  });

  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');

  const handleAddUser = () => {
    if (newUserEmail.trim()) {
      const newUser: User = {
        id: users.length + 1,
        name: 'Nova Usuária',
        email: newUserEmail,
        position: 'Universal',
        experience: 'Iniciante',
        joinDate: new Date().toISOString().split('T')[0],
        status: 'active',
      };
      setUsers([...users, newUser]);
      setNewUserEmail('');
      setShowAddUser(false);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleToggleUserStatus = (id: number) => {
    setUsers(users.map(u =>
      u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ));
  };

  const handleGenerateReport = (type: string) => {
    generateReport(type, {
      totalUsers: stats.totalUsers,
      activeUsers: stats.activeUsers,
      totalGames: stats.totalGames,
      totalMessages: stats.totalMessages,
    });
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-header-info">
            <h1>🔐 Painel Administrativo</h1>
            <p>Bem-vindo, <strong>{adminName}</strong></p>
          </div>
          <div className="admin-header-actions">
            <button onClick={() => onNavigate('home')} className="btn-nav">Home</button>
            <button onClick={onLogout} className="btn-logout">Sair</button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <nav className="admin-tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Visão Geral
          </button>
          <button
            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Usuárias
          </button>
          <button
            className={`tab ${activeTab === 'games' ? 'active' : ''}`}
            onClick={() => setActiveTab('games')}
          >
            ⚽ Jogos
          </button>
          <button
            className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            📈 Relatórios
          </button>
          <button
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Configurações
          </button>
        </nav>

        <div className="admin-content">
          {/* Visão Geral */}
          {activeTab === 'overview' && (
            <section className="overview-section">
              <h2>Visão Geral do Sistema</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total de Usuárias</h3>
                  <p className="stat-value">{stats.totalUsers}</p>
                  <p className="stat-detail">Ativas: {stats.activeUsers}</p>
                </div>
                <div className="stat-card">
                  <h3>Jogos Registrados</h3>
                  <p className="stat-value">{stats.totalGames}</p>
                  <p className="stat-detail">Este mês</p>
                </div>
                <div className="stat-card">
                  <h3>Mensagens</h3>
                  <p className="stat-value">{stats.totalMessages}</p>
                  <p className="stat-detail">No sistema</p>
                </div>
                <div className="stat-card">
                  <h3>Disponibilidade</h3>
                  <p className="stat-value">{stats.systemUptime}</p>
                  <p className="stat-detail">Uptime</p>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Atividade Recente</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-icon">✓</span>
                    <span className="activity-text">Ana Silva confirmou presença no jogo</span>
                    <span className="activity-time">Há 2 horas</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">💬</span>
                    <span className="activity-text">Maria Santos enviou mensagem no chat</span>
                    <span className="activity-time">Há 30 minutos</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">⚽</span>
                    <span className="activity-text">Novo jogo agendado para 25/04</span>
                    <span className="activity-time">Há 1 hora</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">👤</span>
                    <span className="activity-text">Juliana Costa criou nova conta</span>
                    <span className="activity-time">Há 5 horas</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Gestão de Usuárias */}
          {activeTab === 'users' && (
            <section className="users-section">
              <div className="section-header">
                <h2>Gestão de Usuárias</h2>
                <button onClick={() => setShowAddUser(!showAddUser)} className="btn-add">
                  {showAddUser ? '✕ Cancelar' : '+ Adicionar Usuária'}
                </button>
              </div>

              {showAddUser && (
                <div className="add-user-form">
                  <div className="form-group">
                    <label htmlFor="email">Email da Nova Usuária</label>
                    <input
                      type="email"
                      id="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      placeholder="usuario@example.com"
                    />
                  </div>
                  <button onClick={handleAddUser} className="btn-confirm">Adicionar</button>
                </div>
              )}

              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Posição</th>
                      <th>Experiência</th>
                      <th>Data de Entrada</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.position}</td>
                        <td>{user.experience}</td>
                        <td>{new Date(user.joinDate).toLocaleDateString('pt-BR')}</td>
                        <td>
                          <span className={`status ${user.status}`}>
                            {user.status === 'active' ? '🟢 Ativa' : '🔴 Inativa'}
                          </span>
                        </td>
                        <td className="actions">
                          <button
                            onClick={() => handleToggleUserStatus(user.id)}
                            className="btn-toggle"
                          >
                            {user.status === 'active' ? 'Desativar' : 'Ativar'}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="btn-delete"
                          >
                            Deletar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Gestão de Jogos */}
          {activeTab === 'games' && (
            <section className="games-section">
              <h2>Gestão de Jogos</h2>
              <div className="games-info">
                <div className="info-card">
                  <h3>Próximos Jogos</h3>
                  <p className="number">5</p>
                  <p className="detail">Agendados para os próximos 30 dias</p>
                </div>
                <div className="info-card">
                  <h3>Jogos Este Mês</h3>
                  <p className="number">12</p>
                  <p className="detail">Já realizados</p>
                </div>
                <div className="info-card">
                  <h3>Taxa de Presença Média</h3>
                  <p className="number">87%</p>
                  <p className="detail">De confirmação</p>
                </div>
              </div>
              <p className="coming-soon">Ferramentas avançadas de gestão de jogos em breve...</p>
            </section>
          )}

          {/* Relatórios */}
          {activeTab === 'reports' && (
            <section className="reports-section">
              <h2>Relatórios e Estatísticas</h2>
              <div className="reports-grid">
                <div className="report-card">
                  <h3>📊 Relatório de Usuárias</h3>
                  <p>Análise completa de cadastros, atividades e engajamento</p>
                  <button className="btn-report" onClick={() => handleGenerateReport('users')}>Gerar Relatório</button>
                </div>
                <div className="report-card">
                  <h3>⚽ Relatório de Jogos</h3>
                  <p>Estatísticas de jogos, presença e desempenho</p>
                  <button className="btn-report" onClick={() => handleGenerateReport('games')}>Gerar Relatório</button>
                </div>
                <div className="report-card">
                  <h3>💬 Relatório de Comunicação</h3>
                  <p>Análise de mensagens, fórum e engajamento</p>
                  <button className="btn-report" onClick={() => handleGenerateReport('communication')}>Gerar Relatório</button>
                </div>
                <div className="report-card">
                  <h3>📈 Relatório de Crescimento</h3>
                  <p>Evolução da plataforma ao longo do tempo</p>
                  <button className="btn-report" onClick={() => handleGenerateReport('growth')}>Gerar Relatório</button>
                </div>
              </div>
            </section>
          )}

          {/* Configurações */}
          {activeTab === 'settings' && (
            <section className="settings-section">
              <h2>Configurações do Sistema</h2>
              <div className="settings-grid">
                <div className="setting-card">
                  <h3>🔧 Configurações Gerais</h3>
                  <div className="setting-item">
                    <label>Nome da Plataforma</label>
                    <input type="text" value="Wakanda FC Manager" readOnly />
                  </div>
                  <div className="setting-item">
                    <label>Versão</label>
                    <input type="text" value="1.0.0" readOnly />
                  </div>
                </div>

                <div className="setting-card">
                  <h3>🔐 Segurança</h3>
                  <div className="setting-item">
                    <label>Email Admin Autorizado</label>
                    <input type="text" value="samuelrique0@gmail.com" readOnly />
                  </div>
                  <button className="btn-setting">Adicionar Admin</button>
                </div>

                <div className="setting-card">
                  <h3>📧 Notificações</h3>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked /> Notificações por Email
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked /> Alertas de Sistema
                    </label>
                  </div>
                </div>

                <div className="setting-card">
                  <h3>💾 Backup</h3>
                  <p>Última cópia: 14/04/2026 às 10:30</p>
                  <button className="btn-setting">Fazer Backup Agora</button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="admin-footer">
        <p>&copy; 2026 Wakanda FC Manager - Painel Administrativo</p>
        <p>Desenvolvido pela HENRIQUE & CO. REGALIS</p>
      </footer>
    </div>
  );
}
