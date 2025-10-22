import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Rocket, Star, ChevronDown } from 'lucide-react';
import TronAssistant from './TronAssistant';

const Hero = ({ profile, data }) => {
  if (!profile) return null;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 nebula-bg">
      {/* 3D Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full opacity-20 floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateZ(${Math.random() * 200 - 100}px)`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.9, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        {/* Orbital Rings */}
        <div className="orbit-ring w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="orbit-ring w-64 h-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="orbit-ring w-32 h-32 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center space-x-3 mb-6"
          >
            <Bot className="w-8 h-8 text-neon-blue" />
            <span className="text-2xl font-inter font-bold text-neon-blue">
              Greetings, Traveler
            </span>
            <Sparkles className="w-8 h-8 text-neon-purple" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-5xl md:text-7xl font-inter font-bold"
          >
            <span className="text-white">I'm </span>
            <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Astrionix
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Your AI guide to{' '}
            <span className="text-neon-blue font-semibold">{profile.name}</span>'s
            <br />
            universe of innovation and technology
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed"
          >
            {profile.bio}
          </motion.p>

          {/* Key Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            {profile.interests.slice(0, 4).map((interest, index) => (
              <motion.div
                key={interest}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 10,
                  rotateX: 5,
                  translateZ: 20
                }}
                className="space-card border border-neon-blue/30 rounded-full px-6 py-3 cursor-pointer"
              >
                <span className="text-neon-blue font-medium">{interest}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            <motion.button
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                translateZ: 20,
                boxShadow: "0 20px 40px rgba(56, 189, 248, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 space-card"
            >
              <Rocket className="w-6 h-6 group-hover:animate-bounce" />
              <span>Explore Projects</span>
            </motion.button>

            <motion.button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: -5,
                translateZ: 20,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-3 space-card border border-neon-purple/30 text-neon-purple px-8 py-4 rounded-lg font-semibold text-lg hover:border-neon-purple/50 transition-all duration-300"
            >
              <Bot className="w-6 h-6 group-hover:animate-pulse" />
              <span>Get in Touch</span>
            </motion.button>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex items-center justify-center space-x-2 text-gray-400 mt-8"
          >
            <Star className="w-5 h-5 text-cosmic-gold" />
            <span>{profile.location}</span>
            <span className="text-gray-600">•</span>
            <span>{profile.availability}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-gray-400 hover:text-neon-blue transition-colors"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* 3D Floating Elements */}
      <motion.div
        animate={{ 
          rotateY: 360,
          rotateX: 20,
          translateZ: [0, 50, 0]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute top-20 right-20 w-32 h-32 border border-neon-blue/20 rounded-full floating-element"
        style={{ transformStyle: 'preserve-3d' }}
      />
      <motion.div
        animate={{ 
          rotateY: -360,
          rotateX: -20,
          translateZ: [0, -30, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute bottom-20 left-20 w-24 h-24 border border-neon-purple/20 rounded-full floating-element"
        style={{ transformStyle: 'preserve-3d' }}
      />

      {/* Tron Assistant Widget - Only on Home Page */}
      <TronAssistant data={data} />
    </div>
  );
};

export default Hero;
