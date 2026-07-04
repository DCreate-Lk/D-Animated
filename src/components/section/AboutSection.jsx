import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
} from "react-icons/si";

//////////////////// FLOATING TECH BADGE ////////////////////
const TechBadge = ({ icon: Icon, name, color, className }) => (
  <Motion.div
    initial={{ opacity: 0, scale: 0.75, y: 18 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    whileHover={{ scale: 1.08, y: -4 }}
    transition={{ duration: 0.55, type: "spring", stiffness: 180, damping: 16 }}
    viewport={{ once: true }}
    className={`absolute z-20 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.45)] select-none ${className}`}
  >
    <Icon size={18} style={{ color }} />
    <span className="text-xs font-semibold tracking-wide text-white/75">
      {name}
    </span>
  </Motion.div>
);

//////////////////// MAIN COMPONENT ////////////////////
export default function AboutSection() {
  const navigate = useNavigate();

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-black px-6 py-28 sm:px-10 lg:px-16"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[560px] w-[560px] rounded-full bg-blue-600/[0.08] blur-[150px]" />
        <div className="absolute bottom-[-80px] right-1/4 h-[460px] w-[460px] rounded-full bg-indigo-600/[0.08] blur-[130px]" />
        <div className="absolute top-1/2 -left-16 h-[320px] w-[320px] rounded-full bg-cyan-600/[0.06] blur-[100px]" />
      </div>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* LEFT CONTENT */}
        <div className="flex flex-col">
          {/* Label */}
          <Motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)] animate-pulse" />
              About D Create
            </span>
          </Motion.div>

          {/* Headline */}
          <Motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-8 text-[42px] font-bold leading-[1.05] tracking-[-0.035em] text-white sm:text-[56px] lg:text-[64px]"
          >
            We craft{" "}
            <span className="relative inline-block pb-2">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                powerful
              </span>

              {/* Sharp underline */}
              <Motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 right-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-blue-400/0 via-cyan-300 to-blue-500/0"
              />

              {/* Glow underline */}
              <Motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.52, duration: 0.75, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute -bottom-1 left-[10%] right-[10%] h-[8px] origin-left rounded-full bg-cyan-400/20 blur-md"
              />
            </span>
            <br />
            digital
            <br />
            experiences.
          </Motion.h2>

          {/* Description */}
          <Motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-10 flex flex-col gap-4"
          >
            <p className="max-w-lg text-base leading-[1.8] text-white/55 sm:text-[17px]">
              At <span className="font-semibold text-white">D Create</span>, we
              specialize in modern web development, mobile apps, UI/UX design,
              and AI-powered digital solutions.
            </p>
            <p className="max-w-lg text-base leading-[1.8] text-white/35">
              We help businesses grow with scalable systems, automation, and
              premium digital experiences built for performance.
            </p>
          </Motion.div>

          {/* CTA */}
          <Motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => navigate("/about")}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:gap-4 hover:bg-white/95 hover:shadow-[0_0_50px_rgba(255,255,255,0.12)] active:scale-[0.97]"
            >
              Explore Us
              <HiArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </Motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <Motion.div
          initial={{ opacity: 0, x: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.95, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center"
        >
          {/* Glow behind image */}
          <div className="absolute inset-0 scale-90 rounded-[28px] bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-cyan-500/10 blur-[50px]" />

          {/* Main image */}
          <div className="relative w-full overflow-hidden rounded-[28px] border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.65)]">
            {/* Top bar */}
            <div className="absolute left-0 right-0 top-0 z-10 flex items-center gap-2 border-b border-white/[0.06] bg-black/50 px-5 py-4 backdrop-blur-xl">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E] shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840] shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
              <span className="ml-5 text-[11px] font-medium tracking-[0.15em] text-white/25">
                dcreate.studio
              </span>
            </div>

            <img
              src="/images/bgr.jpg"
              alt="D Create Studio"
              className="aspect-[4/3] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </div>

          {/* Tech badges */}
          <TechBadge
            icon={SiReact}
            name="React"
            color="#61DAFB"
            className="-left-4 -top-5"
          />
          <TechBadge
            icon={SiNextdotjs}
            name="Next.js"
            color="#FFFFFF"
            className="-top-5 right-12"
          />
          <TechBadge
            icon={SiTailwindcss}
            name="Tailwind"
            color="#06B6D4"
            className="-left-10 top-[35%]"
          />
          <TechBadge
            icon={SiNodedotjs}
            name="Node.js"
            color="#339933"
            className="-right-8 top-[35%]"
          />
          <TechBadge
            icon={SiTypescript}
            name="TypeScript"
            color="#3178C6"
            className="-bottom-5 left-8"
          />
          <TechBadge
            icon={SiPython}
            name="Python"
            color="#3776AB"
            className="-bottom-5 right-8"
          />

          {/* Live indicator */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.75, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            viewport={{ once: true }}
            className="absolute bottom-8 left-8 flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-white/65">
              Available for projects
            </span>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
}