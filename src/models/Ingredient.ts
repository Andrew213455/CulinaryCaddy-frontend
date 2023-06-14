interface US {
  value: number;
  unit: string;
}

interface Metric {
  value: number;
  unit: string;
}

interface IngredientAmount {
  measurment?: US;
  metric?: Metric;
}

export default interface Ingredient {
  name: string;
  image: string;
  amount: IngredientAmount;
}
