import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "BRL";

  useEffect(() => {
    if (open) syncCart();
  }, [open, syncCart]);

  const checkout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button aria-label="Abrir sacola" className="relative inline-flex h-10 w-10 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-paper">
          <ShoppingBag className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] text-paper">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col sm:max-w-lg">
        <SheetHeader className="shrink-0">
          <SheetTitle className="text-display text-3xl">Sacola</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Sua sacola está vazia" : `${totalItems} ${totalItems === 1 ? "item" : "itens"}`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col px-4 pt-4">
          {items.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-muted-foreground">
              <ShoppingBag className="mr-2 h-5 w-5" /> Nada por aqui ainda.
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
                {items.map((item) => {
                  const img = item.product.node.images?.edges?.[0]?.node;
                  return (
                    <div key={item.variantId} className="flex gap-4 border-b border-border pb-4">
                      <div className="h-20 w-16 shrink-0 overflow-hidden bg-secondary">
                        {img && <img src={img.url} alt={item.product.node.title} className="h-full w-full object-cover" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate">{item.product.node.title}</p>
                        <p className="eyebrow text-muted-foreground">
                          {item.selectedOptions.map((o) => o.value).filter((v) => v !== "Default Title").join(" · ")}
                        </p>
                        <p className="mt-1 text-sm">{formatPrice(item.price.amount, item.price.currencyCode)}</p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <button aria-label="Remover" onClick={() => removeItem(item.variantId)} className="text-muted-foreground hover:text-ink">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="flex items-center gap-1">
                          <button aria-label="Menos" className="border border-border p-1" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button aria-label="Mais" className="border border-border p-1" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="shrink-0 space-y-4 border-t border-border py-4">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow">Total</span>
                  <span className="text-xl">{formatPrice(String(total), currency)}</span>
                </div>
                <button
                  onClick={checkout}
                  disabled={isLoading || isSyncing}
                  className="eyebrow flex w-full items-center justify-center gap-2 bg-ink px-6 py-4 text-paper transition-colors hover:bg-ink-soft disabled:opacity-50"
                >
                  {isLoading || isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Finalizar compra →"}
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
