import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, message, action, onAction }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
      color: 'var(--hp-text-tertiary)',
    }}>
      <Icon size={40} style={{ marginBottom: 16, opacity: 0.5 }} />
      <p style={{ fontSize: 'var(--text-base)', marginBottom: action ? 16 : 0, maxWidth: 320 }}>
        {message}
      </p>
      {action && onAction && (
        <button
          onClick={onAction}
          style={{
            padding: '8px 20px',
            background: 'var(--hp-primary)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
          }}
        >
          {action}
        </button>
      )}
    </div>
  );
}
