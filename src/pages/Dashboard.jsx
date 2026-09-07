import { Link } from 'react-router-dom';
import { Megaphone, CheckCircle, Clock, TrendingUp, ArrowRight, Eye, MousePointerClick, ShoppingCart, FileVideo } from 'lucide-react';
import { campaigns } from '../data/campaigns';
import { getCampaignMetrics } from '../data/metrics';
import { formatNumber, formatCurrency, formatDate } from '../utils/formatters';
import StatusBadge from '../components/common/StatusBadge';
import './Dashboard.css';

export default function Dashboard() {
  const allCampaigns = campaigns;
  const activeCampaigns = allCampaigns.filter(c => c.status === 'Active');
  const completedCampaigns = allCampaigns.filter(c => c.status === 'Completed');

  // Summary stats across all campaigns
  const allMetrics = allCampaigns.map(c => getCampaignMetrics(c.id));
  const totalContent = allMetrics.reduce((s, m) => s + m.contentCount, 0);
  const totalViews = allMetrics.reduce((s, m) => s + m.views, 0);
  const totalClicks = allMetrics.reduce((s, m) => s + m.clicks, 0);
  const totalSales = allMetrics.reduce((s, m) => s + m.sales, 0);

  const summaryCards = [
    { label: 'Total Campaigns', value: allCampaigns.length, icon: Megaphone, color: '#6538ea', bg: '#f2edfc' },
    { label: 'Active Campaigns', value: activeCampaigns.length, icon: TrendingUp, color: '#10b981', bg: '#e8fbf3' },
    { label: 'Scheduled', value: 0, icon: Clock, color: '#d97706', bg: '#fef7e6' },
    { label: 'Completed', value: completedCampaigns.length, icon: CheckCircle, color: '#475569', bg: '#f1f3f9' },
  ];

  return (
    <div className="dashboard fade-in">
      <div className="dashboard__header">
        <h1 className="dashboard__title">Dashboard</h1>
      </div>

      {/* HaulPack Brand Banner */}
      <div className="dashboard__haulpack-banner">
        <div className="dashboard__banner-content">
          <div className="dashboard__banner-badge">
            <span>✨ HaulPack Brand Analytics</span>
          </div>
          <h2 className="dashboard__banner-title">
            Myntra Creator Performance & Revenue Portal
          </h2>
          <p className="dashboard__banner-subtitle">
            Real-time catalog discovery, creator content analytics, and sales driven across all active reward programs.
          </p>
        </div>
        <div className="dashboard__banner-actions">
          <Link to="/campaigns" className="dashboard__banner-btn">
            View All Campaigns
          </Link>
          <Link to="/creators" className="dashboard__banner-btn dashboard__banner-btn--secondary">
            Creator Directory
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="dashboard__summary">
        {summaryCards.map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="dashboard__summary-card" style={{ background: card.bg }}>
              <div className="dashboard__summary-icon" style={{ color: card.color }}>
                <Icon size={20} />
              </div>
              <div className="dashboard__summary-value" style={{ color: card.color }}>
                {card.value}
              </div>
              <div className="dashboard__summary-label">{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Aggregate Performance Overview */}
      <div className="dashboard__performance-bar">
        <div className="dashboard__perf-item">
          <div className="dashboard__perf-icon" style={{ color: '#6538ea', background: '#f2edfc' }}>
            <FileVideo size={18} />
          </div>
          <div>
            <span className="dashboard__perf-label">Total Content Created</span>
            <span className="dashboard__perf-val">{formatNumber(totalContent)}</span>
          </div>
        </div>
        <div className="dashboard__perf-item">
          <div className="dashboard__perf-icon" style={{ color: '#655bef', background: 'var(--hp-primary-subtle)' }}>
            <Eye size={18} />
          </div>
          <div>
            <span className="dashboard__perf-label">Total Views</span>
            <span className="dashboard__perf-val">{formatNumber(totalViews)}</span>
          </div>
        </div>
        <div className="dashboard__perf-item">
          <div className="dashboard__perf-icon" style={{ color: '#10b981', background: '#d1fae5' }}>
            <MousePointerClick size={18} />
          </div>
          <div>
            <span className="dashboard__perf-label">Total Clicks</span>
            <span className="dashboard__perf-val">{formatNumber(totalClicks)}</span>
          </div>
        </div>
        <div className="dashboard__perf-item">
          <div className="dashboard__perf-icon" style={{ color: '#059669', background: '#e8fbf3' }}>
            <ShoppingCart size={18} />
          </div>
          <div>
            <span className="dashboard__perf-label">Total Sales Driven</span>
            <span className="dashboard__perf-val" style={{ color: '#059669' }}>{formatCurrency(totalSales)}</span>
          </div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="dashboard__section">
        <div className="dashboard__section-header">
          <h2 className="dashboard__section-title">Recent Campaigns</h2>
          <Link to="/campaigns" className="dashboard__view-all">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="dashboard__campaigns">
          {allCampaigns.map(campaign => {
            const metrics = getCampaignMetrics(campaign.id);
            return (
              <Link
                key={campaign.id}
                to={`/campaigns/${campaign.id}`}
                className="dashboard__campaign-row"
              >
                <div className="dashboard__campaign-info">
                  <div className="dashboard__campaign-icon">
                    <Megaphone size={16} />
                  </div>
                  <div>
                    <div className="dashboard__campaign-name">{campaign.name}</div>
                    <div className="dashboard__campaign-meta">
                      {campaign.tags.map(t => (
                        <span key={t} className="dashboard__campaign-tag">{t}</span>
                      ))}
                      <span className="dashboard__campaign-date">📅 {formatDate(campaign.startDate)}</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard__campaign-stats">
                  <div className="dashboard__campaign-metric">
                    <span className="dashboard__metric-label">CONTENT</span>
                    <span className="dashboard__metric-value">{formatNumber(metrics.contentCount)}</span>
                  </div>
                  <div className="dashboard__campaign-metric">
                    <span className="dashboard__metric-label">VIEWS</span>
                    <span className="dashboard__metric-value">{formatNumber(metrics.views)}</span>
                  </div>
                  <div className="dashboard__campaign-metric">
                    <span className="dashboard__metric-label">CLICKS</span>
                    <span className="dashboard__metric-value">{formatNumber(metrics.clicks)}</span>
                  </div>
                  <div className="dashboard__campaign-metric">
                    <span className="dashboard__metric-label">SALES</span>
                    <span className="dashboard__metric-value dashboard__metric-value--sales">{formatCurrency(metrics.sales)}</span>
                  </div>
                  <div className="dashboard__campaign-status">
                    <StatusBadge status={campaign.status} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
