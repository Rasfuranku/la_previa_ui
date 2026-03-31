# La Previa - UI Client

The official frontend for the La Previa LATAM Fantasy Football League, built with [Next.js](https://nextjs.org), TailwindCSS, and Playwright.

## Getting Started

1. **Install Dependencies**
   Ensure you're using `npm` and Node 18+:
   ```bash
   npm install
   ```

2. **Configure Environment**
   Set up your local `.env.local` to point to the backend API:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

- **React / Next.js Framework**: Uses Server Components and Server Actions inside `actions/` to securely fetch data without exposing API keys.
- **Styling**: Tailored luxurious branding powered natively via `globals.css` and Tailwind classes mimicking the dark, metallic texture of `/public/logo.png`.
- **Interactivity**: Dynamic squad building components rendering the "Pitch" and bench limits efficiently.

## Testing Requirements (End-to-End)

We enforce cross-browser testing of critical frontend flows (like ensuring squad transfers correctly block at 15 players or when games lock).
To run all End-to-End browser assertions via Playwright:

```bash
npx playwright test
```

To display a detailed trace viewer of the test runs:
```bash
npx playwright show-report
```
