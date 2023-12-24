import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../Config/firebase";
import Logo from "./assets/img/Logo.png";

function Login() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");

  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth(app);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Assuming you have a field like 'isAdmin' in your user data
      if (user && user.email === "admin@gmail.com") {
        alert("Admin logged in:", user);
        // Redirect to admin dashboard or perform admin-specific actions
        window.location.href = "/Home";
      } else {
        alert("You don't have permission to log in as admin.");
        // Sign out the user or handle unauthorized access
      }
    } catch (error) {
      alert("Login error:", error.message);
    }
  };

  return (
    <>
      <div id="app">
        <section className="section">
          <img
            src={Logo}
            width={170}
            style={{ display: "block", margin: "0 auto" }}
          />

          <div className="container mt-4">
            <div className="row">
              <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                <div className="card card-primary">
                  <div className="card-header">
                    <h4>Login</h4>
                  </div>
                  <div className="card-body">
                    <form
                      method="POST"
                      action="#"
                      className="needs-validation"
                      novalidate=""
                    >
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          name="email"
                          tabindex="1"
                          required
                          value={email}
                          onChange={() => setEmail()}
                        />
                        <div className="invalid-feedback">
                          Please fill in your email
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="d-block">
                          <label htmlFor="password" className="control-label">
                            Password
                          </label>
                        </div>
                        <input
                          id="password"
                          type="password"
                          className="form-control"
                          name="password"
                          tabindex="2"
                          required
                          value={password}
                          onChange={() => setPassword()}
                        />
                        <div className="invalid-feedback">
                          please fill in your password
                        </div>
                      </div>

                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block"
                          tabindex="4"
                          onClick={handleLogin}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
