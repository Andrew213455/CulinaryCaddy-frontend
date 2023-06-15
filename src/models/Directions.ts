export interface Step {
  step: string;
  number: number;
}

export default interface Directions {
  steps: Step[];
  name?: string;
}
