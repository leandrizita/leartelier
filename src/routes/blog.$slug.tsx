import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Post — ${params.slug} — Atelier` },
      { name: "description", content: "Post do blog do Atelier — espaço editável de escrita com imagem." },
    ],
  }),
  component: BlogPost,
});

type PostDraft = {
  title: string;
  category: string;
  date: string;
  body: string;
  image: string;
};

const DEFAULT_DRAFT: PostDraft = {
  title: "Título do post",
  category: "AQUARELA",
  date: "Hoje",
  body: "Comece a escrever aqui. Este é um espaço editável — clique em qualquer texto para alterá-lo e use o botão abaixo para trocar a imagem de capa.",
  image: "",
};

function BlogPost() {
  const { slug } = Route.useParams();
  const storageKey = `blog-draft:${slug}`;
  const [draft, setDraft] = useState<PostDraft>(DEFAULT_DRAFT);
  const [loaded, setLoaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setDraft({ ...DEFAULT_DRAFT, ...JSON.parse(raw) });
    } catch {}
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (loaded) localStorage.setItem(storageKey, JSON.stringify(draft));
  }, [draft, loaded, storageKey]);

  const update = (k: keyof PostDraft) => (e: React.FormEvent<HTMLElement>) =>
    setDraft((d) => ({ ...d, [k]: e.currentTarget.textContent ?? "" }));

  const onImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDraft((d) => ({ ...d, image: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <article className="mx-auto max-w-[900px] px-6 py-16 md:px-10 md:py-24">
        <Link to="/blog" className="eyebrow text-muted-foreground hover:text-foreground">
          ← Voltar ao blog
        </Link>

        <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
          <span
            className="eyebrow outline-none focus:text-foreground"
            contentEditable
            suppressContentEditableWarning
            onBlur={update("category")}
          >
            {draft.category}
          </span>
          <span>·</span>
          <span
            className="outline-none focus:text-foreground"
            contentEditable
            suppressContentEditableWarning
            onBlur={update("date")}
          >
            {draft.date}
          </span>
        </div>

        <h1
          className="text-display mt-4 text-4xl md:text-6xl outline-none focus:opacity-90"
          contentEditable
          suppressContentEditableWarning
          onBlur={update("title")}
        >
          {draft.title}
        </h1>

        <div className="mt-10">
          <div
            className="aspect-[16/9] w-full overflow-hidden rounded-md bg-muted"
            onClick={() => fileRef.current?.click()}
            role="button"
            tabIndex={0}
          >
            {draft.image ? (
              <img src={draft.image} alt="Capa do post" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                Clique para adicionar uma imagem
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImage}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="eyebrow mt-3 text-muted-foreground hover:text-foreground"
          >
            {draft.image ? "Trocar imagem" : "Adicionar imagem"}
          </button>
        </div>

        <div
          className="mt-10 min-h-[300px] whitespace-pre-wrap text-lg leading-relaxed text-ink-soft outline-none focus:text-foreground"
          contentEditable
          suppressContentEditableWarning
          onBlur={update("body")}
        >
          {draft.body}
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          As alterações são salvas automaticamente neste navegador.
        </p>
      </article>

      <SiteFooter />
    </div>
  );
}
