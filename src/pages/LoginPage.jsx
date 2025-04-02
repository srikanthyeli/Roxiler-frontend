import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    console.log(jwtToken)
    navigate("/dashboard");
  };

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = {
      email: email,
      password: password,
    };

    try {
      const url = "https://roxlier-backend-1.onrender.com/login/";
      const response = await axios.post(url, userDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log(response)
        onSubmitSuccess(response.data.token);
      } else {
        onSubmitFailure("Login failed. Please check your credentials.");
      }
    } catch (error) {
      onSubmitFailure(
        `An error occurred while logging in. Please try again.${error}`
      );
    }
  };

  return (
    <div className="app-container">
      <div className="login-form-container">
        <form className="form-container" onSubmit={submitForm}>
          <h1 className="heading">Store Rating App</h1>
          <div className="input-container">
            <label className="input-label" htmlFor="email">
              EMAIL
            </label>
            <input
              type="text"
              id="email"
              className="email-input-field"
              value={email}
              onChange={onChangeEmail}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="password-input-field"
              value={password}
              onChange={onChangePassword}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="footDiv">
            <span className="text">Do not have an account?</span>
            <Link to="/register">
              <button className="login-button-1">Sign up</button>
            </Link>
          </div>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;