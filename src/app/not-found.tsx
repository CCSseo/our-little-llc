import Link from "next/link";
import { HouseMark } from "@/components/Wordmark";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-content flex-col items-center px-5 py-32 text-center sm:px-8">
      <HouseMark className="h-16 w-16 animate-floaty text-ink" />
      <h1 className="display mt-8 text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">
        Not part of the family<span className="text-pop">.</span>
      </h1>
      <p className="mt-5 max-w-md text-lg text-muted">
        Whatever used to be here, it is not one of ours. The front porch is this way.
      </p>
      <Link
        href="/"
        className="mt-10 bg-ink px-8 py-4 text-base font-bold uppercase tracking-widest text-paper transition-colors hover:bg-pop"
      >
        Back home
      </Link>
    </main>
  );
}
