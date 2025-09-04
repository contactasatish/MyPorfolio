import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Download, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/mock';

const Contact = () => {
  const { personal } = portfolioData;

  const contactInfo = [
    {
      icon: <Mail className="text-blue-600" size={20} />,
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`
    },
    {
      icon: <Phone className="text-green-600" size={20} />,
      label: "Phone",
      value: personal.phone,
      href: `tel:${personal.phone}`
    },
    {
      icon: <MapPin className="text-purple-600" size={20} />,
      label: "Location", 
      value: personal.location,
      href: "#"
    },
    {
      icon: <Linkedin className="text-blue-700" size={20} />,
      label: "LinkedIn",
      value: "Connect on LinkedIn",
      href: `https://${personal.linkedin}`
    }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Ready to drive your next digital transformation initiative? Let's discuss how we can work together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                I'm always interested in discussing new opportunities, innovative projects, 
                and ways to drive digital transformation. Whether you're looking for product management expertise, 
                technical leadership, or strategic guidance, let's connect.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all duration-300 hover:scale-105 group"
                  target={info.label === "LinkedIn" ? "_blank" : "_self"}
                  rel={info.label === "LinkedIn" ? "noopener noreferrer" : ""}
                >
                  <div className="flex-shrink-0 mr-4">
                    {info.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm text-slate-400 font-medium">
                      {info.label}
                    </div>
                    <div className="text-white group-hover:text-blue-400 transition-colors">
                      {info.value}
                    </div>
                  </div>
                  {info.label === "LinkedIn" && (
                    <ExternalLink size={16} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                  )}
                </a>
              ))}
            </div>

            {/* Availability Status */}
            <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-green-400 font-medium">Available for New Opportunities</span>
              </div>
              <p className="text-green-300 text-sm mt-2">
                Open to remote/hybrid positions with up to 25% travel
              </p>
            </div>
          </div>

          {/* Right Column - CTA and Quick Actions */}
          <div className="space-y-8">
            <div className="bg-slate-800 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Quick Actions</h3>
              
              <div className="space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center group">
                  <Download size={20} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Download Resume</span>
                </button>
                
                <a 
                  href={`mailto:${personal.email}?subject=Let's Discuss a Project Opportunity`}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center group block text-center"
                >
                  <Mail size={20} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Send Email</span>
                </a>
                
                <a 
                  href={`https://${personal.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center group block text-center"
                >
                  <Linkedin size={20} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Connect on LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-slate-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Areas of Expertise</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  "Digital Transformation",
                  "Product Management", 
                  "SaaS Implementation",
                  "Machine Learning",
                  "Big Data Analytics",
                  "Agile/Scrum",
                  "Compliance Management",
                  "Cross-functional Leadership"
                ].map((specialty, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-slate-300">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;