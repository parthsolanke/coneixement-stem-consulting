"use client"
import { useEffect, useState } from "react";
import Image from "next/image";

const NavLink = ({ href, children, isHighlighted = false }) => (
  <a
    href={href}
    className={`
      relative py-2 px-3 text-lg font-semibold transition-all duration-300
      ${isHighlighted 
        ? 'text-orange-400 hover:text-orange-600' 
        : 'text-gray-700 hover:text-blue-600'
      }
      after:content-[''] after:absolute after:w-0 after:h-0.5 
      after:left-0 after:bottom-0 after:bg-current
      after:transition-all after:duration-300
      hover:after:w-full
    `}
  >
    {children}
  </a>
);

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY || window.scrollY < 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
        setIsMenuOpen(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-[100] 
        bg-white/80 backdrop-blur-lg shadow-sm
        transition-all duration-300 ease-in-out
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        z-50
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with Image */}
          <a href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="relative w-20 h-20">
              <Image
                src="/images/logo.png"
                alt="Coneixement Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
              bg-clip-text text-transparent">
              Coneixement
            </span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-gray-100 
              transition-colors duration-200 focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="https://entechonline.com/" isHighlighted>Explore</NavLink>
            <NavLink href="#">Blogs</NavLink>
            <NavLink href="#">About Us</NavLink>
            <NavLink href="#">Contact</NavLink>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg
            shadow-lg transition-all duration-300 ease-in-out overflow-hidden
            ${isMenuOpen ? "max-h-96 border-t" : "max-h-0"}
          `}
        >
          <div className="px-4 py-3 space-y-3">
            <NavLink href="/">Home</NavLink>
            <NavLink href="https://entechonline.com/" isHighlighted>Explore</NavLink>
            <NavLink href="#">Blogs</NavLink>
            <NavLink href="#">About Us</NavLink>
            <NavLink href="#">Contact</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
