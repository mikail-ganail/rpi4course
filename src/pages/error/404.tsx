import type { JSX } from "react";

export function NotFoundPage(): JSX.Element {
  return (
    <main className="page page--not-found">
      <section className="not-found">
        <h1 className="not-found__title">404 — Page not found</h1>
        <p className="not-found__text">
          The page you are looking for does not exist or has been moved.
        </p>
      </section>
    </main>
  );
}
