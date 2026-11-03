import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'


const GITHUB_PROFILE = 'https://github.com/sanskarpandey-1'

const PROJECTS = [
  {
    number: '01',
    kind: 'Full-stack web application',
    title: 'AI Resume Parser & Analyzer',
    description:
      'A full-stack application that parses uploaded PDF resumes and compares them with a job description to generate an ATS match score and actionable analysis.',
    highlights: [
      'Built PDF upload and text-extraction workflows with Express REST APIs',
      'Integrated Gemini API analysis for matching and missing skills, strengths, weaknesses, and suggestions',
      'Secured the Gemini API key on the backend',
      'Created a React dashboard for ATS scores, analysis, and saved reports',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Gemini API'],
    live: '',
    github: GITHUB_PROFILE,
    image: '',
  },
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
      viewport={{ once: true, amount: 0.15 }}
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

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
)

/* --------------------------- Buttons --------------------------- */
const buttonBase =
  'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-base font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface dark:focus-visible:ring-offset-[#211D1A]'

/* ----------------------------- Card ----------------------------- */
const ProjectCard = ({ project, delay }) => (
  <Reveal delay={delay} className="h-full">
    <article className="flex h-full flex-col rounded-[32px] border border-text/10 bg-surface p-6 transition-colors duration-500 dark:border-bg/10 dark:bg-[#211D1A] md:p-8">
      {project.image && (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="mb-6 aspect-[16/10] w-full rounded-2xl object-cover"
        />
      )}

      <div className="flex items-baseline justify-between gap-4">
        <span className="font-heading text-5xl leading-none text-accent">
          {project.number}
        </span>
        <span className="rounded-full border border-text/20 px-3 py-1 text-sm font-medium dark:border-bg/25">
          {project.kind}
        </span>
      </div>

      <h3 className="mt-5 font-heading text-4xl md:text-5xl">{project.title}</h3>

      <p className="mt-4 text-lg leading-relaxed text-text/80 dark:text-bg/80">
        {project.description}
      </p>

      <ul className="mt-6 space-y-3">
        {project.highlights.map((h) => (
          <li key={h} className="flex items-start gap-3 text-base leading-snug">
            <SparkIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-full bg-text/5 px-3 py-1 text-sm font-medium dark:bg-bg/10"
          >
            {t}
          </li>
        ))}
      </ul>

      {/* Buttons stay at the bottom so both cards line up */}
      <div className="mt-auto flex flex-wrap gap-3 pt-8">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonBase} bg-accent text-white hover:bg-[#E8561F]`}
          >
            Live demo
            <ArrowIcon />
          </a>
        )}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonBase} bg-[#24292F] text-white hover:bg-black dark:bg-white dark:text-[#24292F] dark:hover:bg-gray-200`}
        >
          <GitHubIcon />
          GitHub
        </a>
      </div>
    </article>
  </Reveal>
)

/* ---------------------------- Section ---------------------------- */
const Projects = () => {
  return (
    <section
      id="projects"
      className="scroll-mt-4 border-t-4 border-accent bg-bg px-4 py-20 text-text transition-colors duration-500 dark:bg-night dark:text-bg md:px-20 md:py-28"
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <SparkIcon className="h-6 w-6 text-accent" />
          <h2 className="font-heading text-5xl md:text-6xl">Projects</h2>
        </div>
        <p className="mt-4 max-w-2xl text-lg text-text/75 dark:text-bg/75">
          A full-stack AI-powered tool for turning a resume and job description
          into a useful, actionable match analysis.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-1 md:gap-10">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} delay={i * 0.15} />
        ))}
      </div>

      <Reveal className="mt-12 flex justify-center" delay={0.1}>
        <a
          href={GITHUB_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-text/25 bg-text/5 px-6 py-3 text-lg font-semibold backdrop-blur-md transition-all duration-300 hover:border-accent hover:text-accent dark:border-bg/30 dark:bg-bg/5"
        >
          See more on GitHub
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowIcon />
          </span>
        </a>
      </Reveal>
    </section>
  )
}

export default Projects