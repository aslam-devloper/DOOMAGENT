import { useEffect, useRef, useSyncExternalStore } from 'react'

/**
 * High-performance global mouse tracker.
 *
 * Why this exists: an earlier version called setState in rAF, which caused
 * every consumer to re-render every frame. That was the main source of
 * input lag on the site. This version uses a ref + window event + a tiny
 * pub/sub. Components that need raw coordinates read from `getMouse()` in
 * their own animation loops. Components that need React-driven re-renders
 * (rare) use `useMousePos()` which uses useSyncExternalStore — still cheap,
 * but only notifies subscribers on actual change.
 */

const listeners = new Set()
const pos = { x: 0, y: 0, nx: 0, ny: 0 }
let attached = false
let rafScheduled = false

function onMove(e) {
  pos.x = e.clientX
  pos.y = e.clientY
  if (!rafScheduled) {
    rafScheduled = true
    requestAnimationFrame(flush)
  }
}

function flush() {
  rafScheduled = false
  const w = window.innerWidth || 1
  const h = window.innerHeight || 1
  pos.nx = (pos.x - w / 2) / (w / 2)
  pos.ny = (pos.y - h / 2) / (h / 2)
  listeners.forEach(fn => fn())
}

function attach() {
  if (attached || typeof window === 'undefined') return
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('mouseleave', () => { pos.x = -9999; pos.y = -9999; listeners.forEach(fn => fn()) }, { passive: true })
  attached = true
}

function subscribe(fn) {
  attach()
  listeners.add(fn)
  return () => listeners.delete(fn)
}

const serverSnapshot = { x: 0, y: 0, nx: 0, ny: 0 }
function getSnapshot() { return pos }
function getServerSnapshot() { return serverSnapshot }

/**
 * Returns a stable ref-like object containing the current mouse position.
 * Reads from a shared ref, NO React re-render. Use inside rAF/animation
 * loops where you can poll .current.x freely.
 */
export function getMouse() { return pos }

/**
 * Subscribes the calling component to mouse position changes. Re-renders
 * only when the mouse actually moves (useSyncExternalStore, throttled by
 * the rAF in flush). For heavy components prefer `getMouse()` + manual rAF.
 */
export default function useMouse() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
