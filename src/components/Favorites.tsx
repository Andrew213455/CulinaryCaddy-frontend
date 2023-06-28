import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import "./Favorites.css";
import Recipe from "../models/Recipe";
import { Link } from "react-router-dom";
import { addFavorite, deleteFavorite } from "../services/accountApiService";
import { getAverageRating } from "../services/ratingApiService";

interface Props {
  singleRecipe: Recipe;
}

const Favorites = ({ singleRecipe }: Props) => {
  const { account, checkFavorite, user, setAccount } = useContext(AuthContext);
  const [isFave, setIsFave] = useState(false);
  const [average, setAverage] = useState<number | undefined>();
  const [roundedAverage, setRoundedAverage] = useState<number | undefined>(
    undefined
  );
  // console.log(user);
  // console.log(account);
  console.log(roundedAverage);
  useEffect(() => {
    setIsFave(checkFavorite(singleRecipe.id));
  }, [account]);

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

  return (
    <section className="Favorites">
      <div className="Favorites-container">
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
                      <div>
                        <p className="rating">Leave a rating!</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Favorites;
