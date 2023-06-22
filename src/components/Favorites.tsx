import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import "./Favorites.css";
import Recipe from "../models/Recipe";
import { Link } from "react-router-dom";
import { addFavorite, deleteFavorite } from "../services/accountApiService";

interface Props {
  singleRecipe: Recipe;
}

const Favorites = ({ singleRecipe }: Props) => {
  const { account, checkFavorite, user, setAccount } = useContext(AuthContext);
  const [isFave, setIsFave] = useState(false);
  // console.log(user);
  // console.log(account);

  useEffect(() => {
    setIsFave(checkFavorite(singleRecipe.id));
  }, [account]);

  return (
    <div className="Favorites">
      <div className="Favorites-container">
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
        </div>
      </div>
    </div>
  );
};

export default Favorites;
