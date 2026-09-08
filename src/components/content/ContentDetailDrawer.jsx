import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, LinkIcon, Play, Sparkles } from 'lucide-react';
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
      <div className="content-modal reel-modal" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="content-modal__header">
          <div className="content-modal__header-left">
            <span className="content-modal__badge">Reel & Post Intelligence</span>
            <h3 className="content-modal__title">Content Details</h3>
          </div>
          <button className="content-modal__close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* 2-Column Body: Left Full-Height 9:16 Video Preview + Right Details */}
        <div className="reel-modal__body">
          {/* Left Column: Full-Height 9:16 Video Preview Card */}
          <div className="reel-player">
            <div
              className="reel-player__screen"
              onClick={handleViewContent}
              style={{ background: content.thumbnailColor || 'linear-gradient(150deg, #6538ea 0%, #4926b8 50%, #1e1a38 100%)' }}
              title="Click to view original video content"
            >
              {/* Center Play Icon & Label */}
              <div className="reel-player__play-wrapper">
                <div className="reel-player__play-btn">
                  <Play size={26} fill="white" color="white" style={{ marginLeft: 3 }} />
                </div>
                <span className="reel-player__play-label">
                  Watch Reel ↗
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Content Details & Performance Metrics */}
          <div className="reel-details">
            <div className="reel-details__title-section">
              <h4 className="reel-details__title">{content.title}</h4>
              <p className="reel-details__caption">{content.caption}</p>
            </div>

            {/* Platform & Creator Metadata */}
            <div className="reel-details__meta-grid">
              <div className="reel-details__meta-item">
                <span className="reel-details__meta-label">Platform</span>
                <span className="reel-details__meta-val">{content.contentType || content.platform}</span>
              </div>
              <div className="reel-details__meta-item">
                <span className="reel-details__meta-label">Creator</span>
                <span className="reel-details__meta-val">{creatorName || '—'}</span>
              </div>
              <div className="reel-details__meta-item">
                <span className="reel-details__meta-label">Published</span>
                <span className="reel-details__meta-val">{formatDate(content.publishedAt)}</span>
              </div>
              <div className="reel-details__meta-item">
                <span className="reel-details__meta-label">Status</span>
                <span className="reel-details__meta-val"><StatusBadge status={content.status} size="sm" /></span>
              </div>
            </div>

            {/* Performance Analytics Grid */}
            <div className="reel-details__perf-section">
              <h5 className="reel-details__perf-title">
                <Sparkles size={14} color="var(--hp-primary)" />
                Performance Metrics
              </h5>
              <div className="reel-details__perf-grid">
                <div className="reel-details__perf-card">
                  <span className="label">Total Views</span>
                  <span className="val">{formatNumber(content.views)}</span>
                </div>
                <div className="reel-details__perf-card">
                  <span className="label">Total Clicks</span>
                  <span className="val">{formatNumber(content.clicks)}</span>
                </div>
                <div className="reel-details__perf-card highlight">
                  <span className="label">Sales Generated</span>
                  <span className="val">{formatCurrency(content.sales)}</span>
                </div>
                <div className="reel-details__perf-card">
                  <span className="label">Conversion Rate</span>
                  <span className="val">{formatPercent(content.conversionRate)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="reel-details__actions">
              {content.contentUrl ? (
                <button className="reel-details__view-btn" onClick={handleViewContent}>
                  <ExternalLink size={15} />
                  <span>View Original Reel ↗</span>
                </button>
              ) : (
                <div className="reel-details__no-link">
                  <LinkIcon size={14} />
                  <span>Content URL Unavailable</span>
                </div>
              )}
              <button className="reel-details__close-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalUI, document.body);
}



