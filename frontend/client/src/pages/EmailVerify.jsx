import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const inputRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const { getUserData, isLoggedIn, userData, backendURL } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e, i) => {
    const value = e.target.value.replace(/\D/, "");
    e.target.value = value;

    if (value && i < 5) {
      inputRef.current[i + 1].focus();
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !e.target.value && i > 0) {
      inputRef.current[i - 1].focus();
    }
  };

  const handleOTPPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    paste.forEach((digit, i) => {
      if (inputRef.current[i]) {
        inputRef.current[i].value = digit;
      }
    });

    const next = paste.length < 6 ? paste.length : 5;
    inputRef.current[next].focus();
  };

  const handleVerify = async () => {
    const otp = inputRef.current.map((input) => input.value).join("");

    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${backendURL}/verify-otp`, { otp });

      if (response.status === 200) {
        toast.success("Email verified successfully.");
        getUserData();
        navigate("/");
      } else {
        toast.error("Incorrect email verification code.");
      }
    } catch (error) {
      toast.error("Failed to verify email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="email-verify-container d-flex align-items-center justify-content-center vh-100 position-relative"
      style={{
        background: "linear-gradient(90deg, #0f0c29, #302b63, #24243e)",
        borderRadius: "none",
      }}
    >
      {/* Nav logo and header */}
      <Link
        to="/"
        className="position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2 text-decoration-none"
      >
        <img src={assets.logo} alt="logo" width={32} height={32} />
        <span className="fs-4 fw-semibold text-light">AuthentiQ</span>
      </Link>

      {/* Card container */}
      <div className="p-5 rounded-4 shadow bg-white" style={{ width: "400px" }}>
        <h4 className="text-center fw-bold mb-2">
          Email Verification One Time Code
        </h4>
        <p className="text-center mb-4">
          Enter the 6 digit code sent to your email.
        </p>

        {/* One time code input boxes */}
        <div className="d-flex justify-content-between gap-2 mb-4 text-center text-white-50 mb-2">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="form-control text-center fs-4 otp-input"
              ref={(el) => (inputRef.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handleOTPPaste}
            />
          ))}
        </div>

        {/* Primary btn */}
        <button
          className="btn btn-primary w-100 fw-semibold"
          style={{
            backgroundColor: "#FF407D",
            boxShadow: "0 0 10px #FF407D, 0 0 10px #FF407D",
            border: "none",
          }}
          disabled={loading}
          onClick={handleVerify}
        >
          {loading ? "Verifying" : "Verify Email"}
        </button>
      </div>
    </div>
  );
};

export default EmailVerify;
