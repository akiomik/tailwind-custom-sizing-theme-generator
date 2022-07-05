import defaultTheme from 'tailwindcss/defaultTheme.js';

import type { Customization } from '../entities/Customization';
import { Theme } from '../entities/Theme';
import { ThemeProperty } from '../entities/ThemeProperty';
import { ThemeSection } from '../entities/ThemeSection';
import { isUnit } from '../entities/Unit';
import type { Unit } from '../entities/Unit';

export class CustomThemeGenerator {
  private defaultFontSize: number;
  private actualFontSize: number;
  private unit: Unit;
  private defaultTheme: Theme;

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
    this.defaultTheme = Theme.fromDefaultTheme(defaultTheme);
  }

  generate(): Theme {
    const defaultSections = this.defaultTheme.remSections();
    const sections = defaultSections.map((section) => {
      const properties = section.properties.map((property) => {
        return this.convertProperty(property);
      });

      return new ThemeSection(section.name, properties);
    });

    return new Theme(sections);
  }

  private convertProperty(property: ThemeProperty): ThemeProperty {
    if (!property.isRemProperty()) {
      return property;
    }

    const rem = Number.parseFloat(property.value);
    const px = rem * this.defaultFontSize;
    const converted = this.unit === 'px' ? px : px / this.actualFontSize;

    return new ThemeProperty(property.name, `${converted}${this.unit}`);
  }

  static isObjKey<T>(key: PropertyKey, obj: T): key is keyof T {
    return key in obj;
  }
}
