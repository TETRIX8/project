/**
 * Every image URL comes from the original site export (bochkarevatv_image_links.txt).
 * Register images here once and reference them by key everywhere else.
 */
export type SiteImage = {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  source?: string
}

const CDN = 'https://static.tildacdn.com'

export const images = {
  portraitDesk: {
    src: `${CDN}/tild3963-3734-4332-b035-306331306661/top_tatiana2.jpg`,
    alt: 'Татьяна Бочкарева за рабочим столом с открытой книгой',
    width: 1680,
    height: 1636,
    caption: 'Татьяна Владимировна Бочкарева',
  },
  portraitDeskSmall: {
    src: `${CDN}/tild6563-3564-4566-a236-316532646533/top_tatiana2.jpg`,
    alt: 'Татьяна Бочкарева, портрет',
    width: 320,
    height: 311,
  },
  portraitStanding: {
    src: `${CDN}/tild3431-3033-4532-a261-353538393539/tanya1.jpg`,
    alt: 'Татьяна Бочкарева в кабинете',
    width: 1680,
    height: 1361,
    caption: 'Татьяна Владимировна Бочкарева',
  },
  portraitBw: {
    src: `${CDN}/tild3463-3661-4931-b064-386264616338/03.jpeg`,
    alt: 'Татьяна Бочкарева, чёрно-белый портрет',
    width: 320,
    height: 320,
  },
  cityscape: {
    src: `${CDN}/tild6539-6664-4965-b666-333430353034/backgr3.jpg`,
    alt: 'Абстрактный городской пейзаж с высотными зданиями',
    width: 1680,
    height: 947,
  },
  justice: {
    src: `${CDN}/tild3931-3732-4439-b737-633233633139/thumb__1140_600_0_0_.jpeg`,
    alt: 'Статуя Фемиды на фоне современных высотных зданий',
    width: 1140,
    height: 600,
  },
  kazanysh: {
    src: `${CDN}/tild3763-3465-4431-b030-643962313363/06.jpeg`,
    alt: 'Татьяна Бочкарева на форуме «Казаныш» у флагов стран-участниц',
    width: 1600,
    height: 1200,
    caption: 'Международный архитектурно-строительный форум «Казаныш», Казань',
  },
  pmuf: {
    src: `${CDN}/tild3933-3932-4335-a236-666462653534/pmuf-2025.jpg`,
    alt: 'Татьяна Бочкарева на XIII Петербургском международном юридическом форуме',
    width: 1140,
    height: 600,
    caption: 'XIII Петербургский международный юридический форум, 2025',
  },
  bookPresentation: {
    src: `${CDN}/tild3832-3034-4266-b839-386238626434/fdb63f8f-8ead-439d-8.JPG`,
    alt: 'Презентация книги «Сначала ценности, потом бизнес»',
    width: 799,
    height: 1200,
    caption: 'Презентация книги «Сначала ценности, потом бизнес», Культурный центр ГлавУпДК при МИД России',
  },
  minstroy: {
    src: `${CDN}/tild3834-6461-4938-b436-303864366261/WhatsApp_Image_2025-.jpeg`,
    alt: 'Баннер «1 ноября — День основания Министерства строительства и ЖКХ Российской Федерации»',
    width: 1280,
    height: 854,
    caption: 'День основания Минстроя России',
    source: 'Минстрой России',
  },
  unityDay: {
    src: `${CDN}/tild3930-6536-4665-b833-336233323836/baner_4november.jpg`,
    alt: 'Баннер к Дню народного единства 4 ноября',
    width: 1084,
    height: 628,
  },
  letterBelieve: {
    src: `${CDN}/tild3264-3439-4661-b635-656434383330/tb_public1.jpg`,
    alt: 'Благодарственное письмо АНО «Мы верим в тебя» Татьяне Бочкаревой',
    width: 1181,
    height: 1665,
    caption: 'Благодарственное письмо АНО «Мы верим в тебя» за поддержку новогоднего праздника для детей с ограниченными возможностями здоровья',
  },
  letterPetrovsk: {
    src: `${CDN}/tild6162-6136-4662-b533-373563663732/tb_public2.jpg`,
    alt: 'Благодарственное письмо ГУ ЯО «Петровский детский дом» Ассоциации правовой помощи',
    width: 1181,
    height: 1665,
    caption: 'Благодарственное письмо ГУ ЯО «Петровский детский дом», 2025',
  },
  signature: {
    src: `${CDN}/tild6335-3735-4365-b530-356630303237/signature.png`,
    alt: 'Подпись Татьяны Бочкаревой',
    width: 865,
    height: 517,
  },
  signatureWhite: {
    src: `${CDN}/tild3632-6137-4236-b332-643533636161/signaturewhite.png`,
    alt: 'Подпись Татьяны Бочкаревой',
    width: 865,
    height: 517,
  },
} satisfies Record<string, SiteImage>

export type ImageKey = keyof typeof images
