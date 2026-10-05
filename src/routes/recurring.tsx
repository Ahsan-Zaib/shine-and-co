import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, PageHero, Plans } from "@/components/site/Sections";

export const Route = createFileRoute("/recurring")({
  head: () => ({
    meta: [
      { title: "Recurring Cleaning Plans — Shine & Co." },
      { name: "description", content: "Weekly, every-two-weeks and monthly cleaning plans. Save up to 20% on every visit." },
      { property: "og:title", content: "Recurring Cleaning Plans — Shine & Co." },
      { property: "og:description", content: "Come home to a clean space every week." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Recurring cleaning" title="Come home to clean, every time" sub="Same trusted team, priority scheduling and savings on every visit." />
      <section className="container-x py-20"><Plans /></section>
      <FinalCta />
    </>
  ),
});
