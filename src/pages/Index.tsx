
import { Palette, MessageCircle } from 'lucide-react';

const Index = () => {
  const handleDesignerClick = () => {
    window.location.href = 'https://id-preview--9c55cb82-eec6-4de1-8329-5ca26d2f6e8d.lovable.app/auth';
  };

  const handleClientClick = () => {
    window.location.href = 'https://preview--section-edit-whisper.lovable.app/auth';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-200/15 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 tracking-tight">
            🌟 Welcome to Smart Sections Hub
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
            Choose your role to get started
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Designer Card */}
          <div
            onClick={handleDesignerClick}
            className="group cursor-pointer transition-all duration-500 hover:scale-105"
          >
            <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl p-10 shadow-2xl hover:shadow-3xl hover:bg-white/50 transition-all duration-500 h-full flex flex-col">
              <div className="flex-1">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Palette className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">
                    I'm a Designer
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed text-center">
                    I deliver section edits and respond to client feedback.
                  </p>
                </div>
              </div>
              <div className="mt-auto">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-center shadow-lg group-hover:shadow-xl">
                  Get Started →
                </div>
              </div>
            </div>
          </div>

          {/* Client Card */}
          <div
            onClick={handleClientClick}
            className="group cursor-pointer transition-all duration-500 hover:scale-105"
          >
            <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl p-10 shadow-2xl hover:shadow-3xl hover:bg-white/50 transition-all duration-500 h-full flex flex-col">
              <div className="flex-1">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">
                    I'm a Client
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed text-center">
                    I request changes and check designer replies.
                  </p>
                </div>
              </div>
              <div className="mt-auto">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-center shadow-lg group-hover:shadow-xl">
                  Get Started →
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <div className="text-center mt-16">
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Click on your role to continue to the authentication page
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
