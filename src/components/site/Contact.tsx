import { site } from '../../../content/site';

export function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="contact-block" id="contact">
      <div>
        <a href={site.mailtoHref} className="contact-block__email">
          {site.email}
        </a>
      </div>
      <p className="contact-block__sub">
        Taking on freelance projects · Kathmandu, Nepal ·{' '}
        <a
          href={site.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-block__sub-link"
        >
          GitHub
        </a>
      </p>
      <p className="contact-block__legal">
        © {currentYear} {site.name} · Full-Stack Developer
      </p>
    </footer>
  );
}
