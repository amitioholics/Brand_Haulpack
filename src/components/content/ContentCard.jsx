import { ExternalLink, LinkIcon } from 'lucide-react';
import { formatNumber, formatCurrency, formatPercent, formatDate } from '../../utils/formatters';
import StatusBadge from '../common/StatusBadge';
import './ContentCard.css';

export default function ContentCard({ content, onClick }) {
  const handleViewContent = (e) => {
    e.stopPropagation();
    if (content.contentUrl) {
      window.open(content.contentUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="content-card" onClick={() => onClick?.(content)}>
      <div className="content-card__thumbnail" style={{ background: content.thumbnailColor || '#e5e7eb' }}>
        <div className="content-card__play-icon">▶</div>
      </div>
      <div className="content-card__body">
        <div className="content-card__header">
          <h4 className="content-card__title">{content.title}</h4>
          <StatusBadge status={content.status} size="sm" />
        </div>
        <div className="content-card__meta">
          <span>{content.contentType || content.platform}</span>
          <span>·</span>
          <span>{formatDate(content.publishedAt)}</span>
        </div>
        <div className="content-card__metrics">
          <div className="content-card__metric">
            <span className="content-card__metric-label">Views</span>
            <span className="content-card__metric-value">{formatNumber(content.views)}</span>
          </div>
          <div className="content-card__metric">
            <span className="content-card__metric-label">Clicks</span>
            <span className="content-card__metric-value">{formatNumber(content.clicks)}</span>
          </div>
          <div className="content-card__metric">
            <span className="content-card__metric-label">Sales</span>
            <span className="content-card__metric-value">{formatCurrency(content.sales)}</span>
          </div>
          <div className="content-card__metric">
            <span className="content-card__metric-label">Conversion</span>
            <span className="content-card__metric-value">{formatPercent(content.conversionRate)}</span>
          </div>
        </div>
        <div className="content-card__actions">
          {content.contentUrl ? (
            <button className="content-card__view-btn" onClick={handleViewContent}>
              <ExternalLink size={14} />
              View Content
            </button>
          ) : (
            <span className="content-card__no-link">
              <LinkIcon size={13} />
              Content link unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
