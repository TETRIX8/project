'use server'

import { CONSENT_ERROR, initiativeForm, residencyForm, validateValue, type FormDef, type FormState } from '@/lib/forms/definitions'
import { sendFormEmail } from '@/lib/mail'

async function handle(def: FormDef, formData: FormData): Promise<FormState> {
  // Honeypot: bots fill the hidden field, humans don't.
  if (String(formData.get('company_site') ?? '')) {
    return { status: 'success', message: def.successMessage }
  }

  const values: Record<string, string> = {}
  const errors: Record<string, string> = {}
  for (const field of def.fields) {
    const value = String(formData.get(field.name) ?? '').trim()
    values[field.name] = value
    const err = validateValue(field, value)
    if (err) errors[field.name] = err
  }
  if (formData.get('consent') !== 'on') errors.consent = CONSENT_ERROR

  if (Object.keys(errors).length) {
    return { status: 'error', message: 'Проверьте заполнение полей.', errors }
  }

  const submissionId = String(formData.get('submissionId') ?? '')
  const result = await sendFormEmail({
    subject: `${def.subject}: ${values[def.subjectField] || values.fullName}`,
    heading: `${def.subject} — новая заявка с сайта`,
    rows: def.fields.map((f) => [f.label, values[f.name]]),
    replyTo: values.email,
    idempotencyKey: submissionId ? `${def.id}-form/${submissionId}` : undefined,
  })

  if (!result.ok) {
    return {
      status: 'error',
      message:
        result.reason === 'not_configured'
          ? 'Сервис отправки временно недоступен. Позвоните нам по телефону.'
          : 'Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону.',
    }
  }

  return { status: 'success', message: def.successMessage }
}

export async function submitResidency(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle(residencyForm, formData)
}

export async function submitInitiative(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle(initiativeForm, formData)
}
