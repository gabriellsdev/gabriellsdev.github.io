import React, { useRef, useEffect, useState } from 'react';
import { AsciiEngine, AsciiMode } from '../../lib/ascii-renderer';

interface HomeAsciiHeroProps {
  imageSrc?: string;
}

export const HomeAsciiHero: React.FC<HomeAsciiHeroProps> = ({
  imageSrc = './home/portrait.svg',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<AsciiEngine | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<AsciiMode>('characters');
  const [bypass, setBypass] = useState<boolean>(false);
  const [isFocusState, setIsFocusState] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || bypass) return;

    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const engine = new AsciiEngine(canvas, {
        mode,
        cellSize: isFocusState ? 6 : 7,
        density: isFocusState ? 1.0 : 0.88,
        animateAmbient: !prefersReducedMotion,
      });

      engineRef.current = engine;

      // Match canvas dimensions to container
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(300, Math.floor(rect.width));
      const height = Math.max(360, Math.floor(rect.height || width * 1.2));
      engine.resize(width, height);

      engine.loadImage(imageSrc).catch((err) => {
        console.warn('[HomeAsciiHero] Fallback to original image:', err);
      });

      if (!prefersReducedMotion) {
        engine.startAnimation();
      }

      // Handle window resize
      const handleResize = () => {
        if (!canvasRef.current || !engineRef.current) return;
        const newRect = canvasRef.current.getBoundingClientRect();
        engineRef.current.resize(Math.floor(newRect.width), Math.floor(newRect.height || newRect.width * 1.2));
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        engine.destroy();
        engineRef.current = null;
      };
    } catch (e) {
      console.warn('[HomeAsciiHero] Canvas not supported, falling back to standard image', e);
      setBypass(true);
    }
  }, [imageSrc, bypass]);

  // Update engine options when mode or focus state changes
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.updateOptions({
        mode,
        cellSize: isFocusState ? 5 : 7,
        density: isFocusState ? 1.0 : 0.88,
        contrast: isFocusState ? 1.25 : 1.15,
      });
    }
  }, [mode, isFocusState]);

  const handleMouseEnter = () => setIsFocusState(true);
  const handleMouseLeave = () => setIsFocusState(false);
  const handleFocus = () => setIsFocusState(true);
  const handleBlur = () => setIsFocusState(false);

  return (
    <div className="ascii-hero-container">
      <figure
        ref={containerRef}
        className="ascii-frame"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        role="region"
        aria-label="Retrato editorial de Gabriel Vinicius em caracteres ASCII interativos"
      >
        {bypass ? (
          <img
            src={imageSrc}
            alt="Retrato de alto contraste de Gabriel Vinicius com iluminação chiaroscuro"
            className="ascii-original-img"
          />
        ) : (
          <canvas
            ref={canvasRef}
            className="ascii-canvas"
            width={380}
            height={456}
            aria-hidden="true"
          />
        )}

        <figcaption className="sr-only">
          Retrato de Gabriel Vinicius renderizado em tempo real via Canvas 2D com caracteres ASCII,
          matriz de dithering ou meio-tom, respondendo ao foco e permitindo alternância para imagem original.
        </figcaption>
      </figure>

      {/* Control Toolbar */}
      <div className="ascii-controls" aria-label="Controles do efeito visual do retrato">
        <button
          type="button"
          onClick={() => {
            setBypass(false);
            setMode('characters');
          }}
          className={`ascii-control-btn ${!bypass && mode === 'characters' ? 'active' : ''}`}
          aria-pressed={!bypass && mode === 'characters'}
        >
          Caracteres
        </button>

        <button
          type="button"
          onClick={() => {
            setBypass(false);
            setMode('dither');
          }}
          className={`ascii-control-btn ${!bypass && mode === 'dither' ? 'active' : ''}`}
          aria-pressed={!bypass && mode === 'dither'}
        >
          Dither
        </button>

        <button
          type="button"
          onClick={() => {
            setBypass(false);
            setMode('dots');
          }}
          className={`ascii-control-btn ${!bypass && mode === 'dots' ? 'active' : ''}`}
          aria-pressed={!bypass && mode === 'dots'}
        >
          Pontos
        </button>

        <button
          type="button"
          onClick={() => setBypass(!bypass)}
          className={`ascii-control-btn ascii-bypass-btn ${bypass ? 'active' : ''}`}
          aria-pressed={bypass}
          title="Alternar entre visualização gráfica em ASCII e fotografia original"
        >
          {bypass ? 'Ver em ASCII' : 'Ver Original'}
        </button>
      </div>

      <div className="ascii-help-note">
        Passe o cursor ou foque para aumentar a nitidez · Canvas 2D isolado
      </div>
    </div>
  );
};
