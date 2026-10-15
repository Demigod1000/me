import { useState } from "react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Github, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import navbarBadge from "@/assets/navbar-kitten.png";
import { GITHUB_URL } from "@/lib/github";

const nav = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative z-40 border-b-2 bg-card">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 h-24 flex items-center justify-between gap-4">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 min-w-0"
            aria-label="Sachidanand home"
          >
            <img
              src={navbarBadge}
              alt="Sachidanand's pixel kitten avatar"
              width={56}
              height={56}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 object-cover shrink-0 [image-rendering:pixelated]"
            />
            <span className="font-display text-[11px] sm:text-[13px]">
              Sachidanand<span className="text-muted-foreground">.dev</span>
            </span>
          </Link>
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 lg:gap-9">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                aria-current={pathname === n.to ? "page" : undefined}
                className={`font-mono text-xs py-2 border-b-2 ${pathname === n.to ? "border-foreground font-bold" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Button
            asChild
            variant="outline"
            className="pixel-button hidden lg:inline-flex h-10 px-4 text-xs"
          >
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              <Github /> GitHub <ArrowUpRight />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
            className="md:hidden border-2 rounded-none"
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="md:hidden flex flex-col border-t-2 px-5 py-3 bg-card"
          >
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                aria-current={pathname === n.to ? "page" : undefined}
                className={`py-3 font-mono text-sm ${pathname === n.to ? "font-bold" : "text-muted-foreground"}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t-2 bg-card">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-7 flex flex-col sm:flex-row justify-between gap-4 font-mono text-[11px] text-muted-foreground">
          <span>© {new Date().getFullYear()} Sachidanand · India</span>
          <span className="flex items-center gap-2">
            Made with care & a little <Heart size={12} className="text-destructive" />
          </span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-foreground"
          >
            Find me on GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </div>
  );
}
