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
      <main className="flex-grow">
        <section id="hero" className="relative min-h-[calc(100vh-6rem)] flex items-center">
          <Hero />
        </section>
        
        <section id="features" className="py-24">
          <Features />
        </section>
        
        <section id="testimonials" className="bg-gray-50 py-24">
          <Testimonials />
        </section>
        
        <section id="faqs" className="bg-gray-50 py-20">
          <Faqs />
        </section>
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
