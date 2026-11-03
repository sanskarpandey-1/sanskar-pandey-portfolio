import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const LINKEDIN_URL = 'https://www.linkedin.com/in/sanskarpandey-'
const GITHUB_URL = 'https://github.com/sanskarpandey-1'

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

const buttonBase =
  'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-base font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:focus-visible:ring-offset-night'

const HeroText2 = () => {
  const text = "Hi! I'm"

  const typingDelay = 0.1
  const characterDuration = 0.3
  const nameDelay = 0.3

  // First-scroll transition: name -> intro paragraph + buttons
  const [hasScrolled, setHasScrolled] = useState(false)

  // Fires once, ever
  const triggeredRef = useRef(false)
  // True only while the transition is playing (page scroll is blocked)
  const lockedRef = useRef(false)

  useEffect(() => {
    const LOCK_MS = 900
    let touchStartY = 0

    const trigger = () => {
      triggeredRef.current = true
      lockedRef.current = true
      setHasScrolled(true)
      setTimeout(() => {
        lockedRef.current = false
      }, LOCK_MS)
    }

    // Returns true if the event was handled (and should not scroll the page)
    const handle = (event, isDownward) => {
      // While the transition plays, block any scrolling
      if (lockedRef.current) {
        event.preventDefault()
        return
      }
      // Already played once: normal scrolling
      if (triggeredRef.current) return
      if (!isDownward) return

      event.preventDefault()
      trigger()
    }

    // Mouse wheel / trackpad
    const onWheel = (e) => handle(e, e.deltaY > 0)

    // Touch (phones, tablets)
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      const deltaY = touchStartY - e.touches[0].clientY // >0 = swipe up = scroll down
      if (!lockedRef.current && Math.abs(deltaY) < 10) return
      handle(e, deltaY > 0)
    }

    // Keyboard
    const onKeyDown = (e) => {
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return
      const downKeys = ['ArrowDown', 'PageDown', 'End', ' ', 'Spacebar']
      if (!downKeys.includes(e.key)) return
      handle(e, !e.shiftKey)
    }

    // Fallback: scrollbar drag or any other scroll source
    const onScroll = () => {
      if (!triggeredRef.current && window.scrollY > 10) trigger()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const ease = [0.22, 1, 0.36, 1]

  return (
    <section className="relative flex items-center">
      <div className="w-full">
        {/* STEP 1: typed "Hi! I'm" */}
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl">
          {text.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: index * typingDelay,
                duration: characterDuration,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        {/* Name and intro share one grid cell, so the block never
            changes height and nothing overlaps */}
        <div className="grid">
          {/* STEP 2 + 3: name appears, then moves up and fades on first scroll */}
          <motion.h1
            className="col-start-1 row-start-1 self-start md:self-center font-heading text-6xl md:text-7xl lg:text-9xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: hasScrolled ? 0 : 1,
              y: hasScrolled ? -100 : 0,
            }}
            transition={{
              opacity: { duration: 0.8 },
              y: { duration: 0.7, ease },
              delay: hasScrolled ? 0 : nameDelay,
            }}
          >
            Sanskar
          </motion.h1>

          {/* STEP 4: intro paragraph + social buttons */}
          <div
            className={`col-start-1 row-start-1 self-start md:self-center ${
              hasScrolled ? '' : 'pointer-events-none'
            }`}
            aria-hidden={!hasScrolled}
          >
            <motion.p
              className="max-w-xl text-lg leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: hasScrolled ? 1 : 0,
                y: hasScrolled ? 0 : 50,
              }}
              transition={{
                opacity: { duration: 0.6, delay: hasScrolled ? 0.35 : 0 },
                y: { duration: 0.7, delay: hasScrolled ? 0.35 : 0, ease },
              }}
            >
              I'm a final-year Computer Science Engineering student with a
              foundation in Python, full-stack web development, and problem
              solving. I enjoy building reliable software that solves
              real-world problems.
            </motion.p>

            <motion.div
              className="mt-12 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: hasScrolled ? 1 : 0,
                y: hasScrolled ? 0 : 30,
              }}
              transition={{
                opacity: { duration: 0.6, delay: hasScrolled ? 0.6 : 0 },
                y: { duration: 0.7, delay: hasScrolled ? 0.6 : 0, ease },
              }}
            >
              {/* LinkedIn: brand blue, white logo */}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={hasScrolled ? 0 : -1}
                className={`${buttonBase} bg-[#4f7397] text-white hover:bg-[#004182]`}
              >
                <LinkedInIcon />
                LinkedIn
              </a>

              {/* GitHub: black with white logo (inverts in dark mode) */}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={hasScrolled ? 0 : -1}
                className={`${buttonBase} bg-[#24292F] text-white hover:bg-black dark:bg-white dark:text-[#24292F] dark:hover:bg-gray-200`}
              >
                <GitHubIcon />
                GitHub
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroText2