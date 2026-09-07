# HaulPack — Brand Reward Program Analytics & Performance Portal

Production-ready Brand-Side Analytics and Performance Dashboard built for **HaulPack** to provide enterprise retail brands (e.g., Myntra) with granular visibility into influencer reward campaigns, creator performance, content unit economics, and verified gross sales attribution.

![HaulPack](public/haulpack-logo.png)

---

## 🚀 Key Capabilities

- **Executive Brand Dashboard (`/`)**: Real-time aggregate performance tracking (Total Content Created, Total Views, Total Clicks, Gross Sales Driven) and recent campaign health.
- **Campaign Deep-Dive (`/campaigns/:id`)**: Comprehensive analytics for active and completed retail programs (e.g., *Myntra Big Fashion Festival*, *End of Reason Sale*, *Festive Glam & Ethnic Rewards*).
- **Creator Performance Leaderboard**: Creator-wise sorting, search, reach metrics, sales driven, and **direct clickable hyperlinks to live Instagram / YouTube accounts**.
- **Cross-Campaign Creator Profiles (`/creators/:id`)**: Unified scorecard evaluating creator consistency across all 3 Myntra campaigns simultaneously.
- **Brand Analytics Suite (`/analytics`)**: Interactive campaign benchmark comparison chart (switch between Views, Clicks, Sales, and Content), content unit economics (Avg Views/Clicks/Sales per post, Revenue per Click), and channel distribution (Instagram vs. YouTube).
- **Minimal Enterprise Sign-In (`/signin`)**: Distraction-free authentication with 1-Click Quick Demo Sign In.

---

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router DOM v6
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Styling**: HaulPack Design System (Plus Jakarta Sans, Electric Violet `#6538ea`, Lilac `#f2edfc`, Dark Navy-Purple `#342e56`)

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The application will be live at `http://localhost:5173/`.

### 3. Production Build
```bash
npm run build
```

---

## 📖 Documentation & PRDs

- **[Simple Plain-English PRD](docs/PRD.md)**: Universal guide explaining every page, feature, and component.
- **[Technical Feature PRD](docs/TECH_PRD.md)**: Engineering specification covering data schemas, business logic formulas, and acceptance criteria.
