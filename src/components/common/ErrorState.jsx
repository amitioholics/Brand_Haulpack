import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ message = 'Unable to load data.', onRetry }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
      color: 'var(--hp-text-secondary)',
      background: 'var(--hp-error-bg)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid #fecaca',
    }}>
      <AlertCircle size={36} style={{ marginBottom: 16, color: 'var(--hp-error)' }} />
      <p style={{ fontSize: 'var(--text-base)', marginBottom: 16, color: 'var(--hp-error-text)' }}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 20px',
            background: 'var(--hp-white)',
            color: 'var(--hp-error)',
            border: '1px solid var(--hp-error)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
          }}
        >
          <RefreshCw size={14} />
          Try Again
        </button>
      )}
    </div>
  );
}
