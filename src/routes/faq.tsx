import { createFileRoute } from "@tanstack/react-router";
import { Faq, FinalCta, PageHero } from "@/components/site/Sections";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Cleaning FAQ — Shine & Co." },
      { name: "description", content: "Answers about pricing, products, rescheduling, recurring plans, office and move-out cleaning." },
      { property: "og:title", content: "FAQ — Shine & Co." },
      { property: "og:description", content: "Everything you need to know before booking." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" sub="Can't find your answer? Message us on WhatsApp." />
      <section className="container-x py-16"><Faq /></section>
      <FinalCta />
    </>
  ),
});
