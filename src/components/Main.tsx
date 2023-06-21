import { useSearchParams } from "react-router-dom";
import "./Main.css";
import TrendingRecipes from "./TrendingRecipes";
import Favorites from "./Favorites";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Main = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");
  const { user } = useContext(AuthContext);
  console.log(query);

  return (
    <div className="Main">
      {user && <Favorites />}
      <TrendingRecipes query={query} />
    </div>
  );
};

export default Main;
