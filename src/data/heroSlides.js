/**
 * heroSlides — the homepage hero slider sequence (slides 1–11). Used as the
 * static fallback for the hero resource and as the seed source for MongoDB.
 */
export const heroSlides = Array.from({ length: 11 }, (_, i) => ({
  image: `/assets/images/hero/slide${i + 1}.jpg`,
  order: i + 1,
  active: true,
}))
