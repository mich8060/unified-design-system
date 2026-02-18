# CHG Design System (UDS)

A unified design system for CHG Healthcare brands, featuring React components, design tokens synced from Figma, and comprehensive documentation.

## Overview

This design system provides:

- **40+ React Components** — Fully styled, accessible UI components
- **Design Tokens** — Colors, spacing, typography, and more synced directly from Figma
- **Multi-Brand Support** — Theming for CompHealth, Connect, LocumSmart, Modio, and Weatherby
- **Figma Code Connect** — Bridge between design and development
- **Documentation Site** — Interactive component demos and usage guidelines

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the documentation site
npm start
```

The development server runs at [http://localhost:3000](http://localhost:3000).

## Available Scripts

### Development

| Command | Description |
|---------|-------------|
| `npm start` | Start the documentation site in development mode |
| `npm test` | Run tests in watch mode |
| `npm run sass:watch` | Watch and compile SCSS files |

### Design Tokens

| Command | Description |
|---------|-------------|
| `npm run tokens:generate` | Fetch and generate tokens from Figma |
| `npm run tokens:validate` | Validate token references |
| `npm run tokens:compile` | Compile SCSS tokens to CSS |
| `npm run tokens:watch` | Watch and compile token changes |

### Library Build

| Command | Description |
|---------|-------------|
| `npm run build:lib` | Build the component library for distribution |
| `npm run build:lib:watch` | Build library in watch mode |
| `npm run publish:lib` | Publish the library package |

### Figma Code Connect

| Command | Description |
|---------|-------------|
| `npm run codeconnect:publish` | Publish Code Connect mappings to Figma |
| `npm run codeconnect:unpublish` | Remove Code Connect mappings |

### Production

| Command | Description |
|---------|-------------|
| `npm run build` | Build the documentation site for production |

## Project Structure

```
├── src/
│   ├── ui/                    # Component library
│   │   ├── Accordion/
│   │   ├── Button/
│   │   ├── Card/
│   │   └── ...
│   ├── pages/                 # Documentation pages
│   ├── styles/                # Global styles and tokens
│   │   ├── _variables.scss    # Generated Figma variables
│   │   ├── tokens.scss        # CSS custom properties
│   │   └── _typography.scss   # Typography utilities
│   └── assets/                # Images and static assets
├── scripts/
│   ├── index.js               # Token generation script
│   ├── validate.js            # Token validation
│   └── publish-lib.js         # Library publishing
├── dist/                      # Built library output
└── build/                     # Built documentation site
```

## Components

The design system includes a comprehensive set of components:

**Form Controls:** Button, Checkbox, Datepicker, Dropdown, Field, FileUpload, Input, Radio, Slider, Textarea, Toggle

**Data Display:** Accordion, Avatar, Badge, Card, Chip, DotStatus, Icon, ImageAspect, Key, Status, Table, Tag, Tooltip

**Navigation:** ActionMenu, Breadcrumb, Menu, Pagination, PillToggle, Steps, Tabs

**Feedback:** ProgressCircle, ProgressIndicator, Toast

**Layout:** Divider, Flex

## Design Tokens

Tokens are synced from Figma and include:

- **Colors** — Brand colors, semantic colors, neutrals
- **Spacing** — Consistent spacing scale
- **Typography** — Font families, sizes, weights, line heights
- **Border Radius** — Corner radius values
- **Shadows** — Elevation and depth
- **Animation** — Timing and duration values

### Syncing Tokens from Figma

1. Create a `.env` file with your Figma credentials:

```env
FIGMA_ACCESS_TOKEN=your_figma_token
FIGMA_FILE_KEY=your_file_key
```

2. Run the token generation script:

```bash
npm run tokens:generate
```

## Using the Component Library

### Installation in Your Project

```bash
npm install @chg/uds-components
```

### Usage

```jsx
import { Button, Card, Input } from '@chg/uds-components';
import '@chg/uds-components/styles.css';

function App() {
  return (
    <Card>
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## AI Context Files

Every component in the design system ships with a dedicated `.ai.md` file that provides structured, AI-friendly documentation. These files are the fastest way for any AI assistant to understand a component's API, usage patterns, and constraints.

### File Location

All AI context files follow a predictable convention:

```
src/ui/<ComponentName>/<ComponentName>.ai.md
```

To discover every available file, glob for `src/ui/**/*.ai.md`.

### What Each File Contains

| Section | Description |
|---------|-------------|
| **When to Use** | The component's intended purpose and scenarios |
| **Props** | Full props table with types, defaults, and accepted values |
| **Examples** | Code snippets from basic usage to advanced composition |
| **Composition** | How the component works alongside other components |
| **Do's and Don'ts** | Common pitfalls and best practices |
| **Accessibility** | ARIA roles, keyboard interaction, and screen reader notes |

### How to Use (for AI Agents)

1. **Before writing code that uses a component**, read its `.ai.md` file. It contains the exact prop names, valid values, and import paths you need.
2. **When combining components**, read the `.ai.md` for each one. The "Composition" sections describe how they interoperate (e.g., `Field` wrapping `Input`, `Table` rendering `Tag` cells).
3. **When choosing between components**, compare the "When to Use" sections across candidates (e.g., `Chip` vs `Tag` vs `Badge`).
4. **When styling**, check the `.ai.md` for documented CSS class names and design token references, then consult `src/styles/tokens.css` for token values.

### Complete File Manifest

| Component | Path |
|-----------|------|
| Accordion | `src/ui/Accordion/Accordion.ai.md` |
| ActionMenu | `src/ui/ActionMenu/ActionMenu.ai.md` |
| Avatar | `src/ui/Avatar/Avatar.ai.md` |
| Badge | `src/ui/Badge/Badge.ai.md` |
| Branding | `src/ui/Branding/Branding.ai.md` |
| Breadcrumb | `src/ui/Breadcrumb/Breadcrumb.ai.md` |
| Button | `src/ui/Button/Button.ai.md` |
| Calendar | `src/ui/Calendar/Calendar.ai.md` |
| Card | `src/ui/Card/Card.ai.md` |
| Checkbox | `src/ui/Checkbox/Checkbox.ai.md` |
| Chip | `src/ui/Chip/Chip.ai.md` |
| CopyButton | `src/ui/CopyButton/CopyButton.ai.md` |
| Datepicker | `src/ui/Datepicker/Datepicker.ai.md` |
| Divider | `src/ui/Divider/Divider.ai.md` |
| DotStatus | `src/ui/DotStatus/DotStatus.ai.md` |
| Dropdown | `src/ui/Dropdown/Dropdown.ai.md` |
| EventCard | `src/ui/EventCard/EventCard.ai.md` |
| Field | `src/ui/Field/Field.ai.md` |
| FileUpload | `src/ui/FileUpload/FileUpload.ai.md` |
| Flex | `src/ui/Flex/Flex.ai.md` |
| Icon | `src/ui/Icon/Icon.ai.md` |
| ImageAspect | `src/ui/ImageAspect/ImageAspect.ai.md` |
| Input | `src/ui/Input/Input.ai.md` |
| Key | `src/ui/Key/Key.ai.md` |
| Menu | `src/ui/Menu/Menu.ai.md` |
| MicroCalendar | `src/ui/MicroCalendar/MicroCalendar.ai.md` |
| Modal | `src/ui/Modal/Modal.ai.md` |
| Pagination | `src/ui/Pagination/Pagination.ai.md` |
| PillToggle | `src/ui/PillToggle/PillToggle.ai.md` |
| Playground | `src/ui/Playground/Playground.ai.md` |
| ProgressCircle | `src/ui/ProgressCircle/ProgressCircle.ai.md` |
| ProgressIndicator | `src/ui/ProgressIndicator/ProgressIndicator.ai.md` |
| Radio | `src/ui/Radio/Radio.ai.md` |
| Slider | `src/ui/Slider/Slider.ai.md` |
| Status | `src/ui/Status/Status.ai.md` |
| Steps | `src/ui/Steps/Steps.ai.md` |
| Table | `src/ui/Table/Table.ai.md` |
| Tabs | `src/ui/Tabs/Tabs.ai.md` |
| Tag | `src/ui/Tag/Tag.ai.md` |
| Textarea | `src/ui/Textarea/Textarea.ai.md` |
| Toast | `src/ui/Toast/Toast.ai.md` |
| Toggle | `src/ui/Toggle/Toggle.ai.md` |
| Tooltip | `src/ui/Tooltip/Tooltip.ai.md` |

### Key Conventions

- **Design tokens** — All styling uses CSS custom properties prefixed `--uds-` (colors, spacing, typography, radius, shadows, animation). See `src/styles/tokens.css`.
- **BEM class naming** — Components use `uds-<component>`, `uds-<component>__<element>`, `uds-<component>--<modifier>`.
- **Icons** — Use the `Icon` component with Phosphor icon names: `<Icon name="House" size={20} />`. All [Phosphor icons](https://phosphoricons.com/) are available.
- **Form fields** — Always wrap inputs with `<Field>` for labels, validation messages, and helper text.
- **Multi-brand** — The system supports multiple CHG brands. Tokens adapt automatically when the brand attribute changes.

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure tests pass and components render correctly
4. Submit a pull request

## License

See [LICENSE](./LICENSE) for details.
