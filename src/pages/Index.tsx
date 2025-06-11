
import { Palette, MessageCircle } from 'lucide-react';

const Index = () => {
  const handleDesignerClick = () => {
    window.location.href = 'https://id-preview--9c55cb82-eec6-4de1-8329-5ca26d2f6e8d.lovable.app/auth';
  };

  const handleClientClick = () => {
    window.location.href = 'https://preview--section-edit-whisper.lovable.app/auth';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300/15 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            🌟 Welcome to Smart Sections Hub
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light">
            Choose your role to get started
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Designer Card */}
          <div
            onClick={handleDesignerClick}
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="bg-white/25 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl hover:bg-white/30 transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  I'm a Designer
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  I deliver section edits and respond to client feedback.
                </p>
              </div>
              <div className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 border border-white/30">
                Get Started →
              </div>
            </div>
          </div>

          {/* Client Card */}
          <div
            onClick={handleClientClick}
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="bg-white/25 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl hover:bg-white/30 transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  I'm a Client
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  I request changes and check designer replies.
                </p>
              </div>
              <div className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 border border-white/30">
                Get Started →
              </div>
            </div>
          </div>
        </div>

        {/* Subtle footer text */}
        <div className="mt-16">
          <p className="text-white/60 text-sm">
            Click on your role to continue to the authentication page
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
