'use server';

// ─────────────────────────────────────────────────────────────────────────────
// Project enquiry — server action
// ─────────────────────────────────────────────────────────────────────────────
// Posts straight to the Resend HTTP API. No SDK: one fetch call does not
// justify a dependency on a portfolio site.
//
// Requires two environment variables in Vercel:
//   RESEND_API_KEY      — from resend.com
//   CONTACT_TO_EMAIL    — where enquiries land (e.g. zetroxyyy@gmail.com)
//
// With neither set, the action returns `unconfigured` and the form tells the
// visitor to email directly rather than pretending to have sent something.
// A contact form that silently drops enquiries is worse than no form.
// ─────────────────────────────────────────────────────────────────────────────

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; unconfigured?: boolean };

const MAX = { name: 120, email: 200, detail: 4000, short: 80 } as const;

/** Escape the five XML entities. Every field here is typed by a stranger. */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clean(v: FormDataEntryValue | null, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

// Deliberately permissive — the server is not the place to argue with
// someone about whether their address is real. Resend will tell us.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitEnquiry(formData: FormData): Promise<ContactResult> {
  // Honeypot. Real people never fill a field they cannot see.
  if (clean(formData.get('company'), 20) !== '') return { ok: true };

  const name = clean(formData.get('name'), MAX.name);
  const email = clean(formData.get('email'), MAX.email);
  const projectType = clean(formData.get('projectType'), MAX.short);
  const detail = clean(formData.get('detail'), MAX.detail);
  const timeline = clean(formData.get('timeline'), MAX.short);
  const budget = clean(formData.get('budget'), MAX.short);

  if (!name) return { ok: false, error: 'Please add your name.' };
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'That email address does not look right.' };
  if (!projectType) return { ok: false, error: 'Please pick what you are building.' };
  if (detail.length < 20) {
    return { ok: false, error: 'A sentence or two about the project, so the reply is useful.' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.warn('[submitEnquiry] RESEND_API_KEY or CONTACT_TO_EMAIL is not set.');
    return {
      ok: false,
      unconfigured: true,
      error: 'The form is not connected yet.',
    };
  }

  const row = (label: string, value: string) =>
    `<tr>
       <td style="padding:6px 16px 6px 0;color:#6E6B63;font:500 12px/1.5 ui-monospace,monospace;white-space:nowrap;vertical-align:top">${esc(label)}</td>
       <td style="padding:6px 0;color:#12110F;font:400 14px/1.6 -apple-system,system-ui,sans-serif">${esc(value)}</td>
     </tr>`;

  const html = `
    <div style="max-width:560px;margin:0 auto;padding:28px 24px;background:#F6F5F2">
      <p style="margin:0 0 4px;font:500 11px/1.5 ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#6E6B63">New project enquiry</p>
      <h1 style="margin:0 0 20px;font:700 22px/1.2 -apple-system,system-ui,sans-serif;color:#12110F">${esc(name)}</h1>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
        ${row('Email', email)}
        ${row('Building', projectType)}
        ${row('Timeline', timeline || 'not given')}
        ${row('Budget', budget || 'not given')}
      </table>
      <div style="padding:16px;background:#fff;border:1px solid #DCD9D1;border-radius:8px">
        <p style="margin:0 0 8px;font:500 11px/1.5 ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#6E6B63">What it needs to do</p>
        <p style="margin:0;font:400 14px/1.7 -apple-system,system-ui,sans-serif;color:#12110F;white-space:pre-wrap">${esc(detail)}</p>
      </div>
      <p style="margin:20px 0 0;font:400 12px/1.5 -apple-system,system-ui,sans-serif;color:#6E6B63">Reply directly to this email to reach ${esc(name)}.</p>
    </div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'zetroxy.me <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject: `New enquiry — ${name} · ${projectType}`,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('[submitEnquiry] Resend responded', res.status, body);
      return { ok: false, error: 'Could not send that. Please email me directly.' };
    }

    return { ok: true };
  } catch (err) {
    console.error('[submitEnquiry]', err);
    return { ok: false, error: 'Could not send that. Please email me directly.' };
  }
}
