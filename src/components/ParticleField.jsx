/**
 * ====================================================================
 * ParticleField - Interactive Particle Canvas
 * ====================================================================
 *
 * WHAT:
 *   Canvas ve cac "hat" (particles) bay lơ lửng va phan ung voi chuot.
 *   Khi chuot di chuyen gan, cac hat bi "day" ra xa.
 *   Cac hat gan nhau duoc noi bang duong line mo -> tao "luoi mang".
 *
 * TAI SAO CANVAS THAY VI DOM?
 *   - 100+ particles = 100+ DOM elements = LAG
 *   - Canvas ve truc tiep len GPU, 1 element duy nhat
 *   - 60fps voi 80 particles thoai mai
 *
 * TUONG TAC:
 *   - Di chuot: particles bi repel (day ra) trong ban kinh 100px
 *   - Click: particles bi day MANH hon (burst effect)
 *   - Particles tu dong bay lơ lửng khi khong co chuot
 *
 * ====================================================================
 */

import { useEffect, useRef, useCallback } from "react";

export const ParticleField = ({
  particleCount = 60,        // So luong hat
  connectionDistance = 120,   // Khoang cach de noi 2 hat bang line
  mouseRepelRadius = 100,     // Ban kinh day chuot
  mouseRepelForce = 0.5,      // Luc day chuot
  particleColor = "rgba(59, 130, 246, 0.4)",  // Mau hat (blue-500)
  lineColor = "rgba(59, 130, 246, 0.08)",      // Mau line noi
  speed = 0.3,                // Toc do di chuyen co ban
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });
  const animationRef = useRef(null);

  // Khoi tao particles
  const initParticles = useCallback((width, height) => {
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,  // Van toc x: -0.15 ~ 0.15
        vy: (Math.random() - 0.5) * speed,  // Van toc y: -0.15 ~ 0.15
        size: Math.random() * 2 + 1,         // Kich thuoc: 1 ~ 3px
        opacity: Math.random() * 0.5 + 0.2,  // Do mo: 0.2 ~ 0.7
      });
    }
    return particles;
  }, [particleCount, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Set canvas size = viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-init particles khi resize
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };
    resize();

    // Track mouse
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repel
        if (mouse.isActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRepelRadius) {
            // Luc day ti le nghich voi khoang cach (gan = manh)
            const force = (mouseRepelRadius - dist) / mouseRepelRadius * mouseRepelForce;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Di chuyen
        p.x += p.vx;
        p.y += p.vy;

        // Giam dan van toc (friction) -> dung lai khi khong co luc
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Dam bao van toc toi thieu (luon bay lơ lửng)
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (currentSpeed < speed * 0.3) {
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
        }

        // Wrap around (xuất hiện bên đối diện khi ra khỏi màn hình)
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Ve hat
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor.replace("0.4", String(p.opacity));
        ctx.fill();

        // Ve duong noi giua cac hat gan nhau
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            // Line mo dan khi xa nhau
            const opacity = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor.replace("0.08", String(opacity));
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles, connectionDistance, mouseRepelRadius, mouseRepelForce, particleColor, lineColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  );
};
