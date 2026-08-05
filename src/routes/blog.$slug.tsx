import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPost } from "@/lib/posts";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPost(params.slug);
    const title = post ? `${post.title} — Blog — Atelier` : `Post — Atelier`;
    const description = post
      ? post.excerpt.trim().slice(0, 155)
      : "Post do blog do Atelier — espaço editável de escrita com imagem.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(post?.cover?.startsWith("https://")
          ? [
              { property: "og:image", content: post.cover },
              { name: "twitter:image", content: post.cover },
            ]
          : []),
      ],
    };
  },
  component: BlogPost,
});

type PostDraft = {
  title: string;
  category: string;
  date: string;
  body: string;
  image: string;
  extraImages: string[];
};

const DEFAULT_DRAFT: PostDraft = {
  title: "Título do post",
  category: "AQUARELA",
  date: "Hoje",
  body: "Comece a escrever aqui. Este é um espaço editável — clique em qualquer texto para alterá-lo e use o botão abaixo para trocar a imagem de capa.",
  image: "",
  extraImages: ["", "", ""],
};

function initialDraft(slug: string): PostDraft {
  const post = getPost(slug);
  if (!post) return DEFAULT_DRAFT;
  return {
    title: post.title,
    category: post.category,
    date: post.date,
    body: post.body,
    image: post.cover ?? "",
    extraImages: ["", "", ""],
  };
}



function BlogPost() {
  const { slug } = Route.useParams();
  const storageKey = `blog-draft:${slug}`;
  const [draft, setDraft] = useState<PostDraft>(DEFAULT_DRAFT);
  const [loaded, setLoaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const extraRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];


  useEffect(() => {
    const base = initialDraft(slug);
    try {
      const raw = localStorage.getItem(storageKey);
      setDraft(raw ? { ...base, ...JSON.parse(raw) } : base);
    } catch {
      setDraft(base);
    }
    setLoaded(true);
  }, [storageKey, slug]);


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

  const onExtraImage = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setDraft((d) => {
        const extras = [...(d.extraImages ?? ["", "", ""])];
        extras[idx] = String(reader.result);
        return { ...d, extraImages: extras };
      });
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

        <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[0, 1, 2].map((idx) => {
            const src = draft.extraImages?.[idx] ?? "";
            return (
              <div key={idx} className="flex flex-col gap-2">
                <div
                  className="aspect-[4/5] w-full overflow-hidden rounded-md bg-muted cursor-pointer"
                  onClick={() => extraRefs[idx].current?.click()}
                  role="button"
                  tabIndex={0}
                >
                  {src ? (
                    <img src={src} alt={`Imagem ${idx + 1} do post`} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                      Slot {idx + 1} — clique para adicionar
                    </div>
                  )}
                </div>
                <input
                  ref={extraRefs[idx]}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onExtraImage(idx)}
                />
                <button
                  type="button"
                  onClick={() => extraRefs[idx].current?.click()}
                  className="eyebrow text-left text-muted-foreground hover:text-foreground"
                >
                  {src ? "Trocar imagem" : "Adicionar imagem"}
                </button>
              </div>
            );
          })}
        </section>


        <p className="mt-10 text-xs text-muted-foreground">
          As alterações são salvas automaticamente neste navegador.
        </p>
      </article>

      <SiteFooter />
    </div>
  );
}
