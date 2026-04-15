import '../styles/Home.css';

interface HomeProps {
  onNavigate: (page: 'home' | 'register' | 'dashboard' | 'communication' | 'competitive' | 'admin-login' | 'admin') => void;
  isLoggedIn: boolean;
  onAdminAccess?: () => void;
}

export default function Home({ onNavigate, isLoggedIn, onAdminAccess }: HomeProps) {
  return (
    <div className="home">
      <header className="header">
        <div className="header-content">
          <img src="/wakanda-logo.png" alt="Wakanda FC Logo" className="logo" />
          <h1>Wakanda FC Manager</h1>
          <p className="tagline">Gestão Colaborativa & Inclusiva para Futebol Feminino</p>
        </div>
      </header>

      <main className="home-main">
        <section className="hero">
          <div className="hero-content">
            <h2>Bem-vinda ao Wakanda FC!</h2>
            <p>
              Uma plataforma desenvolvida pela <strong>HENRIQUE & CO. REGALIS</strong> para transformar
              a gestão de patotas de futebol feminino, promovendo inclusão, acessibilidade e a transição
              do lazer para o competitivo.
            </p>
          </div>
        </section>

        <section className="features">
          <h2>Funcionalidades Principais</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>💬 Comunicação</h3>
              <p>Chat integrado, avisos de jogos e fórum para discussões da patota.</p>
            </div>
            <div className="feature-card">
              <h3>📋 Coordenação</h3>
              <p>Gestão de presença, horários, locais e divisão de times.</p>
            </div>
            <div className="feature-card">
              <h3>🤝 Cooperação</h3>
              <p>Gestão de finanças, pagamentos e avaliações de jogos.</p>
            </div>
            <div className="feature-card">
              <h3>♿ Acessibilidade</h3>
              <p>Totalmente acessível com suporte WCAG para todos.</p>
            </div>
            <div className="feature-card">
              <h3>🏆 Competitivo</h3>
              <p>Ferramentas para transição do lazer para competições oficiais.</p>
            </div>
            <div className="feature-card">
              <h3>📊 Análise</h3>
              <p>Estatísticas e histórico de desempenho do time.</p>
            </div>
          </div>
        </section>

        <section className="about">
          <h2>Sobre o Projeto</h2>
          <div className="about-content">
            <p>
              Este projeto é uma atividade de extensão universitária que busca criar uma solução
              colaborativa para a gestão de patotas de futebol com suporte total à acessibilidade.
            </p>
            <p>
              Desenvolvido com base no <strong>Modelo 3C de Colaboração</strong> (Comunicação, Cooperação e Coordenação),
              seguindo as diretrizes de acessibilidade <strong>WCAG</strong>, padrões de <strong>Material Design</strong>
              e <strong>Heurísticas de Nielsen</strong> para garantir a melhor experiência de usuário.
            </p>
            <p>
              Nosso objetivo é fortalecer os laços sociais, promover a prática esportiva inclusiva
              e preparar as atletas para o competitivo.
            </p>
          </div>
        </section>

        <section className="cta">
          <h2>Comece Agora!</h2>
          <div className="cta-buttons">
            {!isLoggedIn ? (
              <>
                <button onClick={() => onNavigate('register')} className="btn-primary">
                  Criar Conta
                </button>
                <button onClick={() => onNavigate('register')} className="btn-secondary">
                  Entrar
                </button>
              </>
            ) : (
              <button onClick={() => onNavigate('dashboard')} className="btn-primary">
                Ir para Dashboard
              </button>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Wakanda FC Manager. Desenvolvido com ❤️ pela HENRIQUE & CO. REGALIS</p>
        <p>Projeto de Extensão Universitária - Gestão Colaborativa de Patotas de Futebol com Acessibilidade</p>
        {onAdminAccess && (
          <button onClick={onAdminAccess} className="btn-admin-footer" title="Acesso Administrativo">
            🔐 Admin
          </button>
        )}
      </footer>
    </div>
  );
}
