"use client"
import { useEffect, useState } from "react";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) setShowNavbar(true);
      else setShowNavbar(false);
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-slate-100 border-b border-gray-100 fixed top-0 left-0 w-full z-50 shadow-sm transition-transform duration-300 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/"
          className="text-3xl font-semibold text-gray-800 my-5 transition-colors duration-300 ease-in-out hover:text-blue-600"
        >
          Coneixement
        </a>
        <input type="checkbox" id="menu-toggle" className="hidden peer" />
        <label htmlFor="menu-toggle" className="md:hidden cursor-pointer my-5">
          <svg
            className="w-6 h-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="blue"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </label>
        <div className="hidden w-full md:block md:w-auto peer-checked:flex flex-row justify-end mr-5">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 w-full">
            <li>
              <a
                href="/"
                className="md:block py-2 px-3 md:my-5 text-gray-800 rounded md:bg-transparent hover:bg-gray-100 md:hover:bg-transparent md:border-0 sm:hover:text-blue-700 md:p-0 font-semibold hidden text-2xl md:text-lg transition-all duration-300 ease-in-out"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:my-5 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 sm:hover:text-blue-700 md:p-0 font-semibold text-2xl md:text-lg transition-all duration-300 ease-in-out"
              >
                Blogs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:my-5 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 sm:hover:text-blue-700 md:p-0 font-semibold text-2xl md:text-lg transition-all duration-300 ease-in-out"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:my-5 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 sm:hover:text-blue-700 md:p-0 font-semibold text-2xl md:text-lg transition-all duration-300 ease-in-out"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
