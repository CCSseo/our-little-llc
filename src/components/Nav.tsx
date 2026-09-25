"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Wordmark } from "./Wordmark";

const LINKS = [
  { href: "/#family", label: "The family" },
  { href: "/#how", label: "How we build" },
  { href: "/story", label: "Our story" },
];

export function Nav() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => { if (menu.current) menu.current.open = false; };

  useEffect(() => {
    closeMenu();
    const desktop = window.matchMedia("(min-width: 768px)");
    desktop.addEventListener("change", closeMenu);
    return () => desktop.removeEventListener("change", closeMenu);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <nav aria-label="Main navigation" className="shell site-nav flex items-center justify-between gap-4">
        <Link href="/" aria-label="Our Little Company, home" onClick={closeMenu}><Wordmark /></Link>
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link"
              aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>
          ))}
        </div>
        <details ref={menu} className="mobile-menu md:hidden" onKeyDown={(event) => {
          if (event.key === "Escape" && menu.current?.open) {
            closeMenu();
            menu.current.querySelector("summary")?.focus();
          }
        }}>
          <summary className="cursor-pointer list-none px-2 py-3 text-[.85rem] font-medium">Menu <span aria-hidden className="ml-1">+</span></summary>
          <div className="absolute inset-x-0 top-full border-b border-line bg-paper px-6 py-3">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMenu}
                aria-current={pathname === link.href ? "page" : undefined}
                className="nav-link flex border-b border-line py-4 last:border-0">{link.label}</Link>
            ))}
          </div>
        </details>
      </nav>
    </header>
  );
}
