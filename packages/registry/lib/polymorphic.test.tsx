import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import * as React from 'react'
import { polymorphicComponent } from './polymorphic'
import type { PolymorphicProps } from './polymorphic'

type TestOwnProps = { label: string }

const TestComponent = polymorphicComponent<'div', TestOwnProps>(
  ({ as, label, ref, ...props }) => {
    const Component = as || 'div'
    return (
      <Component ref={ref} {...props}>
        {label}
      </Component>
    )
  }
)
TestComponent.displayName = 'TestComponent'

describe('polymorphicComponent', () => {
  it('renders default element', () => {
    const { container } = render(<TestComponent label="hello" />)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('renders as different element', () => {
    const { container } = render(
      <TestComponent as="section" label="hello" />
    )
    expect(container.firstChild?.nodeName).toBe('SECTION')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<TestComponent ref={ref} label="hello" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('passes through HTML attributes', () => {
    const { container } = render(
      <TestComponent label="hello" id="test-id" role="region" />
    )
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute('id')).toBe('test-id')
    expect(el.getAttribute('role')).toBe('region')
  })
})
