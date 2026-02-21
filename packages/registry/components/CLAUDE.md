# Components Directory Structure

Each component follows this file structure:

```
components/{Name}/
  {Name}.stories.tsx   # Storybook stories + interaction tests (play functions)
  {Name}.test.tsx      # Vitest unit tests
  {Name}.tsx           # Component implementation
  const.ts             # Variants defined with tailwind-variants (tv)
  type.ts              # Props type derived from VariantProps
  index.ts             # Barrel export (component + types)
```

## File Responsibilities

- **{Name}.stories.tsx** - Storybook stories with `play` functions for interaction tests. Uses `expect` from `storybook/test`.
- **{Name}.test.tsx** - Vitest unit tests for internal behavior (ref forwarding, polymorphic rendering, default props). Uses `vitest` + `@testing-library/react`.
- **{Name}.tsx** - Component implementation using `polymorphicComponent` from `@/lib/polymorphic`. Imports variants from `./const` and types from `./type`.
- **const.ts** - `tv()` variant definitions from `tailwind-variants`. Exported as `{name}Variants`.
- **type.ts** - Component own props derived via `VariantProps<typeof {name}Variants>`.
- **index.ts** - Re-exports the component and its props type.

## Conventions

- Folder and component file names are PascalCase (e.g., `Box/Box.tsx`)
- Components use PascalCase for exports (e.g., `Box`)
- All components are polymorphic (`as` prop) with ref forwarding
- Variants use `tailwind-variants` (`tv`), not manual class mappings
- Class merging is handled by `tv()` via the `className` parameter
- Storybook titles follow `Components/{ComponentName}`
