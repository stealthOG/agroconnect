# AgroConnect

Nigeria's digital agricultural marketplace — connecting farmers, agro-suppliers, experts, cooperatives, and financial institutions.

## Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JS SPA, CSS design tokens |
| Backend | Node.js · Express · TypeScript |
| Database | PostgreSQL via Prisma ORM |
| Auth | JWT (access + refresh), SMS OTP via Termii |
| Payments | Paystack |
| Storage | Cloudinary |
| Email | SendGrid |
| Maps | Mapbox GL JS |
| Logging | Pino |
| Error tracking | Sentry (optional) |
| Tests | Jest + ts-jest |
| CI | GitHub Actions |

---

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- A Paystack account (test keys work locally)

---

## Local setup

### 1 — Clone and install

```bash
git clone <repo-url>
cd agroconnect/server
npm install
```

### 2 — Environment

```bash
cp .env.example .env
```

Edit `.env` and set at minimum:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/agroconnect_dev"
JWT_ACCESS_SECRET=<run: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
JWT_REFRESH_SECRET=<run same command again>
```

All other keys are optional for local development — the services fall back to dev mode (console.log) when keys are absent.

### 3 — Database

```bash
# Apply schema migrations
npm run db:migrate

# (Optional) open Prisma Studio to inspect data
npm run db:studio
```

### 4 — Run

```bash
# API server with hot reload
npm run dev
# → http://localhost:4000

# Health check
curl http://localhost:4000/api/health
```

### 5 — Frontend

Open `index.html` directly in a browser, or serve with any static server:

```bash
npx serve .
```

To point the frontend at your local API, edit the `AC_CONFIG` block in `index.html`:

```js
window.AC_CONFIG = {
  API_BASE_URL: 'http://localhost:4000',
  ...
};
```

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `JWT_ACCESS_SECRET` | ✅ | 64-byte hex secret for access tokens |
| `JWT_REFRESH_SECRET` | ✅ | 64-byte hex secret for refresh tokens |
| `JWT_ACCESS_EXPIRES_IN` | | Default `15m` |
| `JWT_REFRESH_EXPIRES_IN` | | Default `7d` |
| `PAYSTACK_SECRET_KEY` | | `sk_test_...` or `sk_live_...` |
| `TERMII_API_KEY` | | SMS OTP — falls back to console.log without it |
| `TERMII_SENDER_ID` | | Default `AgroConnect` |
| `SENDGRID_API_KEY` | | Email — falls back to console.log without it |
| `EMAIL_FROM` | | Default `no-reply@agroconnect.ng` |
| `CLOUDINARY_CLOUD_NAME` | | File uploads — falls back to placeholder URL |
| `CLOUDINARY_API_KEY` | | |
| `CLOUDINARY_API_SECRET` | | |
| `SENTRY_DSN` | | Backend error tracking |
| `FRONTEND_URL` | | CORS whitelist — default `http://localhost:3000` |
| `PORT` | | Default `4000` |
| `LOG_LEVEL` | | Default `info` |

Frontend keys (set in `index.html` `AC_CONFIG`):

| Key | Description |
|---|---|
| `API_BASE_URL` | Backend URL |
| `PAYSTACK_PUBLIC_KEY` | `pk_test_...` or `pk_live_...` |
| `MAPBOX_API_KEY` | `pk.eyJ1...` |
| `SENTRY_DSN_FRONTEND` | Browser error tracking |

---

## Scripts

```bash
npm run dev          # start with hot reload
npm run build        # compile TypeScript → dist/
npm start            # run compiled build
npm test             # run Jest test suite
npm run test:coverage # with coverage report
npm run db:migrate   # apply Prisma migrations
npm run db:generate  # regenerate Prisma client after schema change
npm run db:studio    # open Prisma Studio
```

---

## Project structure

```
agroconnect/
├── index.html               # Frontend entry point
├── css/                     # Design tokens, layout, components
├── js/
│   ├── api.js               # API client (all fetch calls)
│   ├── state.js             # App state + auth tokens
│   ├── router.js            # Screen router + auth/role guards
│   ├── screens/
│   │   ├── data-layer.js    # API/mock adapter (swap for real API)
│   │   ├── ui-helpers.js    # Skeleton, empty-state, error-state
│   │   ├── auth/            # Login, OTP, signup screens
│   │   ├── farmer/          # Market, cart, checkout, orders
│   │   ├── supplier/        # Dashboard, listings, uploads
│   │   ├── expert/          # Courses
│   │   ├── cooperative/     # Members, loans
│   │   ├── institution/     # Compliance, geo-map
│   │   ├── shared/          # Wallet, profile, notifications
│   │   └── whatsapp/        # WhatsApp bot placeholder
│   └── legacy/              # Deprecated — do not import
└── server/
    ├── src/
    │   ├── app.ts           # Express app (middleware, routes)
    │   ├── index.ts         # Server entry + graceful shutdown
    │   ├── controllers/     # Route handlers
    │   ├── routes/          # Express routers
    │   ├── services/        # Paystack, SMS, email, storage
    │   ├── middleware/       # Auth, upload, asyncHandler
    │   ├── validators/       # Zod schemas
    │   ├── lib/             # Prisma, JWT, logger, Sentry
    │   ├── __tests__/       # Jest test suite
    │   └── generated/       # Prisma client (auto-generated)
    └── prisma/
        └── schema.prisma    # Database schema
```

---

## API

All endpoints are prefixed `/api/v1/`.

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | — | Create account |
| POST | `/auth/login` | — | Get tokens |
| POST | `/auth/otp/send` | — | Send OTP |
| POST | `/auth/otp/verify` | — | Verify OTP → tokens |
| POST | `/auth/refresh` | — | Rotate refresh token |
| POST | `/auth/logout` | — | Revoke refresh token |
| GET | `/users/me` | ✅ | Current user profile |
| PATCH | `/users/me` | ✅ | Update profile |
| GET | `/products` | ✅ | List products (filterable) |
| POST | `/products` | supplier | Create product |
| PATCH | `/products/:id` | supplier | Update product |
| GET | `/orders` | ✅ | List orders |
| POST | `/payments/initialize` | farmer | Create order + init payment |
| GET | `/payments/verify/:ref` | ✅ | Verify payment |
| POST | `/payments/webhook` | — | Paystack webhook |
| GET | `/wallet` | ✅ | Wallet balance + stats |
| GET | `/wallet/transactions` | ✅ | Transaction history |
| POST | `/wallet/topup` | ✅ | Init wallet top-up |
| POST | `/uploads` | ✅ | Upload file |
| GET | `/api/health` | — | Health check + DB status |

---

## Deployment

### Backend (Railway / Render / VPS)

```bash
npm run build
node dist/index.js
```

Set all required environment variables in your hosting dashboard.

### Frontend

Deploy the root directory as a static site (Netlify / Vercel / GitHub Pages).  
Configure SPA rewrites so all routes serve `index.html`.

### Database

Use a managed PostgreSQL service (Supabase, Neon, AWS RDS).  
Run migrations on deploy: `npm run db:migrate`.
