"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Database, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import "./portfolio.css";

const projects = [
  {
    index: "01",
    title: "E-commerce sales & customer insights",
    eyebrow: "500K+ transactions · Retail analytics",
    summary: "An end-to-end analysis that turned a raw retail dataset into a clean PostgreSQL reporting layer and an executive Power BI dashboard.",
    metrics: [["£8.9M", "total revenue"], ["82%", "UK revenue"], ["£480", "average order"]],
    details: ["Removed 144K invalid rows and validated data quality across more than half a million records.", "Used joins, CTEs and window functions to report monthly trends and regional performance.", "Identified November 2011 as the peak month at £1.16M, driven by seasonal demand."],
    tags: ["Python", "Pandas", "PostgreSQL", "Power BI"],
    bars: [42, 55, 48, 61, 58, 69, 66, 78, 73, 100, 81, 64],
  },
  {
    index: "02",
    title: "Credit card fraud analysis",
    eyebrow: "284K+ transactions · Banking analytics",
    summary: "A consumer-banking fraud monitoring pipeline designed to surface risk patterns, transaction anomalies and decision-ready KPIs.",
    metrics: [["0.167%", "fraud rate"], ["11:00", "peak fraud hour"], ["£123.87", "avg. fraud value"]],
    details: ["Loaded and modeled transaction data in PostgreSQL with an automated SQLAlchemy workflow.", "Executed eight analytical queries using CTEs and window functions to isolate fraud patterns.", "Built five dashboard views for KPI monitoring, risk segmentation and anomaly validation."],
    tags: ["SQLAlchemy", "PostgreSQL", "SQL", "Analytics"],
    bars: [8, 13, 21, 18, 28, 22, 35, 30, 46, 41, 76, 52],
  },
];

const skills = [
  ["01", "Data analytics", "Pandas, NumPy, statistics, EDA, feature engineering, KPI reporting, trend and time-series analysis"],
  ["02", "SQL & databases", "PostgreSQL, PL/SQL, T-SQL, BigQuery, SQLAlchemy, joins, CTEs and window functions"],
  ["03", "Visualisation", "Power BI, Looker Studio, Matplotlib, Seaborn and Excel dashboards"],
  ["04", "Machine learning", "scikit-learn, logistic regression, random forest, SMOTE, classification and model evaluation"],
  ["05", "Engineering", "Python, Java, OOP, data structures, Git, GitHub, Jupyter Notebook and VS Code"],
];

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);
  return <header className="site-header">
    <a className="brand" href="#top" aria-label="Kalyan Ram, home"><span>KR</span><small>DATA / ANALYTICS</small></a>
    <nav className={open ? "nav open" : "nav"} aria-label="Primary navigation">
      <a href="#about" onClick={() => setOpen(false)}>ABOUT</a><a href="#work" onClick={() => setOpen(false)}>WORK</a><a href="#skills" onClick={() => setOpen(false)}>SKILLS</a><a href="#contact" onClick={() => setOpen(false)}>CONTACT</a>
    </nav>
    <a className="header-cta" href="/KalyanRam_Resume.pdf" target="_blank">RÉSUMÉ <ArrowUpRight size={14}/></a>
    <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
  </header>;
}

function Chart({ bars }) {
  return <div className="chart" aria-hidden="true">
    <div className="chart-label"><span>TRANSACTION SIGNAL</span><span>12M</span></div>
    <div className="bars">{bars.map((height, i) => <i key={i} style={{height: `${height}%`}} />)}</div>
    <div className="chart-axis"><span>JAN</span><span>DEC</span></div>
  </div>;
}

export default function Portfolio() {
  return <div id="top" className="portfolio">
    <a className="skip" href="#main">Skip to content</a><Header />
    <main id="main">
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="live" /> OPEN TO DATA ANALYST & BI ROLES</p>
          <h1>KALYAN<br/><em>RAM.</em></h1>
          <p className="hero-intro">I turn complex data into <strong>clear business decisions.</strong></p>
          <div className="hero-actions"><a className="button primary" href="#work">EXPLORE MY WORK <ArrowDown size={15}/></a><a className="button" href="mailto:kalyanramkorumilli@gmail.com">LET’S CONNECT <ArrowUpRight size={15}/></a></div>
        </div>
        <div className="hero-panel">
          <span className="panel-code">PROFILE / 001</span>
          <div className="orb"><Database size={48}/><i/><i/><i/></div>
          <div className="hero-stats"><div><b>500K+</b><span>RECORDS ANALYSED</span></div><div><b>02</b><span>END-TO-END PIPELINES</span></div><div><b>2026</b><span>WORLDQUANT SILVER</span></div></div>
        </div>
        <div className="hero-foot"><span>PYTHON · SQL · POSTGRESQL · POWER BI</span><span>HYDERABAD, INDIA</span></div>
      </section>

      <section id="about" className="about section">
        <p className="section-number">01 / ABOUT</p>
        <div className="section-body"><h2>ANALYSIS WITH<br/><em>A BUSINESS POINT OF VIEW.</em></h2><div className="about-copy"><p>CSE (AI & ML) graduate with hands-on experience building data analytics and reporting solutions—from raw, high-volume datasets to SQL analysis and stakeholder-facing dashboards.</p><p>My work combines careful data validation, quantitative analysis and clear visual storytelling to uncover patterns people can act on.</p><a href="mailto:kalyanramkorumilli@gmail.com">kalyanramkorumilli@gmail.com <ArrowUpRight size={16}/></a></div></div>
      </section>

      <section id="work" className="work section dark">
        <div className="work-head"><p className="section-number">02 / SELECTED WORK</p><h2>PROJECTS THAT<br/><em>MOVE THE NUMBERS.</em></h2></div>
        {projects.map((project) => <article className="project" key={project.index}>
          <div className="project-meta"><span>{project.index}</span><p>{project.eyebrow}</p></div>
          <div className="project-main"><h3>{project.title}</h3><p>{project.summary}</p><div className="metrics">{project.metrics.map(([value,label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}</div><ul>{project.details.map(item => <li key={item}>{item}</li>)}</ul><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
          <Chart bars={project.bars}/>
        </article>)}
      </section>

      <section id="skills" className="skills section">
        <p className="section-number">03 / CAPABILITIES</p><div className="section-body"><h2>TOOLS FOR THE<br/><em>FULL DATA JOURNEY.</em></h2><div className="skill-list">{skills.map(([n,title,text]) => <div className="skill" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div>
      </section>

      <section className="education section">
        <p className="section-number">04 / EDUCATION & ACHIEVEMENT</p><div className="edu-grid"><div><span>2020—2024</span><h3>B.Tech, CSE (AI & ML)</h3><p>Keshav Memorial Institute of Technology, Hyderabad</p></div><div><span>2018—2020</span><h3>Intermediate, MPC</h3><p>Sri Chaitanya Jr Kalasala, Hyderabad</p></div><div className="award"><span>2026</span><h3>Silver Level</h3><p>WorldQuant Challenge · BRAIN platform alpha signal research</p></div></div>
      </section>

      <section id="contact" className="contact dark">
        <p className="eyebrow"><span className="live"/> AVAILABLE FOR OPPORTUNITIES</p><h2>LET’S TURN DATA<br/>INTO <em>DECISIONS.</em></h2><p>Looking for a data analyst who brings technical depth, business curiosity and a clear eye for reporting?</p><a className="contact-email" href="mailto:kalyanramkorumilli@gmail.com">kalyanramkorumilli@gmail.com <ArrowUpRight/></a>
        <div className="contact-links"><a href="https://www.linkedin.com/in/kalyanramkorumilli" target="_blank" rel="noreferrer"><Linkedin/> LINKEDIN</a><a href="https://github.com/kalyanram-2003" target="_blank" rel="noreferrer"><Github/> GITHUB</a><a href="mailto:kalyanramkorumilli@gmail.com"><Mail/> EMAIL</a></div>
      </section>
    </main>
    <footer><span>© 2026 KORUMILLI KALYAN RAM</span><span>BUILT AROUND DATA, DESIGNED FOR CLARITY.</span><button onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>BACK TO TOP ↑</button></footer>
  </div>;
}
