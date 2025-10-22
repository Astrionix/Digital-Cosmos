import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code } from 'lucide-react';

const Projects = ({ projects }) => {
  if (!projects || !projects.projects || !Array.isArray(projects.projects)) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Project <span className="text-neon-blue">Showcase</span>
          </h2>
          <p className="text-xl text-gray-400">Loading projects data...</p>
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
              Project <span className="text-neon-blue">Showcase</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Exploring innovative solutions and cutting-edge technologies
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -20, 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                  translateZ: 30
                }}
                className="group space-card border border-white/10 rounded-2xl overflow-hidden hover:border-neon-blue/30 transition-all duration-300"
              >
                {/* Project Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'Completed' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {project.status}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon-blue/20 text-neon-blue border border-neon-blue/30">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    {project.featured && (
                      <div className="w-3 h-3 rounded-full bg-cosmic-gold animate-pulse" />
                    )}
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="p-6 border-b border-white/10">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
                    <Code className="w-4 h-4 mr-2" />
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 hover:border-neon-purple/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      {project.github_url && (
                        <motion.a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-neon-blue/30 transition-all duration-300"
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-sm">Code</span>
                        </motion.a>
                      )}
                      
                      {project.demo_url && (
                        <motion.a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg hover:opacity-80 transition-opacity"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm">Demo</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <div className="glass-effect border border-neon-purple/30 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Interested in Collaboration?
              </h3>
              <p className="text-gray-300 mb-6">
                I'm always excited to work on new projects and explore innovative solutions. 
                Let's create something amazing together!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-neon-blue to-neon-purple text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300"
              >
                Start a Project
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
