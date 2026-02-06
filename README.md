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
