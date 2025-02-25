export const SectionHeading = ({ icon, title, className = "" }) => (
  <h2 className={`text-xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800 flex items-center ${className}`}>
    <span className="bg-blue-100 text-blue-800 p-2 rounded-lg mr-2 md:mr-3">
      {icon}
    </span>
    <span className="break-words">{title}</span>
  </h2>
);

export const InfoTag = ({ children, color = "blue" }) => (
  <span className={`px-4 py-2 bg-gradient-to-r from-${color}-50 to-${color}-100 
    text-${color}-800 rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300`}>
    {children}
  </span>
);

export const SectionCard = ({ children, className = "" }) => (
  <div className={`bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}>
    {children}
  </div>
);

export const DownloadButton = ({ onClick, isGenerating }) => (
  <div className="sticky bottom-8 w-full max-w-6xl mx-auto px-6">
    <button
      onClick={onClick}
      disabled={isGenerating}
      className="float-right bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-full 
      shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
    >
      {isGenerating ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          <span>Generating PDF...</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Save as PDF</span>
        </>
      )}
    </button>
  </div>
);

export const Progress = ({ value }) => (
  <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2 mb-4">
    <div 
      className="h-2 rounded-full bg-blue-500 transition-all duration-300 ease-out"
      style={{ width: `${value}%` }}
    />
  </div>
);
