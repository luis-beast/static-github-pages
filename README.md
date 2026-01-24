# LaymanLouie

A personal website for LaymanLouie featuring commands, quotes, and community info.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Framer Motion

## Development

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

1. Update `vite.config.ts` and set `base` to your repository name:
   ```ts
   base: "/your-repo-name/"
   ```

2. Build the project:
   ```sh
   npm run build
   ```

3. Deploy the `dist` folder to GitHub Pages using your preferred method (GitHub Actions, manual push to gh-pages branch, etc.)

## Project Structure

```
src/
├── components/     # React components
│   ├── home/       # Homepage sections
│   └── ui/         # Reusable UI components (shadcn)
├── config/         # Site configuration
├── contexts/       # React contexts
├── data/           # Static data (commands, quotes)
├── hooks/          # Custom React hooks
├── lib/            # Utilities and constants
├── pages/          # Page components
└── types/          # TypeScript types
```
