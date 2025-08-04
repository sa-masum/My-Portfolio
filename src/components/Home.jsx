import React from 'react';
import { Download, Github, Linkedin, Mail, MapPin, Twitter } from 'lucide-react';
import { getPersonalInfo } from '../utils/dataLoader';

const Home = () => {
  const personalInfo = getPersonalInfo();

  const socialIcons = {
    github: <Github size={24} />,
    linkedin: <Linkedin size={24} />,
    twitter: <Twitter size={24} />,
    email: <Mail size={24} />
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = personalInfo.resume;
    link.download = `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {personalInfo.name.split(' ')[3]}
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
                {personalInfo.title}
              </h2>
              <p className="text-xl text-gray-600 mb-2">
                {personalInfo.tagline}
              </p>
              <div className="flex items-center justify-center lg:justify-start text-gray-500 mb-6">
                <MapPin size={18} className="mr-2" />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl leading-relaxed">
              {personalInfo.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={handleResumeDownload}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Download size={20} />
                Download Resume
              </button>
              <a
                href="#contact"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-200"
              >
                Get In Touch
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-6">
              {Object.entries(personalInfo.social).map(([platform, url]) => {
                if (!url || url.includes('yourhandle') || url.includes('yourwebsite')) return null;
                
                return (
                  <a
                    key={platform}
                    href={platform === 'email' ? `mailto:${url}` : url}
                    target={platform === 'email' ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all duration-200 p-2 rounded-lg hover:bg-blue-50"
                    aria-label={`Visit ${platform} profile`}
                  >
                    {socialIcons[platform]}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              
              {/* Profile Image Container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100">
                <img
                  src={personalInfo.profilePhoto}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(personalInfo.name)}&size=400&background=3b82f6&color=ffffff&bold=true`;
                  }}
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold animate-bounce">
                🚀
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold animate-bounce delay-1000">
                💻
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;