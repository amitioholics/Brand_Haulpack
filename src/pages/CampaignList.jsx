import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { campaigns } from '../data/campaigns';
import { getCampaignMetrics } from '../data/metrics';
import { formatNumber, formatCurrency, formatDateRange } from '../utils/formatters';
import SearchBar from '../components/common/SearchBar';
import FilterDropdown from '../components/common/FilterDropdown';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import Breadcrumb from '../components/common/Breadcrumb';
import './CampaignList.css';

export default function CampaignList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const campaignsWithMetrics = useMemo(() => {
    return campaigns.map(c => {
      const metrics = getCampaignMetrics(c.id);
      return { ...c, ...metrics };
    });
  }, []);

  const filtered = useMemo(() => {
    let result = campaignsWithMetrics;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q));
    }
    if (statusFilter) {
      result = result.filter(c => c.status === statusFilter);
    }
    return result;
  }, [campaignsWithMetrics, search, statusFilter]);

  const handleSearch = useCallback((val) => setSearch(val), []);

  const columns = [
    {
      key: 'name',
      label: 'Campaign Name',
      width: '280px',
      render: (val) => <span style={{ fontWeight: 600 }}>{val}</span>,
    },
    {
      key: 'duration',
      label: 'Duration',
      sortable: false,
      render: (_, row) => (
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--hp-text-secondary)' }}>
          {formatDateRange(row.startDate, row.endDate)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'creatorCount',
      label: 'Creators',
      align: 'right',
      render: (val) => formatNumber(val),
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
      key: 'action',
      label: '',
      sortable: false,
      render: (_, row) => (
        <button
          className="campaign-list__view-btn"
          onClick={(e) => { e.stopPropagation(); navigate(`/campaigns/${row.id}`); }}
        >
          View →
        </button>
      ),
    },
  ];

  return (
    <div className="campaign-list fade-in">
      <Breadcrumb items={[{ label: 'Reward Programs' }]} />

      <div className="campaign-list__header">
        <h1 className="campaign-list__title">Reward Programs</h1>
      </div>

      <div className="campaign-list__toolbar">
        <SearchBar placeholder="Search campaigns..." onSearch={handleSearch} />
        <div className="campaign-list__filters">
          <FilterDropdown
            label="All Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Completed', label: 'Completed' },
            ]}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        onRowClick={(row) => navigate(`/campaigns/${row.id}`)}
        emptyMessage="No reward programs found."
        paginated={false}
      />
    </div>
  );
}
