"use client";
import { useState, useEffect } from "react";
import Button from "../Components/Button";
import Navbar from "../Components/Navbar";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-24 pb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
          Have questions or feedback? We'd love to hear from you. Reach out and let's start a conversation!
        </p>

        {/* Lottie Animation */}
        <dotlottie-player
          src="https://lottie.host/2ac2d272-c9b4-499d-8f54-d91cb9c0e4c2/ONnHqbVcfd.lottie"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        ></dotlottie-player>

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
          <Button
            display="Send Message"
            type="normal"
            extra="w-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          />
        </form>
      </div>
    </div>
  );
}
