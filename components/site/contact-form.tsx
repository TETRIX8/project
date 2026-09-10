'use client'

import Link from 'next/link'
import { useActionState, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Check, RotateCcw } from 'lucide-react'
import { submitContact, type ContactState } from '@/app/actions/contact'
import { cn } from '@/lib/utils'

const initial: ContactState = { status: 'idle' }

type FieldErrors = NonNullable<ContactState['errors']>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateField(name: keyof FieldErrors, value: string | boolean): string | undefined {
  if (name === 'name') return String(value).trim().length < 2 ? 'Укажите имя.' : undefined
  if (name === 'email') return EMAIL_RE.test(String(value)) ? undefined : 'Проверьте формат email.'
  if (name === 'phone') {
    const digits = (String(value).match(/\d/g) ?? []).length
    return digits < 10 || digits > 15 ? 'Введите телефон в международном формате.' : undefined
  }
  if (name === 'message') return String(value).trim().length < 10 ? 'Опишите задачу хотя бы в нескольких словах.' : undefined
  if (name === 'consent') return value ? undefined : 'Необходимо согласие на обработку персональных данных.'
  return undefined
}

export function ContactForm({ className }: { className?: string }) {
  const [state, action, pending] = useActionState(submitContact, initial)
  const [clientErrors, setClientErrors] = useState<FieldErrors>({})
  const [submissionId, setSubmissionId] = useState('')
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '', consent: false })
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const id = useId()

  useEffect(() => {
    setSubmissionId(crypto.randomUUID())
  }, [])

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
      setValues({ name: '', email: '', phone: '', message: '', consent: false })
      setClientErrors({})
      statusRef.current?.focus()
    }
    if (state.status === 'error' && state.errors) {
      setClientErrors(state.errors)
    }
  }, [state])

  const errors: FieldErrors = { ...clientErrors }

  const onBlur = (name: keyof FieldErrors) => () => {
    const value = name === 'consent' ? values.consent : values[name]
    setClientErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const next: FieldErrors = {}
    ;(['name', 'email', 'phone', 'message', 'consent'] as (keyof FieldErrors)[]).forEach((k) => {
      const err = validateField(k, k === 'consent' ? values.consent : values[k])
      if (err) next[k] = err
    })
    if (Object.keys(next).length) {
      e.preventDefault()
      setClientErrors(next)
      const firstKey = Object.keys(next)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus()
    }
  }

  const reset = () => {
    setSubmissionId(crypto.randomUUID())
    setClientErrors({})
    formRef.current?.reset()
  }

  const fieldClass =
    'w-full bg-transparent border-b border-input px-0 py-3 text-base placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors aria-[invalid=true]:border-destructive'

  return (
    <div className={cn('relative', className)}>
      <AnimatePresence mode="wait" initial={false}>
        {state.status === 'success' ? (
          <motion.div
            key="success"
            ref={statusRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 py-6"
          >
            <span className="inline-flex size-12 items-center justify-center border border-accent text-accent rounded-sm">
              <Check className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-3xl">Запрос отправлен</h3>
              <p className="text-muted-foreground leading-relaxed max-w-md">{state.message}</p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="self-start inline-flex items-center gap-2 text-sm link-underline"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              Отправить ещё один запрос
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            action={action}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-7"
            aria-busy={pending}
          >
            <input type="hidden" name="submissionId" value={submissionId} />
            <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
              <label htmlFor={`${id}-company`}>Компания</label>
              <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              <Field id={`${id}-name`} label="Имя" error={errors.name}>
                <input
                  id={`${id}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className={fieldClass}
                  placeholder="Как к вам обращаться"
                  value={values.name}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  onBlur={onBlur('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${id}-name-error` : undefined}
                />
              </Field>
              <Field id={`${id}-email`} label="Email" error={errors.email}>
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  className={fieldClass}
                  placeholder="name@company.ru"
                  value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  onBlur={onBlur('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${id}-email-error` : undefined}
                />
              </Field>
            </div>

            <Field id={`${id}-phone`} label="Телефон" error={errors.phone}>
              <input
                id={`${id}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                required
                className={fieldClass}
                placeholder="+7 ___ ___-__-__"
                value={values.phone}
                onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
                onBlur={onBlur('phone')}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
              />
            </Field>

            <Field id={`${id}-message`} label="Вопрос или описание проекта" error={errors.message}>
              <textarea
                id={`${id}-message`}
                name="message"
                rows={4}
                required
                className={cn(fieldClass, 'resize-y min-h-28')}
                placeholder="Участок, объект, стадия проекта и что требуется решить"
                value={values.message}
                onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                onBlur={onBlur('message')}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? `${id}-message-error` : undefined}
              />
            </Field>

            <div className="flex flex-col gap-2">
              <label className="flex items-start gap-3 text-sm leading-relaxed cursor-pointer">
                <span className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    checked={values.consent}
                    onChange={(e) => {
                      setValues((v) => ({ ...v, consent: e.target.checked }))
                      setClientErrors((prev) => ({ ...prev, consent: validateField('consent', e.target.checked) }))
                    }}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      'block size-5 border rounded-sm transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring',
                      values.consent ? 'bg-accent border-accent' : 'border-input',
                      errors.consent && 'border-destructive',
                    )}
                  >
                    {values.consent ? <Check className="size-4 text-accent-foreground m-px" strokeWidth={3} /> : null}
                  </span>
                </span>
                <span className="text-muted-foreground">
                  Я подтверждаю, что ознакомлен(а) и даю согласие на обработку моих персональных данных в порядке
                  и на условиях, указанных в{' '}
                  <Link href="/privacy" className="text-foreground link-underline" target="_blank">
                    Политике обработки персональных данных
                  </Link>
                  .
                </span>
              </label>
              {errors.consent ? (
                <p id={`${id}-consent-error`} role="alert" className="text-xs text-destructive">
                  {errors.consent}
                </p>
              ) : null}
            </div>

            {state.status === 'error' && !state.errors ? (
              <p role="alert" className="text-sm text-destructive border border-destructive/40 px-4 py-3 rounded-sm">
                {state.message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className="group relative self-start inline-flex items-center gap-3 h-13 px-7 bg-accent text-accent-foreground rounded-sm text-sm disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden transition-colors hover:bg-accent/90"
            >
              <span className={cn('transition-opacity', pending && 'opacity-0')}>Отправить запрос</span>
              <ArrowUpRight className={cn('size-4 transition-all', pending && 'opacity-0')} aria-hidden="true" />
              {pending ? (
                <span className="absolute inset-0 flex items-center justify-center gap-3" aria-live="polite">
                  <span className="relative block w-24 h-px bg-accent-foreground/30 overflow-hidden">
                    <motion.span
                      className="absolute inset-y-0 left-0 w-1/2 bg-accent-foreground"
                      animate={reduce ? undefined : { x: ['-100%', '200%'] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  </span>
                  <span className="sr-only">Отправляем запрос</span>
                </span>
              ) : null}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-technical text-muted-foreground">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive pt-1">
          {error}
        </p>
      ) : null}
    </div>
  )
}
