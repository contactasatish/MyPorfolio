import React from 'react';
import { portfolioData } from '../data/mock';
import { Code, BarChart3, Cog, Users } from 'lucide-react';

const Skills = () => {
  const { skills } = portfolioData;

  const categoryIcons = {
    "Product Management": <BarChart3 size={24} className="text-blue-600" />,
    "Technical Expertise": <Code size={24} className="text-green-600" />,
    "Business Impact": <Cog size={24} className="text-purple-600" />,
    "Leadership & Collaboration": <Users size={24} className="text-orange-600" />
  };

  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            A comprehensive skillset developed through 15+ years of leading digital transformation initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skills.map((skillCategory, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                {categoryIcons[skillCategory.category]}
                <h3 className="text-xl font-semibold text-slate-900 ml-3">
                  {skillCategory.category}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillCategory.items.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-slate-700 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Proficiency Visual */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-semibold text-slate-900 mb-8 text-center">
            Technology Stack Proficiency
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Salesforce", level: 95 },
              { name: "Python", level: 85 },
              { name: "SQL", level: 90 },
              { name: "Tableau", level: 88 },
              { name: "GCP", level: 82 },
              { name: "Agile/Scrum", level: 92 },
              { name: "Big Data", level: 85 },
              { name: "Machine Learning", level: 78 }
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-3">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="4"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="4"
                      strokeDasharray={`${tech.level * 1.76} 176`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-slate-700">
                      {tech.level}%
                    </span>
                  </div>
                </div>
                <div className="text-sm font-medium text-slate-900">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;