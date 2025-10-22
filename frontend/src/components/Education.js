import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, FileText } from 'lucide-react';

const Education = ({ education }) => {
  if (!education || !education.education || !Array.isArray(education.education)) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Academic <span className="text-neon-blue">Journey</span>
          </h2>
          <p className="text-xl text-gray-400">Loading education data...</p>
        </div>
      </div>
    );
  }

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
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
              Academic <span className="text-neon-blue">Journey</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Building knowledge through formal education and continuous learning
            </p>
          </motion.div>

          {/* Education Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink" />

            <motion.div
              variants={containerVariants}
              className="space-y-12"
            >
              {education.education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative flex items-start space-x-8"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center border-4 border-space-black">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Education Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 glass-effect border border-white/10 rounded-2xl p-8 hover:border-neon-blue/30 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                        <h4 className="text-xl text-neon-blue font-semibold">{edu.institution}</h4>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 mt-2 md:mt-0">
                        <Calendar className="w-4 h-4" />
                        <span>{edu.duration}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-2 text-gray-400 mb-6">
                      <MapPin className="w-4 h-4" />
                      <span>{edu.location}</span>
                    </div>

                    {/* Coursework */}
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <BookOpen className="w-5 h-5 text-neon-purple mr-2" />
                        Relevant Coursework
                      </h5>
                      <div className="grid md:grid-cols-2 gap-2">
                        {edu.relevant_courses && Array.isArray(edu.relevant_courses) && edu.relevant_courses.map((course, courseIndex) => (
                          <div
                            key={courseIndex}
                            className="flex items-center space-x-3 p-3 bg-white/5 border border-white/10 rounded-lg"
                          >
                            <div className="w-2 h-2 rounded-full bg-neon-blue flex-shrink-0" />
                            <span className="text-gray-300">{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    {edu.achievements && edu.achievements.length > 0 && (
                      <div>
                        <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <Award className="w-5 h-5 text-cosmic-gold mr-2" />
                          Achievements
                        </h5>
                        <ul className="space-y-2">
                          {edu.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 rounded-full bg-cosmic-gold mt-2 flex-shrink-0" />
                              <span className="text-gray-300">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Certifications */}
          {education.certifications && Array.isArray(education.certifications) && education.certifications.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="glass-effect border border-neon-purple/30 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FileText className="w-6 h-6 text-neon-purple mr-3" />
                Professional Certifications
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {education.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-neon-blue/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{cert.name}</h4>
                        <p className="text-neon-blue font-medium">{cert.issuer}</p>
                      </div>
                      <div className="text-sm text-gray-400">{cert.date}</div>
                    </div>
                    <div className="text-xs text-gray-500 font-mono bg-white/5 px-3 py-2 rounded border border-white/10">
                      {cert.credential_id}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Education;
