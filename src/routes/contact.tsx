import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight, Github, Mail, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { githubSnapshotOptions } from "@/lib/github";
export const Route = createFileRoute("/contact")({
  loader: ({ context }) => context.queryClient.ensureQueryData(githubSnapshotOptions()),
  component: ContactPage,
});
function ContactPage() {
  const { data: github } = useSuspenseQuery(githubSnapshotOptions());
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-14 md:py-20 min-h-[70vh]">
      <div className="section-kicker">A new adventure?</div>
      <h1 className="font-display page-title">
        Let's build
        <br />
        something good<span className="text-muted-foreground">.</span>
      </h1>
      <p className="mt-7 text-lg leading-8 max-w-xl text-muted-foreground">
        An interesting project, a question about my code, or just a hello — I'd love to hear from
        you.
      </p>
      <div className="mt-12 border-y-2 py-9 grid md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-8">
          <div>
            <div className="pixel-icon bg-primary inline-flex">
              <Mail size={28} />
            </div>
            <h2 className="font-display text-sm mt-5">Direct Email</h2>
            <p className="text-muted-foreground my-3 leading-7">
              Send me an email directly for collaborations, contracts, or just a friendly chat.
            </p>
            <Button asChild className="pixel-button">
              <a href="mailto:sachi.s34@gmail.com">
                <Mail size={16} /> sachi.s34@gmail.com <ArrowUpRight size={16} />
              </a>
            </Button>
          </div>

          <div className="border-t-2 pt-6">
            <h3 className="font-display text-xs mb-3 flex items-center gap-2">
              <MessageSquare size={16} /> Find me on GitHub
            </h3>
            <p className="text-muted-foreground mb-4 text-sm leading-6">
              Explore my open-source work or start a discussion on one of my public projects.
            </p>
            <Button asChild variant="outline" className="pixel-button bg-card">
              <a href={github.profile.html_url} target="_blank" rel="noreferrer">
                <Github size={16} /> @Demigod1000 <ArrowUpRight size={16} />
              </a>
            </Button>
          </div>
        </div>

        <div className="md:border-l-2 md:pl-10 flex flex-col justify-center gap-6">
          <div className="flex items-center gap-3 font-mono text-sm">
            <Mail size={19} className="text-primary shrink-0" />
            <a href="mailto:sachi.s34@gmail.com" className="hover:underline">
              sachi.s34@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={19} />
            <span>Based in {github.profile.location || "India"}</span>
          </div>
          <p className="font-mono text-xs text-muted-foreground">LOCAL TIME ZONE / UTC +05:30</p>
          <p className="leading-7 text-muted-foreground max-w-sm">
            Full-stack development · Web applications · Open-source experiments
          </p>
        </div>
      </div>
    </div>
  );
}
