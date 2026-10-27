# Youth Association of Pakistan — YAP platform

A Next.js App Router + TypeScript foundation for the YAP public website and private CMS, using MySQL and Prisma. It includes a responsive public identity, database-backed public listings, application/contact/newsletter workflows, server-side admin sessions and role gates, operational dashboard, and production deployment scaffolding.

> **Launch readiness:** Payment processing, uploads, email delivery, comprehensive CRUD forms, exhaustive RBAC workflows, and production integration tests require provider credentials and further implementation. No payment integration is enabled and no donation can be treated as verified by this starter. Do not publish demo content or accept payments until these are completed and reviewed.

## Requirements

- Node.js 20.9 or newer and npm
- A remotely hosted, Vercel-compatible MySQL database (for example, a managed MySQL service). Do not use localhost for production.
- A strong random `AUTH_SECRET` (reserved for future token/signature integrations; admin sessions currently use cryptographically random opaque cookies and hashed session tokens).

## Local setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL`, `AUTH_SECRET`, and `NEXT_PUBLIC_SITE_URL`. Never commit `.env`.
2. Install dependencies with `npm install`.
3. Create/apply your development schema using `npm run db:migrate`.
4. Add clearly labeled development data using `npm run db:seed`.
5. Provision the first administrator securely in a terminal with `npm run admin:create`. The script prompts for the name, email, and a 14+ character password; there is no public sign-up route.
6. Start the development server with `npm run dev`.
7. Visit `/` for the public website and `/admin/login` for administrators.

For detailed Hostinger MySQL setup, remote access/IP allowlisting guidance, and first-admin provisioning, see [DB_SETUP.md](DB_SETUP.md). There are no default admin credentials; create them from a trusted terminal with `pnpm admin:create`.

Membership applicants submit bank transfer details and a payment screenshot (JPG, PNG, or WebP, max 5 MB). The screenshot is stored in MySQL and served only to authorized membership administrators. Apply the `20261027000000_membership_payment_proof` migration before using the updated form.

After the migration is applied, authorized admins can configure the fixed fee and bank/wallet destinations under `/admin/settings`. These settings are read by the public membership form; other admin list pages are not generic editors, so only data explicitly connected to a public page/API will affect the front end.

The admin content forms also accept image uploads from a device. Apply the `20261027000100_admin_media_uploads` migration before uploading images; upload bytes are stored in the `MediaAsset` table so they persist across deployments and do not depend on a local server disk.

If the database reports Hostinger's `max_connections_per_hour` limit, stop/restart local dev servers and other processes using the database, then wait for the provider's quota window to reset or ask support to raise the limit. The app pool now defaults to two connections per process (`DB_CONNECTION_LIMIT`), but separate local/preview/production processes each create their own pool.

Set a database connection limit/pooling strategy appropriate to your provider and Vercel serverless concurrency. Run `npm run db:deploy` as a controlled deployment step; do not run destructive development migrations in production.

## Environment variables

- `DATABASE_URL`: externally hosted MySQL connection URL.
- `AUTH_SECRET`: long random secret reserved for secure auth ecosystem additions.
- `NEXT_PUBLIC_SITE_URL`: canonical public origin.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: optional, not yet wired to an upload route.
- `RESEND_API_KEY`, `EMAIL_FROM`: optional, not yet wired to mail delivery.
- `PAYMENT_PROVIDER`, `PAYMENT_SECRET_KEY`, `PAYMENT_WEBHOOK_SECRET`: optional placeholders only; no gateway is implemented or configured.

Configure actual values in Vercel project environment settings, never in source control. Production and preview environments should use separate databases and credentials.

## Deploy to Vercel

1. Provision a managed MySQL database with serverless-compatible connectivity and allow the Vercel deployment to connect.
2. Add environment variables in Vercel for Production and Preview separately.
3. Run Prisma migrations from a controlled deployment job or developer environment with `npm run db:deploy`; do not migrate on every build.
4. Deploy the project. The build generates Prisma Client; database queries are served through Prisma Client.
5. Check `/api/health`, then provision the first production Super Admin through a trusted environment connected to the production database. Use a secure terminal, not a public route.
6. Configure and test external email, media, and country-eligible payment providers before enabling related features.

## Migration permissions

The initial schema is validated, but a Prisma migration has not been applied. `prisma migrate dev` requires permission to create a temporary shadow database. Some shared MySQL plans (including restricted hosting accounts) deny that permission. Use a dedicated development database/user with schema-creation rights or provision an isolated shadow database and configure Prisma's `shadowDatabaseUrl`; do not point a shadow database at production data. This workspace's configured remote database rejected shadow-database creation, so schema migrations and production data were not changed. Have the database administrator provision the appropriate development/shadow database, then run and review the first migration before deployment.

## Security notes

- Admin session cookies are HTTP-only, SameSite=Lax, Secure in production; database stores only a SHA-256 hash of the opaque session token.
- Passwords are hashed with bcrypt. Provision account passwords securely and rotate promptly if exposed.
- RBAC checks run on the server for admin sections. This starter intentionally has a narrower subset of full requested role/module workflows.
- Public application data is not exposed in public lists. Donation totals count only `VERIFIED` records.
- Public forms use Zod validation, database constraints, and a honeypot field. Production deployments must additionally add durable distributed rate limiting, spam defenses, and operational monitoring.
- No card data is collected or stored. Do not consider a redirect or client response proof of payment.
- Demo seed text is explicitly marked for development and must not be presented as verified organizational information.

## Current routes

Public: `/`, `/about`, `/projects`, `/events`, `/stories`, `/team`, `/careers`, `/membership`, `/contact`, `/gallery`, `/faq`, `/privacy`, `/terms`, `/donation-transparency`.

Admin: `/admin/login`, `/admin` and server-protected module lists.

API: membership, contact, newsletter, admin login/logout, and health check.

## Development verification

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npx prisma validate`
- `npx prisma migrate dev`

Database-dependent checks require a reachable MySQL service. Test forms and authentication against a non-production database. Never use demo seed data as financial/impact statements.
# yap
