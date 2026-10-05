import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, Mail, MessageCircle, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/site/Sections";
import { supabase } from "@/integrations/supabase/client";
import { BUSINESS, SERVICES, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Shine & Co." },
      { name: "description", content: "Call, WhatsApp or email us, or send a request and we'll get back to you quickly." },
      { property: "og:title", content: "Contact Shine & Co." },
      { property: "og:description", content: "Get in touch about a cleaning." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().max(30),
  email: z.string().trim().email("Enter a valid email").max(255),
  service: z.string().max(60),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const p = schema.safeParse(form);
    if (!p.success) { setErrors(Object.fromEntries(p.error.issues.map((i) => [i.path[0], i.message]))); return; }
    setErrors({}); setSending(true);
    const { error } = await supabase.from("contact_submissions").insert({ ...p.data, phone: p.data.phone || null, service: p.data.service || null });
    setSending(false);
    if (error) { toast.error("Couldn't send. Please try again or WhatsApp us."); return; }
    setDone(true);
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's make your space shine" sub="Send us a message and we'll get back to you quickly." />
      <section className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          {done ? (
            <div className="py-10 text-center"><CheckCircle2 className="mx-auto h-12 w-12 text-accent" /><h2 className="mt-4 text-3xl font-semibold">Request sent!</h2><p className="mt-2 text-muted-foreground">We'll be in touch soon.</p></div>
          ) : (
            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
              {(["name", "phone", "email"] as const).map((k) => (
                <div key={k} className={k === "email" ? "sm:col-span-2" : ""}><Label className="capitalize">{k}</Label>
                  <Input className="mt-2 h-12 rounded-xl" value={form[k]} onChange={set(k)} type={k === "email" ? "email" : "text"} maxLength={255} />
                  {errors[k] && <p className="mt-1 text-sm text-destructive">{errors[k]}</p>}</div>
              ))}
              <div className="sm:col-span-2"><Label>Service</Label>
                <select className="mt-2 h-12 w-full rounded-xl border border-input bg-card px-3" value={form.service} onChange={set("service")}>
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => <option key={s.slug}>{s.name}</option>)}
                </select></div>
              <div className="sm:col-span-2"><Label>Message</Label>
                <Textarea className="mt-2 rounded-xl" rows={5} maxLength={1000} value={form.message} onChange={set("message")} />
                {errors["message"] && <p className="mt-1 text-sm text-destructive">{errors["message"]}</p>}</div>
              <Button type="submit" variant="hero" size="xl" className="sm:col-span-2" disabled={sending}>{sending ? "Sending…" : "Send Request"}</Button>
            </form>
          )}
        </div>
        <aside className="space-y-4">
          <a href={BUSINESS.phoneHref} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft"><Phone className="text-accent" /><div><p className="font-semibold">Phone</p><p className="text-sm text-muted-foreground">{BUSINESS.phoneDisplay}</p></div></a>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft"><MessageCircle className="text-whatsapp" /><div><p className="font-semibold">WhatsApp</p><p className="text-sm text-muted-foreground">Chat with us instantly</p></div></a>
          <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft"><Mail className="text-accent" /><div><p className="font-semibold">Email</p><p className="text-sm text-muted-foreground">{BUSINESS.email}</p></div></a>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="flex items-center gap-2 font-semibold"><Clock className="h-5 w-5 text-accent" />Business hours</p>
            {BUSINESS.hours.map(([d, h]) => <p key={d} className="mt-2 flex justify-between text-sm"><span>{d}</span><span className="text-muted-foreground">{h}</span></p>)}
          </div>
          <iframe title="Map" className="h-56 w-full rounded-2xl border border-border" loading="lazy" src="https://www.google.com/maps?q=United+States&output=embed" />
        </aside>
      </section>
    </>
  );
}
