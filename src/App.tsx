import { githubRepository } from './repository';

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
};

const featuredListings: TokenListing[] = [
  {
    title: 'Riverfront Apartments',
    symbol: 'RFA',
    category: 'Property funding',
    price: '$25.00',
    change: '+8.4%',
    supply: '42,000 tokens',
    status: 'Open',
    summary:
      'Fractional exposure to a stabilized multifamily property with monthly reporting and milestone-based funding.',
    perks: ['Income target dashboard', 'Escrow milestone tracking', 'Investor update feed'],
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

function App() {
  const propertyCount = featuredListings.filter(
    (listing) => listing.category === 'Property funding',
  ).length;
  const collectibleCount = featuredListings.length - propertyCount;

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
            <a className="secondary-action" href={githubRepository.url} rel="noreferrer" target="_blank">
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
              <dd>{githubRepository.defaultBranch}</dd>
            </div>
          </dl>
          <a className="repository-link" href={githubRepository.url} rel="noreferrer" target="_blank">
            Open on GitHub
          </a>
        </article>
      </section>
    </main>
  );
}

export default App;
