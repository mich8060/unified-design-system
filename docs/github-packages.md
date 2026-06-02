# Install from GitHub Packages

Package: **`@chghealthcare/unified-design-system`**  
Repository: [chghealthcare/unified-design-system](https://github.com/chghealthcare/unified-design-system)

The npm scope **`@chghealthcare`** matches the GitHub organization, which is required for [GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).

## Publishing (maintainers)

Workflow: [`.github/workflows/publish-github-packages.yml`](../.github/workflows/publish-github-packages.yml)

1. Bump `version` in `package.json` and merge to `main`.
2. Create a **GitHub Release** for that tag (or run **Publish GitHub Package** manually).
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

In GitHub Actions, use `secrets.GITHUB_TOKEN` or a PAT with `packages: read` and the same lines.

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
