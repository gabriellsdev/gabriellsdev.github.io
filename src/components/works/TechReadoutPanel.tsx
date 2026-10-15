import React from 'react';
import { Project } from '../../data/projects';

interface TechReadoutPanelProps {
  project: Project;
  onOpenCaseStudy: () => void;
}

export const TechReadoutPanel: React.FC<TechReadoutPanelProps> = ({
  project,
  onOpenCaseStudy,
}) => {
  return (
    <aside className="tech-panel" aria-labelledby="tech-panel-heading">
      {/* Level 1: Identification */}
      <div className="tech-panel-header">
        <span className="tech-panel-tag">DIAGNÓSTICO TÉCNICO // 0{project.slug === 'nfse-nacional' ? '1' : project.slug === 'jardim-web' ? '2' : project.slug === 'magi-system' ? '3' : '4'}</span>
        <div className="tech-panel-status">
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: project.isPlaceholder ? '#f59e0b' : '#10b981',
              display: 'inline-block',
            }}
          />
          <span style={{ color: project.isPlaceholder ? '#f59e0b' : '#34d399' }}>
            {project.isPlaceholder ? 'PROTÓTIPO / WIP' : 'PRODUÇÃO VERIFICADA'}
          </span>
        </div>
      </div>

      <h3 id="tech-panel-heading" className="tech-panel-title">
        {project.title}
      </h3>
      <div className="tech-panel-tagline">{project.tagline}</div>

      {/* Level 2: Technical Architecture */}
      <div className="tech-readout-grid">
        <div className="readout-cell">
          <span className="readout-label">Código-Fonte:</span>
          <span className="readout-value">
            {project.availability.sourceCode === 'public'
              ? 'Público (GitHub)'
              : project.availability.sourceCode === 'private'
              ? 'Privado / Comercial'
              : 'Não Publicado'}
          </span>
        </div>

        <div className="readout-cell">
          <span className="readout-label">Execução Local:</span>
          <span className="readout-value">
            {project.availability.localExecution === 'verified'
              ? 'Verificada'
              : 'Pendente / Não Aplicável'}
          </span>
        </div>

        <div className="readout-cell">
          <span className="readout-label">Demonstração Pública:</span>
          <span className="readout-value">
            {project.availability.publicDemo === 'available'
              ? 'Ativa'
              : project.availability.publicDemo === 'in-development'
              ? 'Em Desenvolvimento'
              : 'Indisponível'}
          </span>
        </div>

        <div className="readout-cell">
          <span className="readout-label">Última Revisão:</span>
          <span className="readout-value">{project.lastVerified}</span>
        </div>
      </div>

      {/* Stack Chips */}
      <div className="tech-tags-list" aria-label="Tecnologias utilizadas no projeto">
        {project.technologies.slice(0, 5).map((tech) => (
          <span key={tech} className="tech-tag-chip">
            {tech}
          </span>
        ))}
        {project.technologies.length > 5 && (
          <span className="tech-tag-chip" style={{ color: 'var(--gold-accent)' }}>
            +{project.technologies.length - 5}
          </span>
        )}
      </div>

      {/* Level 3: Professional Value & Problem Statement */}
      <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginBottom: '16px' }}>
        <strong style={{ color: 'var(--gold-light)' }}>Problema resolvido:</strong> {project.problem}
      </p>

      {/* Action Buttons */}
      <div className="tech-panel-actions">
        <button
          type="button"
          onClick={onOpenCaseStudy}
          className="btn btn-primary"
          style={{ flex: 1 }}
        >
          <span>Estudo de Caso Completo</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        {(project.links.demo || project.links.landingPage) ? (
          <a
            href={project.links.demo || project.links.landingPage}
            target={project.links.demo?.startsWith('http') ? '_blank' : undefined}
            rel={project.links.demo?.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="btn btn-secondary"
            title="Acessar demonstração online ou página do projeto"
          >
            <span>{project.links.demo?.startsWith('http') ? 'Ver Demo Online' : 'Acessar Projeto'}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        ) : project.links.repository ? (
          <a
            href={project.links.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            title="Ver código-fonte no GitHub"
          >
            <span>Ver no GitHub</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        ) : null}
      </div>
    </aside>
  );
};
