import React from 'react';

interface SiteHeaderProps {
  onNavigateHome: () => void;
  onNavigateWorks: () => void;
  currentRoute: string;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  onNavigateHome,
  onNavigateWorks,
  currentRoute,
}) => {
  return (
    <header
      style={{
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'rgba(5, 4, 6, 0.85)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="site-container"
        style={{
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand / Logo */}
        <button
          onClick={onNavigateHome}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
          aria-label="Ir para a página inicial de Gabriel Vinicius"
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--wine-accent) 0%, #1e0509 100%)',
              border: '1px solid var(--border-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold-light)',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: '1.1rem',
            }}
          >
            G
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--text-parchment)',
                lineHeight: 1.2,
              }}
            >
              Gabriel Vinicius
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--gold-accent)',
                letterSpacing: '0.04em',
              }}
            >
              gabriellsdev.github.io
            </div>
          </div>
        </button>

        {/* Global Navigation */}
        <nav
          aria-label="Navegação principal"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <button
            onClick={onNavigateHome}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: currentRoute === 'home' ? 'var(--gold-light)' : 'var(--text-muted)',
              borderBottom: currentRoute === 'home' ? '2px solid var(--gold-accent)' : '2px solid transparent',
              padding: '6px 2px',
              cursor: 'pointer',
              transition: 'color var(--transition-fast)',
            }}
          >
            Início
          </button>

          <button
            onClick={onNavigateWorks}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: currentRoute === 'works' ? 'var(--gold-light)' : 'var(--text-muted)',
              borderBottom: currentRoute === 'works' ? '2px solid var(--gold-accent)' : '2px solid transparent',
              padding: '6px 2px',
              cursor: 'pointer',
              transition: 'color var(--transition-fast)',
            }}
          >
            Projetos
          </button>

          <a
            href="https://www.linkedin.com/in/gabrielvindev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: 'var(--text-parchment)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(245, 238, 228, 0.05)',
              border: '1px solid var(--border-subtle)',
            }}
            aria-label="Perfil de Gabriel Vinicius no LinkedIn (abre em nova aba)"
          >
            <span>LinkedIn</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>

          <a
            href="https://github.com/gabriellsdev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: 'var(--text-parchment)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(245, 238, 228, 0.05)',
              border: '1px solid var(--border-subtle)',
            }}
            aria-label="Perfil de Gabriel Vinicius no GitHub (abre em nova aba)"
          >
            <span>GitHub</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
};
