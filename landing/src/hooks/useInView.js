import { useEffect, useRef, useState } from 'react'

/**
 * IntersectionObserver hook. Returns a ref and a boolean indicating
 * whether the element has entered the viewport (once: false = fire on
 * every crossing; once: true = fire once then stay true).
 */
export default function useInView(options = {}) {
  const { threshold = 0.15, once = true, rootMargin = '0px 0px -10% 0px' } = options
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, once, rootMargin])

  return [ref, inView]
}
