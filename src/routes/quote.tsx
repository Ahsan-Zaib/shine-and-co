import { createFileRoute } from "@tanstack/react-router";
import { BookingForm } from "@/components/site/BookingForm";
import { PageHero } from "@/components/site/Sections";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Free Cleaning Quote — Shine & Co." },
      { name: "description", content: "Get an instant cleaning price estimate based on your home size, service and add-ons." },
      { property: "og:title", content: "Free Cleaning Quote — Shine & Co." },
      { property: "og:description", content: "See your estimated price in seconds." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Pricing" title="Get your free quote" sub="Tell us about your space and see an instant estimate." />
      <div className="container-x py-16"><BookingForm mode="quote" /></div>
    </>
  ),
});
