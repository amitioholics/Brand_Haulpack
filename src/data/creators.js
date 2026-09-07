/* ============================================
   Mock Creator Data — 60 creators
   ============================================ */

const AVATARS = [
  '#655bef', '#10b981', '#f59e0b', '#ec4899', '#3b82f6',
  '#8b5cf6', '#06b6d4', '#f97316', '#ef4444', '#14b8a6',
];

function avatar(idx) { return AVATARS[idx % AVATARS.length]; }

export const creators = [
  { id: 'cr_001', name: 'Aditi Sharma', socialHandle: '@aditisharma', platform: 'Instagram', followerCount: 125000, avatarColor: avatar(0) },
  { id: 'cr_002', name: 'Rahul Verma', socialHandle: '@rahulverma_yt', platform: 'YouTube', followerCount: 82000, avatarColor: avatar(1) },
  { id: 'cr_003', name: 'Priya Patel', socialHandle: '@priyapatel', platform: 'Instagram', followerCount: 310000, avatarColor: avatar(2) },
  { id: 'cr_004', name: 'Arjun Nair', socialHandle: '@arjunnair', platform: 'YouTube', followerCount: 195000, avatarColor: avatar(3) },
  { id: 'cr_005', name: 'Sneha Reddy', socialHandle: '@snehareddy_', platform: 'Instagram', followerCount: 67000, avatarColor: avatar(4) },
  { id: 'cr_006', name: 'Vikram Singh', socialHandle: '@vikramsingh', platform: 'YouTube', followerCount: 420000, avatarColor: avatar(5) },
  { id: 'cr_007', name: 'Meera Joshi', socialHandle: '@meerajoshi', platform: 'Instagram', followerCount: 54000, avatarColor: avatar(6) },
  { id: 'cr_008', name: 'Karan Mehta', socialHandle: '@karanmehta_', platform: 'Instagram', followerCount: 145000, avatarColor: avatar(7) },
  { id: 'cr_009', name: 'Ananya Gupta', socialHandle: '@ananyagupta', platform: 'YouTube', followerCount: 230000, avatarColor: avatar(8) },
  { id: 'cr_010', name: 'Rohan Das', socialHandle: '@rohandas', platform: 'Instagram', followerCount: 38000, avatarColor: avatar(9) },
  { id: 'cr_011', name: 'Kavya Iyer', socialHandle: '@kavyaiyer', platform: 'Instagram', followerCount: 92000, avatarColor: avatar(0) },
  { id: 'cr_012', name: 'Aakash Kumar', socialHandle: '@aakashkumar_yt', platform: 'YouTube', followerCount: 175000, avatarColor: avatar(1) },
  { id: 'cr_013', name: 'Divya Menon', socialHandle: '@divyamenon', platform: 'Instagram', followerCount: 115000, avatarColor: avatar(2) },
  { id: 'cr_014', name: 'Siddharth Rao', socialHandle: '@sidrao', platform: 'YouTube', followerCount: 58000, avatarColor: avatar(3) },
  { id: 'cr_015', name: 'Nisha Agarwal', socialHandle: '@nishaagarwal', platform: 'Instagram', followerCount: 205000, avatarColor: avatar(4) },
  { id: 'cr_016', name: 'Amit Tiwari', socialHandle: '@amittiwari', platform: 'YouTube', followerCount: 340000, avatarColor: avatar(5) },
  { id: 'cr_017', name: 'Ritu Saxena', socialHandle: '@ritusaxena_', platform: 'Instagram', followerCount: 78000, avatarColor: avatar(6) },
  { id: 'cr_018', name: 'Manish Jha', socialHandle: '@manishjha', platform: 'Instagram', followerCount: 46000, avatarColor: avatar(7) },
  { id: 'cr_019', name: 'Pooja Deshmukh', socialHandle: '@poojadeshmukh', platform: 'YouTube', followerCount: 160000, avatarColor: avatar(8) },
  { id: 'cr_020', name: 'Varun Kapoor', socialHandle: '@varunkapoor', platform: 'Instagram', followerCount: 285000, avatarColor: avatar(9) },
  { id: 'cr_021', name: 'Swati Pandey', socialHandle: '@swatipandey', platform: 'Instagram', followerCount: 98000, avatarColor: avatar(0) },
  { id: 'cr_022', name: 'Nikhil Bhatt', socialHandle: '@nikhilbhatt', platform: 'YouTube', followerCount: 135000, avatarColor: avatar(1) },
  { id: 'cr_023', name: 'Tanvi Shah', socialHandle: '@tanvishah_', platform: 'Instagram', followerCount: 72000, avatarColor: avatar(2) },
  { id: 'cr_024', name: 'Rajesh Mishra', socialHandle: '@rajeshmishra', platform: 'YouTube', followerCount: 410000, avatarColor: avatar(3) },
  { id: 'cr_025', name: 'Anjali Choudhary', socialHandle: '@anjalichoudhary', platform: 'Instagram', followerCount: 51000, avatarColor: avatar(4) },
  { id: 'cr_026', name: 'Deepak Soni', socialHandle: '@deepaksoni_yt', platform: 'YouTube', followerCount: 260000, avatarColor: avatar(5) },
  { id: 'cr_027', name: 'Shruti Nair', socialHandle: '@shrutinair', platform: 'Instagram', followerCount: 88000, avatarColor: avatar(6) },
  { id: 'cr_028', name: 'Harsh Vardhan', socialHandle: '@harshvardhan', platform: 'Instagram', followerCount: 145000, avatarColor: avatar(7) },
  { id: 'cr_029', name: 'Neha Kulkarni', socialHandle: '@nehakulkarni', platform: 'YouTube', followerCount: 190000, avatarColor: avatar(8) },
  { id: 'cr_030', name: 'Suresh Babu', socialHandle: '@sureshbabu_', platform: 'Instagram', followerCount: 32000, avatarColor: avatar(9) },
  { id: 'cr_031', name: 'Pallavi Dubey', socialHandle: '@pallavidubey', platform: 'Instagram', followerCount: 110000, avatarColor: avatar(0) },
  { id: 'cr_032', name: 'Gaurav Thakur', socialHandle: '@gauravthakur', platform: 'YouTube', followerCount: 295000, avatarColor: avatar(1) },
  { id: 'cr_033', name: 'Ishita Bansal', socialHandle: '@ishitabansal', platform: 'Instagram', followerCount: 65000, avatarColor: avatar(2) },
  { id: 'cr_034', name: 'Naveen Prasad', socialHandle: '@naveenprasad', platform: 'YouTube', followerCount: 180000, avatarColor: avatar(3) },
  { id: 'cr_035', name: 'Sonali Ghosh', socialHandle: '@sonalighosh_', platform: 'Instagram', followerCount: 140000, avatarColor: avatar(4) },
  { id: 'cr_036', name: 'Akshay Mohan', socialHandle: '@akshaymohan', platform: 'YouTube', followerCount: 325000, avatarColor: avatar(5) },
  { id: 'cr_037', name: 'Bhavna Sethi', socialHandle: '@bhavnasethi', platform: 'Instagram', followerCount: 42000, avatarColor: avatar(6) },
  { id: 'cr_038', name: 'Tushar Rathore', socialHandle: '@tusharrathore', platform: 'Instagram', followerCount: 96000, avatarColor: avatar(7) },
  { id: 'cr_039', name: 'Rachna Pillai', socialHandle: '@rachnapillai', platform: 'YouTube', followerCount: 215000, avatarColor: avatar(8) },
  { id: 'cr_040', name: 'Yashwant Yadav', socialHandle: '@yashwantyadav', platform: 'Instagram', followerCount: 28000, avatarColor: avatar(9) },
  { id: 'cr_041', name: 'Kritika Malhotra', socialHandle: '@kritikamalhotra', platform: 'Instagram', followerCount: 170000, avatarColor: avatar(0) },
  { id: 'cr_042', name: 'Pranav Bose', socialHandle: '@pranavbose', platform: 'YouTube', followerCount: 105000, avatarColor: avatar(1) },
  { id: 'cr_043', name: 'Shalini Jain', socialHandle: '@shalinijain_', platform: 'Instagram', followerCount: 83000, avatarColor: avatar(2) },
  { id: 'cr_044', name: 'Mohit Chandra', socialHandle: '@mohitchandra', platform: 'YouTube', followerCount: 355000, avatarColor: avatar(3) },
  { id: 'cr_045', name: 'Deepika Roy', socialHandle: '@deeparoy', platform: 'Instagram', followerCount: 120000, avatarColor: avatar(4) },
  { id: 'cr_046', name: 'Arun Mathur', socialHandle: '@arunmathur', platform: 'YouTube', followerCount: 248000, avatarColor: avatar(5) },
  { id: 'cr_047', name: 'Megha Srivastava', socialHandle: '@meghasri', platform: 'Instagram', followerCount: 59000, avatarColor: avatar(6) },
  { id: 'cr_048', name: 'Nitin Rajput', socialHandle: '@nitinrajput_', platform: 'Instagram', followerCount: 155000, avatarColor: avatar(7) },
  { id: 'cr_049', name: 'Simran Kaur', socialHandle: '@simrankaur', platform: 'YouTube', followerCount: 275000, avatarColor: avatar(8) },
  { id: 'cr_050', name: 'Pankaj Dubey', socialHandle: '@pankajdubey', platform: 'Instagram', followerCount: 36000, avatarColor: avatar(9) },
  { id: 'cr_051', name: 'Jyoti Bhandari', socialHandle: '@jyotibhandari', platform: 'Instagram', followerCount: 101000, avatarColor: avatar(0) },
  { id: 'cr_052', name: 'Saurabh Garg', socialHandle: '@saurabhgarg_yt', platform: 'YouTube', followerCount: 185000, avatarColor: avatar(1) },
  { id: 'cr_053', name: 'Aparna Nambiar', socialHandle: '@aparnanambiar', platform: 'Instagram', followerCount: 74000, avatarColor: avatar(2) },
  { id: 'cr_054', name: 'Vivek Chauhan', socialHandle: '@vivekchauhan', platform: 'YouTube', followerCount: 390000, avatarColor: avatar(3) },
  { id: 'cr_055', name: 'Tanya Oberoi', socialHandle: '@tanyaoberoi', platform: 'Instagram', followerCount: 132000, avatarColor: avatar(4) },
  { id: 'cr_056', name: 'Hemant Kushwaha', socialHandle: '@hemantkushwaha', platform: 'YouTube', followerCount: 220000, avatarColor: avatar(5) },
  { id: 'cr_057', name: 'Nikita Vohra', socialHandle: '@nikitavorha', platform: 'Instagram', followerCount: 48000, avatarColor: avatar(6) },
  { id: 'cr_058', name: 'Aman Tripathi', socialHandle: '@amantripathi_', platform: 'Instagram', followerCount: 164000, avatarColor: avatar(7) },
  { id: 'cr_059', name: 'Sakshi Rawat', socialHandle: '@sakshirawat', platform: 'YouTube', followerCount: 305000, avatarColor: avatar(8) },
  { id: 'cr_060', name: 'Dhruv Malhotra', socialHandle: '@dhruvmalhotra', platform: 'Instagram', followerCount: 22000, avatarColor: avatar(9) },
];

export function getCreatorById(id) {
  return creators.find(c => c.id === id) || null;
}

/* ============================================
   Campaign–Creator Relationships
   ============================================ */

// Distribute creators across campaigns
// Camp 1 (Myntra): 40 creators, Camp 2 (Flipkart): 35 creators, Camp 3 (Amazon): 30 creators
// Some creators appear in multiple campaigns

function generateCampaignCreators() {
  const relationships = [];

  // Campaign 1 — Myntra Big Fashion Festival 2026 (creators 0–44)
  creators.slice(0, 45).forEach((cr, i) => {
    relationships.push({
      campaignId: 'camp_001',
      creatorId: cr.id,
      status: i < 35 ? 'Active' : 'Completed',
      joinedAt: `2026-09-0${Math.min(1 + (i % 5), 5)}`,
    });
  });

  // Campaign 2 — Myntra End of Reason Sale (EORS) (creators 0–37 and 40–49)
  [...creators.slice(0, 38), ...creators.slice(40, 50)].forEach((cr, i) => {
    relationships.push({
      campaignId: 'camp_002',
      creatorId: cr.id,
      status: i < 30 ? 'Active' : 'Completed',
      joinedAt: `2026-08-${15 + (i % 10)}`,
    });
  });

  // Campaign 3 — Myntra Festive Glam & Ethnic Rewards (creators 0–34 and 45–56)
  [...creators.slice(0, 35), ...creators.slice(45, 57)].forEach((cr, i) => {
    relationships.push({
      campaignId: 'camp_003',
      creatorId: cr.id,
      status: 'Completed',
      joinedAt: `2026-08-0${1 + (i % 7)}`,
    });
  });

  return relationships;
}

export const campaignCreators = generateCampaignCreators();

export function getCreatorsForCampaign(campaignId) {
  const rels = campaignCreators.filter(cc => cc.campaignId === campaignId);
  return rels.map(rel => {
    const creator = getCreatorById(rel.creatorId);
    return { ...creator, ...rel };
  }).filter(Boolean);
}

export function getCampaignCreatorRelation(campaignId, creatorId) {
  return campaignCreators.find(cc => cc.campaignId === campaignId && cc.creatorId === creatorId) || null;
}

export function getCampaignsForCreator(creatorId) {
  return campaignCreators.filter(cc => cc.creatorId === creatorId);
}
