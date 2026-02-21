import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import * as React from 'react'
import { Image } from './Image'

describe('Image', () => {
  it('renders a wrapper div with an inner img', () => {
    const { container } = render(<Image alt="test" src="/test.jpg" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.tagName).toBe('DIV')
    expect(wrapper.querySelector('img')).toBeTruthy()
  })

  it('applies default radius (none) class on root', () => {
    const { container } = render(<Image alt="test" src="/test.jpg" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('rounded-none')
  })

  it('applies radius variant class on root', () => {
    const { container } = render(
      <Image alt="test" src="/test.jpg" radius="lg" />,
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('rounded-lg')
  })

  it('applies objectFit variant class on img', () => {
    const { container } = render(
      <Image alt="test" src="/test.jpg" objectFit="contain" />,
    )
    const img = container.querySelector('img')!
    expect(img).toHaveClass('object-contain')
  })

  it('applies default objectFit (cover) class on img', () => {
    const { container } = render(<Image alt="test" src="/test.jpg" />)
    const img = container.querySelector('img')!
    expect(img).toHaveClass('object-cover')
  })

  it('shows opacity-0 on img while loading', () => {
    const { container } = render(<Image alt="test" src="/test.jpg" />)
    const img = container.querySelector('img')!
    expect(img).toHaveClass('opacity-0')
  })

  it('shows opacity-100 on img after load', () => {
    const { container } = render(<Image alt="test" src="/test.jpg" />)
    const img = container.querySelector('img')!
    fireEvent.load(img)
    expect(img).toHaveClass('opacity-100')
  })

  it('renders Spinner while loading', () => {
    const { container } = render(
      <Image alt="test" src="/test.jpg" isLoading />,
    )
    const spinner = container.querySelector('svg[role="status"]')
    expect(spinner).toBeTruthy()
  })

  it('does not render Spinner after load', () => {
    const { container } = render(<Image alt="test" src="/test.jpg" />)
    const img = container.querySelector('img')!
    fireEvent.load(img)
    const spinner = container.querySelector('svg[role="status"]')
    expect(spinner).toBeFalsy()
  })

  it('renders fallback on error', () => {
    const fallback = <div data-testid="fallback">Error</div>
    const { container, getByTestId } = render(
      <Image alt="test" src="/bad.jpg" fallback={fallback} />,
    )
    const img = container.querySelector('img')
    if (img) fireEvent.error(img)
    expect(getByTestId('fallback')).toBeTruthy()
  })

  it('sets role="presentation" when alt is empty', () => {
    const { container } = render(<Image alt="" src="/test.jpg" />)
    const img = container.querySelector('img')!
    expect(img.getAttribute('role')).toBe('presentation')
  })

  it('does not set role="presentation" when alt has value', () => {
    const { container } = render(<Image alt="meaningful" src="/test.jpg" />)
    const img = container.querySelector('img')!
    expect(img.getAttribute('role')).toBeNull()
  })

  it('calls onLoad callback', () => {
    const onLoad = vi.fn()
    const { container } = render(
      <Image alt="test" src="/test.jpg" onLoad={onLoad} />,
    )
    const img = container.querySelector('img')!
    fireEvent.load(img)
    expect(onLoad).toHaveBeenCalledTimes(1)
  })

  it('calls onError callback', () => {
    const onError = vi.fn()
    const { container } = render(
      <Image alt="test" src="/bad.jpg" onError={onError} />,
    )
    const img = container.querySelector('img')!
    fireEvent.error(img)
    expect(onError).toHaveBeenCalledTimes(1)
  })

  it('merges custom className on root', () => {
    const { container } = render(
      <Image alt="test" src="/test.jpg" className="custom-class" />,
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('custom-class')
    expect(wrapper).toHaveClass('relative')
  })

  it('forwards ref to img element', () => {
    const ref = React.createRef<HTMLImageElement>()
    render(<Image ref={ref} alt="test" src="/test.jpg" />)
    expect(ref.current).toBeInstanceOf(HTMLImageElement)
  })

  it('passes through img attributes', () => {
    const { container } = render(
      <Image alt="test" src="/test.jpg" data-testid="my-image" />,
    )
    const img = container.querySelector('img')!
    expect(img.getAttribute('data-testid')).toBe('my-image')
  })

  it('applies wrapper base classes', () => {
    const { container } = render(<Image alt="test" src="/test.jpg" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('relative')
    expect(wrapper).toHaveClass('inline-flex')
    expect(wrapper).toHaveClass('overflow-hidden')
  })
})
