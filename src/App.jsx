import React, { useState, useEffect, useRef } from "react";

import {
  ChevronsLeftRightEllipsis,
  Mail,
  Phone,
  FileText,
  ArrowUpRight,
  GraduationCap,
  Code2,
  Boxes,
  Database,
  Layers,
  Wrench,
  Sparkles,
  Star,
  Zap,
  Circle,
  Triangle,
  Square,
  MoveRight,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import {SiLeetcode} from "react-icons/si"

/* ---------- DATA (from resume, verbatim facts) ---------- */

const PROFILE = {
  name: "Aryan Parmar",
  phone: "+91-9408744422",
  email: "ap890383@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
};

const EDUCATION = [
  {
    school: "National Institute of Technology Surat",
    location: "Gujarat, India",
    degree: "B.Tech in Electronics and Communication Engineering",
    detail: "CGPA: 7.40",
    year: "2023 – Present",
  },
  {
    school: "GSHSEB Board",
    location: "Gujarat, India",
    degree: "Higher Secondary Education",
    detail: "Percentage: 78%",
    year: "2023",
  },
  {
    school: "GSEB Board",
    location: "Gujarat, India",
    degree: "Secondary Education",
    detail: "Percentage: 76%",
    year: "2021",
  },
];

const SKILLS = [
  { group: "Languages", icon: Code2, color: "#4F7DFF", items: ["Python", "JavaScript", "C++"] },
  { group: "Frameworks", icon: Layers, color: "#FF8A65", items: ["Next.js", "Express.js", "Tailwind CSS"] },
  { group: "Libraries", icon: Boxes, color: "#FFD43B", items: ["React.js", "Socket.IO"] },
  { group: "Databases", icon: Database, color: "#7C4DFF", items: ["MongoDB", "PostgreSQL"] },
  { group: "ORMs", icon: Layers, color: "#4F7DFF", items: ["Prisma", "Mongoose"] },
  { group: "Tools", icon: Wrench, color: "#FF8A65", items: ["Git", "GitHub", "Postman", "VS Code", "Vercel"] },
];

const PROJECTS = [
  {
    title: "Fake Account Detection System",
    tag: "Echelon Hackathon Project",
    year: "2026",
    color: "#4F7DFF",
    description:
      "A fake social-media account detection system combining behavioral analysis with NLP-based text classification.",
    features: [
      "Random Forest model for behavioral pattern analysis",
      "BERT-based NLP for profile bio and text classification",
      "TextStat linguistic features (readability, lexical complexity) to boost bot vs human accuracy",
      "FastAPI backend paired with a Streamlit dashboard for live prediction insights",
    ],
    tech: ["Python", "Random Forest", "BERT", "FastAPI", "Streamlit", "TextStat"],
    live: "",
    code: "https://github.com/Aryanftw/fake-account-detection"
  },
  {
    title: "Helper Buddy",
    tag: "GWOC Project",
    year: "2025",
    color: "#FF8A65",
    description:
      "A full-stack cleaning service booking platform built for speed, structure and scale.",
    features: [
      "Next.js App Router with a responsive, optimized-routing UI",
      "Global state management with Zustand",
      "Prisma ORM wired to PostgreSQL for reliable data operations",
      "Production-ready, scalable backend architecture deployed live",
    ],
    tech: ["Next.js", "Zustand", "Prisma", "PostgreSQL"],
    live:"https://helperbuddy-sigma.vercel.app/",
    code: "https://github.com/lokesh-makam/HelperBuddy"
  },
  {
    title: "Chat Application",
    tag: "Personal Project",
    year: "2025",
    color: "#7C4DFF",
    description:
      "A real-time chat application built for low-latency conversation with rich media sharing.",
    features: [
      "Real-time messaging with file and image sharing",
      "Socket.IO integration for low-latency communication",
      "Cloudinary-powered secure media storage and delivery",
      "Scalable Express.js + Mongoose backend for message persistence",
    ],
    tech: ["Socket.IO", "Express.js", "Mongoose", "Cloudinary"],
    live: "https://blab-chat.onrender.com",
    code: "https://github.com/Aryanftw/blab-chat-app"
  },
  {
    title: "POSTLY — Blog Application",
    tag: "Personal Project",
    year: "2025",
    color: "#FFD43B",
    description:
      "A blogging platform with a clean RESTful backend and a fast, responsive frontend.",
    features: [
      "RESTful APIs built with Express.js and MongoDB",
      "Responsive React.js frontend styled with Tailwind CSS",
      "Backend deployed on Render, frontend deployed on Vercel",
      "Optimized end-to-end user experience for reading and writing posts",
    ],
    tech: ["React.js", "Express.js", "MongoDB", "Tailwind CSS", "Render", "Vercel"],
    live: "https://blog-app-three-kappa-83.vercel.app/",
    code: "https://github.com/Aryanftw/blog-app"
  },
];

const POSITIONS = [
  {
    org: "Google Developer Group, NIT Surat",
    role: "Junior Developer",
    period: "Oct 2024 – May 2025",
    color: "#4F7DFF",
  },
  {
    org: "ACM Club, NIT Surat",
    role: "Executive",
    period: "Aug 2024 – Mar 2025",
    color: "#FF8A65",
  },
];

const NAV = ["Home", "About", "Education", "Skills", "Projects", "Experience", "Contact"];

/* ---------- SHARED UI PRIMITIVES ---------- */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: visible ? "translateY(0)" : "translateY(28px)",
        opacity: visible ? 1 : 0,
        transition: `all 0.6s cubic-bezier(.17,.84,.44,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function BrutalButton({ children, href, onClick, bg = "#111111", fg = "#FFF8E8", small }) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={href && href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: bg,
        color: fg,
        fontWeight: 800,
        fontSize: small ? 14 : 17,
        padding: small ? "10px 18px" : "16px 28px",
        borderRadius: 16,
        border: "4px solid #000",
        boxShadow: "6px 6px 0px #000",
        cursor: "pointer",
        textDecoration: "none",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translate(-3px,-3px)";
        e.currentTarget.style.boxShadow = "9px 9px 0px #000";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translate(0,0)";
        e.currentTarget.style.boxShadow = "6px 6px 0px #000";
      }}
    >
      {children}
    </a>
  );
}

function SectionTitle({ eyebrow, title, color = "#4F7DFF" }) {
  return (
    <div style={{ marginBottom: 48, textAlign: "center" }}>
      <div
        style={{
          display: "inline-block",
          background: color,
          border: "3px solid #000",
          borderRadius: 999,
          padding: "6px 18px",
          fontWeight: 800,
          fontSize: 13,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: "#111",
          marginBottom: 18,
          boxShadow: "4px 4px 0px #000",
          transform: "rotate(-2deg)",
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontSize: "clamp(2.2rem, 5vw, 4rem)",
          fontWeight: 900,
          color: "#111",
          lineHeight: 1.05,
          margin: 0,
          textTransform: "uppercase",
          letterSpacing: -1,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ---------- FLOATING BACKGROUND SHAPES ---------- */

function FloatingShapes() {
  const shapes = [
    { Icon: Circle, top: "12%", left: "6%", color: "#FFD43B", size: 46, dur: 7 },
    { Icon: Square, top: "68%", left: "4%", color: "#FF8A65", size: 38, dur: 9 },
    { Icon: Triangle, top: "20%", left: "88%", color: "#7C4DFF", size: 50, dur: 8 },
    { Icon: Star, top: "75%", left: "90%", color: "#4F7DFF", size: 40, dur: 6.5 },
    { Icon: Zap, top: "45%", left: "94%", color: "#FFD43B", size: 34, dur: 10 },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {shapes.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            animation: `floaty ${s.dur}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          <s.Icon size={s.size} color={s.color} strokeWidth={2.5} style={{ filter: "drop-shadow(3px 3px 0px #000)" }} />
        </div>
      ))}
    </div>
  );
}

/* ---------- NAVBAR ---------- */

function Navbar({ active, onNav }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 18,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        background: "#FFFFFF",
        border: "4px solid #000",
        borderRadius: 999,
        boxShadow: "6px 6px 0px #000",
        padding: "10px 10px",
        display: "flex",
        gap: 4,
        maxWidth: "94vw",
        overflowX: "auto",
      }}
    >
      {NAV.map((item) => (
        <button
          key={item}
          onClick={() => onNav(item)}
          style={{
            border: "none",
            background: active === item ? "#4F7DFF" : "transparent",
            color: active === item ? "#111" : "#111",
            fontWeight: 800,
            fontSize: 13,
            padding: "9px 16px",
            borderRadius: 999,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "background 0.2s ease",
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

/* ---------- HERO ---------- */

function Hero({ scrollTo }) {
  return (
    <section
      id="Home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "120px 24px 80px",
        overflow: "hidden",
      }}
    >
      <FloatingShapes />
      <Reveal>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#FFD43B",
            border: "3px solid #000",
            borderRadius: 999,
            padding: "8px 18px",
            fontWeight: 800,
            fontSize: 14,
            boxShadow: "4px 4px 0px #000",
            marginBottom: 28,
            transform: "rotate(-2deg)",
          }}
        >
          <Sparkles size={16} /> Available for SWE internships
        </div>
      </Reveal>

      <Reveal delay={100}>
        <h1
          style={{
            fontSize: "clamp(3rem, 10vw, 7rem)",
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 0.95,
            margin: "0 0 20px",
            color: "#111",
            letterSpacing: -2,
            textTransform: "uppercase",
          }}
        >
          {PROFILE.name}
        </h1>
      </Reveal>

      <Reveal delay={200}>
        <p
          style={{
            fontSize: "clamp(1.3rem, 3vw, 2rem)",
            fontWeight: 800,
            textAlign: "center",
            maxWidth: 780,
            margin: "0 0 22px",
            color: "#4F7DFF",
            lineHeight: 1.15,
          }}
        >
          Electronics &amp; Communication Engineer who builds full‑stack products and ML systems.
        </p>
      </Reveal>

      <Reveal delay={300}>
        <p
          style={{
            fontSize: 18,
            maxWidth: 620,
            textAlign: "center",
            color: "#333",
            fontWeight: 500,
            margin: "0 0 40px",
            lineHeight: 1.6,
          }}
        >
          B.Tech student at NIT Surat shipping projects across computer vision,
          ML-driven detection systems, and production full-stack web apps —
          from FastAPI backends to Next.js platforms.
        </p>
      </Reveal>

      <Reveal delay={400}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <BrutalButton
  bg="#111111"
  fg="#FFF8E8"
  href="/aryan-latest-resume.pdf"
  download
>
  <FileText size={18} /> Download Resume
</BrutalButton>
          <BrutalButton bg="#FFFFFF" fg="#111" href="https://github.com/Aryanftw">
            <FaGithub size={18} /> GitHub
          </BrutalButton>
          <BrutalButton bg="#7C4DFF" fg="#FFF8E8" href="https://www.linkedin.com/in/aryan-parmar-90b10a324/">
            <FaLinkedin size={18} /> LinkedIn
          </BrutalButton>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- ABOUT ---------- */

function About() {
  return (
    <section id="About" style={{ padding: "100px 24px", position: "relative" }}>
      <SectionTitle eyebrow="Who I am" title="About Me" color="#FFD43B" />
      <Reveal>
        <div
          style={{
            maxWidth: 880,
            margin: "0 auto",
            background: "#FFFFFF",
            border: "4px solid #000",
            borderRadius: 22,
            boxShadow: "10px 10px 0px #000",
            padding: "44px",
            transform: "rotate(-0.6deg)",
          }}
        >
          <p style={{ fontSize: 19, lineHeight: 1.75, color: "#111", fontWeight: 500, margin: 0 }}>
            I'm <strong>Aryan Parmar</strong>, a B.Tech student in Electronics
            &amp; Communication Engineering at{" "}
            <strong>National Institute of Technology, Surat</strong>, currently
            holding a CGPA of <strong>7.40</strong>. Alongside my coursework, I
            build production-style software: a fake-account detection system
            combining Random Forest and BERT for the Echelon Hackathon, a
            full-stack cleaning-service marketplace with Next.js and
            PostgreSQL, a real-time chat app with Socket.IO and Cloudinary, and
            a blogging platform on the MERN stack. I work comfortably across{" "}
            <strong>Python, JavaScript, and C++</strong>, and I've taken on
            leadership roles as a Junior Developer at{" "}
            <strong>Google Developer Group, NIT Surat</strong> and an
            Executive at the <strong>ACM Club, NIT Surat</strong>. I'm looking
            for a software engineering internship where I can keep shipping
            real products.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- EDUCATION ---------- */

function Education() {
  return (
    <section id="Education" style={{ padding: "100px 24px" }}>
      <SectionTitle eyebrow="Academics" title="Education" color="#7C4DFF" />
      <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>
        {EDUCATION.map((ed, i) => (
          <Reveal key={ed.school} delay={i * 120}>
            <div
              style={{
                display: "flex",
                gap: 22,
                alignItems: "flex-start",
                background: "#FFFFFF",
                border: "4px solid #000",
                borderRadius: 20,
                boxShadow: "8px 8px 0px #000",
                padding: 28,
                transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "rotate(0deg) translateY(-4px)";
                e.currentTarget.style.boxShadow = "12px 12px 0px #000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${i % 2 === 0 ? -1 : 1}deg)`;
                e.currentTarget.style.boxShadow = "8px 8px 0px #000";
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: "#FFD43B",
                  border: "3px solid #000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GraduationCap size={30} color="#111" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: "#111" }}>{ed.school}</h3>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: 13,
                      background: "#4F7DFF",
                      border: "2px solid #000",
                      borderRadius: 999,
                      padding: "4px 12px",
                      color: "#111",
                    }}
                  >
                    {ed.year}
                  </span>
                </div>
                <p style={{ margin: "6px 0 4px", fontWeight: 700, color: "#333" }}>{ed.degree}</p>
                <p style={{ margin: 0, color: "#666", fontSize: 14 }}>{ed.location} · {ed.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- SKILLS ---------- */

function Skills() {
  return (
    <section id="Skills" style={{ padding: "100px 24px" }}>
      <SectionTitle eyebrow="Toolbox" title="Skills" color="#FF8A65" />
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {SKILLS.map((group, i) => (
          <Reveal key={group.group} delay={i * 90}>
            <div
              style={{
                background: "#FFFFFF",
                border: "4px solid #000",
                borderRadius: 20,
                boxShadow: "8px 8px 0px #000",
                padding: 24,
                height: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: group.color,
                    border: "3px solid #000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <group.icon size={20} color="#111" />
                </div>
                <h3 style={{ margin: 0, fontWeight: 900, fontSize: 18, textTransform: "uppercase" }}>
                  {group.group}
                </h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      display: "inline-block",
                      background: "#FFF8E8",
                      border: "3px solid #000",
                      borderRadius: 12,
                      padding: "7px 14px",
                      fontWeight: 800,
                      fontSize: 13,
                      boxShadow: "3px 3px 0px #000",
                      transition: "transform 0.15s ease, box-shadow 0.15s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translate(-2px,-2px)";
                      e.currentTarget.style.boxShadow = "5px 5px 0px #000";
                      e.currentTarget.style.background = group.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translate(0,0)";
                      e.currentTarget.style.boxShadow = "3px 3px 0px #000";
                      e.currentTarget.style.background = "#FFF8E8";
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- PROJECTS ---------- */

function ProjectCard({ p, index }) {
  const flip = index % 2 === 1;
  const rotate = index % 2 === 0 ? -2 : 2;
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={index * 100}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: flip ? "row-reverse" : "row",
          gap: 32,
          alignItems: "stretch",
          background: "#FFFFFF",
          border: "4px solid #000",
          borderRadius: 24,
          boxShadow: hovered ? "16px 16px 0px #000" : "10px 10px 0px #000",
          padding: 32,
          transform: hovered
            ? "translate(-4px,-6px) rotate(0deg)"
            : `rotate(${rotate}deg)`,
          transition: "transform 0.25s cubic-bezier(.17,.84,.44,1), box-shadow 0.25s ease",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: "1 1 220px",
            minWidth: 220,
            borderRadius: 18,
            border: "4px solid #000",
            background: p.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 220,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Boxes size={64} color="#111" strokeWidth={1.5} />
          <span
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              background: "#111",
              color: "#FFF8E8",
              fontWeight: 800,
              fontSize: 12,
              padding: "5px 12px",
              borderRadius: 999,
            }}
          >
            {p.year}
          </span>
        </div>

        <div style={{ flex: "2 1 320px", minWidth: 280 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              color: "#4F7DFF",
              marginBottom: 8,
            }}
          >
            {p.tag}
          </span>
          <h3 style={{ margin: "0 0 12px", fontSize: 28, fontWeight: 900, color: "#111", lineHeight: 1.1 }}>
            {p.title}
          </h3>
          <p style={{ margin: "0 0 16px", color: "#333", fontWeight: 500, lineHeight: 1.6 }}>
            {p.description}
          </p>
          <ul style={{ margin: "0 0 18px", paddingLeft: 20, color: "#111" }}>
            {p.features.map((f) => (
              <li key={f} style={{ marginBottom: 6, fontSize: 14.5, fontWeight: 500, lineHeight: 1.5 }}>
                {f}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
            {p.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  border: "2.5px solid #000",
                  borderRadius: 999,
                  padding: "4px 12px",
                  background: "#FFF8E8",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div
  style={{
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 8,
  }}
>
  <a
    href={p.live}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      textDecoration: "none",
      fontWeight: 800,
      fontSize: 14,
      background: "#111",
      color: "#FFF8E8",
      padding: hovered ? "12px 26px" : "10px 20px",
      borderRadius: 12,
      border: "3px solid #000",
      transition: "all .25s ease",
      cursor: "pointer",
    }}
  >
    Live Demo
    <MoveRight size={16} />
  </a>

  <a
    href={p.code}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      textDecoration: "none",
      fontWeight: 800,
      fontSize: 14,
      background: "#FFF8E8",
      color: "#111",
      padding: hovered ? "12px 26px" : "10px 20px",
      borderRadius: 12,
      border: "3px solid #000",
      transition: "all .25s ease",
      cursor: "pointer",
    }}
  >
    <FaGithub size={16} />
    Source Code
  </a>
</div>
        </div>
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="Projects" style={{ padding: "100px 24px" }}>
      <SectionTitle eyebrow="The good stuff" title="Projects" color="#4F7DFF" />
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", gap: 56 }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------- EXPERIENCE / POSITIONS ---------- */

function Experience() {
  return (
    <section id="Experience" style={{ padding: "100px 24px" }}>
      <SectionTitle eyebrow="Leadership" title="Positions of Responsibility" color="#FFD43B" />
      <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
        {POSITIONS.map((pos, i) => (
          <Reveal key={pos.org} delay={i * 120}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: "#FFFFFF",
                border: "4px solid #000",
                borderRadius: 20,
                boxShadow: "8px 8px 0px #000",
                padding: 26,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  flexShrink: 0,
                  borderRadius: 14,
                  background: pos.color,
                  border: "3px solid #000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Star size={26} color="#111" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontWeight: 900, fontSize: 19 }}>{pos.role}</h3>
                <p style={{ margin: "4px 0 0", color: "#444", fontWeight: 600 }}>{pos.org}</p>
                <p style={{ margin: "2px 0 0", color: "#888", fontSize: 13, fontWeight: 700 }}>{pos.period}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */

function Contact() {
  const cards = [
    {
      icon: Phone,
      label: "Phone",
      value: PROFILE.phone,
      href: `tel:${PROFILE.phone}`,
      color: "#4F7DFF",
    },
    {
      icon: Mail,
      label: "Email",
      value: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
      color: "#FFD43B",
    },
    {
      icon: FaGithub,
      label: "GitHub",
      value: "View Profile",
      href: "https://github.com/Aryanftw",
      color: "#FF8A65",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "Connect",
      href: "https://www.linkedin.com/in/aryan-parmar-90b10a324/",
      color: "#7C4DFF",
    },
    {
      icon: SiLeetcode,
      label: "Leetcode",
      value: "view Profile",
      href: "https://leetcode.com/u/Ichigo_123/",
      color: "#FFA116",
    }
  ];
  return (
    <section id="Contact" style={{ padding: "100px 24px 140px" }}>
      <SectionTitle eyebrow="Let's talk" title="Contact" color="#FF8A65" />
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 22,
        }}
      >
        {cards.map((c, i) => (
          <Reveal key={c.label} delay={i * 90}>
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              style={{
                display: "block",
                textDecoration: "none",
                color: "#111",
                background: "#FFFFFF",
                border: "4px solid #000",
                borderRadius: 20,
                boxShadow: "8px 8px 0px #000",
                padding: 26,
                transition: "transform 0.18s ease, box-shadow 0.18s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-4px,-4px)";
                e.currentTarget.style.boxShadow = "12px 12px 0px #000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0,0)";
                e.currentTarget.style.boxShadow = "8px 8px 0px #000";
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: c.color,
                  border: "3px solid #000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <c.icon size={22} color="#111" />
              </div>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 13, textTransform: "uppercase", color: "#888" }}>
                {c.label}
              </p>
              <p style={{ margin: "4px 0 0", fontWeight: 800, fontSize: 16, wordBreak: "break-word" }}>
                {c.value} <ArrowUpRight size={14} style={{ display: "inline" }} />
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- ROOT APP ---------- */

export default function Portfolio() {
  const [active, setActive] = useState("Home");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "#FFF8E8", minHeight: "100vh", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-22px) rotate(8deg); }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>

      <Navbar active={active} onNav={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Experience />
      <Contact />

      <footer
        style={{
          textAlign: "center",
          padding: "30px 20px",
          borderTop: "4px solid #000",
          fontWeight: 800,
          fontSize: 14,
          background: "#111",
          color: "#FFF8E8",
        }}
      >
        Built with intent · Aryan © 2026
      </footer>
    </div>
  );
}