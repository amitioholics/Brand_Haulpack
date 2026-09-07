import { getInitials, formatNumber, getSocialUrl } from '../../utils/formatters';
import StatusBadge from '../common/StatusBadge';
import { Camera, Video, Globe, ExternalLink } from 'lucide-react';
import './CreatorProfileHeader.css';

function PlatformIcon({ platform }) {
  if (platform === 'Instagram') return <Camera size={16} />;
  if (platform === 'YouTube') return <Video size={16} />;
  return <Globe size={16} />;
}

export default function CreatorProfileHeader({ creator, status }) {
  const socialUrl = getSocialUrl(creator.platform, creator.socialHandle);

  return (
    <div className="creator-profile">
      <div
        className="creator-profile__avatar"
        style={{ background: creator.avatarColor || 'var(--hp-primary)' }}
      >
        {getInitials(creator.name)}
      </div>
      <div className="creator-profile__info">
        <h2 className="creator-profile__name">{creator.name}</h2>
        <div className="creator-profile__meta">
          <a
            href={socialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="creator-profile__handle"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              color: 'var(--hp-primary)',
              textDecoration: 'none',
              fontWeight: 600,
            }}
            title={`Open ${creator.name}'s ${creator.platform} account`}
          >
            <span>{creator.socialHandle}</span>
            <ExternalLink size={12} />
          </a>
          <span className="creator-profile__divider">·</span>
          <a
            href={socialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="creator-profile__platform"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              textDecoration: 'none',
              color: 'var(--hp-text-secondary)',
            }}
            title={`Open on ${creator.platform}`}
          >
            <PlatformIcon platform={creator.platform} />
            <span>{creator.platform}</span>
          </a>
          <span className="creator-profile__divider">·</span>
          <span className="creator-profile__followers">{formatNumber(creator.followerCount)} Followers</span>
        </div>
      </div>
      <div className="creator-profile__status">
        <StatusBadge status={status} size="lg" />
      </div>
    </div>
  );
}
