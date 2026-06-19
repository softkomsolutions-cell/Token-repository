import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
  it('renders the initial token repository experience', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /track, fund, and trade tokenized opportunities/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Riverfront Apartments')).toBeInTheDocument();
    expect(screen.getByText('Heritage Gold Coin')).toBeInTheDocument();
    expect(screen.getByText(/next launch milestones/i)).toBeInTheDocument();
    expect(screen.getByText(/source repository/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open on github/i })).toHaveAttribute(
      'href',
      'https://github.com/softkomsolutions-cell/Token-repository',
    );
  });
});
