import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { FinalCta, PageHero } from "@/components/site/Sections";
import { SERVICES } from "@/lib/site";

export const Route = createFileRoute("/before-after")({
  head: () => ({
    meta: [
      { title: "Before & After Cleaning Results — Shine & Co." },
      { name: "description", content: "Drag to compare real before and after results from our home, office and move cleaning." },
      { property: "og:title", content: "Before & After — Shine & Co." },
      { property: "og:description", content: "See the difference a professional clean makes." },
    ],
  }),
  component: Page,
});

function Page() {
  const [active, setActive] = useState<string>("regular");
  const s = SERVICES.find((x) => x.slug === active)!;
  return (
    <>
      <PageHero eyebrow="Before & After" title="The proof is in the shine" sub="Drag left and right to compare. Choose a service to see more." />
      <section className="container-x py-16">
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {SERVICES.map((x) => (
            <button key={x.slug} onClick={() => setActive(x.slug)} className={`rounded-full border px-4 py-2 text-sm font-medium ${active === x.slug ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card hover:border-accent"}`}>{x.name}</button>
          ))}
        </div>
        <div className="mx-auto max-w-5xl"><BeforeAfter key={s.slug} before={s.before} after={s.after} alt={s.name} /></div>
      </section>
      <FinalCta />
    </>
  );
}
