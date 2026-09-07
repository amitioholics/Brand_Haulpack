import { ChevronDown } from 'lucide-react';

export default function FilterDropdown({ label, value, options, onChange }) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          appearance: 'none',
          padding: '6px 32px 6px 12px',
          border: '1px solid var(--hp-border)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--hp-white)',
          fontSize: 'var(--text-base)',
          color: 'var(--hp-text-primary)',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          cursor: 'pointer',
          outline: 'none',
          minWidth: 120,
        }}
      >
        {label && <option value="">{label}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown
        size={14}
        style={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: 'var(--hp-text-tertiary)',
        }}
      />
    </div>
  );
}
