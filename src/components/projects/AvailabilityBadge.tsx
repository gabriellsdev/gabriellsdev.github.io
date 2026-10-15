import React from 'react';
import { ProjectAvailability } from '../../data/projects';

interface AvailabilityBadgeProps {
  availability: ProjectAvailability;
}

export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({ availability }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: '8px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
      }}
      aria-label="Status de disponibilidade técnica"
    >
      {/* Code Status */}
      <span
        style={{
          padding: '4px 10px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor:
            availability.sourceCode === 'public'
              ? 'rgba(56, 189, 248, 0.15)'
              : 'rgba(245, 238, 228, 0.08)',
          color: availability.sourceCode === 'public' ? '#38bdf8' : 'var(--text-muted)',
          border: '1px solid currentColor',
        }}
      >
        Código: {availability.sourceCode === 'public' ? 'Público' : 'Privado/Restrito'}
      </span>

      {/* Execution Status */}
      <span
        style={{
          padding: '4px 10px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor:
            availability.localExecution === 'verified'
              ? 'rgba(16, 185, 129, 0.15)'
              : 'rgba(245, 158, 11, 0.15)',
          color: availability.localExecution === 'verified' ? '#34d399' : '#fbbf24',
          border: '1px solid currentColor',
        }}
      >
        Execução: {availability.localExecution === 'verified' ? 'Verificada' : 'A Validar'}
      </span>

      {/* Demo Status */}
      <span
        style={{
          padding: '4px 10px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor:
            availability.publicDemo === 'available'
              ? 'rgba(34, 197, 94, 0.15)'
              : availability.publicDemo === 'in-development'
              ? 'rgba(168, 85, 247, 0.15)'
              : 'rgba(239, 68, 68, 0.15)',
          color:
            availability.publicDemo === 'available'
              ? '#4ade80'
              : availability.publicDemo === 'in-development'
              ? '#c084fc'
              : '#f87171',
          border: '1px solid currentColor',
        }}
      >
        Demo:{' '}
        {availability.publicDemo === 'available'
          ? 'Hospedada'
          : availability.publicDemo === 'in-development'
          ? 'Em Desenvolvimento'
          : 'Indisponível'}
      </span>
    </div>
  );
};
