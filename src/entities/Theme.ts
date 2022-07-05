import type { Config } from 'tailwindcss';

import { ThemeSection } from './ThemeSection';

export class Theme {
  constructor(private sections: ThemeSection[]) {}

  static fromDefaultTheme(defaultTheme: Config['theme']): Theme {
    if (defaultTheme == null) {
      throw new Error('Invalid defaultTheme');
    }

    const sections = Object.keys(defaultTheme).map((key) => {
      return ThemeSection.fromNameWithRecord(key, defaultTheme[key]);
    });

    return new Theme(sections);
  }

  remSections(): ThemeSection[] {
    return this.sections.filter((property) => property.hasRemProperty());
  }

  asRecord(): Record<string, Record<string, string>> {
    const entries = this.sections.map((section) => section.asNameWithRecord());
    return Object.fromEntries(entries);
  }
}
