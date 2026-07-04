import { useState, useRef } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Command,
} from "lucide-react";
import { products } from "../data/products.js";

export default function PremiumUI() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % products.length);
  };
  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const getCard = (offset) =>
    products[(index + offset + products.length) % products.length];

  return (
    <div className="bg-[#030303] text-zinc-100 min-h-screen font-sans selection:bg-white selection:text-black overflow-x-hidden">

      {/* ══════════ HERO ══════════ */}
      <section className="relative px-6 pt-16 pb-24 md:pt-24 md:pb-36 z-10">

        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full bg-blue-600/[0.07] blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/[0.06] blur-[130px]" />
        </div>

        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center">

          {/* ── Header ── */}
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 text-center"
          >
            {/* Status pill */}
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-zinc-900/60 px-5 py-2 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                System Ready 2.0
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-8 text-6xl md:text-[7rem] font-bold tracking-tighter mb-8 leading-[0.85] text-white">
              {/* "Built for" — gradient + underline */}
              <span className="relative inline-block pb-3">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  Built for
                </span>

                {/* Sharp underline */}
                <Motion.span
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-blue-400/0 via-cyan-300 to-blue-500/0"
                />

                {/* Glow blur */}
                <Motion.span
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.63, duration: 0.75, ease: "easeOut" }}
                  className="absolute -bottom-1 left-[8%] right-[8%] h-[10px] origin-left rounded-full bg-cyan-400/20 blur-lg"
                />
              </span>

              <br />

              {/* "the frontier" */}
              <span className="text-white/90">the frontier</span>
              <span className="text-blue-500">.</span>
            </h1>

            <Motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mx-auto max-w-xl text-base leading-[1.85] text-white/35 md:text-[17px]"
            >
              Standardized infrastructure for world-class engineering teams.
              Precision tools for modern deployment.
            </Motion.p>
          </Motion.div>

          {/* ── Carousel ── */}
          <div className="relative flex w-full max-w-6xl flex-col items-center">
            <div className="flex w-full items-center justify-center gap-6 md:gap-10">

              {/* Left ghost card */}
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="hidden w-[280px] flex-shrink-0 xl:block"
              >
                <StaticCard item={getCard(-1)} />
              </Motion.div>

              {/* Active card */}
              <div className="z-10 w-full max-w-[500px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <Motion.div
                    key={index}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 50, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: direction * -50, scale: 0.97 }}
                    transition={{ duration: 0.38, ease: "circOut" }}
                  >
                    <InteractiveCard item={getCard(0)} />
                  </Motion.div>
                </AnimatePresence>
              </div>

              {/* Right ghost card */}
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="hidden w-[280px] flex-shrink-0 xl:block"
              >
                <StaticCard item={getCard(1)} />
              </Motion.div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center gap-5">
              <button
                onClick={prev}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-900/60 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-zinc-800"
              >
                <ChevronLeft
                  size={20}
                  className="text-zinc-500 transition-colors group-hover:text-white"
                />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {products.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === i
                        ? "w-8 bg-blue-500"
                        : "w-2 bg-zinc-700 hover:bg-zinc-500"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-900/60 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-zinc-800"
              >
                <ChevronRight
                  size={20}
                  className="text-zinc-500 transition-colors group-hover:text-white"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER CTA ══════════ */}
      <section className="relative border-t border-white/[0.05] px-6 py-20">
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="h-[300px] w-[600px] rounded-full bg-blue-600/[0.06] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-lg text-center">
          {/* Label */}
          <Motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 backdrop-blur-xl"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
            Start Free Trial
          </Motion.span>

          <Motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-4 text-[36px] font-bold tracking-[-0.03em] text-white sm:text-[42px]"
          >
            Ready to integrate?
          </Motion.h2>

          <Motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-10 text-[15px] leading-relaxed text-white/35"
          >
            Start your 14-day free trial. No credit card required.
          </Motion.p>

          {/* Email input row */}
          <Motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-zinc-900/50 p-2 shadow-[0_0_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl ring-1 ring-white/[0.04] sm:flex-row"
          >
            <input
              type="email"
              placeholder="work@email.com"
              className="flex-grow bg-transparent px-5 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none"
            />
            <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:bg-blue-500 hover:text-white active:scale-[0.97]">
              Get Full Access
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>
          </Motion.div>
        </div>
      </section>
    </div>
  );
}

/* ══════════ INTERACTIVE CARD ══════════ */
function InteractiveCard({ item }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glow, setGlow] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotateX((y / rect.height - 0.5) * -12);
    setRotateY((x / rect.width - 0.5) * 12);
    setGlow({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlow((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <Motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 160, damping: 22 }}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative w-full overflow-hidden rounded-[36px] border border-white/[0.08] bg-[#0a0a0a] p-10 shadow-[0_0_80px_-20px_rgba(0,0,0,1)] md:p-12"
    >
      {/* Mouse-follow glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(420px circle at ${glow.x}px ${glow.y}px, rgba(59,130,246,0.09), transparent 80%)`,
          opacity: glow.opacity,
        }}
      />

      {/* Top border shimmer */}
      <div className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 flex flex-col">
        {/* Category + icon */}
        <div className="mb-5 flex items-center justify-between">
          <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
            {item.category}
          </span>
          <Command
            size={18}
            className="text-zinc-700 transition-colors duration-300 group-hover:text-blue-500"
          />
        </div>

        {/* Title */}
        <h3 className="mb-3 text-[40px] font-bold leading-[1.0] tracking-[-0.035em] text-white md:text-[48px]">
          {item.title}
        </h3>

        {/* Description */}
        <p className="mb-8 text-[14px] leading-[1.75] text-zinc-500">
          {item.description}
        </p>

        {/* Features */}
        <div className="mb-10 flex flex-col gap-3.5">
          {item.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-4 text-sm text-zinc-400">
              <div className="h-[2px] w-4 flex-shrink-0 rounded-full bg-blue-500/70" />
              {feature}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Price + CTA */}
        <div className="flex items-end justify-between">
          <div>
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Project Price
            </span>
            <span className="text-[28px] font-bold tracking-tight text-white md:text-[32px]">
              {item.price}
            </span>
          </div>

          <button className="group/btn inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black transition-all duration-300 hover:bg-blue-500 hover:text-white active:scale-[0.97]">
            Provision
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </Motion.div>
  );
}

/* ══════════ STATIC GHOST CARD ══════════ */
function StaticCard({ item }) {
  return (
    <div className="w-full rounded-[36px] border border-white/[0.04] bg-zinc-900/[0.15] p-10 opacity-30 blur-[1.5px]">
      <div className="mb-10 h-3.5 w-16 rounded-md bg-zinc-800" />
      <h3 className="mb-5 text-2xl font-bold tracking-tight text-zinc-700">
        {item.title}
      </h3>
      <div className="flex flex-col gap-3">
        <div className="h-1.5 w-full rounded-full bg-zinc-900" />
        <div className="h-1.5 w-3/4 rounded-full bg-zinc-900" />
        <div className="h-1.5 w-1/2 rounded-full bg-zinc-900" />
      </div>
    </div>
  );
}