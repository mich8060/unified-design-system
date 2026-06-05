# Install from GitHub Packages

Package: **`@chghealthcare/unified-design-system`**  
Repository: [chghealthcare/unified-design-system](https://github.com/chghealthcare/unified-design-system)

The npm scope **`@chghealthcare`** matches the GitHub organization, which is required for [GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).

## Publishing (maintainers)

Workflow: [`.github/workflows/publish-github-packages.yml`](../.github/workflows/publish-github-packages.yml)

Triggers:

| Trigger | When it runs |
|--------|----------------|
| **`release: published`** | You publish a GitHub Release (recommended for production versions). |
| **`workflow_dispatch`** | Actions → **Publish GitHub Package** → **Run workflow** (use dry run first). |

Until the first successful run, the workflow page may show **0 workflow runs** and only highlight the manual trigger. That is normal—the release trigger still runs when you publish a release.

1. Bump `version` in `package.json` and merge to `main`.
2. Create a **GitHub Release** for that tag (published, not draft), **or** run **Publish GitHub Package** manually on `main`.
3. CI runs `npm run build:lib` and publishes to `https://npm.pkg.github.com` using `GITHUB_TOKEN` (`packages: write`).

Manual publish:

```bash
npm run build:lib
NODE_AUTH_TOKEN=ghp_xxx npm publish --registry https://npm.pkg.github.com
```

Use a PAT with `write:packages` (and `repo` if the repository is private).

## Installing in a consumer app

1. Create a GitHub PAT with `read:packages` (and `repo` for private packages).

2. Add `.npmrc` in your app (see [`.npmrc.example`](../.npmrc.example)):

```ini
@chghealthcare:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

In GitHub Actions, set job `permissions.packages: read`, configure `setup-node` with `registry-url: https://npm.pkg.github.com` and `scope: "@chghealthcare"`, then:

```yaml
- name: Install dependencies
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: npm ci
```

Use a PAT secret instead of `GITHUB_TOKEN` if the package is private or cross-org.

3. Install:

```bash
npm install @chghealthcare/unified-design-system react react-dom
```

4. Import styles once at the app root:

```ts
import "@chghealthcare/unified-design-system/styles.css"
```

Example import:

```tsx
import { AppShell, Menu, Button } from "@chghealthcare/unified-design-system"
```

## Other distribution channels

| Channel | Workflow / command | Registry |
|--------|---------------------|----------|
| **GitHub Packages** | `publish-github-packages.yml` | `npm.pkg.github.com` |
| **npmjs** (optional) | `publish-npm.yml` + `NPM_TOKEN` | `registry.npmjs.org` |
| **Tarball** | `npm pack` | Local `.tgz` |

The npmjs workflow passes `--registry https://registry.npmjs.org` explicitly. `package.json` `publishConfig.registry` defaults to GitHub Packages.
