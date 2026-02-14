import { describe, it, expect } from 'vitest';
import { generateComponentCode, generateIndexCode } from './template.js';

describe('template', () => {
  describe('generateComponentCode', () => {
    const validSvg =
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4L4 12H9V20H15V12H20L12 4Z" fill="currentColor"/></svg>';

    it('should generate valid React component with imports', () => {
      const code = generateComponentCode('ArrowUp', 'Arrow Up', validSvg);

      expect(code).toContain("import type { SVGProps } from 'react'");
    });

    it('should export named component', () => {
      const code = generateComponentCode('ArrowUp', 'Arrow Up', validSvg);

      expect(code).toContain('export const ArrowUp');
    });

    it('should include aria-label for accessibility', () => {
      const code = generateComponentCode('ArrowUp', 'Arrow Up', validSvg);

      expect(code).toContain('aria-label="Arrow Up"');
    });

    it('should include title element', () => {
      const code = generateComponentCode('ArrowUp', 'Arrow Up', validSvg);

      expect(code).toContain('<title>Arrow Up</title>');
    });

    it('should spread props onto svg element', () => {
      const code = generateComponentCode('ArrowUp', 'Arrow Up', validSvg);

      expect(code).toContain('{...props}');
    });

    it('should preserve SVG attributes', () => {
      const code = generateComponentCode('ArrowUp', 'Arrow Up', validSvg);

      expect(code).toContain('width="24"');
      expect(code).toContain('height="24"');
      expect(code).toContain('viewBox="0 0 24 24"');
    });

    it('should throw error for invalid SVG format', () => {
      expect(() => generateComponentCode('Test', 'Test', 'not a valid svg')).toThrow(
        'Invalid SVG format'
      );
    });

    it('should throw error for empty string', () => {
      expect(() => generateComponentCode('Test', 'Test', '')).toThrow('Invalid SVG format');
    });

    it('should handle SVG with multiple elements', () => {
      const multiElementSvg =
        '<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 4"/></svg>';
      const code = generateComponentCode('MultiElement', 'Multi Element', multiElementSvg);

      expect(code).toContain('<circle');
      expect(code).toContain('<path');
    });
  });

  describe('generateIndexCode', () => {
    it('should generate alphabetically sorted exports', () => {
      const code = generateIndexCode(['Zebra', 'Apple', 'Banana']);

      const lines = code.trim().split('\n');
      expect(lines[0]).toContain('Apple');
      expect(lines[1]).toContain('Banana');
      expect(lines[2]).toContain('Zebra');
    });

    it('should use named exports', () => {
      const code = generateIndexCode(['ArrowUp']);

      expect(code).toContain("export { ArrowUp } from './ArrowUp'");
    });

    it('should handle single component', () => {
      const code = generateIndexCode(['OnlyOne']);

      expect(code).toBe("export { OnlyOne } from './OnlyOne';\n");
    });

    it('should handle empty array', () => {
      const code = generateIndexCode([]);

      expect(code).toBe('\n');
    });

    it('should be case-insensitive when sorting', () => {
      const code = generateIndexCode(['apple', 'Apple', 'APPLE']);

      // All should be present
      expect(code).toContain('apple');
      expect(code).toContain('Apple');
      expect(code).toContain('APPLE');
    });
  });
});
