import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { animate, inView, scroll } from "framer-motion";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, Footer, FloatingActions } from "@/components/site/Layout";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Shine & Co. — Professional Cleaning" },
      { name: "description", content: "Trusted home and office cleaning with online booking." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Manrope:wght@400;500;600;700&display=swap" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function useScrollReveal(key: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const tilt = mobile ? 8 : 14;
    const lift = mobile ? 28 : 44;
    const stops: Array<() => void> = [];
    const seen = new Set<Element>();
    const below = (el: Element) => el.getBoundingClientRect().top >= window.innerHeight * 0.95;
    const sel = "main section:not(:first-child) :is(h1,h2,h3,p,img,a.inline-flex,button), main section:not(:first-child) .grid > *, main [data-reveal]";
    const els = Array.from(document.querySelectorAll<HTMLElement>(sel)).filter((el) => {
      if (seen.has(el) || !below(el)) return false;
      // skip elements nested inside a card that animates as a whole
      if (el.closest(".grid > *") && !el.parentElement?.classList.contains("grid")) return false;
      seen.add(el);
      return true;
    });
    els.forEach((el) => {
      const target = el.tagName === "IMG" && el.parentElement ? el.parentElement : el;
      const parent = el.parentElement;
      const idx = parent ? Array.from(parent.children).indexOf(el) : 0;
      const delay = Math.min(Math.max(idx, 0), 6) * 0.1;
      target.style.opacity = "0";
      target.style.transform = `perspective(1200px) translateY(${lift}px) rotateX(${tilt}deg)`;
      target.style.transformOrigin = "50% 100%";
      target.style.willChange = "transform, opacity";
      const stop = inView(
        target,
        () => {
          animate(
            target,
            { opacity: [0, 1], transform: [target.style.transform, "perspective(1200px) translateY(0px) rotateX(0deg)"] },
            { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
          ).then(() => {
            target.style.transform = "";
            target.style.willChange = "";
          });
        },
        { amount: 0.15, margin: "0px 0px -40px 0px" },
      );
      stops.push(stop);
    });

    // Subtle 3D hover tilt + lift on cards and images (pointer devices only)
    if (window.matchMedia("(pointer: fine)").matches) {
      const hoverEls = document.querySelectorAll<HTMLElement>("main .grid > *, main img");
      hoverEls.forEach((raw) => {
        const c = raw.tagName === "IMG" && raw.parentElement ? raw.parentElement : raw;
        const move = (e: PointerEvent) => {
          const r = c.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          c.classList.add("tilt3d");
          c.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateY(-6px)`;
        };
        const leave = () => { c.style.transform = ""; c.classList.remove("tilt3d"); };
        c.addEventListener("pointermove", move);
        c.addEventListener("pointerleave", leave);
        stops.push(() => { c.removeEventListener("pointermove", move); c.removeEventListener("pointerleave", leave); });
      });
    }
    return () => stops.forEach((f) => f());
  }, [key]);
}

function useParallax(key: string) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const strength = window.matchMedia("(max-width: 768px)").matches ? 0.06 : 0.12;
    const layers = Array.from(document.querySelectorAll<HTMLElement>("main section:first-child > .pointer-events-none, main [data-parallax]"));
    const hero = document.querySelector<HTMLElement>("main section:first-child .container-x");
    return scroll((progress: number, info: { y: { current: number } }) => {
      const y = info.y.current;
      layers.forEach((l, i) => { l.style.translate = `0 ${y * strength * (i % 2 ? -1 : 1) * 2}px`; });
      if (hero && y < window.innerHeight * 1.2) hero.style.translate = `0 ${y * strength}px`;
      void progress;
    });
  }, [key]);
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useScrollReveal(pathname);
  useParallax(pathname);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main key={pathname} className="animate-page">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
      <Toaster />
    </QueryClientProvider>
  );
}
