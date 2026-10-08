'use client'

import Link from 'next/link'
import { useActionState, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Check, ChevronDown, RotateCcw } from 'lucide-react'
import { submitInitiative, submitResidency } from '@/app/actions/participation'
import { CONSENT_ERROR, formDefs, validateValue, type FieldDef, type FormId, type FormState } from '@/lib/forms/definitions'
import { cn } from '@/lib/utils'

const initial: FormState = { status: 'idle' }
const actions = { residency: submitResidency, initiative: submitInitiative } as const

const fieldClass =
  'w-full bg-transparent border-b border-input px-0 py-3 text-base placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors aria-[invalid=true]:border-destructive'

/** Participation application form (residency or legislative initiative). */
export function ApplicationForm({ formId, className }: { formId: FormId; className?: string }) {
  // Remounting resets the action state so the user can send another application.
  const [round, setRound] = useState(0)
  return <FormInner key={round} formId={formId} className={className} onReset={() => setRound((r) => r + 1)} />
}

function FormInner({ formId, className, onReset }: { formId: FormId; className?: string; onReset: () => void }) {
  const def = formDefs[formId]
  const [state, action, pending] = useActionState(actions[formId], initial)
  const emptyValues = () => Object.fromEntries(def.fields.map((f) => [f.name, ''])) as Record<string, string>
  const [values, setValues] = useState<Record<string, string>>(emptyValues)
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [submissionId, setSubmissionId] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const id = useId()

  useEffect(() => {
    setSubmissionId(crypto.randomUUID())
  }, [])

  useEffect(() => {
    if (state.status === 'success') {
      setValues(emptyValues())
      setConsent(false)
      setErrors({})
      statusRef.current?.focus()
    }
    if (state.status === 'error' && state.errors) setErrors(state.errors)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const setValue = (field: FieldDef, value: string) => {
    setValues((v) => ({ ...v, [field.name]: value }))
    if (errors[field.name]) setErrors((e) => ({ ...e, [field.name]: validateValue(field, value) }))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const next: Record<string, string> = {}
    def.fields.forEach((f) => {
      const err = validateValue(f, values[f.name] ?? '')
      if (err) next[f.name] = err
    })
    if (!consent) next.consent = CONSENT_ERROR
    if (Object.keys(next).length) {
      e.preventDefault()
      setErrors(next)
      formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus()
    }
  }


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
              <h2 className="font-serif text-3xl">{def.successTitle}</h2>
              <p className="text-muted-foreground leading-relaxed max-w-md">{state.message}</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/participation" className="link-underline">
                Вернуться в раздел «Участие»
              </Link>
              <button type="button" onClick={onReset} className="inline-flex items-center gap-2 link-underline">
                <RotateCcw className="size-3.5" aria-hidden="true" />
                Отправить ещё одну заявку
              </button>
            </div>
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
              <label htmlFor={`${id}-company_site`}>Сайт</label>
              <input id={`${id}-company_site`} name="company_site" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              {def.fields.map((field) => {
                const fid = `${id}-${field.name}`
                const error = errors[field.name]
                const common = {
                  id: fid,
                  name: field.name,
                  required: field.required,
                  value: values[field.name] ?? '',
                  onBlur: () => setErrors((e) => ({ ...e, [field.name]: validateValue(field, values[field.name] ?? '') })),
                  'aria-invalid': Boolean(error),
                  'aria-describedby': error ? `${fid}-error` : undefined,
                }
                return (
                  <div key={field.name} className={cn('flex flex-col gap-1', !field.half && 'sm:col-span-2')}>
                    <label htmlFor={fid} className="text-technical text-muted-foreground">
                      {field.label}
                      {field.required ? (
                        <span className="text-accent" aria-hidden="true">
                          {' '}*
                        </span>
                      ) : null}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        {...common}
                        rows={field.rows ?? 4}
                        placeholder={field.placeholder}
                        className={cn(fieldClass, 'resize-y min-h-28')}
                        onChange={(e) => setValue(field, e.target.value)}
                      />
                    ) : field.type === 'select' ? (
                      <div className="relative">
                        <select
                          {...common}
                          className={cn(fieldClass, 'appearance-none pr-8 cursor-pointer', !values[field.name] && 'text-muted-foreground/60')}
                          onChange={(e) => setValue(field, e.target.value)}
                        >
                          <option value="" disabled>
                            Выберите вариант
                          </option>
                          {field.options?.map((o) => (
                            <option key={o} value={o} className="text-foreground bg-background">
                              {o}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      <input
                        {...common}
                        type={field.type === 'url' ? 'text' : field.type}
                        inputMode={field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : field.type === 'url' ? 'url' : field.format === 'inn' ? 'numeric' : undefined}
                        autoComplete={field.autoComplete}
                        placeholder={field.placeholder}
                        className={fieldClass}
                        onChange={(e) => setValue(field, e.target.value)}
                      />
                    )}
                    {error ? (
                      <p id={`${fid}-error`} role="alert" className="text-xs text-destructive pt-1">
                        {error}
                      </p>
                    ) : null}
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-start gap-3 text-sm leading-relaxed cursor-pointer">
                <span className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked)
                      setErrors((prev) => ({ ...prev, consent: e.target.checked ? undefined : CONSENT_ERROR }))
                    }}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      'block size-5 border rounded-sm transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring',
                      consent ? 'bg-accent border-accent' : 'border-input',
                      errors.consent && 'border-destructive',
                    )}
                  >
                    {consent ? <Check className="size-4 text-accent-foreground m-px" strokeWidth={3} /> : null}
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
              <span className={cn('transition-opacity', pending && 'opacity-0')}>{def.submitLabel}</span>
              <ArrowUpRight className={cn('size-4 transition-all', pending && 'opacity-0')} aria-hidden="true" />
              {pending ? (
                <span className="absolute inset-0 flex items-center justify-center" aria-live="polite">
                  <span className="relative block w-24 h-px bg-accent-foreground/30 overflow-hidden">
                    <motion.span
                      className="absolute inset-y-0 left-0 w-1/2 bg-accent-foreground"
                      animate={reduce ? undefined : { x: ['-100%', '200%'] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  </span>
                  <span className="sr-only">Отправляем заявку</span>
                </span>
              ) : null}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
