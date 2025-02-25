import Image from "next/image";

const features = [
  {
    title: "Smart Assessment",
    description: "AI-powered aptitude and personality analysis to understand your unique abilities",
    gradient: "from-violet-500 to-purple-500",
    icon: "📊"
  },
  {
    title: "Learning Resources",
    description: "Curated STEM content, articles, and expert insights for continuous growth",
    gradient: "from-blue-500 to-cyan-500",
    icon: "📚"
  },
  {
    title: "Career Guidance",
    description: "Personalized career paths and recommendations based on your profile",
    gradient: "from-pink-500 to-rose-500",
    icon: "🎯"
  }
];

export default function Features() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <span className="text-purple-600 font-semibold text-sm tracking-wider uppercase">
          Our Features
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          What Makes Us Different?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Comprehensive tools and personalized guidance for your STEM journey
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
            <div className="space-y-4">
              <span className="text-4xl">{feature.icon}</span>
              <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-12">
          <div className="space-y-6 max-w-xl">
            <h3 className="text-3xl font-bold text-gray-900 leading-tight">
              Your Journey to Success Starts Here
            </h3>
            <p className="text-lg text-gray-600">
              Get personalized guidance and make informed decisions about your future in STEM fields.
            </p>
            <ul className="space-y-3">
              {["Personalized Assessment", "Expert Guidance", "Continuous Support"].map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-96 lg:h-[500px]">
            <Image
              src="/vectors/career-growth.svg"
              alt="Career growth illustration"
              layout="fill"
              objectFit="contain"
              className="rounded-xl transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
