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
          <p>welcome back! {user?.displayName}</p>
        ) : (
          <p>Sign in to unlock more features!</p>
        )}
      </div>
      <nav className="header-mid-container">
        <div className="header-middle">
          <button className="header-button" onClick={() => navigate(`/joke`)}>
            Get a Joke
          </button>
          <div className="gap"></div>
          {user ? (
            <button className="header-button" onClick={signOut}>
              Sign Out
            </button>
          ) : (
            <button className="header-button" onClick={signInWithGoogle}>
              Sign In
            </button>
          )}
          <div className="gap"></div>
          <button className="header-button" onClick={() => navigate(`/notes`)}>
            Get Notes
          </button>
        </div>
      </nav>
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
