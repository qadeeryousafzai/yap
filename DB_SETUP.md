# MySQL and admin setup (Hostinger)

This project uses MySQL through Prisma. Hostinger’s menu labels and remote database access depend on the hosting plan; confirm that your plan permits inbound MySQL connections from the machine where this Next.js app runs. Do not expose MySQL to `0.0.0.0/0`.

## 1. Create a database in Hostinger

1. Sign in to hPanel and open **Websites → Manage → Databases → MySQL Databases** (the exact menu may vary by plan).
2. Create a database and a dedicated database user with a long, unique password. Grant that user access only to this database.
3. Note the database name, username, database host, and port shown by Hostinger. Host names and database-name/user prefixes are account-specific; do not assume the host is `localhost`.
4. If the application runs outside Hostinger (for example, on a developer laptop or Vercel), enable **Remote MySQL** if the plan offers it and allowlist only the application's fixed outbound IP address. If the app host has no fixed outbound IP, use a database provider/hosting plan designed for remote application connections rather than opening the database to all IPs.
5. In hPanel, verify the host/port, TLS requirements, and remote-access restrictions for the database before connecting. A database accessible only to a Hostinger website may not be reachable from an external Next.js host.

## 2. Configure this application

1. Copy `.env.example` to `.env` in the project root.
2. Replace the `DATABASE_URL` placeholders with the Hostinger values, in this format:

   `mysql://DB_USER:URL_ENCODED_PASSWORD@DB_HOST:3306/DB_NAME`

   URL-encode special characters in the username/password. Keep the URL in `.env`, never commit it, and do not paste it into chat or screenshots. Use `127.0.0.1`/`localhost` only when the Next.js application and MySQL are on the same host and Hostinger explicitly documents that connection mode.

   Keep `DB_CONNECTION_LIMIT=1` (or lower it if your plan is more restrictive). This caps the app's per-process MariaDB connection pool; do not raise it on shared hosting without checking Hostinger's limits. It cannot reset a quota that Hostinger has already exhausted.

3. Set `NEXT_PUBLIC_SITE_URL` to your local URL during development and to the public HTTPS domain in production. Set `AUTH_SECRET` to a long random value. On macOS/Linux, generate one with `openssl rand -base64 48` and paste it directly into `.env`.
4. Install project dependencies with `pnpm install`.
5. Apply migrations to a **development database only** using the project's `pnpm db:migrate` workflow. Inspect the migration before applying it anywhere else. Deploy reviewed migrations to production with `pnpm db:deploy`; back up production first. Do not point a migration shadow database at production.
6. Check database connectivity at `/api/health` after starting the application.

If Prisma reports a connection or authentication error, confirm the exact host/port, database/user prefixes, password URL encoding, database grants, remote IP allowlist, and whether the plan permits external MySQL connections. Keep preview/development and production databases separate.

## 3. Create the first admin login

There are **no default admin credentials** and no public registration page. From a trusted terminal connected to the intended database, run:

`pnpm admin:create`

The script prompts for the administrator's name, email, and a password of at least 14 characters, then creates or updates that account as a Super Admin. Type the password directly into the terminal; do not put it in this file, source code, or a chat message. Open `https://YOUR-DOMAIN/admin/login` (or `http://localhost:3000/admin/login` locally) and sign in using the email and password entered in the prompt. If the credentials are lost, run the script again for the same email to set a new password. Protect terminal/database access and use a unique password.

## Configure membership payment details

After signing in as an administrator with settings permission, open **Admin → Settings**. Set the fixed PKR membership fee, enable the organization bank account and/or other wallet option, enter the public payment destination details, and save. The membership form fetches the latest enabled choices and displays only the selected destination. The server validates that selection and saves the configured fee; it does not trust an amount submitted by the browser. Apply the membership payment-proof migration before using the form.
