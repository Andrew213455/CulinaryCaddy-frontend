import axios from "axios";
import RecipeResponse from "../models/RecipeResponse";
import NutritionFacts from "../models/NutritionFacts";

const apiKey: string = process.env.REACT_APP_SPOONACULAR_API_KEY || "";

export const getRandomRecipes = (): Promise<RecipeResponse> => {
  return axios
    .get(
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
      {
        params: {
          number: 100,
          api_key: apiKey,
        },
        headers: {
          "X-RapidAPI-Key":
            "7239c9fe03msh344af59194121e4p14330ajsnc7a5bf2c2824",
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      }
    )
    .then((res) => {
      return res.data;
    });
};

export const getNutritionById = (id: number): Promise<NutritionFacts> => {
  return axios.get(
    `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/nutritionWidget.json`,
    {
      params: {
        id: id,
        api_key: apiKey,
      },
      headers: {
        "X-RapidAPI-Key": "7239c9fe03msh344af59194121e4p14330ajsnc7a5bf2c2824",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    }
  );
};
