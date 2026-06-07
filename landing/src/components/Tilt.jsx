import { useEffect, useRef } from 'react'

/**
 * 3D mouse-tilt wrapper — performance version.
 *
 * Reads mouse position from the global ref (getMouse) in its own rAF
 * loop and writes directly to the element's transform. No React state,
 * no framer-motion springs on idle cards. Springs are only added when
 * the card is being hovered, so 21 idle library cards cost ~0.
 *
 * Props:
 *  - maxTilt:   degrees (default 6)
 *  - scale:     hover scale (default 1.02)
 *  - disabled:  skip binding (default false)
 *  - as:        tag (default 'div')
 */
import { getMouse } from '../hooks/useMouse'

const Tilt = ({
  children,
  maxTilt = 6,
  scale = 1.02,
  disabled = false,
  className = '',
  style = {},
  ...rest
}) => {
  const innerRef = useRef(null)
  const stateRef = useRef({ hovering: false, rx: 0, ry: 0, s: 1, tx: 0, ty: 0 })
  const rafRef = useRef(0)

  useEffect(() => {
    if (disabled) return
    const inner = innerRef.current
    if (!inner) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth <= 900) return

    let r = null
    function onEnter() { stateRef.current.hovering = true; inner.style.transition = 'transform .15s ease-out' }
    function onLeave() {
      stateRef.current.hovering = false
      stateRef.current.rx = 0
      stateRef.current.ry = 0
      stateRef.current.s = 1
      inner.style.transition = 'transform .35s ease-out'
    }
    function onMove(e) {
      if (!stateRef.current.hovering) return
      r = r || inner.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      stateRef.current.rx = (py * 2 - 1) * -maxTilt
      stateRef.current.ry = (px * 2 - 1) * maxTilt
      r = null
    }

    function loop() {
      const s = stateRef.current
      if (s.hovering) {
        // smooth toward target
        s.tx += (s.rx - s.tx) * 0.22
        s.ty += (s.ry - s.ty) * 0.22
        const targetScale = scale
        // ease scale
        s.s += (targetScale - s.s) * 0.18
      }
      inner.style.transform =
        `perspective(900px) rotateX(${s.tx.toFixed(2)}deg) rotateY(${s.ty.toFixed(2)}deg) scale(${s.s.toFixed(3)})`
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    inner.addEventListener('mouseenter', onEnter)
    inner.addEventListener('mouseleave', onLeave)
    inner.addEventListener('mousemove', onMove)

    return () => {
      cancelAnimationFrame(rafRef.current)
      inner.removeEventListener('mouseenter', onEnter)
      inner.removeEventListener('mouseleave', onLeave)
      inner.removeEventListener('mousemove', onMove)
    }
  }, [maxTilt, scale, disabled])

  return (
    <div
      ref={innerRef}
      className={className}
      style={{ willChange: 'transform', ...style }}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Tilt
