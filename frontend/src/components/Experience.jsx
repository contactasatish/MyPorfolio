import React from 'react';
import { portfolioData } from '../data/mock';
import { Calendar, MapPin, Building, TrendingUp } from 'lucide-react';

const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            A proven track record of delivering exceptional results across diverse industries
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-slate-200"></div>

          {experience.map((job, index) => (
            <div 
              key={index}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12'
              } md:w-1/2 ml-8`}
            >
              {/* Timeline Dot */}
              <div className="absolute -left-6 md:-left-3 top-6 w-3 h-3 bg-blue-600 rounded-full border-4 border-white shadow-md"></div>
              
              <div className="bg-slate-50 rounded-xl p-8 hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {job.type}
                  </span>
                  <div className="flex items-center text-slate-500 text-sm">
                    <Calendar size={14} className="mr-1" />
                    {job.period}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {job.title}
                </h3>
                
                <div className="flex items-center mb-4 text-slate-600">
                  <Building size={16} className="mr-2 text-blue-600" />
                  <span className="font-medium">{job.company}</span>
                  <MapPin size={14} className="ml-4 mr-1 text-slate-400" />
                  <span className="text-sm">{job.location}</span>
                </div>

                <ul className="space-y-3">
                  {job.achievements.map((achievement, achIndex) => (
                    <li 
                      key={achIndex}
                      className="flex items-start text-slate-700"
                    >
                      <TrendingUp size={16} className="text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Career Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "15+", label: "Years Experience" },
            { number: "$10M+", label: "Programs Managed" },
            { number: "500+", label: "Stakeholders Trained" },
            { number: "95%", label: "Project Success Rate" }
          ].map((stat, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-6">
              <div className="text-3xl font-light text-slate-900 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-slate-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;