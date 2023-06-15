interface NutrientObjects {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

export default interface NutritionFacts {
  nutrients: NutrientObjects;
}
