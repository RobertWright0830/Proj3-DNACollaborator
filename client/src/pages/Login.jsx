import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <section className="bg-dark text-light p-5 text-sm-start">
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-4 m-auto rounded-top wrapper">
            <h2 className="text-center pt-3">Login Now</h2>

            <div className="card-body">
              {data ? (
                <p>
                  Success! You may now head{" "}
                  <Link to="/">back to the homepage.</Link>
                </p>
              ) : (
                <form
                  className="py-3 login-form"
                  id="form"
                  onSubmit={handleFormSubmit}
                >
                  {/* email field */}
                  <div className="input-group mb-1">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <input
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* password field */}
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      className="form-control"
                      placeholder="Password"
                      id="password-login"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formState.password}
                      onChange={handleChange}
                    />
                  </div>

                  {/* login button */}
                  <div className="d-grid">
                    <button
                      className="btn btn-primary"
                      style={{ cursor: "pointer" }}
                      type="submit"
                    >
                      Login
                    </button>
                    <p className="text-center mt-4">
                      Register Now for Free by Clicking
                      <Link to="/signup"> Sign Up.</Link>
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
  );
};

export default Login;
