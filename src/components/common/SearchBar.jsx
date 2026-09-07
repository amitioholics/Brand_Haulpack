import { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ placeholder = 'Search...', onSearch, value: controlledValue }) {
  const [value, setValue] = useState(controlledValue || '');

  useEffect(() => {
    if (controlledValue !== undefined) setValue(controlledValue);
  }, [controlledValue]);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      padding: 'var(--space-2) var(--space-3)',
      border: '1px solid var(--hp-border)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--hp-white)',
      minWidth: 220,
      maxWidth: 320,
    }}>
      <Search size={16} style={{ color: 'var(--hp-text-tertiary)', flexShrink: 0 }} />
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          border: 'none',
          outline: 'none',
          flex: 1,
          fontSize: 'var(--text-base)',
          color: 'var(--hp-text-primary)',
          background: 'transparent',
          fontFamily: 'var(--font-body)',
        }}
      />
    </div>
  );
}
