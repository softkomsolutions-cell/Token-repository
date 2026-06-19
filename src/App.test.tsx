import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from './App';

const mockRepositoryResponse = {
  default_branch: 'main',
  forks_count: 2,
  open_issues_count: 4,
  pushed_at: '2026-06-19T12:00:00Z',
  stargazers_count: 7,
  updated_at: '2026-06-19T12:05:00Z',
  visibility: 'public',
};

describe('App', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders the initial token repository experience with live GitHub status', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockRepositoryResponse,
      } satisfies Partial<Response>),
    );

    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /track, fund, and trade tokenized opportunities/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('SOHO Retail Property Fund')).toBeInTheDocument();
    expect(screen.getByText('Heritage Gold Coin')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /property fund prospectus/i })).toHaveAttribute(
      'href',
      '/documents/property-fund-prospectus-may-2026.pdf',
    );
    expect(screen.getByText(/next launch milestones/i)).toBeInTheDocument();
    expect(screen.getByText(/source repository/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open on github/i })).toHaveAttribute(
      'href',
      'https://github.com/softkomsolutions-cell/Token-repository',
    );
    expect(await screen.findByText('Connected')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('public')).toBeInTheDocument();
  });

  it('keeps the repository link available when live GitHub status fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      } satisfies Partial<Response>),
    );

    render(<App />);

    expect(await screen.findByText('Unavailable')).toBeInTheDocument();
    expect(screen.getByText(/live github status could not be loaded/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open on github/i })).toHaveAttribute(
      'href',
      'https://github.com/softkomsolutions-cell/Token-repository',
    );
  });
});
