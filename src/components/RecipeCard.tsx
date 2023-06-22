import { Link } from "react-router-dom";
import Recipe from "../models/Recipe";
import "./RecipeCard.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import {
  addFavorite,
  deleteFavorite,
  getAccountById,
} from "../services/accountApiService";

interface Props {
  singleRecipe: Recipe;
}

const RecipeCard = ({ singleRecipe }: Props) => {
  const { account, checkFavorite, setAccount } = useContext(AuthContext);
  const [isFave, setIsFave] = useState(false);

  useEffect(() => {
    setIsFave(checkFavorite(singleRecipe.id));
  }, [account]);

  return (
    <div className="RecipeCard">
      {/* <p>{singleRecipe.title}</p> */}
      <div className="image-container">
        <Link to={`/${singleRecipe.id}`}>
          <p className="image">{singleRecipe.title}</p>
          <img className="image" src={singleRecipe.image} alt="food" />
        </Link>
        <div>
          {account && (
            <div className="heart-container">
              {isFave ? (
                <i
                  className="fa-solid fa-heart heart"
                  onClick={() =>
                    deleteFavorite(account?.googleId!, singleRecipe).then(
                      (res) => {
                        setAccount(res);
                      }
                    )
                  }
                ></i>
              ) : (
                <i
                  className="fa-regular fa-heart heart"
                  onClick={() =>
                    addFavorite(account?.googleId!, singleRecipe).then(
                      (res) => {
                        console.log(res);
                        setAccount(res);
                      }
                    )
                  }
                ></i>
              )}
            </div>
          )}
        </div>

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
