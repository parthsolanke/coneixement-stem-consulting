import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import Typewriter from "./TypingEffect";

export default function Hero() {
  return (
    <section className="min-h-screen">
      <div className="relative min-h-full overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center p-4 sm:p-8 md:p-16 max-w-7xl mx-auto min-h-screen pt-24 sm:pt-28 md:pt-16">  {/* Increased pt-16 to pt-24 */}
          <div className="col-span-12 md:col-span-7 space-y-4 md:space-y-6 animate-fadeIn">

            {/* Main heading with increased height for mobile */}
            <div className="space-y-2 md:space-y-3">
              <div className="h-[150px] sm:h-auto"> {/* Increased height from 120px to 150px */}
                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900">
                  <Typewriter text="Take the first step towards your STEM journey!" />
                </h1>
              </div>
              <p className="font-medium text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mt-2">
                Discover your potential and explore exciting career opportunities in Science, Technology, Engineering, and Mathematics.
              </p>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-center">
              <Link href="/ageSelect">
                <Button 
                  display="START FREE" 
                  type="normal" 
                  extra="w-full sm:w-auto transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                />
              </Link>
              <span className="text-gray-500 text-xs sm:text-sm flex items-center text-center sm:text-left">
                ⭐️ Join 1000+ students who found their path
              </span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 relative pt-8 md:pt-20 flex justify-center md:block">
            <div className="relative z-10 animate-float w-3/4 sm:w-2/3 md:w-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20"></div>
              <Image
                src="/Images/scholar-girl.png"
                alt="Graduate"
                width={400}
                height={400}
                className="rounded-2xl transform hover:scale-105 transition-all duration-300 drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
