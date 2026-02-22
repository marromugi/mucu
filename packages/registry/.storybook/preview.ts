import type { Preview } from '@storybook/react-vite'
import { withThemeByDataAttribute } from '@storybook/addon-themes'
import '../styles/globals.css'

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      /*
       * Axe's context parameter
       * See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#context-parameter
       * to learn more. Typically, this is the CSS selector for the part of the DOM you want to analyze.
       */
      context: 'body',
      /*
       * Axe's configuration
       * See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axeconfigure
       * to learn more about the available properties.
       */
      config: {},
      /*
       * Axe's options parameter
       * See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter
       * to learn more about the available options.
       */
      options: {
        runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
  initialGlobals: {
    a11y: {
      // Optional flag to prevent the automatic check
      manual: true,
    },
  },
}

export default preview
