import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiDocker,
  SiGit,
  SiFigma,
} from "react-icons/si";

const technologies = [
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiPython, name: "Python", color: "#3776AB" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiGraphql, name: "GraphQL", color: "#E10098" },
  { icon: SiDocker, name: "Docker", color: "#2496ED" },
  { icon: SiGit, name: "Git", color: "#F05032" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E" },
];

export default function TechStack() {
  const duplicated = [...technologies, ...technologies];

  return (
    <section className="bg-black px-4 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        {/* Title - Top Center */}
        <div className="mb-6 flex justify-center">
          <h3 className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-xs font-medium tracking-[0.18em] text-white/90 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_rgba(15,23,42,0.35)]">
            Technologies We Use
          </h3>
        </div>

        {/* Main Container: Heading + Marquee */}
        <div className="flex items-center gap-2 lg:gap-12">
          {/* Left: Heading Text */}
          <div className="shrink-0">
            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-white/70 whitespace-nowrap">
              Our Stack |
            </h2>
          </div>

          {/* Right: Marquee */}
          <div className="flex-1 relative overflow-hidden">
            {/* Left Fade */}
            <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />

            {/* Right Fade */}
            <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            {/* Scrolling Icons */}
            <div className="flex w-max animate-scroll gap-6 items-center">
              {duplicated.map(({ icon: Icon, name, color }, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center gap-2 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 p-3  transition-all duration-300 group shrink-0"
                >
                  <Icon
                    size={28}
                    style={{ color }}
                    className="transition-transform duration-300 group-hover:scale-110 drop-shadow-lg md:text-4xl"
                  />
                  <span className="text-[10px] md:text-xs font-medium text-white/50 group-hover:text-white/80 tracking-wide transition-colors duration-300 text-center">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}