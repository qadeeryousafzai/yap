# Connect Hostinger MySQL to this project on Vercel

> **Short answer:** If Vercel hosts this Next.js app, do **not** upload the app's source code into Hostinger `public_html`. Vercel deploys the Git repository. Hostinger is used here for the MySQL database (and optionally DNS/domain registration). You only put website files in `public_html` if you are separately hosting a static/PHP site there; that is not this Next.js deployment.

## Important prerequisite: Vercel must reach the database

Before setting environment variables, ask Hostinger whether your plan permits remote MySQL from Vercel and which source IPs it accepts. Vercel functions do not automatically have a fixed outbound IP on every plan. Allowlist only a fixed IP/range supplied by your Vercel networking setup. **Never allow all IPs (`0.0.0.0/0`).**

This project previously received Hostinger's `max_connections_per_hour` quota error (500/hour). Wait for Hostinger to reset the quota before testing; changing code or Vercel settings cannot reset a quota enforced by Hostinger. The app defaults to one MariaDB connection per process, but every active Vercel instance and local app process can have its own pool.

If Hostinger cannot safely allow Vercel's egress IP, stop and use a database connection option/provider that supports secure serverless access. Do not expose the database publicly to make the connection work.

## Step 1: Create the Hostinger database and user

1. Sign in to **hPanel** and open the MySQL database section. Menu wording may depend on the plan.
2. Create a production database and a dedicated database user. Give the user access only to this database and choose a unique strong password.
3. Record the **database host**, port, database name, and full username exactly as hPanel displays them. Hostinger account prefixes are common; do not assume `localhost` or guess the values.
4. Enable remote access only if Hostinger supports it for your plan. Add the approved fixed Vercel egress IP to the allowlist. Check TLS requirements and ask support about remote access and connection quotas.
5. Keep credentials in a password manager. Never commit the connection string or post it in chat/screenshots.

## Step 2: Import this repository into Vercel

1. Push the latest project to GitHub, GitLab, or Bitbucket. Include `pnpm-lock.yaml` and the migration folders.
2. In Vercel, choose **Add New → Project** and import this repository.
3. Set **Root Directory** to the folder containing this project's `package.json` (repository root for the current layout).
4. Use the **Next.js** preset and pnpm. The existing build script is `prisma generate && next build`; don't set a different output directory.
5. Add the environment variables below before deploying.

## Step 3: Add these Vercel environment variables

Open **Vercel → Project → Settings → Environment Variables**. Add the variables to the **Production** environment. Add separate Preview values only when you have a separate, non-production database.

| Name | Value to enter |
| --- | --- |
| `DATABASE_URL` | `mysql://DB_USER:URL_ENCODED_PASSWORD@DB_HOST:3306/DB_NAME` |
| `DB_CONNECTION_LIMIT` | `1` |
| `AUTH_SECRET` | A new random secret (see below) |
| `NEXT_PUBLIC_SITE_URL` | Your canonical URL, e.g. `https://www.example.org` |

Replace `DB_USER`, `URL_ENCODED_PASSWORD`, `DB_HOST`, port, and `DB_NAME` with hPanel's actual values. The shown MySQL port `3306` is typical, not guaranteed—use the port hPanel provides.

**Example format only—not a real credential:**

`mysql://account_user:password_with_%40_encoded@mysql.example-host.com:3306/account_database`

URL-encode special characters in the username/password. For example, `@` becomes `%40`, `#` becomes `%23`, and `%` becomes `%25`. Do not encode the whole connection URL. In Vercel's value box, paste the URL without wrapping quotes.

Generate `AUTH_SECRET` on your own computer in a terminal with `openssl rand -base64 48`. Copy the result directly into Vercel; do not send it to anyone or commit it. The Vercel site URL should use HTTPS and your canonical domain. For a first test, use the assigned `https://your-project.vercel.app` address, then update it after attaching your domain.

Do **not** add credentials under `NEXT_PUBLIC_*`; those variables are exposed to browser code. Do not use your local `.env` value in Preview if that would point Preview at production data.

## Step 4: Attach your domain (optional)

1. In Vercel, open **Project → Settings → Domains** and add your domain/subdomain.
2. Vercel will show the required DNS records. In Hostinger DNS management, add/update those exact records for the web hostname.
3. Keep mail-related records such as MX, SPF, DKIM, and DMARC if email is hosted by Hostinger. Do not change nameservers unless you intend to move all DNS management.
4. Wait for Vercel to confirm the domain and HTTPS certificate. Update `NEXT_PUBLIC_SITE_URL` in Vercel to the final canonical HTTPS URL, then redeploy.

The app's Next.js files stay in the Git repository and deploy to Vercel; `public_html` is not part of this deployment.

## Step 5: Back up and apply database migrations

The membership payment screenshot and admin image-upload features need database migrations.

1. Take a fresh backup of the Hostinger production database and verify that you know how to restore it.
2. Ensure the reviewed migrations under `prisma/migrations/` have been committed and the database is the intended production database.
3. Run migrations from one trusted terminal/session that is allowed to connect to Hostinger. Use `pnpm db:deploy` to apply the already committed migrations. This project has a `db:deploy` script that runs Prisma's production-safe migration deploy operation.
4. Do **not** run `pnpm db:migrate` against production; that command is for development and may require a shadow database. Do not run migrations as part of every Vercel build.
5. If the migration command reports permission, drift, or history errors, stop and inspect before attempting changes. Do not manually delete migration history or replay SQL against production without a backup/recovery plan.

For a new database without the initial schema applied, have the initial migration and migration history reviewed before deployment; don't mark migrations as applied merely to silence an error.

## Step 6: Deploy and verify

1. Deploy from Vercel and review **Deployments → Build Logs**. Confirm `prisma generate` and `next build` complete.
2. Open `https://YOUR-VERCEL-URL/api/health`. Check Vercel **Runtime Logs** if the health check cannot reach MySQL.
3. Check that the public website loads, then test database-backed pages with non-sensitive test data.
4. Once the production database is reachable, create the first admin using a trusted terminal configured with the production database: `pnpm admin:create`. Type a new unique password (at least 14 characters) at the hidden prompt. Sign in at `/admin/login` on the deployed domain.
5. In Admin → Settings, enter the membership fee and payment destination details. Test with an internal application before inviting members.

## Troubleshooting checklist

- **Hostinger says `max_connections_per_hour` exceeded:** Stop testing and wait for Hostinger's quota reset or ask support to reset/raise the limit. Don't repeatedly run login, migration, or admin-create commands.
- **Vercel says database unavailable or connection times out:** Verify the remote MySQL feature, exact hostname/port, TLS configuration, and fixed Vercel egress allowlist. `localhost` points at the Vercel function itself, not Hostinger.
- **Access denied:** Check the Hostinger-prefixed username/database name, URL-encoded password, and grants.
- **Build succeeds, but pages/API fail:** Build success doesn't prove runtime DB connectivity. Check Vercel Runtime Logs and `/api/health`; Prisma Client is generated during build, but requests still need a working database.
- **Admin login says database unavailable:** This is a database/network/quota problem, not an admin password issue. Restore database connectivity first.
- **Do not expose MySQL to all addresses** to work around an egress-IP restriction. Use a provider-supported secure connection path instead.

## Environment variable recap

```text
DATABASE_URL=mysql://DB_USER:URL_ENCODED_PASSWORD@DB_HOST:DB_PORT/DB_NAME
DB_CONNECTION_LIMIT=1
AUTH_SECRET=<generate a unique value with openssl rand -base64 48>
NEXT_PUBLIC_SITE_URL=https://YOUR-CANONICAL-DOMAIN
```

The text in angle brackets is an instruction placeholder, not a literal value. Do not put real credentials in this guide.
