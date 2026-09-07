import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCompactNumber, formatDateShort, formatCurrency } from '../../utils/formatters';
import './CampaignPerformanceChart.css';

const METRIC_OPTIONS = [
  { value: 'views', label: 'Views' },
  { value: 'clicks', label: 'Clicks' },
  { value: 'sales', label: 'Sales' },
  { value: 'content', label: 'Content' },
];

const TIME_FILTERS = [
  { value: '7', label: '7 Days' },
  { value: '14', label: '14 Days' },
  { value: '30', label: '30 Days' },
  { value: 'all', label: 'Campaign Duration' },
];

function CustomTooltip({ active, payload, label, metric }) {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  return (
    <div className="perf-chart__tooltip">
      <div className="perf-chart__tooltip-date">{formatDateShort(label)}</div>
      <div className="perf-chart__tooltip-value">
        {metric === 'sales' ? formatCurrency(val) : formatCompactNumber(val)}
      </div>
    </div>
  );
}

export default function CampaignPerformanceChart({ data, onMetricChange, onTimeFilterChange, selectedMetric = 'views', selectedTime = 'all' }) {
  return (
    <div className="perf-chart">
      <div className="perf-chart__header">
        <h3 className="perf-chart__title">Campaign Performance</h3>
        <div className="perf-chart__controls">
          <div className="perf-chart__metrics">
            {METRIC_OPTIONS.map(opt => (
              <button
                key={opt.value}
                className={`perf-chart__metric-btn ${selectedMetric === opt.value ? 'perf-chart__metric-btn--active' : ''}`}
                onClick={() => onMetricChange?.(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="perf-chart__time-filters">
            {TIME_FILTERS.map(opt => (
              <button
                key={opt.value}
                className={`perf-chart__time-btn ${selectedTime === opt.value ? 'perf-chart__time-btn--active' : ''}`}
                onClick={() => onTimeFilterChange?.(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="perf-chart__body">
        {data.length === 0 ? (
          <div className="perf-chart__empty">No data available for the selected period.</div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
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
                tickFormatter={selectedMetric === 'sales' ? (v) => formatCurrency(v) : formatCompactNumber}
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip content={<CustomTooltip metric={selectedMetric} />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#655bef"
                strokeWidth={2}
                fill="url(#colorMetric)"
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
