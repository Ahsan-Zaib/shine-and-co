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
      <section className="container-x grid items-center gap-12 pt-12 pb-20 lg:grid-cols-2 lg:pt-20">
        <div className="animate-rise">
          <p className="eyebrow">Home · Office · Move cleaning</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[1.05] md:text-7xl">A Cleaner Space.<br /><em className="text-accent">A Better Life.</em></h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">Professional cleaning services for homes, offices, moves, and everything in between.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl"><Link to="/book">Book a Cleaning</Link></Button>
            <Button asChild variant="soft" size="xl"><Link to="/quote">Get a Free Quote</Link></Button>
          </div>
          <div className="mt-8"><RatingBadge /></div>
        </div>
        <div className="animate-rise [animation-delay:150ms]">
          <BeforeAfter before={IMAGES.beforeLiving} after={IMAGES.afterLiving} alt="Living room" />
          <p className="mt-3 text-center text-sm text-muted-foreground">Drag to see the difference</p>
        </div>
      </section>

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
