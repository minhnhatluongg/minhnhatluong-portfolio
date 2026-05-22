import { useEffect, useMemo, useState } from "react";

// ====================================================================
// Profile + Data
// ====================================================================

// ---------------------------------------------------------------------
// IMPORTANT: avatarUrl is a STATIC IMAGE URL pointing to YOUR GitHub
// avatar. Every visitor sees the same picture regardless of whether they
// are logged into GitHub themselves - the browser just downloads the
// public image at this URL. To change the avatar shown to all visitors,
// either:
//   (a) change `githubUser` below (it derives the URL)
//   (b) replace avatarUrl with any other public image URL
// ---------------------------------------------------------------------
const PROFILE = {
  name: "Minh Nhat Luong",
  role: "Backend Developer",
  tagline: "Built this Discord music bot with TypeScript",
  githubUser: "minhnhatluongg",
  // GitHub serves a public PNG at /<user>.png - safe to hot-link from any site.
  get avatarUrl() {
    return `https://github.com/${this.githubUser}.png`;
  },
};

const CATEGORIES = [
  { id: "music", label: "Music", emoji: "🎵", color: "#1ed760" },
  { id: "coin", label: "Coin", emoji: "💰", color: "#ffa42b" },
  { id: "general", label: "General", emoji: "ℹ", color: "#539df5" },
];

const COMMANDS = [
  {
    name: "/play",
    category: "music",
    short: "Phat mot bai hat hoac playlist tu URL / tu khoa",
    cost: "ceil(phut) x COIN_COST_PER_MINUTE",
    usage: "/play <query>",
    examples: [
      "/play Son Tung MTP - Hay Trao Cho Anh",
      "/play https://youtu.be/xxxxx",
      "/play https://open.spotify.com/playlist/...",
    ],
    description:
      "Tim va phat nhac tu YouTube, Spotify hoac SoundCloud. Ho tro ca link don le lan playlist - so bai toi da theo PLAYLIST_TRACK_LIMIT trong config.",
    tags: ["voice", "queue", "search"],
  },
  {
    name: "/artist",
    category: "music",
    short: "Phat top 10 bai noi bat cua mot nghe si (smart)",
    cost: "Tu tinh theo so bai ban chon (1..10)",
    usage: "/artist <name>",
    examples: ["/artist Son Tung MTP", "/artist Eminem", "/artist BLACKPINK"],
    description:
      "Phien ban thong minh: hien thi 10 bai hat voi chi phi tung bai, so du hien tai, va goi y so bai ban co the phat neu coin sap het. Ban chon so bai muon phat qua menu, moi bai co dau OK (du coin) hoac BAN (vuot so du).",
    tags: ["smart", "voice", "youtube"],
    featured: true,
  },
  {
    name: "/queue",
    category: "music",
    short: "Xem hang doi hien tai (10 bai / trang)",
    cost: "Mien phi",
    usage: "/queue [page]",
    examples: ["/queue", "/queue 2"],
    description:
      "Hien thi bai dang phat + toi da 10 bai ke tiep. Footer cho biet so trang va tong so bai trong queue.",
    tags: ["info"],
  },
  {
    name: "/nowplaying",
    category: "music",
    short: "Xem bai dang phat voi thanh tien trinh",
    cost: "Mien phi",
    usage: "/nowplaying",
    examples: ["/nowplaying"],
    description:
      "Tra ve embed gom ten bai, nguon, nguoi yeu cau, va thanh tien trinh 20 ky tu cap nhat theo thoi gian da phat.",
    tags: ["info"],
  },
  {
    name: "/skip",
    category: "music",
    short: "Bo qua bai dang phat",
    cost: "Mien phi",
    usage: "/skip",
    examples: ["/skip"],
    description: "Dung bai hien tai va chuyen ngay sang bai tiep theo trong queue.",
    tags: ["control"],
  },
  {
    name: "/pause",
    category: "music",
    short: "Tam dung phat nhac",
    cost: "Mien phi",
    usage: "/pause",
    examples: ["/pause"],
    description: "Tam dung audio player. Dung /resume de tiep tuc.",
    tags: ["control"],
  },
  {
    name: "/resume",
    category: "music",
    short: "Tiep tuc bai dang tam dung",
    cost: "Mien phi",
    usage: "/resume",
    examples: ["/resume"],
    description: "Tiep tuc phat bai da duoc tam dung bang /pause.",
    tags: ["control"],
  },
  {
    name: "/loop",
    category: "music",
    short: "Bat/tat che do lap (off / track / queue)",
    cost: "Mien phi",
    usage: "/loop",
    examples: ["/loop"],
    description:
      "Xoay vong 3 che do lap: OFF -> TRACK (lap 1 bai) -> QUEUE (lap toan bo hang doi) -> OFF.",
    tags: ["control"],
  },
  {
    name: "/shuffle",
    category: "music",
    short: "Xao tron thu tu bai trong hang doi",
    cost: "Mien phi",
    usage: "/shuffle",
    examples: ["/shuffle"],
    description: "Ap dung Fisher-Yates tren cac bai upcoming, khong anh huong bai dang phat.",
    tags: ["control"],
  },
  {
    name: "/remove",
    category: "music",
    short: "Xoa mot bai khoi hang doi theo vi tri",
    cost: "Mien phi",
    usage: "/remove <position>",
    examples: ["/remove 3"],
    description: "Xoa bai o vi tri thu N trong queue (1-indexed, theo /queue).",
    tags: ["control"],
  },
  {
    name: "/clear",
    category: "music",
    short: "Xoa toan bo hang doi (giu bai dang phat)",
    cost: "Mien phi",
    usage: "/clear",
    examples: ["/clear"],
    description: "Reset upcoming tracks ve rong. Bai dang phat van tiep tuc cho den khi ket thuc.",
    tags: ["control"],
  },
  {
    name: "/leave",
    category: "music",
    short: "Roi voice channel & don dep queue",
    cost: "Mien phi",
    usage: "/leave",
    examples: ["/leave"],
    description: "Bot disconnect, giai phong tai nguyen player va xoa queue cua guild.",
    tags: ["control"],
  },
  {
    name: "/balance",
    category: "coin",
    short: "Xem so du, streak va 5 giao dich gan nhat",
    cost: "Mien phi",
    usage: "/balance",
    examples: ["/balance"],
    description:
      "Embed 'So du cua ban' gom: balance, streak, ngay check-in gan nhat, va lich su 5 giao dich moi nhat.",
    tags: ["info"],
  },
  {
    name: "/checkin",
    category: "coin",
    short: "Diem danh hang ngay de nhan coin & duy tri streak",
    cost: "Mien phi - Nhan coin",
    usage: "/checkin",
    examples: ["/checkin"],
    description:
      "Idempotent theo UTC day. Reward = base + (streak x bonusPerDay), cap tai COIN_STREAK_BONUS_MAX. Bo 1 ngay la streak reset ve 1.",
    tags: ["daily", "reward"],
    featured: true,
  },
  {
    name: "/rps",
    category: "coin",
    short: "Choi Keo-Bua-Bao voi bot de thang coin",
    cost: "Dat cuoc (1..N) coin",
    usage: "/rps <bet> <choice>",
    examples: ["/rps 10 rock", "/rps 50 scissors"],
    description:
      "Thang nhan x2 tien cuoc (net +bet), thua mat tien cuoc, hoa hoan cuoc. Ghi vao ledger voi type rps_win / rps_loss.",
    tags: ["game", "bet"],
  },
  {
    name: "/coin-give",
    category: "coin",
    short: "Admin: cap coin cho nguoi dung",
    cost: "Yeu cau quyen Administrator",
    usage: "/coin-give <user> <amount>",
    examples: ["/coin-give @user 100"],
    description: "Insert giao dich type admin_give vao ledger va cong vao tai khoan dich.",
    tags: ["admin"],
  },
  {
    name: "/coin-remove",
    category: "coin",
    short: "Admin: tru coin (clamp tai 0)",
    cost: "Yeu cau quyen Administrator",
    usage: "/coin-remove <user> <amount>",
    examples: ["/coin-remove @user 50"],
    description:
      "Tru toi da amount; neu balance nho hon yeu cau thi clamp ve 0 va giao dich ghi nhan dung so da tru.",
    tags: ["admin"],
  },
  {
    name: "/help",
    category: "general",
    short: "Xem huong dan nhanh va danh sach tinh nang",
    cost: "Mien phi",
    usage: "/help",
    examples: ["/help"],
    description: "Embed tong quan: nhom lenh music, coin, general kem mo ta ngan.",
    tags: ["info"],
  },
  {
    name: "/commands",
    category: "general",
    short: "Bang cac lenh chi tiet voi chi phi va vi du",
    cost: "Mien phi",
    usage: "/commands",
    examples: ["/commands"],
    description:
      "Liet ke toan bo slash commands cua bot kem syntax va muc coin tieu thu (doc tu COIN_COST_PER_MINUTE).",
    tags: ["info"],
  },
];

// ====================================================================
// Daily-visit tracking - localStorage
// ====================================================================

const VISIT_KEY = "commandsBot.visitState.v1";

function todayIso() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return yyyy + "-" + mm + "-" + dd;
}

function diffInDays(fromIso, toIso) {
  const a = new Date(fromIso + "T00:00:00Z");
  const b = new Date(toIso + "T00:00:00Z");
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

function loadVisitState() {
  try {
    const raw = localStorage.getItem(VISIT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveVisitState(state) {
  try {
    localStorage.setItem(VISIT_KEY, JSON.stringify(state));
  } catch {
    // non-fatal
  }
}

function useDailyVisit() {
  const [state, setState] = useState(() => loadVisitState());
  const [isNewToday, setIsNewToday] = useState(false);

  useEffect(() => {
    const today = todayIso();
    const prev = loadVisitState();

    if (!prev) {
      const next = { lastVisit: today, streak: 1, totalVisits: 1, dismissedToday: false };
      saveVisitState(next);
      setState(next);
      setIsNewToday(true);
      return;
    }

    if (prev.lastVisit === today) {
      setState(prev);
      setIsNewToday(false);
      return;
    }

    const gap = diffInDays(prev.lastVisit, today);
    const nextStreak = gap === 1 ? (prev.streak || 0) + 1 : 1;
    const next = {
      lastVisit: today,
      streak: nextStreak,
      totalVisits: (prev.totalVisits || 0) + 1,
      dismissedToday: false,
    };
    saveVisitState(next);
    setState(next);
    setIsNewToday(true);
  }, []);

  const dismissBanner = () => {
    const cur = loadVisitState() || state;
    if (!cur) return;
    const next = { ...cur, dismissedToday: true };
    saveVisitState(next);
    setState(next);
    setIsNewToday(false);
  };

  return { state, isNewToday, dismissBanner };
}

// ====================================================================
// Profile card (top of sidebar)
// ====================================================================

function ProfileCard({ visitState }) {
  const [imgError, setImgError] = useState(false);
  const initials = PROFILE.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className="relative p-4 rounded-lg overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(30,215,96,0.18) 0%, #1f1f1f 100%)",
      }}
    >
      {/* Decorative pulse */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#1ed760] opacity-20 blur-2xl" />

      <div className="relative z-10 flex items-center gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {!imgError ? (
            <img
              src={PROFILE.avatarUrl}
              alt={PROFILE.name}
              onError={() => setImgError(true)}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#1ed760] shadow-[0_4px_14px_rgba(30,215,96,0.4)]"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1ed760] to-[#1db954] flex items-center justify-center text-lg font-bold text-black border-2 border-[#1ed760] shadow-[0_4px_14px_rgba(30,215,96,0.4)]">
              {initials}
            </div>
          )}
          {/* Online dot */}
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1ed760] border-2 border-[#181818]" />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-white truncate">
            {PROFILE.name}
          </div>
          <div className="text-[11px] text-[#1ed760] font-bold uppercase tracking-[0.12em] mt-0.5">
            {PROFILE.role}
          </div>
          <div className="text-[10.5px] text-[#b3b3b3] mt-1 line-clamp-2">
            {PROFILE.tagline}
          </div>
        </div>
      </div>

      {/* Streak chip */}
      {visitState && visitState.streak > 0 && (
        <div className="relative z-10 mt-3 flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-black/30 border border-[#272727]">
          <div className="flex items-center gap-2">
            <span className="text-sm">🔥</span>
            <span className="text-xs font-bold text-white">
              {visitState.streak}
            </span>
            <span className="text-[10px] uppercase tracking-[0.12em] text-[#b3b3b3] font-bold">
              day{visitState.streak === 1 ? "" : "s"} streak
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.12em] text-[#b3b3b3] font-bold">
            {visitState.totalVisits}x
          </span>
        </div>
      )}
    </div>
  );
}

// ====================================================================
// Sub-components
// ====================================================================

function CategoryPill({ active, label, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-200 whitespace-nowrap " +
        (active
          ? "shadow-[0_4px_14px_rgba(30,215,96,0.3)]"
          : "bg-[#1f1f1f] text-[#b3b3b3] hover:bg-[#272727] hover:text-white")
      }
      style={active ? { backgroundColor: color, color: "#000" } : undefined}
    >
      {label}
    </button>
  );
}

function CommandListItem({ command, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "w-full text-left px-3 py-2.5 rounded-md flex items-center gap-3 transition-colors duration-150 " +
        (active ? "bg-[#272727]" : "hover:bg-[#1f1f1f]")
      }
    >
      <div
        className={
          "w-9 h-9 rounded-md flex items-center justify-center font-mono text-[11px] font-bold flex-shrink-0 " +
          (active ? "bg-[#1ed760] text-black" : "bg-[#1f1f1f] text-white")
        }
      >
        {command.name.slice(1, 3).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={
              "font-mono text-sm font-bold truncate " +
              (active ? "text-white" : "text-[#cbcbcb]")
            }
          >
            {command.name}
          </span>
          {command.featured && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#1ed760] flex-shrink-0">
              HOT
            </span>
          )}
        </div>
        <div className="text-[11px] text-[#b3b3b3] truncate mt-0.5">
          {command.short}
        </div>
      </div>
    </button>
  );
}

function Tag({ children, accent }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[10.5px] font-semibold capitalize bg-[#272727] text-[#cbcbcb] border border-[#4d4d4d]"
      style={accent ? { borderColor: accent, color: accent } : undefined}
    >
      {children}
    </span>
  );
}

function CommandDetail({ command }) {
  if (!command) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-20">
        <div className="text-6xl mb-4">🎧</div>
        <h3 className="text-xl font-bold text-white mb-2">
          Chon mot lenh ben trai
        </h3>
        <p className="text-sm text-[#b3b3b3] max-w-sm">
          Kham pha cac slash commands cua Discord music bot - chi phi coin, cu phap va vi du su dung.
        </p>
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.id === command.category);
  const accent = (cat && cat.color) || "#1ed760";

  return (
    <div className="flex flex-col">
      <div
        className="relative px-8 py-10 rounded-t-lg border-b border-[#272727] overflow-hidden"
        style={{ background: "linear-gradient(135deg, " + accent + "22 0%, #181818 70%)" }}
      >
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: accent }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-[10.5px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
              style={{ backgroundColor: accent, color: "#000" }}
            >
              {(cat && cat.label) || "Command"}
            </span>
            {command.featured && (
              <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full bg-white text-black">
                Featured
              </span>
            )}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-mono">
            {command.name}
          </h2>
          <p className="mt-3 text-base text-[#cbcbcb] max-w-2xl">
            {command.short}
          </p>
          <div className="flex gap-2 mt-5 flex-wrap">
            {command.tags && command.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>
      </div>

      <div className="px-8 py-7 space-y-7">
        <div className="flex items-center justify-between gap-4 px-5 py-4 rounded-md bg-[#1f1f1f] border border-[#272727]">
          <div>
            <div className="text-[10.5px] uppercase font-bold tracking-[0.14em] text-[#b3b3b3] mb-1">
              Chi phi
            </div>
            <div className="text-sm font-bold text-white">{command.cost}</div>
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{ backgroundColor: accent, color: "#000" }}
          >
            🪙
          </div>
        </div>

        <section>
          <h3 className="text-[10.5px] uppercase font-bold tracking-[0.14em] text-[#b3b3b3] mb-3">
            Cu phap
          </h3>
          <pre className="px-4 py-3 rounded-md bg-[#121212] border border-[#272727] font-mono text-sm text-[#1ed760] overflow-x-auto">
            {command.usage}
          </pre>
        </section>

        <section>
          <h3 className="text-[10.5px] uppercase font-bold tracking-[0.14em] text-[#b3b3b3] mb-3">
            Mo ta
          </h3>
          <p className="text-sm text-[#cbcbcb] leading-relaxed">
            {command.description}
          </p>
        </section>

        <section>
          <h3 className="text-[10.5px] uppercase font-bold tracking-[0.14em] text-[#b3b3b3] mb-3">
            Vi du
          </h3>
          <div className="space-y-2">
            {command.examples.map((ex, i) => (
              <div
                key={i}
                className="px-4 py-3 rounded-md bg-[#1f1f1f] border border-[#272727] font-mono text-sm text-white hover:border-[#4d4d4d] transition-colors"
              >
                <span className="text-[#b3b3b3] mr-2">$</span>
                {ex}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function WelcomeBanner({ state, onDismiss }) {
  if (!state) return null;
  let milestone = null;
  if (state.streak >= 30) milestone = "30+ ngay lien tiep - legend!";
  else if (state.streak >= 7) milestone = "Mot tuan lien tiep!";
  else if (state.streak >= 3) milestone = "Ghe thuong xuyen ghe!";

  return (
    <div className="relative mb-6 px-6 py-5 rounded-lg bg-gradient-to-r from-[#1ed760]/15 via-[#181818] to-[#181818] border border-[#1ed760]/40 shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-2 left-8 w-2 h-2 rounded-full bg-[#1ed760] animate-pulse" />
        <div
          className="absolute top-6 left-32 w-1.5 h-1.5 rounded-full bg-[#ffa42b] animate-pulse"
          style={{ animationDelay: "0.3s" }}
        />
        <div
          className="absolute bottom-3 left-20 w-1 h-1 rounded-full bg-[#539df5] animate-pulse"
          style={{ animationDelay: "0.6s" }}
        />
        <div
          className="absolute top-4 right-24 w-2 h-2 rounded-full bg-[#1ed760] animate-pulse"
          style={{ animationDelay: "0.9s" }}
        />
        <div
          className="absolute bottom-4 right-12 w-1.5 h-1.5 rounded-full bg-[#ffa42b] animate-pulse"
          style={{ animationDelay: "1.2s" }}
        />
      </div>

      <div className="relative z-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#1ed760] flex items-center justify-center text-2xl flex-shrink-0">
          👋
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-lg font-bold text-white">
              Chao mung quay lai!
            </h2>
            <span className="px-3 py-1 rounded-full bg-[#1ed760] text-black text-[10.5px] font-bold uppercase tracking-[0.14em]">
              🔥 {state.streak} {state.streak === 1 ? "ngay" : "ngay lien tiep"}
            </span>
            <span className="text-xs text-[#b3b3b3]">
              Tong ghe tham: {state.totalVisits}
            </span>
          </div>
          <p className="mt-1 text-sm text-[#cbcbcb]">
            {milestone
              ? milestone + " Tiep tuc kham pha cac tip moi hom nay."
              : "Bot da co them tip moi hom nay - keo xuong xem cac lenh va vi du."}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="w-8 h-8 rounded-full bg-[#1f1f1f] text-[#b3b3b3] hover:text-white hover:bg-[#272727] flex items-center justify-center transition-colors flex-shrink-0"
          title="Dong"
        >
          X
        </button>
      </div>
    </div>
  );
}

// ====================================================================
// Main page component
// Layout: full-screen flex
//   - Left rail (sidebar):  fixed width, full height, scrolls internally
//   - Right area:           top header bar + scrollable detail
// ====================================================================

// px - wide enough to host profile card + 4 category chips on one row
// without horizontal scrolling, and still fit command titles comfortably.
const SIDEBAR_WIDTH = 400;

export const CommandsBotPage = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedName, setSelectedName] = useState(
    (COMMANDS.find((c) => c.featured) || COMMANDS[0]).name,
  );
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer

  const { state: visitState, isNewToday, dismissBanner } = useDailyVisit();

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return COMMANDS.filter(
      (c) =>
        (activeCategory === "all" || c.category === activeCategory) &&
        (q === "" ||
          c.name.toLowerCase().includes(q) ||
          c.short.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)),
    );
  }, [activeCategory, search]);

  const selected = COMMANDS.find((c) => c.name === selectedName) || null;

  const counts = useMemo(() => {
    const m = { all: COMMANDS.length };
    for (const c of CATEGORIES) m[c.id] = 0;
    for (const cmd of COMMANDS) m[cmd.category] = (m[cmd.category] || 0) + 1;
    return m;
  }, []);

  // Sidebar content - reused on desktop (fixed rail) and mobile (drawer)
  const sidebarContent = (
    <div className="h-full flex flex-col bg-[#000000]">
      {/* Profile (top, sticky-ish via flex order) */}
      <div className="p-3 pb-2">
        <ProfileCard visitState={visitState} />
      </div>

      {/* Filters + Search */}
      <div className="px-3 pb-3 space-y-2.5">
        {/* Search - Spotify-style pill input with clear button */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search commands..."
            className="w-full pl-10 pr-9 py-2.5 rounded-full bg-[#1f1f1f] text-white text-[13px] placeholder-[#b3b3b3] border border-transparent focus:outline-none focus:border-white focus:bg-[#272727] transition-colors"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b3b3b3] text-sm pointer-events-none select-none">
            🔍
          </span>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#535353] hover:bg-[#7c7c7c] text-white text-[10px] flex items-center justify-center transition-colors"
              title="Clear"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category chips - single horizontal scroll row (Spotify-style) */}
        <div className="filter-chips-row -mx-3 px-3 overflow-x-auto">
          <div className="flex gap-1.5 w-max pb-1">
            <CategoryPill
              active={activeCategory === "all"}
              label={"All " + counts.all}
              onClick={() => setActiveCategory("all")}
              color="#ffffff"
            />
            {CATEGORIES.map((c) => (
              <CategoryPill
                key={c.id}
                active={activeCategory === c.id}
                label={c.emoji + " " + c.label + " " + counts[c.id]}
                color={c.color}
                onClick={() => setActiveCategory(c.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Library header */}
      <div className="px-5 py-2 flex items-center justify-between border-t border-[#181818]">
        <div className="flex items-center gap-2">
          <span className="text-sm">📚</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#b3b3b3]">
            Your Commands
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#b3b3b3]">
          {filtered.length}
        </span>
      </div>

      {/* Scrollable command list - takes remaining height, always-visible scrollbar */}
      <div
        className="flex-1 px-2 pb-3 sidebar-scroll"
        style={{ overflowY: "scroll" }}
      >
        {filtered.length === 0 && (
          <div className="text-center py-8 text-sm text-[#b3b3b3]">
            Khong tim thay lenh nao.
          </div>
        )}
        <div className="space-y-0.5">
          {filtered.map((cmd) => (
            <CommandListItem
              key={cmd.name}
              command={cmd}
              active={selectedName === cmd.name}
              onClick={() => {
                setSelectedName(cmd.name);
                setSidebarOpen(false); // close drawer on mobile
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer stats */}
      <div className="px-4 py-3 border-t border-[#181818] flex items-center justify-between text-[10px] uppercase tracking-[0.12em] font-bold text-[#b3b3b3]">
        <span>Total {COMMANDS.length}</span>
        <span>Filtered {filtered.length}</span>
      </div>
    </div>
  );

  return (
    <div
      className="bg-[#121212] text-white overflow-hidden flex flex-col"
      style={{ height: "100vh", width: "100vw" }}
    >
      {/* ===== Local styles for scrollbar (always visible) ===== */}
      <style>{`
        /* Sidebar command list - always-visible thumb on a dark track */
        .sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: #535353 #0a0a0a;
        }
        .sidebar-scroll::-webkit-scrollbar { width: 10px; }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: #0a0a0a;
          border-left: 1px solid #181818;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: #535353;
          border-radius: 9999px;
          border: 2px solid #0a0a0a;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #7c7c7c; }

        /* Main detail area scrollbar */
        .main-scroll {
          scrollbar-width: thin;
          scrollbar-color: #535353 #0a0a0a;
        }
        .main-scroll::-webkit-scrollbar { width: 12px; }
        .main-scroll::-webkit-scrollbar-track { background: #0a0a0a; }
        .main-scroll::-webkit-scrollbar-thumb {
          background: #535353;
          border-radius: 9999px;
          border: 2px solid #0a0a0a;
        }
        .main-scroll::-webkit-scrollbar-thumb:hover { background: #7c7c7c; }

        /* Filter chips row - scrollable but hide scrollbar (Spotify-style) */
        .filter-chips-row { scrollbar-width: none; -ms-overflow-style: none; }
        .filter-chips-row::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ===== TOP BAR - spans full width above sidebar+main ===== */}
      <header className="flex-shrink-0 h-14 bg-[#000000] border-b border-[#181818] flex items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden w-9 h-9 rounded-full bg-[#1f1f1f] flex items-center justify-center text-white hover:bg-[#272727] transition-colors"
            title="Mo menu"
          >
            ☰
          </button>
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-[#1f1f1f] flex items-center justify-center text-white hover:bg-[#272727] transition-colors flex-shrink-0"
            title="Quay lai Portfolio"
          >
            {"<"}
          </button>
          <div className="min-w-0 hidden sm:block">
            <h1 className="text-sm font-bold text-white truncate leading-tight">
              Bot Commands
            </h1>
            <p className="text-[10.5px] text-[#b3b3b3] truncate leading-tight">
              Discord Music Bot - Spotify-themed reference
            </p>
          </div>
        </div>

        <a
          href={"https://github.com/" + PROFILE.githubUser}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1ed760] text-black text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-white transition-colors whitespace-nowrap"
        >
          <span>★</span>
          <span>GitHub</span>
        </a>
      </header>

      {/* ===== BELOW TOP BAR: sidebar + main ===== */}
      <div className="flex-1 flex min-h-0">
        {/* ===== DESKTOP SIDEBAR ===== */}
        <aside
          className="hidden md:flex flex-shrink-0 border-r border-[#181818]"
          style={{ width: SIDEBAR_WIDTH + "px" }}
        >
          {sidebarContent}
        </aside>

        {/* ===== MOBILE DRAWER ===== */}
        {sidebarOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 z-40 bg-black/60"
              onClick={() => setSidebarOpen(false)}
            />
            <aside
              className="md:hidden fixed top-14 left-0 bottom-0 z-50 border-r border-[#181818]"
              style={{ width: SIDEBAR_WIDTH + "px" }}
            >
              {sidebarContent}
            </aside>
          </>
        )}

        {/* ===== MAIN SCROLL AREA ===== */}
        <main
          className="flex-1 min-w-0 main-scroll bg-[#121212]"
          style={{ overflowY: "scroll" }}
        >
          <div className="px-6 lg:px-10 py-6 max-w-5xl mx-auto">
            {/* Welcome banner */}
            {isNewToday && !visitState?.dismissedToday && (
              <WelcomeBanner state={visitState} onDismiss={dismissBanner} />
            )}

            {/* Detail card */}
            <div className="rounded-lg bg-[#181818] border border-[#272727] shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
              <CommandDetail command={selected} />
            </div>

            {/* Bottom now-playing strip */}
            <div className="mt-4 mb-2 px-5 py-4 rounded-lg bg-[#181818] border border-[#272727] flex items-center justify-between gap-4 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-md bg-gradient-to-br from-[#1ed760] to-[#1db954] flex items-center justify-center text-2xl flex-shrink-0">
                  🎶
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white truncate">
                    Discord Music Bot
                  </div>
                  <div className="text-xs text-[#b3b3b3] truncate">
                    TypeScript - discord.js v14 - SQL Server - Coin system
                  </div>
                </div>
              </div>
              <a
                href={"https://github.com/" + PROFILE.githubUser}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-full bg-[#1ed760] text-black text-xs font-bold uppercase tracking-[0.14em] hover:bg-white transition-colors whitespace-nowrap"
              >
                View Repo
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
