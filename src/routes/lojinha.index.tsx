import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/shopify";

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
              {(products ?? []).slice(0, 9).map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
              {Array.from({ length: Math.max(0, 9 - Math.min(9, (products ?? []).length)) }).map((_, i) => (
                <PlaceholderSlot key={`slot-${i}`} index={(products ?? []).length + i} />
              ))}
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
