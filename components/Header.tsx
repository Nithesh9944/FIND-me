import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 lg:px-8">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
          My Game Store
        </Link>
        <nav aria-label="Main navigation">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink hover:text-paper"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
