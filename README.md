# FOCUS Lab Website

Source code for the website of the [FOCUS Lab](https://focus.ece.ufl.edu/) (Florida Optics and Computational Sensor Lab) at the University of Florida ECE Department. Built with [VitePress](https://vitepress.dev/).

> [!CAUTION]
> Every push to the `master` branch automatically triggers a GitHub Actions workflow that rebuilds the site and publishes it to the live production URL within a few minutes.
> **Do not push directly to `master` unless you intend to update the live site.** For changes you want to test or review, push to a different branch and open a pull request, or use the StackBlitz option below.

## Getting started

### Option A — Edit in your browser (no install)

If you only want to make small edits (text, publication entries, news items) without installing anything locally, open the project in StackBlitz:

[**Open in StackBlitz**](https://stackblitz.com/~/github.com/uf-focus-lab/website)

> [!NOTE]
> StackBlitz runs the dev server in the browser. You can edit files, see a live preview, and download or commit your changes — all without installing anything on your machine.

### Option B — Develop locally

Choose this if you want to make larger changes or work offline.

#### 1. Install Node.js

- **macOS / Linux / Windows:** download the latest LTS installer from <https://nodejs.org/> and run it.
- To confirm it installed correctly, open a new terminal and run:
```bash
node --version
npm --version
```
Both commands should print a version number.

#### 2. Get the code

Clone the repository (you only need to do this once):

```bash
git clone https://github.com/uf-focus-lab/website.git focus-lab-website
cd focus-lab-website
```

#### 3. Install project dependencies

From inside the `focus-lab-website/` folder, run:

```bash
npm install
```

This downloads all the libraries the site needs into a local `node_modules/` folder. You only need to do this once, or whenever someone updates `package.json`.

#### 4. Start the dev server (live preview while editing)

```bash
npm run dev
```

This starts a local server, usually at <http://localhost:5173>. Open that URL in your browser. Any edit you save in the `src/` folder reloads the page automatically — you do **not** need to restart the server.

Press `q` in the terminal to stop the dev server.

#### 5. Build the production site

When you are ready to generate the final static files (this is what gets deployed):

```bash
npm run build
```

The output goes into `.vitepress/dist/`. You normally do **not** need to run this manually — GitHub Actions runs it automatically when you push to `master`. Use it to check that the build succeeds without errors before pushing.

#### 6. Preview the production build

To view the built site exactly as it will appear in production:

```bash
npm run serve
```

This builds the site and serves it locally. Open the URL printed in the terminal (typically <http://localhost:4173>).


## Publishing changes

1. Create a branch for your changes (don't work directly on `master`):
   ```bash
   git checkout -b your-name/short-description
   ```
2. Edit files, commit, and push your branch:
   ```bash
   git add <files you changed>
   git commit -m "Describe what you changed"
   git push -u origin your-name/short-description
   ```
3. Open a pull request on GitHub for review.
4. Once the PR is merged into `master`, the site is rebuilt and redeployed automatically. You can watch progress under the **Actions** tab on GitHub.

## Where things live

- `src/index.md` — homepage
- `src/<section>/index.md` — section pages (research, publications, team, news, etc.)
- `src/research/<year>/<slug>/` — individual research project pages with their images
- `src/public/` — static assets (PDFs, images) served from the site root
- `.vitepress/config.ts` — site-wide configuration
- `.vitepress/theme/` — custom theme overrides

## Troubleshooting

- **`npm install` fails:** make sure you are in the `website/` folder and have a recent Node.js version (LTS or newer). Delete `node_modules/` and `package-lock.json`, then re-run `npm install`.
- **Dev server shows a blank page or stale content:** stop the server with `Ctrl+C` and run `npm run dev` again. Hard-refresh the browser (`Cmd+Shift+R` on macOS, `Ctrl+Shift+R` on Windows/Linux).
- **Build fails on GitHub Actions but works locally:** check the failed run under the **Actions** tab on GitHub for the error message, and ask the maintainer.
