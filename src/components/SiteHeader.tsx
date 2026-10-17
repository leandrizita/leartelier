import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/", label: "Início" },
  { to: "/trabalhos", label: "Trabalhos" },
  { to: "/projetos", label: "Projetos" },
  { to: "/blog", label: "Blog" },
  { to: "/lojonha", label: "LOJINHA" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="text-display text-xl">Atelier</span>
          <span className="eyebrow text-muted-foreground">— Aquarela & Papel</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="eyebrow text-ink-soft transition-colors hover:text-ink"
              activeProps={{ className: "eyebrow text-ink underline underline-offset-8" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link to="/contato" className="eyebrow hidden rounded-sm border border-ink px-4 py-2 text-ink transition-colors hover:bg-ink hover:text-paper md:inline-block">
          Encomendar
        </Link>
      </div>
    </header>
  );
}
