import { useEffect, useRef, useState } from 'react'

const INTERACTIVE = 'a, button, input, textarea, [role="button"]'

function MotionCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const [enabled] = useState(
    () =>
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (!enabled) return

    document.documentElement.classList.add('has-motion-cursor')

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { ...target }
    const glow = { ...target }
    let frame

    function onMove(e) {
      target.x = e.clientX
      target.y = e.clientY
      document.documentElement.classList.remove('cursor-hidden')
      const hovering = e.target instanceof Element && e.target.closest(INTERACTIVE)
      ringRef.current.classList.toggle('is-hover', Boolean(hovering))
    }

    function onDown() {
      ringRef.current.classList.add('is-down')
    }

    function onUp() {
      ringRef.current.classList.remove('is-down')
    }

    function onLeave() {
      document.documentElement.classList.add('cursor-hidden')
    }

    function tick() {
      ring.x += (target.x - ring.x) * 0.18
      ring.y += (target.y - ring.y) * 0.18
      glow.x += (target.x - glow.x) * 0.08
      glow.y += (target.y - glow.y) * 0.08

      dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      glowRef.current.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-motion-cursor', 'cursor-hidden')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="motion-cursor" aria-hidden="true">
      <div ref={glowRef} className="cursor-glow" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}

export default MotionCursor
