import React from 'react';

export const SiteFooter: React.FC = () => {
  return (
    <footer
      style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'rgba(5, 4, 6, 0.95)',
        padding: '40px 0 32px',
      }}
    >
      <div className="site-container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '24px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                color: 'var(--text-parchment)',
                marginBottom: '4px',
              }}
            >
              Gabriel Vinicius dos Santos
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-dim)',
              }}
            >
              Toledo, Paraná — Brasil · Engenharia Front-End & Web Standards
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
            }}
          >
            <a
              href="https://magi-six.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)' }}
            >
              MAGI-System (Vercel)
            </a>
            <span style={{ color: 'var(--border-medium)' }}>·</span>
            <a href="./jardim-web/" style={{ color: 'var(--text-muted)' }}>
              Jardim Web
            </a>
            <span style={{ color: 'var(--border-medium)' }}>·</span>
            <a
              href="https://www.linkedin.com/in/gabrielvindev"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--gold-accent)' }}
            >
              LinkedIn
            </a>
            <span style={{ color: 'var(--border-medium)' }}>·</span>
            <a
              href="https://github.com/gabriellsdev"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--gold-accent)' }}
            >
              GitHub
            </a>
            <span style={{ color: 'var(--border-medium)' }}>·</span>
            <a
              href="mailto:gabriel.v.santos23@gmail.com"
              style={{ color: 'var(--text-muted)' }}
            >
              gabriel.v.santos23@gmail.com
            </a>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            fontSize: '0.78rem',
            color: 'var(--text-dim)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div>
            © 2026 Gabriel Vinicius. Construído com React, TypeScript, CSS Puro e Canvas 2D.
          </div>
          <div>Acessibilidade WCAG 2.2 AA · Publicado via GitHub Pages</div>
        </div>
      </div>
    </footer>
  );
};
