import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="navbar">
        <div className="logo">🌊 SagarSaarthi</div>

        <div className="pills">
          <ul>
            <li>
              <NavLink to="/dashboard" className="nav-link">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/sell" className="nav-link">
                Sell fishes
              </NavLink>
            </li>
            <li>
              <NavLink to="/strategy" className="nav-link">
                Generate Strategy
              </NavLink>
            </li>
            <li>
              <NavLink to="/guidelines" className="nav-link">
                Guidelines
              </NavLink>
            </li>
            <li>
              <NavLink to="/fish-info" className="nav-link">
                Fish Info
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link">
                Contact us
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="user">User</div>
      </div>
    </nav>
  );
}
