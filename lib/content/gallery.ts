import type { ImageKey } from './images'

export type GalleryCategory = 'events' | 'charity' | 'documents' | 'portraits'

export type GalleryItem = {
  image: ImageKey
  category: GalleryCategory
  /** Optional link to the related publication */
  href?: string
}

export const galleryCategories: Record<GalleryCategory, string> = {
  events: 'Мероприятия',
  charity: 'Благотворительность',
  documents: 'Документы',
  portraits: 'Портреты',
}

/**
 * All items reference real export images. The original «Дипломы» gallery
 * images were not present in the export — see the TODO note in the gallery UI.
 */
export const galleryItems: GalleryItem[] = [
  { image: 'kazanysh', category: 'events', href: '/publications/kazynash' },
  { image: 'pmuf', category: 'events', href: '/publications/pmuf-2025' },
  { image: 'bookPresentation', category: 'events', href: '/publications/book-about' },
  { image: 'letterBelieve', category: 'charity' },
  { image: 'letterPetrovsk', category: 'charity' },
  { image: 'portraitDesk', category: 'portraits' },
  { image: 'portraitStanding', category: 'portraits' },
]
