import { describe, it, expect } from 'vitest';
import { toPascalCase, toLabel } from './name-utils.js';

describe('name-utils', () => {
  describe('toPascalCase', () => {
    it.each([
      ['arrow-up.svg', 'ArrowUp'],
      ['add-fill.svg', 'AddFill'],
      ['arrow_left.svg', 'ArrowLeft'],
      ['home.svg', 'Home'],
      ['my-icon-name.svg', 'MyIconName'],
      ['UPPER.svg', 'Upper'],
      ['check-circle-fill.svg', 'CheckCircleFill'],
    ])('should convert %s to %s', (input, expected) => {
      expect(toPascalCase(input)).toBe(expected);
    });

    it('should handle file names without extension', () => {
      expect(toPascalCase('arrow-up')).toBe('ArrowUp');
    });
  });

  describe('toLabel', () => {
    it.each([
      ['ArrowUp', 'Arrow Up'],
      ['AddFill', 'Add Fill'],
      ['Home', 'Home'],
      ['CheckCircleFill', 'Check Circle Fill'],
      ['A', 'A'],
    ])('should convert %s to "%s"', (input, expected) => {
      expect(toLabel(input)).toBe(expected);
    });

    it('should remove Icon suffix', () => {
      expect(toLabel('ArrowIcon')).toBe('Arrow');
      expect(toLabel('HomeIcon')).toBe('Home');
    });
  });
});
