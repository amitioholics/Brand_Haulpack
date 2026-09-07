import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatNumber, formatCurrency, formatPercent } from '../../utils/formatters';
import './ContentSummary.css';

const COLORS = ['#655bef', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'];

export default function ContentSummary({
  avgViewsPerContent,
  avgClicksPerContent,
  avgSalesPerContent,
  clickThroughRate,
  avgPostsPerCreator,
  platformBreakdown,
}) {
  return (
    <div className="content-summary">
      <h3 className="content-summary__title">Content Performance & Efficiency</h3>

      <div className="content-summary__grid">
        <div className="content-summary__stat">
          <span className="content-summary__stat-label">Avg Views / Post</span>
          <span className="content-summary__stat-value">{formatNumber(avgViewsPerContent)}</span>
        </div>
        <div className="content-summary__stat">
          <span className="content-summary__stat-label">Avg Clicks / Post</span>
          <span className="content-summary__stat-value">{formatNumber(avgClicksPerContent)}</span>
        </div>
        <div className="content-summary__stat">
          <span className="content-summary__stat-label">Avg Sales / Post</span>
          <span className="content-summary__stat-value" style={{ color: '#059669' }}>{formatCurrency(avgSalesPerContent)}</span>
        </div>
        <div className="content-summary__stat">
          <span className="content-summary__stat-label">Click-Through Rate (CTR)</span>
          <span className="content-summary__stat-value">{formatPercent(clickThroughRate)}</span>
        </div>
        <div className="content-summary__stat">
          <span className="content-summary__stat-label">Avg Posts / Creator</span>
          <span className="content-summary__stat-value">{avgPostsPerCreator}</span>
        </div>
      </div>

      {platformBreakdown && platformBreakdown.length > 0 && (
        <div className="content-summary__platform">
          <h4 className="content-summary__platform-title">Platform Breakdown</h4>
          <div className="content-summary__platform-chart">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={platformBreakdown} layout="vertical" margin={{ left: 0, right: 20, top: 5, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="platform"
                  width={80}
                  tick={{ fontSize: 13, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val) => [formatNumber(val) + ' pieces', 'Content']}
                  contentStyle={{ borderRadius: 8, fontSize: 13, border: '1px solid #e5e7eb' }}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={24}>
                  {platformBreakdown.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="content-summary__platform-legend">
            {platformBreakdown.map((p, idx) => (
              <div key={p.platform} className="content-summary__platform-item">
                <span className="content-summary__platform-dot" style={{ background: COLORS[idx % COLORS.length] }} />
                <span className="content-summary__platform-name">{p.platform}</span>
                <span className="content-summary__platform-count">{formatNumber(p.count)} content</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
