import { motion as Motion } from "framer-motion";
import { Fingerprint, UserRound, PartyPopper, ArrowRight } from "lucide-react";

export default function AiBusinessSection() {
  const capabilityCards = [
    {
      title: "We Believe in Long-Term Trust",
      description:
        "Every project is built with transparency, accountability, and consistent communication from day one.",
      icon: UserRound,
      color: "#60A5FA",
      glow: "rgba(96,165,250,0.15)",
    },
    {
      title: "Security Is a Core Commitment",
      description:
        "From architecture to deployment, we protect your data and systems with secure-by-design practices.",
      icon: Fingerprint,
      color: "#818CF8",
      glow: "rgba(129,140,248,0.15)",
    },
    {
      title: "Client Satisfaction Drives Our Delivery",
      description:
        "We focus on quality execution, measurable outcomes, and support that keeps clients confident.",
      icon: PartyPopper,
      color: "#34D399",
      glow: "rgba(52,211,153,0.15)",
    },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-black px-6 py-28 text-white sm:px-10 lg:px-16 overflow-hidden">

      {/* ── Ambient Glows ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/[0.08] blur-[140px]" />
        <div className="absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-indigo-600/[0.08] blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-[300px] w-[300px] rounded-full bg-cyan-600/[0.06] blur-[100px]" />
      </div>

      {/* ── Dot Grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-20">

        {/* ══════════ LEFT — CARDS ══════════ */}
        <div className="flex flex-col gap-5">
          {capabilityCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Motion.div
                key={card.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: 6 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                className="group relative cursor-default overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl"
                style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.3)" }}
              >
                {/* Hover radial glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at 0% 50%, ${card.glow}, transparent 70%)`,
                  }}
                />

                {/* Top shimmer border */}
                <div
                  className="absolute left-6 right-6 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${card.color}70, transparent)`,
                  }}
                />

                <div className="relative flex items-start gap-5">
                  {/* Icon */}
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border transition-all duration-300"
                    style={{
                      borderColor: `${card.color}30`,
                      backgroundColor: `${card.color}12`,
                    }}
                  >
                    <Icon
                      className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: card.color }}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1.5 pt-0.5">
                    <h3 className="text-[15px] font-semibold leading-snug text-white/90">
                      {card.title}
                    </h3>
                    <p className="text-[13px] leading-[1.75] text-white/40">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Motion.div>
            );
          })}
        </div>

        {/* ══════════ RIGHT — CONTENT ══════════ */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col"
        >
          {/* Label pill */}
          <Motion.span
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/55 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.7)]" />
            Our Core Beliefs
          </Motion.span>

          {/* ── Headline ── */}
          <Motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-6 text-[40px] font-bold leading-[1.06] tracking-[-0.035em] text-white sm:text-[50px] lg:text-[58px]"
          >
            Built on{" "}

            {/* "Security" — gradient text + animated underline */}
            <span className="relative inline-block pb-2">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Security
              </span>

              {/* Sharp underline */}
              <Motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.65, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 right-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-blue-400/0 via-cyan-300 to-blue-500/0"
              />

              {/* Soft glow underline */}
              <Motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.58, duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute -bottom-1 left-[10%] right-[10%] h-[8px] origin-left rounded-full bg-cyan-400/20 blur-md"
              />
            </span>

            {","}
            <br />

            {/* "Clients" — gradient text + animated underline */}
            Trusted by{" "}
            <span>
              <span>
                Clients
              </span>
            </span>

            <span className="text-blue-500">.</span>
          </Motion.h2>

          {/* Description */}
          <Motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-10 max-w-md text-[15px] leading-[1.85] text-white/40 sm:text-base"
          >
            Our belief is simple — deliver secure, reliable solutions that
            create real value and lasting client satisfaction. Every engagement
            is shaped around trust, performance, and professional execution.
          </Motion.p>

          {/* Stats */}
          <Motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-10 grid max-w-sm grid-cols-2 gap-4"
          >
            {[
              { value: "98%", label: "Client Satisfaction", color: "#00B9E8" },
              { value: "24h", label: "Support Response", color: "#00B9E8" },
            ].map((stat) => (
              <Motion.div
                key={stat.label}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative cursor-default overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-5 backdrop-blur-xl"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at 50% 110%, ${stat.color}18, transparent 70%)`,
                  }}
                />

                {/* Bottom border accent */}
                <div
                  className="absolute bottom-0 left-4 right-4 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.color}60, transparent)`,
                  }}
                />

                <p
                  className="relative text-3xl font-bold tracking-tight"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="relative mt-1.5 text-[13px] text-white/40">
                  {stat.label}
                </p>
              </Motion.div>
            ))}
          </Motion.div>

          {/* CTA Button */}
          <Motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button
              onClick={scrollToContact}
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:gap-4 hover:bg-white/95 hover:shadow-[0_0_50px_rgba(255,255,255,0.12)] active:scale-[0.97]"
            >
              Get in Touch
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </Motion.div>
        </Motion.div>

      </div>
    </section>
  );
}