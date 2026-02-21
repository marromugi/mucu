import React from 'react';
import styles from './tokens.module.css';

type ColorSwatchProps = {
  label: string;
  variable: string;
};

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ label, variable }) => (
  <div className={styles.swatch}>
    <div
      className={styles.swatchPreview}
      style={{ backgroundColor: `var(${variable})` }}
    />
    <div className={styles.swatchInfo}>
      <span className={styles.swatchLabel}>{label}</span>
      <code className={styles.swatchVar}>{variable}</code>
    </div>
  </div>
);

type ColorScaleProps = {
  name: string;
  prefix: string;
  steps: number[];
};

export const ColorScale: React.FC<ColorScaleProps> = ({
  name,
  prefix,
  steps,
}) => (
  <div className={styles.scaleGroup}>
    <h3 className={styles.scaleTitle}>{name}</h3>
    <div className={styles.scaleRow}>
      {steps.map((step) => (
        <ColorSwatch
          key={step}
          label={`${step}`}
          variable={`--color-${prefix}-${step}`}
        />
      ))}
    </div>
  </div>
);
