import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { FinalCta, PageHero } from "@/components/site/Sections";
import { SERVICES } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Cleaning Services & Prices — Shine & Co." },
      { name: "description", content: "Regular, deep, office, after-party, move-in and move-out cleaning. See what's included and starting prices." },
      { property: "og:title", content: "Cleaning Services — Shine & Co." },
      { property: "og:description", content: "Six professional cleaning services with transparent starting prices." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Cleaning for every space and moment" sub="Transparent starting prices. Professional results. Book in minutes." />
      <div className="container-x space-y-24 py-20">
        {SERVICES.map((s, i) => (
          <section key={s.slug} id={s.slug} className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-2">
            <div className={i % 2 ? "lg:order-2" : ""}><BeforeAfter before={s.before} after={s.after} alt={s.name} /></div>
            <div>
              <p className="eyebrow">From ${s.price}</p>
              <h2 className="mt-2 text-4xl font-semibold">{s.name}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{s.description}</p>
              <ul className="mt-6 space-y-2">
                {s.included.map((x) => <li key={x} className="flex gap-2"><Check className="mt-0.5 h-5 w-5 text-accent" />{x}</li>)}
              </ul>
              <Button asChild variant="hero" size="lg" className="mt-8"><Link to="/book" search={{ service: s.slug }}>Book This Service</Link></Button>
            </div>
          </section>
        ))}
      </div>
      <FinalCta />
    </>
  );
}
