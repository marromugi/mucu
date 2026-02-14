# Mucu

A shadcn/ui-style React component library and CLI tool. Copy and paste beautiful, accessible components into your project.

## Features

- **CLI Tool** - Add components to your project with a single command
- **CSS Modules** - Scoped styling without CSS-in-JS runtime overhead
- **Design Tokens** - Customizable theming with CSS custom properties (light/dark mode support)
- **TypeScript** - Full type safety out of the box
- **Icon Generation** - Convert SVG files into optimized React icon components

## Installation

```bash
npm install -g mucu
# or
pnpm add -g mucu
```

## Quick Start

### Initialize Mucu in Your Project

```bash
mucu init
```

This creates a `mucu.config.json` and sets up the required directories and utilities.

### Add Components

```bash
# Interactive selection
mucu add

# Add specific components
mucu add button

# Add all components
mucu add -a
```

### List Available Components

```bash
mucu list
```

### Generate Icon Components from SVGs

```bash
mucu icon generate ./icons -o ./src/components/icons
```

## Configuration

After running `mucu init`, a `mucu.config.json` file is created:

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

### Prerequisites

- Node.js >= 20.0.0
- pnpm 10.26.1

### Setup

```bash
# Install dependencies
pnpm install

# Run development mode
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# View components in Storybook
pnpm storybook
```

### Project Structure

```
mucu/
├── packages/
│   ├── cli/          # CLI tool (mucu command)
│   └── registry/     # Component registry & Storybook
├── package.json
└── pnpm-workspace.yaml
```

## License

MIT
