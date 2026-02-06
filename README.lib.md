# @chg/uds-components

CHG Healthcare Unified Design System - React Component Library

## Installation

```bash
npm install @chg/uds-components
```

## Usage

```jsx
import { Button, Chip, Avatar, Badge } from "@chg/uds-components";
import "@chg/uds-components/styles.css"; // Required for component styles

function App() {
  return (
    <div>
      <Button appearance="primary">Click Me</Button>
      <Chip label="Tag" />
      <Avatar initials="JD" />
      <Badge count={5} variant="red" />
    </div>
  );
}
```

## Available Components

### Layout & Structure
- `Accordion`, `AccordionItem` - Expandable content sections
- `Card` - Content container with styling
- `Divider` - Visual separator
- `Flex` - Flexbox layout helper
- `ImageAspect` - Maintains image aspect ratios
- `Steps` - Step indicator for multi-step flows
- `Table` - Data table component
- `Tabs`, `TabItem` - Tabbed navigation

### Navigation
- `ActionMenu` - Dropdown action menu with keyboard support
- `Breadcrumb` - Navigation breadcrumbs
- `Dropdown` - Dropdown select component
- `Menu` - Navigation menu
- `Pagination` - Page navigation

### Form Controls
- `Button` - Primary interaction element
- `Checkbox` - Checkbox input
- `Chip` - Tag/filter chips
- `Datepicker` - Date selection
- `Field` - Form field wrapper
- `FileUpload` - File upload component
- `Input` - Text input field
- `PillToggle` - Toggle button group
- `Radio` - Radio button input
- `Slider` - Range slider
- `Textarea` - Multi-line text input
- `Toggle` - On/off toggle switch

### Data Display
- `Avatar` - User avatar with image or initials
- `Badge` - Notification badge
- `DotStatus` - Status dot indicator
- `Icon` - Phosphor icon wrapper
- `Key` - Keyboard shortcut display
- `ProgressCircle` - Circular progress indicator
- `ProgressIndicator` - Linear progress bar
- `Status` - Status indicator component
- `Tag` - Categorization tags

### Feedback
- `Toast` - Notification toast messages
- `Tooltip` - Hover tooltips

### Branding
- `Branding` - Logo and brand assets

## Design Tokens

The component library uses CSS custom properties (variables) for theming. Import the styles to get all design tokens:

```css
@import "@chg/uds-components/styles.css";
```

Or include them in your build:

```scss
@use "@chg/uds-components/styles.css";
```

## Peer Dependencies

This library requires:
- `react` >= 17.0.0
- `react-dom` >= 17.0.0
- `react-router-dom` (optional, only needed for Card and Breadcrumb components)

## License

MIT
