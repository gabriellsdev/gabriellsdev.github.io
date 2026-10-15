import React from 'react';
import { Project } from '../../data/projects';

interface ProjectIndexListProps {
  projects: Project[];
  onOpenCaseStudy: (slug: string) => void;
}

export const ProjectIndexList: React.FC<ProjectIndexListProps> = ({
  projects,
  onOpenCaseStudy,
}) => {
  return (
    <div className="accessible-list-view" role="list" aria-label="Lista acessível e linear de projetos">
      {projects.map((project) => (
        <article key={project.slug} className="list-project-card" role="listitem">
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
                {project.isPlaceholder ? 'Conceito' : 'Produção'}
              </span>
            </div>
          </div>

          <div className="wheel-card-body">
            <div>
              <h3 className="wheel-card-title">{project.title}</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--gold-accent)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                {project.tagline}
              </div>
              <p className="wheel-card-summary">{project.summary}</p>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => onOpenCaseStudy(project.slug)}
                className="btn btn-primary"
                style={{ flex: 1, fontSize: '0.8rem', padding: '8px 12px' }}
              >
                <span>Estudo de Caso</span>
              </button>

              {project.links.landingPage && (
                <a
                  href={project.links.landingPage}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '8px 12px' }}
                >
                  <span>Abrir Demo</span>
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
