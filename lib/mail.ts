import { Resend } from 'resend'
import { siteConfig } from '@/lib/site-config'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

type SendInput = {
  subject: string
  heading: string
  rows: [label: string, value: string][]
  replyTo?: string
  idempotencyKey?: string
}

export type SendResult = { ok: true } | { ok: false; reason: 'not_configured' | 'failed' }

/**
 * Sends a form submission to the site owner's work inbox via Resend.
 * Recipient: PARTICIPATION_TO_EMAIL → siteConfig.participation.formRecipient (info@legal-urban.ru).
 */
export async function sendFormEmail({ subject, heading, rows, replyTo, idempotencyKey }: SendInput): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, reason: 'not_configured' }

  const resend = new Resend(apiKey)
  const domain = process.env.RESEND_EMAIL_DOMAIN
  const sandboxFrom = `${siteConfig.brand.shortName} <onboarding@resend.dev>`
  const brandedFrom = domain ? `${siteConfig.brand.shortName} <noreply@${domain}>` : null
  const to = process.env.PARTICIPATION_TO_EMAIL ?? siteConfig.participation.formRecipient

  const filled = rows.filter(([, v]) => v.trim())
  const html = `
    <h2 style="font-family:Georgia,serif;font-weight:400">${escapeHtml(heading)}</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
      ${filled
        .map(
          ([label, value]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
        )
        .join('')}
    </table>
    <p style="font-family:system-ui,sans-serif;font-size:12px;color:#888;margin-top:24px">Согласие на обработку персональных данных: подтверждено.</p>
  `
  const text = `${heading}\n\n${filled.map(([l, v]) => `${l}: ${v}`).join('\n')}\n\nСогласие на обработку ПД: подтверждено.`

  const payload = { to: [to], subject, html, text, ...(replyTo ? { replyTo } : {}) }

  let { error } = await resend.emails.send(
    { from: brandedFrom ?? sandboxFrom, ...payload },
    idempotencyKey ? { idempotencyKey } : undefined,
  )

  if (error && brandedFrom && error.name === 'validation_error' && /not verified/i.test(error.message)) {
    console.warn(`Resend: domain ${domain} is not verified, falling back to ${sandboxFrom}`)
    const retry = await resend.emails.send(
      { from: sandboxFrom, ...payload },
      idempotencyKey ? { idempotencyKey: `${idempotencyKey}/sandbox` } : undefined,
    )
    error = retry.error
  }

  if (error) {
    console.error('Resend error:', error.message)
    return { ok: false, reason: 'failed' }
  }
  return { ok: true }
}
