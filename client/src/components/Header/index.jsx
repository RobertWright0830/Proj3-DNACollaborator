import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  let profileId;
  if (Auth.loggedIn()) {
    profileId = Auth.getProfile().data._id;
  }
  
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark custom-navbar-justify-content">
      <div className="container custom-navbar-margin">
        <Link to="/" className="navbar-brand">
          <img
            src="/logo_only_b_g_y.svg"
            alt="DNACollaborator logo"
            style={{ width: "2.5rem", height: "auto" }}
          />
          <span className="text-warning">DNA</span>Collaborator
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav navbar-collapse ms-auto">
            <li className="nav-item">
              <a href="#howitworks" className="nav-link">
                How It Works
              </a>
            </li>
            <li className="nav-item">
              <a href="#contactus" className="nav-link">
                Contact Us
              </a>
            </li>

            {Auth.loggedIn() ? (
              <>
                <li>
                    <Link to={`/profiles/${profileId}`} className="nav-link">My Dashboard</Link>
                </li>
                <button className="btn btn-lg btn-light m-2" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="btn btn- btn-primary" to="/signup">
                  Sign Up
                </Link>
              </>
            )}
          </ul>
        </div>
        <div></div>
      </div>
    </nav>
  );
};

export default Header;
