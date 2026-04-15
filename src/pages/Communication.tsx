import { useState } from 'react';
import '../styles/Communication.css';

interface CommunicationProps {
  userName: string;
  onNavigate: (page: 'home' | 'register' | 'dashboard' | 'communication' | 'competitive') => void;
  onLogout: () => void;
}

interface Message {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  type: 'message' | 'announcement';
}

export default function Communication({ userName, onNavigate, onLogout }: CommunicationProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, author: 'Coordenadora', content: '📢 Bem-vinda ao chat do Wakanda FC!', timestamp: '10:30', type: 'announcement' },
    { id: 2, author: 'Ana Silva', content: 'Oi meninas! Tudo bem?', timestamp: '10:35', type: 'message' },
    { id: 3, author: 'Maria Santos', content: 'Tudo certo! Vocês vão no jogo de sábado?', timestamp: '10:40', type: 'message' },
    { id: 4, author: 'Coordenadora', content: '📢 Lembrete: Jogo confirmado para 18/04 às 19h no Campo do Parque', timestamp: '11:00', type: 'announcement' },
    { id: 5, author: 'Juliana Costa', content: 'Vou levar garrafas de água!', timestamp: '11:05', type: 'message' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'forum' | 'announcements'>('chat');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        author: userName,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        type: 'message',
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'announcements') return msg.type === 'announcement';
    return msg.type === 'message';
  });

  return (
    <div className="communication">
      <header className="communication-header">
        <div className="header-content">
          <div className="header-info">
            <h1>💬 Comunicação - Wakanda FC</h1>
            <p>Conecte-se com sua patota</p>
          </div>
          <div className="header-actions">
            <button onClick={() => onNavigate('dashboard')} className="nav-btn">← Dashboard</button>
            <button onClick={() => onNavigate('competitive')} className="nav-btn">🏆 Competitivo</button>
            <button onClick={onLogout} className="nav-btn logout">Sair</button>
          </div>
        </div>
      </header>

      <main className="communication-main">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            💬 Chat
          </button>
          <button
            className={`tab ${activeTab === 'forum' ? 'active' : ''}`}
            onClick={() => setActiveTab('forum')}
          >
            💭 Fórum
          </button>
          <button
            className={`tab ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            📢 Avisos
          </button>
        </div>

        <div className="communication-content">
          {activeTab === 'chat' && (
            <div className="chat-section">
              <div className="messages-container">
                {filteredMessages.map(msg => (
                  <div key={msg.id} className={`message ${msg.author === userName ? 'own' : ''}`}>
                    <div className="message-header">
                      <strong>{msg.author}</strong>
                      <span className="timestamp">{msg.timestamp}</span>
                    </div>
                    <div className="message-content">
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="message-form">
                <div className="input-group">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Digite sua mensagem aqui..."
                    rows={3}
                    aria-label="Campo de mensagem"
                  />
                  <button type="submit" className="btn-send">
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'forum' && (
            <div className="forum-section">
              <div className="forum-topics">
                <div className="forum-topic">
                  <h3>Como melhorar a técnica de passe?</h3>
                  <p className="author">Iniciado por: Ana Silva</p>
                  <p className="content">
                    Alguém tem dicas de treinos para melhorar a precisão do passe? Estou querendo evoluir nessa habilidade.
                  </p>
                  <div className="topic-meta">
                    <span>👥 5 respostas</span>
                    <span>📅 Há 2 dias</span>
                  </div>
                </div>

                <div className="forum-topic">
                  <h3>Dúvidas sobre o campeonato competitivo</h3>
                  <p className="author">Iniciado por: Maria Santos</p>
                  <p className="content">
                    Alguém sabe quando começam as inscrições para o campeonato feminino? Vocês têm interesse em participar?
                  </p>
                  <div className="topic-meta">
                    <span>👥 8 respostas</span>
                    <span>📅 Há 1 dia</span>
                  </div>
                </div>

                <div className="forum-topic">
                  <h3>Sugestões para melhorar a patota</h3>
                  <p className="author">Iniciado por: Coordenadora</p>
                  <p className="content">
                    Gostaria de ouvir sugestões de vocês para melhorar a organização e o ambiente da patota.
                  </p>
                  <div className="topic-meta">
                    <span>👥 12 respostas</span>
                    <span>📅 Há 3 dias</span>
                  </div>
                </div>
              </div>

              <button className="btn-new-topic">+ Criar Novo Tópico</button>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="announcements-section">
              {filteredMessages.map(msg => (
                <div key={msg.id} className="announcement">
                  <div className="announcement-header">
                    <h3>{msg.content.split('\n')[0]}</h3>
                    <span className="timestamp">{msg.timestamp}</span>
                  </div>
                  <p className="announcement-content">
                    {msg.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="communication-footer">
        <p>&copy; 2026 Wakanda FC Manager - Gestão Colaborativa & Inclusiva</p>
      </footer>
    </div>
  );
}
