import type { ReactNode } from 'react';
import { site } from '../../../content/site';

// Native <details>/<summary>: keyboard-operable, screen-reader-announced and
// findable by in-page search with no JavaScript at all. An accordion built
// from divs and useState would be worse in every one of those ways.

interface QA {
  q: string;
  a: ReactNode;
}

const faqs: QA[] = [
  {
    q: 'Do you work with clients outside Nepal?',
    a: (
      <>
        Yes. The booking platform at <strong>thedreamadventure.com</strong> was built for a tour
        operator in Gunma, Japan — scoped, built and launched entirely remotely, in Japanese and
        English. Nepal is several hours behind most of Asia and ahead of Europe, which in practice
        means you send notes at the end of your day and there is progress waiting the next morning.
      </>
    ),
  },
  {
    q: 'How long does a project take?',
    a: (
      <>
        A straightforward business site is around <strong>1–2 weeks</strong>. A site with a custom
        admin panel you can edit yourself is <strong>3–5 weeks</strong>. A full platform — bookings,
        availability, payments, reporting — is <strong>6–10 weeks</strong>. Those are real ranges
        from real projects, not the optimistic version. The single biggest variable is how quickly
        content and feedback come back from your side.
      </>
    ),
  },
  {
    q: 'How much will it cost?',
    a: (
      <>
        There is no price list here on purpose. A five-page site and a bilingual booking engine are
        not the same job, and pricing them off the same card helps nobody. Cost is driven by how
        many things the system has to keep track of, whether staff need to edit it, and whether it
        has to work in more than one language. Tell me what it needs to do and you get a real number
        for the real thing, usually within a day.
      </>
    ),
  },
  {
    q: 'Can I update the site myself afterwards?',
    a: (
      <>
        That is the part I care most about. Most of what I build ships with a custom admin panel —
        not a generic CMS bolted on, but screens built for the specific things you will actually
        change. The legal practice in Chitwan edits its own services, photos and contact details in
        Nepali. The tour operator in Japan sets prices, blocks out dates and runs promotions without
        contacting me. You get the credentials at handover.
      </>
    ),
  },
  {
    q: 'Who owns the code and the site?',
    a: (
      <>
        You do, completely — the code, the domain, the database and every account. Nothing is
        rented from me and there is no licence that expires. If you want to move to another
        developer later, everything transfers and I will help with the handover rather than make it
        awkward.
      </>
    ),
  },
  {
    q: 'What happens after launch?',
    a: (
      <>
        Two weeks of fixes are included — anything broken or not behaving as agreed gets corrected
        at no cost. After that, small changes are ad-hoc and a longer maintenance arrangement is
        available if you would rather not think about it. Hosting for most of these sits on
        infrastructure that costs nothing at typical small-business traffic.
      </>
    ),
  },
  {
    q: 'Do you design as well, or only build?',
    a: (
      <>
        Both. Everything on this site was designed and built by the same person, which is mostly why
        the interfaces and the systems underneath agree with each other. If you already have a
        designer or brand guidelines, I will build to those instead — that is often faster.
      </>
    ),
  },
  {
    q: 'What do you need from me to start?',
    a: (
      <>
        Much less than people expect. A description of the business and what the site has to
        achieve is enough to scope it. Text, photos and logos can arrive while the build is
        underway — missing content is normal and I will tell you exactly what is still needed and
        when it becomes blocking.
      </>
    ),
  },
];

// No FAQPage JSON-LD here. Emitting it would mean maintaining a plain-text
// copy of every answer alongside the JSX, and since Google restricted FAQ rich
// results to authoritative health and government domains the payoff is close to
// zero. Invalid schema with empty answers would be actively worse than none.

export function FAQ() {
  return (
    <section className="faq" id="faq" aria-labelledby="faq-heading">
      <div className="faq__inner">
        <header className="faq__header">
          <span className="faq__eyebrow">QUESTIONS</span>
          <h2 id="faq-heading" className="faq__title">
            Before you email.
          </h2>
        </header>

        <div className="faq__list">
          {faqs.map((f) => (
            <details key={f.q} className="faq__item" name="faq">
              <summary className="faq__q">
                <span>{f.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </summary>
              <div className="faq__a">{f.a}</div>
            </details>
          ))}
        </div>

        <p className="faq__tail">
          Something else?{' '}
          <a href={`mailto:${site.email}`} className="faq__tail-link">
            {site.email}
          </a>
        </p>
      </div>
    </section>
  );
}
