"use client";
import { useEffect, useRef } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      content:
        "Career Op has transformed how I approach my professional development. The platform's insights and guidance have been invaluable.",
      author: "Leslie Alexander",
      role: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      content:
        "The personalized career roadmap feature helped me identify and achieve my professional goals with clarity and confidence.",
      author: "Jacob Jones",
      role: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      content:
        "An exceptional platform that combines cutting-edge technology with practical career development solutions.",
      author: "Emily Watson",
      role: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      content:
        "Such an intuitive platform! It helped me plan my next career move seamlessly and efficiently.",
      author: "Michael Lee",
      role: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
          Trusted by thousands of professionals worldwide
        </h2>
        <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl">
          Join our community of successful professionals who have accelerated
          their careers with our platform
        </p>
      </div>

      {/* Scrolling Container */}
      <div className="mt-16 relative w-full overflow-hidden">
        <div className="flex gap-8 animate-scroll">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-white p-6 shadow-xl shadow-gray-900/10 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-900/20 hover:-translate-y-1 w-[320px] flex-shrink-0"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                  <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                  <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                </div>

                <blockquote className="text-lg font-medium leading-8 text-gray-900">
                  {testimonial.content}
                </blockquote>

                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/70 to-indigo-500/0"></div>
            </div>
          ))}
        </div>
      </div>

      {/* View More Testimonials Button */}
      <div className="mt-16 flex justify-center">
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-200 transition-all duration-300 hover:ring-indigo-600 hover:bg-indigo-50"
        >
          View more testimonials
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </a>
      </div>

      {/* Tailwind CSS Keyframes */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
