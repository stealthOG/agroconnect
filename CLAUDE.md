# AgroConnect — Codebase Guide

## Architecture in one sentence

Vanilla JS SPA frontend (no framework, no bundler yet) talking to a Node/Express/TypeScript backend backed by PostgreSQL via Prisma. All services have dev-mode fallbacks — keys in `.env` activate real integrations.

---

## Frontend

### How screens work

Every screen is a JavaScript function that returns an HTML string. The router (`js/router.js`) calls the function, sanitises the output with DOMPurify, and writes it to `#app-content`.

```
AC_STATE.navigate('input-market')
  → AC_ROUTER.show('input-market')
    → auth guard (not logged in? → showAuthScreen('login'))
    → role guard (wrong role? → navigate('home'))
    → AC_SCREENS.inputMarket() returns HTML string
    → DOMPurify.sanitize(html) → app.innerHTML
    → AC_ROUTER.postRender('input-market')  // fires initInputMarket()
```

### Globals

| Global | File | Purpose |
|---|---|---|
| `AC_STATE` | `js/state.js` | App state, cart, wishlist, auth tokens, navigation |
| `AC_ROUTER` | `js/router.js` | Screen routing with auth + role guards |
| `AC_SCREENS` | All `screens/*.js` | All screen render functions via `Object.assign` |
| `AC_DATA` | `js/data.js` | Mock data (used as fallback when API_BASE_URL is empty) |
| `AC_API` | `js/api.js` | Fetch wrapper — all HTTP calls go here |
| `AC_DL` | `js/screens/data-layer.js` | Transparent adapter: calls API if configured, else AC_DATA |
| `AC_UI` | `js/screens/ui-helpers.js` | Skeleton, empty-state, error-state HTML helpers |
| `AC_PAY` | `js/api.js` | Paystack popup wrapper |
| `AC_CONFIG` | `index.html` | Runtime config (API URL, Paystack key, etc.) |

### Adding a new screen

1. Add a render function to the appropriate `js/screens/<role>/<role>.js` file via `Object.assign(AC_SCREENS, { myScreen() { return \`...\`; } })`
2. Register the route in `AC_ROUTER.screens` in `js/router.js`
3. If role-restricted, add to `AC_ROUTER.roleScreens`
4. If it needs post-render init (charts, maps), add a case to `AC_ROUTER.postRender()`

### Loading state pattern

```js
// undefined = not fetched yet, null = loading, [] = empty, [...] = data
if (AC_STATE._myCache === undefined) {
  AC_STATE._myCache = null;          // show skeleton immediately
  AC_DL.fetchSomething().then(data => {
    AC_STATE._myCache = data;
    if (AC_STATE.currentScreen === 'my-screen') AC_ROUTER.show('my-screen');
  }).catch(() => {
    AC_STATE._myCache = undefined;   // reset so retry works
    if (AC_STATE.currentScreen === 'my-screen') AC_ROUTER.show('my-screen');
  });
}

// In the template:
if (AC_STATE._myCache === null)      return AC_UI.listSkeletons(5);
if (AC_STATE._myCache === undefined) return AC_UI.error({ retryFn: "AC_STATE._myCache=undefined;AC_ROUTER.show('my-screen')" });
if (!AC_STATE._myCache.length)       return AC_UI.empty({ icon:'📭', title:'Nothing here' });
```

---

## Backend

### Directory layout

```
server/src/
├── app.ts              Express app — middleware order matters (webhook before JSON parser)
├── index.ts            Server entry, graceful shutdown, process signal handlers
├── controllers/        One file per domain: auth, products, orders, payments, wallet, uploads
├── routes/             Express routers — thin, just middleware + controller wiring
├── services/           External integrations: paystack, sms, email, storage
├── middleware/         auth (JWT verify + requireRole), upload (multer), asyncHandler
├── validators/         Zod schemas — server-side validation for every endpoint
├── lib/                prisma, jwt, logger (Pino), sentry
└── __tests__/          Jest tests — unit tests for middleware, JWT, validators, Paystack sig
```

### Middleware order in app.ts

```
helmet (security headers)
cors (origin whitelist)
POST /payments/webhook (raw body — must be BEFORE JSON parser)
express.json() (body parser)
rateLimit (global 100/min)
request logging
routes
404 handler
global error handler
```

### Auth flow

```
POST /auth/register → create user + wallet → send OTP via SMS + email
POST /auth/otp/verify → verify OTP → issue access token (15m) + refresh token (7d)
POST /auth/login → verify password → issue tokens
All protected routes: Authorization: Bearer <accessToken>
401 → frontend calls POST /auth/refresh → new token pair → retry
```

### Adding a new API endpoint

1. Add Zod schema in `src/validators/`
2. Write controller function (async, void return) in `src/controllers/`
3. Register route in `src/routes/`
4. Mount router in `src/app.ts`
5. Add to `AC_API` object in `js/api.js`
6. Write a test in `src/__tests__/`

### Services — dev mode fallback pattern

Every external service checks for its key at call time:
```typescript
export async function sendOtpSms(phone: string, code: string) {
  if (!process.env['TERMII_API_KEY']) {
    console.log(`[SMS:dev] ${phone}: ${code}`);  // dev fallback
    return { sent: true, devMode: true };
  }
  // ... real API call
}
```
Drop the key in `.env` and the real service activates, no code change needed.

---

## Key conventions

- **No raw `console.log` in production code** — use `logger` from `src/lib/logger.ts` (Pino)
- **All async route handlers should use `asyncHandler()`** from `src/middleware/asyncHandler.ts` — prevents unhandled rejections
- **All user input validated with Zod** before reaching business logic
- **Prisma for all DB queries** — never string-concatenate SQL
- **DOMPurify on all `innerHTML`** assignments — `router.js` sanitises all screen output
- **Frontend caches use the `undefined/null/[]/data` pattern** — see loading state section above

---

## Running tests

```bash
cd server
npm test                  # all tests
npm run test:coverage     # with coverage report
```

Tests that need DB: mock Prisma with `jest.mock('../lib/prisma')`. Tests that only test pure logic (JWT, Zod, Paystack sig) run with no external dependencies — they're the ones in `__tests__/`.

---

## Deployment checklist

- [ ] Set all required env vars (see README)
- [ ] Run `npm run db:migrate` on the target database
- [ ] Set `FRONTEND_URL` to the real frontend origin (CORS)
- [ ] Register Paystack webhook URL: `https://<your-api>/api/v1/payments/webhook`
- [ ] Verify `GET /api/health` returns `{ db: "ok" }`
- [ ] Check Sentry is receiving test events
