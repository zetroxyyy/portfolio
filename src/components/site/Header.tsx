import Link from 'next/link';
import { site } from '../../../content/site';

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__name">
          zetroxy
        </Link>
        <nav aria-label="Main navigation">
          <ul className="site-header__links">
            <li>
              <Link href="/work" className="site-header__link">
                Work
              </Link>
            </li>
            <li>
              <Link href="/about" className="site-header__link">
                About
              </Link>
            </li>
            <li>
              <a href={site.mailtoHref} className="site-header__link">
                Email
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
