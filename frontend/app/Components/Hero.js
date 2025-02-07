import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import Typewriter from "./TypingEffect";

export default function Hero() {
  return (
    <section className="h-screen">
      <div className="relative h-full overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 md:p-16 max-w-7xl mx-auto h-full">
          <div className="col-span-12 md:col-span-7 space-y-8 animate-fadeIn">

            {/* Main heading with fixed dimensions */}
            <div className="space-y-4 min-h-[240px] sm:min-h-[200px] md:min-h-[240px]">
              <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl text-gray-900">
                <Typewriter text="Take the first step towards your STEM journey!" />
              </h1>
              <p className="font-medium text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
                Discover your potential and explore exciting career opportunities in Science, Technology, Engineering, and Mathematics.
              </p>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href="/ageSelect">
                <Button 
                  display="START FREE" 
                  type="normal" 
                  extra="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                />
              </Link>
              <span className="text-gray-500 text-sm flex items-center">
                ⭐️ Join 1000+ students who found their path
              </span>
            </div>
          </div>

          <div className="hidden md:block col-span-5 relative pt-20">
            <div className="relative z-10 animate-float">
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
