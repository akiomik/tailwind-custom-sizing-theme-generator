import { ThemeProperty } from './ThemeProperty';

export class ThemeSection {
  constructor(public readonly name: string, public readonly properties: ThemeProperty[]) {}

  static fromNameWithRecord(name: string, record: Record<string, string>): ThemeSection {
    const properties = Object.keys(record).map((key) => new ThemeProperty(key, record[key]));

    return new ThemeSection(name, properties);
  }

  asNameWithRecord(): [string, Record<string, string>] {
    const entries = this.properties.map((property) => property.asEntry());
    return [this.name, Object.fromEntries(entries)];
  }

  hasRemProperty(): boolean {
    return this.properties.some((property) => property.isRemProperty());
  }
}
