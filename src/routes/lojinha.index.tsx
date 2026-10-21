import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/shopify";
import printSlot01 from "@/assets/lojinha-print-01.png.asset.json";
import printSlot02 from "@/assets/lojinha-print-02.png.asset.json";
import printSlot03 from "@/assets/lojinha-print-03.png.asset.json";

export const Route = createFileRoute("/lojinha/")({
  head: () => ({
    meta: [
      { title: "Lojinha — Cadernos, Prints & Papelaria Artesanal | Atelier" },
      { name: "description", content: "Cadernos costurados à mão, prints de aquarela e papelaria artesanal feitos no ateliê." },
      { property: "og:title", content: "Lojinha — Cadernos, Prints & Papelaria Artesanal" },
      { property: "og:description", content: "Cadernos costurados à mão, prints de aquarela e papelaria artesanal feitos no ateliê." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://leartelier.lovable.app/lojinha" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://leartelier.lovable.app/lojinha" }],
  }),
  component: Lojinha,
});

function FeaturedSlot({
  index,
  src,
  alt,
  title,
}: {
  index: string;
  src: string;
  alt: string;
  title: string;
}) {
  return (
    <article className="flex flex-col">
      <div className="relative overflow-hidden border border-border bg-secondary">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />
        <span className="eyebrow absolute left-3 top-3 border border-ink/20 bg-paper/80 px-2 py-1 text-ink backdrop-blur-sm">{index}</span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <span className="truncate text-lg">{title}</span>
        <span className="shrink-0 text-sm text-muted-foreground">—</span>
      </div>
      <div className="eyebrow mt-4 inline-flex items-center justify-center border border-dashed border-border px-4 py-3 text-muted-foreground">
        Em breve
      </div>
    </article>
  );
}

function PlaceholderSlot({ index }: { index: number }) {
  return (
    <article className="flex flex-col">
      <div className="paper-grain flex aspect-[4/5] w-full flex-col items-center justify-center border border-dashed border-border bg-secondary">
        <span className="text-display text-5xl text-ink-soft/40">{String(index + 1).padStart(2, "0")}</span>
        <span className="eyebrow mt-3 text-muted-foreground">Em breve</span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <span className="truncate text-lg text-ink-soft">Reservado para produto</span>
        <span className="shrink-0 text-sm text-muted-foreground">—</span>
      </div>
      <div className="eyebrow mt-4 inline-flex items-center justify-center border border-dashed border-border px-4 py-3 text-muted-foreground">
        Aguardando produto
      </div>
    </article>
  );
}

function Lojinha() {
  const { data: products, isLoading, error } = useQuery({ queryKey: ["shopify-products"], queryFn: () => fetchProducts(50) });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-end gap-6 px-6 py-16 md:px-10 md:py-24">
          <div className="min-w-0">
            <p className="eyebrow text-muted-foreground">Feito à mão · Brasília</p>
            <h1 className="text-display mt-4 text-[clamp(3rem,9vw,8rem)]">Lojinha.</h1>
            <p className="mt-6 max-w-xl text-ink-soft md:text-lg">
              Cadernos costurados à mão, prints de aquarela e pequenas peças de papelaria artesanal — direto do ateliê para a sua mesa.
            </p>
          </div>
          <CartDrawer />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {["Cadernos", "Prints", "Papelaria"].map((c) => (
              <span key={c} className="eyebrow text-muted-foreground">{c}</span>
            ))}
          </div>

          {isLoading ? (
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] animate-pulse bg-secondary" />
              ))}
            </div>
          ) : error ? (
            <p className="mt-10 text-muted-foreground">Não foi possível carregar os produtos agora.</p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              <FeaturedSlot
                index="01"
                src={printSlot01.url}
                alt="Print emoldurado em madeira clara, com passe-partout off-white, pendurado na parede de um escritório com mesa de madeira, notebook, caneca e plantas"
                title="Brasília, Entardecer — ATO 13OUT26"
              />
              <FeaturedSlot
                index="02"
                src={printSlot02.url}
                alt="Pintura de uma figura humana em pinceladas espessas de tons terrosos, ocre e rosa, com passe-partout branco e moldura preta fina, pendurada em uma parede clara"
                title="Sem título"
              />
              <FeaturedSlot
                index="03"
                src={printSlot03.url}
                alt="Print emoldurado em madeira clara com passe-partout off-white: menino de camisa creme e bermuda terracota segurando um balão vermelho, sobre fundo bege com faixas em vermelho e círculo ocre"
                title="Sem título"
              />
              {(products ?? []).slice(0, 6).map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
              {Array.from({ length: Math.max(0, 6 - Math.min(6, (products ?? []).length)) }).map((_, i) => (
                <PlaceholderSlot key={`slot-${i}`} index={(products ?? []).length + i + 3} />
              ))}
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
