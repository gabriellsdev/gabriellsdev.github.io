import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../../data/projects';
import { ProjectCard3D } from './ProjectCard3D';
import { TechReadoutPanel } from './TechReadoutPanel';
import { ProjectIndexList } from './ProjectIndexList';

interface WorksWheelProps {
  projects: Project[];
  onOpenCaseStudy: (slug: string) => void;
}

export const WorksWheel: React.FC<WorksWheelProps> = ({
  projects,
  onOpenCaseStudy,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'wheel' | 'list'>('wheel');
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Swipe / Drag tracking
  const pointerStartX = useRef<number | null>(null);
  const pointerStartTime = useRef<number>(0);

  const numProjects = projects.length;
  const angleStep = 360 / numProjects;
  const radius = 280; // Distance from center in pixels for perspective carousel

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setViewMode('list');
    }
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? numProjects - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === numProjects - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (viewMode !== 'wheel') return;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setCurrentIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setCurrentIndex(numProjects - 1);
    }
  };

  // Pointer drag events
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
    pointerStartTime.current = Date.now();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const deltaX = e.clientX - pointerStartX.current;
    const deltaTime = Date.now() - pointerStartTime.current;

    // Minimum swipe threshold: 40px and less than 800ms
    if (Math.abs(deltaX) > 40 && deltaTime < 800) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    pointerStartX.current = null;
  };

  const activeProject = projects[currentIndex] || projects[0];

  return (
    <section
      id="works-section"
      className="works-wrapper"
      aria-label="Catálogo e Estante de Projetos"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Top Controls Bar */}
      <div className="wheel-top-bar">
        <div className="wheel-instruction">
          <span className="kbd-badge">←</span>
          <span className="kbd-badge">→</span>
          <span>Navegue com setas do teclado ou arraste</span>
        </div>

        {/* View Mode Toggle */}
        <div className="view-mode-toggle" role="group" aria-label="Modo de visualização dos projetos">
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'wheel' ? 'active' : ''}`}
            onClick={() => setViewMode('wheel')}
            aria-pressed={viewMode === 'wheel'}
          >
            Órbita 3D
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-pressed={viewMode === 'list'}
          >
            Lista Acessível
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <ProjectIndexList projects={projects} onOpenCaseStudy={onOpenCaseStudy} />
      ) : (
        <div className="wheel-layout">
          {/* 3D Wheel Stage */}
          <div
            ref={stageRef}
            className="wheel-stage-container"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            role="region"
            aria-roledescription="carrossel 3d"
            aria-label="Carrossel 3D orbital de projetos"
          >
            <div className="wheel-orbital-ring" aria-hidden="true" />

            {/* Navigation buttons */}
            <button
              type="button"
              className="wheel-nav-btn wheel-nav-btn--prev"
              onClick={handlePrev}
              aria-label="Projeto anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              className="wheel-nav-btn wheel-nav-btn--next"
              onClick={handleNext}
              aria-label="Próximo projeto"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Carousel Track */}
            <div
              className="wheel-carousel"
              style={{
                transform: `translateZ(-${radius}px) rotateY(${-currentIndex * angleStep}deg)`,
              }}
            >
              {projects.map((project, idx) => {
                const angle = idx * angleStep;
                const isActive = idx === currentIndex;

                return (
                  <div
                    key={project.slug}
                    className="wheel-card-wrapper"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px) scale(${isActive ? 1.02 : 0.88})`,
                      opacity: isActive ? 1 : 0.45,
                      pointerEvents: isActive ? 'auto' : 'auto',
                    }}
                  >
                    <ProjectCard3D
                      project={project}
                      isActive={isActive}
                      onSelect={() => setCurrentIndex(idx)}
                      onOpenCaseStudy={() => onOpenCaseStudy(project.slug)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technical Diagnosis Panel for selected project */}
          <TechReadoutPanel
            project={activeProject}
            onOpenCaseStudy={() => onOpenCaseStudy(activeProject.slug)}
          />
        </div>
      )}

      {/* Pagination dots / selector */}
      <div className="wheel-dots-container" role="tablist" aria-label="Indicadores de projetos">
        {projects.map((project, idx) => (
          <button
            key={project.slug}
            type="button"
            className={`wheel-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            role="tab"
            aria-selected={idx === currentIndex}
            aria-label={`Selecionar projeto ${idx + 1}: ${project.title}`}
          />
        ))}
      </div>
    </section>
  );
};
