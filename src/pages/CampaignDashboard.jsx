import { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, FileVideo, Eye, MousePointerClick, ShoppingCart, ExternalLink } from 'lucide-react';
import { getCampaignById } from '../data/campaigns';
import { getCampaignMetrics, getAllCreatorMetricsForCampaign, getPlatformBreakdown, getCampaignTimeSeries } from '../data/metrics';
import { formatNumber, formatCurrency, formatDateRange, getInitials, getSocialUrl } from '../utils/formatters';
import Breadcrumb from '../components/common/Breadcrumb';
import KPICard from '../components/common/KPICard';
import StatusBadge from '../components/common/StatusBadge';
import DataTable from '../components/common/DataTable';
import SearchBar from '../components/common/SearchBar';
import FilterDropdown from '../components/common/FilterDropdown';
import ExportButton from '../components/common/ExportButton';
import ErrorState from '../components/common/ErrorState';
import CampaignPerformanceChart from '../components/campaign/CampaignPerformanceChart';
import ContentSummary from '../components/campaign/ContentSummary';
import './CampaignDashboard.css';

export default function CampaignDashboard() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [chartMetric, setChartMetric] = useState('views');
  const [chartTime, setChartTime] = useState('all');
  const [creatorSearch, setCreatorSearch] = useState('');
  const [creatorStatusFilter, setCreatorStatusFilter] = useState('');
  const [creatorPlatformFilter, setCreatorPlatformFilter] = useState('');

  const campaign = getCampaignById(campaignId);

  if (!campaign) {
    return (
      <div className="campaign-dash fade-in">
        <ErrorState message="Campaign not found." onRetry={() => navigate('/campaigns')} />
      </div>
    );
  }

  const metrics = getCampaignMetrics(campaignId);
  const allCreators = getAllCreatorMetricsForCampaign(campaignId);
  const platformBreakdown = getPlatformBreakdown(campaignId);
  const chartData = getCampaignTimeSeries(campaignId, chartMetric, chartTime);
  const avgViewsPerContent = metrics.contentCount ? Math.round(metrics.views / metrics.contentCount) : 0;
  const avgClicksPerContent = metrics.contentCount ? Math.round(metrics.clicks / metrics.contentCount) : 0;
  const avgSalesPerContent = metrics.contentCount ? Math.round(metrics.sales / metrics.contentCount) : 0;
  const clickThroughRate = metrics.views > 0 ? (metrics.clicks / metrics.views) * 100 : 0;
  const avgPostsPerCreator = metrics.creatorCount ? (metrics.contentCount / metrics.creatorCount).toFixed(1) : '0';

  // Filter creators
  const filteredCreators = useMemo(() => {
    let result = allCreators;
    if (creatorSearch) {
      const q = creatorSearch.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) || c.socialHandle.toLowerCase().includes(q)
      );
    }
    if (creatorStatusFilter) {
      result = result.filter(c => c.status === creatorStatusFilter);
    }
    if (creatorPlatformFilter) {
      result = result.filter(c => c.platform === creatorPlatformFilter);
    }
    return result;
  }, [allCreators, creatorSearch, creatorStatusFilter, creatorPlatformFilter]);

  const handleCreatorSearch = useCallback((val) => setCreatorSearch(val), []);

  const kpiCards = [
    { label: 'Total Creators', value: formatNumber(metrics.creatorCount), icon: Users, color: '#655bef' },
    { label: 'Total Content', value: formatNumber(metrics.contentCount), icon: FileVideo, color: '#3b82f6' },
    { label: 'Total Views', value: formatNumber(metrics.views), icon: Eye, color: '#10b981' },
    { label: 'Total Clicks', value: formatNumber(metrics.clicks), icon: MousePointerClick, color: '#f59e0b' },
    { label: 'Total Sales', value: formatCurrency(metrics.sales), icon: ShoppingCart, color: '#ec4899' },
  ];

  const creatorColumns = [
    {
      key: 'name',
      label: 'Creator',
      width: '220px',
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: row.avatarColor || 'var(--hp-primary)',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-heading)', flexShrink: 0,
          }}>
            {getInitials(val)}
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>{val}</div>
            <a
              href={getSocialUrl(row.platform, row.socialHandle)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--hp-text-tertiary)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 3,
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--hp-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--hp-text-tertiary)'; }}
              title={`Open ${row.name}'s ${row.platform} profile`}
            >
              <span>{row.socialHandle}</span>
            </a>
          </div>
        </div>
      ),
    },
    {
      key: 'platform',
      label: 'Platform',
      render: (val, row) => {
        const url = getSocialUrl(val, row.socialHandle);
        const isIG = val === 'Instagram';
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title={`Open ${row.name}'s ${val} profile (${row.socialHandle})`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              color: isIG ? '#e1306c' : '#ef4444',
              background: isIG ? '#fdf2f8' : '#fef2f2',
              padding: '3px 9px',
              borderRadius: '6px',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              textDecoration: 'none',
              border: `1px solid ${isIG ? '#fbcfe8' : '#fecaca'}`,
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>{val}</span>
            <ExternalLink size={12} strokeWidth={2.2} />
          </a>
        );
      },
    },
    {
      key: 'contentCount',
      label: 'Content',
      align: 'right',
      render: (val) => formatNumber(val),
    },
    {
      key: 'views',
      label: 'Views',
      align: 'right',
      render: (val) => formatNumber(val),
    },
    {
      key: 'clicks',
      label: 'Clicks',
      align: 'right',
      render: (val) => formatNumber(val),
    },
    {
      key: 'sales',
      label: 'Sales',
      align: 'right',
      render: (val) => formatCurrency(val),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  return (
    <div className="campaign-dash fade-in">
      <Breadcrumb items={[
        { label: 'Reward Programs', to: '/campaigns' },
        { label: campaign.name },
      ]} />

      {/* Campaign Header */}
      <div className="campaign-dash__header">
        <div className="campaign-dash__header-info">
          <h1 className="campaign-dash__title">{campaign.name}</h1>
          <div className="campaign-dash__meta">
            <span className="campaign-dash__dates">{formatDateRange(campaign.startDate, campaign.endDate)}</span>
            <StatusBadge status={campaign.status} size="lg" />
          </div>
          {campaign.tags.length > 0 && (
            <div className="campaign-dash__tags">
              {campaign.tags.map(t => (
                <span key={t} className="campaign-dash__tag">{t}</span>
              ))}
            </div>
          )}
        </div>
        <ExportButton />
      </div>

      {/* KPI Cards */}
      <div className="campaign-dash__kpis">
        {kpiCards.map(card => (
          <KPICard
            key={card.label}
            label={card.label}
            value={card.value}
            icon={card.icon}
            accentColor={card.color}
          />
        ))}
      </div>

      {/* Performance Chart */}
      <div className="campaign-dash__section">
        <CampaignPerformanceChart
          data={chartData}
          selectedMetric={chartMetric}
          selectedTime={chartTime}
          onMetricChange={setChartMetric}
          onTimeFilterChange={setChartTime}
        />
      </div>

      {/* Content Summary */}
      <div className="campaign-dash__section">
        <ContentSummary
          avgViewsPerContent={avgViewsPerContent}
          avgClicksPerContent={avgClicksPerContent}
          avgSalesPerContent={avgSalesPerContent}
          clickThroughRate={clickThroughRate}
          avgPostsPerCreator={avgPostsPerCreator}
          platformBreakdown={platformBreakdown}
        />
      </div>

      {/* Creator Performance */}
      <div className="campaign-dash__section">
        <div className="campaign-dash__section-header">
          <h2 className="campaign-dash__section-title">Creator Performance</h2>
        </div>

        <div className="campaign-dash__creator-toolbar">
          <SearchBar placeholder="Search creators..." onSearch={handleCreatorSearch} />
          <div className="campaign-dash__creator-filters">
            <FilterDropdown
              label="All Status"
              value={creatorStatusFilter}
              onChange={setCreatorStatusFilter}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Completed', label: 'Completed' },
              ]}
            />
            <FilterDropdown
              label="All Platforms"
              value={creatorPlatformFilter}
              onChange={setCreatorPlatformFilter}
              options={[
                { value: 'Instagram', label: 'Instagram' },
                { value: 'YouTube', label: 'YouTube' },
              ]}
            />
          </div>
        </div>

        <DataTable
          columns={creatorColumns}
          data={filteredCreators}
          onRowClick={(row) => navigate(`/campaigns/${campaignId}/creators/${row.creatorId || row.id}`)}
          emptyMessage="No creators have joined this campaign yet."
          pageSize={25}
        />
      </div>
    </div>
  );
}
