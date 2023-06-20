import { useEffect, useState } from "react";
import "./TrendingRecipes.css";
import Recipe from "../models/Recipe";
import {
  getRandomRecipes,
  getSearchRecipe,
} from "../services/recipeApiService";
import RecipeCard from "./RecipeCard";

interface Props {
  query: string | null;
}

const TrendingRecipes = ({ query }: Props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    {
      query
        ? getSearchRecipe(query).then((res) => {
            setRecipes(res.results);
            console.log(res);
          })
        : getRandomRecipes().then((res) => {
            setRecipes(res.recipes);
          });
    }
  }, [query]);

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
