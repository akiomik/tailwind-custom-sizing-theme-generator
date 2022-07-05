import defaultTheme from 'tailwindcss/defaultTheme.js';

import { isUnit } from '../entities/Unit';
import type { Unit } from '../entities/Unit';
import type { Customization } from '../entities/Customization';

export class CustomThemeGenerator {
  private defaultFontSize: number;
  private actualFontSize: number;
  private unit: Unit;

  constructor({ defaultFontSize, actualFontSize, unit }: Customization) {
    if (!defaultFontSize) {
      throw new Error(`defaultFontSize is invalid: ${defaultFontSize}`);
    }

    if (!actualFontSize) {
      throw new Error(`actualFontSize is invalid: ${actualFontSize}`);
    }

    if (!isUnit(unit)) {
      throw new Error(`unit is invalid: ${unit}`);
    }

    this.defaultFontSize = defaultFontSize;
    this.actualFontSize = actualFontSize;
    this.unit = unit;
  }

  generate(): object {
    if (defaultTheme == null || defaultTheme.spacing == null) {
      throw new Error('defaultTheme.spacing is undefined');
    }

    const spacing = Object.keys(defaultTheme.spacing)
      .sort()
      .map((key) => {
        if (defaultTheme == null || defaultTheme.spacing == null) {
          throw new Error('defaultTheme.spacing is undefined');
        }

        if (!CustomThemeGenerator.isObjKey(key, defaultTheme.spacing)) {
          throw new Error('Something went wrong');
        }

        // TODO: support array-style config
        const value: string = defaultTheme.spacing[key];
        if (!value.endsWith('rem')) {
          return [key, value];
        }

        const rem = Number.parseFloat(value);
        const px = rem * this.defaultFontSize;
        const converted = this.unit === 'px' ? px : px / this.actualFontSize;

        return [key, `${converted}${this.unit}`];
      });

    return {
      spacing: Object.fromEntries(spacing)
    };
  }

  static isObjKey<T>(key: PropertyKey, obj: T): key is keyof T {
    return key in obj;
  }
}
