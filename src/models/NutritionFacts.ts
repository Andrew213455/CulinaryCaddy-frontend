export default interface NutrientObjects {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

export default interface NutritionFacts {
  calories: string;
  carbs: string;
  fat: string;
  protein: string;
  nutrients: NutrientObjects[];
}
