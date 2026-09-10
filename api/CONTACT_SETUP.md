# Contact form: one-time setup

The contact form on `contact.html` posts to `/api/contact`, which forwards the submission by email via Resend.

Until the steps below are done, the function returns "Server is not configured to send mail yet." and the form shows that error inline (with a mailto fallback to hello@spirantix.ai).

Note: `/api/contact` is a Vercel serverless function. It requires the site to be hosted on Vercel or another platform that runs `api/*.js` functions. If the site is deployed as plain static hosting, such as GitHub Pages, the form cannot send email; in that case, use compatible serverless hosting or switch the form to a hosted form service.

## Current setup

Submissions go to **hello@spirantix.ai** and are sent from **hello@spirantix.ai**. The `spirantix.ai` domain must be verified in Resend before messages can be sent.

1. In Resend, add and verify the `spirantix.ai` domain using the DNS records it provides.
2. In the Vercel Spirantix project, open **Settings → Environment Variables** for Production and set:

| Name             | Value                            |
| ---------------- | -------------------------------- |
| `RESEND_API_KEY` | the Spirantix Resend `re_…` key |
| `CONTACT_TO`     | `hello@spirantix.ai`             |
| `CONTACT_FROM`   | `Spirantix <hello@spirantix.ai>` |

`CONTACT_TO` and `CONTACT_FROM` default to the values above in the code. Redeploy after adding or changing an environment variable.

Replies go to the submitter through the `reply_to` header.

## 4. Smoke test

Submit the form on the live site and confirm the email arrives, the success message shows, and clicking Reply addresses the submitter.
