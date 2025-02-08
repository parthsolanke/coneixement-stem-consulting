"use client";
import Image from 'next/image';

const FooterLink = ({ href, children }) => (
  <a 
    href={href} 
    className="text-gray-300 hover:text-white transition-colors duration-300 text-base sm:text-sm"
  >
    {children}
  </a>
);

const SocialIcon = ({ href, icon }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-700 
      hover:bg-blue-600 transition-all duration-300 group"
  >
    <i className={`fab fa-${icon} text-xl sm:text-base text-gray-300 group-hover:text-white transition-colors duration-300`}></i>
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto py-8 sm:py-12 px-6 sm:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-12 gap-8">
          {/* Company Info - Full width on mobile */}
          <div className="col-span-2 sm:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full p-2">
                <Image
                  src="/logo.png"
                  alt="Coneixement Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>

              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Coneixement INDIA
              </h1>
            </div>
            <p className="text-gray-400 text-base sm:text-sm">
              Empowering students with data-driven STEM career guidance and personalized educational pathways.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 sm:col-span-2">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-200">Quick Links</h3>
            <nav className="flex flex-col space-y-3 sm:space-y-4">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </nav>
          </div>

          {/* Services */}
          <div className="col-span-1 sm:col-span-2">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-200">Services</h3>
            <nav className="flex flex-col space-y-3 sm:space-y-4">
              <FooterLink href="/career-guidance">Career Guidance</FooterLink>
              <FooterLink href="/stem-analysis">STEM Analysis</FooterLink>
              <FooterLink href="/counseling">Counseling</FooterLink>
              <FooterLink href="/workshops">Workshops</FooterLink>
            </nav>
          </div>

          {/* Contact & Map - Full width on mobile */}
          <div className="col-span-2 sm:col-span-4">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Visit Us</h3>
            <div className="space-y-6 sm:space-y-4">
              <div className="rounded-lg overflow-hidden shadow-lg h-[180px] sm:h-[200px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242118.17006032463!2d73.69815383080004!3d18.524545039677417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295e20bba8f0f%3A0x9432569ab01c7934!2sConeixement%20India!5e0!3m2!1sen!2sus!4v1722621273747!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>

              {/* Social Links - Centered on mobile */}
              <div className="flex justify-center sm:justify-start space-x-6 sm:space-x-4">
                <SocialIcon href="https://facebook.com" icon="facebook-f" />
                <SocialIcon href="https://twitter.com" icon="twitter" />
                <SocialIcon href="https://instagram.com" icon="instagram" />
                <SocialIcon href="https://linkedin.com" icon="linkedin-in" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="container mx-auto py-4 sm:py-6 px-6 sm:px-4 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Coneixement INDIA (OPC) Pvt Ltd. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
    </footer>
  );
}
