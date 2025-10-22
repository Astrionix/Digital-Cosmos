import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Code, GraduationCap, BookOpen, Mail } from 'lucide-react';

const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'blogs', label: 'Blogs', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
];

const Navigation = ({ data }) => {
  const [activeSection, setActiveSection] = useState('home');

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div>
              <h1 className="text-xl font-inter font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Ramachandra Reddy</h1>
              <p className="text-xs text-gray-400">ML Enthusiast & Full-Stack Developer</p>
            </div>
          </motion.div>

          {/* Navigation Items & Tron */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-2">
            <div className="flex space-x-1 overflow-x-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
