import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { type ShopifyProduct, formatPrice } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const p = product.node;
  const variant = p.variants.edges[0]?.node;
  const img = p.images.edges[0]?.node;

  const add = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Adicionado à sacola", { description: p.title, position: "top-center" });
  };

  return (
    <article className="group flex flex-col">
      <Link to="/lojonha/$handle" params={{ handle: p.handle }} className="block overflow-hidden border border-border bg-secondary">
        {img ? (
          <img src={img.url} alt={img.altText ?? p.title} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        ) : (
          <div className="aspect-[4/5] w-full paper-grain" />
        )}
      </Link>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <Link to="/lojonha/$handle" params={{ handle: p.handle }} className="min-w-0 truncate text-lg hover:underline underline-offset-4">
          {p.title}
        </Link>
        <span className="shrink-0 text-sm">{formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode)}</span>
      </div>
      {p.description && <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{p.description}</p>}
      <button
        onClick={add}
        disabled={isLoading || !variant?.availableForSale}
        className="eyebrow mt-4 inline-flex items-center justify-center gap-2 border border-ink px-4 py-3 text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : variant?.availableForSale === false ? "Esgotado" : "Adicionar à sacola"}
      </button>
    </article>
  );
}
