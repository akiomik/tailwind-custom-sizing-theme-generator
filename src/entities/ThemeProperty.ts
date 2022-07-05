export class ThemeProperty {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(public readonly name: string, public readonly value: any) {}

  isRemProperty(): boolean {
    if (typeof this.value === 'string') {
      return this.value.endsWith('rem');
    } else if (Array.isArray(this.value)) {
      return this.value.some((v) => v.endsWith('rem'));
    } else {
      return false;
    }
  }

  asEntry(): [string, string] {
    return [this.name, this.value];
  }
}
