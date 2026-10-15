import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroAsset from "@/assets/hero-museu-brasilia.png.asset.json";
import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier — Aquarela, Ilustração Urbana & Encadernação" },
      { name: "description", content: "Urban sketcher, ilustradora aquarelista, encadernadora e fotógrafa. Trabalhos feitos à mão, do papel à tinta." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* HERO — split screen */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-between px-6 py-16 md:px-10 md:py-24 lg:min-h-[80vh]">
            <p className="eyebrow text-muted-foreground">Caderno nº 12 · 2026</p>

            <div className="my-12 lg:my-0">
              <h1 className="text-display text-[clamp(3rem,8vw,7.5rem)]">
                Desenhar<br />
                <span className="italic font-light">a cidade</span><br />
                devagar.
              </h1>
              <p className="mt-8 max-w-md text-base text-ink-soft md:text-lg">
                Urban sketcher, aquarelista, encadernadora artesanal e fotógrafa.
                Faço pequenas observações do mundo — em papel de algodão, linha de
                linho e prata sobre filme.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/trabalhos"
                className="eyebrow inline-flex items-center gap-3 bg-ink px-6 py-4 text-paper transition-colors hover:bg-ink-soft"
              >
                Ver trabalhos
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/contato"
                className="eyebrow inline-flex items-center gap-3 border-b border-ink pb-1 text-ink"
              >
                Encomendar uma peça
              </Link>
            </div>
          </div>

          <div className="relative border-t border-border lg:border-l lg:border-t-0">
            <img
              src={heroAsset.url}
              alt="Ilustração de uma multidão de costas, com bandeiras vermelhas e laranjas, diante da cúpula iluminada do Museu Nacional da República, em Brasília, ao entardecer."
              width={1085}
              height={1450}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <p className="eyebrow bg-paper/90 px-3 py-2 text-ink">Brasília, entardecer</p>
              <p className="eyebrow bg-paper/90 px-3 py-2 text-ink">aquarela · ink</p>
            </div>
          </div>
        </div>
      </section>

      {/* DISCIPLINAS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-muted-foreground">Disciplinas</p>
              <h2 className="text-display mt-4 text-5xl md:text-6xl">
                Vários<br />ofícios,<br />uma só mão.
              </h2>
            </div>
            <div className="lg:col-span-8 lg:pl-10">
              <ul className="divide-y divide-border border-y border-border">
                {[
                  ["01", "Urban Sketching", "Cadernos preenchidos a céu aberto, em viagens e na rotina."],
                  ["02", "Ilustração em Aquarela", "Comissões e séries autorais em papel de algodão."],
                  ["03", "Encadernação Artesanal", "Cadernos costurados à mão, capa dura, papel selecionado."],
                  ["04", "Fotografia Analógica", "Película preto e branco, revelação artesanal."],
                ].map(([n, title, desc]) => (
                  <li key={n} className="grid grid-cols-12 gap-6 py-8 transition-colors hover:bg-secondary/40">
                    <span className="eyebrow col-span-2 text-muted-foreground">{n}</span>
                    <div className="col-span-10 md:col-span-7">
                      <h3 className="text-2xl md:text-3xl">{title}</h3>
                    </div>
                    <p className="col-span-12 text-sm text-ink-soft md:col-span-3">{desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED WORK preview */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow text-muted-foreground">Trabalhos recentes</p>
              <h2 className="text-display mt-3 text-5xl md:text-6xl">Do caderno.</h2>
            </div>
            <Link to="/trabalhos" className="eyebrow hidden border-b border-ink pb-1 md:inline-block">
              Tudo →
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { src: w1, title: "Lisboa, eléctrico 28", tag: "Aquarela" },
              { src: w2, title: "Caderno em couro nº 9", tag: "Encadernação" },
              { src: w3, title: "Beco silencioso", tag: "Filme 35mm" },
            ].map((w) => (
              <figure key={w.title} className="group">
                <div className="overflow-hidden border border-border bg-secondary">
                  <img
                    src={w.src}
                    alt={w.title}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between">
                  <span className="text-base">{w.title}</span>
                  <span className="eyebrow text-muted-foreground">{w.tag}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="border-b border-border bg-secondary/40 paper-grain">
        <div className="mx-auto max-w-[1100px] px-6 py-24 md:px-10 md:py-32">
          <p className="text-display text-4xl md:text-6xl">
            <span className="text-muted-foreground">“</span>
            Cada página é um lugar onde estive.
            O caderno guarda o tempo melhor que a memória.
            <span className="text-muted-foreground">”</span>
          </p>
          <p className="eyebrow mt-8 text-muted-foreground">— do diário, 2026</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
