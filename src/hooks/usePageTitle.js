import { useEffect } from 'react'

/** Sets document.title per route, e.g. usePageTitle('About Us'). */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | SPS`
      : 'SPS | Satara Polytechnic Satara'
  }, [title])
}
