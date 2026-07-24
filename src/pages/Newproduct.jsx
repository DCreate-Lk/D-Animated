// PremiumUI.jsx
import { useState, useRef, useEffect, useCallback } from "react";
import {
  AnimatePresence,
  motion as Motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { products } from "../data/products";

/* ═══════════════════════════════════════════
   ACCENT CONFIG
═══════════════════════════════════════════ */
const ACCENTS = {
  blue: {
    pill: "bg-blue-500/10 text-blue-400 ring-blue-500/20",
    icon: "text-blue-400 bg-blue-500/10 ring-blue-500/20",
    check: "text-blue-400",
    btn: "from-blue-500 to-blue-600 shadow-blue-500/25",
    glow: "59,130,246",
    bar: "bg-blue-500",
  },
  violet: {
    pill: "bg-violet-500/10 text-violet-400 ring-violet-500/20",
    icon: "text-violet-400 bg-violet-500/10 ring-violet-500/20",
    check: "text-violet-400",
    btn: "from-violet-500 to-violet-600 shadow-violet-500/25",
    glow: "139,92,246",
    bar: "bg-violet-500",
  },
  cyan: {
    pill: "bg-cyan-500/10 text-cyan-400 ring-cyan-500/20",
    icon: "text-cyan-400 bg-cyan-500/10 ring-cyan-500/20",
    check: "text-cyan-400",
    btn: "from-cyan-500 to-cyan-600 shadow-cyan-500/25",
    glow: "6,182,212",
    bar: "bg-cyan-500",
  },
  emerald: {
    pill: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    icon: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20",
    check: "text-emerald-400",
    btn: "from-emerald-500 to-emerald-600 shadow-emerald-500/25",
    glow: "16,185,129",
    bar: "bg-emerald-500",
  },
};

/* ═══════════════════════════════════════════
   AMBIENT BACKGROUND
═══════════════════════════════════════════ */
function AmbientBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-[30%] left-[20%] h-[70vh] w-[70vh] rounded-full bg-blue-600/[0.055] blur-[160px]" />
      <div className="absolute bottom-[10%] right-[15%] h-[50vh] w-[50vh] rounded-full bg-indigo-600/[0.045] blur-[130px]" />
      <div className="absolute left-[5%] top-[50%] h-[35vh] w-[35vh] rounded-full bg-violet-600/[0.03] blur-[110px]" />
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   STATS
═══════════════════════════════════════════ */
const STATS = [
  { value: "99.999%", label: "Uptime SLA" },
  { value: "47",      label: "Global regions" },
  { value: "<1ms",    label: "P99 latency" },
  { value: "10k+",    label: "Teams worldwide" },
];

function StatGrid() {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="mt-14 grid w-full max-w-2xl grid-cols-2 gap-px overflow-hidden
                 rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-4"
    >
      {STATS.map((s, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-1 bg-[#050505] px-4 py-5 text-center"
        >
          <span className="text-[22px] font-bold tracking-tight text-white sm:text-[26px]">
            {s.value}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
            {s.label}
          </span>
        </div>
      ))}
    </Motion.div>
  );
}

/* ═══════════════════════════════════════════
   FEATURE PILLARS
═══════════════════════════════════════════ */
const PILLARS = [
  { icon: Globe,     title: "Global Edge",     body: "Deploy to 47 PoPs with a single command and automatic geo-routing." },
  { icon: Shield,    title: "Zero-Trust Sec",  body: "Every byte encrypted, every identity continuously verified." },
  { icon: BarChart3, title: "Live Telemetry",  body: "Sub-second insights and anomaly alerts across every service." },
  { icon: Sparkles,  title: "Adaptive AI",     body: "Self-healing infrastructure powered by predictive ML models." },
];

function Pillars() {
  return (
    <section className="relative z-10 border-t border-white/[0.05] px-5 py-24 sm:px-8">
      {/* top edge highlight */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 flex justify-center">
        <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl">
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-600">
            Platform capabilities
          </p>
          <h2 className="text-[28px] font-bold tracking-[-0.03em] text-white sm:text-[36px]">
            Every layer. Perfected.
          </h2>
        </Motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <Motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06]
                         bg-zinc-900/30 p-6 transition-all duration-300
                         hover:border-white/[0.11] hover:bg-zinc-900/60"
            >
              {/* hover top shimmer */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-px
                            bg-gradient-to-r from-transparent via-blue-400/40 to-transparent
                            opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl
                            border border-blue-500/20 bg-blue-500/[0.08]"
              >
                <Icon size={17} className="text-blue-400" />
              </div>
              <h3 className="mb-2 text-[14px] font-bold text-white">{title}</h3>
              <p className="text-[12px] leading-relaxed text-zinc-500">{body}</p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   INTERACTIVE CARD (3-D tilt + glow)
═══════════════════════════════════════════ */
function InteractiveCard({ item }) {
  const ref  = useRef(null);
  const a    = ACCENTS[item.accent] ?? ACCENTS.blue;

  const rX   = useMotionValue(0);
  const rY   = useMotionValue(0);
  const sX   = useSpring(rX, { stiffness: 200, damping: 26 });
  const sY   = useSpring(rY, { stiffness: 200, damping: 26 });

  const [glow,  setGlow]  = useState({ x: 0, y: 0, op: 0 });
  const [hover, setHover] = useState(false);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rX.set(((e.clientY - r.top)  / r.height - 0.5) * -13);
    rY.set(((e.clientX - r.left) / r.width  - 0.5) *  13);
    setGlow({ x: e.clientX - r.left, y: e.clientY - r.top, op: 1 });
  }, [rX, rY]);

  const onLeave = useCallback(() => {
    rX.set(0); rY.set(0);
    setGlow((g) => ({ ...g, op: 0 }));
    setHover(false);
  }, [rX, rY]);

  return (
    <Motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setHover(true)}
      style={{ rotateX: sX, rotateY: sY, transformStyle: "preserve-3d" }}
      className="group relative w-full cursor-default overflow-hidden
                 rounded-[32px] border border-white/[0.08] bg-[#0b0b0b]
                 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.9)]"
    >
      {/* radial mouse glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(500px circle at ${glow.x}px ${glow.y}px,
                       rgba(${a.glow},0.10), transparent 70%)`,
          opacity: glow.op,
        }}
      />

      {/* top shimmer line */}
      <div
        className="absolute left-10 right-10 top-0 z-10 h-px
                   bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="relative z-10 p-8 sm:p-10 md:p-12">
        {/* header */}
        <div className="mb-7 flex items-start justify-between gap-4">
          <span
            className={`rounded-lg px-3 py-1 text-[10px] font-black uppercase
                        tracking-[0.2em] ring-1 ${a.pill}`}
          >
            {item.category}
          </span>
          <div
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center
                        rounded-xl ring-1 transition-all duration-300 ${a.icon}`}
          >
            <Zap size={15} />
          </div>
        </div>

        {/* title */}
        <h3
          className="mb-3 text-[36px] font-bold leading-none
                     tracking-[-0.04em] text-white sm:text-[44px] md:text-[50px]"
        >
          {item.title}
        </h3>

        {/* description */}
        <p className="mb-8 text-[13px] leading-[1.85] text-zinc-500 sm:text-[14px]">
          {item.description}
        </p>

        {/* features */}
        <div className="mb-10 flex flex-col gap-3.5">
          {item.features.map((f, i) => (
            <Motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="flex items-center gap-3 text-[13px] text-zinc-400"
            >
              <CheckCircle2
                size={14}
                className={`flex-shrink-0 transition-colors duration-300 ${
                  hover ? a.check : "text-zinc-700"
                }`}
              />
              {f}
            </Motion.div>
          ))}
        </div>

        {/* divider */}
        <div className="mb-7 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

        {/* price + cta */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-zinc-600">
              Starting at
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-[32px] font-bold tracking-tight text-white sm:text-[36px]">
                {item.price}
              </span>
              <span className="text-[14px] font-medium text-zinc-500">{item.period}</span>
            </div>
            <span className="text-[11px] text-zinc-700">
              Billed annually · cancel anytime
            </span>
          </div>

          <button
            className={`inline-flex w-full items-center justify-center gap-2
                        rounded-2xl bg-gradient-to-br ${a.btn} px-6 py-3.5
                        text-[13px] font-bold text-white shadow-lg
                        transition-all duration-300 hover:opacity-90
                        hover:shadow-xl active:scale-[0.97] sm:w-auto`}
          >
            Provision now
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </Motion.div>
  );
}

/* ═══════════════════════════════════════════
   GHOST / SIDE CARD
═══════════════════════════════════════════ */
function GhostCard() {
  return (
    <div
      className="w-full select-none rounded-[28px] border border-white/[0.04]
                 bg-zinc-900/10 p-9 opacity-[0.22] blur-[2px]"
    >
      <div className="mb-7 h-3 w-14 rounded-full bg-zinc-800" />
      <div className="mb-2 h-7 w-4/5 rounded-xl bg-zinc-800/70" />
      <div className="mb-8 h-7 w-3/5 rounded-xl bg-zinc-800/50" />
      <div className="flex flex-col gap-3">
        <div className="h-1.5 w-full   rounded-full bg-zinc-800/90" />
        <div className="h-1.5 w-4/5   rounded-full bg-zinc-800/70" />
        <div className="h-1.5 w-3/5   rounded-full bg-zinc-800/50" />
        <div className="h-1.5 w-2/5   rounded-full bg-zinc-800/30" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CAROUSEL
═══════════════════════════════════════════ */
function Carousel() {
  const [cur, setCur] = useState({ idx: 0, dir: 0 });

  const go = useCallback((newIdx) => {
    setCur((prev) => ({
      idx: (newIdx + products.length) % products.length,
      dir: newIdx >= prev.idx ? 1 : -1,
    }));
  }, []);

  const next = useCallback(() => go(cur.idx + 1), [cur.idx, go]);
  const prev = useCallback(() => go(cur.idx - 1), [cur.idx, go]);

  /* keyboard */
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [next, prev]);

  const getCard = (off) =>
    products[(cur.idx + off + products.length) % products.length];

  return (
    <div className="w-full max-w-6xl">
      {/* section label */}
      <Motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.6 }}
        className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-700"
      >
        Our solutions
      </Motion.p>

      {/* card row */}
      <div className="flex w-full items-center justify-center gap-4 lg:gap-6 xl:gap-8">
        {/* left ghost */}
        <div className="hidden w-[240px] flex-shrink-0 xl:block">
          <AnimatePresence mode="popLayout">
            <Motion.div
              key={`l-${cur.idx}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35 }}
            >
              <GhostCard />
            </Motion.div>
          </AnimatePresence>
        </div>

        {/* active */}
        <div className="z-10 w-full max-w-[520px] flex-shrink-0">
          <AnimatePresence mode="wait" custom={cur.dir}>
            <Motion.div
              key={cur.idx}
              custom={cur.dir}
              initial={{ opacity: 0, x: cur.dir * 70, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: cur.dir * -70, scale: 0.95 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <InteractiveCard item={getCard(0)} />
            </Motion.div>
          </AnimatePresence>
        </div>

        {/* right ghost */}
        <div className="hidden w-[240px] flex-shrink-0 xl:block">
          <AnimatePresence mode="popLayout">
            <Motion.div
              key={`r-${cur.idx}`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.35 }}
            >
              <GhostCard />
            </Motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* controls */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-5">
          <button
            onClick={prev}
            aria-label="Previous"
            className="group flex h-10 w-10 items-center justify-center rounded-full
                       border border-white/10 bg-zinc-900/60 backdrop-blur-xl
                       transition-all duration-300 hover:border-white/20
                       hover:bg-zinc-800 active:scale-90"
          >
            <ChevronLeft
              size={18}
              className="text-zinc-500 transition-colors group-hover:text-white"
            />
          </button>

          {/* dots */}
          <div className="flex items-center gap-2">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-500 ${
                  cur.idx === i
                    ? "w-8 bg-blue-500"
                    : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next"
            className="group flex h-10 w-10 items-center justify-center rounded-full
                       border border-white/10 bg-zinc-900/60 backdrop-blur-xl
                       transition-all duration-300 hover:border-white/20
                       hover:bg-zinc-800 active:scale-90"
          >
            <ChevronRight
              size={18}
              className="text-zinc-500 transition-colors group-hover:text-white"
            />
          </button>
        </div>

        {/* counter */}
        <span className="tabular-nums text-[11px] font-medium text-zinc-700">
          {String(cur.idx + 1).padStart(2, "0")} /{" "}
          {String(products.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CTA SECTION
═══════════════════════════════════════════ */
function CTA() {
  const [email, setEmail] = useState("");
  const [done,  setDone]  = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  return (
    <section className="relative z-10 overflow-hidden border-t border-white/[0.05] px-5 py-28 sm:px-8 sm:py-36">
      {/* bg glows */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[520px] w-[720px]
                     -translate-x-1/2 -translate-y-1/2 rounded-full
                     bg-blue-600/[0.05] blur-[150px]"
        />
        <div
          className="absolute left-1/2 top-1/2 h-[220px] w-[340px]
                     -translate-x-1/2 -translate-y-1/2 rounded-full
                     bg-indigo-500/[0.06] blur-[80px]"
        />
      </div>

      {/* top edge */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 flex justify-center">
        <div className="h-px w-2/5 bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[540px] text-center">
        {/* pill */}
        <Motion.span
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border
                     border-white/10 bg-white/[0.04] px-5 py-2 text-[10px]
                     font-bold uppercase tracking-[0.24em] text-white/40 backdrop-blur-xl"
        >
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400
                       shadow-[0_0_8px_rgba(96,165,250,0.9)]"
          />
          14-day free trial
        </Motion.span>

        <Motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-5 text-[34px] font-bold tracking-[-0.04em] text-white sm:text-[46px]"
        >
          Ready to integrate?
        </Motion.h2>

        <Motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          className="mb-10 text-[15px] leading-relaxed text-white/30"
        >
          Join 10,000+ engineering teams already on Frontier.
          <br className="hidden sm:block" />
          No credit card required. Cancel anytime.
        </Motion.p>

        {/* form */}
        <Motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-white/[0.08]
                     bg-zinc-900/50 p-1.5 shadow-[0_0_100px_rgba(0,0,0,0.55)]
                     backdrop-blur-2xl ring-1 ring-white/[0.04]"
        >
          <AnimatePresence mode="wait">
            {done ? (
              <Motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-3 py-4"
              >
                <CheckCircle2 size={17} className="text-blue-400" />
                <span className="text-[14px] font-semibold text-white">
                  You're on the list — check your inbox!
                </span>
              </Motion.div>
            ) : (
              <Motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="work@company.com"
                  className="flex-grow rounded-xl bg-transparent px-5 py-3.5
                             text-[14px] text-white placeholder:text-white/20
                             focus:outline-none"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2
                             rounded-xl bg-white px-6 py-3.5 text-[13px] font-bold
                             text-black transition-all duration-300
                             hover:bg-blue-500 hover:text-white active:scale-[0.97]"
                >
                  Get full access
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </button>
              </Motion.div>
            )}
          </AnimatePresence>
        </Motion.form>

        {/* trust row */}
        <Motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6"
        >
          {["SOC 2 Type II", "ISO 27001", "GDPR ready", "99.999% SLA"].map((t) => (
            <span
              key={t}
              className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-700"
            >
              <CheckCircle2 size={11} className="text-zinc-800" />
              {t}
            </span>
          ))}
        </Motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center
                        justify-center px-5 pt-16 pb-24 sm:px-8">
      <div className="flex w-full max-w-7xl flex-col items-center">
        {/* headline block */}
        <Motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-center"
        >
          {/* status pill */}
          <div
            className="mb-9 inline-flex items-center gap-3 rounded-full border
                       border-white/10 bg-zinc-900/60 px-5 py-2 backdrop-blur-xl"
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping
                           rounded-full bg-blue-400 opacity-75"
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-zinc-400">
              System Ready 2.0
            </span>
          </div>

          {/* headline */}
          <h1
            className="text-[58px] font-bold leading-[0.88] tracking-[-0.04em]
                       text-white sm:text-[76px] md:text-[92px] lg:text-[108px]"
          >
            <span className="relative inline-block pb-3">
              <span
                className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500
                           bg-clip-text text-transparent"
              >
                Built for
              </span>
              {/* underline */}
              <Motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.62, duration: 0.85, ease: "easeOut" }}
                className="absolute bottom-0 left-0 right-0 h-[2px] origin-left
                           rounded-full bg-gradient-to-r from-blue-400/0
                           via-cyan-300 to-blue-500/0"
              />
              {/* glow blur */}
              <Motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.9, ease: "easeOut" }}
                className="absolute -bottom-1 left-[8%] right-[8%] h-[14px]
                           origin-left rounded-full bg-cyan-400/15 blur-2xl"
              />
            </span>

            <br />
            <span className="text-white/90">the frontier</span>
            <span className="text-blue-500">.</span>
          </h1>

          {/* sub */}
          <Motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.85 }}
            className="mx-auto mt-7 max-w-[500px] text-[15px] leading-[1.9]
                       text-white/30 sm:text-[17px]"
          >
            Standardized infrastructure for world-class engineering teams.
            Precision tools for modern deployment at any scale.
          </Motion.p>

          {/* hero CTAs */}
          <Motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.75 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <button
              className="w-full rounded-2xl bg-white px-8 py-3.5 text-[14px]
                         font-bold text-black transition-all duration-300
                         hover:bg-blue-500 hover:text-white active:scale-95 sm:w-auto"
            >
              Start free trial
            </button>
            <button
              className="inline-flex w-full items-center justify-center gap-2
                         rounded-2xl border border-white/10 px-8 py-3.5
                         text-[14px] font-medium text-zinc-400 transition-all
                         duration-300 hover:border-white/20 hover:text-white sm:w-auto"
            >
              View documentation
              <ArrowRight size={13} />
            </button>
          </Motion.div>
        </Motion.div>

        {/* stats */}
        <StatGrid />

        {/* carousel */}
        <div className="mt-20 flex w-full flex-col items-center">
          <Carousel />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ROOT
═══════════════════════════════════════════ */
export default function PremiumUI() {
  return (
    <div
      className="relative bg-[#050505] font-sans text-zinc-100
                 selection:bg-white selection:text-black overflow-x-hidden"
    >
      <AmbientBg />
      <Hero />
      <Pillars />
      <CTA />
    </div>
  );
}