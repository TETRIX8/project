'use server'

import { Resend } from 'resend'
import { siteConfig } from '@/lib/site-config'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<'name' | 'email' | 'phone' | 'message' | 'consent', string>>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_DIGITS = /\d/g

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const consent = formData.get('consent') === 'on'
  const honeypot = String(formData.get('company') ?? '')
  const submissionId = String(formData.get('submissionId') ?? '')

  if (honeypot) {
    return { status: 'success', message: 'Запрос отправлен.' }
  }

  const errors: ContactState['errors'] = {}
  if (name.length < 2) errors.name = 'Укажите имя.'
  if (!EMAIL_RE.test(email)) errors.email = 'Проверьте формат email.'
  const digits = (phone.match(PHONE_DIGITS) ?? []).length
  if (digits < 10 || digits > 15) errors.phone = 'Введите телефон в международном формате.'
  if (message.length < 10) errors.message = 'Опишите задачу хотя бы в нескольких словах.'
  if (message.length > 4000) errors.message = 'Сообщение слишком длинное.'
  if (!consent) errors.consent = 'Необходимо согласие на обработку персональных данных.'

  if (Object.keys(errors).length) {
    return { status: 'error', message: 'Проверьте заполнение полей.', errors }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return { status: 'error', message: 'Сервис отправки временно недоступен. Позвоните нам по телефону.' }
  }

  const resend = new Resend(apiKey)
  const domain = process.env.RESEND_EMAIL_DOMAIN
  const sandboxFrom = `${siteConfig.brand.shortName} <onboarding@resend.dev>`
  const brandedFrom = domain ? `${siteConfig.brand.shortName} <noreply@${domain}>` : null
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.formRecipient

  const html = `
    <h2 style="font-family:Georgia,serif;font-weight:400">Новый запрос с сайта</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td style="padding:6px 16px 6px 0;color:#666">Имя</td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#666">Email</td><td>${escapeHtml(email)}</td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#666">Телефон</td><td>${escapeHtml(phone)}</td></tr>
    </table>
    <p style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px">${escapeHtml(message)}</p>
    <p style="font-family:system-ui,sans-serif;font-size:12px;color:#888;margin-top:24px">Согласие на обработку персональных данных: подтверждено.</p>
  `

  const payload = {
    to: [to],
    replyTo: email,
    subject: `Запрос с сайта: ${name}`,
    html,
    text: `Имя: ${name}\nEmail: ${email}\nТелефон: ${phone}\n\n${message}\n\nСогласие на обработку ПД: подтверждено.`,
  }

  let { error } = await resend.emails.send(
    { from: brandedFrom ?? sandboxFrom, ...payload },
    submissionId ? { idempotencyKey: `contact-form/${submissionId}` } : undefined,
  )

  // The integration's domain may not be DNS-verified yet; fall back to Resend's
  // sandbox sender so the form keeps working until verification completes.
  if (error && brandedFrom && error.name === 'validation_error' && /not verified/i.test(error.message)) {
    console.warn(`Resend: domain ${domain} is not verified, falling back to ${sandboxFrom}`)
    const retry = await resend.emails.send(
      { from: sandboxFrom, ...payload },
      submissionId ? { idempotencyKey: `contact-form-sandbox/${submissionId}` } : undefined,
    )
    error = retry.error
  }

  if (error) {
    console.error('Resend error:', error.message)
    return {
      status: 'error',
      message: 'Не удалось отправить запрос. Попробуйте ещё раз или свяжитесь с нами по телефону.',
    }
  }

  return { status: 'success', message: 'Запрос отправлен. Мы свяжемся с вами в ближайшее время.' }
}
