interface UsObject {
  value: number;
  unit: string;
}
interface MetricObject {
  value: number;
  unit: string;
}
interface AmountObject {
  metric: MetricObject;
  us: UsObject;
}
export interface IngredientObjects {
  name: string;
  price: number;
  amount: AmountObject;
}
export default interface Price {
  ingredients: IngredientObjects[];
  totalCost: number;
  totalCostPerServing: number;
}
