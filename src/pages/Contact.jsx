import { motion as Motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import {
  Mail,
  MessageCircle,
  MapPin,
  ChevronRight,
  Loader2,
  Shield,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { RiWhatsappLine } from "react-icons/ri";

// ── Data ──────────────────────────────────────────────
const CONTACT_ITEMS = [
  { icon: Mail,          label: "Email",    value: "info@dcreate.com", href: "mailto:info@dcreate.com",   glow: "rgba(96,165,250,0.12)"  },
  { icon: MessageCircle, label: "WhatsApp", value: "+94 72 553 5524",  href: "https://wa.me/94725535524", glow: "rgba(52,211,153,0.12)"  },
  { icon: MapPin,        label: "Location", value: "Sri Lanka",         href: "#",                         glow: "rgba(167,139,250,0.12)" },
];

const BUDGET_OPTIONS  = ["$5k – $10k", "$10k – $25k", "$25k+"];
const SERVICE_OPTIONS = ["Web Development", "Mobile App", "UI/UX Design", "Full-stack"];

const emptyForm = {
  name: "", company: "", email: "",
  budget: "", service: "", message: "", agree: false,
};

// ── WhatsApp message builder ──────────────────────────
const buildWhatsAppMessage = (form) =>
  [
    "🚀 *New Project Inquiry — DCreate*",
    "━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "👤 *Contact Details*",
    `• Name    : ${form.name}`,
    `• Company : ${form.company || "Not provided"}`,
    `• Email   : ${form.email}`,
    "",
    "📋 *Project Details*",
    `• Service : ${form.service}`,
    `• Budget  : ${form.budget}`,
    "",
    "💬 *Message*",
    form.message,
    "",
    "━━━━━━━━━━━━━━━━━━━━━━",
    "_Sent via DCreate Contact Form_",
  ].join("\n");

// ── Shared style tokens ───────────────────────────────
const inputBase = [
  "w-full rounded-2xl border border-white/[0.12] bg-white/[0.03]",
  "px-5 py-4 text-sm text-white outline-none",
  "transition-all duration-300",
  "placeholder:text-neutral-600",
  "focus:border-white/25 focus:bg-white/[0.05]",
].join(" ");

const labelBase = "ml-1 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400";

// ══════════════════════════════════════════════════════
//  Main Component
// ══════════════════════════════════════════════════════
export default function Contact() {
  const [form, setForm]                 = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // ── 3-D tilt ──
  const cardRef = useRef(null);
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2.5, -2.5]), { stiffness: 180, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2.5, 2.5]), { stiffness: 180, damping: 28 });
  const glowX   = useTransform(mouseX, [-0.5, 0.5], ["15%", "85%"]);
  const glowY   = useTransform(mouseY, [-0.5, 0.5], ["15%", "85%"]);

  const handleMouseMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set((e.clientX - r.left) / r.width  - 0.5);
    mouseY.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  // ── FocusRing ──
  const FocusRing = ({ name }) =>
    focusedField === name ? (
      <Motion.div
        layoutId="focus-ring"
        className="pointer-events-none absolute inset-0 rounded-2xl border border-white/30"
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
      />
    ) : null;

  // ── Handlers ──
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const isValid =
    form.name && form.email && form.budget &&
    form.service && form.message && form.agree;

  const waURL = `https://wa.me/94725535524?text=${encodeURIComponent(buildWhatsAppMessage(form))}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    window.open(waURL, "_blank", "noopener,noreferrer");
    setIsSubmitting(false);
    setSubmitted(true);
  };

  // ════════════════════════════════════════════════════
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-6 py-28 font-sans selection:bg-white/20 sm:px-10 lg:px-20"
    >
      {/* ── Ambient glows ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[70%] w-[60%] rounded-full bg-blue-500/[0.08] blur-[160px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[60%] w-[50%] rounded-full bg-purple-500/[0.08] blur-[160px]" />
      </div>

      {/* ── Dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ══ HEADER ══════════════════════════════════ */}
        <div className="mb-20 space-y-8">

          {/* Pill */}
          <Motion.div
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 backdrop-blur-2xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-400">
              Project Inquiry
            </span>
          </Motion.div>

          {/* Headline */}
          <Motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-[7rem] font-bold tracking-tighter leading-[0.85] text-white"
          >
            Precision. Strategy. Built
            <br />
            <span className="relative inline-block pb-3">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                for Impact
              </span>

              {/* Underline */}
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
        </div>

        {/* ══ GRID ════════════════════════════════════ */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">

          {/* ── LEFT — Info panel ── */}
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col gap-5 lg:col-span-5"
          >
            {/* Info card */}
            <div className="group relative flex-1 overflow-hidden rounded-[36px] border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-10 backdrop-blur-3xl transition-all duration-500 hover:border-white/[0.14]">
              {/* Top shimmer */}
              <div className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              {/* Hover corner glow */}
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/[0.07] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Animated sparkle */}
              <div className="mb-6 flex items-center gap-2.5">
                <Motion.span
                  animate={{ rotate: [0, 18, -18, 0], scale: [1, 1.25, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-blue-400"
                >
                  <Sparkles size={14} />
                </Motion.span>
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">
                  Let's Connect
                </span>
              </div>

              <h3 className="mb-5 text-[28px] font-bold leading-[1.15] tracking-[-0.03em] text-white">
                Crafting digital
                <br />masterpieces.
              </h3>
              <p className="mb-10 text-[15px] font-light leading-[1.85] text-neutral-400">
                We bridge the gap between imagination and engineering. Let's
                build something that scales.
              </p>

              <div className="flex flex-col gap-3">
                {CONTACT_ITEMS.map((item, i) => (
                  <Motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                  >
                    <ContactItem {...item} />
                  </Motion.div>
                ))}
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-5">
              <StatCard value="24h" label="Fast Response" delay={0.3} />
              <StatCard value="98%" label="Success Rate"  delay={0.4} />
            </div>
          </Motion.div>

          {/* ── RIGHT — Form with tilt ── */}
          <Motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            {/* 3-D tilt wrapper */}
            <Motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformPerspective: 1400 }}
              className="relative h-full"
            >
              {/* Outer gradient rim */}
              <div className="pointer-events-none absolute -inset-px rounded-[40px] bg-gradient-to-br from-white/[0.07] via-transparent to-white/[0.02]" />

              <div className="relative h-full overflow-hidden rounded-[40px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">

                {/* Mouse-follow glow */}
                <Motion.div
                  className="pointer-events-none absolute h-[480px] w-[480px] rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)",
                    left: glowX,
                    top: glowY,
                    x: "-50%",
                    y: "-50%",
                  }}
                />

                {/* Top specular */}
                <div className="absolute left-12 right-12 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="relative p-8 md:p-14">
                  <AnimatePresence mode="wait">

                    {/* ════ SUCCESS STATE ════ */}
                    {submitted ? (
                      <Motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center py-16 text-center"
                      >
                        {/* Animated check with ripples */}
                        <div className="relative mb-10">
                          <Motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
                            className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-2xl shadow-emerald-500/25"
                          >
                            <CheckCircle2 size={44} className="text-white" />
                          </Motion.div>

                          {/* Ripple rings */}
                          {[1, 2].map(n => (
                            <Motion.div
                              key={n}
                              initial={{ scale: 1, opacity: 0.35 }}
                              animate={{ scale: 2.8 + n * 0.5, opacity: 0 }}
                              transition={{
                                duration: 1.6,
                                delay: n * 0.3,
                                repeat: Infinity,
                                ease: "easeOut",
                              }}
                              className="absolute inset-0 rounded-full border border-emerald-400/30"
                            />
                          ))}
                        </div>

                        <h3 className="mb-3 text-3xl font-bold tracking-tight text-white">
                          Opening WhatsApp…
                        </h3>
                        <p className="mb-2 max-w-sm text-[15px] font-light leading-relaxed text-neutral-400">
                          Your inquiry has been formatted and sent to WhatsApp.
                          If the window didn't open,{" "}
                          <a
                            href={waURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300 transition-colors"
                          >
                            click here
                          </a>.
                        </p>
                        <p className="mb-12 text-[13px] text-neutral-600">
                          We reply within{" "}
                          <span className="font-semibold text-neutral-400">1 business day</span>.
                        </p>

                        {/* WhatsApp CTA */}
                        <Motion.a
                          href={waURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.04, y: -3 }}
                          whileTap={{ scale: 0.96 }}
                          className="group relative mb-4 inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-bold text-white"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 group-hover:from-emerald-400 group-hover:to-teal-400" />
                          <div className="absolute left-[15%] right-[15%] top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                          <RiWhatsappLine className="relative text-lg" />
                          <span className="relative">Open WhatsApp Chat</span>
                          <ArrowRight
                            size={14}
                            className="relative opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                          />
                        </Motion.a>

                        <Motion.button
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => { setSubmitted(false); setForm(emptyForm); }}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-neutral-400 transition-all duration-300 hover:border-white/20 hover:text-white"
                        >
                          Send another message
                        </Motion.button>
                      </Motion.div>

                    ) : (

                      /* ════ FORM STATE ════ */
                      <Motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Form header */}
                        <div className="mb-10">
                          <div className="mb-4 flex items-center gap-2.5">
                            <Motion.span
                              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              className="text-blue-400"
                            >
                              <Sparkles size={14} />
                            </Motion.span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">
                              Free Consultation
                            </span>
                          </div>
                          <h3 className="mb-2 text-3xl font-bold tracking-tight text-white">
                            Tell us about your project
                          </h3>
                          <p className="text-[14px] font-light text-neutral-500">
                            We'll reach out via WhatsApp within 24 hours with a tailored proposal.
                          </p>
                        </div>

                        <form onSubmit={handleSubmit}>

                          {/* Row 1 */}
                          <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
                            <TiltInput
                              label="Full Name"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              placeholder="John Doe"
                              required
                              focusedField={focusedField}
                              setFocusedField={setFocusedField}
                              FocusRing={FocusRing}
                            />
                            <TiltInput
                              label="Company"
                              name="company"
                              value={form.company}
                              onChange={handleChange}
                              placeholder="Optional"
                              focusedField={focusedField}
                              setFocusedField={setFocusedField}
                              FocusRing={FocusRing}
                            />
                            <TiltInput
                              label="Email"
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="john@company.com"
                              required
                              focusedField={focusedField}
                              setFocusedField={setFocusedField}
                              FocusRing={FocusRing}
                            />
                            <TiltSelect
                              label="Budget Range"
                              name="budget"
                              value={form.budget}
                              onChange={handleChange}
                              options={BUDGET_OPTIONS}
                              required
                              focusedField={focusedField}
                              setFocusedField={setFocusedField}
                              FocusRing={FocusRing}
                            />
                          </div>

                          {/* Service */}
                          <div className="mt-8">
                            <TiltSelect
                              label="Service Required"
                              name="service"
                              value={form.service}
                              onChange={handleChange}
                              options={SERVICE_OPTIONS}
                              required
                              focusedField={focusedField}
                              setFocusedField={setFocusedField}
                              FocusRing={FocusRing}
                            />
                          </div>

                          {/* Message */}
                          <div className="relative mt-8 flex flex-col gap-3">
                            <label className={labelBase}>The Mission</label>
                            <div className="relative">
                              <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("message")}
                                onBlur={() => setFocusedField(null)}
                                rows={4}
                                placeholder="What are we building together?"
                                className={`${inputBase} resize-none leading-relaxed`}
                                style={{ caretColor: "#60a5fa" }}
                                required
                              />
                              <FocusRing name="message" />
                            </div>
                          </div>

                          {/* Footer row */}
                          <div className="mt-10 flex flex-col items-start gap-6 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">

                            {/* Checkbox */}
                            <label className="group flex cursor-pointer items-center gap-4">
                              <div className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border border-white/20 bg-neutral-950 transition-all group-hover:border-white/40">
                                <input
                                  type="checkbox"
                                  name="agree"
                                  checked={form.agree}
                                  onChange={handleChange}
                                  className="peer absolute cursor-pointer opacity-0"
                                />
                                <Motion.div
                                  animate={{ scale: form.agree ? 1 : 0 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                                  className="h-2.5 w-2.5 rounded-sm bg-white"
                                />
                              </div>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 transition-colors group-hover:text-neutral-300">
                                Accept Privacy Policy
                              </span>
                            </label>

                            {/* Submit */}
                            <Motion.button
                              type="submit"
                              disabled={!isValid || isSubmitting}
                              whileHover={isValid && !isSubmitting ? { scale: 1.04, y: -2 } : {}}
                              whileTap={isValid && !isSubmitting ? { scale: 0.97 } : {}}
                              transition={{ type: "spring", stiffness: 400, damping: 20 }}
                              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-10 py-4 text-sm font-bold text-black disabled:cursor-not-allowed disabled:opacity-25"
                            >
                              {/* Shimmer sweep */}
                              <Motion.div
                                className="absolute inset-0 -skew-x-[20deg] bg-gradient-to-r from-transparent via-black/[0.06] to-transparent"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "200%" }}
                                transition={{ duration: 0.65, ease: "easeInOut" }}
                              />
                              {/* Hover glow */}
                              <div className="absolute -inset-1 -z-10 rounded-full bg-white/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                              {isSubmitting ? (
                                <>
                                  <Loader2 size={15} className="animate-spin" />
                                  <span>Preparing…</span>
                                </>
                              ) : (
                                <>
                                  <span>Submit Inquiry</span>
                                  <ChevronRight
                                    size={14}
                                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                                  />
                                </>
                              )}
                            </Motion.button>
                          </div>

                          {/* Trust badges */}
                          <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
                            {[
                              { icon: Shield,        text: "No spam, ever"      },
                              { icon: Clock,         text: "Reply in 24h"       },
                              { icon: MessageCircle, text: "Free consultation"  },
                            ].map(({ icon: Icon, text }) => (
                              <div key={text} className="flex items-center gap-1.5 text-neutral-600">
                                <Icon size={11} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{text}</span>
                              </div>
                            ))}
                          </div>

                        </form>
                      </Motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Motion.div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════
//  Sub-components
// ══════════════════════════════════════════════════════

function ContactItem({ icon: Icon, label, value, href, glow }) {
  return (
    <a
      href={href}
      className="group relative flex h-[68px] items-center gap-5 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
    >
      {/* Per-card coloured glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse at 0% 50%, ${glow}, transparent 70%)` }}
      />

      <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] transition-all duration-300 group-hover:scale-110 group-hover:border-white/15">
        <Icon size={15} className="text-neutral-400 transition-colors duration-300 group-hover:text-white" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-600">{label}</p>
        <p className="truncate text-[14px] font-medium text-neutral-200 transition-colors duration-300 group-hover:text-white">
          {value}
        </p>
      </div>

      <ChevronRight
        size={14}
        className="text-neutral-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-neutral-400"
      />
    </a>
  );
}

function StatCard({ value, label, delay = 0 }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.02] p-8 text-center backdrop-blur-xl"
    >
      {/* Top shimmer */}
      <div className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <p className="mb-1.5 text-[36px] font-bold tracking-tight text-white">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{label}</p>
    </Motion.div>
  );
}

function TiltInput({ label, name, value, onChange, placeholder, type = "text", required, focusedField, setFocusedField, FocusRing }) {
  return (
    <div className="flex flex-col gap-3">
      <label className={labelBase}>{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          placeholder={placeholder}
          required={required}
          className={inputBase}
          style={{ caretColor: "#60a5fa" }}
        />
        <FocusRing name={name} />
      </div>
    </div>
  );
}

function TiltSelect({ label, name, value, onChange, options, required, focusedField, setFocusedField, FocusRing }) {
  return (
    <div className="flex flex-col gap-3">
      <label className={labelBase}>{label}</label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          required={required}
          className={`${inputBase} appearance-none cursor-pointer text-white/60`}
        >
          <option value="" className="bg-[#0a0a0a] text-neutral-500">Choose Option</option>
          {options.map(opt => (
            <option key={opt} value={opt} className="bg-[#0a0a0a] text-white">{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[10px] text-neutral-500">
          ▼
        </div>
        <FocusRing name={name} />
      </div>
    </div>
  );
}