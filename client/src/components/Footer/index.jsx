import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <div>
      <footer className="text-center text-white bg-secondary">
        {/* <!-- Grid container --> */}
        <div className="container">
          {/* <!-- Section: Links --> */}
          <section className="mt-5">
            {/* <!-- Grid row--> */}
            <div className="row text-center d-flex justify-content-center pt-5">
              {/* <!-- Grid column --> */}
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">
                    About us
                  </a>
                </h6>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">
                    Blogs
                  </a>
                </h6>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="/donate" className="text-white">
                    Donate
                  </Link>
                </h6>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">
                    FAQ
                  </a>
                </h6>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">
                    Contact Us
                  </a>
                </h6>
              </div>
              {/* <!-- Grid column --> */}
            </div>
            {/* <!-- Grid row--> */}
          </section>
          {/* <!-- Section: Links --> */}

          <hr className="my-1" />

          {/* <!-- Section: Text --> */}
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
          {/* <!-- Section: Text --> */}

          {/* <!-- Section: Social --> */}
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
          {/* <!-- Section: Social --> */}
        </div>
        {/* <!-- Grid container --> */}

        {/* <!-- Copyright --> */}
        <div className="text-center p-3">
          © 2024 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            DNACollaborator.com
          </a>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
    </div>
  );
};

export default Footer;
