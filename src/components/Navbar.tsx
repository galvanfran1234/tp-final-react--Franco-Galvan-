import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-ball"></span>
          <span>Pokédex<span className="brand-highlight">Express</span></span>
        </Link>
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/pokemones" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Pokémons
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
