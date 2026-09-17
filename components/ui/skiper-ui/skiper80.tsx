"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

type Project = {
  id: string;
  title: string;
  premise: string;
  role: string;
  year: string;
  status: string;
  proof: string;
  cover: string;
  coverPosition?: string;
  coverScale?: number;
  accent: string;
};

type Skiper80ShowcaseProps = {
  projects: Project[];
  onOpen: (project: Project) => void;
};

/** Original project showcase based on Skiper80's public interaction model. */
export function Skiper80Showcase({ projects, onOpen }: Skiper80ShowcaseProps) {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const project = projects[active];
  const transition = reducedMotion ? { duration: 0 } : { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section id="work" data-testid="work-section" className="sk80-shell">
      <header className="sk80-heading">
        <div>
          <span className="u-label">SELECTED WORK / 01—03</span>
          <h2 className="font-display">WORK</h2>
        </div>
        <p className="font-serif-ed">AI systems, computer vision, and full-stack products built from research question to working software.</p>
      </header>

      <div className="sk80-stage">
        <div className="sk80-list" role="list" aria-label="Selected projects">
          {projects.map((item, index) => {
            const selected = active === index;
            return (
              <motion.article
                layout
                role="listitem"
                key={item.id}
                className={`sk80-row ${selected ? "is-active" : ""}`}
                style={{ "--sk80-accent": item.accent } as React.CSSProperties}
                onPointerEnter={() => setActive(index)}
                onFocusCapture={() => setActive(index)}
                transition={transition}
              >
                <span className="sk80-index u-label">0{index + 1}</span>
                <button
                  type="button"
                  className="sk80-project focus-ring"
                  data-testid={`open-${item.id}`}
                  data-cursor="hover"
                  aria-label={`Open ${item.title} case study`}
                  onClick={() => onOpen(item)}
                >
                  <span className="font-display sk80-title">{item.title}</span>
                  <span className="sk80-project-meta">
                    <span className="u-label">{item.role}</span>
                    <span className="u-label">{item.year}</span>
                  </span>
                  <motion.span
                    className="sk80-arrow"
                    aria-hidden="true"
                    animate={{ x: selected ? 0 : -10, opacity: selected ? 1 : 0 }}
                    transition={transition}
                  ><ArrowUpRight size={28} strokeWidth={1.4} /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {selected && (
                    <motion.div
                      className="sk80-mobile-preview"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={transition}
                    >
                      <img src={item.cover} alt={`${item.title} project interface`} />
                      <p>{item.premise}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        <div className="sk80-preview-wrap" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              className="sk80-preview"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.92, rotate: -2, y: 22 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, scale: 1.04, rotate: 2, y: -16 }}
              transition={transition}
              drag={!reducedMotion}
              dragConstraints={{ left: -36, right: 36, top: -28, bottom: 28 }}
              dragElastic={0.12}
              dragSnapToOrigin
              whileDrag={{ scale: 0.97, cursor: "grabbing" }}
              style={{ "--sk80-accent": project.accent } as React.CSSProperties}
            >
              <div className="sk80-preview-bar">
                <span className="u-label">{project.status}</span>
                <span className="u-label">DRAG / EXPLORE</span>
              </div>
              <div className="sk80-image">
                <img
                  src={project.cover}
                  alt={`${project.title} project interface`}
                  style={{ objectPosition: project.coverPosition, transform: `scale(${project.coverScale || 1})` }}
                />
                <span aria-hidden="true" />
              </div>
              <div className="sk80-caption">
                <p className="font-serif-ed">{project.premise}</p>
                <button type="button" className="u-label focus-ring" data-cursor="hover" onClick={() => onOpen(project)}>VIEW CASE STUDY <ArrowUpRight size={14} strokeWidth={1.5} /></button>
              </div>
              <div className="sk80-proof u-label">{project.proof}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .sk80-shell{position:relative;min-height:calc(100svh - 88px);padding:clamp(44px,7vw,92px) clamp(18px,4vw,64px) clamp(60px,8vw,110px);background:var(--page-bg);color:var(--ink);overflow:hidden}
        .sk80-shell::before{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px);background-size:8vw 8vw;opacity:.34;mask-image:linear-gradient(to bottom,black,transparent 82%)}
        .sk80-heading{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,500px);align-items:end;gap:32px;margin-bottom:clamp(42px,7vw,84px)}
        .sk80-heading h2{font-size:clamp(84px,15vw,230px);letter-spacing:-.055em;line-height:.72;margin:16px 0 0}
        .sk80-heading p{font-size:clamp(18px,2vw,27px);line-height:1.3;margin:0 0 4px;max-width:32ch}
        .sk80-stage{position:relative;display:grid;grid-template-columns:minmax(0,1.08fr) minmax(360px,.92fr);gap:clamp(30px,6vw,92px);align-items:center}
        .sk80-list{position:relative;border-top:1px solid var(--line)}
        .sk80-row{display:grid;grid-template-columns:42px minmax(0,1fr);border-bottom:1px solid var(--line);position:relative;transition:background .35s ease}
        .sk80-row::before{content:'';position:absolute;inset:0;background:color-mix(in srgb,var(--sk80-accent) 8%,transparent);transform:scaleY(0);transform-origin:bottom;transition:transform .5s cubic-bezier(.16,1,.3,1)}
        .sk80-row.is-active::before{transform:scaleY(1)}
        .sk80-index{padding:22px 8px;position:relative;opacity:.55}
        .sk80-project{position:relative;width:100%;min-width:0;padding:18px 48px 18px 8px;border:0;background:transparent;color:var(--ink);text-align:left;cursor:pointer}
        .sk80-title{display:block;font-size:clamp(38px,6vw,84px);line-height:.88;letter-spacing:-.035em;transition:transform .55s cubic-bezier(.16,1,.3,1),color .3s ease;transform-origin:left center}
        .sk80-row.is-active .sk80-title{transform:translateX(10px);color:var(--sk80-accent)}
        .sk80-project-meta{display:flex;justify-content:space-between;gap:18px;margin-top:13px;opacity:.58}
        .sk80-arrow{position:absolute;right:10px;top:50%;font-size:30px;line-height:1;transform:translateY(-50%)}
        .sk80-preview-wrap{position:sticky;top:112px;perspective:1200px}
        .sk80-preview{position:relative;background:var(--inverse-bg);color:var(--inverse-fg);border:1px solid var(--line);box-shadow:16px 18px 0 color-mix(in srgb,var(--ink) 24%,transparent);cursor:grab;touch-action:pan-y}
        .sk80-preview::after{content:'';position:absolute;inset:8px;border:1px solid color-mix(in srgb,var(--sk80-accent) 45%,transparent);pointer-events:none}
        .sk80-preview-bar,.sk80-proof{position:relative;z-index:1;display:flex;justify-content:space-between;gap:14px;padding:10px 14px;border-bottom:1px solid var(--inverse-fg);color:var(--inverse-fg)}
        .sk80-preview-bar span:first-child{color:var(--sk80-accent)}
        .sk80-image{position:relative;aspect-ratio:16/11;overflow:hidden;background:#15171a}
        .sk80-image img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.75) contrast(1.12) brightness(.94)}
        .sk80-image>span{position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(4,8,15,.68)),linear-gradient(135deg,color-mix(in srgb,var(--sk80-accent) 13%,transparent),transparent 45%)}
        .sk80-caption{position:relative;z-index:1;display:grid;grid-template-columns:1fr auto;align-items:end;gap:20px;padding:20px 18px}
        .sk80-caption p{font-size:clamp(17px,1.7vw,23px);line-height:1.35;margin:0}
        .sk80-caption button{display:inline-flex;align-items:center;gap:7px;border:1px solid var(--sk80-accent);border-radius:999px;padding:11px 14px;background:transparent;color:var(--sk80-accent);white-space:nowrap}
        .sk80-proof{border-top:1px solid var(--inverse-fg);border-bottom:0;opacity:.72}
        .sk80-mobile-preview{display:none;overflow:hidden;grid-column:1/-1}
        @media(max-width:900px){
          .sk80-shell{padding:42px 14px 70px;min-height:calc(100svh - 68px)}
          .sk80-heading{grid-template-columns:1fr;gap:22px}.sk80-heading h2{font-size:clamp(78px,24vw,150px)}.sk80-heading p{font-size:18px}
          .sk80-stage{grid-template-columns:1fr;gap:0}.sk80-preview-wrap{display:none}
          .sk80-row{grid-template-columns:32px minmax(0,1fr)}.sk80-index{padding:17px 4px}.sk80-project{padding:15px 40px 15px 6px}
          .sk80-title{font-size:clamp(36px,11.5vw,64px);overflow-wrap:anywhere}.sk80-project-meta{flex-direction:column;gap:5px;margin-top:10px}.sk80-arrow{right:7px;font-size:25px}
          .sk80-mobile-preview{display:block;padding:0 6px 18px 32px}.sk80-mobile-preview img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;border:1px solid var(--line);filter:saturate(.78) contrast(1.08)}.sk80-mobile-preview p{font-size:16px;line-height:1.4;margin:13px 0 0}
        }
        @media(prefers-reduced-motion:reduce){.sk80-row::before,.sk80-title{transition:none}.sk80-preview{cursor:default}}
      `}</style>
    </section>
  );
}

/** Public interaction model inspired by Skiper UI's Projects Showcase. */
