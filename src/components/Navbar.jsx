import { useEffect, useState, useRef } from "react";
import { motion as Motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection, useScrollSpy } from "../hook/useScrollSpy.js";
import { NAV_LINKS } from "../utils/constants.js";

// ── Icons ─────────────────────────────────────────────
const MenuIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4 7h16" />
    <path d="M4 12h10" />
    <path d="M4 17h13" />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M18 6 6 18" />
    <path d="M6 6 18 18" />
  </svg>
);

// ── Navbar ────────────────────────────────────────────
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [isScrolled, setIsScrolled]   = useState(false);
  const [hovered, setHovered]         = useState(null);
  const navRef                        = useRef(null);
  const location                      = useLocation();
  const navigate                      = useNavigate();
  const activeSection                 = useScrollSpy(NAV_LINKS.map((l) => l.id));

  const activeNavId =
    location.pathname.startsWith("/service") ? "services"
    : location.pathname === "/services"      ? "services"
    : location.pathname === "/contact"       ? "contact"
    : activeSection;

  // ── Scroll detection ──
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Scroll-to on route change ──
  useEffect(() => {
    if (location.pathname !== "/") return;
    const section = location.state?.scrollTo;
    if (!section) return;
    requestAnimationFrame(() => scrollToSection(section));
  }, [location]);

  // ── Close menu on outside click ──
  useEffect(() => {
    if (!isMenuOpen) return;
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMenuOpen]);

  // ── Lock body scroll when mobile menu open ──
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const handleNavClick = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      scrollToSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* ── Backdrop overlay (mobile) ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <Motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">

        {/* ══ PILL BAR ════════════════════════════════ */}
        <Motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`
            relative w-full max-w-4xl flex items-center justify-between
            px-5 py-2.5 rounded-[20px]
            border transition-all duration-500
            ${isScrolled
              ? "bg-black/40 border-white/[0.09] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl"
              : "bg-black/20 border-white/[0.06] backdrop-blur-xl"
            }
          `}
        >
          {/* Top specular line */}
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent rounded-full" />

          {/* ── LOGO ── */}
          <button
            onClick={() => {
              if (location.pathname !== "/") navigate("/");
              else window.scrollTo({ top: 0, behavior: "smooth" });
              setIsMenuOpen(false);
            }}
            className="relative z-10 flex items-center focus:outline-none group"
            aria-label="Go to homepage"
          >
            <Motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="relative"
            >
              <Motion.img
                layoutId="brand-logo"
                src="/images/d lg.svg"
                alt="DCreate Logo"
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
                className="h-5 w-auto object-contain"
              />
              {/* Logo glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md bg-cyan-400/20 scale-150" />
            </Motion.div>
          </button>

          {/* ── DESKTOP LINKS ── */}
          <div
            className="hidden md:flex items-center gap-1"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeNavId === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  onMouseEnter={() => setHovered(link.id)}
                  className="relative px-4 py-2 rounded-xl text-[13.5px] font-medium transition-colors duration-200 focus:outline-none"
                >
                  {/* Hover background */}
                  <AnimatePresence>
                    {hovered === link.id && !isActive && (
                      <Motion.span
                        key="hover-bg"
                        layoutId="nav-hover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-xl bg-white/[0.06]"
                      />
                    )}
                  </AnimatePresence>

                  {/* Active pill */}
                  {isActive && (
                    <Motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/[0.1]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}

                  <span className={`relative transition-colors duration-200 ${
                    isActive ? "text-white" : "text-white/45 hover:text-white/80"
                  }`}>
                    {link.label}
                  </span>

                  {/* Active dot */}
                  {isActive && (
                    <Motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── CTA BUTTON ── */}
          <div className="hidden md:flex">
            <Motion.button
              onClick={() => handleNavClick("contact")}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="group relative overflow-hidden flex items-center gap-2 px-5 py-2 rounded-xl text-[13px] font-semibold text-white focus:outline-none"
            >
              {/* Button bg */}
              <div className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/[0.12] group-hover:bg-white/[0.12] transition-colors duration-300" />
              {/* Shimmer */}
              <Motion.div
                className="absolute inset-0 -skew-x-[25deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              {/* Top shine */}
              <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              {/* Glow */}
              <div className="absolute -inset-1 -z-10 rounded-xl bg-cyan-500/10 opacity-0 blur-lg group-hover:opacity-100 transition-opacity duration-500" />

              <span className="relative">Get in Touch</span>
              <span className="relative w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </Motion.button>
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <Motion.button
            onClick={() => setIsMenuOpen((v) => !v)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08] focus:outline-none"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <Motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CloseIcon className="w-4 h-4 text-white/70" />
                </Motion.span>
              ) : (
                <Motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuIcon className="w-4 h-4 text-white/70" />
                </Motion.span>
              )}
            </AnimatePresence>
          </Motion.button>
        </Motion.div>

        {/* ══ MOBILE MENU ══════════════════════════════ */}
        <AnimatePresence>
          {isMenuOpen && (
            <Motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full mt-2 w-full max-w-4xl left-1/2 -translate-x-1/2 px-4 md:hidden"
            >
              <div className="relative overflow-hidden rounded-[22px] border border-white/[0.09] bg-black/60 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.5)]">

                {/* Top specular */}
                <div className="pointer-events-none absolute left-[8%] right-[8%] top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
                {/* Ambient glow */}
                <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full bg-cyan-500/[0.06] blur-2xl" />

                <div className="relative p-4 space-y-1">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = activeNavId === link.id;
                    return (
                      <Motion.button
                        key={link.id}
                        onClick={() => handleNavClick(link.id)}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className={`
                          group relative w-full flex items-center justify-between
                          px-4 py-3.5 rounded-[14px] text-left
                          text-[14px] font-medium transition-all duration-200 focus:outline-none
                          ${isActive
                            ? "bg-white/[0.08] text-white border border-white/[0.1]"
                            : "text-white/45 hover:text-white/80 hover:bg-white/[0.05]"
                          }
                        `}
                      >
                        <span>{link.label}</span>

                        <div className="flex items-center gap-2">
                          {isActive && (
                            <Motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                            />
                          )}
                          <Motion.span
                            className="text-white/20 text-xs"
                            animate={{ x: isActive ? 2 : 0 }}
                          >
                            ›
                          </Motion.span>
                        </div>
                      </Motion.button>
                    );
                  })}

                  {/* Divider */}
                  <div className="my-2 h-px bg-white/[0.06] mx-2" />

                  {/* Mobile CTA */}
                  <Motion.button
                    onClick={() => handleNavClick("contact")}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: NAV_LINKS.length * 0.05 + 0.05, duration: 0.3 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative w-full overflow-hidden flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-[14px] text-[14px] font-semibold text-white focus:outline-none"
                  >
                    <div className="absolute inset-0 rounded-[14px] bg-white/[0.07] border border-white/[0.1] group-hover:bg-white/[0.1] transition-colors duration-300" />
                    {/* Top shine */}
                    <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    <span className="relative">Get in Touch</span>
                    <span className="relative w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  </Motion.button>
                </div>

                {/* Bottom brand strip */}
                <div className="px-6 py-3 border-t border-white/[0.05] flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
                    DCreate Studio
                  </span>
                  <span className="text-[10px] text-white/20">
                    © 2025
                  </span>
                </div>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>

      </nav>
    </>
  );
};

export default Navbar;