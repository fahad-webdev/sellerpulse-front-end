import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx"; // Use the context

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showError, setShowError] = useState({
    email: false,
    password: false,
  });
  const [message , setmessage] = useState({
    success:false,
    danger:false,
    alert:"",
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const { login } = useAuth(); // Get login function from context
  const validate = () => {
    let errors = {};
    let showError = {
      email: false,
      password: false,
    };
    //showing error for empty email field
    if (!formValues.email ) {
      errors.email = <div className="alert">E-mail is required</div>;
      showError.email = true;
    }
    //showing error for empty password field
    if (!formValues.password ) {
      errors.password = <div className="alert">Password is required</div>;
      showError.password = true;
    }
    else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = <div className="alert">E-mail address is invalid</div>;
      showError.email = true;
    } 
    setFormErrors(errors);
    setShowError(showError);
    return Object.keys(errors).length === 0;
  };
  //this function  is for implementing logic for logging in
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const URL = "http://localhost:3000/api/v1/users/login";
        const response = await axios.post(URL, formValues, {
          withCredentials: true, // Ensures cookies are sent and received
        });
        // Destructure the response
        const { role, token } = response.data;
        // Save token (e.g., in localStorage or context)
        login(token);
        // Navigate based on role
        if (role === "admin") {
          navigate("/Admin/Dashboard"); // Redirect to Admin Dashboard
        } else if (role === "user") {
          navigate("/Navbar/Dashboard/TotalProduct"); // Redirect to User Dashboard
        } else {
          throw new Error("Invalid role"); // Fallback for unknown roles
        }
        console.log("Login successful", response.data);
      } catch (error) {
        // Handle errors
        if (error.response && error.response.status === 401) {
          setmessage({danger:true,success:false,alert:"Invalid E-mail or Password"});
        } else {
          setmessage({danger:true,success:false,alert:"Login failed please try again later"});
        }
        
        console.error(
          "Login failed",
          error.response?.data?.message || error.message
        );
      }
    }
  };
  
  
  useEffect(() => {
    if (showError.email || showError.password) {
      const timer = setTimeout(() => {
        setFormErrors({
          email: "",
          password: "",
        });
        setShowError({
          email: false,
          password: false,
        });
      }, 2000);

      return () => clearTimeout(timer); 
    }
  }, [showError]);

  return (
    <>
      <div className="login-background"></div>
      <div className="login-main">
         {/*Alert for login failed*/}
    {message.danger &&  <div className="shopify-alert-back" id="signup-danger-back">
    <img src="../../../public/warning.png" alt="" className="alert-logo" />
    <h3 className="shopify-alert">
      <strong>Sorry! </strong>
      {message.alert}
    </h3>
    <img src="../../../public/close-danger.png" alt="" className="close-logo" onClick={()=>{setmessage(false);
}}/>
  </div>}
        <div className="login-form-main">
          <div className="login-image-back">
            <div className="login-about">
              <h2 id="heading-about">Welcome to SellerPulse:</h2>
              <h2>Your Ultimate E-Commerce Dashboard</h2>
              <p>
                Streamline your online business with real-time insights and
                analytics from Shopify, Daraz, and more. Optimize sales, manage
                inventory, and stay ahead with ease using SellerPulse.
              </p>
            </div>
          </div>
          <div className="login-form-back">
            <form className="login-form" onSubmit={handleSubmit}>
              <h1>Login</h1>
              <table className="login-table">
                <tbody>
                  <tr>
                    <td>
                      <label className="login-label">E-mail</label>
                      <input
                        type="text"
                        name="email"
                        className="login-input"
                        placeholder="Enter your e-mail"
                        value={formValues.email}
                        onChange={handleInputChange}
                      />
                      {formErrors.email && (
                        <p className="error">{formErrors.email}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="login-label">Password</label>
                      <div className="password-container">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          name="password"
                          className="login-input"
                          placeholder="Enter your password"
                          value={formValues.password}
                          onChange={handleInputChange}
                        />
                        <i
                          className={`fas ${
                            passwordVisible ? "fa-eye-slash" : "fa-eye"
                          } password-icon`}
                          onClick={togglePasswordVisibility}
                        ></i>
                      </div>
                      {formErrors.password && (
                        <p className="error">{formErrors.password}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="forgot-password-back">
                      <a href="/forgot-password">Forget password?</a>
                    </td>
                  </tr>
                  <tr className="login-btn-back">
                    <td>
                      <button  className="login-btn" type="submit">
                        Login
                      </button>
                    </td>
                    <td>
                      <button
                        className="login-btn"
                        type="button"
                        onClick={() => {
                          setFormValues({ email: "", password: "" });
                          setFormErrors({ email: "", password: "" });
                        }}
                      >
                        Reset
                      </button>
                    </td>
                  </tr>
                  <tr className="login-register">
                    <td>
                      Don't Have an account? <NavLink to="/Signup">Register</NavLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
