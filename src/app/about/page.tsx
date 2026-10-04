import type { Metadata } from 'next';
import { Header } from '@/components/site/Header';
import { Contact } from '@/components/site/Contact';

export const metadata: Metadata = {
  title: 'About',
  description:
    'I build web products end to end — the public site, the database behind it, and the admin panel the client opens every morning.',
};

const howIWork = [
  {
    title: 'Scope',
    body: 'I write down what the system has to do before writing any code, including the things it deliberately will not do. Dream Adventure has no online checkout on purpose.',
  },
  {
    title: 'Build',
    body: 'One person, start to finish. Nothing is lost in a handoff between a designer, a front-end developer and a back-end developer.',
  },
  {
    title: 'Ship',
    body: "Deployed on a real domain with the client's own content and real data in it. Not a demo that needs finishing later.",
  },
  {
    title: 'Hand over',
    body: "Every project ships with an admin panel the client's own staff can use. Prices, availability, photos, text. They should not need me to change a phone number.",
  },
];

const techStack = [
  {
    label: 'FRONT END',
    items: 'Next.js · React · TypeScript · Tailwind',
  },
  {
    label: 'BACK END',
    items: 'Node · PostgreSQL · Prisma · Supabase · Neon',
  },
  {
    label: 'MOBILE',
    items: 'Flutter · Dart',
  },
  {
    label: 'AI',
    items: 'Whisper · Ollama · Groq · pgvector',
  },
  {
    label: 'INFRA',
    items: 'Vercel · Docker · Git',
  },
];

export default function AboutPage() {
  return (
    <div className="wrap">
      <Header />

      <header className="about-header">
        <h1 className="about-header__title">About</h1>
      </header>

      <section className="about-prose" aria-label="About Aaditya Chhetri">
        <p className="about-p">
          I&apos;m Aaditya Chhetri, a full-stack developer in Kathmandu. I build web
          products end to end — the public site, the database behind it, and the admin
          panel the client opens every morning.
        </p>
        <p className="about-p">
          Most of my work is for small businesses that were running on paper, phone
          calls and spreadsheets. Dream Adventure took every booking by phone and tracked
          capacity on a sheet. Nischal Legal needed staff who work in Nepali to edit their
          own site without calling anyone. The interesting part is rarely the front end.
        </p>
        <p className="about-p">
          I work alone, which means one person from the first conversation through to
          deployment and whatever breaks afterwards.
        </p>
      </section>

      <section aria-labelledby="how-i-work-label">
        <h2 id="how-i-work-label" className="about-section-label">
          How I Work
        </h2>
        <div className="about-work-grid">
          {howIWork.map((item) => (
            <div key={item.title} className="about-work-item">
              <h3 className="about-work-item__heading">{item.title}</h3>
              <p className="about-work-item__body">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="what-i-build-label">
        <h2 id="what-i-build-label" className="about-section-label">
          What I Build With
        </h2>
        <div className="about-stack-list">
          {techStack.map((stack) => (
            <div key={stack.label} className="about-stack-row">
              <span className="about-stack-row__label">{stack.label}</span>
              <span className="about-stack-row__list">{stack.items}</span>
            </div>
          ))}
        </div>
      </section>

      <Contact />
    </div>
  );
}
