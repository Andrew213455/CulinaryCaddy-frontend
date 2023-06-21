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
      <div className="image-container">
        <Link to={`/${singleRecipe.id}`}>
          <p>{singleRecipe.title}</p>
          <img src={singleRecipe.image} alt="food" />
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
