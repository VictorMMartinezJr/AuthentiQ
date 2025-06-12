import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);

    try {
      if (isCreateAccount) {
        // Register api call
        const response = await axios.post(`${backendURL}/register`, {
          name,
          email,
          password,
        });

        if (response.status === 201) {
          navigator("/");
          toast.success("Account created successfully.");
        } else {
          toast.error("Email already exists.");
        }
      } else {
        // Login api call
        const response = await axios.post(`${backendURL}/login`, {
          email,
          password,
        });

        if (response.status === 200) {
          setIsLoggedIn(true);
          getUserData();
          toast.success(`Welcome Back!`);
          navigator("/");
        } else {
          toast.error("Email/Password incorrect.");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(90deg, #0f0c29, #302b63, #24243e)",
        border: "none",
      }}
    >
      {/* Logo */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "30px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            gap: 5,
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "24px",
            textDecoration: "none",
          }}
        >
          <img src={assets.logo} alt="logo" height={32} width={32} />
          <span className="fw-bold fs-4 text-light">AuthentiQ</span>
        </Link>
      </div>

      {/* Form header */}
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">
          {isCreateAccount ? "Create Account" : "Login"}
        </h2>

        {/* Form */}
        <form onSubmit={submitHandler}>
          {/* Name only if isCreateAccount is true */}
          {isCreateAccount && (
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Forgot password link */}
          <div className="f-flex justify-content-between mb-3">
            <Link
              to="/reset-password"
              className="text-decoration-none"
              style={{ color: "#FF407D" }}
            >
              Forgot Password?
            </Link>
          </div>

          {/* Primary button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              backgroundColor: "#FF407D",
              boxShadow: "0 0 10px #FF407D, 0 0 10px #FF407D",
              border: "none",
            }}
            disabled={loading}
          >
            {loading ? "Loading" : isCreateAccount ? "Register" : "Login"}
          </button>
        </form>

        {/* Form footer to switch between register/login */}
        <div className="text-center mt-3">
          <p className="mb-0">
            {isCreateAccount ? (
              <>
                Already have an account?{" "}
                <span
                  className="text-decoration-underline"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsCreateAccount(false)}
                >
                  Login
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  className="text-decoration-underline"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsCreateAccount(true)}
                >
                  Register
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
