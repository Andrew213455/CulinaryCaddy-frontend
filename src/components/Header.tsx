import "./Header.css";

const Header = () => {
  return (
    <header className="Header">
      <div className="header-top">
        <h1>Culinary Caddy</h1>
        <button className="login">Login</button>
      </div>
      <div className="header-bottom">
        <form>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search For a Recipe"
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
