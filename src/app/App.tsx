import React from 'react';
import { useRouter } from '../lib/router';
import { PROJECTS } from '../data/projects';
import { SkipLink } from '../components/shell/SkipLink';
import { SiteHeader } from '../components/shell/SiteHeader';
import { SiteFooter } from '../components/shell/SiteFooter';
import { HomeHero } from '../components/home/HomeHero';
import { WorksWheel } from '../components/works/WorksWheel';
import { ProjectCaseStudy } from '../components/projects/ProjectCaseStudy';

export const App: React.FC = () => {
  const { route, navigate } = useRouter();

  const handleOpenCaseStudy = (slug: string) => {
    navigate(`/projects/${slug}`);
  };

  const handleScrollToWorks = () => {
    const el = document.getElementById('works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SkipLink />
      <SiteHeader
        onNavigateHome={() => navigate('/')}
        onNavigateWorks={() => {
          if (route.type !== 'home') {
            navigate('/');
            setTimeout(handleScrollToWorks, 100);
          } else {
            handleScrollToWorks();
          }
        }}
        currentRoute={route.type === 'home' ? 'home' : 'works'}
      />

      <main id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
        {route.type === 'home' && (
          <div className="home-container site-container">
            {/* Hero Section with ASCII Portrait */}
            <HomeHero onExploreProjects={handleScrollToWorks} />

            {/* Editorial Gothic Divider */}
            <div className="editorial-divider" aria-hidden="true">
              <div className="editorial-divider-mark">
                <span>✦</span>
                <span style={{ fontSize: '0.8rem', letterSpacing: '0.3em' }}>ARS · INGENIUM · VERITAS</span>
                <span>✦</span>
              </div>
            </div>

            {/* Works Section Header */}
            <div className="works-section-header">
              <span className="works-section-badge">Estante de Engenharia</span>
              <h2 className="works-section-title">Projetos & Aplicações Autônomas</h2>
              <p className="works-section-desc">
                Soluções fiscais em produção, arquitetura CSS pura e protótipos de sistemas. Selecione
                um projeto para examinar a análise técnica detalhada.
              </p>
            </div>

            {/* 3D Works Wheel & Diagnosis Panel */}
            <WorksWheel
              projects={PROJECTS}
              onOpenCaseStudy={handleOpenCaseStudy}
            />
          </div>
        )}

        {route.type === 'project' && (() => {
          const project = PROJECTS.find((p) => p.slug === route.slug);
          if (!project) {
            return (
              <div className="site-container" style={{ padding: '80px 24px', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '16px' }}>
                  Projeto Não Encontrado
                </h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                  O identificador especificado não corresponde a nenhum projeto catalogado.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="btn btn-primary"
                >
                  Voltar ao Hub Principal
                </button>
              </div>
            );
          }

          return (
            <ProjectCaseStudy
              project={project}
              onBackToHub={() => navigate('/')}
            />
          );
        })()}

        {route.type === 'not-found' && (
          <div className="site-container" style={{ padding: '80px 24px', textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '16px' }}>
              404 — Página Não Encontrada
            </h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
              O recurso que você tentou acessar não foi localizado neste portal.
            </p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-primary"
            >
              Retornar ao Hub de Projetos
            </button>
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
};
