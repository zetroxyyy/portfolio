'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { projects, Project } from '../../../content/projects';
import { sideProjects } from '../../../content/sideProjects';
import { BrowserFrame } from '@/components/ui/BrowserFrame';

const projectMetaStacks: Record<string, string> = {
  'dream-adventure': 'Next.js, Postgres',
  'nischal-legal': 'Next.js, Postgres',
  'nexus-mcu': 'Next.js, Postgres',
  'manjushree': 'Next.js, Tailwind',
  didee: 'Next.js, Tailwind',
  mydarlingfood: 'Next.js, Tailwind',
};

function ProjectScreen({ project, index }: { project: Project; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Slow parallax inside browser frame: max 30px travel (-15px to 15px)
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-15, 15]);

  const stackSummary = projectMetaStacks[project.slug] || project.stack.slice(0, 3).join(', ');

  return (
    <section
      ref={sectionRef}
      id={`project-${project.slug}`}
      data-project-slug={project.slug}
      data-accent={project.accent}
      data-accent-contrast={project.accentContrast}
      data-accent-wash={project.accentWash}
      className="work-screen"
      aria-label={`${project.title} — ${project.shortSummary}`}
    >
      <div className="work-screen__inner">
        {/* Top Header Group: Oversized Project Name, Summary, and Meta */}
        <div className="work-screen__header">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40, clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="work-screen__title">{project.title}</h2>
          </motion.div>

          <p className="work-screen__summary">{project.shortSummary}</p>

          <div className="work-screen__meta">
            <span>{project.year} · {stackSummary} · Live</span>
          </div>
        </div>

        {/* Visual Showcase: Large BrowserFrame with subtle parallax */}
        <div className="work-screen__showcase">
          <motion.div
            style={{ y: imageY }}
            className="work-screen__parallax-wrap"
          >
            <BrowserFrame
              src={project.cover}
              alt={project.coverAlt}
              url={project.liveUrl}
              accent={project.accent}
              priority={index === 0}
              className="work-screen__frame"
            />
          </motion.div>
        </div>

        {/* Action Links: Simple underlined text links */}
        <div className="work-screen__actions">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="work-screen__link"
          >
            Live ↗
          </a>
          <Link
            href={`/work/${project.slug}`}
            className="work-screen__link"
          >
            Case study →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Work() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screens = document.querySelectorAll<HTMLElement>('.work-screen');
    if (!screens.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const accent = target.dataset.accent;
            const contrast = target.dataset.accentContrast;
            const wash = target.dataset.accentWash;

            if (accent) document.documentElement.style.setProperty('--accent', accent);
            if (contrast) document.documentElement.style.setProperty('--accent-contrast', contrast);
            if (wash) document.documentElement.style.setProperty('--accent-wash', wash);
          }
        });
      },
      {
        rootMargin: '-45% 0px -45% 0px',
      }
    );

    screens.forEach((screen) => observer.observe(screen));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="work-container" id="work">
      {/* 6 Full-Viewport Project Screens */}
      {projects.map((project, index) => (
        <ProjectScreen key={project.slug} project={project} index={index} />
      ))}

      {/* Side Projects Compact Strip */}
      <section className="side-strip" aria-label="Source-available tools">
        <div className="side-strip__inner">
          <div className="side-strip__header">
            <span className="side-strip__label">TOOLS</span>
          </div>

          <div className="side-strip__row">
            {sideProjects.map((sp) => (
              <div key={sp.slug} className="side-strip__item">
                <h3 className="side-strip__item-title">{sp.title}</h3>
                <p className="side-strip__item-summary">{sp.summary}</p>
                <a
                  href={sp.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="side-strip__item-link"
                >
                  GitHub ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
