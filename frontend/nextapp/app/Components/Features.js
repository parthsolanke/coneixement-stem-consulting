export default function Features() {
  return (
    <>
      <section className="mt-10 mb-40">

        <span className="text-4xl font-semibold text-gray-800 flex justify-center md:justify-start mx-40">
          What Do We Offer?
        </span>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 mt-20">
          <div className="flex justify-center items-center w-48 h-36 bg-red-gradient rounded-xl text-white font-semibold text-md mx-24">
            <p className="text-center mx-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
          </div>
          <div className="flex justify-center items-center w-48 h-36 bg-blue-gradient rounded-xl text-white font-semibold text-md mx-24">
            <p className="text-center mx-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center mt-10 space-y-10 md:space-y-0">
          <div className="flex justify-center items-center w-48 h-36 bg-orange-gradient rounded-xl text-white font-semibold text-md mx-4 md:mx-28">
            <p className="text-center mx-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
          </div>
          <div className="flex justify-center items-center w-52 h-52 bg-cover bg-center hidden md:block">
            <img
              className="object-cover h-full w-full rounded-2xl mt-20"
              src="./Images/laptop-girl.jpg"
              alt="Description"
            />
          </div>
          <div className="flex justify-center items-center w-48 h-36 bg-purple-gradient rounded-xl text-white font-semibold text-md mx-4 md:mx-28">
            <p className="text-center mx-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
          </div>
        </div>

      </section>
    </>
  );
}
