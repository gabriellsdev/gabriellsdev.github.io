import React from 'react';
import { Project } from '../../data/projects';

interface ProjectCard3DProps {
  project: Project;
  isActive: boolean;
  onSelect: () => void;
  onOpenCaseStudy: () => void;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  project,
  isActive,
  onSelect,
  onOpenCaseStudy,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenCaseStudy();
    }
  };

  return (
    <div
      className={`wheel-card ${isActive ? 'is-active' : ''}`}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      tabIndex={isActive ? 0 : -1}
      role="button"
      aria-pressed={isActive}
      aria-label={`Projeto: ${project.title}. ${project.tagline}. Pressione Enter para abrir estudo de caso.`}
    >
      <div className="wheel-card-cover-box">
        <img
          src={project.cover.src}
          alt={project.cover.alt}
          className="wheel-card-cover-img"
          loading="lazy"
        />
        <div className="wheel-card-badge">
          <span
            className="badge-tag"
            style={{
              backgroundColor: project.visualTheme.badgeBg,
              color: project.visualTheme.badgeText,
              border: `1px solid ${project.visualTheme.primaryColor}`,
            }}
          >
            {project.isPlaceholder ? 'Conceito / WIP' : 'Verificado'}
          </span>
        </div>
      </div>

      <div className="wheel-card-body">
        <div>
          <h3 className="wheel-card-title">{project.title}</h3>
          <p className="wheel-card-summary">{project.summary}</p>
        </div>

        <div className="wheel-card-action-bar">
          <span style={{ color: project.visualTheme.primaryColor, fontWeight: 600 }}>
            {project.availability.publicDemo === 'available' ? '● Demo Disponível' : '○ Em Desenvolvimento'}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenCaseStudy();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--gold-accent)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>Ver Estudo</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
