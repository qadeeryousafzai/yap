# Deploy this project to Vercel with a Hostinger MySQL database

This guide connects the **Next.js app on Vercel** to **MySQL on Hostinger**. The domain can stay registered at Hostinger; it does not have to host the app. Vercel must be able to reach Hostinger's MySQL endpoint over the network, and Hostinger must permit that connection. Shared-hosting plans and Vercel deployments may not provide compatible fixed outbound IP access—confirm this before deployment. Never open MySQL to every IP (`0.0.0.0/0`).

## Before you start

- A working Hostinger hPanel account and a plan that supports remote MySQL connections.
- A Vercel account and access to this project's Git repository.
- A local working copy of the project and Node.js 20.9 or newer.
- A domain you control (optional; the default `*.vercel.app` address works initially).
- A backup of any existing database before schema migrations.

## 1. Check that Hostinger can accept Vercel connections

1. Sign in to hPanel and open the MySQL database management page for your website/account. Menu names vary by plan.
2. Locate the database host, port, database name, and database username. Do not assume the database host is `localhost`.
3. Find the remote-connection/remote-MySQL setting and its allowed-IP list. Check Hostinger's help or ask support whether your plan permits connections from Vercel Functions.
4. Check whether your Vercel plan/project has a **static outbound IP** feature that Hostinger can allowlist. Vercel Functions do not necessarily have one by default. Allowlist only the exact, fixed egress IP/range supported by your Vercel setup; never use `0.0.0.0/0`.
5. If Vercel has no fixed egress IP usable on your plan, or Hostinger won't allowlist it, **stop here**. A direct database connection will be unreliable or blocked. Use a MySQL provider with a Vercel/serverless-compatible connection option (for example, a supported proxy/pooler or static egress integration), or move the database to a provider reachable securely from Vercel. Do not try to solve this by opening the Hostinger firewall to the internet.
6. Ask Hostinger support about connection limits, including `max_connections_per_hour`, simultaneous connections, TLS requirements, and whether the Vercel egress addresses can be allowed. The previous database credentials in this project exceeded a reported 500 connections/hour limit. Wait for Hostinger to reset it before testing; this project cannot clear a provider-side quota.

## 2. Create a least-privilege production database account

1. In hPanel, create a **production database** and a dedicated database user with a unique, strong password.
2. Grant that user access only to that database. For Prisma deployment, it needs the schema/data privileges required to apply reviewed migrations. Do not reuse the account password for Vercel, Git, or admin login.
3. Keep the database host, port (usually `3306`, but verify it), database name, username, and password in a password manager. Do not paste credentials into chat, Git, screenshots, or source files.
4. If the project has existing data, create a verified backup and confirm a restore procedure before making schema changes.

## 3. Connect the Git repository to Vercel

1. Push the project to GitHub, GitLab, or Bitbucket. Confirm the latest commit includes the current `pnpm-lock.yaml` and the successful build changes.
2. In Vercel, choose **Add New → Project**, import the repository, and select the correct Git owner/repository.
3. Set the **Root Directory** to the directory containing this project's `package.json` (the repository root for the current layout).
4. Use the Next.js framework preset. This project has `pnpm-lock.yaml`; set/confirm pnpm as the package manager and do not manually change the build command unless needed. The package build script runs `prisma generate && next build`.
5. Do not deploy until the database environment variables are set. You can create the project first and add variables before the first production deployment.

## 4. Set environment variables in Vercel

In **Project → Settings → Environment Variables**, add these values for **Production**. Add separate development/preview values only if you have a separate non-production database.

| Variable | Production value |
| --- | --- |
| `DATABASE_URL` | `mysql://DB_USER:URL_ENCODED_PASSWORD@DB_HOST:DB_PORT/DB_NAME` |
| `DB_CONNECTION_LIMIT` | `1` |
| `AUTH_SECRET` | A newly generated long random secret; do not reuse a database or admin password |
| `NEXT_PUBLIC_SITE_URL` | Your canonical HTTPS domain, e.g. `https://www.example.org` |

- Replace every example value. URL-encode special characters in the database username/password. Do not include angle brackets or spaces.
- For a local `.env`, use `http://localhost:3000` for `NEXT_PUBLIC_SITE_URL`; for Vercel Production use the real HTTPS domain. Preview can use a preview URL if your app needs canonical links there.
- Generate `AUTH_SECRET` locally with `openssl rand -base64 48`, then enter it directly in Vercel. Do not commit the generated secret.
- Environment variables are environment-specific. Do not point Preview at Production data. Apply changes to Vercel env vars before redeploying so the new deployment picks them up.
- Never add secrets with a `NEXT_PUBLIC_` prefix. Vercel exposes `NEXT_PUBLIC_*` values to browser bundles.

## 5. Apply the database migrations safely

This repository includes migrations for membership payment proof and admin media uploads. Production needs the migrations before those features can work.

1. Verify the migration files in `prisma/migrations/` are reviewed and committed. Take a fresh backup of the production Hostinger database.
2. Confirm you have a connection from a trusted local machine to the production database, with migration permissions, and that Hostinger's IP rules allow that machine. If your local connection is blocked, do not switch to a broad IP allowlist; use an approved fixed IP or the provider's secure database access method.
3. Set the production `DATABASE_URL` and `DB_CONNECTION_LIMIT=1` in a secure local environment. Do not echo/print the URL. Confirm the host and database name carefully before running a command.
4. Apply **committed** migrations with `pnpm db:deploy`. This runs Prisma's production-safe deploy migration command. Do not run `pnpm db:migrate` against production; that command is for development and may require shadow-database privileges.
5. If the command fails, stop and inspect the error and migration history. Do not edit/delete `_prisma_migrations` entries or rerun destructive SQL blindly. Restore from backup only through a deliberate recovery plan.
6. If this is a brand-new database and the initial schema is not yet in migration history, have a developer review the initial migration and migration status before deployment. Never baseline or mark migrations applied just to make errors disappear.

Run migrations from one trusted deployment step, **not from every Vercel build**. Vercel deployments can build concurrently and should not independently race to migrate production.

## 6. Deploy and verify

1. Trigger the first deployment from Vercel. Check **Deployments → Build Logs**. Confirm `prisma generate` and `next build` finish successfully.
2. Open the Vercel deployment URL and test `/api/health`. A healthy response should confirm the app can reach the database; if it fails, check Vercel runtime logs and the Hostinger remote-IP/connection policy.
3. Test the public routes and forms using non-sensitive test data. Verify new admin-managed content appears on the public pages.
4. Check Vercel **Runtime Logs** for database pool timeouts, Hostinger connection/hour-limit errors, TLS errors, or authentication errors. Do not repeatedly submit admin login or run `pnpm admin:create` while the database is rate-limited.
5. Once the production database is reachable, provision an admin account from a trusted terminal using production environment values and `pnpm admin:create`. The script prompts for name, email, and a password of at least 14 characters. It displays password masking while you type. Do not use the previously exposed password; create a new unique one. Then sign in at `https://YOUR-DOMAIN/admin/login`.
6. In the admin workspace, configure the membership fee and payment destinations at `/admin/settings`. Review access control and payment information before accepting applications.

## 7. Attach your Hostinger-registered domain to Vercel

1. In Vercel, open **Project → Settings → Domains**, add the domain (for example, `example.org` and/or `www.example.org`), and follow the exact DNS records Vercel displays.
2. In Hostinger DNS management, add/update only the records required by Vercel for the web hostnames. DNS values vary by Vercel setup; copy the current values from the Vercel Domains screen rather than using old tutorial IPs.
3. Preserve unrelated records such as MX records and mail-related SPF/DKIM/DMARC TXT records if Hostinger handles your email. Do not replace nameservers unless you intend to move all DNS management.
4. Wait for DNS propagation and for Vercel to show the domain as **Valid** with HTTPS enabled. Set `NEXT_PUBLIC_SITE_URL` to the canonical domain and redeploy if changed.

## Troubleshooting

- **`max_connections_per_hour` / quota exceeded:** stop repeated tests; wait for the quota reset or ask Hostinger to raise/reset it. The app pool is capped at one connection per process, but Vercel instances and local processes each have their own pool. This setting does not reset a quota already exhausted at Hostinger.
- **Connection timeout/refused:** verify the Hostinger hostname and port, remote MySQL enablement, TLS requirements, and fixed Vercel egress allowlist. A local `localhost` host is not usable from Vercel.
- **Access denied:** verify the exact database name/user (including Hostinger prefixes), password URL encoding, and grants for that database.
- **Migration permission/shadow database error:** use `pnpm db:deploy` for reviewed production migrations; do not use development migration commands against production. Ask Hostinger about DDL privileges and inspect the migration table before attempting recovery.
- **Vercel build fails:** inspect the failing build-log step, confirm the root directory and pnpm lockfile/package-manager setting, and run `pnpm install`, `pnpm typecheck`, and `pnpm build` locally.
- **Admin login says database unavailable:** this is not a password reset condition if runtime logs show a MySQL quota or connectivity error. Restore database connectivity first, then retry once.

## Security checklist

- [ ] Vercel database access uses an approved fixed egress IP or secure provider-supported connection method.
- [ ] MySQL is not open to all IPs.
- [ ] Production and Preview use separate database credentials/data.
- [ ] `.env` and Vercel secrets are not in Git or browser-visible variables.
- [ ] Production was backed up before migration and migration logs were reviewed.
- [ ] Admin password is unique, at least 14 characters, and not one previously exposed.
- [ ] Hostinger connection quota and Vercel instance behavior are monitored before public launch.
