import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sophia Carter",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    quote:
      "This platform transformed our workflow completely. The attention to detail and premium experience exceeded every expectation.",
    rating: 5,
  },
  {
    id: 2,
    name: "Daniel Brooks",
    role: "Startup Founder",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    quote:
      "The interface feels incredibly polished and intuitive. It has the same level of refinement you would expect from Apple.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Marketing Lead",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
    quote:
      "Beautiful, seamless, and thoughtfully crafted. Every interaction feels smooth and premium.",
    rating: 4,
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    quote:
      "A stunning experience from start to finish. The visual design alone impressed our entire team.",
    rating: 5,
  },
  {
    id: 5,
    name: "Ava Martinez",
    role: "Business Consultant",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400&auto=format&fit=crop",
    quote:
      "The clean design and elegant motion made our brand feel more premium instantly.",
    rating: 5,
  },
];

export default function PremiumTestimonials() {
  const [active, setActive] = useState(2);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
      setProgressKey((k) => k + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goTo = (index) => {
    setActive(index);
    setIsAutoPlaying(false);
    setProgressKey((k) => k + 1);
  };

  const goPrev = () =>
    goTo(active === 0 ? testimonials.length - 1 : active - 1);
  const goNext = () => goTo((active + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="relative min-h-screen overflow-hidden bg-[#050505] px-6 py-28 selection:bg-white/20 flex items-center justify-center"
    >
      {/* ── Ambient glows ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/[0.06] blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-indigo-600/[0.06] blur-[130px]" />
      </div>

      {/* ── Dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative w-full max-w-6xl">

        {/* ══════════ HEADER ══════════ */}
        <div className="mb-20 flex flex-col items-center text-center">

          {/* Label pill */}
          <Motion.span
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/45 backdrop-blur-xl"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.7)]" />
            Client Stories
          </Motion.span>

          {/* Headline */}
          <Motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-[7rem] font-sans font-bold tracking-tighter mb-6 leading-[0.85] text-white mb-6"
          >
            Voices of{" "}

            {/* "Innovation" — gradient + underline */}
            <span className="relative inline-block pb-3">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Innovation
              </span>

              {/* Sharp underline */}
              <Motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 right-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-blue-400/0 via-cyan-300 to-blue-500/0"
              />

              {/* Glow blur */}
              <Motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.58, duration: 0.75, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute -bottom-1 left-[8%] right-[8%] h-[10px] origin-left rounded-full bg-cyan-400/20 blur-lg"
              />
            </span>

            <span className="text-blue-500">.</span>
          </Motion.h2>

          {/* Subtitle */}
          <Motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            viewport={{ once: true }}
            className="mx-auto max-w-lg text-[15px] leading-[1.85] text-white/35 sm:text-base"
          >
            Partnering with world-class teams to redefine digital boundaries
            through precision and craft.
          </Motion.p>
        </div>

        {/* ══════════ MAIN CONTENT ══════════ */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">

          {/* ── Left: Image Stack ── */}
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex h-[420px] items-center justify-center overflow-hidden lg:col-span-5"
          >
            {testimonials.map((item, index) => {
              const isActive = index === active;
              const offset = index - active;
              const absOffset = Math.abs(offset);

              return (
                <div
                  key={item.id}
                  onClick={() => goTo(index)}
                  className="absolute cursor-pointer transition-all duration-700 ease-out"
                  style={{
                    transform: `translateX(${offset * 130}px) scale(${isActive ? 1 : 0.82})`,
                    zIndex: isActive ? 30 : 20 - absOffset,
                    opacity: absOffset > 2 ? 0 : isActive ? 1 : 0.35,
                    filter: isActive ? "none" : `blur(${absOffset * 0.8}px)`,
                  }}
                >
                  <div
                    className="overflow-hidden rounded-3xl border shadow-2xl transition-all duration-700"
                    style={{
                      borderColor: isActive
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(255,255,255,0.05)",
                      boxShadow: isActive
                        ? "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)"
                        : "0 8px 30px rgba(0,0,0,0.4)",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-80 w-60 object-cover"
                      draggable={false}
                    />
                  </div>

                  {/* Active name tag */}
                  {isActive && (
                    <Motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-white/10 bg-black/70 px-4 py-1.5 backdrop-blur-xl"
                    >
                      <span className="text-[12px] font-semibold text-white/80">
                        {item.name}
                      </span>
                    </Motion.div>
                  )}
                </div>
              );
            })}
          </Motion.div>

          {/* ── Right: Content Card ── */}
          <Motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.025] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:p-12">

              {/* Corner glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/[0.07] blur-[80px]" />

              {/* Top border shimmer */}
              <div className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Animated content swap */}
              <Motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Progress bars */}
                <div className="mb-8 flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className="group relative h-1 flex-1 overflow-hidden rounded-full bg-white/[0.08]"
                    >
                      {i === active && isAutoPlaying ? (
                        <Motion.div
                          key={progressKey}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5, ease: "linear" }}
                          className="absolute inset-y-0 left-0 rounded-full bg-white"
                        />
                      ) : (
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-white transition-all duration-300"
                          style={{ width: i < active ? "100%" : "0%" }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Stars */}
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 24 24"
                      className={`h-5 w-5 ${
                        i < testimonials[active].rating
                          ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                          : "fill-none text-white/10"
                      }`}
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                {/* Quote mark */}
                <svg
                  className="mb-6 h-9 w-9 text-white/15"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-3c0-1.105.895-2 2-2h3c1.105 0 2-.895 2-2V9c0-1.105-.895-2-2-2h-4c-1.105 0-2 .895-2 2v6h-2V9c0-2.761 2.239-5 5-5h3c2.761 0 5 2.239 5 5v5c0 3.866-3.134 7-7 7h-3ZM0 21v-3c0-1.105.895-2 2-2h3v-2c0-1.105-.895-2-2-2H1a1 1 0 0 1-1-1V9c0-2.761 2.239-5 5-5h3c2.761 0 5 2.239 5 5v6h-2V9c0-1.105-.895-2-2-2H5c-1.105 0-2 .895-2 2v5c0 3.866 3.134 7 7 7H0Z" />
                </svg>

                {/* Quote text */}
                <p className="mb-10 text-[22px] font-light leading-[1.6] tracking-[-0.01em] text-white/85 md:text-[26px]">
                  "{testimonials[active].quote}"
                </p>

                {/* Author + controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[active].image}
                      alt={testimonials[active].name}
                      className="h-11 w-11 rounded-full border border-white/10 object-cover"
                    />
                    <div>
                      <p className="text-[15px] font-semibold text-white">
                        {testimonials[active].name}
                      </p>
                      <p className="text-[13px] text-white/35">
                        {testimonials[active].role}
                      </p>
                    </div>
                  </div>

                  {/* Nav buttons */}
                  <div className="flex gap-2.5">
                    <button
                      onClick={goPrev}
                      className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08]"
                    >
                      <svg
                        className="h-4 w-4 text-white/50 transition-colors group-hover:text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={goNext}
                      className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08]"
                    >
                      <svg
                        className="h-4 w-4 text-white/50 transition-colors group-hover:text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Motion.div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}