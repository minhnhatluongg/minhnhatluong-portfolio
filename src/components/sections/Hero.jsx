/**
 * ====================================================================
 * Hero - Fullscreen video + liquid glass navbar + serif heading
 * ====================================================================
 *
 * VIDEO FADE LOGIC (vanilla JS qua refs, KHONG dung CSS transition):
 *   - canplay    -> play() roi animate opacity 0 -> 1 trong 500ms (rAF)
 *   - timeupdate -> khi con <= 0.55s thi fade opacity hien tai -> 0 (500ms)
 *   - ended      -> opacity = 0, doi 100ms, reset currentTime = 0,
 *                   play lai, fade 0 -> 1 (500ms)
 *   => Loop lien mach voi crossfade muot ve mau den giua cac lan phat.
 *   LUU Y: video KHONG co attribute `loop` - can event `ended` de bat.
 *
 * LAYOUT:
 *   - Navbar pill (z-20) trong flow, KHONG fixed
 *   - Hero content (z-10) flex-1, keo len -translate-y-[20%]
 *   - Social icons day duoi (pb-12)
 *
 * ====================================================================
 */

import { useEffect, useRef } from "react";
import { ArrowRight, Code2, Mail } from "lucide-react";
import { GithubIcon, InstagramIcon } from "../icons";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/minhnhatluongg",
    Icon: GithubIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mnluonggg_/",
    Icon: InstagramIcon,
  },
  {
    label: "Email",
    href: "mailto:cusocisme@gmail.com",
    Icon: Mail,
  },
];

export const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    let restartTimeout = 0;
    let started = false;
    let fadingOut = false;

    // Animate video.style.opacity from -> to trong `duration` ms bang rAF
    const animateOpacity = (from, to, duration) => {
      cancelAnimationFrame(raf);
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        video.style.opacity = String(from + (to - from) * t);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const onCanPlay = () => {
      if (started) return;
      started = true;
      video.play().catch(() => {});
      animateOpacity(0, 1, 500);
    };

    const onTimeUpdate = () => {
      if (fadingOut || !video.duration) return;
      // Con <= 0.55s -> bat dau fade ra
      if (video.duration - video.currentTime <= 0.55) {
        fadingOut = true;
        animateOpacity(parseFloat(video.style.opacity || "1"), 0, 500);
      }
    };

    const onEnded = () => {
      // Huy fade-out rAF con dang chay - neu khong no se ghi de opacity
      // len gia tri "0" trong 100ms giu den (ghost frame cuoi)
      cancelAnimationFrame(raf);
      video.style.opacity = "0";
      restartTimeout = setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        fadingOut = false;
        animateOpacity(0, 1, 500);
      }, 100);
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    // Phong khi canplay da fire truoc khi effect gan listener
    if (video.readyState >= 3) onCanPlay();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(restartTimeout);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  const scrollTo = (e, selector) => {
    e.preventDefault();
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      {/* SVG filter def cho .video-sharpen: unsharp mask 3x3 nhe
          (kernel sum = 1, khong doi do sang). color-interpolation-filters
          sRGB BAT BUOC - mac dinh linearRGB lam sap gamma vung toi. */}
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <filter id="video-sharpen-filter" colorInterpolationFilters="sRGB">
          <feConvolveMatrix
            order="3"
            preserveAlpha="true"
            kernelMatrix="0 -0.25 0  -0.25 2 -0.25  0 -0.25 0"
          />
        </filter>
      </svg>

      {/* Background video - fade loop */}
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        className="video-sharpen absolute inset-0 h-full w-full object-cover object-bottom"
        style={{ opacity: 0 }}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Film grain - che vet upscale, tang do net cam nhan */}
      <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" />


      {/* Navbar */}
      <nav className="relative z-20 px-4 py-6 sm:px-6">
        <div className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-3 sm:px-6">
          <div className="flex items-center">
            <a href="#home" className="flex items-center gap-2">
              <Code2 size={24} className="text-white" />
              <span className="text-lg font-semibold text-white">
                kusocisme
              </span>
            </a>
            <div className="ml-8 hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/minhnhatluongg"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm font-medium text-white transition-colors hover:text-white/80 min-[360px]:inline"
            >
              GitHub
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, "#contact")}
              className="liquid-glass whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/5 sm:px-6"
            >
              Hire Me
            </a>
          </div>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 -translate-y-[20%] flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="font-instrument mb-10 whitespace-nowrap text-7xl tracking-tight text-white md:text-8xl lg:text-9xl">
          Hi, I'm <em className="italic">Nhat</em>.
        </h1>

        {/* Email input */}
        <form
          onSubmit={(e) => scrollTo(e, "#contact")}
          noValidate
          className="liquid-glass mb-6 flex w-full max-w-xl items-center gap-3 rounded-full py-2 pl-6 pr-2"
        >
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Enter your email"
            className="w-full min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/40"
          />
          <button
            type="submit"
            aria-label="Get in touch"
            className="shrink-0 cursor-pointer rounded-full bg-white p-3 text-black transition-transform hover:scale-105"
          >
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="mb-8 max-w-md px-4 text-sm leading-relaxed text-white">
          Full-stack developer from Vietnam — crafting clean, scalable web
          applications with exceptional performance and delightful user
          experiences.
        </p>

        <a
          href="#projects"
          onClick={(e) => scrollTo(e, "#projects")}
          className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
        >
          View My Work
        </a>
      </div>

      {/* Social icons */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel={
              social.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            aria-label={social.label}
            className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
          >
            <social.Icon size={20} />
          </a>
        ))}
      </div>
    </div>
  );
};
