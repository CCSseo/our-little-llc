"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Wordmark } from "./Wordmark";

const LINKS = [
  { href: "/#family", label: "The Family" },
  { href: "/#how", label: "How We Build" },
  { href: "/story", label: "Our Story" },
  { href: "/feed", label: "Our Little Feed" },
];

export function Nav() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const header = useRef<HTMLElement>(null);
  const closeMenu = () => { if (menu.current) menu.current.open = false; };

  useEffect(() => {
    closeMenu();
    const desktop = window.matchMedia("(min-width: 768px)");
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) closeMenu();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        closeMenu();
        menu.current.querySelector("summary")?.focus();
      }
    };
    desktop.addEventListener("change", closeMenu);
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      desktop.removeEventListener("change", closeMenu);
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [pathname]);

  return (
    <header ref={header} className="site-header sticky top-0 z-50 border-b border-line bg-paper">
      <nav aria-label="Main navigation" className="shell site-nav flex items-center justify-between gap-4">
        <Link href="/" aria-label="Our Little Company, home" onClick={closeMenu}><Wordmark /></Link>
        <div className="desktop-nav hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link"
              aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>
          ))}
        </div>
        <details ref={menu} className="mobile-menu md:hidden" onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeMenu();
        }}>
          <summary className="mobile-menu-toggle" aria-controls="mobile-navigation">
            <span className="menu-when-closed">Menu</span><span className="menu-when-open">Close</span>
            <span className="menu-icon" aria-hidden><span /><span /></span>
          </summary>
          <div id="mobile-navigation" className="mobile-menu-panel">
            <div className="shell">
              <p className="mobile-menu-eyebrow">Make yourself at home.</p>
              <ul className="mobile-menu-links">
                {LINKS.map((link, i) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={closeMenu}
                      aria-current={pathname === link.href ? "page" : undefined} className="mobile-menu-link">
                      <span className="mobile-menu-number" aria-hidden>0{i + 1}</span>
                      <span>{link.label}</span><span className="mobile-menu-arrow" aria-hidden>↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mobile-menu-note">A little company. A lot of fun.</p>
            </div>
          </div>
        </details>
      </nav>
    </header>
  );
}
