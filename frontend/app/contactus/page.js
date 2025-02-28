"use client";
import { useState, useEffect } from "react";
import Button from "../Components/Button";
import Navbar from "../Components/Navbar";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, message: "", error: false });
  const [isLottieLoaded, setIsLottieLoaded] = useState(false);

  useEffect(() => {
    if (!document.querySelector('script[src*="dotlottie-player"]')) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
      script.type = "module";
      script.onload = () => setIsLottieLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsLottieLoaded(true);
    }

    return () => {
      setIsLottieLoaded(false);
    };
  }, []);

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus(prev => ({ ...prev, message: "" }));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status.message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", error: false });
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus({ loading: false, message: "Message sent successfully!", error: false });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ loading: false, message: data.message, error: true });
      }
    } catch (error) {
      setStatus({ loading: false, message: "Failed to send message. Please try again.", error: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-24 pb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
          Have questions or feedback? We'd love to hear from you. Reach out and let's start a conversation!
        </p>

        <div className="w-[250px] h-[250px] flex items-center justify-center">
          {!isLottieLoaded ? (
            <div className="animate-pulse bg-gray-200 rounded-full w-32 h-32"></div>
          ) : (
            <dotlottie-player
              src="https://lottie.host/2ac2d272-c9b4-499d-8f54-d91cb9c0e4c2/ONnHqbVcfd.lottie"
              background="transparent"
              speed="1"
              style={{ width: "250px", height: "250px" }}
              loop
              autoplay
              loading="lazy"
              class="transform transition-opacity duration-300 ease-in-out"
            ></dotlottie-player>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg mt-8 space-y-6 animate-fadeIn"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-4 rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-4 rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="w-full p-4 rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          ></textarea>
          
          {status.message && (
            <div 
              className={`p-4 rounded-xl transition-opacity duration-500 ${
                status.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}
              role="alert"
            >
              {status.message}
            </div>
          )}
          
          <Button
            display={status.loading ? "Sending..." : "Send Message"}
            type="normal"
            extra={`w-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
              status.loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={status.loading}
          />
        </form>
      </div>
    </div>
  );
}