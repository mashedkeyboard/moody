# moody

An encrypted personal mood journal, running entirely in the browser.

## Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Testing

Uses both Playwright for front-end testing and Vitest for back-end testing:

```bash
npm run test
npm run vitest
```