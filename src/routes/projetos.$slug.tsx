import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getProject, projects } from "@/lib/projects";

export const Route = createFileRoute("/projetos/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Projetos` },
          { name: "description", content: loaderData.project.description },
          { property: "og:title", content: `${loaderData.project.title} — Projetos` },
          { property: "og:description", content: loaderData.project.description },
        ]
      : [],
  }),
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
        <p className="eyebrow text-muted-foreground">404</p>
        <h1 className="text-display mt-4 text-5xl md:text-7xl">Projeto não encontrado.</h1>
        <Link to="/projetos" className="eyebrow mt-8 inline-flex items-center gap-2 text-ink hover:opacity-70">
          ← Voltar para projetos
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
      <p>{error instanceof Error ? error.message : "Algo deu errado."}</p>
    </div>
  ),
});

// Editorial layout for 10 slots: alternating spans + per-slot aspect ratios
const slotsLayout: { span: string; aspect: string }[] = [
  { span: "md:col-span-7", aspect: "aspect-[4/3]" },
  { span: "md:col-span-5", aspect: "aspect-[3/4]" },
  { span: "md:col-span-4", aspect: "aspect-square" },
  { span: "md:col-span-8", aspect: "aspect-[16/9]" },
  { span: "md:col-span-12", aspect: "aspect-[21/9]" },
  { span: "md:col-span-6", aspect: "aspect-[4/5]" },
  { span: "md:col-span-6", aspect: "aspect-[4/5]" },
  { span: "md:col-span-5", aspect: "aspect-[3/4]" },
  { span: "md:col-span-7", aspect: "aspect-[4/3]" },
  { span: "md:col-span-12", aspect: "aspect-[16/7]" },
];

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 pt-12 md:px-10">
          <Link to="/projetos" className="eyebrow text-muted-foreground transition-colors hover:text-ink">
            ← Projetos
          </Link>
        </div>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
          <div className="md:col-span-7">
            <p className="eyebrow text-muted-foreground">
              {project.number} · {project.tagline}
            </p>
            <h1 className="text-display mt-4 text-6xl md:text-8xl">{project.title}.</h1>
          </div>
          <div className="md:col-span-5 flex flex-col gap-6 self-end">
            <p className="text-lg text-ink-soft">{project.longDescription}</p>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="eyebrow text-ink">{project.status}</span>
              <span className="eyebrow text-muted-foreground">{project.year}</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
            <div>
              <p className="eyebrow text-muted-foreground">Galeria</p>
              <h2 className="text-display mt-2 text-3xl md:text-5xl">Obras.</h2>
            </div>
            <p className="eyebrow text-muted-foreground">10 peças</p>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-12 md:gap-x-8 md:gap-y-16">
            {slotsLayout.map((slot, i) => {
              const n = i + 1;
              const work = project.works[i];
              return (
                <figure key={n} className={`${slot.span} group flex flex-col gap-4`}>
                  <div
                    className={`relative ${slot.aspect} w-full overflow-hidden border border-border bg-muted transition-colors duration-500 group-hover:bg-muted/70`}
                  >
                    {work.image ? (
                      <img
                        src={work.image}
                        alt={work.imageAlt || work.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-display text-7xl text-muted-foreground/30 transition-transform duration-500 group-hover:scale-110 md:text-9xl">
                          {String(n).padStart(2, "0")}
                        </span>
                      </div>
                    )}
                    <div className="absolute left-4 top-4">
                      <span className="eyebrow text-muted-foreground">{String(n).padStart(2, "0")} / 10</span>
                    </div>
                  </div>
                  <figcaption className="flex flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-display text-xl md:text-2xl">{work.title}</span>
                      <span className="eyebrow text-muted-foreground">{work.year}</span>
                    </div>
                    <span className="eyebrow text-muted-foreground">
                      {work.technique} · {work.dimensions}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-10 md:py-20">
          <div>
            <p className="eyebrow text-muted-foreground">Próximo projeto</p>
            <Link
              to="/projetos/$slug"
              params={{ slug: next.slug }}
              className="text-display mt-3 block text-4xl transition-opacity hover:opacity-70 md:text-6xl"
            >
              {next.title} →
            </Link>
          </div>
          <Link to="/projetos" className="eyebrow inline-flex items-center gap-2 text-ink hover:opacity-70">
            Ver todos
          </Link>
        </div>
      </section>

      <SiteFooter />

    </div>
  );
}
