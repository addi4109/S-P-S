import { useReveal } from '../../hooks/useReveal'

/**
 * Reveal — fades its children in the first time they scroll into view.
 * Mirrors the `style="opacity: 0"` + IntersectionObserver behaviour of the
 * original static homepage.
 */
export default function Reveal({
  as: Tag = 'div',
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={className} style={{ opacity: 0, ...style }} {...rest}>
      {children}
    </Tag>
  )
}
