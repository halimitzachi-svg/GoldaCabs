# GoldaCabs Roadmap

## Phase 1: Foundation & Setup
- [x] Project Initialization (Next.js 14+, Tailwind, TypeScript)
- [x] Install Core Dependencies (Framer Motion, Lucide)
- [x] UI Design System Setup (Luxury Dark Theme, Gold Accents)
- [x] Pricing Engine Configuration
  - [x] **Core Location:** `data/cities.ts` (Manage km rates, base fees, and regional multipliers here)
  - [x] **Regional Multipliers:** North/South (1.1x), Jerusalem (1.05x)

## Phase 2: Core Features
- [x] **Home Page (Hero Section)**
  - [x] High-impact personal branding (Video Background)
  - [x] "Call to Action" buttons (WhatsApp Integration)
- [x] **Smart Price Calculator**
  - [x] Google Maps Places Autocomplete integration
  - [x] Dynamic pricing logic (Distance, Time, Passengers, Region)
  - [x] Multilingual Support (HE/EN)
- [ ] **Smart Flight Input** (Future enhancement)

## Phase 3: Trust & Content (SEO Strategy)
- [x] **Dynamic City Pages** (`/taxi-[city]`, `/en/taxi-[city]`)
  - [x] 60+ locations coverage
  - [x] Internal linking mesh (Nearby cities component)
  - [x] Categorized Service Areas in Footer
- [ ] **Reviews Integration** (Google Business Profile)
  - [ ] Update website link in Google Business Profile to `goldacabs.co.il`
  - [ ] Locate canonical Place ID once GBP update is propagated
  - [ ] Connect `app/api/reviews/route.ts` to display real customer feedback

## Phase 4: Polish & Launch
- [x] Performance Optimization (Video WebM + WebP Poster)
- [x] SEO Meta Tags & Structured Data (JSON-LD)
- [ ] **Post-Launch SEO Strategy**
  - [ ] Implement 301 Redirects from `taxi-michael.co.il` to `goldacabs.co.il`
  - [ ] Monitor Search Console for indexing success
- [ ] Final Deployment & Production Check


Place ID for google testimonials:
ChIJPX-v0hAtHRURK8j0N6_v2K4