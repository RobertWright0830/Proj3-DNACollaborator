// Import Link from react-router-dom for internal navigation
import { Link } from "react-router-dom";

// Component for rendering the footer section with navigation links, social media icons, and copyright information
const Footer = () => {
  // Main container for the footer content
  return (
    <div>
      <footer className="text-center text-white bg-secondary">
        <div className="container">
          {/*
            Section for navigation links including about us, blogs, donate, FAQ, and contact us
          */}
          <section className="mt-5">
            <div className="row text-center d-flex justify-content-center pt-5">
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">
                    About us
                  </a>
                </h6>
              </div>

              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">
                    Blogs
                  </a>
                </h6>
              </div>

              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  {/* Use Link component for internal navigation to maintain SPA behavior */}
                  <Link to="/donate" className="text-white">
                    Donate
                  </Link>
                </h6>
              </div>

              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">
                    FAQ
                  </a>
                </h6>
              </div>

              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">
                    Contact Us
                  </a>
                </h6>
              </div>
            </div>
          </section>
          <hr className="my-1" />
          {/* Section for displaying the mission statement or a brief about the organization's purpose */}
          <section className="mb-1">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <p>
                  "Our mission is to make genealogy accessible to everyone, free
                  of charge. If you've found value in our tool and wish to help
                  us keep the history alive for future generations, consider
                  making a donation. Your support enables us to maintain and
                  improve this platform, ensuring that exploring your roots
                  remains a journey open to all. Every contribution, no matter
                  the size, makes a significant difference. Thank you for your
                  support."
                </p>
              </div>
            </div>
          </section>
          {/* Section for social media icons linking to external social platforms */}
          <section className="text-center mb-1">
            <a href="" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-google"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>
        Display copyright information with a link to the organization's main
        website
        <div className="text-center p-3">
          © 2024 Copyright:
          <a
            className="text-white"
            href="https://proj3-dnacollaborator.onrender.com"
          >
            DNACollaborator.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
