import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { BookingForm } from "@/components/site/BookingForm";
import { PageHero } from "@/components/site/Sections";

const search = z.object({
  frequency: z.enum(["weekly", "biweekly", "monthly", "one-time"]).optional(),
  service: z.string().optional(),
});

export const Route = createFileRoute("/book")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Book a Cleaning Online — Shine & Co." },
      { name: "description", content: "Choose your service, date and time and book your cleaning online in minutes." },
      { property: "og:title", content: "Book a Cleaning — Shine & Co." },
      { property: "og:description", content: "Online booking in under two minutes." },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const { frequency, service } = Route.useSearch();
  return (
    <>
      <PageHero eyebrow="Online booking" title="Book your cleaning" sub="Pick a service, date and time. We'll confirm shortly." />
      <div className="container-x py-16"><BookingForm mode="booking" initialFrequency={frequency} initialService={service} /></div>
    </>
  );
}
