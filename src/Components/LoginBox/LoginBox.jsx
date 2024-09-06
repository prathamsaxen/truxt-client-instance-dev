import React, { useCallback, useRef, useState } from "react";
import "./LoginBox.css";
import Header from "../Header/Header";
import LoginBoxHeader from "../Header/LoginBoxHeader";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import truxtHd from "../../Assets/truxtHD.png";

const LoginBox = ({ handleLoginShow, setUserName, setAllLinks }) => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?!.*\.\.)$/;

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    recaptcha: "",
  });
  const handleLogin = async (event) => {
    console.log("logging");
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/login`,
        credentials
      );

      localStorage.setItem("token", response?.data.token);

      setAllLinks(
        response?.data.data.map((item) => ({
          _id: item._id,
          title: item.title,
        }))
      );

      setUserName(response?.data.name);
      handleLoginShow();
    } catch (err) {
      console.log(err.message);
      const newErrors = {};
      newErrors.loginStatus = err.message;
      setErrors(newErrors);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeCredentials = useCallback((event) => {
    setErrors({});
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!credentials.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(credentials.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
    }

    if (!credentials.recaptcha) {
      newErrors.recaptcha = "Please complete the CAPTCHA";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRecaptchaChange = (token) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      recaptcha: token,
    }));
  };

  return (
    <div className="login-box">
      <LoginBoxHeader handleLoginShow={handleLoginShow} />
      <div className="login-box-div">
        <div className="login-logo-container">
          <img src={truxtHd} alt="" className="login-logo" />
        </div>
        <div className="login-input-container">
          Email
          <input
            name="email"
            value={credentials.email}
            onChange={handleChangeCredentials}
            type="text"
            className="cred-input"
            placeholder="jhonsmith@gmail.com"
          />
        </div>
        <div className="login-input-container">
          Password
          <input
            name="password"
            value={credentials.password}
            onChange={handleChangeCredentials}
            type="password"
            className="cred-input"
            placeholder="Enter password"
          />
        </div>

        <div className="captcha-container">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_GOOGLE_CAPCTCHA_CDN}
            onChange={handleRecaptchaChange}
            className="captcha"
          />
        </div>
        <div className="login-input-container">
          <button className="login-login-button" onClick={handleLogin}>
            {isLoading ? "Loading ..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
