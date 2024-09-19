import Faqs from "./Components/Faqs";
import Features from "./Components/Features";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Testimonials from "./Components/Testimonials";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero/>
      <Features/>
      <Testimonials/>
      <Faqs/>
      <Footer/>
    </>
  );
}
