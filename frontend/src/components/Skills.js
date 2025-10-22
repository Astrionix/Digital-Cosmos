import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cpu, Wrench, Users } from 'lucide-react';

const Skills = ({ skills }) => {
  if (!skills || !skills.categories || typeof skills.categories !== 'object') {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Skills <span className="text-neon-blue">Constellation</span>
          </h2>
          <p className="text-xl text-gray-400">Loading skills data...</p>
        </div>
      </div>
    );
  }

  const skillIcons = {
    'Programming Languages': Code,
    'Machine Learning': Cpu,
    'Frontend': Code,
    'Frameworks': Wrench,
    'Data Visualization': Database,
    'Soft Skills': Users
  };

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
              Skills <span className="text-neon-blue">Constellation</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A comprehensive overview of technical expertise and capabilities
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {Object.entries(skills.categories).map(([category, data], index) => {
              const Icon = skillIcons[category] || Code;
              const levelColors = {
                'Expert': 'from-red-500 to-pink-500',
                'Advanced': 'from-orange-500 to-red-500',
                'Intermediate': 'from-yellow-500 to-orange-500',
                'Beginner': 'from-green-500 to-yellow-500'
              };

              return (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-effect border border-white/10 rounded-2xl p-8 hover:border-neon-blue/30 transition-all duration-300"
                >
                  {/* Category Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{category}</h3>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${levelColors[data.level] || levelColors['Intermediate']}`} />
                        <span className="text-sm text-gray-400">{data.level}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {data.technologies.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                        className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg hover:border-neon-purple/30 transition-colors"
                      >
                        <span className="text-gray-300 font-medium">{skill}</span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < (data.level === 'Expert' ? 5 : data.level === 'Advanced' ? 4 : data.level === 'Intermediate' ? 3 : 2)
                                  ? 'bg-neon-blue'
                                  : 'bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Skills Summary */}
          <motion.div
            variants={itemVariants}
            className="glass-effect border border-neon-purple/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Technical Proficiency Overview
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(skills.categories).map(([category, data]) => (
                <div key={category} className="text-center">
                  <div className="text-3xl font-bold text-neon-blue mb-2">
                    {data.technologies.length}
                  </div>
                  <div className="text-gray-400 text-sm">{category}</div>
                  <div className="text-xs text-gray-500 mt-1">{data.level}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
