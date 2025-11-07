// components/BackgroundVideo.jsx
export const BackgroundVideo = ({
  videoOpacity = 1, // để 1.0 cho sắc nét dưới lớp đen
  blackAlpha = 0.8, // 0.90–0.97: cảm giác đen, vẫn hơi thấy motion
  vignette = true,
}) => {
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

      {/* LỚP ĐEN: đen đậm phủ lên video (gần như đen tuyệt đối) */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          background: `rgba(0,0,0,${blackAlpha})`,
        }}
      />

      {/* VIGNETTE nhẹ để tập trung mắt vào trung tâm */}
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
