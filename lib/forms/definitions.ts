/**
 * Field definitions for the participation forms. Shared by the client form
 * (live validation) and the server actions (authoritative validation), so the
 * two never drift apart.
 */

export type FieldType = 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select'

export type FieldDef = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  autoComplete?: string
  options?: string[]
  rows?: number
  /** Half-width on ≥ sm screens. */
  half?: boolean
  minLength?: number
  maxLength?: number
  /** Extra format check. */
  format?: 'inn'
  hint?: string
}

export type FormId = 'residency' | 'initiative'

export type FormDef = {
  id: FormId
  /** Prefix for the e-mail subject. */
  subject: string
  /** Field whose value is appended to the subject. */
  subjectField: string
  submitLabel: string
  successTitle: string
  successMessage: string
  fields: FieldDef[]
}

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Record<string, string>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const URL_RE = /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i

export function validateValue(field: FieldDef, raw: string): string | undefined {
  const value = raw.trim()
  if (!value) {
    if (!field.required) return undefined
    return field.type === 'select' ? 'Выберите вариант.' : 'Заполните поле.'
  }
  if (field.type === 'email' && !EMAIL_RE.test(value)) return 'Проверьте формат email.'
  if (field.type === 'tel') {
    const digits = (value.match(/\d/g) ?? []).length
    if (digits < 10 || digits > 15) return 'Введите телефон в международном формате.'
  }
  if (field.type === 'url' && !URL_RE.test(value)) return 'Проверьте адрес сайта.'
  if (field.type === 'select' && field.options && !field.options.includes(value)) return 'Выберите вариант из списка.'
  if (field.format === 'inn' && !/^(\d{10}|\d{12})$/.test(value)) return 'ИНН состоит из 10 или 12 цифр.'
  if (field.minLength && value.length < field.minLength) return `Минимум ${field.minLength} символов.`
  const max = field.maxLength ?? (field.type === 'textarea' ? 4000 : 300)
  if (value.length > max) return 'Слишком длинное значение.'
  return undefined
}

export const CONSENT_ERROR = 'Необходимо согласие на обработку персональных данных.'

export const residencyForm: FormDef = {
  id: 'residency',
  subject: 'Заявка на резидентство',
  subjectField: 'company',
  submitLabel: 'Отправить заявку',
  successTitle: 'Заявка отправлена',
  successMessage:
    'Спасибо! Мы свяжемся с вами, чтобы обсудить условия и подобрать оптимальный пакет участия.',
  fields: [
    { name: 'fullName', label: 'ФИО', type: 'text', required: true, half: true, autoComplete: 'name', placeholder: 'Иванов Иван Иванович', minLength: 2 },
    { name: 'position', label: 'Должность', type: 'text', half: true, autoComplete: 'organization-title', placeholder: 'Генеральный директор' },
    { name: 'company', label: 'Компания', type: 'text', required: true, half: true, autoComplete: 'organization', placeholder: 'ООО «Компания»', minLength: 2 },
    { name: 'inn', label: 'ИНН компании', type: 'text', half: true, format: 'inn', placeholder: '10 или 12 цифр' },
    {
      name: 'activity',
      label: 'Сфера деятельности',
      type: 'select',
      required: true,
      half: true,
      options: [
        'Девелопмент / застройщик',
        'Архитектурное бюро',
        'Проектный институт',
        'Консалтинг',
        'Инвестиции',
        'Другое',
      ],
    },
    {
      name: 'package',
      label: 'Интересующий пакет',
      type: 'select',
      required: true,
      half: true,
      options: [
        'Базовый — 250 000 ₽/год',
        'Экспертный — 600 000 ₽/год',
        'Премиум — 1 200 000 ₽/год',
        'Нужна консультация по выбору',
      ],
    },
    { name: 'email', label: 'Email', type: 'email', required: true, half: true, autoComplete: 'email', placeholder: 'name@company.ru' },
    { name: 'phone', label: 'Телефон', type: 'tel', required: true, half: true, autoComplete: 'tel', placeholder: '+7 ___ ___-__-__' },
    { name: 'website', label: 'Сайт компании', type: 'url', autoComplete: 'url', placeholder: 'company.ru' },
    {
      name: 'goals',
      label: 'Задачи и ожидания от резидентства',
      type: 'textarea',
      rows: 4,
      placeholder: 'Текущие проекты, вопросы к регуляторам, что важно получить от участия',
    },
  ],
}

export const initiativeForm: FormDef = {
  id: 'initiative',
  subject: 'Законодательная инициатива',
  subjectField: 'title',
  submitLabel: 'Отправить инициативу',
  successTitle: 'Инициатива отправлена',
  successMessage:
    'Спасибо! Эксперты Ассоциации изучат предложение и свяжутся с вами, если потребуются уточнения.',
  fields: [
    { name: 'fullName', label: 'ФИО', type: 'text', required: true, half: true, autoComplete: 'name', placeholder: 'Иванов Иван Иванович', minLength: 2 },
    {
      name: 'applicantType',
      label: 'Вы представляете',
      type: 'select',
      required: true,
      half: true,
      options: ['Себя лично', 'Компанию', 'Индивидуального предпринимателя', 'Общественную организацию', 'Орган власти / МСУ'],
    },
    { name: 'organization', label: 'Организация', type: 'text', half: true, autoComplete: 'organization', placeholder: 'Если применимо' },
    { name: 'region', label: 'Регион', type: 'text', half: true, autoComplete: 'address-level1', placeholder: 'Москва' },
    { name: 'email', label: 'Email', type: 'email', required: true, half: true, autoComplete: 'email', placeholder: 'name@mail.ru' },
    { name: 'phone', label: 'Телефон', type: 'tel', required: true, half: true, autoComplete: 'tel', placeholder: '+7 ___ ___-__-__' },
    { name: 'title', label: 'Название инициативы', type: 'text', required: true, minLength: 5, placeholder: 'Кратко — о чём предложение' },
    {
      name: 'level',
      label: 'Уровень регулирования',
      type: 'select',
      required: true,
      half: true,
      options: ['Федеральный', 'Региональный', 'Муниципальный', 'Затрудняюсь ответить'],
    },
    { name: 'act', label: 'Нормативный акт', type: 'text', half: true, placeholder: 'Например, ст. 51 ГрК РФ' },
    {
      name: 'problem',
      label: 'Описание проблемы',
      type: 'textarea',
      required: true,
      minLength: 20,
      rows: 4,
      placeholder: 'Какая норма мешает или отсутствует, с какими последствиями вы столкнулись',
    },
    {
      name: 'proposal',
      label: 'Предлагаемое решение',
      type: 'textarea',
      required: true,
      minLength: 20,
      rows: 5,
      placeholder: 'Что и как предлагается изменить, ожидаемый результат',
    },
  ],
}

export const formDefs: Record<FormId, FormDef> = {
  residency: residencyForm,
  initiative: initiativeForm,
}
