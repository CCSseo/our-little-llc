import Link from "next/link";
import { BRANDS, FOOTER, SITE } from "@/lib/content";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-line-dark bg-ink text-paper">
      <div className="shell py-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_.7fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="Our Little Company, home" className="inline-flex"><Wordmark inverse /></Link>
            <p className="mt-4 max-w-xs text-base text-paper/70">{FOOTER.line}</p>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="link-red mt-4 inline-flex min-h-11 items-center text-base text-paper/80">Find us on LinkedIn</a>
          </div>
          <div>
            <p className="label mb-3 text-[.8rem] text-paper/60">The family</p>
            <ul>
              {BRANDS.map((brand) => (
                <li key={brand.slug}><Link href={`/brands/${brand.slug}`} className="inline-flex min-h-11 items-center text-base text-paper/80 hover:text-paper">{brand.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label mb-3 text-[.8rem] text-paper/60">A little more</p>
            <ul>
              {[["/#family", "The Family"], ["/#how", "How We Build"], ["/story", "Our Story"], ["/feed", "Our Little Feed"]].map(([href, label]) => (
                <li key={href}><Link href={href} className="inline-flex min-h-11 items-center text-base text-paper/80 hover:text-paper">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-line-dark pt-6 text-[.85rem] text-paper/60">© {new Date().getFullYear()} {FOOTER.legal}</p>
      </div>
    </footer>
  );
}
