import Image from "next/image";
import Button from "./Button";

export default function Hero() {
  return (
    <div className="grid grid-cols-10 items-center p-16  shadow-md ">
      <div className="col-span-10 md:col-span-7">
        <p className="text-5xl ms-16 text-gray-900 font-sans tracking-wide font-semibold ">
          Find your Perfect STEM Career <br /> Path and turn your Passion <br />{" "}
          into your Profession ! <br />
        </p>
        <p className="font-semibold text-lg mx-16 mt-4 text-gray-800">
          <span >Click here to Start a free Career Assessment test</span>
          <br />
          <Button display="START →" type="normal" extra="mt-3" />
        </p>
      </div>
      <div className="hidden md:block col-span-3 ml-8">
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
