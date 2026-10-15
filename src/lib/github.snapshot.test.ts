import { afterEach, describe, expect, it, vi } from "vitest";
import { mapProjects, fetchSnapshot } from "./github";

const repo = (name: string, updated_at: string, fork = false) => ({
  name,
  fork,
  description: null,
  html_url: `https://github.com/Demigod1000/${name}`,
  language: "TypeScript",
  stargazers_count: 0,
  updated_at,
});

describe("mapProjects", () => {
  it("drops forks and puts the newest update first", () => {
    const projects = mapProjects([
      repo("old", "2020-01-01T00:00:00Z"),
      repo("newest", "2026-10-15T13:21:51Z"),
      repo("copied", "2026-10-14T00:00:00Z", true),
    ]);
    expect(projects.map((p) => p.name)).toEqual(["newest", "old"]);
  });
});

describe("fetchSnapshot", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("returns the repositories GitHub reports right now", async () => {
    const requested: string[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        requested.push(url);
        const body = url.includes("/repos")
          ? [repo("socialFeed", "2026-10-15T13:21:51Z"), repo("Vyne", "2026-03-02T17:08:35Z")]
          : {
              login: "Demigod1000",
              name: "Sachidanand",
              html_url: "https://github.com/Demigod1000",
              location: "India",
              public_repos: 2,
              followers: 1,
              following: 3,
              created_at: "2014-06-27T15:19:41Z",
            };
        return new Response(JSON.stringify(body), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }),
    );

    const snapshot = await fetchSnapshot();

    expect(snapshot.live).toBe(true);
    expect(snapshot.projects.map((p) => p.name)).toEqual(["socialFeed", "Vyne"]);
    expect(snapshot.profile.location).toBe("India");
    expect(requested.some((url) => url.includes("/users/Demigod1000/repos"))).toBe(true);
  });

  it("keeps the inventory intact when GitHub refuses the request", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("rate limited", { status: 403 })),
    );

    const snapshot = await fetchSnapshot();

    expect(snapshot.live).toBe(false);
    expect(snapshot.profile.login).toBe("Demigod1000");
    expect(snapshot.projects.length).toBeGreaterThan(0);
  });
});
