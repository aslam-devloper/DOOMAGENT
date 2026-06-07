import { useEffect, useRef } from 'react'

export default function BouncingMark() {
  const markRef = useRef(null)
  const trailsRef = useRef([])
  const stateRef = useRef({
    x: 80, y: 80, dx: 1.8, dy: 1.5, ci: 0, bounces: 0, trailIdx: 0,
  })

  useEffect(() => {
    const mark = markRef.current
    if (!mark) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      mark.style.transform = 'translate(20px, 20px)'
      return
    }

    const colors = ['#00E5FF', '#FF2D55', '#FFD60A', '#39FF14', '#FF00FF', '#B388FF', '#00E5FF']
    const size = 24
    const TRAIL_N = 14
    const trailEls = []

    for (let i = 0; i < TRAIL_N; i++) {
      const t = document.createElement('div')
      t.className = 'trail'
      t.style.opacity = '0'
      document.body.appendChild(t)
      trailEls.push(t)
    }
    trailsRef.current = trailEls

    let bounces = parseInt(localStorage.getItem('dm_bounces') || '0', 10)
    stateRef.current.bounces = bounces

    let raf
    const state = stateRef.current
    function tick() {
      const { mx, my } = { mx: window.innerWidth - size - 4, my: window.innerHeight - size - 4 }
      state.x += state.dx
      state.y += state.dy

      if (state.x <= 4 || state.x >= mx) {
        state.dx = -state.dx
        state.x = Math.max(4, Math.min(state.x, mx))
        state.ci = (state.ci + 1) % colors.length
        mark.style.background = colors[state.ci]
        bounces++
        state.bounces = bounces
        localStorage.setItem('dm_bounces', bounces)
        const bouncesEls = document.querySelectorAll('[data-bounces]')
        bouncesEls.forEach(el => el.textContent = bounces.toLocaleString())
      }
      if (state.y <= 4 || state.y >= my) {
        state.dy = -state.dy
        state.y = Math.max(4, Math.min(state.y, my))
        state.ci = (state.ci + 1) % colors.length
        mark.style.background = colors[state.ci]
        bounces++
        state.bounces = bounces
        localStorage.setItem('dm_bounces', bounces)
        const bouncesEls = document.querySelectorAll('[data-bounces]')
        bouncesEls.forEach(el => el.textContent = bounces.toLocaleString())
      }
      mark.style.transform = `translate(${state.x}px, ${state.y}px)`

      if (Math.random() < 0.6) {
        const t = trailEls[state.trailIdx]
        t.style.background = colors[state.ci]
        t.style.opacity = '0.5'
        t.style.transform = `translate(${state.x + size / 2 - 4}px, ${state.y + size / 2 - 4}px)`
        state.trailIdx = (state.trailIdx + 1) % TRAIL_N
      }
      for (let i = 0; i < trailEls.length; i++) {
        const t = trailEls[i]
        const op = parseFloat(t.style.opacity || '0')
        if (op > 0) t.style.opacity = (op - 0.012).toFixed(3)
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      trailEls.forEach(t => t.remove())
    }
  }, [])

  return <div ref={markRef} className="mark" aria-hidden="true" />
}
