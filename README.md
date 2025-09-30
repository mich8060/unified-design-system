# 📦 CHG Design System (`chg-design-system`)

The CHG Healthcare Design System is a **scalable, unified framework** for creating consistent, accessible, and efficient user experiences across all CHG products.

---

## 🚀 Installation

```bash
npm install @chghealthcare/chg-design-system
```

---

## 📖 Usage

### 1. Import SCSS Tokens
```scss
@use "@chghealthcare/chg-design-system/scss/variables" as *;

.my-button {
  background: $uds-color-primary-500;
  border-radius: $uds-radius-md;
}
```

### 2. Import CSS Custom Properties
```scss
@import "@chghealthcare/chg-design-system/scss/css-vars";

.my-button {
  background: var(--uds-color-primary-500);
  border-radius: var(--uds-radius-md);
}
```

---

## 🔄 Syncing with Figma

This package stays in sync with Figma design tokens.

- **Manual sync**:
  ```bash
  npm run pull:figma   # fetch tokens from Figma API
  npm run build:tokens # build SCSS + CSS vars
  ```

- **Automated sync**:
  A GitHub Action (`.github/workflows/figma-sync.yml`) automatically updates tokens whenever changes are published in Figma.

---

## 📂 Project Structure

```
chg-design-system/
├── src/
│   └── scss/
│       ├── _variables.scss   # Generated SCSS tokens
│       └── css-vars.scss     # Generated CSS variables
├── scripts/
│   ├── fetch-figma.js        # Pull raw tokens from Figma
│   └── build-scss.js         # Transform JSON → SCSS + CSS
├── tokens/                   # Raw JSON dumps from Figma
├── .github/workflows/        # GitHub Actions for sync
└── package.json
```

---

## 🛠 Development

Clone the repo:

```bash
git clone https://github.com/chghealthcare/chg-design-system.git
cd chg-design-system
npm install
```

### Pull from Figma
```bash
npm run pull:figma
```

### Rebuild SCSS & CSS
```bash
npm run build:tokens
```

### Debugging
Set `DEBUG=1` in your `.env` to output detailed reports:
```bash
DEBUG=1 npm run pull:figma
```

---

## 🔒 Environment Variables

Add these to your `.env`:

```ini
FIGMA_TOKEN=your-figma-pat
FIGMA_FILE_ID=your-figma-file-id
FIGMA_WEBHOOK_SECRET=your-webhook-secret
```

---

## 📌 Roadmap

- [ ] Add semantic tokens
- [ ] Add theming modes
- [ ] Publish React components
- [ ] Improve documentation site
