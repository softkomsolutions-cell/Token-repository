import { useEffect, useState } from 'react';

import {
  fetchGitHubRepositoryStatus,
  githubRepository,
  type GitHubRepositoryStatus,
} from './repository';

type TokenListing = {
  title: string;
  symbol: string;
  category: 'Property funding' | 'Collectible trading';
  price: string;
  change: string;
  supply: string;
  status: 'Open' | 'Launching' | 'Trading';
  summary: string;
  perks: string[];
  documents?: TokenDocument[];
};

type TokenDocument = {
  title: string;
  label: string;
  href: string;
  summary: string;
};

const featuredListings: TokenListing[] = [
  {
    title: 'SOHO Retail Property Fund',
    symbol: 'SRPF',
    category: 'Property funding',
    price: 'TBD',
    change: '+8.4%',
    supply: '42,000 tokens',
    status: 'Open',
    summary:
      'A property funding token concept backed by a retail property fund strategy focused on active asset management and development-stage retail projects.',
    perks: ['May 2026 prospectus', 'Retail development mandate', 'Investor update feed'],
    documents: [
      {
        title: 'Property Fund Prospectus',
        label: 'May 2026 PDF',
        href: '/documents/property-fund-prospectus-may-2026.pdf',
        summary: 'SOHO Property Holdings prospectus for a retail property fund.',
      },
    ],
  },
  {
    title: 'Heritage Gold Coin',
    symbol: 'HGC',
    category: 'Collectible trading',
    price: '$184.50',
    change: '+3.1%',
    supply: '1,250 tokens',
    status: 'Trading',
    summary:
      'A limited collectible coin listing with provenance notes, rarity scoring, and peer-to-peer market depth.',
    perks: ['Verified provenance', 'Rarity score', 'Live order book preview'],
  },
  {
    title: 'Solar Storage Fund',
    symbol: 'SSF',
    category: 'Property funding',
    price: '$10.00',
    change: 'New',
    supply: '100,000 tokens',
    status: 'Launching',
    summary:
      'Pre-launch funding card for an energy storage facility with transparent allocation and reservation tracking.',
    perks: ['Reservation queue', 'Funding target tracker', 'Compliance checklist'],
  },
];

const activity = [
  'RFA completed due diligence milestone 2 of 4',
  'HGC provenance packet refreshed with new imagery',
  'SSF reservation window opens after compliance review',
];

type RepositoryStatusState =
  | { status: 'loading' }
  | { data: GitHubRepositoryStatus; status: 'ready' }
  | { message: string; status: 'error' };

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

function App() {
  const [repositoryStatus, setRepositoryStatus] = useState<RepositoryStatusState>({
    status: 'loading',
  });
  const propertyCount = featuredListings.filter(
    (listing) => listing.category === 'Property funding',
  ).length;
  const collectibleCount = featuredListings.length - propertyCount;

  useEffect(() => {
    let isCurrent = true;

    fetchGitHubRepositoryStatus()
      .then((data) => {
        if (isCurrent) {
          setRepositoryStatus({ data, status: 'ready' });
        }
      })
      .catch((error: unknown) => {
        if (isCurrent) {
          setRepositoryStatus({
            message: error instanceof Error ? error.message : 'Unable to load GitHub status',
            status: 'error',
          });
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <main className="app-shell">
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Token Repository home">
          <span className="brand-mark">TR</span>
          <span>Token Repository</span>
        </a>
        <div className="nav-links">
          <a href="#market">Market</a>
          <a href="#activity">Activity</a>
          <a href="#repository">Repository</a>
          <a href="#launch">Launch plan</a>
          <a href={githubRepository.url} rel="noreferrer" target="_blank">
            GitHub
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Property funding coin + collectible trading coin</p>
          <h1>Track, fund, and trade tokenized opportunities from one repository.</h1>
          <p className="hero-text">
            Token Repository is a working prototype for listing property-backed funding tokens
            and collectible coins with transparent status, supply, pricing, and trust signals.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#market">
              Explore listings
            </a>
            <a className="secondary-action" href="#launch">
              Review launch plan
            </a>
            <a
              className="secondary-action"
              href={githubRepository.url}
              rel="noreferrer"
              target="_blank"
            >
              Open GitHub repository
            </a>
          </div>
        </div>

        <aside className="hero-card" aria-label="Repository metrics">
          <span className="card-label">Marketplace snapshot</span>
          <strong>{featuredListings.length}</strong>
          <p>token opportunities prepared for investor review</p>
          <dl className="metric-grid">
            <div>
              <dt>{propertyCount}</dt>
              <dd>property funding</dd>
            </div>
            <div>
              <dt>{collectibleCount}</dt>
              <dd>collectibles</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="section-heading" id="market">
        <p className="eyebrow">Market cards</p>
        <h2>Featured token listings</h2>
        <p>
          Each card highlights the kind of information the app can expand into deeper deal rooms,
          trading pages, and compliance workflows.
        </p>
      </section>

      <section className="listing-grid" aria-label="Featured token listings">
        {featuredListings.map((listing) => (
          <article className="listing-card" key={listing.symbol}>
            <div className="listing-header">
              <div>
                <p className="listing-category">{listing.category}</p>
                <h3>{listing.title}</h3>
              </div>
              <span className="status-pill">{listing.status}</span>
            </div>

            <p className="listing-summary">{listing.summary}</p>

            <dl className="listing-stats">
              <div>
                <dt>Symbol</dt>
                <dd>{listing.symbol}</dd>
              </div>
              <div>
                <dt>Price</dt>
                <dd>{listing.price}</dd>
              </div>
              <div>
                <dt>Change</dt>
                <dd>{listing.change}</dd>
              </div>
              <div>
                <dt>Supply</dt>
                <dd>{listing.supply}</dd>
              </div>
            </dl>

            <ul className="perk-list">
              {listing.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>

            {listing.documents && (
              <div className="document-list" aria-label={`${listing.title} documents`}>
                {listing.documents.map((document) => (
                  <a
                    className="document-link"
                    href={document.href}
                    key={document.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>
                      <strong>{document.title}</strong>
                      <small>{document.summary}</small>
                    </span>
                    <span>{document.label}</span>
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </section>

      <section className="insight-grid">
        <article className="panel" id="activity">
          <p className="eyebrow">Latest activity</p>
          <h2>Repository updates</h2>
          <ul className="activity-list">
            {activity.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel launch-panel" id="launch">
          <p className="eyebrow">Build focus</p>
          <h2>Next launch milestones</h2>
          <ol className="launch-list">
            <li>Connect listings to persisted token and property records.</li>
            <li>Add investor onboarding, wallet connection, and eligibility checks.</li>
            <li>Model trading flows with order history, disclosures, and settlement status.</li>
          </ol>
        </article>

        <article className="panel repository-panel" id="repository">
          <p className="eyebrow">GitHub connected</p>
          <h2>Source repository</h2>
          <p>
            The app is connected to the GitHub repository where source code, pull requests, and
            future issues can be managed.
          </p>
          <dl className="repository-details">
            <div>
              <dt>Owner</dt>
              <dd>{githubRepository.owner}</dd>
            </div>
            <div>
              <dt>Repository</dt>
              <dd>{githubRepository.name}</dd>
            </div>
            <div>
              <dt>Default branch</dt>
              <dd>
                {repositoryStatus.status === 'ready'
                  ? repositoryStatus.data.defaultBranch
                  : githubRepository.defaultBranch}
              </dd>
            </div>
            <div>
              <dt>Live status</dt>
              <dd>
                {repositoryStatus.status === 'loading' && 'Loading from GitHub'}
                {repositoryStatus.status === 'ready' && 'Connected'}
                {repositoryStatus.status === 'error' && 'Unavailable'}
              </dd>
            </div>
          </dl>
          {repositoryStatus.status === 'ready' && (
            <dl className="repository-live-stats" aria-label="Live GitHub repository stats">
              <div>
                <dt>Stars</dt>
                <dd>{repositoryStatus.data.stars}</dd>
              </div>
              <div>
                <dt>Forks</dt>
                <dd>{repositoryStatus.data.forks}</dd>
              </div>
              <div>
                <dt>Issues / PRs</dt>
                <dd>{repositoryStatus.data.openIssuesAndPullRequests}</dd>
              </div>
              <div>
                <dt>Visibility</dt>
                <dd>{repositoryStatus.data.visibility}</dd>
              </div>
              <div>
                <dt>Last push</dt>
                <dd>{formatDate(repositoryStatus.data.pushedAt)}</dd>
              </div>
            </dl>
          )}
          {repositoryStatus.status === 'error' && (
            <p className="repository-error" role="status">
              Live GitHub status could not be loaded. The source link is still available.
            </p>
          )}
          <a className="repository-link" href={githubRepository.url} rel="noreferrer" target="_blank">
            Open on GitHub
          </a>
        </article>
      </section>
    </main>
  );
}

export default App;
