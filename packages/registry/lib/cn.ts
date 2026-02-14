/**
 * Utility for conditionally joining class names together.
 * A minimal, zero-dependency alternative to clsx/classnames.
 *
 * @example
 * cn('base', condition && 'conditional', 'always')
 * // => 'base conditional always' (if condition is true)
 * // => 'base always' (if condition is false)
 */
export function cn(
  ...inputs: (string | boolean | undefined | null)[]
): string {
  return inputs.filter(Boolean).join(' ');
}
