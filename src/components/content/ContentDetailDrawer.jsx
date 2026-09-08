import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, LinkIcon, FileVideo } from 'lucide-react';
import { formatNumber, formatCurrency, formatPercent, formatDate } from '../../utils/formatters';
import StatusBadge from '../common/StatusBadge';
import './ContentDetailDrawer.css';

export default function ContentDetailDrawer({ content, creatorName, onClose }) {
  // Prevent body scrolling when modal is open & add Esc key listener
  useEffect(() => {
    if (!content) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [content, onClose]);

  if (!content) return null;

  const handleViewContent = () => {
    if (content.contentUrl) {
      window.open(content.contentUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const modalUI = (
    <div className="content-modal-overlay" onClick={onClose}>
      <div className="content-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="content-modal__header">
          <div className="content-modal__header-left">
            <span className="content-modal__badge">Content Performance</span>
            <h3 className="content-modal__title">Content Details</h3>
          </div>
          <button className="content-modal__close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="content-modal__body">
          {/* Video / Post Preview Banner */}
          <div className="content-modal__thumbnail" style={{ background: content.thumbnailColor || 'linear-gradient(135deg, #6538ea 0%, #835ff3 100%)' }}>
            <FileVideo size={32} style={{ color: 'white', opacity: 0.9 }} />
            <div className="content-modal__play">▶</div>
          </div>

          {/* Title & Caption */}
          <div className="content-modal__info">
            <h4 className="content-modal__content-title">{content.title}</h4>
            <p className="content-modal__caption">{content.caption}</p>

            <div className="content-modal__meta">
              <div className="content-modal__meta-row">
                <span className="content-modal__meta-label">Platform</span>
                <span className="content-modal__meta-value">{content.contentType || content.platform}</span>
              </div>
              <div className="content-modal__meta-row">
                <span className="content-modal__meta-label">Creator</span>
                <span className="content-modal__meta-value">{creatorName || '—'}</span>
              </div>
              <div className="content-modal__meta-row">
                <span className="content-modal__meta-label">Published</span>
                <span className="content-modal__meta-value">{formatDate(content.publishedAt)}</span>
              </div>
              <div className="content-modal__meta-row">
                <span className="content-modal__meta-label">Status</span>
                <span className="content-modal__meta-value"><StatusBadge status={content.status} size="sm" /></span>
              </div>
            </div>
          </div>

          {/* Performance Grid */}
          <div className="content-modal__section">
            <h4 className="content-modal__section-title">Content Performance</h4>
            <div className="content-modal__perf-grid">
              <div className="content-modal__perf-item">
                <span className="content-modal__perf-label">Views</span>
                <span className="content-modal__perf-value">{formatNumber(content.views)}</span>
              </div>
              <div className="content-modal__perf-item">
                <span className="content-modal__perf-label">Clicks</span>
                <span className="content-modal__perf-value">{formatNumber(content.clicks)}</span>
              </div>
              <div className="content-modal__perf-item">
                <span className="content-modal__perf-label">Sales</span>
                <span className="content-modal__perf-value">{formatCurrency(content.sales)}</span>
              </div>
              <div className="content-modal__perf-item">
                <span className="content-modal__perf-label">Conversion Rate</span>
                <span className="content-modal__perf-value">{formatPercent(content.conversionRate)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="content-modal__footer">
          {content.contentUrl ? (
            <button className="content-modal__view-btn" onClick={handleViewContent}>
              <ExternalLink size={15} />
              View Original Content ↗
            </button>
          ) : (
            <div className="content-modal__no-link">
              <LinkIcon size={15} />
              Content link unavailable
            </div>
          )}
          <button className="content-modal__secondary-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalUI, document.body);
}


