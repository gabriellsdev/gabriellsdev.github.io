import React from 'react';
import { TerminalTelemetry } from './TerminalTelemetry';
import { HomeAsciiHero } from './HomeAsciiHero';
import { PROFILE } from '../../data/profile';

interface HomeHeroProps {
  onExploreProjects: () => void;
  photoSrc?: string; // Optional: provided when user supplies their photograph
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onExploreProjects, photoSrc }) => {
  return (
    <section className="hero-section" aria-labelledby="hero-main-title">
      {/* Editorial Profile Column */}
      <div className="hero-editorial">
        <div className="hero-meta-badge">
          <span className="hero-meta-dot" aria-hidden="true"></span>
          <span>{PROFILE.status}</span>
        </div>

        <h1 id="hero-main-title" className="hero-title">
          {PROFILE.name}
        </h1>

        <div className="hero-subtitle">
          {PROFILE.title} · {PROFILE.location}
        </div>

        <p className="hero-bio">{PROFILE.bio}</p>

        {/* Technical Credentials Matrix */}
        <div className="hero-credentials" aria-label="Credenciais técnicas e histórico profissional">
          <div className="credential-row">
            <span className="credential-label">Atuação:</span>
            <span className="credential-val">Analista de Suporte Técnico na German Tech Sistemas</span>
          </div>
          <div className="credential-row">
            <span className="credential-label">Formação:</span>
            <span className="credential-val">Sistemas para Internet — UTFPR (Universidade Tecnológica Federal do Paraná)</span>
          </div>
          <div className="credential-row">
            <span className="credential-label">Engenharia:</span>
            <span className="credential-val">MAGI-System (Vercel v4.6), React Native (Expo/Supabase), Python, Linux &amp; Redes</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hero-actions">
          <button
            type="button"
            onClick={onExploreProjects}
            className="btn btn-primary"
            aria-label="Navegar até a seção de projetos e explorar estante"
          >
            <span>Explorar Projetos</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </button>

          <a
            href="https://magi-six.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
            aria-label="Abrir demonstração online do MAGI-System na Vercel"
          >
            <span>MAGI-System (Demo Vercel)</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>

          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            aria-label="Acessar o perfil de Gabriel Vinicius no LinkedIn"
          >
            <span>LinkedIn</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            aria-label="Acessar repositórios de Gabriel Vinicius no GitHub"
          >
            <span>GitHub</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>

          <a
            href={PROFILE.links.email}
            className="btn btn-secondary"
            aria-label="Enviar e-mail para Gabriel Vinicius"
          >
            <span>Contato</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Art / Telemetry Column: Displays TerminalTelemetry when no photo is active, or HomeAsciiHero when photo is provided */}
      <div className="hero-art-column" style={{ display: 'flex', justifyContent: 'center' }}>
        {photoSrc ? (
          <HomeAsciiHero imageSrc={photoSrc} />
        ) : (
          <TerminalTelemetry />
        )}
      </div>
    </section>
  );
};
