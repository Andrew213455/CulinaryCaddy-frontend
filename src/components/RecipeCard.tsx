import { Link } from "react-router-dom";
import Recipe from "../models/Recipe";
import "./RecipeCard.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { addFavorite, getAccountById } from "../services/accountApiService";

interface Props {
  singleRecipe: Recipe;
}

const RecipeCard = ({ singleRecipe }: Props) => {
  const { account, checkFavorite } = useContext(AuthContext);
  const [isFave, setIsFave] = useState(false);

  return (
    <div className="RecipeCard">
      {/* <p>{singleRecipe.title}</p> */}
      <div className="image-container">
        <Link to={`/${singleRecipe.id}`}>
          <p>{singleRecipe.title}</p>
          <img src={singleRecipe.image} alt="food" />
        </Link>
        {account && (
          <div>
            {isFave ? (
              <i
                className="fa-solid fa-heart"
                // onClick={() => deleteFavorite(account?.googleId!, singleRecipe).then((res) =>
                //     setIsFave(false)
                //   )
                // }
              ></i>
            ) : (
              <i
                className="fa-regular fa-heart"
                onClick={() =>
                  addFavorite(account?.googleId!, singleRecipe).then((res) =>
                    setIsFave(true)
                  )
                }
              ></i>
            )}
          </div>
        )}
        {/* <button
          onClick={() =>
            addFavorite(account?.googleId!, singleRecipe).then((res) =>
              console.log(res)
            )
          }
        >
          Add To Favorite
        </button> */}
      </div>
    </div>
  );
};

export default RecipeCard;
