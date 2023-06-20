interface UsAmount {
  unit: string;
  value: number;
}

interface Amount {
  us: UsAmount;
}

interface IngredientList {
  name: string;
  amount: Amount;
}

export default interface Ingredient {
  ingredients: IngredientList[];
}
