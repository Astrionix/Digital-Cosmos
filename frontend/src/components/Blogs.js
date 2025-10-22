import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ExternalLink } from 'lucide-react';

const Blogs = ({ blogs }) => {
  if (!blogs || !blogs.blogs || !Array.isArray(blogs.blogs)) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Blog <span className="text-neon-blue">Articles</span>
          </h2>
          <p className="text-xl text-gray-400">Loading blogs data...</p>
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
              Blog <span className="text-neon-blue">Articles</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Sharing insights and knowledge about technology, AI, and development
            </p>
          </motion.div>

          {/* Featured Blog */}
          {blogs.blogs.find(blog => blog.featured) && (
            <motion.div
              variants={itemVariants}
              className="glass-effect border border-neon-blue/30 rounded-2xl p-8"
            >
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue border border-neon-blue/30 rounded-full text-sm font-medium">
                  Featured
                </span>
              </div>
              {(() => {
                const featuredBlog = blogs.blogs.find(blog => blog.featured);
                return (
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-4">{featuredBlog.title}</h3>
                      <p className="text-gray-300 leading-relaxed mb-6">{featuredBlog.excerpt}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-400 mb-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(featuredBlog.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{featuredBlog.read_time}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featuredBlog.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <motion.a
                        href={featuredBlog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300"
                      >
                        <span>Read Full Article</span>
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 flex items-center justify-center">
                        <BookOpen className="w-24 h-24 text-neon-blue" />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* All Blogs Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group glass-effect border border-white/10 rounded-2xl overflow-hidden hover:border-neon-blue/30 transition-all duration-300"
              >
                {/* Blog Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(blog.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{blog.read_time}</span>
                        </div>
                      </div>
                    </div>
                    {blog.featured && (
                      <div className="w-3 h-3 rounded-full bg-cosmic-gold animate-pulse" />
                    )}
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Tags */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 hover:border-neon-purple/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400">
                        +{blog.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Read More */}
                <div className="p-6">
                  <motion.a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center space-x-2 w-full bg-white/5 border border-white/10 rounded-lg py-3 text-gray-300 hover:text-white hover:border-neon-blue/30 transition-all duration-300"
                  >
                    <span className="font-medium">Read Article</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
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
                Stay Updated
              </h3>
              <p className="text-gray-300 mb-6">
                Follow my blog for the latest insights on machine learning, web development, 
                and technology trends. New articles published regularly!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-neon-blue to-neon-purple text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300"
              >
                Follow Blog
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blogs;
