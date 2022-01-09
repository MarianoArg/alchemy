export enum ComponentType {
  Square = 'square',
  Circle = 'circle',
  Triangle = 'triangle'
}

export enum ComponentVariant {
  Yellow = 'yellow',
  Red = 'red',
  Blue = 'blue',
  Black = 'black',
  Pink = 'pink',
  Green = 'green'
}

export enum DropEffect {
  Move = 'move',
  Copy = 'copy',
  Any = 'any'
}

export interface Component {
  type: ComponentType;
  variant: ComponentVariant;
  id: string;
  top: number;
  left: number;
  allowedDropEffect: DropEffect;
}

export type DropResult = {
  name: string;
  dropEffect: DropEffect;
  allowedDropEffect: DropEffect;
}