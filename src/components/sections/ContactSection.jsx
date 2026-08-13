/**
 * ====================================================================
 * ContactSection - CTA cuoi trang + footer
 * ====================================================================
 *
 * - Heading serif lon "Let's build something together."
 * - Email CTA pill (mailto) + social icons (GitHub/Facebook/Instagram)
 * - Footer line voi copyright
 *
 * ====================================================================
 */

import { useRef } from "react";
import { motion as Motion, useInView } from "motion/react";
import { Mail } from "lucide-react";
import { FacebookIcon, GithubIcon, InstagramIcon } from "../icons";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/minhnhatluongg",
    Icon: GithubIcon,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/minhnhatluongne",
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mnluonggg_/",
    Icon: InstagramIcon,
  },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-6 pt-28 pb-10 md:pt-40 md:pb-14"
    >
      {/* Radial gradient nhe */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

      <div ref={ref} className="relative mx-auto max-w-4xl text-center">
        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 text-sm uppercase tracking-widest text-white/40"
        >
          Contact
        </Motion.p>

        <Motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Let's build something{" "}
          <span className="font-instrument italic text-white/60">
            together.
          </span>
        </Motion.h2>

        <Motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/50 md:text-base"
        >
          I'm always open to new opportunities, collaborations, or just a
          friendly chat. Feel free to reach out through any of these platforms.
        </Motion.p>

        {/* Email CTA */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <Motion.a
            href="mailto:cusocisme@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="liquid-glass flex items-center gap-3 rounded-full px-8 py-4 text-sm font-medium text-white md:text-base"
          >
            <Mail size={18} />
            cusocisme@gmail.com
          </Motion.a>

          {/* Social icons */}
          <div className="flex justify-center gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
              >
                <social.Icon size={20} />
              </a>
            ))}
          </div>
        </Motion.div>
      </div>

      {/* Footer */}
      <footer className="relative mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-white/10 pt-8 text-xs text-white/30 md:flex-row">
        <p>© 2026 Luong Minh Nhat — kusocisme</p>
        <p>Ho Chi Minh City, Vietnam · Built with React & Tailwind CSS</p>
      </footer>
    </section>
  );
};
