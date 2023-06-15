import axios from "axios";
import RecipeResponse from "../models/RecipeResponse";
import NutritionFacts from "../models/NutritionFacts";
import Equipment from "../models/Equipment";
import Price from "../models/Price";
import Directions from "../models/Directions";

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

export const getNutritionById = (id: string): Promise<NutritionFacts> => {
  return axios
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/nutritionWidget.json`,
      {
        params: {
          id: id,
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

export const getEquipmentById = (id: string): Promise<Equipment> => {
  return axios
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/equipmentWidget.json`,
      {
        params: {
          id: id,
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

export const getPriceById = (id: string): Promise<Price> => {
  return axios
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/priceBreakdownWidget.json`,
      {
        params: {
          id: id,
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

export const getIngredientsById = (id: string): Promise<Price> => {
  return axios
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/ingredientWidget.json`,
      {
        params: {
          id: id,
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

export const getRecipeSteps = (id: string): Promise<Directions[]> => {
  return axios
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/analyzedInstructions?id=${id}`,
      {
        params: {
          id: id,
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
