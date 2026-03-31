/**
 * ====================================================================
 * TechOrbit - Vong tron quay voi tech icons
 * ====================================================================
 *
 * WHAT:
 *   Vong tron nho quay cham quanh content hero.
 *   Moi icon dai dien 1 tech skill.
 *   Tao visual interest + hint ve skills cua developer.
 *
 * HOW:
 *   - 1 vong tron orbit (border dashed, quay CW)
 *   - Cac icon dat tren orbit, counter-rotate de giu thang dung
 *   - CSS animation rotate 360deg, 30s loop
 *
 * TAI SAO:
 *   - Lap khoang trong tren/duoi hero
 *   - Tao "tech aura" quanh ten
 *   - Visual cue: "nguoi nay biet nhieu tech"
 *   - Chuyen dong cham -> professional, khong nham
 *
 * ====================================================================
 */

export const TechOrbit = () => {
  // Tech stack voi emoji/text icons
  const techs = [
    { label: "React", icon: "⚛️" },
    { label: ".NET", icon: "🔷" },
    { label: "Node", icon: "🟢" },
    { label: "Docker", icon: "🐳" },
    { label: "SQL", icon: "🗄️" },
    { label: "JS", icon: "⚡" },
  ];

  const count = techs.length;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Vong orbit ngoai - quay cham */}
      <div
        className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full animate-spin-slow"
        style={{
          border: "1px dashed rgba(59, 130, 246, 0.1)",
        }}
      >
        {/* Dat cac icon tren orbit */}
        {techs.map((tech, i) => {
          // Tinh vi tri tren vong tron
          const angle = (360 / count) * i;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                // Dat tai tam vong tron, roi day ra bien
                top: "50%",
                left: "50%",
                transform: `rotate(${angle}deg) translateX(250px) rotate(-${angle}deg)`,
                // Kich thuoc cho md breakpoint
                marginTop: "-18px",
                marginLeft: "-18px",
              }}
            >
              {/* Icon container - counter-rotate de giu thang dung */}
              <div
                className="w-9 h-9 rounded-full bg-gray-900/80 border border-blue-500/20
                  flex items-center justify-center text-sm
                  animate-counter-spin-slow backdrop-blur-sm"
                title={tech.label}
              >
                {tech.icon}
              </div>
            </div>
          );
        })}
      </div>

      {/* Vong orbit trong - quay nguoc */}
      <div
        className="absolute w-[350px] h-[350px] md:w-[420px] md:h-[420px] rounded-full animate-counter-spin-slow"
        style={{
          border: "1px dashed rgba(6, 182, 212, 0.07)",
        }}
      />
    </div>
  );
};
