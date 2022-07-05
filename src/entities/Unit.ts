export const unitValues = ['rem', 'px'] as const;

export type Unit = typeof unitValues[number];

export function isUnit(x: unknown): x is Unit {
  return unitValues.includes(x as Unit);
}
