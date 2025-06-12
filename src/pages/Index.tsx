import { Palette, MessageCircle } from 'lucide-react';

const Index = () => {
  const handleDesignerClick = () => {
    window.location.href = 'https://elementor-request-buddy.vercel.app/';
  };

  const handleClientClick = () => {
    window.location.href = 'https://section-edit-whisper.vercel.app/auth';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">
            Welcome to Smart Sections
          </h1>
          <p className="text-base text-gray-600 font-normal">
            Choose your role to continue
          </p>
        </div>

        {/* Role Cards */}
        <div className="space-y-3">
          {/* Designer Card */}
          <div
            onClick={handleDesignerClick}
            className="group cursor-pointer transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-200 flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-sm">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  I'm a Designer
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Deliver section edits and respond to client feedback
                </p>
              </div>
              <div className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Client Card */}
          <div
            onClick={handleClientClick}
            className="group cursor-pointer transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-200 flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-sm">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  I'm a Client
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Request changes and review designer responses
                </p>
              </div>
              <div className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Select your role to access the authentication portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
