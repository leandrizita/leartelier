import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartDrawer } from "@/components/CartDrawer";
import { fetchProductByHandle, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export const Route = createFileRoute("/lojinha/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} — Lojinha | Atelier` },
      { name: "description", content: "Peça artesanal da Lojinha: cadernos, prints e papelaria feitos à mão." },
      { property: "og:title", content: `${params.handle.replace(/-/g, " ")} — Lojinha` },
      { property: "og:description", content: "Peça artesanal da Lojinha: cadernos, prints e papelaria feitos à mão." },
      { property: "og:type", content: "product" },
      { property: "og:url", content: `https://leartelier.lovable.app/lojinha/${params.handle}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `https://leartelier.lovable.app/lojinha/${params.handle}` }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading } = useQuery({ queryKey: ["shopify-product", handle], queryFn: () => fetchProductByHandle(handle) });
  const [variantIdx, setVariantIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const adding = useCartStore((s) => s.isLoading);

  const p = product?.node;
  const variants = p?.variants.edges ?? [];
  const variant = variants[variantIdx]?.node;
  const images = p?.images.edges ?? [];

  const add = async () => {
    if (!product || !variant) return;
    await addItem({ product, variantId: variant.id, variantTitle: variant.title, price: variant.price, quantity: 1, selectedOptions: variant.selectedOptions || [] });
    toast.success("Adicionado à sacola", { description: p?.title, position: "top-center" });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-10">
        <Link to="/lojinha" className="eyebrow border-b border-ink pb-1">← Lojinha</Link>
        <CartDrawer />
      </div>
      {isLoading ? (
        <div className="flex justify-center py-32"><Loader2 className="h-6 w-6 animate-spin" /></div>
      ) : !p ? (
        <div className="px-6 py-32 text-center">
          <p className="text-display text-4xl">Produto não encontrado</p>
        </div>
      ) : (
        <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 pb-24 md:px-10 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden border border-border bg-secondary">
              {images[imgIdx] ? (
                <img src={images[imgIdx].node.url} alt={images[imgIdx].node.altText ?? p.title} className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div className="aspect-[4/5] w-full paper-grain" />
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.map((im, i) => (
                  <button key={im.node.url} onClick={() => setImgIdx(i)} className={`overflow-hidden border ${i === imgIdx ? "border-ink" : "border-border"}`}>
                    <img src={im.node.url} alt="" className="aspect-square w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="lg:pl-6">
            <h1 className="text-display text-5xl md:text-6xl">{p.title}</h1>
            {variant && <p className="mt-6 text-2xl">{formatPrice(variant.price.amount, variant.price.currencyCode)}</p>}
            {variants.length > 1 && (
              <div className="mt-8">
                <p className="eyebrow text-muted-foreground">Opções</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {variants.map((v, i) => (
                    <button key={v.node.id} onClick={() => setVariantIdx(i)} className={`eyebrow border px-4 py-2 ${i === variantIdx ? "border-ink bg-ink text-paper" : "border-border"}`}>
                      {v.node.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button onClick={add} disabled={adding || !variant?.availableForSale} className="eyebrow mt-10 inline-flex w-full items-center justify-center gap-2 bg-ink px-6 py-4 text-paper transition-colors hover:bg-ink-soft disabled:opacity-50">
              {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : variant?.availableForSale === false ? "Esgotado" : "Adicionar à sacola"}
            </button>
            {p.description && <p className="mt-10 whitespace-pre-line text-ink-soft">{p.description}</p>}
          </div>
        </section>
      )}
      <SiteFooter />
    </div>
  );
}
