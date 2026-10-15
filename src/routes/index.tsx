import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, ArrowUpRight, Code2, Github, MapPin, Sparkles } from "lucide-react";
import world from "@/assets/hero-island.gif";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { GITHUB_LOGIN, formatSnapshotDate, githubSnapshotOptions } from "@/lib/github";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(githubSnapshotOptions()),
  component: Index,
});
const skills = [
  "TypeScript",
  "React",
  "Python",
  "Gen AI",
  "PHP",
  "WordPress",
  "PostgreSQL",
  "MySQL",
];
function Index() {
  const { data: github } = useSuspenseQuery(githubSnapshotOptions());
  return (
    <>
      <section className="world-hero">
        <img
          src={world}
          alt="Animated pixel-art coding island with a computer, trees and a little orange cat, floating in the sky"
          width={800}
          height={450}
          className="world-art"
          fetchPriority="high"
        />
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 relative">
          <div className="hero-copy">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] bg-card/80 border px-3 py-2 mb-7">
              <span className="w-2 h-2 bg-primary border" /> HELLO, WORLD. I'M
            </div>
            <h1 className="font-display hero-heading">
              Sachidanand
              <span className="block text-[24px] sm:text-[30px] mt-1">
                I build things<span className="text-muted-foreground">.</span>
              </span>
            </h1>
            <p className="mt-5 max-w-[410px] text-base leading-7 text-foreground">
              Full-stack developer. Curious by default.
              <br />
              Turning ideas into useful software, one little adventure at a time.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button asChild className="pixel-button bg-primary">
                <Link to="/work">
                  Explore my work <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="pixel-button bg-card">
                <a href={github.profile.html_url} target="_blank" rel="noreferrer">
                  <Github />
                  GitHub
                </a>
              </Button>
            </div>
            <p className="flex items-center gap-2 font-mono text-[10px] mt-8">
              <MapPin size={13} /> Based in {github.profile.location || "India"}{" "}
              <span className="mx-1">·</span> Building on the internet
            </p>
          </div>
        </div>
      </section>
      <section className="border-b-2 bg-secondary">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <span className="font-mono text-[10px] flex items-center gap-2">
            <Code2 size={17} /> MY TOOLBOX
          </span>
          {skills.map((s) => (
            <span key={s} className="font-mono text-[11px] font-bold">
              {s}
            </span>
          ))}
        </div>
      </section>
      <section className="max-w-[1280px] mx-auto px-5 md:px-10 py-16 md:py-20">
        <div className="section-kicker">Fresh from the workshop</div>
        <div className="flex flex-wrap justify-between items-center gap-5 mb-9">
          <h2 className="font-display text-[21px] md:text-[25px]">
            Selected projects<span className="text-muted-foreground">_</span>
          </h2>
          <Link to="/work" className="flex items-center gap-2 font-mono text-xs border-b-2 pb-1">
            All {github.profile.public_repos} projects <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {github.projects.slice(0, 3).map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
        <p className="font-mono text-[10px] text-muted-foreground mt-6">
          GITHUB / @{GITHUB_LOGIN} · Updated {formatSnapshotDate(github.fetchedAt)}
        </p>
      </section>
      <section className="border-y-2 bg-primary/25">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-14 grid md:grid-cols-[1fr_auto] gap-7 items-center">
          <div>
            <div className="section-kicker">
              <Sparkles size={14} /> Always curious
            </div>
            <h2 className="font-display text-lg leading-9">A developer. Not an NPC.</h2>
            <p className="text-muted-foreground mt-4 max-w-xl leading-7">
              From retail systems to computer vision and musical MacBook hinges — I like seeing
              where an idea can go.
            </p>
          </div>
          <Button asChild variant="outline" className="pixel-button bg-card justify-self-start">
            <Link to="/about">
              Meet the human <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
