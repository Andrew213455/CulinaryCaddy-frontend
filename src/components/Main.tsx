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
    <main className="Main">
      <TrendingRecipes query={query} />
    </main>
  );
};

export default Main;
