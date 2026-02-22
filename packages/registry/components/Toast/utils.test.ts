import { describe, it, expect } from 'vitest'
import { isValidElement } from 'react'
import { getToastMotionProps, generateToastId, getIcon } from './utils'
import type { ToastPosition, ToastType } from './type'

describe('getToastMotionProps', () => {
  const positions: ToastPosition[] = [
    'top-right',
    'top-left',
    'top-center',
    'bottom-right',
    'bottom-left',
    'bottom-center',
  ]

  it.each(positions)('returns motion props for %s', (position) => {
    const props = getToastMotionProps(position)
    expect(props).toHaveProperty('initial')
    expect(props).toHaveProperty('animate')
    expect(props).toHaveProperty('exit')
    expect(props).toHaveProperty('transition')
  })

  it('sets positive x for right positions', () => {
    const props = getToastMotionProps('top-right')
    expect(props.initial.x).toBe(20)
    expect(props.exit.x).toBe(20)
  })

  it('sets negative x for left positions', () => {
    const props = getToastMotionProps('top-left')
    expect(props.initial.x).toBe(-20)
    expect(props.exit.x).toBe(-20)
  })

  it('sets zero x for center positions', () => {
    const props = getToastMotionProps('top-center')
    expect(props.initial.x).toBe(0)
    expect(props.exit.x).toBe(0)
  })

  it('sets negative y for top positions', () => {
    const props = getToastMotionProps('top-right')
    expect(props.initial.y).toBe(-20)
  })

  it('sets positive y for bottom positions', () => {
    const props = getToastMotionProps('bottom-right')
    expect(props.initial.y).toBe(20)
  })

  it('animates to origin', () => {
    const props = getToastMotionProps('top-right')
    expect(props.animate).toEqual({ opacity: 1, x: 0, y: 0, scale: 1 })
  })

  it('uses spring transition', () => {
    const props = getToastMotionProps('top-right')
    expect(props.transition.type).toBe('spring')
    expect(props.transition.stiffness).toBe(400)
    expect(props.transition.damping).toBe(25)
    expect(props.transition.mass).toBe(0.8)
  })
})

describe('generateToastId', () => {
  it('returns string with toast- prefix', () => {
    const id = generateToastId()
    expect(id).toMatch(/^toast-/)
  })

  it('generates unique ids', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateToastId()))
    expect(ids.size).toBe(100)
  })
})

describe('getIcon', () => {
  it.each<ToastType>(['success', 'error', 'warning', 'info'])(
    'returns valid ReactElement for %s',
    (type) => {
      const icon = getIcon(type)
      expect(isValidElement(icon)).toBe(true)
    }
  )

  it('returns null for default type', () => {
    expect(getIcon('default')).toBeNull()
  })
})
