import { useEffect, useRef, useState } from 'react'

/**
 * Decorative cursor ring. The SYSTEM cursor stays visible — this is purely
 * a glow ring that follows with lag and grows on interactive elements.
 * This way the user always sees their pointer.
 */
export default function Cursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0, visible: false })
  const ringPos = useRef({ x: -100, y: -100 })
  const dotPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef(0)

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return
    if (window.innerWidth <= 900) return // mobile: skip entirely

    function onMove(e) {
      targetRef.current.x = e.clientX
      targetRef.current.y = e.clientY
      targetRef.current.visible = true
    }
    function onLeave() {
      targetRef.current.visible = false
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    function loop() {
      const t = targetRef.current
      // ring lags
      ringPos.current.x += (t.x - ringPos.current.x) * 0.18
      ringPos.current.y += (t.y - ringPos.current.y) * 0.18
      // dot is faster
      dotPos.current.x += (t.x - dotPos.current.x) * 0.55
      dotPos.current.y += (t.y - dotPos.current.y) * 0.55

      if (ring) {
        ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${t.visible ? 1 : 0})`
        ring.style.opacity = t.visible ? '1' : '0'
      }
      if (dot) {
        dot.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%) scale(${t.visible ? 1 : 0})`
        dot.style.opacity = t.visible ? '1' : '0'
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    function onEnter() {
      ring?.classList.add('hover')
    }
    function onLeaveEl() {
      ring?.classList.remove('hover')
    }
    // wait a tick for DOM to settle, then bind hover
    const bindTimer = setTimeout(() => {
      const els = document.querySelectorAll('a, button, .skill, .install-row, .install-step, .fp, .stack-pill, .lib-domain, input, [data-cursor]')
      els.forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeaveEl)
      })
    }, 100)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(bindTimer)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
