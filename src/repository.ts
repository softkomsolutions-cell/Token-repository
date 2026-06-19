export const githubRepository = {
  owner: 'softkomsolutions-cell',
  name: 'Token-repository',
  url: 'https://github.com/softkomsolutions-cell/Token-repository',
  apiUrl: 'https://api.github.com/repos/softkomsolutions-cell/Token-repository',
  defaultBranch: 'main',
} as const;

type GitHubRepositoryApiResponse = {
  default_branch: string;
  forks_count: number;
  open_issues_count: number;
  pushed_at: string;
  stargazers_count: number;
  updated_at: string;
  visibility: string;
};

export type GitHubRepositoryStatus = {
  defaultBranch: string;
  forks: number;
  openIssuesAndPullRequests: number;
  pushedAt: string;
  stars: number;
  updatedAt: string;
  visibility: string;
};

export async function fetchGitHubRepositoryStatus(
  fetcher: typeof fetch = fetch,
): Promise<GitHubRepositoryStatus> {
  const response = await fetcher(githubRepository.apiUrl, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub repository request failed with status ${response.status}`);
  }

  const data = (await response.json()) as GitHubRepositoryApiResponse;

  return {
    defaultBranch: data.default_branch,
    forks: data.forks_count,
    openIssuesAndPullRequests: data.open_issues_count,
    pushedAt: data.pushed_at,
    stars: data.stargazers_count,
    updatedAt: data.updated_at,
    visibility: data.visibility,
  };
}
