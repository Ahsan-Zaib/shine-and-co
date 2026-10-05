import { Link } from "@tanstack/react-router";
import { Star, Check, ShieldCheck, Clock, UserCheck, BadgeDollarSign, Award, Sparkles, CalendarCheck, Smile, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BUSINESS, FAQS, PLANS, REVIEWS, SERVICES } from "@/lib/site";

export function SectionHead({ eyebrow, title, sub, center = true }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-semibold md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <section className="bg-mint/50">
      <div className="container-x py-20 text-center animate-rise">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-5xl font-semibold md:text-6xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">{sub}</p>
      </div>
    </section>
  );
}

export function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return <span className="flex text-star">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`${className} fill-current`} />)}</span>;
}

export function RatingBadge() {
  return (
    <div className="flex items-center gap-3">
      <Stars />
      <span className="text-sm font-semibold">{BUSINESS.rating}/5</span>
      <span className="text-sm text-muted-foreground">from {BUSINESS.reviewCount}+ happy customers</span>
    </div>
  );
}

export function ServiceCards({ limit }: { limit?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.slice(0, limit).map((s) => (
        <Link key={s.slug} to="/services" hash={s.slug} className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
          <div className="aspect-[16/10] overflow-hidden"><img src={s.after} alt={s.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
          <div className="p-6">
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold">{s.name}</h3>
              <span className="text-sm text-muted-foreground">from <b className="text-foreground">${s.price}</b></span>
            </div>
            <p className="mt-2 text-muted-foreground">{s.short}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </div>
        </Link>
      ))}
    </div>
  );
}

const WHY = [
  { icon: Award, t: "Experienced cleaners", d: "Years of hands-on experience in homes and offices." },
  { icon: Clock, t: "Reliable & punctual", d: "We arrive on time, every time." },
  { icon: UserCheck, t: "Background-checked staff", d: "Every cleaner is vetted and trained." },
  { icon: BadgeDollarSign, t: "Transparent pricing", d: "Clear quotes, no hidden fees." },
  { icon: ShieldCheck, t: "Quality guarantee", d: "Not happy? We'll come back and fix it." },
  { icon: Sparkles, t: "Professional equipment", d: "Commercial-grade tools and eco products." },
  { icon: CalendarCheck, t: "Easy online booking", d: "Book in under two minutes." },
  { icon: Smile, t: "Satisfaction guarantee", d: "Your happiness is the measure of our work." },
];

export function WhyUs() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {WHY.map(({ icon: I, t, d }) => (
        <div key={t} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-mint text-accent"><I className="h-5 w-5" /></span>
          <h3 className="mt-4 font-sans text-lg font-bold tracking-normal">{t}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{d}</p>
        </div>
      ))}
    </div>
  );
}

export function HowItWorks() {
  const steps = [
    ["Choose your service", "Pick from regular, deep, office or move cleaning."],
    ["Get an instant quote", "Tell us about your space and see your price."],
    ["Pick a date & time", "Book online in minutes, confirm on WhatsApp."],
    ["Relax, it's handled", "Come home to a spotless space."],
  ];
  return (
    <div className="grid gap-6 md:grid-cols-4">
      {steps.map(([t, d], i) => (
        <div key={t} className="relative">
          <span className="font-display text-6xl font-semibold text-accent/25">0{i + 1}</span>
          <h3 className="mt-2 font-sans text-lg font-bold tracking-normal">{t}</h3>
          <p className="mt-1 text-muted-foreground">{d}</p>
        </div>
      ))}
    </div>
  );
}

export function Reviews({ limit }: { limit?: number }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {REVIEWS.slice(0, limit).map((r) => (
        <figure key={r.name} className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
          <Stars />
          <blockquote className="mt-4 flex-1 text-lg leading-relaxed">“{r.text}”</blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-mint font-bold text-accent">{r.name[0]}</span>
            <div><p className="font-semibold">{r.name}</p><p className="text-xs text-muted-foreground">{r.service}</p></div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function Plans() {
  return (
    <div className="grid gap-5 md:grid-cols-4">
      {PLANS.map((p) => (
        <div key={p.id} className={`relative rounded-3xl border p-7 shadow-soft ${"popular" in p && p.popular ? "border-accent bg-primary text-primary-foreground shadow-lift md:-translate-y-3" : "border-border bg-card"}`}>
          {"popular" in p && p.popular && <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">Most popular</span>}
          <h3 className="text-2xl font-semibold">{p.name}</h3>
          <p className={`mt-1 text-sm ${"popular" in p && p.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.tag}</p>
          <p className="mt-6 font-display text-4xl font-semibold">{p.discount ? `${p.discount}% off` : "Standard"}</p>
          <p className={`text-sm ${"popular" in p && p.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.discount ? "every visit" : "single visit"}</p>
          <ul className="mt-6 space-y-2 text-sm">
            {["Same trusted cleaner", "Priority scheduling", p.discount ? "Skip or pause anytime" : "No commitment"].map((f) => (
              <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-accent" />{f}</li>
            ))}
          </ul>
          <Button asChild variant={"popular" in p && p.popular ? "hero" : "soft"} className="mt-7 w-full">
            <Link to="/book" search={{ frequency: p.id }}>Choose {p.name}</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}

export function Faq() {
  return (
    <Accordion type="single" collapsible className="mx-auto max-w-3xl">
      {FAQS.map(([q, a]) => (
        <AccordionItem key={q} value={q}>
          <AccordionTrigger className="text-left text-lg font-semibold">{q}</AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function FinalCta() {
  return (
    <section className="container-x mt-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-8 py-16 text-center text-primary-foreground md:px-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        <h2 className="relative text-4xl font-semibold md:text-5xl">Come home to clean, every week.</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-primary-foreground/70">Save up to 20% with a recurring plan. Skip or pause any time.</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="hero" size="xl"><Link to="/book">Book a Cleaning</Link></Button>
          <Button asChild variant="soft" size="xl"><Link to="/quote">Get a Free Quote</Link></Button>
        </div>
      </div>
    </section>
  );
}
