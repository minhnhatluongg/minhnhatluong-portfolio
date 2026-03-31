/**
 * ====================================================================
 * BackgroundVideo - Voi Mood Color Overlay
 * ====================================================================
 *
 * MOI:
 *   - Nhan prop `mood` tu App -> thay doi mau overlay
 *   - Moi mood co 1 gradient color khac nhau phu len video
 *   - Transition smooth 1.5s khi chuyen mood
 *   - blackAlpha giam con 0.55 de thay video ro hon
 *
 * MOOD SYSTEM:
 *   "default"  -> Xanh blue nhe (hien tai)
 *   "cyber"    -> Tim neon
 *   "ocean"    -> Cyan/teal
 *   "sunset"   -> Cam/hong
 *   "matrix"   -> Xanh la
 *
 * ====================================================================
 */

// Dinh nghia mau cho tung mood
const MOOD_COLORS = {
  default: {
    overlay: "rgba(10, 15, 30, 0.55)",
    gradient: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.03) 0%, transparent 70%)",
  },
  cyber: {
    overlay: "rgba(20, 10, 35, 0.55)",
    gradient: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.06) 0%, transparent 70%)",
  },
  ocean: {
    overlay: "rgba(5, 20, 30, 0.55)",
    gradient: "radial-gradient(ellipse at center, rgba(6, 182, 212, 0.06) 0%, transparent 70%)",
  },
  sunset: {
    overlay: "rgba(30, 15, 10, 0.55)",
    gradient: "radial-gradient(ellipse at center, rgba(251, 146, 60, 0.05) 0%, transparent 70%)",
  },
  matrix: {
    overlay: "rgba(5, 25, 10, 0.55)",
    gradient: "radial-gradient(ellipse at center, rgba(52, 211, 153, 0.05) 0%, transparent 70%)",
  },
};

export { MOOD_COLORS };

export const BackgroundVideo = ({
  videoOpacity = 1,
  vignette = true,
  mood = "default",
}) => {
  const moodStyle = MOOD_COLORS[mood] || MOOD_COLORS.default;

  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        tabIndex={-1}
        className="video-background"
        style={{
          zIndex: -2,
          opacity: videoOpacity,
          filter: "brightness(0.9) saturate(1.05)",
          willChange: "transform, opacity",
        }}
        preload="auto"
        disablePictureInPicture
      >
        <source src="/motion-graphics/background.mp4" type="video/mp4" />
      </video>

      {/* LOP DEN + mood color - transition smooth */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          background: moodStyle.overlay,
          transition: "background 1.5s ease-in-out",
        }}
      />

      {/* LOP gradient mood - tao "aura" mau nhe o trung tam */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          background: moodStyle.gradient,
          transition: "background 1.5s ease-in-out",
        }}
      />

      {/* VIGNETTE */}
      {vignette && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: -1,
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      )}
    </>
  );
};
