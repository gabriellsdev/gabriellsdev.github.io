import React, { useState, useEffect } from 'react';
import { ProjectMedia } from '../../data/projects';

interface ProjectGalleryProps {
  media: ProjectMedia[];
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ media }) => {
  const [selectedMedia, setSelectedMedia] = useState<ProjectMedia | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedMedia) {
        setSelectedMedia(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia]);

  if (!media || media.length === 0) return null;

  return (
    <div className="case-study-gallery" role="region" aria-label="Galeria de capturas do projeto">
      {media.map((item, idx) => (
        <figure
          key={idx}
          className="gallery-item"
          onClick={() => setSelectedMedia(item)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setSelectedMedia(item);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`Ampliar imagem ${idx + 1}: ${item.caption || item.alt}`}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="gallery-img"
            loading="lazy"
          />
          {item.caption && (
            <figcaption className="gallery-caption">
              {item.caption}
            </figcaption>
          )}
        </figure>
      ))}

      {/* Modal Lightbox */}
      {selectedMedia && (
        <div
          className="gallery-modal-overlay"
          onClick={() => setSelectedMedia(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de captura ampliada"
        >
          <div
            className="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedMedia.src}
              alt={selectedMedia.alt}
              className="gallery-modal-img"
            />
            <div className="gallery-modal-footer">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-parchment)' }}>
                {selectedMedia.caption || selectedMedia.alt}
              </span>
              <button
                type="button"
                className="gallery-modal-close"
                onClick={() => setSelectedMedia(null)}
                aria-label="Fechar visualizador de imagem"
              >
                Fechar (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
