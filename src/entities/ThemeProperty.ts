export class ThemeProperty {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(public readonly name: string, public readonly value: any) {}

  isRemProperty(): boolean {
    if (typeof this.value === 'string') {
      return this.value.endsWith('rem');
    } else {
      return false; // TODO: support array-style config
    }
  }

  asEntry(): [string, string] {
    return [this.name, this.value];
  }
}
