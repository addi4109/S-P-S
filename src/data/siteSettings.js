import { siteConfig } from './siteConfig.js'

/**
 * siteSettings — editable site settings (ticker text, contact details).
 * `siteSettings` is the static fallback for the `settings` MongoDB resource;
 * `siteSettingsList` is the seed shape ({ key, value }[]).
 */
export const tickerText =
  '🚀 SPS Admissions Open for year – Enroll Now | 6+ Branches Available for Engineering & Technology | Top Faculty Ensuring Quality Education | State-of-the-Art Labs & Campus Facilities | Scholarships Available for Meritorious Students | Apply Online Today!'

export const siteSettings = {
  ticker: tickerText,
  name: siteConfig.name,
  shortName: siteConfig.shortName,
  society: siteConfig.society,
  address: siteConfig.address,
  officeTimings: siteConfig.officeTimings,
  phones: siteConfig.phones.join(', '),
  mapEmbedUrl: siteConfig.mapEmbedUrl,
  builtBy: siteConfig.builtBy,
  copyrightYear: String(siteConfig.copyrightYear),
}

export const siteSettingsList = Object.entries(siteSettings).map(([key, value]) => ({
  key,
  value: String(value),
}))
