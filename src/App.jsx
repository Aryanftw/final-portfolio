import { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail,
  Phone,
  FileText,
  ArrowUpRight,
  ArrowUp,
  ArrowRight,
  Code2,
  Boxes,
  Database,
  Layers,
  Wrench,
  Cpu,
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
  location: "Surat, Gujarat · India",
  school: "SVNIT Surat · B.Tech ECE ’27",
  github: "https://github.com/Aryanftw",
  linkedin: "https://www.linkedin.com/in/aryan-parmar-90b10a324/",
  leetcode: "https://leetcode.com/u/Ichigo_123/",
  resume: "/aryan-latest-resume.pdf",
};

const EDUCATION = [
  {
    school: "National Institute of Technology, Surat",
    degree: "B.Tech — Electronics & Communication Engineering",
    detail: "CGPA 7.37 / 10",
    location: "Surat, Gujarat",
    year: "2023 — Present",
    note: "In progress",
  },
  {
    school: "GSHSEB Board",
    degree: "Higher Secondary Education (Class XII)",
    detail: "77%",
    location: "Gujarat",
    year: "2023",
  },
  {
    school: "GSEB Board",
    degree: "Secondary Education (Class X)",
    detail: "76%",
    location: "Gujarat",
    year: "2021",
  },
];

const SKILLS = [
  { group: "Languages", icon: Code2, items: ["C++", "JavaScript", "Python", "SQL"] },
  {
    group: "Frameworks & Libraries",
    icon: Layers,
    items: ["Node.js", "Express.js", "Next.js", "React.js", "Socket.IO", "FastAPI", "Tailwind CSS"],
  },
  { group: "Databases", icon: Database, items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"] },
  { group: "ORMs", icon: Boxes, items: ["Prisma", "Mongoose"] },
  {
    group: "Core Concepts",
    icon: Cpu,
    items: ["DSA", "REST API Design", "System Design", "OOP", "DBMS", "OS", "Networks"],
  },
  {
    group: "Testing & Tooling",
    icon: Wrench,
    items: ["Unit & Integration Testing", "Postman", "Git", "GitHub", "Docker", "VS Code", "Vercel"],
  },
];

const PROJECTS = [
  {
    title: "QueueForge — Distributed Job Processing",
    tag: "Systems · 2026",
    year: "2026",
    tint: "#e9e7dc",
    viz: "queue",
    description:
      "A scalable distributed background-job system built from scratch on Node.js and Redis — no BullMQ, no Agenda.",
    features: [
      "Four-process architecture: Producer, Worker, Scheduler and Dashboard, with concurrent multi-worker ownership",
      "Priority queues, delayed jobs, exponential-backoff retries and dead-letter queues for failure stability",
      "8+ REST APIs over Redis lists, hashes and sorted sets, validated against 1,000+ simulated jobs",
      "React operations dashboard with Recharts: throughput, worker activity, failures and queue depth",
    ],
    tech: ["Node.js", "Redis", "React.js", "REST API", "Recharts"],
    live: "",
    code: "https://github.com/Aryanftw",
  },
  {
    title: "Real-Time Traffic Violation Detection",
    tag: "Computer Vision · 2026",
    year: "2026",
    tint: "#e6e8e4",
    viz: "frame",
    description:
      "A dual-model YOLOv8 pipeline spotting helmet violations, triple riding and licence plates in real time.",
    features: [
      "YOLOv8 + OpenCV + EasyOCR pipeline for helmet, triple-riding and plate recognition",
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
    tint: "#eae6e0",
    viz: "signal",
    description:
      "Behavioural modelling fused with NLP profile analysis to flag fake accounts with measurable accuracy.",
    features: [
      "Random Forest on behavioural features combined with BERT-based profile text classification",
      "15+ engineered linguistic features via TextStat for bot-versus-human signal",
      "FastAPI backend with a Streamlit dashboard for real-time predictions and metrics",
    ],
    tech: ["Python", "Random Forest", "BERT", "FastAPI", "Streamlit", "TextStat"],
    live: "",
    code: "https://github.com/Aryanftw/fake-account-detection",
  },
  {
    title: "Helper Buddy — Service Booking Platform",
    tag: "GWOC · Full-stack",
    year: "2025",
    tint: "#e5e6ea",
    viz: "ui",
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

const PRINCIPLES = [
  "Distributed systems: queues, retries and dead-letter paths",
  "Vision & ML: YOLOv8, BERT, FastAPI pipelines",
  "Full-stack product work: Next.js, Express, Prisma",
  "Data modelling first: PostgreSQL, Redis, MongoDB",
];

const STACK_STRIP = [
  "Node.js", "React", "Next.js", "Python", "Redis", "PostgreSQL",
  "MongoDB", "YOLOv8", "FastAPI", "Docker", "Prisma", "Tailwind",
];

const NAV = ["Home", "About", "Education", "Skills", "Projects", "Experience", "Contact"];

/* ---------- HOOKS & PRIMITIVES ---------- */

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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", as: Tag = "div", ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function useCountUp(target, active, duration = 1300) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setVal(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

function Stat({ value, suffix = "", decimals = 0, label, active }) {
  const v = useCountUp(value, active);
  const text =
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString().padStart(2, "0");
  return (
    <div className="stat">
      <b>
        {text}
        {suffix}
      </b>
      <span>{label}</span>
    </div>
  );
}

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

function useSpotlight() {
  return useCallback((e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
}

function Eyebrow({ idx, children }) {
  return (
    <div className="eyebrow">
      <span className="idx">{idx}</span>
      <span>{children}</span>
    </div>
  );
}

/* ---------- THEME ---------- */

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const saved = window.localStorage.getItem("ap-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* ignore */
  }
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      title={isDark ? "Switch to day mode" : "Switch to night mode"}
    >
      <Sun size={16} className="ti ti-sun" aria-hidden="true" />
      <Moon size={16} className="ti ti-moon" aria-hidden="true" />
    </button>
  );
}

/* ---------- LOADER ---------- */

function Loader({ exiting }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const dur = 1250;
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

/* ---------- FLOATING UI ---------- */

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
    const onScroll = () => setShow(window.scrollY > 800);
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
      <ArrowUp size={17} aria-hidden="true" />
    </button>
  );
}

/* ---------- NAVIGATION ---------- */

function Navbar({ active, onNav, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 360 && y > lastY.current + 4 && !open) setHidden(true);
      else if (y < lastY.current - 4 || y < 360) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  const requestClose = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 240);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, requestClose]);

  const go = (id) => {
    if (open) requestClose();
    onNav(id);
  };

  return (
    <>
      <div className={`nav-shell ${hidden && !open ? "nav-hidden" : ""}`}>
        <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`} aria-label="Primary">
          <a
            href="#Home"
            onClick={(e) => {
              e.preventDefault();
              go("Home");
            }}
            className="brand"
          >
            <span className="brand-mark" aria-hidden="true">A</span>
            <span className="brand-text">
              <span className="brand-name">{PROFILE.name}</span>
              <span className="brand-sub">Portfolio ’26</span>
            </span>
          </a>

          <div className="nav-links">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => go(item)}
                className={`nav-link ${active === item ? "active" : ""}`}
                aria-current={active === item ? "true" : undefined}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <Magnetic>
              <button className="btn btn-solid btn-sm nav-cta no-shift" onClick={() => go("Contact")}>
                Let’s talk <ArrowRight size={14} aria-hidden="true" />
              </button>
            </Magnetic>
            <button
              className="hamburger"
              onClick={() => (open ? requestClose() : setOpen(true))}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className={`mobile-menu ${closing ? "closing" : ""}`}>
          <nav aria-label="Mobile">
            {NAV.map((item, i) => (
              <button
                key={item}
                onClick={() => go(item)}
                className={`m-item ${active === item ? "active" : ""}`}
                style={{ animationDelay: `${60 + i * 40}ms` }}
                aria-current={active === item ? "true" : undefined}
              >
                <span className="m-index">0{i + 1}</span> {item}
              </button>
            ))}
          </nav>
          <div className="mobile-menu-foot">
            <span className="mm-meta">
              {theme === "dark" ? "Night mode" : "Day mode"} · Surat, India
            </span>
            <div className="mm-socials">
              <a
                className="icon-btn"
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
              >
                <FaGithub size={15} aria-hidden="true" />
              </a>
              <a
                className="icon-btn"
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
              >
                <FaLinkedin size={15} aria-hidden="true" />
              </a>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- HERO ---------- */

function SignaturePlate({ onNav, ready }) {
  return (
    <Reveal delay={180} className={`sig-wrap ${ready ? "" : "pre"}`}>
      <aside className="sig" aria-label="Profile summary">
        <div className="sig-canvas">
          <span className="sig-corner tl">Portfolio ’26</span>
          <span className="sig-corner tr">Surat · IN</span>
          <svg className="sig-ring" viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r="92" />
          </svg>
          <div className="sig-mark" aria-hidden="true">
            A<i>P</i>
          </div>
          <span className="sig-corner bl">21.17° N</span>
          <span className="sig-corner br">72.83° E</span>
        </div>
        <dl className="sig-rows">
          <div className="sig-row">
            <dt>Based</dt>
            <dd>{PROFILE.location}</dd>
          </div>
          <div className="sig-row">
            <dt>Education</dt>
            <dd>{PROFILE.school}</dd>
          </div>
          <div className="sig-row">
            <dt>Focus</dt>
            <dd>Distributed systems · Full-stack · ML</dd>
          </div>
          <div className="sig-row">
            <dt>Status</dt>
            <dd>
              <span className="live">
                <span className="dot" aria-hidden="true" />
                Open to SWE internships
              </span>
            </dd>
          </div>
        </dl>
        <div className="sig-cta">
          <button className="btn btn-solid btn-sm" onClick={() => onNav("Projects")}>
            View work <ArrowRight size={14} aria-hidden="true" />
          </button>
          <button className="btn btn-line btn-sm" onClick={() => onNav("Contact")}>
            Contact
          </button>
        </div>
      </aside>
    </Reveal>
  );
}

function Hero({ onNav, ready }) {
  return (
    <section id="Home" className="hero">
      <div className="wrap hero-grid">
        <div className={`hero-enter ${ready ? "in" : ""}`}>
          <div className="he he-1">
            <span className="hero-status">
              <span className="dot" aria-hidden="true" />
              Available for SWE internships · 2026
            </span>
          </div>
          <h1 className="display he he-2">
            Building software
            <br />
            that stays <em>calm</em>
            <br />
            under pressure.
          </h1>
          <p className="lede hero-lede he he-3">
            I’m {PROFILE.name} — an ECE undergrad at SVNIT Surat working across
            distributed backends, full-stack products and ML vision systems.
          </p>
          <div className="hero-ctas he he-4">
            <Magnetic>
              <button className="btn btn-solid" onClick={() => onNav("Projects")}>
                Selected work <ArrowRight size={15} aria-hidden="true" />
              </button>
            </Magnetic>
            <Magnetic>
              <button className="btn btn-line" onClick={() => onNav("Contact")}>
                Get in touch
              </button>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-quiet" href={PROFILE.resume} download>
                <FileText size={15} aria-hidden="true" /> Résumé
              </a>
            </Magnetic>
          </div>
          <div className="hero-meta he he-5">
            <Stat value={4} label="Projects shipped" active={ready} />
            <Stat value={7.37} decimals={2} label="CGPA · SVNIT" active={ready} />
            <Stat value={500} suffix="+" label="DSA problems" active={ready} />
          </div>
        </div>

        <SignaturePlate onNav={onNav} ready={ready} />
      </div>

      <div className="wrap">
        <div className="scroll-hint he he-6" aria-hidden="true">
          <span className="scroll-wheel" />
          <span>Scroll</span>
        </div>
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
          <span key={i}>
            {s} <i />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- ABOUT ---------- */

function About() {
  const spot = useSpotlight();
  return (
    <section id="About" className="section-pad">
      <div className="wrap split">
        <div className="split-sticky">
          <Reveal>
            <Eyebrow idx="01">About</Eyebrow>
            <h2 className="section-title">Engineer with a product mindset.</h2>
            <p className="section-sub">
              End-to-end builder — from queue internals to interface details.
            </p>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <div className="about-body spot" onMouseMove={spot}>
            <p className="about-lead">
              I build systems the way I like to use them: quiet, dependable and
              honest about their limits.
            </p>
            <p>
              I’m <strong>Aryan Parmar</strong>, a B.Tech student in Electronics
              &amp; Communication at <strong>SVNIT Surat</strong> (CGPA{" "}
              <strong>7.37</strong>). I work end-to-end — a distributed job
              processor on Node.js + Redis with its own queue internals, a
              real-time traffic-violation detector on YOLOv8, an ML fake-account
              detector, and a GWOC production marketplace on Next.js +
              PostgreSQL.
            </p>
            <p>
              I work across <strong>C++, JavaScript, Python and SQL</strong>,
              care about REST design, system design and testing, and have led as
              a Junior Developer at <strong>GDG NIT Surat</strong> and an
              Executive Member at the <strong>ACM Club</strong>. I’m looking for
              a software engineering internship where I can keep shipping real
              products.
            </p>
            <ul className="principles">
              {PRINCIPLES.map((t, i) => (
                <li key={t}>
                  <span className="p-idx">0{i + 1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- EDUCATION ---------- */

function Education() {
  return (
    <section id="Education" className="section-pad" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="two-col-head">
          <Reveal>
            <Eyebrow idx="02">Academics</Eyebrow>
            <h2 className="section-title">Education</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-sub">
              A steady academic base in electronics and engineering, paired with
              self-driven work in software and machine learning.
            </p>
          </Reveal>
        </div>

        <div className="rail">
          {EDUCATION.map((ed, i) => (
            <Reveal key={ed.school} delay={i * 90} as="article" className="rail-item">
              <div className="rail-year">{ed.year}</div>
              <div className="rail-node" aria-hidden="true"><span /></div>
              <div className="rail-body">
                <h3>{ed.school}</h3>
                <p className="rail-meta">
                  {ed.degree} · <strong>{ed.detail}</strong> · {ed.location}
                </p>
                {ed.note && <span className="rail-note">{ed.note}</span>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SKILLS ---------- */

function Skills() {
  return (
    <section id="Skills" className="section-pad" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="two-col-head">
          <Reveal>
            <Eyebrow idx="03">Toolbox</Eyebrow>
            <h2 className="section-title">Skills &amp; expertise</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-sub">
              A focused set of tools I reach for to design, build and deploy
              end-to-end products.
            </p>
          </Reveal>
        </div>

        <div className="spec">
          {SKILLS.map((g, i) => (
            <Reveal key={g.group} delay={Math.min(i * 60, 240)} as="div" className="spec-row">
              <div className="spec-label">
                <span className="s-ico" aria-hidden="true">
                  <g.icon size={15} strokeWidth={1.8} />
                </span>
                <h3>{g.group}</h3>
              </div>
              <div className="spec-items">
                {g.items.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROJECT VISUALS ---------- */

function VizQueue() {
  const lanes = [
    { name: "Producer", blocks: [1, 0, 1, 0, 0] },
    { name: "Priority", blocks: [0, 1, 1, 1, 0] },
    { name: "Delayed", blocks: [1, 1, 0, 0, 1] },
    { name: "Dead letter", blocks: [0, 0, 0, 1, 0] },
  ];
  const bars = [38, 62, 48, 90, 55, 74, 42, 66, 58, 84, 46, 70];
  return (
    <div className="viz viz-queue" aria-hidden="true">
      {lanes.map((lane, li) => (
        <div className="q-lane" key={lane.name}>
          <em>{lane.name}</em>
          <div className="q-track">
            {lane.blocks.map((b, bi) => (
              <span
                key={bi}
                className={`q-block ${b ? (li === 3 && bi === 3 ? "hi" : "") : "soft"}`}
                style={{ width: `${18 + ((bi * 7 + li * 11) % 22)}px` }}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="q-bars">
        {bars.map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function VizFrame() {
  return (
    <div className="viz" aria-hidden="true">
      <div className="viz-frame">
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />
        <span className="viz-scan" />
        <span className="det-box" data-label="helmet" style={{ top: "16%", left: "12%", width: "26%", height: "34%" }} />
        <span className="det-box muted" data-label="rider" style={{ top: "24%", left: "46%", width: "22%", height: "40%" }} />
        <span className="det-box" data-label="plate" style={{ top: "62%", left: "58%", width: "24%", height: "20%" }} />
      </div>
    </div>
  );
}

function VizSignal() {
  const cells = Array.from({ length: 60 }, (_, i) =>
    i % 9 === 4 ? "hot" : i % 5 === 0 ? "mid" : ""
  );
  return (
    <div className="viz viz-signal" aria-hidden="true">
      <div className="sig-dots">
        {cells.map((c, i) => (
          <span key={i} className={c} />
        ))}
      </div>
      <div className="sig-split">
        <span className="a">Human signal</span>
        <span className="b">Bot signal</span>
      </div>
    </div>
  );
}

function VizUI() {
  return (
    <div className="viz" aria-hidden="true">
      <div className="viz-ui">
        <div className="bar">
          <i /><i /><i />
          <b />
        </div>
        <div className="hero-b" />
        <div className="row3">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}

const VIZ = { queue: VizQueue, frame: VizFrame, signal: VizSignal, ui: VizUI };

/* ---------- PROJECTS ---------- */

function Projects() {
  const spot = useSpotlight();
  return (
    <section id="Projects" className="section-pad" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="two-col-head">
          <Reveal>
            <Eyebrow idx="04">Selected work</Eyebrow>
            <h2 className="section-title">Projects</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-sub">
              Four builds spanning distributed systems, computer vision, ML
              detection and production marketplaces.
            </p>
          </Reveal>
        </div>

        <div className="projects">
          {PROJECTS.map((p, i) => {
            const Viz = VIZ[p.viz] || VizQueue;
            return (
              <Reveal key={p.title} delay={Math.min(i * 70, 210)} as="article" className={`proj ${i % 2 ? "rev" : ""}`}>
                <div className="proj-visual" style={{ "--viz": p.tint }}>
                  <div className="proj-idxrow">
                    <span className="proj-idx">{String(i + 1).padStart(2, "0")}</span>
                    <span className="proj-year">{p.year}</span>
                  </div>
                  <Viz />
                </div>

                <div className="proj-body spot" onMouseMove={spot}>
                  <span className="proj-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p className="proj-desc">{p.description}</p>
                  <ul className="feats">
                    {p.features.map((f) => (
                      <li key={f}>
                        <span className="f-mark" aria-hidden="true">—</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="proj-tags">
                    {p.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="proj-actions">
                    {p.live ? (
                      <a className="link-arrow" href={p.live} target="_blank" rel="noreferrer">
                        Live demo <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="proj-note">Demo on request</span>
                    )}
                    <a className="link-arrow" href={p.code} target="_blank" rel="noreferrer">
                      <FaGithub size={14} aria-hidden="true" /> Source
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- EXPERIENCE ---------- */

function Experience() {
  return (
    <section id="Experience" className="section-pad" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="two-col-head">
          <Reveal>
            <Eyebrow idx="05">Leadership</Eyebrow>
            <h2 className="section-title">Experience</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-sub">
              Positions of responsibility across developer communities at NIT
              Surat.
            </p>
          </Reveal>
        </div>

        <div className="rail">
          {POSITIONS.map((pos, i) => (
            <Reveal key={pos.org} delay={i * 100} as="article" className="rail-item">
              <div className="rail-year">{pos.period}</div>
              <div className="rail-node" aria-hidden="true"><span /></div>
              <div className="rail-body">
                <h3>{pos.role}</h3>
                <p className="rail-meta">{pos.org}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={180}>
          <div className="avail-plate">
            <span className="avail-live">
              <span className="dot" aria-hidden="true" />
              Open to internships
            </span>
            <p>
              SWE, full-stack or ML-adjacent roles starting 2026. Fast learner,
              comfortable owning features end-to-end — from schema to shipped
              interface.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */

function Contact({ notify }) {
  const [copied, setCopied] = useState(false);
  const spot = useSpotlight();
  const channels = [
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
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="Contact" className="section-pad contact">
      <div className="wrap">
        <Reveal>
          <Eyebrow idx="06">Contact</Eyebrow>
          <h2 className="contact-title">
            Have something worth building?
            <br />
            <em>Let’s talk.</em>
          </h2>
          <a className="mailto" href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
          </a>

          <div className="contact-actions">
            <Magnetic>
              <button className="btn btn-solid" onClick={copyEmail}>
                {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                {copied ? "Copied" : "Copy email"}
              </button>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-line" href={`mailto:${PROFILE.email}`}>
                <Mail size={15} aria-hidden="true" /> Write to me
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-quiet" href={PROFILE.resume} download>
                <FileText size={15} aria-hidden="true" /> Résumé
              </a>
            </Magnetic>
            <span className="contact-note">
              <span className="dot" aria-hidden="true" /> Usually replies within a day
            </span>
          </div>
        </Reveal>

        <div className="channels">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={Math.min(i * 60, 240)} as="a" className="channel spot" href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" onMouseMove={spot}>
              <span className="ch-label">{c.label}</span>
              <span className="ch-value">
                <span className="ch-ico" aria-hidden="true">
                  <c.icon size={16} />
                </span>
                {c.value}
              </span>
              <ArrowUpRight size={16} className="ch-arrow" aria-hidden="true" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */

function Footer({ onNav }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const update = () => setTime(`${fmt.format(new Date())} IST`);
    update();
    const id = window.setInterval(update, 20000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="fb-name">Aryan Parmar</div>
            <p>
              Full-stack &amp; ML engineer — distributed backends, production web
              apps and vision systems. Open to internships in 2026.
            </p>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            {NAV.map((item) => (
              <button key={item} onClick={() => onNav(item)}>
                {item}
              </button>
            ))}
          </nav>
          <div className="footer-socials">
            <a className="icon-btn" href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <FaGithub size={16} aria-hidden="true" />
            </a>
            <a className="icon-btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <FaLinkedin size={16} aria-hidden="true" />
            </a>
            <a className="icon-btn" href={PROFILE.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode profile">
              <SiLeetcode size={16} aria-hidden="true" />
            </a>
            <button className="icon-btn" onClick={() => onNav("Home")} aria-label="Back to top">
              <ArrowUp size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2026 Aryan Parmar · Surat, India · <span className="live-time">{time}</span>
          </p>
          <p>Set in Fraunces, Inter &amp; JetBrains Mono</p>
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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem("ap-theme", theme);
    } catch {
      /* ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#111110" : "#f7f6f2");
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      try {
        if (!window.localStorage.getItem("ap-theme")) setTheme(e.matches ? "dark" : "light");
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

  const notify = useCallback((msg) => setToast(msg), []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = window.setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 1400);
    const t2 = window.setTimeout(() => setLoaderGone(true), 2050);
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
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      {!loaderGone && <Loader exiting={!loading} />}
      <ScrollProgress />
      <Navbar active={active} onNav={scrollTo} theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
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
      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">
        <Check size={14} aria-hidden="true" /> {toast}
      </div>
    </>
  );
}
