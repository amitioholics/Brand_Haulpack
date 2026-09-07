export const PLATFORMS = {
  INSTAGRAM: 'Instagram',
  YOUTUBE: 'YouTube',
  OTHER: 'Other',
};

export const CAMPAIGN_STATUS = {
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
  SCHEDULED: 'Scheduled',
};

export const CREATOR_STATUS = {
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};

export const CONTENT_STATUS = {
  PUBLISHED: 'Published',
  DRAFT: 'Draft',
  UNDER_REVIEW: 'Under Review',
};

export const SORT_OPTIONS = [
  { value: 'views_desc', label: 'Highest Views' },
  { value: 'clicks_desc', label: 'Highest Clicks' },
  { value: 'sales_desc', label: 'Highest Sales' },
  { value: 'reward_desc', label: 'Highest Reward' },
  { value: 'content_desc', label: 'Most Content' },
  { value: 'followers_desc', label: 'Most Followers' },
];

export const TIME_FILTERS = [
  { value: '7', label: '7 Days' },
  { value: '14', label: '14 Days' },
  { value: '30', label: '30 Days' },
  { value: 'all', label: 'Campaign Duration' },
];

export const METRIC_OPTIONS = [
  { value: 'views', label: 'Views' },
  { value: 'clicks', label: 'Clicks' },
  { value: 'sales', label: 'Sales' },
  { value: 'content', label: 'Content' },
];

export const PAGE_SIZE = 25;

export const BRAND_ID = 'brand_haulpack_001'; // Scoping for data isolation
