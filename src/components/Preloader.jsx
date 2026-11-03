import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const assetsReady = (maxWait) =>
  new Promise((resolve) => {
    const timer = setTimeout(resolve, maxWait)
    const fonts = document.fonts?.ready ?? Promise.resolve()
    const loaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener('load', r, { once: true }))
    Promise.all([fonts, loaded]).then(() => {
      clearTimeout(timer)
      resolve()
    })
  })

const Preloader = ({
  duration = 2.4,
  holdMs = 300,
  revealLeadMs = 180,
  maxWaitMs = 1200,
  onReveal,
  onComplete,
}) => {
  const reduceMotion = useReducedMotion()
  const [percentage, setPercentage] = useState(0)
  const [phase, setPhase] = useState('loading') // loading | exiting

  const revealRef = useRef(onReveal)
  const completeRef = useRef(onComplete)
  useEffect(() => {
    revealRef.current = onReveal
    completeRef.current = onComplete
  }, [onReveal, onComplete])

  /* ---------------- Timeline ---------------- */
  useEffect(() => {
    let cancelled = false
    const total = (reduceMotion ? 0.4 : duration) * 1000
    const startedAt = performance.now()
    const ticker = window.setInterval(() => {
      setPercentage(Math.min(99, ((performance.now() - startedAt) / total) * 100))
    }, 40)

    const run = async () => {
      const ready = assetsReady(maxWaitMs)
      await wait(total)
      window.clearInterval(ticker)
      if (cancelled) return
      setPercentage(100)

      await ready
      if (cancelled) return

      await wait(Math.max(0, holdMs - revealLeadMs))
      if (cancelled) return
      revealRef.current?.()
      await wait(revealLeadMs)
      if (cancelled) return
      setPhase('exiting')
    }

    run()
    return () => {
      cancelled = true
      window.clearInterval(ticker)
    }
  }, [duration, holdMs, revealLeadMs, maxWaitMs, reduceMotion])

  /* ------- Block scrolling/input underneath while loading ------- */
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const block = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }
    const scrollKeys = [
      'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'End', 'Home', ' ', 'Spacebar',
    ]
    const blockKey = (e) => {
      if (scrollKeys.includes(e.key)) block(e)
    }

    window.addEventListener('wheel', block, { capture: true, passive: false })
    window.addEventListener('touchmove', block, { capture: true, passive: false })
    window.addEventListener('keydown', blockKey, true)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('wheel', block, true)
      window.removeEventListener('touchmove', block, true)
      window.removeEventListener('keydown', blockKey, true)
    }
  }, [])

  const exiting = phase === 'exiting'

  useEffect(() => {
    if (!exiting) return
    const timer = window.setTimeout(
      () => completeRef.current?.(),
      reduceMotion ? 300 : 1050,
    )
    return () => window.clearTimeout(timer)
  }, [exiting, reduceMotion])

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden px-6 text-white"
      style={{
        pointerEvents: exiting ? 'none' : 'auto',
        willChange: 'transform',
        transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
        clipPath: 'url(#loader-screen-wave)',
        transition: `transform ${reduceMotion ? '0.25s ease-out' : '1.05s cubic-bezier(0.72, 0, 0.28, 1)'}`,
        backgroundImage:
          'radial-gradient(ellipse at 50% 115%, rgba(100,116,139,0.45), transparent 58%), radial-gradient(ellipse at 50% 50%, rgba(43,53,72,0.56), transparent 70%), linear-gradient(160deg, #070a10 10%, #111722 57%, #202938 100%)',
      }}
      onTransitionEnd={(event) => {
        if (exiting && event.target === event.currentTarget && event.propertyName === 'transform') {
          completeRef.current?.()
        }
      }}
    >
      <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0" viewBox="0 0 1 1">
        <defs>
          <clipPath id="loader-screen-wave" clipPathUnits="objectBoundingBox">
            <path d="M0 0H1V1Q0.5 1.22 0 1Z" />
          </clipPath>
        </defs>
      </svg>
      <motion.div
        initial={false}
        animate={{
          opacity: exiting ? 0 : 1,
          y: exiting ? -24 : 0,
        }}
        transition={{ duration: reduceMotion ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm text-center"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -inset-x-16 -inset-y-20 -z-10">
          <motion.span
            className="absolute left-[12%] top-[25%] h-1 w-1 rounded-full bg-white/80"
            animate={reduceMotion ? undefined : { opacity: [0.2, 0.9, 0.3], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="absolute right-[18%] top-[18%] h-1 w-1 rounded-full bg-white/70"
            animate={reduceMotion ? undefined : { opacity: [0.15, 0.7, 0.2] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
          <motion.span
            className="absolute bottom-[17%] right-[8%] h-1 w-1 rounded-full bg-white/70"
            animate={reduceMotion ? undefined : { opacity: [0.2, 0.8, 0.25], scale: [1, 1.5, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
        </div>

        <motion.p
          initial={false}
          animate={{ opacity: exiting ? 0 : 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.55, delay: reduceMotion ? 0 : 0.15 }}
          className="font-sans text-6xl font-semibold leading-none tracking-[-0.06em] tabular-nums text-white drop-shadow-[0_4px_26px_rgba(255,255,255,0.15)] sm:text-7xl"
        >
          {String(Math.round(percentage)).padStart(2, '0')}
        </motion.p>

        <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.48em] text-white/65 sm:text-xs">
          Sanskar Pandey
        </p>
        <div
          role="progressbar"
          aria-label="Portfolio loading progress"
          aria-valuemin={0}
          aria-valuenow={Math.round(percentage)}
          aria-valuemax={100}
          className="mx-auto mt-5 h-px w-48 overflow-hidden bg-white/20 sm:w-56"
        >
          <div
            className="h-full origin-left bg-gradient-to-r from-[#ff6b35] via-white/90 to-white"
            style={{
              transform: `scaleX(${percentage / 100})`,
              transition: 'transform 60ms linear',
              boxShadow: '0 0 12px rgba(255, 107, 53, 0.55)',
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default Preloader