# Parallax Portfolio - Huong Dan Hoc & Code Tay

## Muc Luc

1. [Tong Quan Architecture](#1-tong-quan-architecture)
2. [Thu Tu Doc Code](#2-thu-tu-doc-code)
3. [Giai Thich Chi Tiet Tung File](#3-giai-thich-chi-tiet-tung-file)
4. [Bai Tap Thuc Hanh](#4-bai-tap-thuc-hanh)
5. [Debug Tips](#5-debug-tips)
6. [Nang Cao - Tu Them](#6-nang-cao---tu-them)

---

## 1. Tong Quan Architecture

```
                        +-----------------------+
                        |       App.jsx         |
                        |  useLenis() - smooth  |
                        |  ScrollProgress       |
                        +-----------+-----------+
                                    |
                    +---------------+----------------+
                    |               |                |
              +-----------+  +-----------+   +-----------+
              |  Home     |  |  About    |   |  Projects |  ...
              | Section   |  | Section   |   | Section   |
              +-----------+  +-----------+   +-----------+
                    |               |                |
              +-----+-----+  +-----+-----+   +-----+-----+
              |           |  |           |   |           |
         FloatingShapes  Content   FloatingShapes  Content
         (ParallaxLayer)  (RevealOnScroll)
         speed: -120~-30  (useParallax hooks)
```

### 3 Layers Cua He Thong:

```
Layer 1 - SCROLL ENGINE:    Lenis (smooth scroll) + GSAP ticker (sync)
Layer 2 - ANIMATION ENGINE: GSAP ScrollTrigger (track scroll -> animate)
Layer 3 - COMPONENTS:       ParallaxLayer, RevealOnScroll, useParallax
```

### Flow Khi User Scroll:

```
User scroll mouse wheel
  -> Lenis bat event, tinh toan smooth position (lerp)
  -> Lenis fire "scroll" event
  -> ScrollTrigger.update() duoc goi
  -> Moi ScrollTrigger instance tinh lai progress (0-1)
  -> GSAP update transform cua cac element
  -> Browser paint frame moi
  -> ~16ms sau, lap lai (60fps)
```

---

## 2. Thu Tu Doc Code

Doc theo thu tu nay de hieu TU GOC -> NGOAI:

### Buoc 1: Lenis (src/hooks/useLenis.js)
- Hieu tai sao can smooth scroll
- Hieu lerp la gi
- Hieu cach sync voi GSAP

### Buoc 2: useParallax (src/hooks/useParallax.js)
- Hieu ScrollTrigger co ban (trigger, start, end, scrub)
- Hieu 3 hooks: useParallax, useScrollAnimation, usePin
- BAT markers: true de thay trigger points tren man hinh

### Buoc 3: RevealOnScroll (src/components/RevealOnScroll.jsx)
- Hieu fromTo animation
- Hieu toggleActions vs scrub
- Hieu direction + distance

### Buoc 4: ParallaxLayer (src/components/ParallaxLayer.jsx)
- Hieu cach tao layers voi speed khac nhau
- Hieu FloatingShapes patterns

### Buoc 5: Sections (src/components/sections/*.jsx)
- Xem cach ap dung vao thuc te
- Hieu depth ordering

### Buoc 6: App.jsx + index.css
- Hieu toan bo flow
- Hieu CSS can thiet

---

## 3. Giai Thich Chi Tiet Tung File

### 3.1 useLenis.js - Tim Hieu

```
KHONG CO LENIS:
  Scroll 100px -> Tuc thi nhay den vi tri 100px (giat)

CO LENIS:
  Scroll 100px -> Frame 1: 10px, Frame 2: 19px, Frame 3: 27px...
  (Lerp 0.1 = moi frame di 10% khoang cach con lai)
  -> Cam giac "truot" muot ma
```

**Key line:** `lenis.on("scroll", ScrollTrigger.update)`
- Moi khi Lenis update scroll position, no bao ScrollTrigger cap nhat
- KHONG CO DONG NAY = ScrollTrigger dung native scroll = bi lech

**Key line:** `gsap.ticker.add((time) => lenis.raf(time * 1000))`
- GSAP ticker chay 60fps
- Thay vi tao rieng requestAnimationFrame, "gat" Lenis vao GSAP ticker
- 1 loop duy nhat cho ca 2 -> performance tot hon

### 3.2 useParallax.js - Tim Hieu

**useParallax(speed)** - Don gian nhat:
```
speed = 100:  Element di chuyen 100px xuong khi scroll qua
speed = -100: Element di chuyen 100px LEN khi scroll qua

Trigger: tu khi element ENTER viewport den khi EXIT
scrub: 1 = 1 giay lag (smooth)
```

**useScrollAnimation(from, to, options)** - Da nang:
```
Co the animate BAT KY property nao: opacity, scale, rotation, x, y, color...
Co the chon toggleActions (1 chieu) hoac scrub (2 chieu)
```

**usePin(options)** - Ghim element:
```
Element bi "dinh" tai cho khi scroll den no
Scroll tiep tuc nhung element KHONG di chuyen
Dung cho: hero sections, horizontal scroll, storytelling
```

### 3.3 ScrollTrigger - Concepts Quan Trong

```
START va END la 2 diem tren man hinh:

  start: "top bottom"
         ^^^  ^^^^^^
         |    |
         |    Vi tri tren VIEWPORT (top/center/bottom/80%)
         |
         Vi tri tren ELEMENT (top/center/bottom)

  -> "top cua element" cham "bottom cua viewport" = element vua vao man hinh

  end: "bottom top"
  -> "bottom cua element" cham "top cua viewport" = element vua roi man hinh
```

```
SCRUB - Bind animation vao scroll:

  scrub: false  -> Animation chay tu do (khong lien quan scroll)
  scrub: true   -> Animation MAP 1:1 voi scroll (keo = chay, dung = dung)
  scrub: 0.5    -> Nhu true nhung co 0.5s "catch up" delay
  scrub: 1      -> 1s delay -> RAT SMOOTH cho parallax
```

```
TOGGLE ACTIONS - 4 states:
  toggleActions: "play pause resume reverse"
                  ^^^^  ^^^^^  ^^^^^^  ^^^^^^^
                  |     |      |       |
                  onEnter      onEnterBack
                        onLeave       onLeaveBack

  Phổ biến:
  "play none none none"     -> Chay 1 lan, khong reverse
  "play none none reverse"  -> Chay khi enter, reverse khi leave back
  "play pause resume reset" -> Full control
```

---

## 4. Bai Tap Thuc Hanh

### Bai 1: Bat Markers (5 phut)
Mo `useParallax.js`, uncomment `markers: true` trong useParallax hook.
Chay `npm run dev` va scroll. Ban se thay cac line xanh/do tren man hinh
danh dau trigger points.

### Bai 2: Thay Doi Speed (10 phut)
Vao `Home.jsx`, thay doi speed cua headingRef:
- Thu `-100` (rat cham, cam giac xa)
- Thu `50` (di chuyen cung chieu scroll)
- Thu `0` (khong parallax)
Quan sat su khac biet.

### Bai 3: Them Parallax Cho 1 Element Moi (15 phut)
Trong `About.jsx`, them parallax cho Intro Card:
```jsx
const cardRef = useParallax(20); // Di chuyen cung chieu scroll, nhe
// ...
<div ref={cardRef}>
  <Card className="mb-8" hoverEffect={false}>
```

### Bai 4: Tao Custom FloatingShape (20 phut)
Vao `ParallaxLayer.jsx`, them 1 shape moi cho variant "home":
- Tao 1 element hình luc giac (hexagon) bang CSS
- Dat o vi tri khac voi cac shapes hien tai
- Chon speed khac voi cac shapes khac

### Bai 5: Thu Scrub Values (10 phut)
Trong `RevealOnScroll.jsx`, doi `once` prop mac dinh sang `false`.
Thu doi scrub values: 0.3, 1, 3. Cam nhan su khac biet.

### Bai 6: Horizontal Parallax (15 phut)
Trong `useParallax.js`, them option `direction: "x"`.
Ap dung vao 1 element trong About de no di chuyen NGANG khi scroll doc.

### Bai 7: Tao Section Moi Voi Pin Effect (30 phut)
Dung usePin hook de tao 1 section "Skills" moi:
- Section duoc pin tai vi tri top
- Trong khi pin, content ben trong fade in/out theo scroll
- Un-pin khi scroll xong

---

## 5. Debug Tips

### 5.1 Bat Markers
```js
// Trong bat ky ScrollTrigger config nao, them:
markers: true
// Se hien thi cac duong mau danh dau start/end tren viewport
```

### 5.2 GSAP DevTools
```js
// Them vao main.jsx hoac App.jsx:
import { ScrollTrigger } from "gsap/ScrollTrigger";
ScrollTrigger.defaults({ markers: true }); // BAT markers CHO TAT CA
```

### 5.3 Check Performance
- Chrome DevTools -> Performance tab -> Record -> Scroll
- Tim "Long Tasks" (> 50ms) = jank
- Check "Frames" section -> moi frame nen < 16ms

### 5.4 Common Issues

**Parallax bi giat tren mobile:**
- Nguyen nhan: Mobile browsers co "bounce" scroll
- Fix: Tat smoothTouch trong Lenis, hoac tat parallax tren mobile

**Element nhay khi page load:**
- Nguyen nhan: GSAP animate TRUOC khi Lenis san sang
- Fix: Cho isLoaded = true truoc khi render sections

**ScrollTrigger tinh sai vi tri:**
- Nguyen nhan: Images/fonts chua load xong -> chieu cao page thay doi
- Fix: `ScrollTrigger.refresh()` sau khi tat ca assets load xong

---

## 6. Nang Cao - Tu Them

Sau khi hieu co ban, thu cac effect nay:

### 6.1 Text Split Animation
Tach heading thanh tung chu, moi chu reveal voi delay khac nhau.
Library: gsap SplitText plugin (hoac tu lam bang split string)

### 6.2 Horizontal Scroll Section
1 section scroll NGANG thay vi doc. Dung usePin + xPercent animation.
```js
gsap.to(container, {
  xPercent: -100 * (slides.length - 1),
  ease: "none",
  scrollTrigger: { trigger: wrapper, pin: true, scrub: 1 }
});
```

### 6.3 Magnetic Cursor
Cursor "hut" vao cac button/link khi hover gan. Dung GSAP + mouse events.

### 6.4 Page Transitions
Animation khi chuyen giua cac anchor sections. Dung GSAP timeline + Lenis scrollTo.

### 6.5 3D Tilt Cards
Cards nghieng theo vi tri chuot. Dung CSS perspective + JS mousemove.

### 6.6 Scroll Velocity Effects
Dung `ScrollTrigger.getVelocity()` de lam effect phu thuoc vao TOC DO scroll:
- Scroll nhanh = text bi "skew" (nghieng)
- Scroll nhanh = particles bay nhanh hon

### 6.7 Lottie Animations
Tich hop Lottie (After Effects -> web animation) voi ScrollTrigger.
Animation frame duoc control boi scroll position.

---

## File Map

```
src/
├── hooks/
│   ├── index.js           # Export tat ca hooks
│   ├── useLenis.js        # [DOC TRUOC] Lenis smooth scroll + GSAP sync
│   └── useParallax.js     # [DOC SAU] 3 hooks: useParallax, useScrollAnimation, usePin
├── components/
│   ├── ParallaxLayer.jsx  # Decorative parallax elements + FloatingShapes
│   ├── ScrollProgress.jsx # Scroll progress bar (scaleX trick)
│   ├── RevealOnScroll.jsx # GSAP version (thay the IntersectionObserver)
│   ├── sections/
│   │   ├── Home.jsx       # Hero parallax (heading, subtitle speeds khac nhau)
│   │   ├── About.jsx      # Staggered reveal + directional animations
│   │   ├── Project.jsx    # Card stagger + scale trick
│   │   └── Contact.jsx    # Light parallax + stagger social links
│   └── ...
├── App.jsx                # Root - useLenis init + ScrollProgress
└── index.css              # Lenis CSS + section dividers
```

---

## Dependencies Moi

| Package | Vai Tro | Doc |
|---------|---------|-----|
| `gsap` | Animation engine + ScrollTrigger | https://gsap.com/docs |
| `lenis` | Smooth scroll | https://lenis.darkroom.engineering |

## Tips Cuoi

1. **Luon bat markers khi dev** - tat truoc khi deploy
2. **Mobile first** - test tren mobile som, parallax co the bi lag
3. **Less is more** - 3-4 layers la du, 10 layers = nang va kho nhin
4. **Performance** - luon dung `transform`, KHONG BAO GIO animate `top/left/width/height`
5. **will-change: transform** - bao browser tao GPU layer san, smooth hon
