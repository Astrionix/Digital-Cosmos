import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Award, Users, Code } from 'lucide-react';

const Experience = ({ experiences }) => {
  if (!experiences || !experiences.experiences || !Array.isArray(experiences.experiences)) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Professional <span className="text-neon-blue">Journey</span>
          </h2>
          <p className="text-xl text-gray-400">Loading experience data...</p>
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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
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
              Professional <span className="text-neon-blue">Journey</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Building experience through internships and hands-on projects
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink" />

            <motion.div
              variants={containerVariants}
              className="space-y-12"
            >
              {experiences.experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className="relative flex items-start space-x-8"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center border-4 border-space-black">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Experience Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 glass-effect border border-white/10 rounded-2xl p-8 hover:border-neon-blue/30 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                        <h4 className="text-xl text-neon-blue font-semibold">{exp.company}</h4>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 mt-2 md:mt-0">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    {/* Location & Type */}
                    <div className="flex items-center space-x-6 mb-6">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="px-3 py-1 bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-full text-sm font-medium">
                        {exp.type}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Award className="w-5 h-5 text-cosmic-gold mr-2" />
                        Key Achievements
                      </h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 rounded-full bg-neon-blue mt-2 flex-shrink-0" />
                            <span className="text-gray-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Code className="w-5 h-5 text-neon-purple mr-2" />
                        Technologies Used
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-neon-blue/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Extracurricular Activities */}
          {experiences.extracurricular && Array.isArray(experiences.extracurricular) && (
            <motion.div
              variants={itemVariants}
              className="glass-effect border border-neon-purple/30 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Users className="w-6 h-6 text-neon-purple mr-3" />
                Extracurricular Activities
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {experiences.extracurricular.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-6"
                  >
                    <h4 className="text-lg font-semibold text-white mb-3">{activity.activity}</h4>
                    <p className="text-gray-300 mb-4">{activity.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {activity.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-neon-blue/20 text-neon-blue border border-neon-blue/30 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
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

export default Experience;
