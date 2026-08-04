/**
 * Branding-safe SVGO config for src/assets/branding/svg.
 * Preserves viewBox, explicit dimensions, and hardcoded brand fills
 * (Branding uses CSS invert for dark mode — do not convert to currentColor).
 *
 * SVGO 4: removeViewBox / removeDimensions are not in preset-default;
 * omit them (viewBox stays). Disable removeAttrs that would strip width/height
 * via cleanupAttrs only — use explicit plugins below.
 */
export default {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Keep viewBox (default in SVGO 4 already keeps it; do not enable removeViewBox).
          convertColors: false,
          convertPathData: {
            floatPrecision: 2,
            transformPrecision: 2,
          },
          cleanupNumericValues: {
            floatPrecision: 2,
          },
        },
      },
    },
    // Explicitly keep width/height on root <svg> (Branding frames: 64×64 / 200×80).
    {
      name: 'removeAttrs',
      params: {
        attrs: '(data-name)',
      },
    },
  ],
}
