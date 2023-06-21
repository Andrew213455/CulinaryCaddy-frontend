import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FormEvent, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    navigate(`/search?${new URLSearchParams({ search: search })}`);
    setSearch("");
  };
  return (
    <header className="Header">
      <div className="header-top">
        <Link to="/">
          <h1>Culinary Caddy</h1>
        </Link>
        {user ? (
          <button onClick={signOut}>Sign Out</button>
        ) : (
          <button onClick={signInWithGoogle}>Sign In With Google</button>
        )}
      </div>
      <div className="header-bottom">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search For a Recipe"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
