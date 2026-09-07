import { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown } from 'lucide-react';

export default function ExportButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleExport = (type) => {
    // Placeholder for export functionality
    alert(`Export ${type} report — feature will be connected to backend API.`);
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 16px',
          background: 'var(--hp-primary)',
          color: 'white',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
        }}
      >
        <Download size={15} />
        Export
        <ChevronDown size={14} />
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: 4,
          background: 'var(--hp-white)',
          border: '1px solid var(--hp-border)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          minWidth: 200,
          zIndex: 50,
          overflow: 'hidden',
        }}>
          {['Campaign Report', 'Creator Report', 'Content Report'].map(item => (
            <button
              key={item}
              onClick={() => handleExport(item)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '10px 16px',
                fontSize: 'var(--text-sm)',
                color: 'var(--hp-text-primary)',
                fontWeight: 500,
                borderBottom: '1px solid var(--hp-border-light)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.target.style.background = 'var(--hp-bg)'}
              onMouseLeave={e => e.target.style.background = 'transparent'}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
