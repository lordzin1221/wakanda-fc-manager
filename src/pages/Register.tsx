import { useState } from 'react';
import '../styles/Register.css';

interface RegisterProps {
  onRegister: (name: string) => void;
  onNavigate: (page: 'home' | 'register' | 'dashboard' | 'communication' | 'competitive') => void;
}

export default function Register({ onRegister, onNavigate }: RegisterProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    accessibility: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (!formData.position) {
      newErrors.position = 'Posição é obrigatória';
    }

    if (!formData.experience) {
      newErrors.experience = 'Nível de experiência é obrigatório';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não correspondem';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      onRegister(formData.fullName);
    } else {
      setErrors(newErrors);
    }
  };

  if (isSubmitted) {
    return (
      <div className="register-container">
        <div className="success-message">
          <h1>✓ Bem-vinda ao Wakanda FC!</h1>
          <p>Sua conta foi criada com sucesso, {formData.fullName}!</p>
          <p>Agora você pode acessar todas as funcionalidades da plataforma.</p>
          <button onClick={() => onNavigate('dashboard')} className="btn-success">
            Ir para Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <img src="/wakanda-logo.png" alt="Wakanda FC Logo" className="register-logo" />
          <h1>Cadastro - Wakanda FC</h1>
          <p>Junte-se à nossa comunidade de futebol feminino</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-section">
            <h2>Informações Pessoais</h2>

            <div className="form-group">
              <label htmlFor="fullName">Nome Completo *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Seu nome completo"
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
              {errors.fullName && <span id="fullName-error" className="error">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu.email@exemplo.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <span id="email-error" className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(XX) XXXXX-XXXX"
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && <span id="phone-error" className="error">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-section">
            <h2>Informações Esportivas</h2>

            <div className="form-group">
              <label htmlFor="position">Posição no Campo *</label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                aria-describedby={errors.position ? 'position-error' : undefined}
              >
                <option value="">Selecione uma posição</option>
                <option value="goleira">Goleira</option>
                <option value="defensora">Defensora</option>
                <option value="meia">Meia</option>
                <option value="atacante">Atacante</option>
                <option value="universal">Universal</option>
              </select>
              {errors.position && <span id="position-error" className="error">{errors.position}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="experience">Nível de Experiência *</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                aria-describedby={errors.experience ? 'experience-error' : undefined}
              >
                <option value="">Selecione seu nível</option>
                <option value="iniciante">Iniciante (Menos de 1 ano)</option>
                <option value="intermediaria">Intermediária (1-3 anos)</option>
                <option value="avancada">Avançada (3-5 anos)</option>
                <option value="profissional">Profissional (Mais de 5 anos)</option>
              </select>
              {errors.experience && <span id="experience-error" className="error">{errors.experience}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="accessibility">Necessidades de Acessibilidade</label>
              <textarea
                id="accessibility"
                name="accessibility"
                value={formData.accessibility}
                onChange={handleChange}
                placeholder="Descreva qualquer necessidade de acessibilidade (opcional)"
                rows={3}
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Segurança</h2>

            <div className="form-group">
              <label htmlFor="password">Senha *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password && <span id="password-error" className="error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Senha *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme sua senha"
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              />
              {errors.confirmPassword && <span id="confirmPassword-error" className="error">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Criar Conta
            </button>
            <button type="button" onClick={() => onNavigate('home')} className="btn-cancel">
              Voltar
            </button>
          </div>

          <p className="form-note">
            * Campos obrigatórios. Seus dados serão protegidos de acordo com nossa política de privacidade.
          </p>
        </form>
      </div>
    </div>
  );
}
