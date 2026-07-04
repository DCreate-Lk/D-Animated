import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const services = [
  {
    name: "Web Development",
    slug: "web-development",
    description:
      "Scalable web platforms with clean architecture and fast performance.",
    number: "01",
    color: "#60A5FA",
  },
  {
    name: "Mobile Apps",
    slug: "mobile-apps",
    description:
      "Cross-platform apps with refined UX and production-ready reliability.",
    number: "02",
    color: "#818CF8",
  },
  {
    name: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "Design systems and interfaces that balance visual impact with usability.",
    number: "03",
    color: "#34D399",
  },
  {
    name: "Growth Strategy",
    slug: "growth-strategy",
    description:
      "Data-led optimization to improve conversion, engagement, and retention.",
    number: "04",
    color: "#F472B6",
  },
  {
    name: "Cloud Solutions",
    slug: "cloud-solutions",
    description:
      "Secure cloud infrastructure and deployment pipelines built for scale.",
    number: "05",
    color: "#38BDF8",
  },
  {
    name: "AI & Automation",
    slug: "ai-automation",
    description:
      "Automation workflows and AI integrations that streamline operations.",
    number: "06",
    color: "#A78BFA",
  },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-black px-6 py-28 sm:px-10 lg:px-16"
    >
      {/* ── Ambient Glows ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/[0.07] blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/[0.07] blur-[120px]" />
      </div>

      {/* ── Dot Grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl">

        {/* ══════════ HEADER ══════════ */}
        <div className="mb-16 flex flex-col items-center text-center">

          {/* Label pill */}
          <Motion.span
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/55 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.7)]" />
            Our Services
          </Motion.span>

          {/* Headline */}
          <Motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            viewport={{ once: true }}
            className="
            text-5xl md:text-[7rem] font-sans font-bold tracking-tighter mb-8 leading-[0.95] text-white "
          >
            {/* Gradient word with underline */}
            <span className="relative inline-block pb-2">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                End-to-end
              </span>

              {/* Sharp line */}
              <Motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.65, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 right-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-blue-400/0 via-cyan-300 to-blue-500/0"
              />

              {/* Glow blur */}
              <Motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.58, duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute -bottom-1 left-[10%] right-[10%] h-[8px] origin-left rounded-full bg-cyan-400/20 blur-md"
              />
            </span>{" "}
            digital capabilities
            <br className="hidden sm:block" /> built for{" "}
            <span className="relative inline-block pb-2">
              <span>
                modern
              </span>

              
            </span>
            <span className="text-blue-500">.</span>
          </Motion.h2>

          {/* Sub description */}
          <Motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            viewport={{ once: true }}
            className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.85] text-white/40 sm:text-base"
          >
            From product design to cloud delivery, we provide focused service
            lines that support business growth and technical excellence.
          </Motion.p>
        </div>

        {/* ══════════ SERVICE LIST ══════════ */}
        <div className="relative">
          {/* Top border */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {services.map((service, index) => (
            <Motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              viewport={{ once: true }}
              onClick={() => navigate(`/service/${service.slug}`)}
              className="group relative cursor-pointer overflow-hidden"
            >
              {/* Row hover bg */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse at 0% 50%, ${service.color}08, transparent 60%)`,
                }}
              />

              {/* Left accent bar */}
              <Motion.div
                className="absolute left-0 top-[15%] bottom-[15%] w-[2px] origin-center rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100"
                style={{ backgroundColor: service.color }}
              />

              <div className="relative flex items-center justify-between px-6 py-7 sm:py-8">
                {/* Left: number + text */}
                <div className="flex items-center gap-6 sm:gap-8">
                  {/* Number */}
                  <span
                    className="hidden text-[13px] font-bold tabular-nums tracking-widest opacity-25 transition-opacity duration-300 group-hover:opacity-70 sm:block"
                    style={{ color: service.color }}
                  >
                    {service.number}
                  </span>

                  {/* Text block */}
                  <div>
                    <h3
                      className="text-[22px] font-bold leading-none tracking-tight text-white/80 transition-colors duration-300 group-hover:text-white sm:text-[28px] lg:text-[34px]"
                    >
                      {service.name}
                    </h3>
                    <p className="mt-2 max-w-lg text-[13px] leading-[1.7] text-white/35 transition-colors duration-300 group-hover:text-white/50 sm:text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="ml-6 flex flex-shrink-0 items-center gap-3">
                  <span className="hidden text-[13px] font-semibold text-white/30 transition-all duration-300 group-hover:text-white/70 sm:block">
                    View More
                  </span>

                  {/* Arrow circle */}
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] transition-all duration-300 group-hover:scale-110 group-hover:border-white/20 group-hover:bg-white/[0.08]"
                    style={{
                      boxShadow: `0 0 0 0 ${service.color}00`,
                    }}
                  >
                    <ArrowRight
                      size={15}
                      className="text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white/80"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}