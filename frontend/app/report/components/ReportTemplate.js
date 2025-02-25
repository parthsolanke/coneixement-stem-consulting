import { SectionHeading, InfoTag, SectionCard } from './CommonComponents';
import TraitVisualization from './TraitVisualization';

const ReportTemplate = ({ 
  reportRef,
  reportData, 
  traitWeights,
  strengths,
  weaknesses
}) => {
  return (
    <div ref={reportRef} className="w-full max-w-6xl space-y-6 md:space-y-8 mb-20 md:mb-24">
      {/* Header Section */}
      <SectionCard className="relative overflow-hidden print-section" id="section-header">
        <div className="hidden print:block text-center mb-8">
          <img src="/logo.png" alt="Logo" className="h-16 mx-auto mb-4" />
        </div>
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent px-2">
            Your STEM Profile Analysis
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Based on your responses, we've created a comprehensive analysis of your STEM traits and potential career paths.
            This report will help guide your educational and career decisions.
          </p>
        </div>

        {/* Profile Overview */}
        <div className="mb-12">
          <SectionHeading 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>}
            title={reportData.profile_overview.title}
          />
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{reportData.profile_overview.description}</p>
            <div className="flex flex-wrap gap-3">
              {reportData.profile_overview.key_characteristics.map((char, index) => (
                <InfoTag key={index} color="blue">{char}</InfoTag>
              ))}
            </div>
          </div>
        </div>

        {/* Trait Analysis */}
        <TraitVisualization traitWeights={traitWeights} />
      </SectionCard>

      {/* Strengths and Growth Areas */}
      <SectionCard>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-green-800 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Your Strengths
            </h2>
            <ul className="space-y-2">
              {strengths.map(trait => (
                <li key={trait} className="text-green-700 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {trait}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-orange-800 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Growth Areas
            </h2>
            <ul className="space-y-2">
              {weaknesses.map(trait => (
                <li key={trait} className="text-orange-700 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  {trait}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* Academic & Career Section */}
      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <SectionCard className="h-full">
            <SectionHeading 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>}
              title={reportData.strength_academic_mapping.title}
            />
            {/* Academic Mappings */}
            <div className="space-y-6">
              {reportData.strength_academic_mapping.mappings.map((mapping, index) => (
                <div key={index} className="p-6 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100">
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">{mapping.strength}</h3>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {mapping.academic_fields.map((field, i) => (
                        <span key={i} className="px-3 py-1 bg-white/50 rounded-full text-sm font-medium text-purple-700">
                          {field}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700">{mapping.potential_applications}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Career Paths */}
        <div className="md:col-span-3">
          <SectionCard className="h-full">
            <SectionHeading 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>}
              title={reportData.career_exploration.title}
            />
            <div className="grid md:grid-cols-2 gap-6">
              {reportData.career_exploration.paths.map((path, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">{path.field}</h3>
                  <p className="text-gray-700 mb-3">{path.why_consider}</p>
                  <h4 className="font-medium mb-2">Required Skills:</h4>
                  <ul className="list-disc list-inside text-gray-600 mb-3">
                    {path.required_skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                  <p className="text-gray-700">
                    <span className="font-medium">Growth: </span>
                    {path.growth_potential}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Reflection Questions */}
      <SectionCard className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
        <SectionHeading 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>}
          title={reportData.reflection_questions.title}
        />
        <div className="grid md:grid-cols-2 gap-6">
          {reportData.reflection_questions.questions.map((question, index) => (
            <div key={index} className="p-6 bg-white/80 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-800 rounded-full font-bold">
                  {index + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{question}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default ReportTemplate;
