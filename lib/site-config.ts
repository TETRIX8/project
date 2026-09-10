/**
 * Single source of truth for brand identity and contact details.
 * Change the name, tagline, phone, email, address or social links here —
 * every component reads from this object. Colors live in app/globals.css.
 */
export const siteConfig = {
  brand: {
    name: 'БОЧКАРЕВА / ГРАДПРАВО',
    shortName: 'ГРАДПРАВО',
    monogram: 'БГ',
    tagline: 'Юридический и градостроительный консалтинг',
    /** Legal entity name as used on the original site */
    legalName: 'Ассоциация правовой помощи в градостроительной деятельности',
    loaderPhrase: 'Проектируем решения. Защищаем интересы.',
  },
  url: 'https://bochkarevatv.ru',
  contact: {
    phone: '+7 966 388-99-77',
    phoneHref: 'tel:+79663889977',
    email: 'gradpravo_aso@mail.ru',
    address: 'г. Москва, ул. 2-я Брестская, д. 6, офис 1310, МФК «Резиденция Тверская»',
    addressShort: 'Москва, 2-я Брестская, 6',
  },
  social: {
    telegram: 'https://t.me/bochkarevatv',
    whatsapp:
      'https://wa.me/79663889977?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%A2%D0%B0%D1%82%D1%8C%D1%8F%D0%BD%D0%B0%20%D0%91%D0%BE%D1%87%D0%BA%D0%B0%D1%80%D0%B5%D0%B2%D0%B0%20%D0%BD%D0%B0%20%D1%81%D0%B2%D1%8F%D0%B7%D0%B8.',
    dzen: 'https://dzen.ru/gradpravo_aso',
  },
  nav: [
    { href: '/about', label: 'Об эксперте' },
    { href: '/services', label: 'Направления' },
    { href: '/projects', label: 'Деятельность' },
    { href: '/publications', label: 'Публикации' },
    { href: '/documents', label: 'Документы' },
    { href: '/contacts', label: 'Контакты' },
  ],
  /** Recipient of contact-form submissions. Override with CONTACT_TO_EMAIL. */
  formRecipient: 'gradpravo_aso@mail.ru',
} as const

export type SiteConfig = typeof siteConfig
