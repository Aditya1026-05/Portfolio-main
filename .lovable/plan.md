# Portfolio Upgrade Plan

## 1. Instant load (quick)

- Remove the staggered character-by-character animation delays in `Hero.tsx` (currently up to ~1.6s before CTAs appear). Keep a subtle 200ms fade-in instead so the page is usable immediately.
- Remove `whileInView` initial `opacity: 0` offsets that block first paint on sections above the fold.

## 2. Remove the 4 stat blocks (quick)

- Delete the "20+ / 5+ / 10+ / ∞" grid from `About.tsx`.

## 3. Contact form ("Say hello" → Name / Email / Message → Send)

- Replace the mailto anchor with a dialog form (name, email, message, validated with zod).
- On submit: save to a `contact_messages` table (so nothing is ever lost) **and** send an email to `adityatayal2610@gmail.com`.
- Email delivery uses **Lovable Emails** (built-in). This requires a one-click email domain setup on your side — I'll surface the setup card after wiring the code. Until DNS is verified, messages still land in the database and you can see them in the admin panel.

## 4. Admin-only CMS (email + password, just for you)

Enable Lovable Cloud with:

- **Auth**: email/password. First-run: you sign up once, I promote that account to `admin` (via a `user_roles` table + `has_role` security-definer function — the standard secure pattern). No public signup UI.
- **Tables** (with RLS: public read, admin-only write):
  - `projects` (title, description, tags[], year, links, image, sort_order)
  - `skills` (category, items[], sort_order)
  - `experience` (year, title, org, description, icon, sort_order)
  - `site_content` (key/value store for Hero headline, About bio, tagline, social links, email)
  - `contact_messages` (name, email, message, created_at) — admin read only
- **Public site**: `Hero`, `About`, `Skills`, `Projects`, `Experience` fetch from these tables; existing hardcoded content is seeded as initial rows so nothing visually changes.
- **Admin panel** at `/admin` (protected route, redirects to `/auth` if not signed in / not admin):
  - Tabs: Hero + About · Projects · Skills · Experience · Messages
  - Each tab: list + add / edit / delete with inline forms
  - Messages tab: read-only inbox of contact submissions

## 5. Technical notes

- Stack stays TanStack Start + React + Tailwind + Framer Motion.
- Data fetching via TanStack Query in route loaders.
- Admin writes via `createServerFn` with `requireSupabaseAuth` + `has_role('admin')` check.
- Contact submit is a public server route (`/api/public/contact`) with zod validation + rate-safe insert.
- No design changes to the public site — same black minimal aesthetic.

## What I need from you after building

- One click on the email domain setup card to enable auto-emails (optional; DB inbox works without it).
- Sign up once at `/auth` with your email; I'll wire the promotion so that first account becomes admin automatically.

Approve and I'll build all of this.
