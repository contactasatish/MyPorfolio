import React from 'react';
import { Mail, Phone, Linkedin, Heart } from 'lucide-react';
import { portfolioData } from '../data/mock';

const Footer = () => {
  const { personal } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{personal.name}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              IT Analyst & Product Manager specializing in digital transformation 
              and cross-functional leadership with 15+ years of experience.
            </p>
            <div className="flex space-x-4">
              <a 
                href={`mailto:${personal.email}`}
                className="text-slate-400 hover:text-blue-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href={`tel:${personal.phone}`}
                className="text-slate-400 hover:text-green-400 transition-colors"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
              <a 
                href={`https://${personal.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="space-y-2">
              {[
                { name: "About", href: "#about" },
                { name: "Skills", href: "#skills" },
                { name: "Experience", href: "#experience" },
                { name: "Projects", href: "#projects" },
                { name: "Contact", href: "#contact" }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-slate-400 hover:text-white transition-colors text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Information</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div>
                <strong className="text-white">Location:</strong><br />
                {personal.location}
              </div>
              <div>
                <strong className="text-white">Email:</strong><br />
                <a href={`mailto:${personal.email}`} className="hover:text-blue-400 transition-colors">
                  {personal.email}
                </a>
              </div>
              <div>
                <strong className="text-white">Phone:</strong><br />
                <a href={`tel:${personal.phone}`} className="hover:text-green-400 transition-colors">
                  {personal.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <span>© {currentYear} {personal.name}. All rights reserved.</span>
              <a 
                href="#admin" 
                className="text-slate-500 hover:text-slate-300 transition-colors text-xs opacity-50 hover:opacity-100"
                title="Administrative Access"
              >
                Admin
              </a>
            </div>
            
            <div className="flex items-center text-sm text-slate-400">
              <span>Made with</span>
              <Heart size={16} className="mx-2 text-red-500" />
              <span>and cutting-edge technology</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;