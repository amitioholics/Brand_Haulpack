import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, LinkIcon, Play, Heart, Eye, MousePointer, Sparkles, Music2, Video, Film } from 'lucide-react';
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

  const isYoutube = content.platform === 'YouTube' || (content.contentType && content.contentType.includes('YouTube'));

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

        {/* 2-Column Body: Left 9:16 Vertical Reel Player + Right Details */}
        <div className="reel-modal__body">
          {/* Left Column: 9:16 Smartphone Reel Preview Mockup */}
          <div className="reel-player">
            <div
              className="reel-player__screen"
              style={{ background: content.thumbnailColor || 'linear-gradient(160deg, #6538ea 0%, #342e56 100%)' }}
            >
              {/* Platform top tag */}
              <div className="reel-player__top-bar">
                <span className="reel-player__platform-tag">
                  {isYoutube ? <Film size={12} color="#ef4444" /> : <Video size={12} color="#c084fc" />}
                  <span>{content.contentType || content.platform || 'Reel'}</span>
                </span>
                <span className="reel-player__live-badge">LIVE</span>
              </div>

              {/* Center Play Icon */}
              <div className="reel-player__play-wrapper" onClick={handleViewContent}>
                <div className="reel-player__play-btn">
                  <Play size={22} fill="white" color="white" style={{ marginLeft: 3 }} />
                </div>
              </div>

              {/* Right overlay icons (Like, Views, Share) */}
              <div className="reel-player__sidebar-actions">
                <div className="reel-player__action-icon">
                  <Heart size={16} fill="rgba(255,255,255,0.2)" color="white" />
                  <span>{formatNumber(Math.round(content.views * 0.08))}</span>
                </div>
                <div className="reel-player__action-icon">
                  <Eye size={16} color="white" />
                  <span>{formatNumber(content.views)}</span>
                </div>
                <div className="reel-player__action-icon">
                  <MousePointer size={16} color="white" />
                  <span>{formatNumber(content.clicks)}</span>
                </div>
              </div>

              {/* Bottom Reel Caption & Creator Info */}
              <div className="reel-player__bottom-info">
                <div className="reel-player__creator-row">
                  <div className="reel-player__avatar">
                    {creatorName ? creatorName.slice(0, 2).toUpperCase() : 'HP'}
                  </div>
                  <span className="reel-player__creator-name">@{creatorName ? creatorName.toLowerCase().replace(/\s+/g, '') : 'creator'}</span>
                  <span className="reel-player__follow-btn">Follow</span>
                </div>
                <p className="reel-player__caption-preview">{content.title}</p>
                <div className="reel-player__audio-row">
                  <Music2 size={11} color="white" />
                  <span className="reel-player__audio-text">Original Audio • Myntra Haul</span>
                </div>
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



