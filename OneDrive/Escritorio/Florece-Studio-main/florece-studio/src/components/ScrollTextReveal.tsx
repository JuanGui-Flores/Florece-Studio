'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollTextRevealProps {
  phrase?: string;
  subtext?: string;
  children?: ReactNode;
}

export default function ScrollTextReveal({ phrase, subtext, children }: ScrollTextRevealProps) {
  const words = phrase ? phrase.split(' ') : [];

  return (
    <section className="py-32 bg-white text-[#0b3c8a] relative overflow-hidden flex items-center justify-center border-t border-[#0b3c8a]/10">
      <div className="max-w-5xl mx-auto px-6 text-center w-full">
        
        {subtext && (
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono uppercase tracking-widest text-[#0b3c8a]/60 bg-[#0b3c8a]/5 px-3 py-1 rounded-full border border-[#0b3c8a]/15 mb-6 inline-block"
          >
            {subtext}
          </motion.span>
        )}

        {phrase && (
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.2] flex flex-wrap justify-center gap-x-3 gap-y-2">
            {words.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block py-1">
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.06,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className="inline-block text-[#0b3c8a]"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
        )}

        {children}

      </div>
    </section>
  );
}