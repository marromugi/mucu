import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn utility', () => {
  describe('basic functionality', () => {
    it('should join multiple class names', () => {
      expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz')
    })

    it('should return single class name', () => {
      expect(cn('foo')).toBe('foo')
    })

    it('should return empty string for no arguments', () => {
      expect(cn()).toBe('')
    })
  })

  describe('falsy value filtering', () => {
    it('should filter out false values', () => {
      expect(cn('foo', false, 'bar')).toBe('foo bar')
    })

    it('should filter out undefined values', () => {
      expect(cn('foo', undefined, 'bar')).toBe('foo bar')
    })

    it('should filter out null values', () => {
      expect(cn('foo', null, 'bar')).toBe('foo bar')
    })
  })

  describe('conditional class names', () => {
    it('should include class when condition is true', () => {
      const isActive = true
      expect(cn('base', isActive && 'active')).toBe('base active')
    })

    it('should exclude class when condition is false', () => {
      const isActive = false
      expect(cn('base', isActive && 'active')).toBe('base')
    })

    it('should handle multiple conditions', () => {
      const isPrimary = true
      const isLarge = false
      const isDisabled = true

      expect(
        cn(
          'button',
          isPrimary && 'primary',
          isLarge && 'large',
          isDisabled && 'disabled'
        )
      ).toBe('button primary disabled')
    })
  })

  describe('tailwind-merge integration', () => {
    it('should resolve conflicting tailwind classes', () => {
      expect(cn('px-2', 'px-4')).toBe('px-4')
    })

    it('should resolve conflicting background colors', () => {
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
    })

    it('should keep non-conflicting classes', () => {
      expect(cn('px-2', 'py-4')).toBe('px-2 py-4')
    })

    it('should handle className override pattern', () => {
      const baseClasses = 'rounded-md bg-primary-500 text-white'
      const userClasses = 'bg-alert-600 rounded-lg'
      expect(cn(baseClasses, userClasses)).toBe(
        'text-white bg-alert-600 rounded-lg'
      )
    })
  })

  describe('clsx object/array syntax', () => {
    it('should support object syntax', () => {
      expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
    })

    it('should support array syntax', () => {
      expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
    })

    it('should support nested arrays', () => {
      expect(cn(['foo', ['bar', 'baz']])).toBe('foo bar baz')
    })
  })
})
