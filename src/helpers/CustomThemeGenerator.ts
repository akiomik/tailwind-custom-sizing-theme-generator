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

    if (typeof property.value === 'string') {
      return this.convertStringProperty(property);
    } else if (Array.isArray(property.value)) {
      return this.convertArrayProperty(property);
    } else {
      return property;
    }
  }

  private convertStringPropertyValue(value: string): string {
    const rem = Number.parseFloat(value);
    const px = rem * this.defaultFontSize;
    const converted = this.unit === 'px' ? px : px / this.actualFontSize;
    return `${converted}${this.unit}`;
  }

  private convertStringProperty(property: ThemeProperty): ThemeProperty {
    return new ThemeProperty(property.name, this.convertStringPropertyValue(property.value));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private convertObjectPropertyValue(value: Record<string, any>): Record<string, any> {
    const entries = Object.keys(value).map((key) => {
      const v = value[key];

      if (typeof v === 'string') {
        return [key, this.convertStringPropertyValue(v)];
      } else if (Array.isArray(v)) {
        return [key, this.convertArrayPropertyValue(v)];
      } else if (typeof v === 'object') {
        return [key, this.convertObjectPropertyValue(v)];
      } else {
        return [key, v];
      }
    });

    return Object.fromEntries(entries);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private convertArrayPropertyValue(value: any[]): any[] {
    return value.map((v) => {
      if (typeof v === 'string') {
        return this.convertStringPropertyValue(v);
      } else if (Array.isArray(v)) {
        return this.convertArrayPropertyValue(v);
      } else if (typeof v === 'object') {
        return this.convertObjectPropertyValue(v);
      } else {
        return v;
      }
    });
  }

  private convertArrayProperty(property: ThemeProperty): ThemeProperty {
    return new ThemeProperty(property.name, this.convertArrayPropertyValue(property.value));
  }

  static isObjKey<T>(key: PropertyKey, obj: T): key is keyof T {
    return key in obj;
  }
}
