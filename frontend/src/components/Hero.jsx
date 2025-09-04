import React from 'react';
import { ArrowDown, MapPin, Mail, Phone, Linkedin } from 'lucide-react';
import { portfolioData } from '../data/mock';

const Hero = () => {
  const { personal } = portfolioData;

  const scrollToAbout = () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${personal.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) brightness(0.3)'
        }}></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fadeIn">
          {/* Main Content */}
          <h1 className="text-5xl md:text-7xl font-light text-slate-900 mb-6 tracking-tight">
            {personal.name}
          </h1>
          
          <div className="text-xl md:text-2xl text-slate-700 mb-4 font-medium">
            {personal.title}
          </div>
          
          <p className="text-lg text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            {personal.tagline}
          </p>

          {/* Quick Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-600" />
              <span>{personal.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-blue-600" />
              <span>{personal.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-blue-600" />
              <span>{personal.phone}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={scrollToAbout}
              className="px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
            >
              Explore My Work
            </button>
            <a 
              href={`mailto:${personal.email}`}
              className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-300 hover:scale-105 font-medium"
            >
              Let's Connect
            </a>
          </div>

          {/* Scroll Indicator */}
          <button 
            onClick={scrollToAbout}
            className="animate-bounce text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;