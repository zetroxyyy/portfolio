'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { submitEnquiry } from '@/app/actions/contact';
import { site } from '../../../content/site';
import { ease, duration } from '@/lib/motionConfig';

const PROJECT_TYPES = [
  'A website for my business',
  'A website I can edit myself (CMS)',
  'A booking or ordering system',
  'An online store',
  'An internal tool or dashboard',
  'Something else',
] as const;

const TIMELINES = [
  'As soon as possible',
  'Within 1–2 months',
  '3 months or more',
  'Just exploring for now',
] as const;

const BUDGETS = [
  'Not sure yet',
  'Under $500',
  '$500 – $1,500',
  '$1,500 – $4,000',
  '$4,000+',
] as const;

type State =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'sent' }
  | { status: 'error'; message: string; unconfigured?: boolean };

export function Contact() {
  const [state, setState] = useState<State>({ status: 'idle' });
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ status: 'sending' });

    const result = await submitEnquiry(new FormData(form));

    if (result.ok) {
      setState({ status: 'sent' });
      form.reset();
    } else {
      setState({
        status: 'error',
        message: result.error,
        unconfigured: result.unconfigured,
      });
    }
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div className="contact__inner">
        {/* Left — the pitch */}
        <div className="contact__lede">
          <span className="contact__eyebrow">START A PROJECT</span>
          <h2 id="contact-heading" className="contact__title">
            Tell me what it needs to do.
          </h2>
          <p className="contact__blurb">
            Not what it should look like — what it needs to <em className="serif-italic">do</em>.
            Take bookings, hold stock, run in two languages, let your staff update it without
            calling anyone. That is the part that decides how the thing gets built.
          </p>

          <ul className="contact__promises">
            <li>A reply within one working day, with honest scope and timing.</li>
            <li>No obligation, and no charge for the conversation.</li>
            <li>If it is not a good fit, I will say so and point you elsewhere.</li>
          </ul>

          <div className="contact__direct">
            <span className="contact__direct-label">Or email directly</span>
            <a href={`mailto:${site.email}`} className="contact__direct-email">
              {site.email}
            </a>
          </div>
        </div>

        {/* Right — the form */}
        <motion.div
          className="contact__form-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: duration.slow, ease }}
        >
          {state.status === 'sent' ? (
            <div className="contact__sent" role="status">
              <span className="contact__sent-mark" aria-hidden="true">
                ✓
              </span>
              <h3 className="contact__sent-title">Sent.</h3>
              <p className="contact__sent-body">
                I&apos;ll read it properly and reply within a working day — to the address you gave.
              </p>
              <button
                type="button"
                className="contact__sent-again"
                onClick={() => setState({ status: 'idle' })}
              >
                Send another
              </button>
            </div>
          ) : (
            <form ref={formRef} className="enquiry" onSubmit={handleSubmit} noValidate>
              {/* Honeypot — visually and programmatically hidden from people */}
              <div className="enquiry__hp" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="enquiry__row">
                <div className="enquiry__field">
                  <label htmlFor="name" className="enquiry__label">
                    Your name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="enquiry__input"
                  />
                </div>

                <div className="enquiry__field">
                  <label htmlFor="email" className="enquiry__label">
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="enquiry__input"
                  />
                </div>
              </div>

              <div className="enquiry__field">
                <label htmlFor="projectType" className="enquiry__label">
                  What are you building? <span aria-hidden="true">*</span>
                </label>
                <select id="projectType" name="projectType" required className="enquiry__input" defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="enquiry__field">
                <label htmlFor="detail" className="enquiry__label">
                  What does it need to do? <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="detail"
                  name="detail"
                  required
                  rows={5}
                  className="enquiry__input enquiry__textarea"
                  placeholder="The business, who it's for, and what has to work. Rough is fine."
                />
              </div>

              <div className="enquiry__row">
                <div className="enquiry__field">
                  <label htmlFor="timeline" className="enquiry__label">
                    When do you need it?
                  </label>
                  <select id="timeline" name="timeline" className="enquiry__input" defaultValue="">
                    <option value="">No strong deadline</option>
                    {TIMELINES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="enquiry__field">
                  <label htmlFor="budget" className="enquiry__label">
                    Rough budget
                  </label>
                  <select id="budget" name="budget" className="enquiry__input" defaultValue="">
                    <option value="">Prefer not to say</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {state.status === 'error' && (
                <p className="enquiry__error" role="alert">
                  {state.message}
                  {state.unconfigured && (
                    <>
                      {' '}
                      Email me at{' '}
                      <a href={`mailto:${site.email}`} className="enquiry__error-link">
                        {site.email}
                      </a>{' '}
                      and it will reach me just the same.
                    </>
                  )}
                </p>
              )}

              <button type="submit" className="enquiry__submit" disabled={state.status === 'sending'}>
                <span>{state.status === 'sending' ? 'Sending…' : 'Send enquiry'}</span>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </button>

              <p className="enquiry__note">
                Budget is optional and there is no price list here on purpose — scope decides cost,
                and I would rather quote the actual thing than a category.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
