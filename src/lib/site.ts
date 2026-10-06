import afterLiving from "@/assets/after-living.jpg";
import beforeLiving from "@/assets/before-living.jpg";
import afterBath from "@/assets/after-bath.jpg";
import beforeBath from "@/assets/before-bath.jpg";
import office from "@/assets/office.jpg";
import beforeOffice from "@/assets/before-office.jpg";
import cleaner from "@/assets/cleaner-kitchen.jpg";

export const BUSINESS = {
  name: "Shine & Co.",
  phoneDisplay: "0305 598 8880",
  phoneHref: "tel:03055988880",
  whatsapp: "923055988880",
  email: "hello@shineandco.com",
  hours: [
    ["Mon – Fri", "8:00 AM – 7:00 PM"],
    ["Saturday", "9:00 AM – 5:00 PM"],
    ["Sunday", "Closed"],
  ],
  rating: 4.9,
  reviewCount: 500,
};

export const whatsappLink = (msg = "Hi, I'd like to get a quote for cleaning service.") =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`;

export const IMAGES = { afterLiving, beforeLiving, afterBath, beforeBath, office, beforeOffice, cleaner };

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  included: string[];
  price: number;
  before: string;
  after: string;
};

export const SERVICES: Service[] = [
  {
    slug: "regular",
    name: "Regular Cleaning",
    short: "Weekly upkeep that keeps your home effortlessly fresh.",
    description: "Our core service. A consistent, thorough clean of every lived-in room so you come home to calm, not chores.",
    included: ["Dusting all reachable surfaces", "Vacuum & mop all floors", "Kitchen counters, sink & appliance exteriors", "Bathrooms scrubbed & sanitized", "Beds made, trash emptied"],
    price: 99,
    before: beforeLiving,
    after: afterLiving,
  },
  {
    slug: "deep",
    name: "Deep Cleaning",
    short: "Top-to-bottom reset for built-up grime.",
    description: "Everything in a regular clean plus the corners, baseboards and buildup that daily life leaves behind.",
    included: ["Everything in Regular Cleaning", "Baseboards, doors & trim", "Inside microwave", "Grout & limescale treatment", "Light fixtures & vents"],
    price: 189,
    before: beforeBath,
    after: afterBath,
  },
  {
    slug: "office",
    name: "Office Cleaning",
    short: "A spotless workspace your team will notice.",
    description: "Flexible after-hours cleaning for offices and studios, tailored to your floor plan and schedule.",
    included: ["Desks & shared surfaces sanitized", "Kitchenette & break room", "Restrooms restocked", "Floors vacuumed & mopped", "Trash & recycling"],
    price: 149,
    before: beforeOffice,
    after: office,
  },
  {
    slug: "after-party",
    name: "After-Party Cleaning",
    short: "Wake up to a home that looks like nothing happened.",
    description: "We handle the cups, crumbs and sticky floors so you can enjoy the memories, not the mess.",
    included: ["Trash & bottle removal", "Spill & stain treatment", "Kitchen & dishes reset", "Floors deep mopped", "Bathrooms refreshed"],
    price: 159,
    before: beforeLiving,
    after: afterLiving,
  },
  {
    slug: "move-in",
    name: "Move-In Cleaning",
    short: "Start fresh in a truly clean new home.",
    description: "A sanitizing clean of every surface, cabinet and closet before your boxes arrive.",
    included: ["Inside cabinets & drawers", "Closets & shelving", "Appliances inside & out", "Bathrooms disinfected", "Windows sills & tracks"],
    price: 229,
    before: beforeBath,
    after: afterBath,
  },
  {
    slug: "move-out",
    name: "Move-Out Cleaning",
    short: "Leave it spotless and get your deposit back.",
    description: "A landlord-ready clean designed around typical inspection checklists.",
    included: ["Everything in Move-In Cleaning", "Wall spot cleaning", "Oven & fridge interior", "Garage sweep (on request)", "Final walkthrough"],
    price: 249,
    before: beforeLiving,
    after: afterLiving,
  },
];

export const PLANS = [
  { id: "weekly", name: "Weekly", tag: "Best for busy homes", discount: 20 },
  { id: "biweekly", name: "Every 2 Weeks", tag: "Most popular", discount: 15, popular: true },
  { id: "monthly", name: "Monthly", tag: "Regular maintenance", discount: 10 },
  { id: "one-time", name: "One-Time", tag: "Perfect for special occasions", discount: 0 },
] as const;

export type Frequency = (typeof PLANS)[number]["id"];

export const ADDONS = [
  { id: "oven", name: "Inside oven", price: 35 },
  { id: "fridge", name: "Inside fridge", price: 30 },
  { id: "windows", name: "Interior windows", price: 40 },
  { id: "laundry", name: "Laundry & folding", price: 25 },
  { id: "cabinets", name: "Inside cabinets", price: 35 },
];

export function estimatePrice(opts: { service: string; bedrooms: number; bathrooms: number; frequency: Frequency; addons: string[] }) {
  const svc = SERVICES.find((s) => s.slug === opts.service);
  if (!svc) return 0;
  const base = svc.price + Math.max(0, opts.bedrooms - 1) * 20 + Math.max(0, opts.bathrooms - 1) * 15;
  const addons = ADDONS.filter((a) => opts.addons.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const plan = PLANS.find((p) => p.id === opts.frequency)!;
  return Math.round((base + addons) * (1 - plan.discount / 100));
}

export const REVIEWS = [
  { name: "Jessica M.", text: "They've cleaned our home every two weeks for a year. Always on time, always spotless. I genuinely look forward to Fridays now.", service: "Regular Cleaning" },
  { name: "David R.", text: "Got my full deposit back after the move-out clean. The landlord actually asked who we used.", service: "Move-Out Cleaning" },
  { name: "Priya S.", text: "Booking took two minutes and the deep clean was unbelievable. Grout I thought was grey is white again.", service: "Deep Cleaning" },
  { name: "Tom & Ana", text: "Our office has never looked this good. The team is quiet, careful and thorough.", service: "Office Cleaning" },
  { name: "Marcus L.", text: "After our housewarming the place was a disaster. By noon it looked brand new. Lifesavers.", service: "After-Party Cleaning" },
  { name: "Elena K.", text: "Transparent price, friendly cleaners, and they remember how I like things. Switched to weekly.", service: "Regular Cleaning" },
];

export const FAQS: [string, string][] = [
  ["What does regular cleaning include?", "Dusting, vacuuming and mopping all floors, kitchen counters and appliance exteriors, full bathroom cleaning, making beds and emptying trash."],
  ["Do you bring cleaning products?", "Yes. Our team arrives with professional equipment and eco-friendly products. If you prefer we use your own, just let us know."],
  ["How much does cleaning cost?", "Regular cleaning starts from $99. Your exact price depends on home size, service and add-ons — use our instant quote tool for an estimate."],
  ["Can I cancel or reschedule?", "Yes. Contact us by phone or WhatsApp to change your appointment."],
  ["Do you offer recurring cleaning?", "Absolutely — weekly, every two weeks or monthly plans, each with a discount on every visit."],
  ["How long does cleaning take?", "A regular clean of a 2-bedroom home usually takes 2–3 hours. Deep and move cleans take longer."],
  ["Do you clean offices?", "Yes, we offer flexible office cleaning, including after-hours and weekend slots."],
  ["Do you provide move-out cleaning?", "Yes — our move-out clean is designed to help you pass inspection and get your deposit back."],
];
