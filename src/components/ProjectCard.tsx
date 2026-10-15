import {
  ArrowUpRight,
  Code2,
  Eye,
  Music2,
  ShoppingBag,
  Wallet,
  Globe,
  Star,
  GitFork,
} from "lucide-react";
import type { GithubProject } from "@/lib/github.types";

type Project = GithubProject;
const art = [
  { icon: Code2, color: "bg-lilac", label: "SOCIAL / WEB" },
  { icon: ShoppingBag, color: "bg-primary", label: "RETAIL / TOOLS" },
  { icon: Eye, color: "bg-sky", label: "VISION / AI" },
  { icon: Music2, color: "bg-secondary", label: "HARDWARE / FUN" },
  { icon: Wallet, color: "bg-peach", label: "PERSONAL / FINANCE" },
  { icon: Globe, color: "bg-lilac", label: "WEB / WORDPRESS" },
];
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const style = art[index % art.length];
  const Icon = style.icon;
  return (
    <a
      href={project.html_url}
      target="_blank"
      rel="noreferrer"
      className="project-card pixel-frame bg-card flex flex-col min-w-0 group"
    >
      <div className={`border-b-2 h-40 flex flex-col justify-between p-5 ${style.color}`}>
        <div className="flex justify-between font-mono text-[10px]">
          <span>{String(index + 1).padStart(2, "0")} / PROJECT</span>
          <ArrowUpRight size={17} />
        </div>
        <div className="flex items-end justify-between">
          <Icon size={48} strokeWidth={1.5} aria-hidden="true" />
          <span className="font-mono text-[10px]">{style.label}</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-[13px] break-words leading-7">{project.name}</h3>
        <p className="text-muted-foreground text-sm leading-6 mt-3 mb-6 flex-1">
          {project.description || "No description yet \u2014 open the repo to see what it does."}
        </p>
        <div className="flex items-center justify-between border-t border-border/20 pt-4 font-mono text-[10px] gap-2">
          <span className="flex items-center gap-2">
            <span className={`w-2 h-2 border ${style.color}`} />
            {project.language || "WordPress"}
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} />
            {project.stargazers_count}
            <GitFork size={12} className="ml-2" />
            Public
          </span>
        </div>
      </div>
    </a>
  );
}
