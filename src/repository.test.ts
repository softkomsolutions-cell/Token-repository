import { describe, expect, it, vi } from 'vitest';

import { fetchGitHubRepositoryStatus, githubRepository } from './repository';

describe('fetchGitHubRepositoryStatus', () => {
  it('maps GitHub repository API data into app status data', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        default_branch: 'main',
        forks_count: 2,
        open_issues_count: 4,
        pushed_at: '2026-06-19T12:00:00Z',
        stargazers_count: 7,
        updated_at: '2026-06-19T12:05:00Z',
        visibility: 'public',
      }),
    } satisfies Partial<Response>);

    await expect(fetchGitHubRepositoryStatus(fetcher as unknown as typeof fetch)).resolves.toEqual({
      defaultBranch: 'main',
      forks: 2,
      openIssuesAndPullRequests: 4,
      pushedAt: '2026-06-19T12:00:00Z',
      stars: 7,
      updatedAt: '2026-06-19T12:05:00Z',
      visibility: 'public',
    });
    expect(fetcher).toHaveBeenCalledWith(githubRepository.apiUrl, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    });
  });

  it('throws when GitHub returns an unsuccessful response', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    } satisfies Partial<Response>);

    await expect(fetchGitHubRepositoryStatus(fetcher as unknown as typeof fetch)).rejects.toThrow(
      'GitHub repository request failed with status 404',
    );
  });
});
