import defaultTheme from 'tailwindcss/defaultTheme';

export default class CustomThemeGenerator {
  constructor({ defaultFontSize, actualFontSize, unit }) {
    if (!defaultFontSize) {
      throw new Error(`defaultFontSize is invalid: ${defaultFontSize}`);
    }

    if (!actualFontSize) {
      throw new Error(`actualFontSize is invalid: ${actualFontSize}`);
    }

    if (!['rem', 'px'].includes(unit)) {
      throw new Error(`unit is invalid: ${unit}`);
    }

    this.defaultFontSize = defaultFontSize;
    this.actualFontSize = actualFontSize;
    this.unit = unit;
  }

  generate() {
    const spacing = Object.keys(defaultTheme.spacing)
      .sort()
      .map((key) => {
        const value = defaultTheme.spacing[key];
        if (!value.endsWith('rem')) {
          return [key, value];
        }

        const rem = Number.parseFloat(value);
        const px = rem * this.defaultFontSize;
        const converted = this.unit === 'px' ? px : px / this.actualFontSize;

        return [key, `${converted}${this.unit}`];
      });

    return {
      spacing: Object.fromEntries(spacing),
    };
  }
}
