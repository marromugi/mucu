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
  utils.ts             # (optional) Helper functions used by the component
  utils.test.ts        # (optional) Unit tests for utils.ts
  hooks/               # (optional) Inner hooks directory
    index.ts           # Barrel export for hooks
    use{Hook}/
      use{Hook}.ts     # Hook implementation
      use{Hook}.test.ts # (optional) Hook unit tests
      type.ts          # Hook parameter/return types
      index.ts         # Barrel export for the hook
```

## File Responsibilities

- **{Name}.stories.tsx** - Storybook stories with `play` functions for interaction tests. Tests here should focus on user interactions and resulting behavior (click, hover, keyboard). Do NOT test attributes or class names in stories.
- **{Name}.test.tsx** - Vitest unit tests for attributes, class names, ref forwarding, polymorphic rendering, and default props. Uses `vitest` + `@testing-library/react`.
- **{Name}.tsx** - Component implementation using `polymorphicComponent` from `@/lib/polymorphic`. Imports variants from `./const` and types from `./type`.
- **const.ts** - `tv()` variant definitions from `tailwind-variants`. Exported as `{name}Variants`.
- **type.ts** - Component own props derived via `VariantProps<typeof {name}Variants>`.
- **index.ts** - Re-exports the component and its props type.
- **utils.ts** - (optional) Pure helper functions used by the component (e.g., motion props calculation, placement logic). Imports types from `./type`.
- **utils.test.ts** - (optional) Vitest unit tests for `utils.ts`.
- **hooks/use{Hook}/use{Hook}.ts** - (optional) Custom hooks encapsulating stateful logic (e.g., `useTooltip`, `usePopover`). Imports its own types from `./type`.
- **hooks/use{Hook}/type.ts** - Parameter and return types for the hook (e.g., `Use{Hook}Params`, `Use{Hook}Return`).

## Conventions

- Folder and component file names are PascalCase (e.g., `Box/Box.tsx`)
- Components use PascalCase for exports (e.g., `Box`)
- All components are polymorphic (`as` prop) with ref forwarding
- Variants use `tailwind-variants` (`tv`), not manual class mappings
- Class merging is handled by `tv()` via the `className` parameter
- Storybook titles follow `Components/{ComponentName}`
- Animations use `motion/react` (`motion`, `AnimatePresence`) — not CSS transitions or raw keyframes
- Keep components thin — extract stateful logic into `hooks/`, pure logic into `utils.ts`, so they can be tested independently without rendering
