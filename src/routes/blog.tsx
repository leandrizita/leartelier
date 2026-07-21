import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import capaMundial2026 from "@/assets/blog/capa-mundial-2026.png.asset.json";
import capaPaoDeAcucar from "@/assets/blog/pao-de-acucar-rio.png.asset.json";


export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Atelier" },
      { name: "description", content: "Reflexões, processos e histórias por trás das aquarelas, encadernações e desenhos urbanos." },
      { property: "og:title", content: "Blog — Atelier" },
      { property: "og:description", content: "Reflexões, processos e histórias por trás das aquarelas, encadernações e desenhos urbanos." },
    ],
  }),
  component: Blog,
});

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  cover?: string;
};

const posts: Post[] = [
  {
    slug: "em-breve-1",
    title: "Sketches - Mundial FIFA 2026",
    excerpt:
      "Um espaço reservado para a primeira reflexão — sobre o gesto inicial da aquarela, a escolha do papel e a luz que orienta o traço.\nA jornada da seleção porteña a partir dos meus traços e registros urbanos. ",
    category: "AQUARELA",
    date: "Em breve",
    readingTime: "5 min",
    cover: capaMundial2026.url,
  },
  {
    slug: "em-breve-2",
    title: "Título do segundo post",
    excerpt:
      "Aqui caberão notas sobre urban sketching: cadernos, ferramentas e a prática de desenhar a cidade em movimento.",
    category: "URBAN SKETCH",
    date: "Em breve",
    readingTime: "4 min",
    cover: capaPaoDeAcucar.url,
  },
  {
    slug: "em-breve-3",
    title: "Título do terceiro post",
    excerpt:
      "Espaço para o processo de encadernação artesanal — costura, capa em couro e a anatomia de um caderno feito à mão.",
    category: "ENCADERNAÇÃO",
    date: "Em breve",
    readingTime: "6 min",
  },
  {
    slug: "em-breve-4",
    title: "Título do quarto post",
    excerpt:
      "Reservado para ensaios em filme 35mm: silêncios, becos e a paciência do analógico.",
    category: "FOTOGRAFIA",
    date: "Em breve",
    readingTime: "3 min",
  },
];

const categories = ["Todos", "AQUARELA", "URBAN SKETCH", "ENCADERNAÇÃO", "FOTOGRAFIA"];

function Blog() {
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="md:col-span-7">
            <p className="eyebrow text-muted-foreground">Reflexões</p>
            <h1 className="text-display mt-4 text-6xl md:text-8xl">Blog.</h1>
          </div>
          <div className="md:col-span-5 self-end">
            <p className="text-lg text-ink-soft">
              Histórias por trás das obras, processos criativos, observações de
              viagem e notas de um atelier em constante movimento.
            </p>
          </div>
        </div>
      </section>



      {/* Filtros */}
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-6 py-6 md:px-10">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`eyebrow rounded-full border px-4 py-2 transition-colors ${
                i === 0
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Post em destaque */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <p className="eyebrow text-muted-foreground mb-8">Em destaque</p>
          <article className="group grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-muted">
                {featured.cover ? (
                  <img
                    src={featured.cover}
                    alt={featured.title}
                    className="h-full w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                    width={800}
                    height={600}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                    Imagem de capa
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="eyebrow">{featured.category}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readingTime}</span>
              </div>
              <h2 className="text-display mt-4 text-4xl md:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-lg text-ink-soft">{featured.excerpt}</p>
              <Link
                to="/blog/$slug"
                params={{ slug: featured.slug }}
                className="eyebrow mt-6 inline-flex w-fit border-b border-foreground pb-1 text-foreground"
              >
                Ler post →
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Grade de posts */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <div className="mb-10 flex items-end justify-between">
            <p className="eyebrow text-muted-foreground">Mais recentes</p>
            <span className="text-sm text-muted-foreground">
              {rest.length} posts
            </span>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {rest.map((post) => (
              <article key={post.slug} className="group flex flex-col">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-muted">
                  {post.cover ? (
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                      Imagem
                    </div>
                  )}
                </div>
                <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="eyebrow">{post.category}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-display mt-2 text-2xl">{post.title}</h3>
                <p className="mt-3 text-base text-ink-soft">{post.excerpt}</p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="eyebrow mt-4 inline-flex w-fit border-b border-foreground pb-1 text-foreground"
                >
                  Ler →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:px-10 md:py-20">
          <div className="md:col-span-6">
            <p className="eyebrow text-muted-foreground">Newsletter</p>
            <h2 className="text-display mt-3 text-3xl md:text-4xl">
              Receba novos posts no seu e-mail.
            </h2>
          </div>
          <form className="md:col-span-6 flex flex-col gap-3 self-end sm:flex-row">
            <input
              type="email"
              placeholder="seu@email.com"
              className="flex-1 border-b border-border bg-transparent px-1 py-3 text-base outline-none focus:border-foreground"
            />
            <button
              type="submit"
              className="eyebrow rounded-full bg-foreground px-6 py-3 text-background"
            >
              Inscrever-se
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
