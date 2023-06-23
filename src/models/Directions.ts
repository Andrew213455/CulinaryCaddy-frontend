export interface SingleIngredient {
  name: string;
  image: string;
}

export interface Length {
  number: number;
  unit: string;
}

export interface Step {
  step: string;
  number: number;
  length?: Length;
  ingredients: SingleIngredient;
}

export default interface Directions {
  steps: Step[];
  name?: string;
}
