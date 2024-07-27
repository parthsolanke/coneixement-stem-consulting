import Image from 'next/image';

export default function Hero() {
  return (
    <div className="grid grid-cols-10 items-center p-8 rounded-lg shadow-md bg-slate-100">
      <div className="col-span-10 md:col-span-7">
        <p className="text-4xl ms-12 text-gray-900 font-sans tracking-wide font-normal">
          Find your Perfect STEM Career Path and turn your Passion into your Profession !
        </p>
        <button className="ms-12 mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none">
          START →
        </button>
      </div>
      <div className="hidden md:block col-span-3 ml-8">
        <Image
          src="/images/scolar-girl.jpg"
          alt="Graduate"
          width={300}
          height={300}
          className="rounded-2xl"
        />
      </div>
    </div>
  );
}
