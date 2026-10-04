import { testimonials } from '../../../content/testimonials';

export function CaseTestimonial({ slug }: { slug: string }) {
  // Explicitly handle nexus-mcu mapping to nexus testimonial
  const targetSlug = slug === 'nexus-mcu' ? 'nexus' : slug;
  const testimonial = testimonials.find((t) => t.slug === targetSlug);

  if (!testimonial) return null;

  return (
    <aside className="case-testimonial" aria-label="Client testimonial">
      <blockquote className="case-quote" lang={testimonial.lang}>
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {testimonial.translation && (
        <p className="case-testimonial__translation">
          {testimonial.translation}
        </p>
      )}

      <p className="case-testimonial__author">
        {testimonial.author} · {testimonial.role}
      </p>
    </aside>
  );
}
