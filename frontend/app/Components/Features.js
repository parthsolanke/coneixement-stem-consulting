import Image from "next/image";

export default function Features() {
  return (
    <>
      <section className="mt-10 mb-10">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj flex justify-center">
          What Do We Offer?
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 mt-10">
          <div className="md:w-60 h-48 rounded-2xl text-white font-semibold text-lg bg-red-gradient shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl flex justify-center items-center mx-10 md:mx-20">
            <p className="text-center mx-4">
              Combined aptitude and personal assessments for understanding the student's abilities and interests.
            </p>
          </div>

          <div className="md:w-60 h-48 rounded-2xl text-white font-semibold text-lg bg-blue-gradient shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl flex justify-center items-center mx-10 md:mx-20">
            <p className="text-center mx-4">
              Providing informative articles, tips, and resources on STEM topics and career development.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center mt-10 space-y-10 md:space-y-0">
          <div className="md:w-60 h-48 rounded-2xl text-white font-semibold text-lg bg-orange-gradient shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl flex justify-center items-center mx-10 md:mx-28">
            <p className="text-center mx-4">
              Detailed analysis of scores, strengths, weaknesses, and suggested careers.
            </p>
          </div>

          <div className="md:w-72 h-80 hidden md:block">
            <Image
              className="object-cover rounded-2xl mt-24"
              src="/Images/laptop-girl.jpg"
              alt="Description"
              layout="responsive"
              width={100}
              height={100}
            />
          </div>

          <div className="md:w-60 h-48 rounded-2xl text-white font-semibold text-lg bg-purple-gradient shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl flex justify-center items-center mx-10 md:mx-28">
            <p className="text-center mx-4">
              Empowering students to make informed decisions about their career paths based on their strengths.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
