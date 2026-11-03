import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'


const RESUME_FILE = '/Sanskar_Pandey_Resume.pdf'
const RESUME_DOWNLOAD_NAME = 'Sanskar_Pandey_Resume.pdf'

const RESUME_TEXT =
  'Download my resume for details about my education, technical skills, AI Resume Parser project and certifications.'

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
// Four-point sparkle used as the heading bullet
const SparkIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="currentColor" aria-hidden="true">
    <path d="M12 2c.5 5.5 4.5 9.5 10 10-5.5.5-9.5 4.5-10 10-.5-5.5-4.5-9.5-10-10 5.5-.5 9.5-4.5 10-10z" />
  </svg>
)

const DownloadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3v12" />
    <path d="M7 11l5 5 5-5" />
    <path d="M4 21h16" />
  </svg>
)

/* ---------------------------- Section ---------------------------- */
const Resume = () => {
  return (
    <section
      id="resume"
      className="scroll-mt-4 overflow-hidden border-t-4 border-accent bg-bg px-4 py-20 text-text transition-colors duration-500 dark:bg-night dark:text-bg md:px-20 md:py-28"
    >
      {/* Small heading with a stylish bullet */}
      <Reveal>
        <div className="flex items-center gap-3">
          <SparkIcon />
          <h2 className="font-heading text-3xl">Resume</h2>
          <span
            aria-hidden="true"
            className="ml-1 hidden h-px w-24 bg-gradient-to-r from-accent to-transparent sm:block"
          />
        </div>
      </Reveal>

      <div className="relative mx-auto mt-12 max-w-6xl">
        {/* Giant word sitting behind the glass panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
        >
          <span className="bg-gradient-to-r from-accent to-gold bg-clip-text font-heading text-[26vw] leading-none text-transparent md:text-[15rem]">
            Resume
          </span>
        </div>

        {/* Transparent glass panel */}
        <Reveal className="relative z-10" delay={0.1}>
          <div className="flex flex-col gap-8 rounded-[32px] border border-text/15 bg-white/30 p-8 shadow-[0_20px_60px_-20px_rgba(28,28,28,0.25)] backdrop-blur dark:border-bg/20 dark:bg-white/5 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] md:min-h-[17rem] md:flex-row md:items-center md:justify-between md:gap-12 md:p-12">
            <p className="max-w-xl text-xl font-medium leading-relaxed md:text-2xl">
              {RESUME_TEXT}
            </p>

            <a
              href={RESUME_FILE}
              download={RESUME_DOWNLOAD_NAME}
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E8561F] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:focus-visible:ring-offset-night md:self-center"
            >
              <DownloadIcon />
              Download resume
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Resume