# Contact form: one-time setup

The contact form on `contact.html` posts to `/api/contact`, which forwards the submission by email via Resend. This is the same pattern as the FutureInSites inquiry form.

Until the steps below are done, the function returns "Server is not configured to send mail yet." and the form shows that error inline (with a mailto fallback to hello@spirantix.ai).

Note: `/api/contact` is a Vercel serverless function. It requires the site to be hosted on Vercel (or another platform that runs `api/*.js` functions). If the site is deployed as plain static hosting (e.g. GitHub Pages), the form cannot send email; in that case either move hosting to Vercel like futureinsites.com, or switch the form to a hosted form service.

## 1. Resend domain

1. In the Resend dashboard (same account used for FutureInSites is fine), go to **Domains → Add Domain** and add `spirantix.ai`.
2. Add the DNS records Resend shows (one MX, two TXT) at your DNS host for spirantix.ai, then click **Verify**.

## 2. API key

Resend → **API Keys → Create API Key** (e.g. `spirantix-vercel`, Sending access). Copy the `re_…` key. You can also reuse the existing FutureInSites key if you prefer one key for both projects.

## 3. Environment variables in Vercel

Vercel → Spirantix project → **Settings → Environment Variables** (Production):

| Name             | Value                              |
| ---------------- | ---------------------------------- |
| `RESEND_API_KEY` | the `re_…` key                     |
| `CONTACT_TO`     | `hello@spirantix.ai` (or gloeff@gmail.com to go straight to you) |
| `CONTACT_FROM`   | `Spirantix <forms@spirantix.ai>`   |

Redeploy after adding env vars.

The `CONTACT_FROM` mailbox doesn't need to exist; Resend only needs the domain verified. Replies go to the submitter via the `reply_to` header.

## 4. Smoke test

Submit the form on the live site and confirm the email arrives, the success message shows, and clicking Reply addresses the submitter.
