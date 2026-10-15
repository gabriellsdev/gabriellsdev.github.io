import React from 'react';
import { Project } from '../../data/projects';
import { AvailabilityBadge } from './AvailabilityBadge';
import { ProjectGallery } from './ProjectGallery';

interface ProjectCaseStudyProps {
  project: Project;
  onBackToHub: () => void;
}

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({
  project,
  onBackToHub,
}) => {
  return (
    <article className={`case-study-page site-container ${project.visualTheme.themeClass}`}>
      {/* Back to Hub navigation */}
      <div className="case-study-back-bar">
        <button
          type="button"
          onClick={onBackToHub}
          className="case-study-back-link"
          aria-label="Voltar para a página inicial e estante de projetos"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Voltar ao Hub de Projetos</span>
        </button>
      </div>

      {/* Case Study Header */}
      <header className="case-study-header">
        <div className="case-study-meta-row">
          <AvailabilityBadge availability={project.availability} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            Revisado em: {project.lastVerified}
          </span>
        </div>

        <h1 className="case-study-title">{project.title}</h1>
        <p className="case-study-tagline">{project.tagline}</p>

        {/* Action Links */}
        <div className="case-study-links-row">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target={project.links.demo.startsWith('http') ? '_blank' : undefined}
              rel={project.links.demo.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="btn btn-primary"
              aria-label={`Abrir demonstração online de ${project.title}`}
            >
              <span>{project.links.demo.startsWith('http') ? 'Ver Demo Online (Vercel)' : 'Ver Demonstração'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          )}

          {project.links.landingPage && project.links.landingPage !== project.links.demo && (
            <a
              href={project.links.landingPage}
              className="btn btn-gold"
              aria-label={`Acessar a página oficial do projeto ${project.title}`}
            >
              <span>Acessar Projeto</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          )}

          {project.links.repository && (
            <a
              href={project.links.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              aria-label={`Acessar código-fonte de ${project.title} no GitHub`}
            >
              <span>Ver no GitHub</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          )}
        </div>
      </header>

      {/* Transparency Alert Box for Placeholders */}
      {project.isPlaceholder && (
        <div className="transparency-box" role="alert">
          <div className="transparency-box-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Transparência Técnica · Dados em Levantamento</span>
          </div>
          <p>
            Este estudo de caso representa um projeto conceitual ou em fase de prototipagem. As informações
            técnicas, arquitetura e limitações foram identificadas como pendentes de validação direta pelo autor,
            sem inclusão de métricas artificiais.
          </p>
        </div>
      )}

      {/* Main Content & Sidebar Grid */}
      <div className="case-study-layout">
        <main className="case-study-main">
          {/* Summary & Overview */}
          <section className="case-study-section">
            <h2 className="case-study-section-title">Visão Geral & Propósito</h2>
            <p className="case-study-text">{project.summary}</p>
          </section>

          {/* Problem */}
          <section className="case-study-section">
            <h2 className="case-study-section-title">O Problema</h2>
            <p className="case-study-text">{project.problem}</p>
          </section>

          {/* Solution */}
          <section className="case-study-section">
            <h2 className="case-study-section-title">A Solução</h2>
            <p className="case-study-text">{project.solution}</p>
          </section>

          {/* Role & Architecture */}
          <section className="case-study-section">
            <h2 className="case-study-section-title">Papel & Decisões de Arquitetura</h2>
            <p className="case-study-text">
              <strong>Contribuição Pessoal:</strong> {project.role}
            </p>
            <p className="case-study-text">
              <strong>Arquitetura de Software:</strong> {project.architecture}
            </p>
          </section>

          {/* Demonstrable Features */}
          <section className="case-study-section">
            <h2 className="case-study-section-title">Funcionalidades Demonstráveis</h2>
            <ul className="case-study-list">
              {project.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
          </section>

          {/* Known Limitations */}
          <section className="case-study-section">
            <h2 className="case-study-section-title">Limitações Conhecidas & Aprendizados</h2>
            <ul className="case-study-list">
              {project.limitations.map((limit, idx) => (
                <li key={idx}>{limit}</li>
              ))}
            </ul>
          </section>

          {/* Workflow & Repository Engineering Strategy */}
          {project.workflowNotes && (
            <section className="case-study-section">
              <h2 className="case-study-section-title">Fluxo de Versionamento & Engenharia</h2>
              <p className="case-study-text">{project.workflowNotes}</p>
            </section>
          )}

          {/* Media Gallery */}
          {project.media.length > 0 && (
            <section className="case-study-section">
              <h2 className="case-study-section-title">Galeria & Demonstração Visual</h2>
              <ProjectGallery media={project.media} />
            </section>
          )}
        </main>

        {/* Technical Sidebar */}
        <aside className="case-study-sidebar" aria-label="Informações complementares do projeto">
          <div className="sidebar-card">
            <h3 className="sidebar-card-title">Tecnologias Utilizadas</h3>
            <div className="sidebar-tech-stack">
              {project.technologies.map((tech) => (
                <span key={tech} className="sidebar-tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="sidebar-card">
            <h3 className="sidebar-card-title">Disponibilidade Técnica</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Código-Fonte
                </span>
                <span style={{ color: 'var(--text-parchment)', fontFamily: 'var(--font-mono)' }}>
                  {project.availability.sourceCode === 'public'
                    ? 'Disponível no GitHub'
                    : project.availability.sourceCode === 'private'
                    ? 'Privado / Licenciado'
                    : 'Não publicado'}
                </span>
              </div>

              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Execução Local
                </span>
                <span style={{ color: 'var(--text-parchment)', fontFamily: 'var(--font-mono)' }}>
                  {project.availability.localExecution === 'verified'
                    ? 'Testada e Verificada'
                    : 'Não validada / Em construção'}
                </span>
              </div>

              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Serviço / Demo Pública
                </span>
                <span style={{ color: 'var(--text-parchment)', fontFamily: 'var(--font-mono)' }}>
                  {project.availability.publicDemo === 'available'
                    ? 'Ativa no GitHub Pages'
                    : project.availability.publicDemo === 'in-development'
                    ? 'Em Desenvolvimento'
                    : 'Indisponível'}
                </span>
              </div>
            </div>
          </div>

          {/* Links for NFS-e legal documents if slug is nfse-nacional */}
          {project.slug === 'nfse-nacional' && (
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Documentação Legal</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                <a href="./nfse-nacional/privacidade.html" style={{ color: 'var(--gold-accent)' }}>
                  ▸ Política de Privacidade
                </a>
                <a href="./nfse-nacional/eula.html" style={{ color: 'var(--gold-accent)' }}>
                  ▸ Termos de Uso (EULA)
                </a>
              </div>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
};
