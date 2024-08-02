import Image from "next/image";

export default function Features() {
  return (
    <>
      <section className="mt-20 mb-40">
        <span className="text-5xl  text-gray-800 flex justify-center md:justify-start mx-40">
          What Do We Offer?
        </span>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 mt-20">
          <div className="flex justify-center items-center w-60 h-48 rounded-2xl text-white font-semibold text-lg mx-20 bg-red-gradient">
            <p className="text-center mx-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit1 Lorem
              ipsum dolor sit amet.
            </p>
          </div>

          <div className="flex justify-center items-center w-60 h-48 rounded-2xl text-white font-semibold text-lg mx-20 bg-blue-gradient">
            <p className="text-center mx-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit3 Lorem
              ipsum dolor sit amet.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center mt-10 space-y-10 md:space-y-0">
          <div className="flex justify-center items-center w-60 h-48 rounded-2xl text-white font-semibold text-lg mx-4 md:mx-28 bg-orange-gradient">
            <p className="text-center mx-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit3 Lorem
              ipsum dolor sit amet.
            </p>
          </div>

          <div className="flex justify-center items-center w-72 h-80 bg-cover bg-center hidden md:block">
            <Image
              className="object-cover rounded-2xl mt-24"
              src="/Images/laptop-girl.jpg"
              alt="Description"
              layout="responsive"
              width={100}
              height={100}
            />
          </div>
          <div className="flex justify-center items-center w-60 h-48 rounded-2xl text-white font-semibold text-lg mx-4 md:mx-28 bg-purple-gradient">
            <p className="text-center mx-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit4 Lorem
              ipsum dolor sit amet.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
