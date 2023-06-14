import "./Header.css";

const Header = () => {
  return (
    <header className="Header">
      <div className="header-top">
        <h1>Culinary Caddy</h1>
        <button>Login</button>
      </div>
      <div className="header-bottom">
        <form>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search For a Recipe"
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
