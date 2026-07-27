import Link from "next/link";
import { BRANDS, FOOTER, SITE } from "@/lib/content";
import { HouseMark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="mt-28 bg-ink text-paper">
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <HouseMark className="h-7 w-7" />
              <span className="display text-base font-bold uppercase tracking-tight">
                {SITE.brandFull}
              </span>
            </div>
            <p className="mt-4 text-base text-paper/60">{FOOTER.line}</p>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-red mt-5 inline-block text-base text-paper/80"
            >
              Find us on LinkedIn
            </a>
          </div>

          <div>
            <div className="label mb-4 text-[0.75rem] text-pop">The family</div>
            <ul className="space-y-2.5 text-base">
              {BRANDS.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/brands/${b.slug}`}
                    className="text-paper/70 transition-colors hover:text-paper"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="label mb-4 text-[0.75rem] text-pop">This site</div>
            <ul className="space-y-2.5 text-base">
              <li>
                <Link href="/#family" className="text-paper/70 transition-colors hover:text-paper">
                  The Family
                </Link>
              </li>
              <li>
                <Link href="/#how" className="text-paper/70 transition-colors hover:text-paper">
                  How We Build
                </Link>
              </li>
              <li>
                <Link href="/story" className="text-paper/70 transition-colors hover:text-paper">
                  The Story
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-line-dark pt-6 text-sm text-paper/40">
          © {new Date().getFullYear()} {FOOTER.legal}
        </div>
      </div>
    </footer>
  );
}
