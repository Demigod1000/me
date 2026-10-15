export type GithubProfile = {
  login: string;
  name: string | null;
  html_url: string;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type GithubProject = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};

export type GithubSnapshot = {
  profile: GithubProfile;
  projects: GithubProject[];
  /** ISO timestamp of the moment the live data was read from GitHub */
  fetchedAt: string;
  /** false when the live read failed and the bundled snapshot is shown instead */
  live: boolean;
};
