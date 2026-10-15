import React, { useState } from 'react';
import { PROFILE } from '../../data/profile';

export const TerminalTelemetry: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sys' | 'net' | 'ai'>('sys');

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '440px',
        background: 'rgba(12, 9, 14, 0.95)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(122, 21, 36, 0.15)',
        fontFamily: 'var(--font-mono)',
      }}
      role="region"
      aria-label="Console de telemetria do sistema de Gabriel Vinicius"
    >
      {/* Terminal Titlebar */}
      <div
        style={{
          background: 'rgba(20, 15, 23, 0.9)',
          padding: '10px 14px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
            gabriel@toledo-system: ~
          </span>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('sys')}
            style={{
              background: activeTab === 'sys' ? 'rgba(122, 21, 36, 0.5)' : 'transparent',
              border: 'none',
              color: activeTab === 'sys' ? 'var(--gold-light)' : 'var(--text-dim)',
              fontSize: '0.7rem',
              padding: '2px 8px',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            SYS
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('net')}
            style={{
              background: activeTab === 'net' ? 'rgba(122, 21, 36, 0.5)' : 'transparent',
              border: 'none',
              color: activeTab === 'net' ? 'var(--gold-light)' : 'var(--text-dim)',
              fontSize: '0.7rem',
              padding: '2px 8px',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            INFRA
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            style={{
              background: activeTab === 'ai' ? 'rgba(122, 21, 36, 0.5)' : 'transparent',
              border: 'none',
              color: activeTab === 'ai' ? 'var(--gold-light)' : 'var(--text-dim)',
              fontSize: '0.7rem',
              padding: '2px 8px',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            APPS
          </button>
        </div>
      </div>

      {/* Terminal Screen Content */}
      <div style={{ padding: '16px', fontSize: '0.8rem', lineHeight: '1.6', color: 'var(--text-parchment)' }}>
        {activeTab === 'sys' && (
          <div>
            <div style={{ color: 'var(--gold-accent)', marginBottom: '8px' }}>
              $ neofetch --profile
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '85px 1fr', gap: '4px', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-dim)' }}>OPERATOR:</span>
              <span>{PROFILE.name}</span>

              <span style={{ color: 'var(--text-dim)' }}>ROLE:</span>
              <span style={{ color: '#38bdf8' }}>Analista de Suporte Técnico &amp; Dev</span>

              <span style={{ color: 'var(--text-dim)' }}>ACADEMIC:</span>
              <span style={{ color: '#34d399' }}>UTFPR (Sistemas para Internet)</span>

              <span style={{ color: 'var(--text-dim)' }}>LOCATION:</span>
              <span>Toledo, Paraná — Brasil</span>

              <span style={{ color: 'var(--text-dim)' }}>STATUS:</span>
              <span style={{ color: '#10b981' }}>● ONLINE &amp; CONECTADO</span>
            </div>

            <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--gold-light)' }}>Kernel:</span> Linux / Bash / Windows Server<br />
              <span style={{ color: 'var(--gold-light)' }}>Shell:</span> /bin/bash (Rotinas de automação &amp; backup)
            </div>
          </div>
        )}

        {activeTab === 'net' && (
          <div>
            <div style={{ color: 'var(--gold-accent)', marginBottom: '8px' }}>
              $ netstat -tulpn | grep active-services
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#f59e0b' }}>[SAMBA-SHARE]</span>
                <span style={{ color: 'var(--text-dim)' }}>SMB/CIFS · Operacional</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#38bdf8' }}>[TCP/IP-IPv4]</span>
                <span style={{ color: 'var(--text-dim)' }}>Roteamento corporativo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#34d399' }}>[ERP-SUPPORT]</span>
                <span style={{ color: 'var(--text-dim)' }}>German Tech Sistemas</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#a855f7' }}>[BACKUP-CRON]</span>
                <span style={{ color: 'var(--text-dim)' }}>Scripts Bash agendados</span>
              </div>
            </div>

            <div style={{ borderTop: '1px dashed var(--border-subtle)', marginTop: '12px', paddingTop: '10px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Double-check fiscal &amp; contábil:</span> Validado
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div>
            <div style={{ color: 'var(--gold-accent)', marginBottom: '8px' }}>
              $ pm2 list --status=production
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: 'rgba(5, 4, 6, 0.6)', padding: '6px 10px', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <span style={{ color: '#ef4444', fontWeight: 600 }}>MAGI-SYSTEM v4.6</span>
                <span style={{ float: 'right', color: '#34d399' }}>VERCEL ONLINE</span>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Deliberação tri-processadora (Groq/Gemini Cloud)</div>
              </div>

              <div style={{ background: 'rgba(5, 4, 6, 0.6)', padding: '6px 10px', borderRadius: '4px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                <span style={{ color: '#a78bfa', fontWeight: 600 }}>EXPENSETRACKER CREDO</span>
                <span style={{ float: 'right', color: '#60a5fa' }}>REACT NATIVE</span>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Mobile Expo + Supabase PostgreSQL</div>
              </div>

              <div style={{ background: 'rgba(5, 4, 6, 0.6)', padding: '6px 10px', borderRadius: '4px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                <span style={{ color: '#22d3ee', fontWeight: 600 }}>LUMINA HEALTHCARE</span>
                <span style={{ float: 'right', color: '#fbbf24' }}>PUCPR STARTUP</span>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Teleconsultas, Chat e RBAC</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div
        style={{
          background: 'rgba(5, 4, 6, 0.95)',
          padding: '8px 14px',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.72rem',
          color: 'var(--text-dim)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>STATUS: 200 OK</span>
        <span style={{ color: 'var(--gold-accent)' }}>UTFPR · 2026</span>
      </div>
    </div>
  );
};
