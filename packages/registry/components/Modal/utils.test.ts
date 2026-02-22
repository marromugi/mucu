import { describe, expect, it } from 'vitest'
import { getContentMotionProps, getOverlayMotionProps } from './utils'

describe('getOverlayMotionProps', () => {
  it('initial: opacity=0', () => {
    const props = getOverlayMotionProps()
    expect(props.initial).toEqual({ opacity: 0 })
  })

  it('animate: opacity=1', () => {
    const props = getOverlayMotionProps()
    expect(props.animate).toEqual({ opacity: 1 })
  })

  it('exit: opacity=0', () => {
    const props = getOverlayMotionProps()
    expect(props.exit).toEqual({ opacity: 0 })
  })

  it('transition: duration=0.2', () => {
    const props = getOverlayMotionProps()
    expect(props.transition).toEqual({ duration: 0.2 })
  })
})

describe('getContentMotionProps', () => {
  it('initial: opacity=0, scale=0.95, y=10', () => {
    const props = getContentMotionProps()
    expect(props.initial).toEqual({ opacity: 0, scale: 0.95, y: 10 })
  })

  it('animate: opacity=1, scale=1, y=0', () => {
    const props = getContentMotionProps()
    expect(props.animate).toEqual({ opacity: 1, scale: 1, y: 0 })
  })

  it('exit: opacity=0, scale=0.95, y=10', () => {
    const props = getContentMotionProps()
    expect(props.exit).toEqual({ opacity: 0, scale: 0.95, y: 10 })
  })

  it('transition: duration=0.2, ease=easeOut', () => {
    const props = getContentMotionProps()
    expect(props.transition).toEqual({ duration: 0.2, ease: 'easeOut' })
  })
})
