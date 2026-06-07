import { useEffect, useRef } from 'react'
import { getMouse } from '../hooks/useMouse'

/**
 * Mesh gradient — perf version.
 *
 * Two blurred blobs that drift in 3D space and follow the cursor.
 * Reads from getMouse() in a single rAF loop and writes directly to
 * the DOM. No React state, no framer-motion. Two blobs instead of
 * three, 40px blur instead of 80px — much cheaper on the GPU.
 */
export default function MeshGradient() {
  const a1Ref = useRef(null)
  const a2Ref = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth <= 700) return
    const a1 = a1Ref.current
    const a2 = a2Ref.current
    if (!a1 || !a2) return

    let tx1 = 0, ty1 = 0, tx2 = 0, ty2 = 0
    function loop() {
      const m = getMouse()
      const targetX1 = m.nx * 30
      const targetY1 = m.ny * 20
      const targetX2 = m.nx * -40
      const targetY2 = m.ny * -25
      tx1 += (targetX1 - tx1) * 0.05
      ty1 += (targetY1 - ty1) * 0.05
      tx2 += (targetX2 - tx2) * 0.05
      ty2 += (targetY2 - ty2) * 0.05
      a1.style.transform = `translate3d(${tx1.toFixed(1)}px, ${ty1.toFixed(1)}px, 0)`
      a2.style.transform = `translate3d(${tx2.toFixed(1)}px, ${ty2.toFixed(1)}px, 0)`
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="mesh" aria-hidden>
      <div ref={a1Ref} className="mesh-blob a1" />
      <div ref={a2Ref} className="mesh-blob a2" />
      <div className="mesh-grain" />
    </div>
  )
}
