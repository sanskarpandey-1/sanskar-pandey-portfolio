import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'


const CONTACT = {
  email: 'sanskarpandey077@gmail.com',
  phone: '+91-9131782481',
  linkedin: 'https://www.linkedin.com/in/sanskarpandey-',
  github: 'https://github.com/sanskarpandey-1',
}


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
const SparkIcon = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2c.5 5.5 4.5 9.5 10 10-5.5.5-9.5 4.5-10 10-.5-5.5-4.5-9.5-10-10 5.5-.5 9.5-4.5 10-10z" />
  </svg>
)

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke} aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </svg>
)

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke} aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke} aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" {...stroke} aria-hidden="true">
    <path d="M12 19V5" />
    <path d="M6 11l6-6 6 6" />
  </svg>
)

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

/* --------------------------- Buttons --------------------------- */
const buttonBase =
  'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-base font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B211C] dark:focus-visible:ring-offset-surface'

const SOCIALS = [
  {
    name: 'LinkedIn',
    href: CONTACT.linkedin,
    Icon: LinkedInIcon,
    className: 'bg-[#0A66C2] text-white hover:bg-[#004182]',
  },
  {
    name: 'GitHub',
    href: CONTACT.github,
    Icon: GitHubIcon,
    className:
      'bg-white text-[#24292F] hover:bg-gray-200 dark:bg-[#24292F] dark:text-white dark:hover:bg-black',
  },
].filter((s) => s.href)

/* ---------------------------- Section ---------------------------- */
const Contact = () => {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
     
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-4 border-t-4 border-accent bg-[#2B211C] px-4 pt-20 text-bg transition-colors duration-500 dark:bg-surface dark:text-night md:px-20 md:pt-28"
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <SparkIcon className="h-6 w-6 text-gold dark:text-[#B8431A]" />
          <h2 className="font-heading text-3xl">Contact</h2>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-4xl font-heading text-5xl leading-[1.05] sm:text-6xl md:text-8xl">
          Let's build something together.
        </p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-bg/80 dark:text-night/80 md:text-xl">
          I'm open to opportunities, collaborations and good conversations. Tell
          me what you're working on, or just say hello.
        </p>
      </Reveal>

      
      <Reveal delay={0.15} className="mt-12">
        <a
          href={`mailto:${CONTACT.email}`}
          className="break-all text-2xl font-semibold underline decoration-accent decoration-4 underline-offset-8 transition-colors duration-300 hover:text-gold dark:hover:text-[#B8431A] sm:text-4xl md:text-5xl"
        >
          {CONTACT.email}
        </a>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${CONTACT.email}`}
            className={`${buttonBase} bg-accent text-white hover:bg-[#E8561F]`}
          >
            <MailIcon />
            Send an email
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className={`${buttonBase} border border-bg/30 bg-bg/5 backdrop-blur-md hover:bg-bg/10 dark:border-night/30 dark:bg-night/5 dark:hover:bg-night/10`}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            <span aria-live="polite">{copied ? 'Copied' : 'Copy address'}</span>
          </button>
        </div>

        {CONTACT.phone && (
          <p className="mt-6 text-lg text-bg/80 dark:text-night/80">
            Or call{' '}
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              className="font-semibold underline underline-offset-4 hover:text-gold dark:hover:text-[#B8431A]"
            >
              {CONTACT.phone}
            </a>
          </p>
        )}
      </Reveal>

      {/* Social links */}
      <Reveal delay={0.1} className="mt-14">
        <h3 className="font-heading text-3xl">Find me online</h3>
        <div className="mt-5 flex flex-wrap gap-3">
          {SOCIALS.map(({ name, href, Icon, className }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonBase} ${className}`}
            >
              <Icon />
              {name}
            </a>
          ))}
        </div>
      </Reveal>

      {/* Footer */}
      <footer className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-bg/15 py-8 text-sm text-bg/70 dark:border-night/15 dark:text-night/70 sm:flex-row sm:items-center md:mt-28">
        <p>
          © {new Date().getFullYear()} Sanskar Pandey. Designed and built by me.
        </p>
        <a
          href="#top"
          className="group inline-flex items-center gap-2 font-semibold transition-colors duration-300 hover:text-gold dark:hover:text-[#B8431A]"
        >
          Back to top
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
            <ArrowUpIcon />
          </span>
        </a>
      </footer>
    </section>
  )
}

export default Contact