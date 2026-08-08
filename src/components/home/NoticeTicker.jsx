import { useResource } from '../../hooks/useResource'
import { siteSettingsList, tickerText } from '../../data/siteSettings'

/**
 * NoticeTicker — the animated "Latest News" marquee bar under the hero.
 * The ticker text is editable via the admin "Site Settings" screen.
 */
export default function NoticeTicker() {
  const { data } = useResource('settings', siteSettingsList)
  const setting = Array.isArray(data) ? data.find((s) => s.key === 'ticker') : null
  const text = (setting && setting.value) || tickerText

  return (
    <div className="flex w-full h-10">
      <div className="w-1/2 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 flex items-center justify-end pr-2">
        <h4 className="font-bold">Latest News:</h4>
      </div>
      <div className="w-1/2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 overflow-hidden flex items-center">
        <p className="font-semibold whitespace-nowrap animate-[slide_30s_linear_infinite] text-white pl-2">
          {text}
        </p>
      </div>
    </div>
  )
}
