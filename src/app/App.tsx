import { useEffect, useRef, useState, useCallback } from 'react';
import './portfolio.css';

/* ─────────────── LOADER ─────────────── */
function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const add = Math.floor(Math.random() * 7) + 2;
      current = Math.min(current + add, 100);
      setPct(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setOut(true);
          setTimeout(onDone, 750);
        }, 300);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div id="loader" className={out ? 'out' : ''}>
      <div className="lt">
        <span>Husain</span>
        <span>Bhatiya</span>
      </div>
      <div className="ll" />
      <div className="lc">Loading — {pct}%</div>
    </div>
  );
}

/* ─────────────── NAV ─────────────── */
function Nav() {
  return (
    <nav className="main-nav">
      <a href="#" className="nav-logo">Husain Bhatiya</a>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Work</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="nav-avail">
        <div className="avail-dot" />
        Available for work
      </div>
    </nav>
  );
}

/* ─────────────── HERO ─────────────── */
function Hero() {
  return (
    <section id="hero">
      <div className="h-eyebrow">UI/UX Designer · Software Tester · Mumbai</div>
      <div className="h1wrap">
        <h1 className="h1">
          <span className="lw"><span className="w">Husain</span></span>
          <span className="lw"><span className="w">crafts</span></span>
          <span className="lw"><span className="w">Experience.</span></span>
        </h1>
      </div>
      <div className="h-right">
        <span className="h-right-label">Portfolio 2025</span>
        <div className="h-right-line" />
        <span className="h-right-year">Est. 2022</span>
      </div>
      <div className="h-bottom">
        <p className="h-desc">Designing interfaces people feel. Testing software people trust. Both — obsessively.</p>
        <div className="h-scroll">
          <span className="h-scroll-label">Scroll</span>
          <div className="h-scroll-line" />
        </div>
      </div>
      <div className="h-bg">Experience</div>
    </section>
  );
}

/* ─────────────── MARQUEE ─────────────── */
function Marquee({ items, reversed = false }: { items: string[]; reversed?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className={`mb${reversed ? ' rev' : ''}`}>
      <div className="mt">
        {doubled.map((item, i) => (
          <span key={i} className="mi">{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── ABOUT ─────────────── */
function StatCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let c = 0;
        const step = target / 48;
        const tm = setInterval(() => {
          c += step;
          if (c >= target) { setCount(target); clearInterval(tm); }
          else setCount(Math.floor(c));
        }, 28);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span className="stat-n" ref={ref}>{count}</span>;
}

function About() {
  return (
    <section className="s" id="about">
      <div className="s-tag r">02 — About</div>
      <h2 className="s-h r d1">Who<br /><em>I Am</em></h2>
      <div className="ag r d2">
        <div className="ac">
          <div className="ac-lbl">Biography</div>
          <p className="ac-body">
            I'm <strong>Husain Bhatiya</strong> — a UI/UX Designer and Software Tester who's spent the last few years making digital products that are <em>beautiful to look at</em> and <strong>impossible to break.</strong> I've shipped real work into the real world — 10+ websites, 2 mobile apps, 12+ tested projects — bringing both creative vision and analytical rigour to every brief.
          </p>
          <p className="ac-body" style={{ marginTop: 24, fontSize: 'clamp(15px,1.5vw,21px)' }}>
            Bachelor's in IT from Thakur Ramnarayan College (8.9 CGPA). Certified in both UI/UX Design and Software Testing. Based in Mumbai.
          </p>
          <div className="langs">
            {['English', 'Hindi', 'Gujarati', 'Marathi'].map(l => (
              <div key={l} className="lang-row-item">{l}</div>
            ))}
          </div>
          <div className="certs">
            <div className="cert-row">Software Tester Certification — Q Spider's</div>
            <div className="cert-row">UI/UX Designer Certification — Just Academy</div>
            <div className="cert-row">B.Sc. IT — Thakur Ramnarayan College, 8.9 CGPA, 2022</div>
          </div>
        </div>
        <div className="right-stack">
          <div className="ac dark">
            <div className="ac-lbl">Websites Designed</div>
            <StatCounter target={10} />
            <div className="stat-l">+ 2 Mobile Apps</div>
          </div>
          <div className="ac red-cell">
            <div className="ac-lbl">Projects Tested</div>
            <StatCounter target={12} />
            <div className="stat-l">Across Roles</div>
          </div>
          <div className="ac" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="ac-lbl" style={{ color: 'var(--mid)' }}>Currently Working</div>
            <div style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, lineHeight: 1 }}>Runtime<br />Solutions</div>
            <div className="stat-l" style={{ color: 'var(--mid)', marginTop: 'auto', paddingTop: 16 }}>1.4 Years · QA & UX/UI Designer</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── SKILLS ─────────────── */
const skills = [
  { n: '01', name: 'UI Design', tags: ['Figma', 'Adobe XD', 'Style Guides', 'Responsive'], desc: 'Pixel-perfect interfaces with cohesive visual systems. Every screen deliberate, every detail intentional.' },
  { n: '02', name: 'UX Research', tags: ['Personas', 'User Flows', 'Usability', 'Interviews'], desc: 'Understanding people before designing for them. Empathy-first, assumption-last.' },
  { n: '03', name: 'Prototyping', tags: ['Lo-Fi', 'Hi-Fi', 'Micro-interactions', 'Animations'], desc: 'Ideas to interactive prototypes. Micro-interactions that communicate intent.' },
  { n: '04', name: 'Manual QA', tags: ['SMOKE', 'Regression', 'SDLC/STLC', 'Bugzilla'], desc: 'Thorough test planning and defect tracking. Nothing ships broken on my watch.' },
  { n: '05', name: 'Automation', tags: ['Selenium', 'XPath', 'WebDriver', 'GUI Testing'], desc: 'Robust automated suites. Complete life-cycle coverage and reliable regressions.' },
  { n: '06', name: 'Design Systems', tags: ['Components', 'Tokens', 'Guidelines', 'Scalability'], desc: 'Foundations that make product teams 10x faster — scalable, documented, maintained.' },
];

function Skills() {
  return (
    <section className="s" id="skills">
      <div className="s-tag r">03 — Skills</div>
      <h2 className="s-h r d1">What I<br /><em>Bring</em></h2>
      <table className="st">
        <tbody>
          {skills.map((sk, i) => (
            <tr key={sk.n} className={`r${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
              <td className="sk-n">{sk.n}</td>
              <td className="sk-nm">{sk.name}</td>
              <td className="sk-tags">
                {sk.tags.map(t => <span key={t} className="sk-t">{t}</span>)}
              </td>
              <td className="sk-desc">{sk.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/* ─────────────── PROJECTS ─────────────── */
const projects = [
  { n: 'Project 01', name: 'SDI', desc: 'SDI is a digital platform designed to organize and manage structured information efficiently while providing users with a simple and intuitive interface. The goal of the project was to create a modern and user-friendly interface that allows users to easily access and interact with structured data and services.', tech: 'Figma · UI/UX Design', letter: 'S', dark: false },
  { n: 'Project 02', name: 'QASPL', desc: 'QASPL is a digital platform designed to streamline operational workflows and provide users with a structured interface to manage and access services efficiently. The objective of the project was to design a modern, intuitive, and scalable interface that simplifies complex workflows while maintaining clarity and usability.', tech: 'Figma · UI UX Design', letter: 'Q', dark: false },
  { n: 'Project 03', name: 'Lenovo', desc: 'This project focuses on designing an improved digital experience for the Lenovo website, aimed at simplifying how users explore products, compare devices, and make purchasing decisions.', tech: 'HTML · UI UX Design', letter: 'L', dark: false },
  { n: 'project 04', name: 'AU Finja', desc: 'A functional web application built with HTML, CSS, and Bootstrap — front-end development with UX sensibility and clean accessible component architecture.', tech: 'UI UX', letter: 'A', dark: false },
  { n: 'Project 05', name: 'DRDA', desc: 'The DRDA website was designed to provide a structured and accessible platform where users can easily access information related to district development programs, government initiatives, schemes, and administrative resources.', tech: 'Figma · Adobe XD · Live', letter: 'D', dark: false },
  { n: 'Project 06', name: 'Amplify', desc: 'Amplify is a platform designed to enhance digital communication and information management. The project focuses on clean UI patterns and structured navigation, enabling users to interact with platform features efficiently.', tech: 'Figma · Adobe XD · Live', letter: 'A', dark: false },
  { n: 'Project 07', name: 'ESG', desc: 'The ESG platform focuses on presenting environmental, social, and governance insights in a structured dashboard interface. The design emphasizes data visualization, clarity, and accessible reporting tools to help users understand sustainability metrics.', tech: 'Figma · Adobe XD · Live', letter: 'E', dark: false },
  { n: 'Project 08', name: 'LMS', desc: 'LMS is a learning management system designed to provide users with a structured interface to manage and access educational resources efficiently. The objective of the project was to design a modern, intuitive, and scalable interface that simplifies learning workflows while maintaining clarity and usability.', tech: 'Figma · Adobe XD · Live', letter: 'L', dark: false },
  { n: 'Project 09', name: 'Toppscholar', desc: 'Toppscholar is an education-focused platform designed to support students in accessing academic resources and learning tools. The design focuses on organized course listings, intuitive navigation, and improved learning accessibility.', tech: 'Figma · Adobe XD · Live', letter: 'T', dark: false },
  { n: 'Project 10', name: 'YCMOU', desc: 'YCMOU is an educational portal designed to provide students with information about courses, admissions, and academic resources. The goal was to create a clear and structured interface that simplifies navigation across educational services.', tech: 'Figma · Adobe XD · Live', letter: 'Y', dark: false },
  { n: 'Project 11', name: 'Cybercrime', desc: 'The Cybercrime platform is designed to help users understand cyber threats and report online crimes. The design focuses on clear guidance, accessible reporting processes, and structured information to help users interact with the system easily.', tech: 'Figma · Adobe XD · Live', letter: 'C', dark: false },
  { n: 'Project 12', name: 'Packiyo', desc: 'Packiyo is a logistics and fulfillment platform designed to help businesses manage warehouse operations, inventory, orders, and shipping processes efficiently. The objective of the project was to design a clean, scalable, and intuitive dashboard interface that simplifies complex logistics workflows.', tech: 'Figma · Adobe XD · Live', letter: 'P', dark: false },
  { n: 'Project 13', name: 'Travel East', desc: 'Travel East is a travel discovery and booking platform designed to help users explore destinations across eastern regions and plan their trips effortlessly. The goal of the project was to create a visually engaging and user-friendly interface that simplifies travel exploration and booking.', tech: 'Figma · Adobe XD · Live', letter: 'T', dark: true },
];

function Projects() {
  const phRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    startX.current = e.pageX - (phRef.current?.offsetLeft ?? 0);
    scrollLeft.current = phRef.current?.scrollLeft ?? 0;
  };
  const onMouseLeave = () => { isDown.current = false; };
  const onMouseUp = () => { isDown.current = false; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - (phRef.current?.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.6;
    if (phRef.current) phRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <>
      <section className="s" id="projects" style={{ paddingBottom: 0, borderBottom: 'none' }}>
        <div className="s-tag r">04 — Selected Work</div>
        <h2 className="s-h r d1">The<br /><em>Work</em></h2>
      </section>
      <div
        className="ph r"
        id="ph"
        ref={phRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {projects.map((p) => (
          <div
            key={p.n}
            className="pc"
            style={p.dark ? { background: 'var(--ink)' } : {}}
          >
            <div className="pc-n" style={p.dark ? { color: 'var(--gold)' } : {}}>{p.n}</div>
            <div className="pc-name" style={p.dark ? { color: 'var(--paper)' } : {}}>
              {p.name.split('\n').map((line, i) => <span key={i}>{line}{i < p.name.split('\n').length - 1 && <br />}</span>)}
            </div>
            <div className="pc-desc" style={p.dark ? { color: 'rgba(245,242,238,0.4)' } : {}}>{p.desc}</div>
            <div className="pc-tech" style={p.dark ? { color: 'var(--gold)', borderColor: 'rgba(245,242,238,0.1)' } : {}}>{p.tech}</div>
            <div className="pc-arr" style={p.dark ? { borderColor: 'rgba(245,242,238,0.12)', color: 'var(--paper)' } : {}}>→</div>
            <div className="pc-bg-l" style={p.dark ? { WebkitTextStrokeColor: 'rgba(245,242,238,0.04)' } : {}}>{p.letter}</div>
          </div>
        ))}
        <div className="pc" style={{ background: 'var(--red)', flex: '0 0 200px', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: 64, fontWeight: 900, fontStyle: 'italic', color: '#fff', writingMode: 'vertical-rl', lineHeight: 1 }}>More</div>
        </div>
      </div>
      <div className="ph-hint">← Drag to explore all projects</div>
    </>
  );
}

/* ─────────────── EXPERIENCE ─────────────── */
function Experience() {
  return (
    <section className="s" id="experience">
      <div className="s-tag r">05 — Experience</div>
      <h2 className="s-h r d1">Where<br /><em>I've Been</em></h2>
      <div className="el">
        <div className="ei r">
          <div>
            <div className="ei-co">Inovant<br />Solutions</div>
            <div className="ei-dur">1.2 Years · Full-Time</div>
          </div>
          <div>
            <div className="ei-role">Manual Tester</div>
            <ul className="ei-pts">
              <li>Designed 10 websites and 2 mobile apps; 2 went live for real paying customers</li>
              <li>Owned projects end-to-end — wireframes → user flows → polished hi-fi designs</li>
              <li>Collaborated with developers, product owners, and clients directly</li>
              <li>Applied responsiveness, accessibility, and design consistency at every stage</li>
            </ul>
          </div>
          <div>
            <div className="ei-role">&nbsp;</div>
            <ul className="ei-pts">
              <li>Contributed design work to tender proposals — helped the company win new projects</li>
              <li>Iterated designs based on real user research and live feedback</li>
              <li>Used Figma and Adobe XD to bring every concept to life</li>
            </ul>
          </div>
        </div>
        <div className="ei r d1">
          <div>
            <div className="ei-co">Runtime<br />Solutions</div>
            <div className="ei-dur">1.4 Years</div>
          </div>
          <div>
            <div className="ei-role">Internship to UX|UI Designer</div>
            <ul className="ei-pts">
              <li>Developed test plans, cases, scripts, and reports across 12+ projects</li>
              <li>Executed manual tests and reported defects via Bugzilla to dev team</li>
              <li>Automated test cases using Selenium WebDriver</li>
            </ul>
          </div>
          <div>
            <div className="ei-role">&nbsp;</div>
            <ul className="ei-pts">
              <li>Performed functional, system, regression, and UI testing end-to-end</li>
              <li>Maintained test data; conducted stress, performance, and scalability testing</li>
              <li>Tools: Selenium, Eclipse, Bugzilla, XPath</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── PROCESS ─────────────── */
const processSteps = [
  { n: '01', name: 'Discover', desc: 'Deep research into users, context, and constraints. Personas, user flows, stakeholder goals — nothing assumed.', ghost: 'D' },
  { n: '02', name: 'Define', desc: 'Synthesising research into a clear direction. Problem statements, success metrics, scope locked in.', ghost: 'D' },
  { n: '03', name: 'Design', desc: 'Lo-fi to hi-fi. Design system built in parallel. Every micro-interaction and animation considered.', ghost: 'D' },
  { n: '04', name: 'Test', desc: 'Usability testing, manual QA, automated regression. Defects logged, fixed, re-tested until zero.', ghost: 'T' },
  { n: '05', name: 'Ship', desc: 'Dev handoff with precision specs. Live monitoring. Continuous iteration after launch.', ghost: 'S' },
];

function Process() {
  return (
    <section className="s" id="process">
      <div className="s-tag r">06 — How I Work</div>
      <h2 className="s-h r d1">My<br /><em>Process</em></h2>
      <div className="ps r d2">
        {processSteps.map(step => (
          <div key={step.n} className="ps-card">
            <span className="ps-num">{step.n}</span>
            <div className="ps-name">{step.name}</div>
            <p className="ps-desc">{step.desc}</p>
            <div className="ps-ghost">{step.ghost}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────── TOOLS ─────────────── */
const tools = [
  { cat: 'Design', name: 'Figma', use: 'Primary tool for UI, prototyping, and design systems', num: '01', gold: false },
  { cat: 'Design', name: 'Adobe XD', use: 'Secondary prototyping and client presentations', num: '02', gold: false },
  { cat: 'Automation QA', name: 'Selenium', use: 'WebDriver automation, XPath locators, regression suites', num: '03', gold: false },
  { cat: 'Bug Tracking', name: 'Bugzilla', use: 'Defect lifecycle management and reporting', num: '04', gold: false },
  { cat: 'Development', name: 'VS Code', use: 'Editor for HTML, CSS, Bootstrap projects', num: '05', gold: false },
  { cat: 'Development', name: 'Eclipse', use: 'Java IDE for Selenium test scripts', num: '06', gold: false },
  { cat: 'Front-End', name: 'HTML/CSS', use: 'Markup, styling, Bootstrap for rapid layouts', num: '07', gold: false },
  { cat: 'Platform', name: 'Mac + Win', use: 'Mac OS 14 · Windows 8/10/11', num: '08', gold: true },
];

function Tools() {
  return (
    <section className="s" id="tools">
      <div className="s-tag r">07 — Tools</div>
      <h2 className="s-h r d1">The<br /><em>Arsenal</em></h2>
      <div className="tw r d2">
        {tools.map(t => (
          <div key={t.num} className={`tc${t.gold ? ' gold-cell' : ''}`}>
            <div className="tc-cat">{t.cat}</div>
            <div className="tc-name">{t.name}</div>
            <div className="tc-use">{t.use}</div>
            <div className="tc-num">{t.num}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────── CONTACT ─────────────── */
function Contact() {
  const handleMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px,${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
  };
  const resetMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <section className="s" id="contact" style={{ borderBottom: 'none' }}>
      <div className="ct-pre r">Let's talk</div>
      <div className="ct-h r d1">Start a<br /><em>Project</em></div>
      <a href="mailto:husainbhatiya647@gmail.com" className="ct-email r d2">husainbhatiya647@gmail.com</a>
      <div className="ct-btns r d3">
        <a href="mailto:husainbhatiya647@gmail.com" className="cb prim" onMouseMove={handleMagnetic} onMouseLeave={resetMagnetic}><span>Send Email</span></a>
        <a href="https://www.linkedin.com/in/husain-bhatiya-a77b4821a/" target="_blank" rel="noreferrer" className="cb" onMouseMove={handleMagnetic} onMouseLeave={resetMagnetic}><span>LinkedIn</span></a>
        <a href="https://www.behance.net/husainbhatiya/projects" target="_blank" rel="noreferrer" className="cb" onMouseMove={handleMagnetic} onMouseLeave={resetMagnetic}><span>Behance</span></a>
        <a href="tel:+919004016055" className="cb" onMouseMove={handleMagnetic} onMouseLeave={resetMagnetic}><span>+91 9004 016 055</span></a>
      </div>
      <div className="ct-bg">Contact</div>
    </section>
  );
}

/* ─────────────── FOOTER ─────────────── */
function Footer() {
  return (
    <footer className="main-footer">
      <div className="fl">HB</div>
      <div className="fc">© 2025 Husain Bhatiya</div>
      <div className="fr">Mumbai, India</div>
    </footer>
  );
}

/* ─────────────── APP ─────────────── */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  /* Custom cursor */
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    const move = (e: MouseEvent) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    };
    const expand = () => dot.classList.add('cursor-expanded');
    const shrink = () => dot.classList.remove('cursor-expanded');
    const makeLight = () => dot.classList.add('cursor-light');
    const resetLight = () => dot.classList.remove('cursor-light');

    document.addEventListener('mousemove', move);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', expand);
      el.addEventListener('mouseleave', shrink);
    });

    const processSec = document.getElementById('process');
    if (processSec) {
      processSec.addEventListener('mouseenter', makeLight);
      processSec.addEventListener('mouseleave', resetLight);
    }

    return () => {
      document.removeEventListener('mousemove', move);
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', expand);
        el.removeEventListener('mouseleave', shrink);
      });
      if (processSec) {
        processSec.removeEventListener('mouseenter', makeLight);
        processSec.removeEventListener('mouseleave', resetLight);
      }
    };
  }, [loaded]);

  /* Ink canvas trail */
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    if (!cx) return;

    let W = 0, H = 0;
    const drops: { x: number; y: number; r: number; a: number; vy: number; vx: number; life: number }[] = [];
    let mx = 0, my = 0, px = 0, py = 0;
    let animId = 0;

    const resize = () => {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      const dx = mx - px, dy = my - py;
      if (dx * dx + dy * dy > 64) {
        for (let i = 0; i < 2; i++) {
          drops.push({
            x: mx + (Math.random() - 0.5) * 6,
            y: my + (Math.random() - 0.5) * 6,
            r: Math.random() * 8 + 3,
            a: 0.55,
            vy: Math.random() * 0.5 + 0.05,
            vx: (Math.random() - 0.5) * 0.4,
            life: 1,
          });
        }
        px = mx; py = my;
      }
    };
    document.addEventListener('mousemove', onMove);

    const loop = () => {
      cx.clearRect(0, 0, W, H);
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        cx.beginPath();
        cx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        cx.fillStyle = `rgba(10,10,10,${d.a * d.life})`;
        cx.fill();
        d.y += d.vy; d.x += d.vx; d.r *= 0.975; d.life -= 0.022;
        if (d.life <= 0 || d.r < 0.4) drops.splice(i, 1);
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    if (!loaded) return;
    const els = document.querySelectorAll('.r');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('v');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [loaded]);

  const marquee1 = ['UI Design', 'UX Research', 'Figma', 'Adobe XD', 'Manual Testing', 'Selenium', 'Design Systems', 'Prototyping', 'Wireframing', 'Automation QA'];
  const marquee2 = ['Inovant Solutions', 'Runtime Solutions', 'Mumbai India', '8.9 CGPA', "Q Spider's", 'Just Academy', 'Thakur College', 'Open to Work'];

  return (
    <>
      <Loader onDone={handleLoaded} />
      <canvas id="ink" ref={canvasRef} />
      <div id="cursor-dot" ref={dotRef} />

      <Nav />
      <Hero />
      <Marquee items={marquee1} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Process />
      <Marquee items={marquee2} reversed />
      <Tools />
      <Contact />
      <Footer />
    </>
  );
}
