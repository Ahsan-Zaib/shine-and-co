import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, PageHero, SectionHead, WhyUs } from "@/components/site/Sections";
import { IMAGES } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Shine & Co." },
      { name: "description", content: "Our story, mission and values. A trusted cleaning team built on reliability and care." },
      { property: "og:title", content: "About Shine & Co." },
      { property: "og:description", content: "The people and values behind every spotless space." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="About us" title="Clean spaces, calmer lives" sub="We started Shine & Co. to give people their time back." />
      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <img src={IMAGES.cleaner} alt="Shine & Co. cleaner at work" loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-lift" />
        <div className="space-y-6">
          <SectionHead center={false} eyebrow="Our story" title="Built on trust, one home at a time" />
          <p className="text-lg text-muted-foreground">What began as a small team with a simple promise — show up on time and leave every space better than we found it — has grown into a crew trusted by hundreds of families and businesses.</p>
          <div><h3 className="text-2xl font-semibold">Our mission</h3><p className="mt-2 text-muted-foreground">To make a consistently clean home effortless, affordable and stress-free.</p></div>
          <div><h3 className="text-2xl font-semibold">Our team</h3><p className="mt-2 text-muted-foreground">Every cleaner is background-checked, trained in our standards and equipped with professional tools.</p></div>
        </div>
      </section>
      <section className="container-x py-10">
        <SectionHead eyebrow="Our values" title="What we stand for" />
        <div className="mt-12"><WhyUs /></div>
      </section>
      <FinalCta />
    </>
  ),
});
