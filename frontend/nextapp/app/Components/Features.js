export default function Features() {
  return (
    <>
      <section className="mt-10 mb-40">

        <span className="text-4xl font-semibold text-gray-800 flex justify-center md:justify-start mx-40">
          What Do We Offer?
        </span>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 mt-20">
        <div className="flex justify-center items-center w-48 h-36 rounded-xl text-white font-semibold text-md mx-24" 
          style={{ background: 'linear-gradient(to left, rgba(255, 0, 0, 0.7), rgba(139, 0, 0, 0.7))' }}>
          <p className="text-center mx-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit1.
          </p>
        </div>

          <div
              className="flex justify-center items-center w-48 h-36 rounded-xl text-white font-semibold text-md mx-24"
              style={{ background: 'linear-gradient(to left, rgba(59, 130, 250, 0.7), rgba(76, 90, 185, 0.7))' }}
              ><p className="text-center mx-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit3.
              </p>
              </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center mt-10 space-y-10 md:space-y-0">
        
      <div
        className="flex justify-center items-center w-48 h-36 rounded-xl text-white font-semibold text-md mx-4 md:mx-28"
        style={{ background: 'linear-gradient(to left, rgba(255, 165, 0, 0.7), rgba(220, 110, 0, 0.7))' }}
        >
      <p className="text-center mx-4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit3.
      </p>
      </div>


          <div className="flex justify-center items-center w-52 h-52 bg-cover bg-center hidden md:block">
            <img
              className="object-cover h-full w-full rounded-2xl mt-20"
              src="./Images/laptop-girl.jpg"
              alt="Description"
            />
          </div>
          <div className="flex justify-center items-center w-48 h-36 rounded-xl text-white font-semibold text-md mx-4 md:mx-28"
            style={{ background: 'linear-gradient(to left, rgba(128, 0, 128, 0.7), rgba(75, 0, 130, 0.7))' }}>
            <p className="text-center mx-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit4.
            </p>
          </div>

        </div>

      </section>
    </>
  );
}
