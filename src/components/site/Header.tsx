import Link from 'next/link';

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
              <a href="#work" className="site-header__link">
                Work
              </a>
            </li>
            <li>
              <Link href="/approach" className="site-header__link">
                About
              </Link>
            </li>
            <li>
              <a href="mailto:hello@zetroxy.me" className="site-header__link">
                Email
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
