import { useEffect, useState } from "react";
import "./TrendingRecipes.css";
import Recipe from "../models/Recipe";
import { getRandomRecipes } from "../services/recipeApiService";
import RecipeCard from "./RecipeCard";

const TrendingRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    getRandomRecipes().then((res) => {
      setRecipes(res.recipes);
    });
  }, []);

  return (
    <section className="TrendingRecipes">
      <div>
        <h2>Trending Recipes</h2>
      </div>
      <div className="trending-recipe-array">
        {recipes.map((recipe) => {
          return (
            recipe.image && <RecipeCard key={recipe.id} singleRecipe={recipe} />
          );
        })}
      </div>
    </section>
  );
};

export default TrendingRecipes;
