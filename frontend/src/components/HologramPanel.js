import React from 'react';
import { motion } from 'framer-motion';

const HologramPanel = ({ title, subtitle, icon: Icon, accent = 'from-cyan-500 to-blue-500', delay = 0, children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ delay, duration: 0.8, ease: 'easeOut' }}
    className={`relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-2xl shadow-[0_0_35px_rgba(35,243,255,0.12)] hover:shadow-[0_0_60px_rgba(168,77,255,0.25)] transition-shadow duration-500 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40" />
    <div className="absolute -inset-1 bg-gradient-to-br opacity-25 blur-3xl" style={{ background: 'linear-gradient(135deg, rgba(0,183,255,0.35), rgba(168,77,255,0.28))' }} />
    <div className="relative z-10 p-8 space-y-6">
      {(title || subtitle || Icon) && (
        <div className="flex items-center justify-between">
          <div>
            {title && <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80 mb-2">{title}</p>}
            {subtitle && <h3 className="text-2xl md:text-3xl font-semibold text-white">{subtitle}</h3>}
          </div>
          {Icon && (
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center text-white shadow-[0_0_20px_rgba(35,243,255,0.35)]`}>
              <Icon className="w-6 h-6" />
            </div>
          )}
        </div>
      )}
      <div className="grid gap-6 text-slate-100">
        {children}
      </div>
    </div>
  </motion.div>
);

export default HologramPanel;
