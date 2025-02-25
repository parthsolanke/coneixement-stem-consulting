import Faqs from "./Components/Faqs";
import Features from "./Components/Features";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Testimonials from "./Components/Testimonials";
import ErrorBoundary from "./Components/ErrorBoundary";

export default function Page() {
  return (
    <ErrorBoundary>
      <Navbar />
      <main>
        <section id="hero" className="relative w-full h-screen">
          <Hero />
        </section>
        
        <section id="features" className="py-12 sm:py-24 px-4 sm:px-6">
          <Features />
        </section>
        
        <section id="testimonials" className="relative bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <Testimonials />
        </section>
        
        <section id="faqs" className="bg-white py-16 sm:py-24 px-4 sm:px-6">
          <Faqs />
        </section>
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
