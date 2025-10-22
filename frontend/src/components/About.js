import React from 'react';
import { motion } from 'framer-motion';
import { User, Target, MapPin, Mail, Phone, Linkedin, Github } from 'lucide-react';

const About = ({ profile, data }) => {
  
  if (!profile) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-white mb-4">
              About <span className="text-neon-blue">Rama Chandra</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {profile.tagline}
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Profile Card */}
            <motion.div
              variants={itemVariants}
              className="glass-effect border border-neon-blue/30 rounded-2xl p-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{profile.name}</h3>
                  <p className="text-neon-blue font-medium">{profile.title}</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                {profile.bio}
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-neon-blue" />
                  <span className="text-gray-300">{profile.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-neon-purple" />
                  <span className="text-gray-300">{profile.availability}</span>
                </div>
              </div>
            </motion.div>

            {/* Vision & Interests */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Vision */}
              <div className="glass-effect border border-neon-purple/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Target className="w-6 h-6 text-neon-purple mr-3" />
                  Vision
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {profile.vision}
                </p>
              </div>

              {/* Interests */}
              <div className="glass-effect border border-neon-pink/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="text-neon-pink mr-3">✨</span>
                  Areas of Interest
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {profile.interests.map((interest, index) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center"
                    >
                      <span className="text-gray-300 font-medium">{interest}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="glass-effect border border-cosmic-gold/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Get in Touch
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {profile.contact && (
                <>
                  <motion.a
                    href={`mailto:${profile.contact.email}`}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-neon-blue/30 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5 text-neon-blue" />
                    <span className="text-gray-300">{profile.contact.email}</span>
                  </motion.a>

                  <motion.a
                    href={`tel:${profile.contact.phone}`}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-neon-purple/30 transition-all duration-300"
                  >
                    <Phone className="w-5 h-5 text-neon-purple" />
                    <span className="text-gray-300">{profile.contact.phone}</span>
                  </motion.a>

                  <motion.a
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-neon-pink/30 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5 text-neon-pink" />
                    <span className="text-gray-300">LinkedIn</span>
                  </motion.a>

                  <motion.a
                    href={profile.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cosmic-gold/30 transition-all duration-300"
                  >
                    <Github className="w-5 h-5 text-cosmic-gold" />
                    <span className="text-gray-300">GitHub</span>
                  </motion.a>
                </>
              )}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default About;
