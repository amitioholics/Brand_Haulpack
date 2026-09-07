import { X, ExternalLink, LinkIcon } from 'lucide-react';
import { formatNumber, formatCurrency, formatPercent, formatDate } from '../../utils/formatters';
import StatusBadge from '../common/StatusBadge';
import './ContentDetailDrawer.css';

export default function ContentDetailDrawer({ content, creatorName, onClose }) {
  if (!content) return null;

  const handleViewContent = () => {
    if (content.contentUrl) {
      window.open(content.contentUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <aside className="drawer">
        <div className="drawer__header">
          <h3 className="drawer__title">Content Details</h3>
          <button className="drawer__close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="drawer__body">
          {/* Thumbnail */}
          <div className="drawer__thumbnail" style={{ background: content.thumbnailColor || '#e5e7eb' }}>
            <div className="drawer__play">▶</div>
          </div>

          {/* Content Info */}
          <div className="drawer__info">
            <h4 className="drawer__content-title">{content.title}</h4>
            <p className="drawer__caption">{content.caption}</p>
            <div className="drawer__meta">
              <div className="drawer__meta-row">
                <span className="drawer__meta-label">Platform</span>
                <span className="drawer__meta-value">{content.contentType || content.platform}</span>
              </div>
              <div className="drawer__meta-row">
                <span className="drawer__meta-label">Creator</span>
                <span className="drawer__meta-value">{creatorName || '—'}</span>
              </div>
              <div className="drawer__meta-row">
                <span className="drawer__meta-label">Published</span>
                <span className="drawer__meta-value">{formatDate(content.publishedAt)}</span>
              </div>
              <div className="drawer__meta-row">
                <span className="drawer__meta-label">Status</span>
                <span className="drawer__meta-value"><StatusBadge status={content.status} size="sm" /></span>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="drawer__section">
            <h4 className="drawer__section-title">Content Performance</h4>
            <div className="drawer__perf-grid">
              <div className="drawer__perf-item">
                <span className="drawer__perf-label">Views</span>
                <span className="drawer__perf-value">{formatNumber(content.views)}</span>
              </div>
              <div className="drawer__perf-item">
                <span className="drawer__perf-label">Clicks</span>
                <span className="drawer__perf-value">{formatNumber(content.clicks)}</span>
              </div>
              <div className="drawer__perf-item">
                <span className="drawer__perf-label">Sales</span>
                <span className="drawer__perf-value">{formatCurrency(content.sales)}</span>
              </div>
              <div className="drawer__perf-item">
                <span className="drawer__perf-label">Conversion Rate</span>
                <span className="drawer__perf-value">{formatPercent(content.conversionRate)}</span>
              </div>
            </div>
          </div>

          {/* View Content */}
          <div className="drawer__actions">
            {content.contentUrl ? (
              <button className="drawer__view-btn" onClick={handleViewContent}>
                <ExternalLink size={15} />
                View Content ↗
              </button>
            ) : (
              <div className="drawer__no-link">
                <LinkIcon size={15} />
                Content link unavailable
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
