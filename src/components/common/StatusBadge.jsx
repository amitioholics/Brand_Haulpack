import './StatusBadge.css';

export default function StatusBadge({ status, size = 'md' }) {
  const statusClass = (status || '').toLowerCase().replace(/\s+/g, '-');
  return (
    <span className={`status-badge status-badge--${statusClass} status-badge--${size}`}>
      {status}
    </span>
  );
}
