import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Home = () => {
  return (
    <main>
      <section className="bg-dark text-light p-5 text-center text-sm-start">
        <div className="body">
          <div className="d-sm-flex align-items-top justify-content-between">
            <div className="text-column">
              <h1 className="company-name">
                <img
                  src="/logo_only_b_g_y.svg"
                  alt="DNACollaborator logo"
                  style={{ width: "15%", height: "auto" }}
                />
                <span className="text-warning">DNA</span>
                <p></p>
                Collaborator
              </h1>

              <h2 className="slogan">
                Unlocking Your Genetic Past, Together, Piece By Piece
              </h2>
              <p className="lead my-4">
                Facilitates the analysis of shared chromosome segments aiding in
                the identification of unknown ancestors, verification of genetic
                family connections, and the extension of family trees. It also
                helps users understand their relationships with shared matches
                and identify the ancestors from whom they've inherited most of
                their DNA.
              </p>

              {Auth.loggedIn() ? (
                <p></p>
              ) : (
                <Link className="btn btn-primary btn-lg m-4" to="/signup">
                  Register To Get Started Now
                </Link>
              )}
            </div>

            <img
              className = "d-none d-lg-block"
              style={{ width: "40%", height: "40%" }}
              src="/EdmundHallPuzzlePiecesNoMovement.jpg"
              alt="Ancestor Puzzle Pieces"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-light p-3">
        <div className="container">
          <div className="d-md-flex justify-content-between align-items-center">
            <h3 className="mb-3 mb-md-0">Sign Up For Our Newsletter</h3>
            <div className="input-group news-input">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
              />
              <button className="btn btn-dark btn-lg" type="button">
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Boxes */}
      <section className="p-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md">
              <div className="card bg-dark text-light">
                <div className="card-body tex-center">
                  <div className="h1 mb-3">
                    <i className="bi bi-bricks"></i>
                  </div>
                  <h3 className="card-title mb-3">Brickwall Buster</h3>
                  <p className="card-text">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam, officia qui omnis sed ab quia.
                  </p>
                  <a href="#" className="btn btn-secondary">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="card bg-secondary text-light">
                <div className="card-body tex-center">
                  <div className="h1 mb-3">
                    <i className="bi bi-people"></i>
                  </div>
                  <h3 className="card-title mb-3">Verify Family Connections</h3>
                  <p className="card-text">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam, officia qui omnis sed ab quia.
                  </p>
                  <a href="#" className="btn btn-dark">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="card bg-dark text-light">
                <div className="card-body tex-center">
                  <div className="h1 mb-3">
                    <i className="bi bi-tree"></i>
                  </div>
                  <h3 className="card-title mb-3">Extend Family Trees</h3>
                  <p className="card-text">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam, officia qui omnis sed ab quia.
                  </p>
                  <a href="#" className="btn btn-secondary">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn Sections */}
      <section className="p-5" id="learn">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md"></div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
