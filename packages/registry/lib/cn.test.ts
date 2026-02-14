import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  describe('basic functionality', () => {
    it('should join multiple class names', () => {
      expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz');
    });

    it('should return single class name', () => {
      expect(cn('foo')).toBe('foo');
    });

    it('should return empty string for no arguments', () => {
      expect(cn()).toBe('');
    });
  });

  describe('falsy value filtering', () => {
    it('should filter out false values', () => {
      expect(cn('foo', false, 'bar')).toBe('foo bar');
    });

    it('should filter out undefined values', () => {
      expect(cn('foo', undefined, 'bar')).toBe('foo bar');
    });

    it('should filter out null values', () => {
      expect(cn('foo', null, 'bar')).toBe('foo bar');
    });

    it('should filter out empty strings', () => {
      expect(cn('foo', '', 'bar')).toBe('foo bar');
    });
  });

  describe('conditional class names', () => {
    it('should include class when condition is true', () => {
      const isActive = true;
      expect(cn('base', isActive && 'active')).toBe('base active');
    });

    it('should exclude class when condition is false', () => {
      const isActive = false;
      expect(cn('base', isActive && 'active')).toBe('base');
    });

    it('should handle multiple conditions', () => {
      const isPrimary = true;
      const isLarge = false;
      const isDisabled = true;

      expect(
        cn(
          'button',
          isPrimary && 'primary',
          isLarge && 'large',
          isDisabled && 'disabled'
        )
      ).toBe('button primary disabled');
    });
  });

  describe('real-world usage patterns', () => {
    it('should work with CSS module style objects', () => {
      const styles = {
        button: 'Button_button__abc123',
        primary: 'Button_primary__def456',
        loading: 'Button_loading__ghi789',
      };

      const isLoading = true;
      const result = cn(
        styles.button,
        styles.primary,
        isLoading && styles.loading
      );

      expect(result).toBe(
        'Button_button__abc123 Button_primary__def456 Button_loading__ghi789'
      );
    });
  });
});
