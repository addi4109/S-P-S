# SPS — Satara Polytechnic Satara (React)

A React single-page application rebuilt from the static HTML snapshot of
[`satarapolytechnicsatara.com`](https://www.satarapolytechnicsatara.com).
The original static pages live in the parent `SPS` folder and are left untouched.

## Tech stack

- **Vite** + **React 18** + **React Router 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- The original site's compiled Tailwind output is kept as `src/styles/legacy.css`
  and imported after the Tailwind entry so every historical utility class renders
  identically.

## Getting started

```bash
npm install
npm run dev:all   # web (Vite) + API (Express) together
npm run dev       # front-end only
npm run dev:server# API only
npm run build     # production build (outputs to dist/)
npm run seed      # upload src/data modules into MongoDB
```

Configure `.env` first — copy `.env.example` and fill in:
`MONGODB_URI`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `CLOUDINARY_CLOUD_NAME`,
`CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

## Project structure

```
src/
├── main.jsx                  # entry — mounts <BrowserRouter>
├── App.jsx                   # route table
├── api.js                    # fetch client (login, resources, upload)
├── config/resources.js       # admin field schemas (single source of truth)
├── styles/                   # index.css (Tailwind + shared), legacy.css, page CSS
├── data/                     # static fallbacks (departments, staff, gallery, …)
├── hooks/                    # useReveal, usePageTitle, useResource
├── components/
│   ├── layout/               # Layout (Header + Outlet + Footer), Header, MobileDrawer, Footer
│   ├── ui/                   # Reveal, DeptCard, StaffCard, Lightbox, Spinner, Icons
│   └── home/                 # HeroSlider, NoticeTicker, AboutSection, DepartmentsSection, …
├── admin/                    # admin panel (RequireAdmin, AdminLayout, pages, components)
└── pages/                    # public pages + AdminLogin
server/
├── index.js                  # Express API: auth, CRUD, upload, status, production static
├── resources.js              # generic REST router for every editable collection
├── models/index.js           # Mongoose models
├── seed.js                   # uploads src/data modules into MongoDB (idempotent)
└── db.js                     # MongoDB connection
```

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/contact` | Contact |
| `/governing-body` | Governing Body |
| `/principal-desk` | Principal's Desk |
| `/departments` | Departments |
| `/departments/:slug` | Department staff (`computer`, `chemical`, `entc`, `mechanical`, `electrical`, `automobile`, `general-science`) |
| `/gallery` | Campus Gallery |
| `/placement` | Placement |
| `/grievance` | Grievance Cell |
| `/admission` | Admission Process |
| `/notice` | Notice Board |
| `/admin` | Admin login (College Login) |
| `/admin/dashboard` | Admin dashboard (counts + status) |
| `/admin/preview` | Virtual View (live site preview) |
| `/admin/:resource` | Manage one collection: `departments`, `staff`, `gallery`, `governingBody`, `notices`, `recruiters`, `hero`, `settings` |
| `*` | 404 |

## Admin panel

The admin panel (at `/admin`) provides **add / edit / delete** for every
content type. It is built from a generic CRUD screen (`src/admin/pages/ResourcePage.jsx`)
driven by field schemas in `src/config/resources.js`.

- **Login** — email + password from `.env` (`ADMIN_USERNAME` / `ADMIN_PASSWORD`).
- **Virtual View** — an iframe preview of the public site (url from `VITE_PUBLIC_URL`).
- **Image uploads** — files are uploaded to **Cloudinary** (`POST /api/upload`)
  and stored as URLs on the record.
- **Data** — every edit is written to **MongoDB** via the generic REST API.
  When MongoDB is unreachable the admin shows a warning and the public site
  falls back to the static `src/data` modules.

## API (`server/`)

| Endpoint | Auth | Purpose |
|---|---|---|
| `POST /api/login` | – | Admin login → JWT |
| `GET /api/me` | JWT | Validate session |
| `GET /api/status` | – | `{ mongodb, cloudinary }` connectivity |
| `GET/POST/PUT/DELETE /api/resources/:name[/:id]` | write: JWT | Generic CRUD for all collections |
| `POST /api/resources/reset` | JWT | Re-seed all collections from static data |
| `POST /api/upload` | JWT | Upload an image to Cloudinary → `{ url }` |
| `GET /api/notices`, `GET /api/data` | – | Public reads |

## Notes

- Assets live in `public/assets/` and are referenced as `/assets/...`.
- The **Notice** page reads from this app's MongoDB-backed `/api/notices`
  first, then the live SPS API, a CORS proxy, then an embedded fallback list.
- The gallery lightbox, mobile drawer, hero slider, marquee and scroll-reveal
  effects are React ports of the behaviours in the original `js/` files.
