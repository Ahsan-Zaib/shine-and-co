import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { FinalCta, Faq, HowItWorks, Plans, RatingBadge, Reviews, SectionHead, ServiceCards, WhyUs } from "@/components/site/Sections";
import { IMAGES } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shine & Co. — Professional Home & Office Cleaning" },
      { name: "description", content: "Trusted home, office and move cleaning with transparent pricing. Book online in minutes and save with recurring plans." },
      { property: "og:title", content: "Shine & Co. — A Cleaner Space. A Better Life." },
      { property: "og:description", content: "Professional cleaning for homes, offices and moves. Rated 4.9/5 by 500+ customers." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero-mesh">
        <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-mint blur-3xl animate-blob [animation-delay:-6s]" />
        <div className="container-x relative grid items-center gap-12 pt-12 pb-20 lg:grid-cols-2 lg:pt-20">
          <div className="animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />Home · Office · Move cleaning
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] md:text-7xl">A Cleaner Space.<br /><em className="text-gradient">A Better Life.</em></h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">Professional cleaning services for homes, offices, moves, and everything in between.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl" className="transition-transform hover:-translate-y-0.5"><Link to="/book">Book a Cleaning</Link></Button>
              <Button asChild variant="soft" size="xl" className="transition-transform hover:-translate-y-0.5"><Link to="/quote">Get a Free Quote</Link></Button>
            </div>
            <div className="mt-8"><RatingBadge /></div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[["500+", "Happy clients"], ["4.9★", "Avg rating"], ["100%", "Guaranteed"]].map(([n, l]) => (
                <div key={l} className="rounded-2xl border border-border/70 bg-card/70 p-3 text-center backdrop-blur">
                  <p className="font-display text-2xl font-semibold">{n}</p>
                  <p className="text-xs text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-rise [animation-delay:150ms]">
            <div className="rounded-[2rem] bg-card/60 p-3 shadow-lift backdrop-blur">
              <BeforeAfter before={IMAGES.beforeLiving} after={IMAGES.afterLiving} alt="Living room" />
            </div>
            <div className="absolute -left-4 top-8 hidden animate-float rounded-2xl border border-border bg-card px-4 py-3 shadow-lift sm:block">
              <p className="text-xs text-muted-foreground">Next available</p>
              <p className="font-semibold">Tomorrow, 9:00 AM</p>
            </div>
            <div className="absolute -right-3 bottom-12 hidden animate-float rounded-2xl border border-border bg-card px-4 py-3 shadow-lift [animation-delay:-3s] sm:block">
              <p className="text-xs text-muted-foreground">Eco-friendly products</p>
              <p className="font-semibold text-accent">Safe for kids & pets</p>
            </div>
            <p className="mt-3 text-center text-sm text-muted-foreground">Drag to see the difference</p>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-lg">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Regular Cleaning", "Deep Cleaning", "Office Cleaning", "Move-In / Move-Out", "After-Party Cleanup", "Background-checked staff", "Satisfaction guaranteed"].map((t) => (
              <span key={`${k}-${t}`} className="flex items-center gap-12">{t}<span className="text-accent">✦</span></span>
            )),
          )}
        </div>
      </div>

      <section className="container-x py-16">
        <SectionHead eyebrow="Our services" title="Every kind of clean, done right" />
        <div className="mt-12"><ServiceCards /></div>
      </section>

      <section className="bg-mint/40 py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <BeforeAfter before={IMAGES.beforeBath} after={IMAGES.afterBath} alt="Bathroom" />
          <div>
            <SectionHead center={false} eyebrow="Real results" title="See the difference for yourself" sub="Grime, soap scum and clutter — gone. Drag the slider to compare." />
            <Button asChild variant="hero" size="lg" className="mt-8"><Link to="/before-after">View more results</Link></Button>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow="Why choose us" title="Trust is our first service" />
        <div className="mt-12"><WhyUs /></div>
      </section>

      <section className="container-x py-16">
        <SectionHead eyebrow="How it works" title="Spotless in four simple steps" />
        <div className="mt-12"><HowItWorks /></div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow="Reviews" title="Loved by 500+ customers" />
        <div className="mt-12"><Reviews limit={3} /></div>
      </section>

      <section className="container-x py-16">
        <SectionHead eyebrow="Recurring plans" title="Clean home, every week" sub="Save up to 20% on every visit with a recurring plan." />
        <div className="mt-14"><Plans /></div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-10"><Faq /></div>
      </section>

      <FinalCta />
    </>
  );
}
