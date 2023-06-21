import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./Favorites.css";

const Favorites = () => {
  const { user, account } = useContext(AuthContext);
  console.log(user);
  console.log(account);
  return <div className="Favorites">Favorites works</div>;
};

export default Favorites;
