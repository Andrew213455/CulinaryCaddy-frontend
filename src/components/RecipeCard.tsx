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
import { getAverageRating } from "../services/ratingApiService";
import Rating from "../models/Rating";
import Average from "../models/Average";

interface Props {
  singleRecipe: Recipe;
}

const RecipeCard = ({ singleRecipe }: Props) => {
  const { account, checkFavorite, setAccount } = useContext(AuthContext);
  const [isFave, setIsFave] = useState(false);
  const [average, setAverage] = useState<number | undefined>();
  const [roundedAverage, setRoundedAverage] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    getAverageRating(singleRecipe.id.toString()).then((res) => {
      setAverage(res[0]?.avgRating);
    });
  }, [account]);

  useEffect(() => {
    if (average !== undefined) {
      setRoundedAverage(Math.round(average));
    }
  }, [average]);
  useEffect(() => {
    setIsFave(checkFavorite(singleRecipe.id));
  }, [account]);

  return (
    <div className="RecipeCard">
      {/* <p>{singleRecipe.title}</p> */}
      <div className="image-container">
        <Link to={`/${singleRecipe.id}`}>
          <p className="image-p">{singleRecipe.title}</p>
          <img className="image" src={singleRecipe.image} alt="food" />
        </Link>
        <div>
          {account && (
            <div className="heart-container">
              {isFave ? (
                <i
                  className="fa-solid fa-heart heart image-heart"
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
                  className="fa-regular fa-heart heart image-heart"
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
              <div className="star-container">
                {roundedAverage === 1 ? (
                  <div className="stars">
                    <i className="fa-solid fa-star star"></i>
                  </div>
                ) : roundedAverage === 2 ? (
                  <div className="stars">
                    <i className="fa-solid fa-star star"></i>
                    <i className="fa-solid fa-star star"></i>
                  </div>
                ) : roundedAverage === 3 ? (
                  <div className="stars">
                    <i className="fa-solid fa-star star"></i>
                    <i className="fa-solid fa-star star"></i>
                    <i className="fa-solid fa-star star"></i>
                  </div>
                ) : roundedAverage === 4 ? (
                  <div className="stars">
                    <i className="fa-solid fa-star star"></i>
                    <i className="fa-solid fa-star star"></i>
                    <i className="fa-solid fa-star star"></i>
                    <i className="fa-solid fa-star star"></i>
                  </div>
                ) : roundedAverage === 5 ? (
                  <div className="stars">
                    <i className="fa-solid fa-star star"></i>
                    <i className="fa-solid fa-star star"></i>
                    <i className="fa-solid fa-star star"></i>
                    <i className="fa-solid fa-star star"></i>
                    <i className="fa-solid fa-star star"></i>
                  </div>
                ) : (
                  roundedAverage === undefined && (
                    <div className="stars">
                      <p className="rating">Leave a rating!</p>
                    </div>
                  )
                )}
              </div>
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
function setRoundedAverage(arg0: number) {
  throw new Error("Function not implemented.");
}
