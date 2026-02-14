import { describe, it, expect } from 'vitest';
import { getSvgoConfig } from './converter.js';

describe('converter', () => {
  describe('getSvgoConfig', () => {
    it('should include convertColors plugin for mono type', () => {
      const config = getSvgoConfig('mono');

      const hasConvertColors = config.plugins?.some(
        (plugin) => typeof plugin === 'object' && plugin.name === 'convertColors'
      );

      expect(hasConvertColors).toBe(true);
    });

    it('should set currentColor: true for mono type', () => {
      const config = getSvgoConfig('mono');

      const convertColorsPlugin = config.plugins?.find(
        (plugin) => typeof plugin === 'object' && plugin.name === 'convertColors'
      );

      expect(convertColorsPlugin).toEqual({
        name: 'convertColors',
        params: { currentColor: true },
      });
    });

    it('should not include convertColors for fullcolor type', () => {
      const config = getSvgoConfig('fullcolor');

      const hasConvertColors = config.plugins?.some(
        (plugin) => typeof plugin === 'object' && plugin.name === 'convertColors'
      );

      expect(hasConvertColors).toBe(false);
    });

    it('should default to mono type when no argument provided', () => {
      const config = getSvgoConfig();

      const hasConvertColors = config.plugins?.some(
        (plugin) => typeof plugin === 'object' && plugin.name === 'convertColors'
      );

      expect(hasConvertColors).toBe(true);
    });

    it('should include common plugins for both types', () => {
      const monoConfig = getSvgoConfig('mono');
      const fullcolorConfig = getSvgoConfig('fullcolor');

      const commonPlugins = ['removeXMLNS', 'removeComments', 'removeMetadata'];

      for (const pluginName of commonPlugins) {
        expect(monoConfig.plugins).toContain(pluginName);
        expect(fullcolorConfig.plugins).toContain(pluginName);
      }
    });
  });
});
