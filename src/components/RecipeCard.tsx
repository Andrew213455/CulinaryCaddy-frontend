import { Link } from "react-router-dom";
import Recipe from "../models/Recipe";
import "./RecipeCard.css";

interface Props {
  singleRecipe: Recipe;
}

const RecipeCard = ({ singleRecipe }: Props) => {
  return (
    <div className="RecipeCard">
      {/* <p>{singleRecipe.title}</p> */}
      <Link to={`/${singleRecipe.id}`}>
        <img src={singleRecipe.image} alt="food" />
      </Link>
    </div>
  );
};

export default RecipeCard;
