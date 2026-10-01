# Komorebi Wear — COD Store

A React + Vite clothing storefront with a real Express backend and Cash on Delivery checkout.

## Included
- Responsive Komorebi Wear storefront
- 12 clothing/accessory products
- Product filtering, search, quick view, size selection
- Cart quantity controls and totals
- **Cash on Delivery only** — no debit/credit card checkout
- Customer checkout form: name, phone, email, city, address, notes
- Real `POST /api/orders` backend endpoint
- Orders saved to `data/orders.json`
- Automatic store email notification through Resend
- Protected `GET /api/orders` endpoint for admin order viewing
- Production Express server that serves the Vite build

## Local setup

1. Install Node.js 18+.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Set `RESEND_API_KEY` in `.env` for automatic order emails.
5. Set `STORE_EMAIL` to the email address that should receive new orders.
6. Run `npm run dev` for frontend development. The Vite proxy sends `/api` requests to port 8787, so run the backend in another terminal with `npm run dev:server`.
7. For production: `npm run build` then `npm start`.

## Email setup

The default store email is `huzafakareem479@gmail.com` (the address supplied in the request appears to contain a `gmsil` typo; change `STORE_EMAIL` if that was intentional).

Set:

```env
STORE_EMAIL=huzafakareem479@gmail.com
STORE_PHONE=03252331785
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=Komorebi Wear <onboarding@resend.dev>
ADMIN_TOKEN=use-a-long-random-token
PORT=8787
```

For production, use a verified sending domain/email in Resend instead of the onboarding sender.

## API

- `GET /api/health` — health check
- `POST /api/orders` — validates and creates a COD order
- `GET /api/orders` — returns saved orders when the `x-admin-token` header matches `ADMIN_TOKEN`
