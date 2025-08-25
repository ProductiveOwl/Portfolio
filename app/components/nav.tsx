'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const navItems = {
  '/#about': { name: 'About' },
  '/#skills': { name: 'Skills' },
  '/#experiences': { name: 'Experience' },
  '/#projects': { name: 'Projects' },
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('/#about') // default to About

  // Smooth scroll with offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    const targetId = path.replace('/#', '')
    const target = document.getElementById(targetId)
    if (target) {
      const navbarHeight = 60
      const yOffset = target.getBoundingClientRect().top + window.scrollY - navbarHeight
      window.scrollTo({ top: yOffset, behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 60
      let current = '/#about' // fallback so About is active by default
      Object.keys(navItems).forEach((path) => {
        const sectionId = path.replace('/#', '')
        const section = document.getElementById(sectionId)
        if (section) {
          const sectionTop = section.offsetTop - navbarHeight - 50
          const sectionBottom = sectionTop + section.offsetHeight
          if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            current = path
          }
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="sticky top-0 z-50 w-full">
      <nav
        className="
          bg-purple-800
          backdrop-blur-sm
          rounded-b-2xl
          px-4 py-2
          shadow-md
          flex flex-col
        "
      >
        {/* Main nav row */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img src="/images/myLogo.svg" alt="My Logo" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Hamburger */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="text-white"
            >
              {!menuOpen ? (
                <img src="/images/menuIcon.svg" alt="Menu" className="h-6 w-6" />
              ) : (
                <img src="/images/closeIcon.svg" alt="Close" className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex space-x-12 justify-center flex-1">
            {Object.entries(navItems).map(([path, { name }]) => (
              <a
                key={path}
                href={path}
                onClick={(e) => handleNavClick(e, path)}
                className={`
                  hover:text-green-400 hover:font-bold text-lg transition relative
                  ${activeSection === path ? 'text-white font-bold' : 'text-white'}
                `}
              >
                {name}
                {/* Green underline with slide-in animation */}
                <span
                  className={`
                    absolute left-0 -bottom-1 h-0.5 bg-green-400 transition-all duration-300
                    ${activeSection === path ? 'w-full' : 'w-0'}
                  `}
                ></span>
              </a>
            ))}
          </div>

          {/* GitHub */}
          <div className="flex-shrink-0 hidden sm:flex">
            <Link
              href="https://github.com/ProductiveOwl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/gitHubLogo.svg" alt="GitHub" className="h-6 w-auto" />
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="sm:hidden mt-2 flex flex-col space-y-2">
            {Object.entries(navItems).map(([path, { name }]) => (
              <a
                key={path}
                href={path}
                onClick={(e) => handleNavClick(e, path)}
                className={`
                  block px-2 py-1 text-green-400 hover:bg-white/20 rounded
                  ${activeSection === path ? 'text-white font-bold' : 'text-white'}
                `}
              >
                {name}
              </a>
            ))}
            <Link
              href="https://github.com/ProductiveOwl"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-2 py-1 text-white hover:bg-white/20 rounded"
            >
              <img src="/images/gitHubLogo.svg" alt="GitHub" className="h-6 w-auto" />
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
}