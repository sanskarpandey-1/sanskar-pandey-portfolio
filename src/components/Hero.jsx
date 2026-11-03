import React, { useEffect, useState } from 'react'
import heroImage from '../assets/hero-image.png'
import HeroText2 from './HeroText2'

const navItem =
  'cursor-pointer hover:text-accent transition-colors duration-300'

const Hero = () => {
  
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      /* storage unavailable: ignore */
    }
  }, [dark])

  return (
    <div className="min-h-screen overflow-x-hidden pb-6 md:pb-8 bg-bg text-text dark:bg-night dark:text-bg transition-colors duration-500">
      {/* ---------- NAV ---------- */}
      <nav className="flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] px-4 md:px-8 py-6 md:py-8 mb-6 md:mb-10 text-base md:text-xl font-bold text-gray-500">
        
        <div className="flex items-center gap-2">
          <a
            href="#top"
            className="text-text dark:text-bg hover:text-accent transition-colors duration-300"
          >
            Sanskar
          </a>
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
            className="h-3.5 w-3.5 rounded-full border-2 border-accent bg-text dark:bg-bg transition-transform duration-300 hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:focus-visible:ring-offset-night"
          />
        </div>

        {/* Links */}
        <div className="flex gap-3 md:gap-8">
          <a href="#about" className={navItem}>About</a>
          <a href="#projects" className={navItem}>Project</a>
          <a href="#contact" className={navItem}>Contact</a>
        </div>

        
        <div className="hidden md:flex md:justify-end">
          <a
            href="#resume"
            className="group inline-flex items-center gap-2 rounded-full border border-text/25 bg-text/5 px-5 py-2 text-lg font-semibold text-text backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent dark:border-bg/30 dark:bg-bg/5 dark:text-bg dark:hover:text-accent"
          >
            Resume
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
          </a>
        </div>
      </nav>

      {/* ---------- HERO CARD ---------- */}
      <div
        id="top"
        className="relative mx-4 md:mx-20 rounded-[40px] md:h-[550px] shadow-[inset_40px_0_60px_rgba(0,0,0,0.3)] dark:shadow-[inset_40px_0_60px_rgba(0,0,0,0.6)]"
      >
        <main className="flex flex-col md:block h-full">
          
          <div className="px-4 pt-4 md:p-0 md:absolute md:left-1 md:bottom-0 md:w-1/2">
            <img
              src={heroImage}
              alt="Sanskar Pandey"
              className="h-[320px] w-full md:h-[600px] md:w-auto object-cover object-top md:object-center rounded-[35px] md:rounded-none md:rounded-bl-[35px]"
            />
          </div>

          
          <div className="px-6 py-8 md:p-0 md:absolute md:left-[55%] md:top-1/2 md:-translate-y-1/2 md:w-[42%]">
            <HeroText2 />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Hero