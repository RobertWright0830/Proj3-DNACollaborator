import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_PROFILE } from "../utils/mutations";

import Auth from "../utils/auth";



const Signup = () => {

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    // reset error messages
    setErrorMessages({
      ...errorMessages,
      name: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    let errors = { username: "", email: "", password: "", confirmPassword: "" };

    // Validate password match
    if (formState.password !== formState.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Validate password length
    if (formState.password.length < 5) {
      errors.password = "Password must be at least 5 characters";
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <section className="bg-dark text-light p-5 text-sm-start">
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-4 m-auto rounded-top wrapper">
              <h2 className="text-center pt-3">Sign Up Now</h2>
              <p className="text-center text-light-muted lead mb-3">
                It is free and fast!
              </p>
              <div className="card-body">
                {data ? (
                  <p>
                    Success! You may now head{" "}
                    <Link to="/">back to the homepage.</Link>
                  </p>
                ) : (
                  <form
                    className="signup-form"
                    id="form"
                    onSubmit={handleFormSubmit}
                  >
                    {/* username field */}
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                        <i className="fas fa-user"></i>
                      </span>
                      <input
                        className="form-control"
                        id="username-signup"
                        placeholder="Username"
                        autoComplete="off"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={handleChange}
                      />
                    </div>

                    {/* email field */}
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                      <input
                        className="form-control"
                        id="email-signup"
                        placeholder="Email"
                        autoComplete="off"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                      />
                    </div>

                    {/* password field */}
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                      <input
                        className="form-control"
                        id="password-signup"
                        placeholder="Password"
                        autoComplete="new-password"
                        name="password"
                        type="password"
                        required
                        value={formState.password}
                        onChange={handleChange}
                      />
                    </div>
                    <small
                      className={errorMessages.password ? "error" : "success"}
                      id="password-message"
                    >
                      {errorMessages.password}
                    </small>

                    {/* password confirmation */}
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                      <input
                        className="form-control"
                        id="confirm-password-signup"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        type="password"
                        name="confirmPassword"
                        required
                        value={formState.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <small
                      className={
                        errorMessages.confirmPassword ? "error" : "success"
                      }
                      id="confirm-password-message"
                    >
                      {errorMessages.confirmPassword}
                    </small>

                    {/* submit button */}
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-primary"
                        style={{ cursor: "pointer" }}
                        type="submit"
                      >
                        Sign Up
                      </button>

                      {/* additional text */}
                      <p className="text-center text-light-muted mt-2">
                        When You Register by Clicking Sign Up Button, You Agree
                        to our
                        <a href="#"> Terms and Conditions </a>
                        and
                        <a href="#"> Privacy Policy.</a>
                      </p>
                      <p className="text-center">
                        Already Have An Account?
                        <Link to="/login">Login Here</Link>
                      </p>
                    </div>
                  </form>
                )}

                {error && (
                  <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
