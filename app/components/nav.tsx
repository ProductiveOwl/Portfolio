'use client'

import Link from 'next/link'
import { useState } from 'react'

const navItems = {
  '/': { name: 'About' },
  '/#skills': { name: 'Skills' },
  '/experience': { name: 'Experience' },
  '/projects': { name: 'Projects' },
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="sticky top-0 z-50 w-full">
      <nav
        className="
          bg-white/10
          backdrop-blur-lg
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
              <img
                src="/images/MyLogo.svg"
                alt="My Logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Hamburger (mobile only) */}
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

          {/* Desktop Nav Items */}
          <div className="hidden sm:flex space-x-4 justify-center flex-1">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                className="hover:text-white text-sm font-medium transition"
              >
                {name}
              </Link>
            ))}
          </div>

          {/* GitHub Icon (desktop only) */}
          <div className="flex-shrink-0 hidden sm:flex">
            <Link
              href="https://github.com/ProductiveOwl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/gitHubLogo.svg"
                alt="GitHub"
                className="h-6 w-auto"
              />
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="sm:hidden mt-2 flex flex-col space-y-2">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                className="block px-2 py-1 text-white hover:bg-white/20 rounded"
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </Link>
            ))}

            <Link
              href="https://github.com/ProductiveOwl"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-2 py-1 text-white hover:bg-white/20 rounded"
            >
              GitHub
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
}