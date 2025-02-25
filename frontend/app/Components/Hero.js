import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import Typewriter from "./TypingEffect";

export default function Hero() {
  return (
    <div className="absolute inset-0 w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 mt-[64px] sm:mt-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center justify-items-center">
            <div className="col-span-12 md:col-span-7 space-y-3 md:space-y-4 animate-fadeIn max-w-3xl">

              <div className="space-y-2">
                <div className="h-[120px] sm:h-auto">
                  <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900">
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

            <div className="col-span-12 md:col-span-5 relative flex justify-center md:justify-start items-center">
              <div className="relative z-10 animate-float w-[280px] sm:w-[320px] md:w-[350px]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20"></div>
                <Image
                  src="/Images/scholar-girl.png"
                  alt="Graduate"
                  width={350}
                  height={350}
                  className="rounded-2xl transform hover:scale-105 transition-all duration-300 drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
