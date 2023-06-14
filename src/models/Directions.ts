interface Step {
  instruction: string;
}

export default interface Directions {
  steps: Step[];
  name?: string;
}
