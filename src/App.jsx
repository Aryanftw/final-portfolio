import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail,
  Phone,
  FileText,
  ArrowUpRight,
  ArrowUp,
  ArrowRight,
  GraduationCap,
  Code2,
  Boxes,
  Database,
  Layers,
  Wrench,
  Cpu,
  MapPin,
  Check,
  Menu,
  X,
  Copy,
  Sun,
  Moon,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

/* ---------- DATA (synced with aryan_resume_094.pdf) ---------- */

const PROFILE = {
  name: "Aryan Parmar",
  role: "Software Engineer — Full-stack & ML Systems",
  phone: "+91-9408744422",
  email: "ap890383@gmail.com",
  location: "Surat, Gujarat — India",
  school: "SVNIT Surat · B.Tech ECE '27",
  github: "https://github.com/Aryanftw",
  linkedin: "https://www.linkedin.com/in/aryan-parmar-90b10a324/",
  leetcode: "https://leetcode.com/u/Ichigo_123/",
  resume: "/aryan-latest-resume.pdf",
};

const EDUCATION = [
  {
    school: "National Institute of Technology, Surat",
    location: "Surat, Gujarat, India",
    degree: "B.Tech — Electronics & Communication Engineering",
    detail: "CGPA 7.37 / 10",
    year: "2023 — Present",
  },
  {
    school: "GSHSEB Board",
    location: "Gujarat, India",
    degree: "Higher Secondary Education (Class XII)",
    detail: "77%",
    year: "2023",
  },
  {
    school: "GSEB Board",
    location: "Gujarat, India",
    degree: "Secondary Education (Class X)",
    detail: "76%",
    year: "2021",
  },
];

const SKILLS = [
  { group: "Languages", icon: Code2, items: ["C++", "JavaScript", "Python", "SQL"] },
  { group: "Frameworks & Libraries", icon: Layers, items: ["Node.js", "Express.js", "Next.js", "React.js", "Socket.IO", "FastAPI", "Tailwind CSS"] },
  { group: "Databases", icon: Database, items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"] },
  { group: "ORMs", icon: Boxes, items: ["Prisma", "Mongoose"] },
  { group: "Core Concepts", icon: Cpu, items: ["DSA", "REST API Design", "System Design", "OOP", "DBMS", "OS", "Networks"] },
  { group: "Testing & Tooling", icon: Wrench, items: ["Unit & Integration Testing", "Postman", "Git", "GitHub", "Docker", "VS Code", "Vercel"] },
];

const PROJECTS = [
  {
    title: "QueueForge — Distributed Job Processing",
    tag: "Systems · 2026",
    year: "2026",
    tint: "#EFF1EC",
    description:
      "A scalable distributed background-job system built from scratch on Node.js and Redis — no BullMQ, no Agenda.",
    features: [
      "Four-process architecture: Producer, Worker, Scheduler, Dashboard with concurrent multi-worker ownership",
      "Priority queues, delayed jobs, exponential-backoff retries and dead-letter queues for failure stability",
      "8+ REST APIs over Redis lists, hashes and sorted sets — validated against 1,000+ simulated jobs",
      "React operations dashboard with Recharts: throughput, worker activity, failures, queue depth",
    ],
    tech: ["Node.js", "Redis", "React.js", "REST API", "Recharts"],
    live: "",
    code: "https://github.com/Aryanftw",
  },
  {
    title: "Real-Time Traffic Violation Detection",
    tag: "Computer Vision · 2026",
    year: "2026",
    tint: "#F2EFE8",
    description:
      "Dual-model YOLOv8 pipeline spotting helmet violations, triple riding and licence plates in real time.",
    features: [
      "YOLOv8 + OpenCV + EasyOCR detection pipeline for helmet, triple-riding and plate recognition",
      "Evaluation framework across 1,000+ annotated frames to measure detection accuracy",
      "Automatic violation logging with visual evidence for audit trails",
    ],
    tech: ["Python", "YOLOv8", "OpenCV", "EasyOCR"],
    live: "",
    code: "https://github.com/Aryanftw",
  },
  {
    title: "Fake Social Media Account Detection",
    tag: "Echelon Hackathon · ML",
    year: "2026",
    tint: "#F2F0EB",
    description:
      "Behavioural modelling fused with NLP profile analysis to flag fake accounts with measurable accuracy.",
    features: [
      "Random Forest on behavioural features combined with BERT-based profile text classification",
      "15+ engineered linguistic features via TextStat for bot-vs-human signal",
      "FastAPI backend with Streamlit dashboard for real-time predictions and metrics",
    ],
    tech: ["Python", "Random Forest", "BERT", "FastAPI", "Streamlit", "TextStat"],
    live: "",
    code: "https://github.com/Aryanftw/fake-account-detection",
  },
  {
    title: "Helper Buddy — Service Booking Platform",
    tag: "GWOC · Full-stack",
    year: "2025",
    tint: "#EFEEF3",
    description:
      "A production service-booking marketplace built with a team across 10+ responsive pages.",
    features: [
      "Next.js storefront with Prisma + PostgreSQL modelling 8+ relational entities",
      "Global state with Zustand, shipped to production under Google Winter of Code (GWOC)",
    ],
    tech: ["Next.js", "Prisma", "PostgreSQL", "Zustand"],
    live: "https://helperbuddy-sigma.vercel.app/",
    code: "https://github.com/lokesh-makam/HelperBuddy",
  },
];

const POSITIONS = [
  {
    org: "Google Developer Group (GDG), NIT Surat",
    role: "Junior Developer",
    period: "Oct 2024 — May 2025",
  },
  {
    org: "ACM Club, NIT Surat",
    role: "Executive Member",
    period: "Aug 2024 — Mar 2025",
  },
];

const STACK_STRIP = [
  "Node.js", "React", "Next.js", "Python", "Redis",
  "PostgreSQL", "MongoDB", "YOLOv8", "FastAPI", "Docker", "Prisma", "Tailwind",
];

const NAV = ["Home", "About", "Education", "Skills", "Projects", "Experience", "Contact"];

/* ---------- HOOKS ---------- */

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
      { threshold: 0.12 }
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
      className={`reveal ${className}`}
      style={{
        transform: visible ? "translateY(0)" : "translateY(24px)",
        opacity: visible ? 1 : 0,
        transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* Animated number: counts up when `active` becomes true */
function useCountUp(target, active, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

function Stat({ value, suffix = "", decimals = 0, label, active }) {
  const v = useCountUp(value, active);
  const text = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString().padStart(2, "0");
  return (
    <div className="hero-stat">
      <b style={{ fontVariantNumeric: "tabular-nums" }}>{text}{suffix}</b>
      <span>{label}</span>
    </div>
  );
}

/* Magnetic hover wrapper — subtle pull toward cursor */
function Magnetic({ children, strength = 6 }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${(x / r.width) * strength * 2}px, ${(y / r.height) * strength * 2}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <span ref={ref} className="magnetic" onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </span>
  );
}

/* Card spotlight — soft radial glow following the cursor */
function useSpotlight() {
  return useCallback((e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
}

function Eyebrow({ children }) {
  return (
    <div className="eyebrow-row">
      <span className="eyebrow-line" />
      <span className="small-caps">{children}</span>
    </div>
  );
}

/* ---------- DAY / NIGHT ---------- */

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const saved = window.localStorage.getItem("ap-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch { /* ignore */ }
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function ThemeToggle({ theme, onToggle, label }) {
  const isDark = theme === "dark";
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={label || (isDark ? "Switch to day mode" : "Switch to night mode")}
      title={isDark ? "Switch to day mode" : "Switch to night mode"}
    >
      <Sun size={17} className="ti ti-sun" />
      <Moon size={17} className="ti ti-moon" />
    </button>
  );
}

/* ---------- LOADER ---------- */

function Loader({ exiting }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const dur = 1300;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      setPct(Math.round((1 - Math.pow(1 - p, 2)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className={`loader ${exiting ? "loader-exit" : ""}`} aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-mark">A</div>
        <div className="loader-name">Aryan Parmar</div>
        <div className="loader-sub">Portfolio — 2026</div>
        <div className="loader-track">
          <div className="loader-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="loader-pct">{pct}%</div>
      </div>
    </div>
  );
}

/* ---------- SCROLLER ---------- */

function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const p = max > 0 ? h.scrollTop / max : 0;
        if (ref.current) ref.current.style.transform = `scaleX(${p})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="progress-track" aria-hidden="true">
      <div ref={ref} className="progress-fill" />
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={`back-top ${show ? "show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp size={17} />
    </button>
  );
}

/* ---------- NAV ---------- */

function Navbar({ active, onNav, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 320 && y > lastY.current + 4 && !open) setHidden(true);
      else if (y < lastY.current - 4 || y < 320) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open ]);

  const go = (id) => {
    setOpen(false);
    onNav(id);
  };

  return (
    <div className={`nav-shell ${hidden ? "nav-hidden" : ""}`}>
      <div style={{ width: "min(1120px, 100%)", pointerEvents: "auto" }}>
        <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`} aria-label="Primary">
          <a href="#Home" onClick={(e) => { e.preventDefault(); go("Home"); }} className="brand">
            <span className="brand-mark">A</span>
            <span>
              <span className="brand-name">Aryan Parmar</span>
              <span className="brand-sub">Portfolio ’26</span>
            </span>
          </a>
          <div className="nav-links">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => go(item)}
                className={`nav-link ${active === item ? "active" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <Magnetic>
              <button className="btn btn-primary btn-sm nav-cta" onClick={() => go("Contact")}>
                Let’s talk <ArrowUpRight size={15} />
              </button>
            </Magnetic>
            <button className="hamburger" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="mobile-menu">
            {NAV.map((item, i) => (
              <button
                key={item}
                onClick={() => go(item)}
                className={`${active === item ? "active" : ""} m-item`}
                style={{ animationDelay: `${i * 35}ms` }}
              >
                <span className="m-index">0{i + 1}</span> {item}
              </button>
            ))}
            <div className="mobile-menu-foot">
              <span>{theme === "dark" ? "Night mode" : "Day mode"}</span>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- HERO ---------- */

function Hero({ onNav, ready }) {
  return (
    <section id="Home" className="hero">
      <div className="wrap hero-grid">
        <div className={`hero-enter ${ready ? "in" : ""}`}>
          <div className="he he-1">
            <span className="status-pill">
              <span className="dot" /> Available for SWE internships · 2026
            </span>
          </div>
          <h1 className="display he he-2">
            Building <em>quiet,</em><br />
            capable software<br />
            that ships.
          </h1>
          <p className="lede hero-lede he he-3">
            I’m {PROFILE.name} — an ECE undergrad at SVNIT Surat working across
            distributed backends, full-stack platforms and ML vision systems.
          </p>
          <div className="hero-ctas he he-4">
            <Magnetic>
              <a className="btn btn-primary" href={PROFILE.resume} download>
                <FileText size={16} /> Download Résumé
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href={PROFILE.github} target="_blank" rel="noreferrer">
                <FaGithub size={16} /> GitHub
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedin size={16} /> LinkedIn
              </a>
            </Magnetic>
          </div>
          <div className="hero-meta he he-5">
            <Stat value={4} label="Projects shipped" active={ready} />
            <Stat value={7.37} decimals={2} label="CGPA · SVNIT" active={ready} />
            <Stat value={500} suffix="+" label="DSA problems" active={ready} />
          </div>
        </div>

        <Reveal delay={200} className={`hero-card-wrap ${ready ? "" : "pre"}`}>
          <aside className="profile-card spot" aria-label="Profile summary">
            <div className="profile-top">
              <div className="avatar">A</div>
              <div>
                <h3>{PROFILE.name}</h3>
                <p>{PROFILE.role}</p>
              </div>
            </div>
            <div className="profile-rows">
              <div className="profile-row"><MapPin size={15} /> {PROFILE.location}</div>
              <div className="profile-row"><GraduationCap size={15} /> {PROFILE.school}</div>
              <div className="profile-row"><Mail size={15} /> {PROFILE.email}</div>
              <div className="profile-row"><Phone size={15} /> {PROFILE.phone}</div>
            </div>
            <div className="profile-cta">
              <button className="btn btn-primary btn-sm" onClick={() => onNav("Projects")}>
                View work <ArrowRight size={14} />
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => onNav("Contact")}>
                Contact
              </button>
            </div>
          </aside>
        </Reveal>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        <span className="scroll-mouse"><span className="scroll-wheel" /></span>
        <span>Scroll</span>
      </div>
    </section>
  );
}

function StackStrip() {
  const row = [...STACK_STRIP, ...STACK_STRIP];
  return (
    <div className="strip" aria-hidden="true">
      <div className="strip-inner">
        {row.map((s, i) => (
          <span key={i}>{s} <i /></span>
        ))}
      </div>
    </div>
  );
}

/* ---------- SECTIONS ---------- */

function About() {
  const spot = useSpotlight();
  return (
    <section id="About" className="section-pad">
      <div className="wrap split">
        <div className="split-sticky">
          <Reveal>
            <Eyebrow>01 — About</Eyebrow>
            <h2 className="section-title">Engineer with a product mindset.</h2>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <div className="about-body">
            <p>
              I’m <strong>Aryan Parmar</strong>, a B.Tech student in Electronics &amp;
              Communication at <strong>SVNIT Surat</strong> (CGPA <strong>7.37</strong>).
              I build systems end-to-end — a distributed job processor on Node.js
              + Redis with its own queue internals, a real-time traffic-violation
              detector on YOLOv8, an ML fake-account detector, and a GWOC
              production marketplace on Next.js + PostgreSQL.
            </p>
            <p>
              I work across <strong>C++, JavaScript, Python and SQL</strong>, care
              about REST design, system design and testing, and I’ve led as a
              Junior Developer at <strong>GDG NIT Surat</strong> and an Executive
              Member at the <strong>ACM Club</strong>. I’m looking for a software
              engineering internship where I can keep shipping real products.
            </p>
            <ul className="tick-list">
              {[
                "Distributed systems: queues, retries, DLQs",
                "Vision + ML: YOLOv8, BERT, FastAPI",
                "Full-stack: Next.js, Express, Prisma",
                "Data: PostgreSQL, Redis, MongoDB",
              ].map((t) => (
                <li key={t} className="spot" onMouseMove={spot}>
                  <span className="tick"><Check size={13} /></span> {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Education() {
  const spot = useSpotlight();
  return (
    <section id="Education" className="section-pad" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="two-col-head">
          <Reveal>
            <Eyebrow>02 — Academics</Eyebrow>
            <h2 className="section-title">Education</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-sub">
              A steady academic base in electronics and engineering, paired with
              self-driven work in software and machine learning.
            </p>
          </Reveal>
        </div>
        <div className="timeline">
          {EDUCATION.map((ed, i) => (
            <Reveal key={ed.school} delay={i * 90}>
              <div className="card t-item spot" onMouseMove={spot}>
                <div className="t-icon"><GraduationCap size={22} strokeWidth={1.6} /></div>
                <div>
                  <h3>{ed.school}</h3>
                  <p className="meta">{ed.degree} · {ed.detail}</p>
                  <p className="meta" style={{ fontSize: 13 }}>{ed.location}</p>
                </div>
                <span className="t-year">{ed.year}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const spot = useSpotlight();
  return (
    <section id="Skills" className="section-pad" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="two-col-head">
          <Reveal>
            <Eyebrow>03 — Toolbox</Eyebrow>
            <h2 className="section-title">Skills</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-sub">
              A focused set of tools I reach for to design, build and deploy
              end-to-end products.
            </p>
          </Reveal>
        </div>
        <div className="skills-grid">
          {SKILLS.map((g, i) => (
            <Reveal key={g.group} delay={(i % 3) * 90}>
              <div className="card skill-card spot" onMouseMove={spot}>
                <div className="skill-head">
                  <span className="skill-ico"><g.icon size={18} strokeWidth={1.7} /></span>
                  <h3>{g.group}</h3>
                </div>
                <div className="pills">
                  {g.items.map((s) => (
                    <span key={s} className="pill">{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const spot = useSpotlight();
  return (
    <section id="Projects" className="section-pad" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="two-col-head">
          <Reveal>
            <Eyebrow>04 — Selected work</Eyebrow>
            <h2 className="section-title">Projects</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-sub">
              Four builds spanning distributed systems, computer vision, ML
              detection and production marketplaces.
            </p>
          </Reveal>
        </div>
        <div className="projects-list">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={Math.min(i * 80, 200)}>
              <article className="card project spot" onMouseMove={spot}>
                <div className="p-visual" style={{ background: p.tint }}>
                  <span className="p-num">0{i + 1}</span>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
                    <div className="p-glyph"><Boxes size={26} strokeWidth={1.5} /></div>
                    <span className="t-year">{p.year}</span>
                  </div>
                </div>
                <div className="p-body">
                  <span className="p-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p className="p-desc">{p.description}</p>
                  <ul className="p-feats">
                    {p.features.map((f) => (
                      <li key={f}><Check size={14} /> <span>{f}</span></li>
                    ))}
                  </ul>
                  <div className="p-tech">
                    {p.tech.map((t) => <span key={t}>{t}</span>)}
                  </div>
                  <div className="p-actions">
                    {p.live ? (
                      <a className="btn btn-primary btn-sm arrow-slide" href={p.live} target="_blank" rel="noreferrer">
                        Live demo <ArrowUpRight size={14} />
                      </a>
                    ) : (
                      <span className="btn btn-ghost btn-sm" style={{ opacity: 0.55, pointerEvents: "none" }}>
                        Demo on request
                      </span>
                    )}
                    <a className="btn btn-ghost btn-sm arrow-slide" href={p.code} target="_blank" rel="noreferrer">
                      <FaGithub size={14} /> Source
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const spot = useSpotlight();
  return (
    <section id="Experience" className="section-pad" style={{ paddingTop: 0 }}>
      <div className="wrap split">
        <div className="split-sticky">
          <Reveal>
            <Eyebrow>05 — Leadership</Eyebrow>
            <h2 className="section-title">Experience</h2>
            <p className="section-sub" style={{ marginTop: 12 }}>
              Positions of responsibility across developer communities at NIT Surat.
            </p>
          </Reveal>
        </div>
        <div className="exp-list">
          {POSITIONS.map((pos, i) => (
            <Reveal key={pos.org} delay={i * 100}>
              <div className="card exp-item spot" onMouseMove={spot}>
                <div className="exp-dot"><Check size={18} /></div>
                <div>
                  <h3>{pos.role}</h3>
                  <p>{pos.org}</p>
                </div>
                <span className="exp-period">{pos.period}</span>
              </div>
            </Reveal>
          ))}
          <Reveal delay={200}>
            <div className="card avail-card">
              <p>
                <span className="avail-live"><span className="dot" /> Open to internships — </span>
                SWE, full-stack or ML-adjacent roles starting 2026. Fast learner,
                comfortable owning features end-to-end.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact({ notify }) {
  const [copied, setCopied] = useState(false);
  const spot = useSpotlight();
  const cards = [
    { icon: Phone, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/[^+\d]/g, "")}` },
    { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: FaGithub, label: "GitHub", value: "@Aryanftw", href: PROFILE.github },
    { icon: FaLinkedin, label: "LinkedIn", value: "Connect", href: PROFILE.linkedin },
    { icon: SiLeetcode, label: "LeetCode", value: "View profile", href: PROFILE.leetcode },
  ];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = PROFILE.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    notify("Email copied to clipboard");
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="Contact" className="section-pad" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal>
          <div className="contact-hero spot" onMouseMove={spot}>
            <Eyebrow>06 — Contact</Eyebrow>
            <h2>Have an idea?<br /><em>Let’s build it.</em></h2>
            <p className="contact-sub">
              I’m currently looking for a software engineering internship.
              My inbox is always open — I usually reply within a day.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <Magnetic>
                <a className="btn btn-primary" href={`mailto:${PROFILE.email}`}>
                  <Mail size={16} /> {PROFILE.email}
                </a>
              </Magnetic>
              <Magnetic>
                <button className="btn btn-ghost" onClick={copyEmail}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied" : "Copy email"}
                </button>
              </Magnetic>
              <Magnetic>
                <a className="btn btn-ghost" href={PROFILE.resume} download>
                  <FileText size={16} /> Résumé
                </a>
              </Magnetic>
            </div>
            <div className="contact-grid">
              {cards.map((c) => (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="card contact-card spot" onMouseMove={spot}>
                  <span className="c-ico"><c.icon size={17} /></span>
                  <b>{c.label}</b>
                  <span>{c.value} <ArrowUpRight size={13} /></span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ onNav }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata",
    });
    const update = () => setTime(`${fmt.format(new Date())} IST`);
    update();
    const id = setInterval(update, 20000);
    return () => clearInterval(id);
  }, []);
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p>© 2026 Aryan Parmar · Surat, India · <span className="live-time">{time}</span></p>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="to-top" aria-label="GitHub"><FaGithub size={16} /></a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="to-top" aria-label="LinkedIn"><FaLinkedin size={16} /></a>
          <button className="to-top" onClick={() => onNav("Home")} aria-label="Back to top"><ArrowUp size={16} /></button>
        </div>
      </div>
    </footer>
  );
}

/* ---------- ROOT ---------- */

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [loading, setLoading] = useState(true);
  const [loaderGone, setLoaderGone] = useState(false);
  const [toast, setToast] = useState("");
  const [theme, setTheme] = useState(getInitialTheme);

  /* Apply day/night mode: <html data-theme>, persistence, browser chrome */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem("ap-theme", theme);
    } catch { /* ignore */ }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0f0f0d" : "#fafaf7");
  }, [theme]);

  /* Follow OS changes only until the user picks manually */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      try {
        if (!window.localStorage.getItem("ap-theme")) {
          setTheme(e.matches ? "dark" : "light");
        }
      } catch {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const notify = useCallback((msg) => {
    setToast(msg);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  /* Loader lifecycle: minimum display, then curtain exit */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 1500);
    const t2 = setTimeout(() => setLoaderGone(true), 2150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

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
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [loaderGone]);

  return (
    <div style={{ minHeight: "100vh" }}>
      {!loaderGone && <Loader exiting={!loading} />}
      <ScrollProgress />
      <Navbar active={active} onNav={scrollTo} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero onNav={scrollTo} ready={!loading} />
        <StackStrip />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Contact notify={notify} />
      </main>
      <Footer onNav={scrollTo} />
      <BackToTop />
      <div className={`toast ${toast ? "show" : ""}`} role="status">
        <Check size={14} /> {toast}
      </div>
    </div>
  );
}
