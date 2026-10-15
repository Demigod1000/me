import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { githubSnapshotOptions, formatSnapshotDate, formatSnapshotTime } from "@/lib/github";
export const Route = createFileRoute("/work")({
  loader: ({ context }) => context.queryClient.ensureQueryData(githubSnapshotOptions()),
  component: WorkPage,
});
function WorkPage() {
  const { data: github } = useSuspenseQuery(githubSnapshotOptions());
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-14 md:py-20">
      <div className="section-kicker">The project inventory</div>
      <h1 className="font-display page-title">
        My code workshop<span className="text-muted-foreground">.</span>
      </h1>
      <p className="mt-5 text-muted-foreground max-w-lg leading-7">
        Useful tools, curious experiments, and the occasional "what if?" All out in the open.
      </p>
      <div className="flex flex-wrap items-center justify-between gap-4 mt-9 mb-7 border-b-2 pb-5 font-mono text-[11px]">
        <span>{github.projects.length} PUBLIC PROJECTS</span>
        <span className="text-muted-foreground">
          LATEST UPDATED FIRST · READ {formatSnapshotDate(github.fetchedAt)}{" "}
          {formatSnapshotTime(github.fetchedAt)}
        </span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {github.projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
      <div className="mt-12">
        <Button asChild variant="outline" className="pixel-button bg-card">
          <a href={`${github.profile.html_url}?tab=repositories`} target="_blank" rel="noreferrer">
            <Github /> More on GitHub <ArrowUpRight />
          </a>
        </Button>
      </div>
    </div>
  );
}
