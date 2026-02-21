import { forwardRef } from 'react'
import { spinnerVariants } from './const'
import type { SpinnerOwnProps } from './type'

export const Spinner = forwardRef<
  SVGSVGElement,
  SpinnerOwnProps & React.SVGProps<SVGSVGElement>
>(({ size, label = 'Loading', className, ...props }, ref) => {
  const { root, circle } = spinnerVariants({ size })

  return (
    <svg
      ref={ref}
      className={root({ className })}
      viewBox="0 0 50 50"
      role="status"
      aria-label={label}
      fill="none"
      {...props}
    >
      <title>{label}</title>
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        className={circle()}
      />
    </svg>
  )
})

Spinner.displayName = 'Spinner'
