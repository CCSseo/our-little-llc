import { HouseMark } from "@/components/Wordmark";

export default function NotFound() {
  return (
    <main id="main-content" className="mx-auto flex max-w-content flex-col items-center px-5 py-32 text-center sm:px-8">
      <HouseMark className="h-16 w-16 animate-floaty text-ink" />
      <h1 className="section-title mt-8">
        Not part of the family<span className="text-pop">.</span>
      </h1>
      <p className="mt-5 max-w-md text-lg text-muted">
        Whatever used to be here, it is not one of ours. The front porch is this way.
      </p>
      <a
        href="/"
        className="button button-dark mt-8"
      >
        Back home
      </a>
    </main>
  );
}
