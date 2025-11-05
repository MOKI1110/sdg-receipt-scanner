import React from 'react';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="font-bold text-xl mb-4">SDG Receipt Scanner</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              An AI-powered sustainability tool that empowers consumers to make informed,
              environmentally conscious shopping decisions. Track your carbon footprint,
              discover greener alternatives, and contribute to global climate action.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-green-600 px-3 py-1 rounded text-xs font-medium">
                Carbon Tracking
              </span>
              <span className="bg-blue-600 px-3 py-1 rounded text-xs font-medium">
                AI-Powered
              </span>
              <span className="bg-purple-600 px-3 py-1 rounded text-xs font-medium">
                SDG Aligned
              </span>
            </div>
          </div>

          {/* SDG Alignment */}
          <div>
            <h3 className="font-bold text-lg mb-4">SDG Alignment</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-gray-400">SDG 12: Responsible Consumption & Production</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-gray-400">SDG 13: Climate Action</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-gray-400">SDG 3: Good Health & Well-being</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-gray-400">SDG 2: Zero Hunger</span>
              </li>
            </ul>
          </div>

          {/* Project Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Project Info</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <strong className="text-white">Course:</strong> Sustainable Innovations & Practices
              </li>
              <li>
                <strong className="text-white">Semester:</strong> 7
              </li>
              <li>
                <strong className="text-white">Year:</strong> 2025
              </li>
              <li className="pt-2">
                <a 
                  href="https://sdgs.un.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-green-400 hover:text-green-300 transition"
                >
                  UN SDG Goals <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2">Connect with us:</p>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 SDG Receipt Scanner. Built with 🌱 for a sustainable future.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            For educational purposes • Open source technology • Carbon data sourced from scientific literature
          </p>
        </div>
      </div>
    </footer>
  );
};
