# NXTWAVE

Music. Comedy. Touring city to city—before the world catches up.

NXTWAVE is a live events platform bringing emerging artists and comedians to audiences across New York City, Atlanta, and Chicago.

## Getting Started

Install dependencies:

```bash
npm install
```

Copy the environment variable example file and fill in your values (see [Environment Variables](#environment-variables)):

```bash
cp .env.local.example .env.local
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

The `/partners` page uses a native inquiry form that writes submissions directly to Airtable. You need the following environment variables to enable it:

| Variable | Description |
|---|---|
| `AIRTABLE_TOKEN` | Airtable Personal Access Token. Create one at [airtable.com/create/tokens](https://airtable.com/create/tokens) with `data.records:write` scope. |
| `AIRTABLE_BASE_ID` | The Airtable Base/App ID (e.g. `appeelJ8gPIe2MO2J`). |
| `AIRTABLE_TABLE_NAME` | Exact table name in Airtable (e.g. `Sponsorship Inquires`). |

Set `AIRTABLE_TOKEN` in your `.env.local` file for local development. For Vercel, add all three variables in your project settings under **Settings → Environment Variables**. Never commit a token to the repository.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Deployment

This project is deployed on [Vercel](https://vercel.com/). Push to the `main` branch to trigger automatic deployment.

The legacy static site files are preserved in the `/legacy` folder for reference.