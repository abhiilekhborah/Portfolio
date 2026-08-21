import { motion } from 'framer-motion';
import { Mail, GitBranch, Briefcase, Camera, Sword, Flag, ExternalLink, Send } from 'lucide-react';

const CONTACT_LINKS = [
  {
    label: 'EMAIL',
    value: 'abhilekhborah428@email.com',
    href: 'mailto:abhilekhborah428@email.com',
    icon: Mail,
    color: 'bg-neo-accent',
  },
  {
    label: 'GITHUB',
    value: 'github.com/abhilekhborah',
    href: 'https://github.com/abhilekhborah',
    icon: GitBranch,
    color: 'bg-neo-secondary',
  },
  {
    label: 'LINKEDIN',
    value: 'linkedin.com/in/abhilekhborah',
    href: 'https://linkedin.com/in/abhilekhborah',
    icon: Briefcase,
    color: 'bg-neo-muted',
  },
  {
    label: 'LEETCODE',
    value: 'leetcode.com/abhiilekhborah',
    href: 'https://leetcode.com/abhiilekhborah',
    icon: Sword,
    color: 'bg-neo-accent',
  },
  {
    label: 'INSTAGRAM',
    value: 'instagram.com/abhiilekh_borah',
    href: 'https://www.instagram.com/abhiilekh_borah/',
    icon: Camera,
    color: 'bg-neo-muted',
  },
  {
    label: 'CODEFORCES',
    value: 'codeforces.com/abhiilekhborah',
    href: 'https://codeforces.com/profile/abhiilekhborah',
    icon: Flag,
    color: 'bg-neo-secondary',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative bg-black text-white" style={{ zIndex: 1 }}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-neo-accent border-4 border-black p-2" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
              <Send size={20} strokeWidth={3} color="#000" />
            </div>
            <h2 className="section-title mb-0 text-white">GET IN TOUCH</h2>
          </div>
          <p className="section-subtitle mb-0 text-white/50">LET'S CONNECT & BUILD SOMETHING</p>
        </motion.div>

        <div className="max-w-3xl">
          {/* Contact Links */}
          <div className="space-y-3">
            {CONTACT_LINKS.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white text-black border-4 border-black no-underline transition-all duration-100"
                  style={{ boxShadow: '6px 6px 0px 0px #fff' }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{
                    y: -3,
                    boxShadow: '8px 8px 0px 0px #fff',
                  }}
                  whileTap={{
                    y: 0,
                    x: 0,
                    boxShadow: '0px 0px 0px 0px #fff',
                    translateX: 6,
                    translateY: 6,
                  }}
                >
                  {/* Icon */}
                  <div className={`${link.color} border-3 border-black p-2.5`}>
                    <Icon size={18} strokeWidth={3} color="#000" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs uppercase tracking-widest opacity-50">{link.label}</div>
                    <div className="font-bold text-sm uppercase tracking-wider truncate">{link.value}</div>
                  </div>

                  {/* Arrow */}
                  <ExternalLink size={16} strokeWidth={3} className="opacity-40 flex-shrink-0" />
                </motion.a>
              );
            })}
          </div>

          {/* Bottom tagline */}
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div
              className="inline-block neo-badge neo-badge-pill bg-neo-secondary text-black"
              style={{ transform: 'rotate(-1deg)' }}
            >
              OPEN TO OPPORTUNITIES
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
