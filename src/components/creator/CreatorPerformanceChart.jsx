import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCompactNumber, formatDateShort, formatCurrency } from '../../utils/formatters';

const METRICS = [
  { value: 'views', label: 'Views' },
  { value: 'clicks', label: 'Clicks' },
  { value: 'sales', label: 'Sales' },
];

function CustomTooltip({ active, payload, label, metric }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#111827',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 6,
      fontSize: 13,
    }}>
      <div style={{ color: '#9ca3af', fontSize: 11, marginBottom: 2 }}>{formatDateShort(label)}</div>
      <div style={{ fontWeight: 600 }}>
        {metric === 'sales' ? formatCurrency(payload[0].value) : formatCompactNumber(payload[0].value)}
      </div>
    </div>
  );
}

export default function CreatorPerformanceChart({ data, defaultMetric = 'views' }) {
  const [metric, setMetric] = useState(defaultMetric);

  // Recompute data values based on metric
  // data is expected to have views, clicks, sales per date

  return (
    <div style={{
      background: 'var(--hp-bg-card)',
      border: '1px solid var(--hp-border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--hp-border-light)',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
          Creator Performance
        </h3>
        <div style={{
          display: 'flex',
          gap: 4,
          background: 'var(--hp-bg)',
          borderRadius: 'var(--radius-md)',
          padding: 2,
        }}>
          {METRICS.map(m => (
            <button
              key={m.value}
              onClick={() => setMetric(m.value)}
              style={{
                padding: '5px 12px',
                fontSize: 'var(--text-sm)',
                fontWeight: metric === m.value ? 600 : 500,
                color: metric === m.value ? 'var(--hp-primary)' : 'var(--hp-text-secondary)',
                background: metric === m.value ? 'var(--hp-white)' : 'transparent',
                borderRadius: 'var(--radius-sm)',
                boxShadow: metric === m.value ? 'var(--shadow-xs)' : 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 16px 8px' }}>
        {data.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--hp-text-tertiary)' }}>
            No performance data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCreator" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#655bef" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#655bef" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f3" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={formatDateShort}
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={metric === 'sales' ? (v) => formatCurrency(v) : formatCompactNumber}
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip content={<CustomTooltip metric={metric} />} />
              <Area
                type="monotone"
                dataKey={metric}
                stroke="#655bef"
                strokeWidth={2}
                fill="url(#colorCreator)"
                dot={false}
                activeDot={{ r: 5, fill: '#655bef', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
