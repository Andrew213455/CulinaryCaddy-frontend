interface US {
  value: number;
  unit: string;
}

interface IngredientAmount {
  us: US;
}

export default interface Ingredient {
  name: string;
  amount: IngredientAmount;
}
