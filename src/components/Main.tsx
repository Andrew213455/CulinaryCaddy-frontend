import { useSearchParams } from "react-router-dom";
import "./Main.css";
import TrendingRecipes from "./TrendingRecipes";

const Main = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");
  console.log(query);

  return (
    <div className="Main">
      <TrendingRecipes query={query} />
    </div>
  );
};

export default Main;
