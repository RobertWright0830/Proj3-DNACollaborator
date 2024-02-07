import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <h1 className="navbar-brand" style={{ fontSize: "2.75rem" }}>
            <img
              src="/logo_only_b_g_y.svg"
              alt="DNACollaborator logo"
              style={{ width: "85px", height: "auto"}}
            />
            <span className="text-warning">DNA</span>Collaborator
          </h1>
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="#howitworks" className="nav-link custom-link">
                How It Works
              </a>
            </li>
            <li className="nav-item">
              <a href="#contactus" className="nav-link custom-link">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-light m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-primary m-2" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
