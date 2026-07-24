import { useParams, useNavigate } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaShieldAlt,
  FaStar,
  FaRocket,
  FaUsers,
  FaClipboardCheck,
  FaAward,
  FaLayerGroup,
  FaRegLightbulb,
  FaClock,
} from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { getServiceBySlug } from "../data/services";
import { projects } from "../data/projects";

/* ═══════════════════════════════════════════
   ANIMATION PRESETS
═══════════════════════════════════════════ */
const spring = { type: "spring", stiffness: 100, damping: 20, mass: 1 };

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { ...spring } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

const cardIn = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: spring },
};

/* ═══════════════════════════════════════════
   DEFAULTS
═══════════════════════════════════════════ */
const defaultStats = [
  { label: "Quality Control",     value: "99.9%",   icon: FaShieldAlt },
  { label: "Client Satisfaction", value: "100%",    icon: FaStar      },
  { label: "On-Time Delivery",    value: "24 / 7",  icon: FaClock     },
  { label: "Support Standard",    value: "Premium", icon: FaAward     },
];

const defaultPoints = [
  {
    title: "Strategic Planning",
    desc:  "A focused roadmap aligned with your goals, audience, and growth direction.",
    icon:  FaRegLightbulb,
  },
  {
    title: "High-Performance Delivery",
    desc:  "Fast, stable, and scalable execution designed for modern business needs.",
    icon:  FaRocket,
  },
  {
    title: "Quality Assurance",
    desc:  "Testing, review, and refinement at every stage for a polished outcome.",
    icon:  FaClipboardCheck,
  },
  {
    title: "Future-Ready Architecture",
    desc:  "Built to grow with your business, brand, and digital operations.",
    icon:  FaLayerGroup,
  },
];

/* ═══════════════════════════════════════════
   AMBIENT BACKGROUND
═══════════════════════════════════════════ */
function AmbientBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-[20%] left-1/2 h-[60vh] w-[60vh] -translate-x-1/2
                      rounded-full bg-violet-600/[0.11] blur-[160px]" />
      <div className="absolute right-[8%] top-[35%] h-[38vh] w-[38vh] rounded-full
                      bg-blue-600/[0.07] blur-[130px]" />
      <div className="absolute bottom-[8%] left-[6%] h-[28vh] w-[28vh] rounded-full
                      bg-indigo-500/[0.06] blur-[110px]" />
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   STAT CARD
═══════════════════════════════════════════ */
function StatCard({ item }) {
  const Icon = item.icon;
  return (
    <Motion.div
      variants={cardIn}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08]
                 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300
                 hover:border-white/[0.14] hover:bg-white/[0.055]"
    >
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px
                      bg-gradient-to-r from-transparent via-white/20 to-transparent
                      opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
            {item.label}
          </p>
          <p className="mt-2 text-[22px] font-bold tracking-tight text-white">
            {item.value}
          </p>
        </div>
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center
                        rounded-xl border border-white/[0.08] bg-white/[0.05]
                        text-white/60 transition-all duration-300
                        group-hover:border-white/[0.18] group-hover:text-white">
          <Icon size={15} />
        </div>
      </div>
    </Motion.div>
  );
}

/* ═══════════════════════════════════════════
   SERVICE POINT CARD
═══════════════════════════════════════════ */
function ServicePointCard({ item }) {
  const Icon = item.icon;
  return (
    <Motion.div
      variants={cardIn}
      whileHover={{ y: -5, transition: { duration: 0.28 } }}
      className="group relative overflow-hidden rounded-[22px] border border-white/[0.07]
                 bg-[#0d0d10] p-6 transition-all duration-300
                 hover:border-white/[0.13] hover:bg-[#111116]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity
                      duration-500 group-hover:opacity-100">
        <div className="absolute -inset-2 bg-gradient-to-br from-white/[0.04]
                        via-transparent to-white/[0.02] blur-2xl" />
      </div>
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px
                      bg-gradient-to-r from-transparent via-white/[0.14] to-transparent
                      opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl
                        border border-white/[0.08] bg-white/[0.05] text-white/60
                        transition-all duration-300 group-hover:border-white/[0.16]
                        group-hover:bg-white/[0.09] group-hover:text-white">
          <Icon size={17} />
        </div>
        <h3 className="mb-2.5 text-[14px] font-bold tracking-tight text-white sm:text-[15px]">
          {item.title}
        </h3>
        <p className="text-[12px] leading-[1.8] text-white/45 sm:text-[13px]">
          {item.desc}
        </p>
      </div>
    </Motion.div>
  );
}

/* ═══════════════════════════════════════════
   SECTION TITLE
═══════════════════════════════════════════ */
function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-12">
      {eyebrow && (
        <Motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-white/30"
        >
          {eyebrow}
        </Motion.p>
      )}
      <Motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.07 }}
        viewport={{ once: true }}
        className="text-[26px] font-bold tracking-[-0.03em] text-white
                   sm:text-[34px] md:text-[42px]"
      >
        {title}
      </Motion.h2>
      {desc && (
        <Motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          viewport={{ once: true }}
          className="mt-4 max-w-2xl text-[14px] leading-[1.9] text-white/40
                     sm:text-[16px]"
        >
          {desc}
        </Motion.p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PROJECT CAROUSEL  (hero right panel)
═══════════════════════════════════════════ */
function ProjectCarousel({ projects: list }) {
  const [slide, setSlide] = useState(0);

  const next = () => setSlide((p) => (list.length ? (p + 1) % list.length : 0));
  const prev = () =>
    setSlide((p) => (list.length ? (p - 1 + list.length) % list.length : 0));

  const current = list[slide] ?? null;

  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.95, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ ...spring, delay: 0.18 }}
      className="relative overflow-hidden rounded-[32px] border border-white/[0.09]
                 bg-white/[0.03] p-2.5 shadow-[0_40px_120px_rgba(0,0,0,0.65)]
                 backdrop-blur-2xl"
    >
      {/* image */}
      <div className="relative overflow-hidden rounded-[24px] bg-[#0a0a0d]">
        {current ? (
          <AnimatePresence mode="wait">
            <Motion.div
              key={current.title}
              initial={{ opacity: 0, x: 30, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.97 }}
              transition={{ duration: 0.46, ease: [0.23, 1, 0.32, 1] }}
              className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-[5/6]"
            >
              <img
                src={current.previewA}
                alt={current.title}
                className="h-full w-full object-cover opacity-80 transition-transform
                           duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t
                              from-black/90 via-black/28 to-black/5" />

              {/* top badges */}
              <div className="absolute left-4 right-4 top-4 flex items-center
                              justify-between sm:left-5 sm:right-5 sm:top-5">
                <span className="rounded-full border border-white/[0.09] bg-black/40
                                 px-3 py-1.5 text-[9px] font-bold uppercase
                                 tracking-[0.18em] text-white/60 backdrop-blur-xl">
                  Featured
                </span>
                <span className="rounded-full border border-white/[0.09] bg-white/[0.07]
                                 px-3 py-1.5 text-[9px] font-bold uppercase
                                 tracking-[0.18em] text-white/70 backdrop-blur-xl">
                  Quality-Checked
                </span>
              </div>

              {/* bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full
                                border border-white/[0.09] bg-white/[0.06] px-3 py-1.5
                                text-[10px] font-semibold text-white/65 backdrop-blur-xl">
                  <FaShieldAlt className="text-emerald-400" size={9} />
                  Built with premium standards
                </div>
                <h3 className="text-[18px] font-bold tracking-tight text-white sm:text-[22px]">
                  {current.title}
                </h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-white/50 sm:text-[13px]">
                  {current.metric}
                </p>
              </div>
            </Motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex aspect-[4/5] flex-col items-center justify-center
                          gap-4 p-10 text-center lg:aspect-[5/6]">
            <FaLayerGroup size={28} className="text-white/20" />
            <p className="text-[13px] text-white/35">No related projects yet.</p>
          </div>
        )}
      </div>

      {/* controls */}
      <div className="mt-2.5 flex items-center justify-between px-1.5 pb-0.5">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/30">
          {list.length ? `${slide + 1} / ${list.length}` : "—"}
        </span>
        <div className="flex items-center gap-2">
          {[
            { fn: prev, Icon: FaChevronLeft },
            { fn: next, Icon: FaChevronRight },
          ].map(({ fn, Icon }, i) => (
            <button
              key={i}
              onClick={fn}
              disabled={!list.length}
              className="flex h-9 w-9 items-center justify-center rounded-full
                         border border-white/[0.08] bg-white/[0.04] text-white/55
                         transition-all duration-300 hover:border-white/[0.16]
                         hover:bg-white/[0.09] hover:text-white
                         disabled:cursor-not-allowed disabled:opacity-25"
            >
              <Icon size={10} />
            </button>
          ))}
        </div>
      </div>
    </Motion.div>
  );
}

/* ═══════════════════════════════════════════
   PROJECT GRID CARD
═══════════════════════════════════════════ */
function ProjectGridCard({ project, large = false }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...spring, duration: 0.65 }}
      className={`group relative overflow-hidden border border-white/[0.07]
                  bg-[#0b0b0e] ${large ? "rounded-[28px]" : "rounded-[22px]"}`}
    >
      <img
        src={project.previewA}
        alt={project.title}
        className={`w-full object-cover opacity-50 transition-all duration-700
                    group-hover:opacity-65 group-hover:scale-[1.04]
                    ${large
                      ? "h-[320px] sm:h-[400px] lg:h-full lg:min-h-[480px]"
                      : "h-[200px] sm:h-[230px]"
                    }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/92
                      via-black/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
        <span className="mb-3 inline-flex rounded-full border border-white/[0.09]
                         bg-white/[0.07] px-3 py-1 text-[9px] font-bold uppercase
                         tracking-[0.2em] text-white/60 backdrop-blur-xl">
          {project.tags?.[0] ?? "Premium Work"}
        </span>
        <h3 className={`mt-2 font-bold tracking-tight text-white
                        ${large
                          ? "text-[20px] sm:text-[26px]"
                          : "text-[15px] sm:text-[17px]"
                        }`}>
          {project.title}
        </h3>
        <p className="mt-2 text-[12px] leading-relaxed text-white/45 sm:text-[13px]">
          {project.metric}
        </p>
      </div>
    </Motion.div>
  );
}

/* ═══════════════════════════════════════════
   CTA SECTION
═══════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative z-10 overflow-hidden px-5 py-24 sm:px-8 md:py-32">
      {/* edge rule */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 flex justify-center">
        <div className="h-px w-2/5 bg-gradient-to-r from-transparent
                        via-white/[0.07] to-transparent" />
      </div>

      {/* glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[480px] w-[680px]
                        -translate-x-1/2 -translate-y-1/2 rounded-full
                        bg-blue-600/[0.06] blur-[150px]" />
        <div className="absolute left-1/2 top-1/2 h-[200px] w-[300px]
                        -translate-x-1/2 -translate-y-1/2 rounded-full
                        bg-indigo-500/[0.07] blur-[80px]" />
      </div>

      <Motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[32px] border
                   border-white/[0.08] bg-white/[0.03] p-8 text-center
                   shadow-[0_32px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl
                   sm:p-14 md:rounded-[48px] md:p-20"
      >
        {/* glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05]
                        via-transparent to-white/[0.02]" />

        <div className="relative z-10">
          {/* icon */}
          <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center
                          rounded-2xl border border-white/[0.1] bg-white/[0.06]
                          text-white/75 backdrop-blur-xl">
            <FaUsers size={19} />
          </div>

          <h2 className="text-[28px] font-bold tracking-[-0.03em] text-white
                         sm:text-[40px] md:text-[52px] md:leading-[1.08]">
            Ready to build something{" "}
            <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
              exceptional?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[14px] leading-[1.9]
                        text-white/40 sm:text-[16px]">
            Let us transform your vision into a refined digital experience —
            crafted with precision, performance, and world-class design.
          </p>

          <Motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group relative mt-10 inline-flex h-12 items-center
                       justify-center overflow-hidden rounded-full bg-white px-9
                       text-[13px] font-bold text-black
                       shadow-[0_0_40px_rgba(255,255,255,0.12)] transition-shadow
                       duration-300 hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
          >
            {/* shine sweep */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r
                             from-transparent via-white/40 to-transparent
                             transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10 flex items-center gap-2">
              Start a Conversation
              <FaArrowRight
                size={11}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Motion.button>
        </div>
      </Motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MOBILE STICKY BAR
═══════════════════════════════════════════ */
function MobileBar() {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] md:hidden">
      <div className="flex items-center justify-between rounded-full border
                      border-white/[0.09] bg-black/55 p-1.5 pl-5
                      shadow-[0_8px_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
        <span className="text-[12px] font-semibold text-white/60">
          Ready to start?
        </span>
        <button
          onClick={scrollToContact}
          className="h-9 rounded-full bg-white px-5 text-[11px] font-bold
                     uppercase tracking-wide text-black transition-all duration-300
                     hover:bg-blue-500 hover:text-white active:scale-95"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   BACK BUTTON  (floating — replaces nav)
═══════════════════════════════════════════ */
function BackButton() {
  const navigate = useNavigate();
  return (
    <Motion.button
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => navigate(-1)}
      className="group mb-10 inline-flex items-center gap-3 text-[12px] font-bold
                 uppercase tracking-[0.22em] text-white/40 transition-colors
                 duration-300 hover:text-white/80 md:mb-14"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full
                       border border-white/[0.1] bg-white/[0.05] transition-all
                       duration-300 group-hover:border-white/[0.2]
                       group-hover:bg-white/[0.09]">
        <FaArrowLeft
          size={11}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
      </span>
      Back
    </Motion.button>
  );
}

/* ═══════════════════════════════════════════
   ROOT
═══════════════════════════════════════════ */
export default function ServiceDetail() {
  const { slug } = useParams();
  const service  = getServiceBySlug(slug);

  const relatedProjects = useMemo(() => {
    if (!service?.relatedProjects?.length) return [];
    return projects.filter((p) => service.relatedProjects.includes(p.title));
  }, [service]);

  const qualityStats  = service?.qualityStats?.length  ? service.qualityStats  : defaultStats;
  const servicePoints = service?.servicePoints?.length ? service.servicePoints : defaultPoints;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!service) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505]
                    font-sans text-[#f0f0f2] selection:bg-white/20">
      <AmbientBg />

      {/* ── HERO ── */}
      <section className="relative z-10 px-5 pb-20 pt-16 sm:px-8 sm:pt-20
                          md:px-12 md:pt-24 lg:pt-28">
        <div className="mx-auto max-w-7xl">

          {/* back button — inline, no navbar */}
          <BackButton />

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]
                          lg:gap-16 xl:gap-24">

            {/* LEFT — text */}
            <Motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="flex flex-col"
            >
              {/* category pill */}
              <Motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2.5 rounded-full border
                                 border-white/[0.09] bg-white/[0.04] px-4 py-2
                                 text-[10px] font-bold uppercase tracking-[0.26em]
                                 text-white/55 backdrop-blur-xl">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400
                                   shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                  {service.category ?? "Premium Service"}
                </span>
              </Motion.div>

              {/* headline */}
              <Motion.h1
                variants={fadeUp}
                className="mt-6 text-[42px] font-bold leading-[0.92] tracking-[-0.04em]
                           text-white sm:text-[56px] md:text-[68px] lg:text-[76px]
                           xl:text-[88px]"
              >
                {service.name}
              </Motion.h1>

              {/* description */}
              <Motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-[14px] leading-[1.9] text-white/42
                           sm:text-[16px]"
              >
                {service.description}
              </Motion.p>

              {/* CTAs */}
              <Motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <button className="inline-flex h-11 items-center justify-center
                                   rounded-full bg-white px-8 text-[13px] font-bold
                                   text-black shadow-[0_0_40px_rgba(255,255,255,0.13)]
                                   transition-all duration-300 hover:bg-blue-500
                                   hover:text-white active:scale-95">
                  Start Project
                </button>
                <button className="inline-flex h-11 items-center justify-center gap-2
                                   rounded-full border border-white/[0.1] bg-white/[0.04]
                                   px-8 text-[13px] font-bold text-white/75 backdrop-blur-xl
                                   transition-all duration-300 hover:border-white/[0.18]
                                   hover:bg-white/[0.08] hover:text-white active:scale-95">
                  Explore Projects
                  <FaArrowRight size={11} />
                </button>
              </Motion.div>

              {/* stats */}
              <Motion.div
                variants={stagger}
                className="mt-10 grid grid-cols-2 gap-3"
              >
                {qualityStats.map((item, i) => (
                  <StatCard key={i} item={item} />
                ))}
              </Motion.div>
            </Motion.div>

            {/* RIGHT — carousel */}
            <div className="relative">
              <div className="pointer-events-none absolute -inset-10 -z-10
                              rounded-[60px] bg-gradient-to-br from-white/[0.04]
                              to-transparent blur-3xl" />
              <ProjectCarousel projects={relatedProjects} />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE POINTS ── */}
      <section className="relative z-10 px-5 py-20 sm:px-8 md:px-12 md:py-28">
        <div className="pointer-events-none absolute left-0 right-0 top-0 flex justify-center">
          <div className="h-px w-2/5 bg-gradient-to-r from-transparent
                          via-white/[0.07] to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Service Details"
            title="What this service delivers"
            desc="A clear breakdown of the value, process, and results behind this offering."
          />
          <Motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {servicePoints.map((item, i) => (
              <ServicePointCard key={i} item={item} />
            ))}
          </Motion.div>
        </div>
      </section>

      {/* ── RELATED PROJECTS ── */}
      <section className="relative z-10 px-5 py-20 sm:px-8 md:px-12 md:py-28">
        <div className="pointer-events-none absolute left-0 right-0 top-0 flex justify-center">
          <div className="h-px w-2/5 bg-gradient-to-r from-transparent
                          via-white/[0.07] to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Selected Work"
            title="Recent results for this service"
            desc="A curated showcase of related projects, presented in editorial style."
          />

          {relatedProjects.length ? (
            <>
              {/* bento grid */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                {relatedProjects[0] && (
                  <div className="lg:col-span-7 lg:row-span-2">
                    <ProjectGridCard project={relatedProjects[0]} large />
                  </div>
                )}
                {relatedProjects.slice(1, 3).map((p) => (
                  <div key={p.title} className="lg:col-span-5">
                    <ProjectGridCard project={p} />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center lg:justify-end">
                <button className="inline-flex items-center gap-2.5 rounded-full
                                   border border-white/[0.09] bg-white/[0.04] px-6 py-3
                                   text-[12px] font-semibold text-white/65 backdrop-blur-xl
                                   transition-all duration-300 hover:border-white/[0.16]
                                   hover:bg-white/[0.08] hover:text-white">
                  View all related work
                  <FaArrowRight size={10} />
                </button>
              </div>
            </>
          ) : (
            <div className="rounded-[28px] border border-white/[0.07] bg-white/[0.02]
                            p-16 text-center text-[13px] text-white/30">
              No related projects have been linked to this service yet.
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection />

      {/* ── MOBILE BAR ── */}
      <MobileBar />
    </div>
  );
}