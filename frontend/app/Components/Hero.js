import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import Typewriter from "./TypingEffect";

export default function Hero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-center p-8 md:p-16 shadow-md mt-20">
      <div className="col-span-10 md:col-span-7">
        <div className="font-medium text-xl sm:text-2xl md:text-3xl mx-4 sm:mx-8 md:mx-16 mt-4 text-gray-800">
          <Typewriter text=" Take the first step towards your STEM journey!" />
        </div>

        <p className="font-semibold text-sm sm:text-base md:text-lg mx-4 sm: md:mx-16 text-gray-600">
          Click here to start a free career assessment test
          <br />
          <Link href="/ageSelect">
            <Button display="START →" type="normal" extra="mt-3" />
          </Link>
        </p>
      </div>

      {/* Image only visible on medium and larger screens */}
      <div className="hidden md:block col-span-3 flex justify-center">
        <Image
          src="/Images/scholar-girl.png"
          alt="Graduate"
          width={300}
          height={300}
          className="rounded-2xl"
        />
      </div>
    </div>
  );
}
