import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FormEvent, useState } from "react";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
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
        <button className="login">Login</button>
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
