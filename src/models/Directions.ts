export interface Length {
  number: number;
  unit: string;
}

export interface Step {
  step: string;
  number: number;
  length?: Length;
}

export default interface Directions {
  steps: Step[];
  name?: string;
}
