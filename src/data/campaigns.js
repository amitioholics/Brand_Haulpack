/* ============================================
   Mock Campaign Data
   ============================================ */

export const campaigns = [
  {
    id: 'camp_001',
    brandId: 'brand_haulpack_001',
    name: 'Myntra Big Fashion Festival 2026',
    startDate: '2026-09-01',
    endDate: '2026-09-30',
    status: 'Active',
    tags: ['Fashion', 'Mega Sale', 'Apparel'],
    description: 'Premier creator reward program for Myntra Big Fashion Festival celebrating seasonal launches and viral trends.',
  },
  {
    id: 'camp_002',
    brandId: 'brand_haulpack_001',
    name: 'Myntra End of Reason Sale (EORS)',
    startDate: '2026-08-15',
    endDate: '2026-09-30',
    status: 'Active',
    tags: ['Deals', 'Footwear', 'Accessories'],
    description: 'Milestone-based rewards campaign driving high-conversion creator hauls and catalog discovery for EORS.',
  },
  {
    id: 'camp_003',
    brandId: 'brand_haulpack_001',
    name: 'Myntra Festive Glam & Ethnic Rewards',
    startDate: '2026-08-01',
    endDate: '2026-08-31',
    status: 'Completed',
    tags: ['Festive', 'Ethnic Wear', 'Beauty'],
    description: 'Festive season influencer reward program showcasing ethnic fashion collections and festive makeup.',
  },
];

export function getCampaignById(id) {
  return campaigns.find(c => c.id === id) || null;
}

export function getCampaignsByBrand(brandId) {
  return campaigns.filter(c => c.brandId === brandId);
}
