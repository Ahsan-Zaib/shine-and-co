import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Mail, MessageCircle, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS, whatsappLink } from "@/lib/site";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/before-after", label: "Before & After" },
  { to: "/recurring", label: "Plans" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-foreground"><Sparkles className="h-5 w-5" /></span>
      {BUSINESS.name}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="container-x flex h-18 items-center justify-between py-3">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm"><Link to="/quote">Free Quote</Link></Button>
          <Button asChild variant="hero"><Link to="/book">Book Now</Link></Button>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 font-medium hover:bg-muted">{n.label}</Link>
            ))}
            <Link to="/quote" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 font-medium hover:bg-muted">Get a Free Quote</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-2xl">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-foreground"><Sparkles className="h-5 w-5" /></span>
            {BUSINESS.name}
          </div>
          <p className="mt-4 max-w-sm text-primary-foreground/70">A cleaner space. A better life. Trusted home & office cleaning with transparent pricing.</p>
          <div className="mt-4 flex items-center gap-1 text-star">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            <span className="ml-2 text-sm text-primary-foreground/80">{BUSINESS.rating}/5 from {BUSINESS.reviewCount}+ customers</span>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">Explore</p>
          {NAV.map((n) => <Link key={n.to} to={n.to} className="block text-primary-foreground/70 hover:text-primary-foreground">{n.label}</Link>)}
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold">Get in touch</p>
          <a href={BUSINESS.phoneHref} className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground"><Phone className="h-4 w-4" />{BUSINESS.phoneDisplay}</a>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground"><MessageCircle className="h-4 w-4" />WhatsApp</a>
          <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground"><Mail className="h-4 w-4" />{BUSINESS.email}</a>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-6 text-center text-xs text-primary-foreground/50">© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</div>
    </footer>
  );
}

export function FloatingActions() {
  return (
    <>
      <a
        href={whatsappLink()} target="_blank" rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 font-semibold text-accent-foreground shadow-lift transition-transform hover:-translate-y-1"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" /><span className="hidden sm:inline">Chat with us</span>
      </a>
      <Link to="/book" className="fixed bottom-5 left-5 z-50 rounded-full bg-accent px-5 py-3 font-semibold text-accent-foreground shadow-glow lg:hidden">Book Now</Link>
    </>
  );
}
