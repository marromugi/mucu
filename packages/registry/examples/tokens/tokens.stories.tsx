import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ColorScale } from './color-swatch';
import styles from './tokens.module.css';

const SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/* ----------------------------------------------------------------
   Scale Colors
   ---------------------------------------------------------------- */

const ScaleColors: React.FC = () => (
  <div>
    <ColorScale name="Primary" prefix="primary" steps={SCALE_STEPS} />
    <ColorScale name="Alert" prefix="alert" steps={SCALE_STEPS} />
    <ColorScale name="Success" prefix="success" steps={SCALE_STEPS} />
    <ColorScale name="Warning" prefix="warning" steps={SCALE_STEPS} />
  </div>
);

export const ScaleColorStory: StoryObj = {
  name: 'Scale Colors',
  render: () => <ScaleColors />,
};

/* ----------------------------------------------------------------
   Semantic Colors
   ---------------------------------------------------------------- */

const SEMANTIC_COLORS = [
  { label: 'Background', variable: '--color-background' },
  { label: 'Container', variable: '--color-container' },
  { label: 'Surface', variable: '--color-surface' },
  { label: 'Overlay', variable: '--color-overlay' },
  { label: 'Text Body', variable: '--color-text-body' },
  { label: 'Text Description', variable: '--color-text-description' },
  { label: 'Text Link', variable: '--color-text-link' },
  { label: 'Text Primary', variable: '--color-text-primary' },
  { label: 'Text Alert', variable: '--color-text-alert' },
  { label: 'Text Success', variable: '--color-text-success' },
  { label: 'Text Warning', variable: '--color-text-warning' },
  { label: 'On Primary', variable: '--color-on-primary' },
  { label: 'On Alert', variable: '--color-on-alert' },
  { label: 'On Success', variable: '--color-on-success' },
  { label: 'On Warning', variable: '--color-on-warning' },
  { label: 'Disabled BG', variable: '--color-disabled-bg' },
  { label: 'Disabled Text', variable: '--color-disabled-text' },
  { label: 'Focus', variable: '--color-focus' },
  { label: 'Divider', variable: '--color-divider' },
  { label: 'Outline', variable: '--color-outline' },
];

const SemanticColors: React.FC = () => (
  <div className={styles.semanticGrid}>
    {SEMANTIC_COLORS.map(({ label, variable }) => (
      <div key={variable} className={styles.semanticSwatch}>
        <div
          className={styles.semanticPreview}
          style={{ backgroundColor: `var(${variable})` }}
        />
        <div className={styles.semanticInfo}>
          <span className={styles.semanticLabel}>{label}</span>
          <code className={styles.semanticVar}>{variable}</code>
        </div>
      </div>
    ))}
  </div>
);

export const SemanticColorStory: StoryObj = {
  name: 'Semantic Colors',
  render: () => <SemanticColors />,
};

/* ----------------------------------------------------------------
   Spacing
   ---------------------------------------------------------------- */

const SPACING_TOKENS = [
  { name: '--space-0', value: '0rem' },
  { name: '--space-px', value: '1px' },
  { name: '--space-0\\.5', value: '0.125rem' },
  { name: '--space-1', value: '0.25rem' },
  { name: '--space-1\\.5', value: '0.375rem' },
  { name: '--space-2', value: '0.5rem' },
  { name: '--space-2\\.5', value: '0.625rem' },
  { name: '--space-3', value: '0.75rem' },
  { name: '--space-3\\.5', value: '0.875rem' },
  { name: '--space-4', value: '1rem' },
  { name: '--space-5', value: '1.25rem' },
  { name: '--space-6', value: '1.5rem' },
  { name: '--space-8', value: '2rem' },
  { name: '--space-10', value: '2.5rem' },
  { name: '--space-12', value: '3rem' },
  { name: '--space-16', value: '4rem' },
  { name: '--space-20', value: '5rem' },
  { name: '--space-24', value: '6rem' },
  { name: '--space-32', value: '8rem' },
];

const Spacing: React.FC = () => (
  <div>
    {SPACING_TOKENS.map(({ name, value }) => (
      <div key={name} className={styles.spacingRow}>
        <code className={styles.spacingLabel}>{name}</code>
        <div className={styles.spacingBar} style={{ width: `var(${name})` }} />
        <span className={styles.spacingValue}>{value}</span>
      </div>
    ))}
  </div>
);

export const SpacingStory: StoryObj = {
  name: 'Spacing',
  render: () => <Spacing />,
};

/* ----------------------------------------------------------------
   Sizes
   ---------------------------------------------------------------- */

const SIZE_TOKENS = [
  { name: '--size-4', value: '1rem' },
  { name: '--size-5', value: '1.25rem' },
  { name: '--size-6', value: '1.5rem' },
  { name: '--size-8', value: '2rem' },
  { name: '--size-10', value: '2.5rem' },
  { name: '--size-12', value: '3rem' },
  { name: '--size-16', value: '4rem' },
  { name: '--size-20', value: '5rem' },
  { name: '--size-24', value: '6rem' },
  { name: '--size-32', value: '8rem' },
  { name: '--size-40', value: '10rem' },
  { name: '--size-48', value: '12rem' },
];

const Sizes: React.FC = () => (
  <div>
    {SIZE_TOKENS.map(({ name, value }) => (
      <div key={name} className={styles.sizeRow}>
        <code className={styles.sizeLabel}>{name}</code>
        <div className={styles.sizeBox} style={{ width: `var(${name})` }} />
        <span className={styles.sizeValue}>{value}</span>
      </div>
    ))}
  </div>
);

export const SizeStory: StoryObj = {
  name: 'Sizes',
  render: () => <Sizes />,
};

/* ----------------------------------------------------------------
   Typography
   ---------------------------------------------------------------- */

const FONT_SIZES = [
  { name: '--font-size-xs', value: '0.75rem' },
  { name: '--font-size-sm', value: '0.875rem' },
  { name: '--font-size-base', value: '1rem' },
  { name: '--font-size-lg', value: '1.125rem' },
  { name: '--font-size-xl', value: '1.25rem' },
  { name: '--font-size-2xl', value: '1.5rem' },
  { name: '--font-size-3xl', value: '1.875rem' },
  { name: '--font-size-4xl', value: '2.25rem' },
  { name: '--font-size-5xl', value: '3rem' },
];

const FONT_WEIGHTS = [
  { name: '--font-weight-normal', value: '400' },
  { name: '--font-weight-medium', value: '500' },
  { name: '--font-weight-semibold', value: '600' },
  { name: '--font-weight-bold', value: '700' },
];

const LINE_HEIGHTS = [
  { name: '--leading-none', value: '1' },
  { name: '--leading-tight', value: '1.25' },
  { name: '--leading-snug', value: '1.375' },
  { name: '--leading-normal', value: '1.5' },
  { name: '--leading-relaxed', value: '1.625' },
  { name: '--leading-loose', value: '2' },
];

const LETTER_SPACINGS = [
  { name: '--tracking-tighter', value: '-0.05em' },
  { name: '--tracking-tight', value: '-0.025em' },
  { name: '--tracking-normal', value: '0em' },
  { name: '--tracking-wide', value: '0.025em' },
  { name: '--tracking-wider', value: '0.05em' },
];

const Typography: React.FC = () => (
  <div>
    <div className={styles.section}>
      <h3 className={styles.scaleTitle}>Font Family</h3>
      <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-body)' }}>
        <code className={styles.typographyVar}>--font-sans</code>
        {' — '}The quick brown fox jumps over the lazy dog
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-body)' }}>
        <code className={styles.typographyVar}>--font-mono</code>
        {' — '}The quick brown fox jumps over the lazy dog
      </p>
    </div>

    <div className={styles.section}>
      <h3 className={styles.scaleTitle}>Font Size</h3>
      <table className={styles.typographyTable}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {FONT_SIZES.map(({ name, value }) => (
            <tr key={name}>
              <td><code className={styles.typographyVar}>{name}</code></td>
              <td><code className={styles.typographyVar}>{value}</code></td>
              <td style={{ fontSize: `var(${name})`, color: 'var(--color-text-body)' }}>
                The quick brown fox
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className={styles.section}>
      <h3 className={styles.scaleTitle}>Font Weight</h3>
      <table className={styles.typographyTable}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {FONT_WEIGHTS.map(({ name, value }) => (
            <tr key={name}>
              <td><code className={styles.typographyVar}>{name}</code></td>
              <td><code className={styles.typographyVar}>{value}</code></td>
              <td style={{ fontWeight: `var(${name})` as never, color: 'var(--color-text-body)' }}>
                The quick brown fox
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className={styles.section}>
      <h3 className={styles.scaleTitle}>Line Height</h3>
      <table className={styles.typographyTable}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {LINE_HEIGHTS.map(({ name, value }) => (
            <tr key={name}>
              <td><code className={styles.typographyVar}>{name}</code></td>
              <td><code className={styles.typographyVar}>{value}</code></td>
              <td
                style={{
                  lineHeight: `var(${name})`,
                  color: 'var(--color-text-body)',
                  maxWidth: '20rem',
                }}
              >
                The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className={styles.section}>
      <h3 className={styles.scaleTitle}>Letter Spacing</h3>
      <table className={styles.typographyTable}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {LETTER_SPACINGS.map(({ name, value }) => (
            <tr key={name}>
              <td><code className={styles.typographyVar}>{name}</code></td>
              <td><code className={styles.typographyVar}>{value}</code></td>
              <td
                style={{
                  letterSpacing: `var(${name})`,
                  color: 'var(--color-text-body)',
                }}
              >
                The quick brown fox jumps over the lazy dog
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const TypographyStory: StoryObj = {
  name: 'Typography',
  render: () => <Typography />,
};

/* ----------------------------------------------------------------
   Border Radius
   ---------------------------------------------------------------- */

const RADIUS_TOKENS = [
  { name: '--radius-sm', value: '0.25rem' },
  { name: '--radius-md', value: '0.375rem' },
  { name: '--radius-lg', value: '0.5rem' },
  { name: '--radius-full', value: '9999px' },
];

const BorderRadius: React.FC = () => (
  <div className={styles.radiusGrid}>
    {RADIUS_TOKENS.map(({ name, value }) => (
      <div key={name} className={styles.radiusItem}>
        <div
          className={styles.radiusPreview}
          style={{ borderRadius: `var(${name})` }}
        />
        <span className={styles.radiusLabel}>{name.replace('--radius-', '')}</span>
        <code className={styles.radiusVar}>{value}</code>
      </div>
    ))}
  </div>
);

export const BorderRadiusStory: StoryObj = {
  name: 'Border Radius',
  render: () => <BorderRadius />,
};

/* ----------------------------------------------------------------
   Shadows
   ---------------------------------------------------------------- */

const SHADOW_TOKENS = [
  { name: '--shadow-sm', label: 'sm' },
  { name: '--shadow-md', label: 'md' },
  { name: '--shadow-lg', label: 'lg' },
];

const Shadows: React.FC = () => (
  <div className={styles.shadowGrid}>
    {SHADOW_TOKENS.map(({ name, label }) => (
      <div key={name} className={styles.shadowItem}>
        <div
          className={styles.shadowPreview}
          style={{ boxShadow: `var(${name})` }}
        />
        <span className={styles.shadowLabel}>{label}</span>
        <code className={styles.shadowVar}>{name}</code>
      </div>
    ))}
  </div>
);

export const ShadowStory: StoryObj = {
  name: 'Shadows',
  render: () => <Shadows />,
};

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */

const meta: Meta = {
  title: 'Tokens',
};

export default meta;
