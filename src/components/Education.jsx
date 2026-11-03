import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'


const EDUCATION = [
  {
    period: '2023 – 2027',
    title: 'B.Tech, Computer Science Engineering',
    place: 'R.G.P.V University, Jabalpur',
    grade: 'CGPA: 7.05',
  },
  {
    period: '2023',
    title: 'Higher Secondary Education (Class 12th)',
    place: 'Maharishi Vidya Mandir, M.P. Board',
    grade: 'Percentage: 62%',
  },
  {
    period: '2021',
    title: 'Class 10th',
    place: 'Maharishi Vidya Mandir, M.P. Board',
    grade: 'Percentage: 56%',
  },
]

const CERTIFICATIONS = [
  {
    title: 'CCNA: Introduction to Networks',
    issuer: '',
    date: '',
  },
  {
    title: 'Cloud Security Fundamentals',
    issuer: '',
    date: '',
  },
  {
    title: 'Introduction to Modern AI',
    issuer: '',
    date: '',
  },
]


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

const BadgeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="9" r="5.5" />
    <path d="M8.8 13.6L7.5 21l4.5-2.6 4.5 2.6-1.3-7.4" />
  </svg>
)


const accentText = 'text-gold dark:text-[#B8431A]'

/* ---------------------------- Section ---------------------------- */
const Education = () => {
  return (
    <section
      id="education"
      className="scroll-mt-4 border-t-4 border-accent bg-[#2B211C] px-4 py-16 text-bg transition-colors duration-500 dark:bg-surface dark:text-night sm:py-20 md:px-20 md:py-28"
    >
     
      <div className="grid grid-cols-2 gap-5 sm:gap-10 md:gap-20">
        {/* LEFT: certifications */}
        <div className="min-w-0">
          <Reveal>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl">
              Certifications
            </h2>
          </Reveal>

          <ul className="mt-6 space-y-3 sm:mt-10 sm:space-y-4">
            {CERTIFICATIONS.map((c, i) => (
              <li key={c.title}>
                <Reveal delay={i * 0.12}>
                  <div className="flex flex-col items-start gap-3 rounded-[18px] border border-bg/10 bg-[#3A2D26] p-3 transition-transform duration-300 hover:-translate-y-0.5 dark:border-night/10 dark:bg-bg sm:flex-row sm:gap-4 sm:rounded-[24px] sm:p-5 md:p-6">
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-current sm:mt-0.5 sm:h-11 sm:w-11 ${accentText}`}
                    >
                      <BadgeIcon />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold leading-snug sm:text-lg">
                        {c.title}
                      </h3>
                      {c.issuer && (
                        <p className="mt-1 text-xs text-bg/70 dark:text-night/70 sm:text-base">
                          {c.issuer}
                        </p>
                      )}
                      {c.date && (
                        <p className={`mt-1 text-xs font-medium sm:text-sm ${accentText}`}>
                          {c.date}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: education timeline */}
        <div className="min-w-0">
          <Reveal>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl">
              Education
            </h2>
          </Reveal>

          <ol className="relative mt-6 space-y-6 border-l border-bg/20 pl-5 dark:border-night/20 sm:mt-10 sm:space-y-10 sm:pl-8">
            {EDUCATION.map((e, i) => (
              <li key={e.title} className="relative">
               
                <span
                  className={`absolute -left-[28px] top-0.5 rounded-full bg-[#2B211C] py-1 dark:bg-surface sm:-left-[41px] sm:top-1 ${accentText}`}
                >
                  <SparkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>

                <Reveal delay={i * 0.12}>
                  <p className={`font-heading text-lg sm:text-2xl ${accentText}`}>
                    {e.period}
                  </p>
                  <h3 className="mt-1 text-base font-semibold leading-snug sm:text-xl">
                    {e.title}
                  </h3>
                  <p className="mt-1 text-sm text-bg/70 dark:text-night/70 sm:text-base">
                    {e.place}
                  </p>
                  <p className={`mt-1 text-sm font-medium sm:text-base ${accentText}`}>
                    {e.grade}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Education