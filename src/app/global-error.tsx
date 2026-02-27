'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * ERROR BOUNDARY GLOBAL
 * Esta es la última línea de defensa. Se activa cuando:
 * 1. Hay un error no capturado por error.tsx
 * 2. Hay un error en el root layout
 * 3. Falla el error boundary del root layout
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[global-error] Error crítico no capturado:', error);
  }, [error]);

  return (
    <html lang="es" suppressHydrationWarning>
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          maxWidth: '28rem',
          padding: '2rem',
          textAlign: 'center',
          background: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}>
          {/* Error Icon */}
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            💥
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '0.5rem',
            margin: '0 0 1rem 0',
          }}>
            Error Crítico
          </h1>

          {/* Subtitle */}
          <div style={{
            display: 'inline-block',
            background: '#7c3aed',
            color: 'white',
            paddingLeft: '0.75rem',
            paddingRight: '0.75rem',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            borderRadius: '9999px',
            padding: '0.25rem 0.75rem',
            marginBottom: '1rem',
          }}>
            Sistema fuera de servicio
          </div>

          {/* Message */}
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '1rem',
            margin: '0 0 1rem 0',
          }}>
            La aplicación ha sufrido un error fatal
          </h2>

          {/* Error Details */}
          <p style={{
            fontSize: '1rem',
            color: '#4b5563',
            marginBottom: '1.5rem',
            lineHeight: '1.5',
            margin: '0 0 1.5rem 0',
          }}>
            {error.message || 'Ocurrió un problema inesperado. Nuestro equipo ha sido notificado y estamos trabajando para solucionarlo.'}
          </p>

          {/* Digest */}
          {error.digest && (
            <div style={{
              background: '#f3f4f6',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              marginBottom: '1.5rem',
              fontSize: '0.75rem',
              color: '#6b7280',
              fontFamily: 'monospace',
              wordBreak: 'break-all',
            }}>
              Digest: {error.digest}
            </div>
          )}

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <button
              onClick={reset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0.375rem',
                background: '#7c3aed',
                color: 'white',
                padding: '0.75rem 2rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 200ms',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.background = '#6d28d9';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.background = '#7c3aed';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
            >
              Reintentar
            </button>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0.375rem',
                background: '#4b5565',
                color: 'white',
                padding: '0.75rem 2rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 200ms',
                textDecoration: 'none',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = '#374151';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = '#4b5565';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
            >
              Ir a Inicio
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
