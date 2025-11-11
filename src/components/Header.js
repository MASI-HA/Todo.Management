import { Link, NavLink } from "react-router-dom";

const Header = () => {
    return (
      <header className="cyber-header">
        <Link to="/" className="logo">
          Todo<span>.Management</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" className="nav-link" activeClassName="active" exact>
            Home
          </NavLink>
          <NavLink to="/todos" className="nav-link" activeClassName="active">
            Todos
          </NavLink>
        </nav>
      </header>
    );
}
export default Header;