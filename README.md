# Mucu

[English](./README.md) | [日本語](./README-jp.md)

Copy-paste React components styled with Tailwind CSS. Own your UI code.

## Features

- **Copy-paste** - Components live in your project, not `node_modules`
- **Tailwind CSS 4** - Styled with `tailwind-variants` and CSS custom properties
- **TypeScript** - Full type safety with polymorphic `as` prop
- **Dark mode** - Design tokens with `data-theme` attribute
- **Animations** - Built with `motion/react`
- **Icon generation** - Convert SVGs to React components via CLI

## Installation

```bash
pnpm add -g mucu
```

## Quick Start

```bash
# Initialize in your project
mucu init

# Add a component
mucu add button

# Add multiple components
mucu add toast tooltip popover
```

Components are copied to your project and ready to import:

```tsx
import { Button } from "@/components/ui/Button";

export default function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}
```

## Components

| Category   | Components                                       |
| ---------- | ------------------------------------------------ |
| Layout     | `Box` `Image`                                    |
| Form       | `TextField` `TextArea` `Checkbox` `RadioGroup`   |
| Actions    | `Button` `ButtonBase`                            |
| Feedback   | `Spinner` `Toast` `Tooltip` `Popover`            |
| Navigation | `Tab` `Calendar` `Menu`                          |

## CLI

```bash
mucu init                              # Set up config + utilities
mucu add [components...]               # Add components (interactive if no args)
mucu add -a                            # Add all components
mucu list                              # List available components
mucu icon generate <input> -o <output> # SVG to React icon components
```

## Configuration

`mucu.config.json`

```json
{
  "componentsDir": "src/components/ui",
  "libDir": "src/lib",
  "stylesDir": "src/styles",
  "iconsDir": "src/components/icons",
  "typescript": true,
  "aliases": {
    "components": "@/components/ui",
    "lib": "@/lib",
    "icons": "@/components/icons"
  }
}
```

## Development

```bash
pnpm install          # Install dependencies
pnpm dev              # Development mode
pnpm build            # Build all packages
pnpm test             # Run tests
pnpm storybook        # View components in Storybook
```

```
packages/
├── cli/          # CLI tool (mucu command)
└── registry/     # Component registry + Storybook
```

## Tech Stack

React 19 / TypeScript 5 / Tailwind CSS 4 / tailwind-variants / motion/react / Storybook 10 / Vitest / Playwright / pnpm

## License

MIT
