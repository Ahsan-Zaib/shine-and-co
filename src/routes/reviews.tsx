import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FinalCta, PageHero, RatingBadge, Reviews } from "@/components/site/Sections";
import { whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — Shine & Co." },
      { name: "description", content: "Rated 4.9/5 by 500+ customers. Read what people say about our cleaning." },
      { property: "og:title", content: "Customer Reviews — Shine & Co." },
      { property: "og:description", content: "4.9/5 from 500+ happy customers." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Reviews" title="What our customers say" sub="Real words from real homes and offices." />
      <section className="container-x py-16">
        <div className="mb-10 flex flex-col items-center gap-4">
          <RatingBadge />
          <Button asChild variant="soft"><a href={whatsappLink("Hi, I'd like to leave a review for Shine & Co.")} target="_blank" rel="noreferrer">Leave a Review</a></Button>
        </div>
        <Reviews />
      </section>
      <FinalCta />
    </>
  ),
});
