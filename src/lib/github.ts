import { queryOptions } from "@tanstack/react-query";
import fallback from "@/data/github.json";
import type { GithubProfile, GithubProject, GithubSnapshot } from "./github.types";

export const GITHUB_LOGIN = "Demigod1000";
export const GITHUB_URL = `https://github.com/${GITHUB_LOGIN}`;

// ---------------------------------------------------------------------------
// GitHub REST API — runs in the browser, no server function needed
// ---------------------------------------------------------------------------

const API = "https://api.github.com";
const TIMEOUT_MS = 4_000;

type RawProfile = {
  login: string;
  name: string | null;
  html_url: string;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

type RawRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
};

export function mapProfile(profile: RawProfile): GithubProfile {
  return {
    login: profile.login,
    name: profile.name,
    html_url: profile.html_url,
    location: profile.location,
    public_repos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,
    created_at: profile.created_at,
  };
}

/** Forks are not the owner's own work, so they never appear in the inventory. */
export function mapProjects(repos: RawRepo[]): GithubProject[] {
  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
    .slice(0, 100)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      updated_at: repo.updated_at,
    }));
}

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "sachidanand.dev",
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`GitHub ${path} failed [${response.status}] ${body.slice(0, 200)}`);
  }
  return (await response.json()) as T;
}

function bundledSnapshot(): GithubSnapshot {
  return { ...(fallback as unknown as Omit<GithubSnapshot, "live">), live: false };
}

/**
 * Reads the profile and repositories from GitHub's public REST API so every
 * page load sees the projects as they are right now. Falls back to the
 * bundled `src/data/github.json` when GitHub is unreachable or rate-limited.
 */
export async function fetchSnapshot(): Promise<GithubSnapshot> {
  try {
    const [profile, repos] = await Promise.all([
      get<RawProfile>(`/users/${GITHUB_LOGIN}`),
      get<RawRepo[]>(`/users/${GITHUB_LOGIN}/repos?per_page=100&sort=updated&direction=desc`),
    ]);
    return {
      profile: mapProfile(profile),
      projects: mapProjects(repos),
      fetchedAt: new Date().toISOString(),
      live: true,
    };
  } catch (error) {
    // A rate limit or a network blip must never empty the project inventory.
    console.warn("GitHub live read failed, serving the bundled snapshot:", error);
    return bundledSnapshot();
  }
}

// ---------------------------------------------------------------------------
// React Query options — used by every route
// ---------------------------------------------------------------------------

export function githubSnapshotOptions() {
  return queryOptions({
    queryKey: ["github-snapshot"],
    queryFn: () => fetchSnapshot(),
    // Fresh on every page load, without a second round-trip the instant the
    // page finishes hydrating.
    staleTime: 30_000,
  });
}

// ---------------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------------

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC",
});

export function formatSnapshotDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : dateFmt.format(date);
}

export function formatSnapshotTime(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : `${timeFmt.format(date)} UTC`;
}

export function githubSinceYear(createdAt: string): string {
  const date = new Date(createdAt);
  return Number.isNaN(date.getTime()) ? "" : String(date.getUTCFullYear());
}
