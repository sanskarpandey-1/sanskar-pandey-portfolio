import React, { useRef, useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'


const BASE_SPEED_TOP = 2.2 
const BASE_SPEED_BOTTOM = 1.8 
const BOOST_SENSITIVITY = 500 
const BOOST_MAX = 8 


const TECH = [
  { name: 'Python', slug: 'python' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'HTML', slug: 'html5' },
  { name: 'CSS', slug: 'css3' },
  { name: 'React', slug: 'react' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Express.js', slug: 'express' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'SQL', icon: 'db' },
  { name: 'Git', slug: 'git' },
  { name: 'GitHub', slug: 'github' },
  { name: 'Vercel', slug: 'vercel' },
  { name: 'Gemini API', icon: 'text', abbreviation: 'AI' },
]


const VARIANTS = [
  // Peach (dark mode: warm charcoal)
  'bg-surface text-text dark:bg-[#2A2420] dark:text-bg',
  // Brand orange
  'bg-accent text-white',
  // Gold
  'bg-gold text-[#1C1C1C]',
  // Espresso (dark mode: peach), same inversion as the About section
  'bg-[#2B211C] text-bg dark:bg-surface dark:text-night',
]

/* ------------------- Slide-up reveal (plays once) ------------------- */
const ease = [0.22, 1, 0.36, 1]

const Reveal = ({ children, delay = 0, className }) => {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ---------------------------- Icons ---------------------------- */
const SparkIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="currentColor" aria-hidden="true">
    <path d="M12 2c.5 5.5 4.5 9.5 10 10-5.5.5-9.5 4.5-10 10-.5-5.5-4.5-9.5-10-10 5.5-.5 9.5-4.5 10-10z" />
  </svg>
)

const DbIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6 text-[#1C1C1C]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
    <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
  </svg>
)

const TechLogo = ({ tech }) => {
  const [failed, setFailed] = useState(false)

  if (tech.icon === 'db') return <DbIcon />
  if (tech.icon === 'text') {
    return (
      <span className="text-xs font-bold text-[#1C1C1C]">
        {tech.abbreviation}
      </span>
    )
  }
  if (failed) {
    return (
      <span className="text-xs font-bold text-[#1C1C1C]">
        {tech.name.slice(0, 2)}
      </span>
    )
  }

  const src = tech.src ?? `https://cdn.simpleicons.org/${tech.slug}`
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      draggable="false"
      onError={() => setFailed(true)}
      className="h-6 w-6 object-contain"
    />
  )
}

/* ----------------------------- Chip ----------------------------- */
const Chip = ({ tech, variant }) => (
  <div
    className={`flex shrink-0 items-center gap-3 rounded-full py-2 pl-2 pr-5 text-base font-semibold shadow-sm md:text-lg ${VARIANTS[variant % VARIANTS.length]}`}
  >
    {/* White tile keeps every logo visible on every chip colour */}
    <span className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-inner">
      <TechLogo tech={tech} />
    </span>
    {tech.name}
  </div>
)

/* ------------------------- Marquee row ------------------------- */
const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

const fade =
  'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'

const MarqueeRow = ({ items, direction, baseSpeed, boost, variantOffset }) => {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '200px 0px' })
  const paused = useRef(false)

  
  const x = useMotionValue(0)
  const translate = useTransform(x, (v) => `${v}%`)

  useAnimationFrame((_, delta) => {
    if (reduce || !inView || paused.current) return
    const dt = Math.min(delta, 64) / 1000 
    const speed = baseSpeed * (1 + boost.get())
    x.set(wrap(-50, 0, x.get() + direction * speed * dt))
  })

  const row = (copy) =>
    items.map((tech, i) => (
      <div key={`${copy}-${tech.name}`} aria-hidden={copy === 1 ? true : undefined}>
        <Chip tech={tech} variant={i + variantOffset} />
      </div>
    ))

  return (
    <div
      ref={ref}
      className="overflow-hidden"
      style={{ maskImage: fade, WebkitMaskImage: fade }}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <motion.div
        className="flex w-max gap-4 pr-4"
        style={{ x: translate }}
      >
        {row(0)}
        {row(1)}
      </motion.div>
    </div>
  )
}

/* ---------------------------- Section ---------------------------- */
const TechStack = () => {
 
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const boost = useTransform(smooth, (v) =>
    Math.min(Math.abs(v) / BOOST_SENSITIVITY, BOOST_MAX)
  )

  return (
    <section
      id="tech"
      className="overflow-hidden border-t border-text/10 bg-bg py-20 text-text transition-colors duration-500 dark:border-bg/10 dark:bg-night dark:text-bg md:py-28"
    >
      <Reveal className="px-4 md:px-20">
        <div className="flex items-center gap-3">
          <SparkIcon />
          <h2 className="font-heading text-3xl">Tech stack</h2>
          <span
            aria-hidden="true"
            className="ml-1 hidden h-px w-24 bg-gradient-to-r from-accent to-transparent sm:block"
          />
        </div>
      </Reveal>

      <Reveal className="mt-10 space-y-4 md:mt-14" delay={0.1}>
        <div role="group" aria-label="Technologies I work with" className="space-y-4">
          <MarqueeRow
            items={TECH}
            direction={-1}
            baseSpeed={BASE_SPEED_TOP}
            boost={boost}
            variantOffset={0}
          />
          <MarqueeRow
            items={[...TECH].reverse()}
            direction={1}
            baseSpeed={BASE_SPEED_BOTTOM}
            boost={boost}
            variantOffset={2}
          />
        </div>
      </Reveal>

    </section>
  )
}

export default TechStack