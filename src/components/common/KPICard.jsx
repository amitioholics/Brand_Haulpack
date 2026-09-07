import './KPICard.css';

export default function KPICard({ label, value, icon: Icon, accentColor, subtitle, trend, loading }) {
  if (loading) {
    return (
      <div className="kpi-card kpi-card--loading">
        <div className="skeleton" style={{ width: '60%', height: 14 }} />
        <div className="skeleton" style={{ width: '40%', height: 32, marginTop: 8 }} />
      </div>
    );
  }

  return (
    <div
      className="kpi-card"
      style={accentColor ? { borderLeft: `3px solid ${accentColor}` } : undefined}
    >
      <div className="kpi-card__header">
        {Icon && (
          <div className="kpi-card__icon" style={accentColor ? { color: accentColor, background: accentColor + '15' } : undefined}>
            <Icon size={18} />
          </div>
        )}
        <span className="kpi-card__label">{label}</span>
      </div>
      <div className="kpi-card__value">{value}</div>
      {subtitle && <div className="kpi-card__subtitle">{subtitle}</div>}
      {trend !== undefined && trend !== null && (
        <div className={`kpi-card__trend ${trend >= 0 ? 'kpi-card__trend--up' : 'kpi-card__trend--down'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}
