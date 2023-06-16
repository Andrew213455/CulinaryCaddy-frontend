interface US {
  value: number;
  unit: string;
}

interface IngredientAmount {
  measurment: US;
}

export default interface Ingredient {
  name: string;
  amount: IngredientAmount;
}
