# Feature PRD: Brand Reward Program Analytics Dashboard
**Audience:** Frontend / Full-Stack Engineering Team  
**Module:** Brand Analytics Portal (`/brand`)  
**Status:** Ready for Tech Execution / Maintenance  

---

## 1. Objective & Scope

### 1.1 What We Are Building
A brand-facing performance analytics dashboard where retail brands (e.g. Myntra) can monitor the commercial performance of their creator reward programs in real-time.

### 1.2 Core Metrics Tracked
The brand only tracks 3 commercial pillars:
1. **Views** (Audience reach & impressions)
2. **Clicks** (Inbound catalog traffic)
3. **Sales Driven** (Gross affiliate revenue generated in ₹)

### 1.3 Strict Exclusions (Do NOT Build)
- ❌ **No Reward Disbursements / Creator Payouts**: Brands should not see individual creator milestone payouts.
- ❌ **No Order Volume Tracking**: No "Total Orders" or "Orders Placed". Focus solely on gross sales (₹ GMV).
- ❌ **No Program / Task Creation**: Program setup happens in the internal admin portal.

---

## 2. Page Hierarchy & Routes

| Route | Page Component | Key Responsibilities |
| :--- | :--- | :--- |
| `/signin` | `SignIn.jsx` | Clean 1-card authentication with 1-Click Demo Login (`brand.partner@myntra.com`). |
| `/` | `Dashboard.jsx` | Executive summary: Total Content, Views, Clicks, Sales + Recent Campaigns table. |
| `/campaigns` | `CampaignList.jsx` | Searchable directory of all brand reward programs with active/completed status. |
| `/campaigns/:id` | `CampaignDashboard.jsx` | Campaign deep-dive: 5 KPI cards, time-series chart, content efficiency card, and creators table. |
| `/campaigns/:id/creators/:creatorId` | `CreatorDetail.jsx` | Single creator's campaign metrics, daily graph, content table, and direct video links. |
| `/creators` | `Creators.jsx` | Directory of all creators with follower counts, enrolled campaigns, and direct social links. |
| `/creators/:creatorId` | `CreatorProfilePage.jsx` | Multi-campaign view: Shows creator's aggregated performance across all 3 Myntra campaigns. |
| `/analytics` | `Analytics.jsx` | Macro benchmark: Metric switcher chart (Views/Clicks/Sales), platform split (IG vs YT), and cross-campaign matrix. |

---

## 3. Data Schema & Contracts

### 3.1 Content Object (Atomic Entity)
Every view, click, and rupee of sales originates from individual published content pieces:
```typescript
interface ContentItem {
  id: string;              // e.g. "cnt_101"
  campaignId: string;      // e.g. "camp_001"
  creatorId: string;       // e.g. "cr_001"
  title: string;           // e.g. "Top 10 Festive Haul"
  platform: 'Instagram' | 'YouTube';
  contentUrl: string;      // e.g. "https://instagram.com/p/xyz"
  thumbnailUrl?: string;
  views: number;
  clicks: number;
  sales: number;           // Gross revenue in ₹
  publishedAt: string;     // ISO Date string: "YYYY-MM-DD"
}
```

### 3.2 Creator Object
```typescript
interface Creator {
  id: string;              // e.g. "cr_001"
  name: string;            // e.g. "Aditi Sharma"
  socialHandle: string;    // e.g. "@aditisharma"
  platform: 'Instagram' | 'YouTube';
  followerCount: number;
  avatarColor: string;
}
```

---

## 4. Business Logic & Calculation Rules

```
Total Views   = sum(content.views)
Total Clicks  = sum(content.clicks)
Total Sales   = sum(content.sales)

CTR (%)              = (Total Clicks / Total Views) * 100
Avg Views / Post     = Total Views / Total Content Count
Avg Clicks / Post    = Total Clicks / Total Content Count
Avg Sales / Post     = Total Sales / Total Content Count
Revenue / Click      = Total Sales / Total Clicks
Avg Posts / Creator  = Total Content Count / Total Creator Count
```

### Social Media Deep-Link Resolution
When rendering any platform cell or social handle:
- **Instagram**: `https://www.instagram.com/${handle.replace('@', '')}/`
- **YouTube**: `https://www.youtube.com/@${handle.replace('@', '')}`
- **Interaction**: Must open in a new tab (`_blank`, `noopener,noreferrer`) and trigger `e.stopPropagation()` so it does not trigger table row navigation.

---

## 5. UI Architecture & Reusable Components

```
src/components/
├── Layout/
│   ├── AppLayout.jsx         // Main shell with sidebar & floating shopping bag
│   └── Sidebar.jsx           // HaulPack logo, menu links, user badge, Sign Out
├── common/
│   ├── KPICard.jsx           // Metric card with icon and accent border
│   ├── DataTable.jsx         // Sortable table with column definitions & custom renders
│   ├── StatusBadge.jsx       // Active (green), Completed (slate) pill
│   ├── SearchBar.jsx         // Debounced search input
│   ├── FilterDropdown.jsx    // Simple select menu
│   └── ExportButton.jsx      // CSV / PDF export trigger
├── campaign/
│   ├── CampaignPerformanceChart.jsx // Line/Area chart with time & metric filters
│   └── ContentSummary.jsx           // Unit economics stats + horizontal platform bar
└── content/
    ├── ContentCard.jsx       // Post preview card with Views, Clicks, Sales pills
    └── ContentDetailDrawer.jsx // Slide-over drawer with 2x2 performance grid
```

---

## 6. Engineering Acceptance Criteria

### ✅ Authentication & Session
- [ ] Direct visit to `/signin` loads a clean, centered card with HaulPack logo.
- [ ] Clicking "Quick Demo Access" logs in and navigates to `/` in $< 500\text{ms}$.
- [ ] Clicking "Sign Out" in Sidebar clears auth status and navigates to `/signin`.

### ✅ Dashboard & Campaign Pages
- [ ] Dashboard displays 4 aggregate cards: Content Created, Views, Clicks, Sales.
- [ ] Recent campaigns table lists all campaigns with exact columns: `CONTENT`, `VIEWS`, `CLICKS`, `SALES`, and `STATUS`.
- [ ] Campaign detail page top KPI cards contain 5 metrics (`Creators`, `Content`, `Views`, `Clicks`, `Sales`).
- [ ] Content Performance section does **NOT** duplicate top KPI totals; displays `Avg Views/Post`, `Avg Clicks/Post`, `Avg Sales/Post`, `CTR`, and `Posts/Creator`.

### ✅ Creator Directory & Direct Links
- [ ] Clicking any creator's platform badge (`Instagram ↗` or `YouTube ↗`) opens their profile in a new tab without expanding/navigating the row.
- [ ] Clicking a creator in `/creators` routes to `/creators/:id` showing multi-campaign performance across all 3 Myntra campaigns.
- [ ] From campaign-specific creator detail (`/campaigns/:id/creators/:id`), the header link *"View All Campaigns & Multi-Program Analytics"* routes to `/creators/:id`.

### ✅ Analytics Suite
- [ ] Metric switcher tabs (`Views`, `Clicks`, `Sales`, `Content`) dynamically update the comparison bar chart with correct colors and currency formatting.
- [ ] Content Unit Economics card displays a clean 4-item grid.
- [ ] Platform Channel card displays Donut chart and side-by-side Instagram vs. YouTube breakdown.

---

## 7. Tech Stack & Dependencies

- **Framework**: React 18 + Vite
- **Routing**: React Router DOM v6
- **Charts**: Recharts (`ResponsiveContainer`, `BarChart`, `AreaChart`, `PieChart`)
- **Icons**: Lucide React
- **Styling**: Vanilla CSS with HaulPack Design Tokens (`--hp-primary: #6538ea`, `--hp-dark-purple: #342e56`)
- **Zero Heavy Framework Overheads**: No Tailwind, no component bloated libraries.
