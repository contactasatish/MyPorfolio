import React from 'react';
import { portfolioData } from '../data/mock';
import { TrendingUp, Users, Award, Target } from 'lucide-react';

const About = () => {
  const { about } = portfolioData;

  const highlights = [
    {
      icon: <TrendingUp className="text-blue-600" size={24} />,
      title: "15+ Years Experience",
      description: "Leading digital transformation initiatives"
    },
    {
      icon: <Award className="text-green-600" size={24} />,
      title: "$10M+ Programs",
      description: "Successfully managed technology programs"
    },
    {
      icon: <Users className="text-purple-600" size={24} />,
      title: "Cross-Functional Leader",
      description: "Expert in stakeholder management"
    },
    {
      icon: <Target className="text-orange-600" size={24} />,
      title: "Business Impact",
      description: "Delivering measurable outcomes"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url(${about.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
            {about.title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Description */}
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              {about.description}
            </p>
            
            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-4">Core Expertise</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                <div>• SaaS Platforms</div>
                <div>• Big Data Analytics</div>
                <div>• Machine Learning</div>
                <div>• Agile/Scrum</div>
                <div>• Digital Transformation</div>
                <div>• Compliance Management</div>
              </div>
            </div>
          </div>

          {/* Right Column - Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  {highlight.icon}
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  {highlight.title}
                </h4>
                <p className="text-slate-600 text-sm">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;