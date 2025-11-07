/**
 * Home Section Component
 *
 * Component landing page/hero section
 *
 * Học được từ component này:
 *   - Hero section layout
 *   - Typography với gradient text
 *   - CTA (Call-to-Action) buttons
 *   - Smooth scroll links
 */

import { RevealOnScroll } from "../RevealOnScroll";
import { Button } from "../ui/Button";

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <RevealOnScroll>
        <div className="text-center z-10 px-4">
          {/* Main Heading with Gradient */}
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 
            bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 
            bg-clip-text text-transparent 
            animate-fade-in
            leading-tight"
          >
            Hi, I'm Luong Minh Nhat
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-delayed">
            I'm a full-stack developer who loves crafting clean, scalable web
            applications. My goal is to build solutions that offer both
            exceptional performance and delightful user experiences.
          </p>

          {/* CTA Buttons - Sử dụng Button component */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-more-delayed">
            <Button href="#projects" variant="primary">
              View Projects
            </Button>

            <Button href="#about" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
