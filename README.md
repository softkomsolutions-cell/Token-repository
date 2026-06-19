# Token Repository

Token Repository is a React and TypeScript prototype for a marketplace that combines
property funding coins with collectible trading coins. The first app baseline includes
featured token listing cards, marketplace metrics, recent activity, and launch milestones
that can grow into deal rooms, onboarding, and trading workflows.

Source repository: <https://github.com/softkomsolutions-cell/Token-repository>

## Tech stack

- React 19
- TypeScript
- Vite
- Vitest + Testing Library
- ESLint

## Getting started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Run the production build:

```bash
npm run build
```

Run checks:

```bash
npm run lint
npm run test:run
```

## Product direction

The current UI is a front-end prototype. Next implementation steps are:

1. Persist token listings, property records, collectible provenance, and activity events.
2. Add investor onboarding, wallet connection, and eligibility checks.
3. Model trading flows with order history, disclosures, and settlement status.
