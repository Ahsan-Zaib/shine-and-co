import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Repeat } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { ADDONS, PLANS, SERVICES, estimatePrice, whatsappLink, type Frequency } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(5, "Enter a valid phone").max(30),
  address: z.string().trim().max(300).optional(),
  notes: z.string().trim().max(1000).optional(),
});

const TIMES = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];
const field = "h-12 w-full rounded-xl border border-input bg-card px-3";

export function BookingForm({ mode, initialFrequency, initialService }: { mode: "booking" | "quote"; initialFrequency?: Frequency | undefined; initialService?: string | undefined }) {
  const [service, setService] = useState(initialService ?? "regular");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [frequency, setFrequency] = useState<Frequency>(initialFrequency ?? "biweekly");
  const [addons, setAddons] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState<string>("10:00 AM");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const price = estimatePrice({ service, bedrooms, bathrooms, frequency, addons });
  const oneTime = estimatePrice({ service, bedrooms, bathrooms, frequency: "one-time", addons });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    if (mode === "booking" && !date) { setErrors({ date: "Pick a date" }); return; }
    setErrors({});
    setSubmitting(true);
    const { error } = await supabase.from("booking_requests").insert({
      request_type: mode, service, property_type: propertyType, bedrooms, bathrooms, frequency, addons,
      preferred_date: date || null, preferred_time: time, estimated_price: price,
      name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone,
      address: parsed.data.address || null, notes: parsed.data.notes || null,
    });
    setSubmitting(false);
    if (error) { toast.error("Something went wrong. Please try again or message us on WhatsApp."); return; }
    setDone(true);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-10 text-center shadow-lift">
        <CheckCircle2 className="mx-auto h-14 w-14 text-accent" />
        <h2 className="mt-4 text-3xl font-semibold">{mode === "booking" ? "Booking received!" : "Quote request received!"}</h2>
        <p className="mt-3 text-muted-foreground">We'll confirm with you shortly. Want a faster reply? Message us on WhatsApp.</p>
        {frequency === "one-time" && (
          <div className="mt-6 rounded-2xl bg-mint p-5 text-left">
            <p className="flex items-center gap-2 font-semibold"><Repeat className="h-4 w-4 text-accent" />Make it recurring and save up to 20%</p>
            <p className="mt-1 text-sm text-muted-foreground">Come home to a clean space every week. Mention it on WhatsApp and we'll switch you over.</p>
          </div>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild variant="hero"><a href={whatsappLink(`Hi, I just sent a ${mode} request for ${SERVICES.find((s) => s.slug === service)?.name}.`)} target="_blank" rel="noreferrer">Continue on WhatsApp</a></Button>
          <Button asChild variant="soft"><Link to="/">Back home</Link></Button>
        </div>
      </div>
    );
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-8 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
        <div>
          <Label className="text-base font-bold">1. Service</Label>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {SERVICES.map((s) => (
              <button type="button" key={s.slug} onClick={() => setService(s.slug)} className={`rounded-xl border p-3 text-left text-sm transition-colors ${service === s.slug ? "border-accent bg-mint" : "border-border hover:border-accent"}`}>
                <span className="font-semibold">{s.name}</span><br /><span className="text-muted-foreground">from ${s.price}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-mint/60 p-5">
          <Label className="text-base font-bold">Want to come home to a clean space every week?</Label>
          <p className="text-sm text-muted-foreground">Save time and keep your home consistently clean with a recurring plan.</p>
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
            {PLANS.map((p) => (
              <button type="button" key={p.id} onClick={() => setFrequency(p.id)} className={`rounded-xl border p-3 text-left text-sm ${frequency === p.id ? "border-accent bg-card shadow-soft" : "border-border bg-card/50"}`}>
                <span className="font-semibold">{p.name}</span><br />
                <span className="text-xs text-accent">{p.discount ? `Save ${p.discount}%` : p.tag}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div><Label>Property type</Label>
            <select className={`${field} mt-2`} value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
              {["Apartment", "House", "Townhouse", "Office"].map((o) => <option key={o}>{o}</option>)}
            </select></div>
          <div><Label>Bedrooms / rooms</Label>
            <select className={`${field} mt-2`} value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))}>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
            </select></div>
          <div><Label>Bathrooms</Label>
            <select className={`${field} mt-2`} value={bathrooms} onChange={(e) => setBathrooms(Number(e.target.value))}>
              {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
            </select></div>
        </div>

        <div>
          <Label className="text-base font-bold">Add-ons</Label>
          <div className="mt-3 flex flex-wrap gap-2">
            {ADDONS.map((a) => {
              const on = addons.includes(a.id);
              return <button type="button" key={a.id} onClick={() => setAddons(on ? addons.filter((x) => x !== a.id) : [...addons, a.id])} className={`rounded-full border px-4 py-2 text-sm ${on ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-accent"}`}>{a.name} +${a.price}</button>;
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div><Label>Preferred date{mode === "booking" && " *"}</Label>
            <input type="date" className={`${field} mt-2`} value={date} onChange={(e) => setDate(e.target.value)} />
            {errors["date"] && <p className="mt-1 text-sm text-destructive">{errors["date"]}</p>}</div>
          <div><Label>Preferred time</Label>
            <select className={`${field} mt-2`} value={time} onChange={(e) => setTime(e.target.value)}>
              {TIMES.map((t) => <option key={t}>{t}</option>)}
            </select></div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {(["name", "email", "phone", "address"] as const).map((k) => (
            <div key={k}><Label className="capitalize">{k}{k !== "address" && " *"}</Label>
              <Input className="mt-2 h-12 rounded-xl" value={form[k]} onChange={set(k)} type={k === "email" ? "email" : "text"} maxLength={k === "address" ? 300 : 255} />
              {errors[k] && <p className="mt-1 text-sm text-destructive">{errors[k]}</p>}</div>
          ))}
          <div className="sm:col-span-2"><Label>Special instructions</Label>
            <Textarea className="mt-2 rounded-xl" rows={3} maxLength={1000} value={form.notes} onChange={set("notes")} placeholder="Pets, access codes, focus areas…" /></div>
        </div>
      </div>

      <aside className="h-fit rounded-3xl bg-primary p-7 text-primary-foreground shadow-lift lg:sticky lg:top-24">
        <p className="eyebrow">Estimated price</p>
        <p className="mt-2 font-display text-5xl font-semibold">${price}</p>
        <p className="text-sm text-primary-foreground/70">per visit · {PLANS.find((p) => p.id === frequency)?.name}</p>
        {frequency !== "one-time" && <p className="mt-2 text-sm text-accent">You save ${oneTime - price} every visit</p>}
        <p className="mt-4 text-xs text-primary-foreground/60">Final price confirmed after we review your details.</p>
        <Button type="submit" variant="hero" size="xl" className="mt-6 w-full" disabled={submitting}>
          {submitting ? "Sending…" : mode === "booking" ? "Confirm Booking" : "Request My Quote"}
        </Button>
      </aside>
    </form>
  );
}
