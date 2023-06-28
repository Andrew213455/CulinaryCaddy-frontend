import { useContext, useEffect, useState } from "react";
import "./TrendingRecipes.css";
import Recipe from "../models/Recipe";
import {
  getRandomRecipes,
  getSearchRecipe,
} from "../services/recipeApiService";
import RecipeCard from "./RecipeCard";

import Favorites from "./Favorites";
import AuthContext from "../context/AuthContext";

interface Props {
  query: string | null;
}

const TrendingRecipes = ({ query }: Props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { user, account, hideFavorite } = useContext(AuthContext);
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

  console.log(query);
  return (
    <section className="TrendingRecipes">
      {query === null && hideFavorite === false && (
        <div className="favorite-container">
          {user && <h2>{user.displayName}'s Favorite Recipes</h2>}
          <div className="favorite">
            {user &&
              account?.favorites!.map((recipe) => {
                return <Favorites key={recipe.id} singleRecipe={recipe} />;
              })}
          </div>
        </div>
      )}

      {query === null ? (
        <h2>Trending Recipes</h2>
      ) : (
        <h2>Search results: {query}</h2>
      )}
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
