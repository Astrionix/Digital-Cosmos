import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Send, MessageCircle } from 'lucide-react';

const Contact = ({ socials }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  if (!socials) return null;

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
              Get in <span className="text-neon-blue">Touch</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ready to collaborate or have a question? Let's connect and explore possibilities together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="glass-effect border border-neon-blue/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <motion.a
                    href={`mailto:${socials.contact_info.email}`}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-neon-blue/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-neon-blue" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Email</p>
                      <p className="text-gray-400">{socials.contact_info.email}</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href={`tel:${socials.contact_info.phone}`}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-neon-purple/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-neon-purple" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Phone</p>
                      <p className="text-gray-400">{socials.contact_info.phone}</p>
                    </div>
                  </motion.a>

                  <div className="flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-neon-pink/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-neon-pink" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Location</p>
                      <p className="text-gray-400">{socials.contact_info.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-effect border border-neon-purple/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.a
                    href={socials.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-neon-blue/30 transition-all duration-300"
                  >
                    <Linkedin className="w-6 h-6 text-neon-blue" />
                    <span className="text-white font-medium">LinkedIn</span>
                  </motion.a>

                  <motion.a
                    href={socials.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-neon-purple/30 transition-all duration-300"
                  >
                    <Github className="w-6 h-6 text-neon-purple" />
                    <span className="text-white font-medium">GitHub</span>
                  </motion.a>

                  <motion.a
                    href={socials.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-cosmic-gold/30 transition-all duration-300"
                  >
                    <ExternalLink className="w-6 h-6 text-cosmic-gold" />
                    <span className="text-white font-medium">Resume</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="glass-effect border border-neon-pink/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <MessageCircle className="w-6 h-6 text-neon-pink mr-3" />
                  Send a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue/50 transition-colors"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue/50 transition-colors"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue/50 transition-colors"
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue/50 transition-colors resize-none"
                      placeholder="Tell me about your project or question..."
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Availability Status */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <div className="glass-effect border border-cosmic-gold/30 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Current Status
              </h3>
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-green-400 font-semibold">Available for Opportunities</span>
              </div>
              <p className="text-gray-300">
                I'm currently open to new projects, collaborations, and opportunities. 
                Feel free to reach out if you'd like to work together!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

