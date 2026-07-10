/**
 * ====================================================================
 * Contact Section - Light Parallax + Reveal
 * ====================================================================
 *
 * PARALLAX EFFECTS:
 *   1. Title: parallax nhe (-15)
 *   2. Social links: reveal voi stagger (lien tiep xuat hien)
 *   3. Email CTA: reveal tu duoi, co delay
 *   4. FloatingShapes: minimal decorations
 *
 * TAI SAO CONTACT IT PARALLAX HON?
 *   - Day la section cuoi cung, user da "quen" voi parallax effect
 *   - Qua nhieu effect o day -> phan tan khoi CTA (email button)
 *   - "Less is more" cho conversion sections
 *   - Giu mat tap trung vao hanh dong: lien he
 *
 * ====================================================================
 */

import { RevealOnScroll } from "../RevealOnScroll";
import { SectionTitle } from "../ui/SectionTitle";
import { SocialLink } from "../ui/SocialLink";
import { RainbowButton, Magnetic, AnimatedTooltip } from "../ui/joly";
import { FloatingShapes } from "../ParallaxLayer";
import { useParallax } from "../../hooks/useParallax";

export const Contact = () => {
  const socialLinks = [
    {
      label: "Email",
      href: "mailto:cusocisme@gmail.com",
      tooltip: "cusocisme@gmail.com",
      bgColor: "hover:bg-red-500/20",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      href: "https://github.com/minhnhatluongg",
      tooltip: "@minhnhatluongg",
      bgColor: "hover:bg-gray-500/20",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "https://facebook.com/minhnhatluongne",
      tooltip: "minhnhatluongne",
      bgColor: "hover:bg-blue-600/20",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/mnluonggg_/",
      tooltip: "@mnluonggg_",
      bgColor: "hover:bg-pink-500/20",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  // Title parallax nhe
  const titleRef = useParallax(-15);

  return (
    <section
      id="contact"
      className="min-h-screen flex justify-center items-center py-20 relative overflow-hidden"
    >
      {/* Background decorations - minimal */}
      <FloatingShapes variant="contact" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Section Title voi parallax */}
        <div ref={titleRef} className="will-change-transform">
          <SectionTitle>Get In Touch</SectionTitle>
        </div>

        {/* Description - reveal tu duoi */}
        <RevealOnScroll direction="up" distance={30}>
          <p className="text-center text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            I'm always open to new opportunities, collaborations, or just a
            friendly chat. Feel free to reach out through any of these platforms!
          </p>
        </RevealOnScroll>

        {/* Social Links - moi link reveal voi delay stagger */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {socialLinks.map((social, index) => (
            <RevealOnScroll
              key={index}
              direction="up"
              distance={30}
              delay={index * 0.1}  // 0, 0.1, 0.2, 0.3
            >
              <AnimatedTooltip
                content={social.tooltip}
                placement="top"
                animation="spring"
                className="block w-full"
              >
                <Magnetic intensity={0.25} range={90}>
                  <SocialLink
                    href={social.href}
                    icon={social.icon}
                    label={social.label}
                    bgColor={social.bgColor}
                  />
                </Magnetic>
              </AnimatedTooltip>
            </RevealOnScroll>
          ))}
        </div>

        {/* Email CTA - Joly UI RainbowButton + Magnetic */}
        <RevealOnScroll direction="up" distance={20} delay={0.3}>
          <div className="mt-12 flex justify-center">
            <Magnetic intensity={0.3} range={100}>
              <RainbowButton
                href="mailto:cusocisme@gmail.com"
                duration={3}
                innerClassName="px-8 py-3 text-base"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Send Me an Email
              </RainbowButton>
            </Magnetic>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
