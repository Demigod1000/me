import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Github, ArrowUpRight, MapPin } from "lucide-react";
import portrait from "@/assets/portrait.png";
import { Button } from "@/components/ui/button";
import { githubSnapshotOptions, githubSinceYear } from "@/lib/github";
export const Route = createFileRoute("/about")({
  loader: ({ context }) => context.queryClient.ensureQueryData(githubSnapshotOptions()),
  component: AboutPage,
});
function AboutPage() {
  const { data: github } = useSuspenseQuery(githubSnapshotOptions());
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-14 md:py-20">
      <div className="section-kicker">Player one</div>
      <h1 className="font-display page-title">
        The human behind
        <br />
        the code<span className="text-muted-foreground">.</span>
      </h1>
      <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-20 mt-10 items-start">
        <div>
          <p className="text-xl leading-9">
            I'm Sachidanand — a full-stack developer from India working across TypeScript, React,
            Python, Gen AI, PHP, WordPress, PostgreSQL and MySQL.
          </p>
          <p className="mt-6 text-muted-foreground leading-8">
            I build retail systems, web apps and little experiments that follow my curiosity. My
            public projects range from Vyne, a retail management system, to computer vision and a
            MacBook hinge that plays musical notes.
          </p>
          <p className="mt-5 text-muted-foreground leading-8">
            I keep my work in the open on GitHub. Have a look around — you might find something
            useful, or just something fun.
          </p>
          <div className="mt-9 border-y-2 py-5 flex flex-wrap gap-7 font-mono text-xs">
            <span>{github.profile.public_repos} public repos</span>
            <span>{github.profile.followers} follower</span>
            <span>On GitHub since {githubSinceYear(github.profile.created_at)}</span>
          </div>
          <h2 className="font-display text-sm mt-10 mb-5">Tools in my backpack</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "TypeScript",
              "React",
              "Python",
              "Gen AI",
              "PHP",
              "WordPress",
              "PostgreSQL",
              "MySQL",
              "Node.js",
              "Tailwind",
            ].map((s) => (
              <span key={s} className="pixel-tag bg-secondary">
                {s}
              </span>
            ))}
          </div>
          <Button asChild className="pixel-button mt-9">
            <a href={github.profile.html_url} target="_blank" rel="noreferrer">
              <Github /> @Demigod1000 <ArrowUpRight />
            </a>
          </Button>
        </div>
        <figure>
          <div className="pixel-frame bg-lilac p-4">
            <div className="border-b-2 pb-3 mb-4 flex justify-between font-mono text-[10px]">
              <span>PLAYER_01.PNG</span>
              <span>✦ ✦ ✦</span>
            </div>
            <img
              src={portrait}
              alt="Portrait of Sachidanand"
              width={600}
              height={800}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <figcaption className="font-mono text-[11px] flex items-center gap-2 mt-5">
            <MapPin size={14} /> {github.profile.location || "India"} · UTC +05:30
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
