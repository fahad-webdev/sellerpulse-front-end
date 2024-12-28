import React, { useState, useEffect } from "react";
import "./Signup.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const signup = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setmessage] = useState({
    success: false,
    danger: false,
    alert: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [showError, setShowError] = useState({
    name: false,
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues, //for previous state value
      [name]: value, //this will make value change dynamically
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validate = () => {
    let errors = {};
    let showError = {
      name: false,
      email: false,
      password: false,
    };
    //showing error for empty name field
    if (!formValues.name) {
      errors.name = <div className="alert">Name is required</div>;
      showError.name = true;
    }

    //showing error for empty email field
    if (!formValues.email) {
      errors.email = <div className="alert">E-mail is required</div>;
      showError.email = true;
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = <div className="alert">E-mail address is invalid</div>;
      showError.email = true;
    }

    //showing error for empty password field
    if (!formValues.password) {
      errors.password = <div className="alert">Password is required</div>;
      showError.password = true;
    }

    setFormErrors(errors);
    setShowError(showError);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const URL = "http://localhost:3000/api/v1/users/signup";
        const response = await axios.post(
          URL,
          formValues,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // For cookies
          }
        );
  
        // If the signup is successful, clear the form
        setFormValues({
          name: "",
          email: "",
          password: "",
        });
        console.log("Registration successful", response);
        setmessage({ success: true ,danger: false ,alert:"Registration Successfull"});
      } catch (error) {
        // Check for duplicate email error
        if (error.response && error.response.status === 409) {
          return setmessage({alert:"email is already registered", success:false,danger:true});
        }
  
        // Handle other errors
        setmessage({alert:"Registration Failed", success:false,danger:true});
      }
    }
  };
  

  useEffect(() => {
    if (showError.email || showError.password) {
      const timer = setTimeout(() => {
        setFormErrors({
          name: "",
          email: "",
          password: "",
        });
        setShowError({
          name: false,
          email: false,
          password: false,
        });
      }, 2000);

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [showError]);

  return (
    <>
      <div className="signup-background"></div>
      <div className="signup-main">
        {/*Alert for signup creation*/}
        {message.success && (
          <div className="shopify-alert-back" id="signup-alert-back">
            <img src="../../../public/tick.png" alt="" className="alert-logo" />
            <h3 className="shopify-alert">
              <strong>Success! </strong>
              {message.alert}
            </h3>
            <img
              src="../../../public/close.png"
              alt=""
              className="close-logo"
              onClick={() => {
                setmessage(false);
                navigate("/Login");
              }}
            />
          </div>
        )}
        {/*Alert for signup failed*/}
        {message.danger && (
          <div className="shopify-alert-back" id="signup-danger-back">
            <img
              src="../../../public/warning.png"
              alt=""
              className="alert-logo"
            />
            <h3 className="shopify-alert">
              <strong>Sorry! </strong>
              {message.alert}
            </h3>
            <img
              src="../../../public/close-danger.png"
              alt=""
              className="close-logo"
              onClick={() => {
                setmessage(false);
              }}
            />
          </div>
        )}
        <div className="signup-form-main">
          <div className="signup-image-back">
            <div className="signup-about">
              <h2 id="heading-about">Welcome to SellerPulse:</h2>
              <h2>Your Ultimate E-Commerce Dashboard</h2>
              <p>
                Streamline your online business with real-time insights and
                analytics from Shopify, Daraz, and more. Optimize sales, manage
                inventory, and stay ahead with ease using SellerPulse.
              </p>
            </div>
          </div>
          <div className="signup-form-back">
            <form className="signup-form" onSubmit={handleSubmit}>
              <h1>Signup</h1>
              <table className="signup-table">
                <tbody>
                  <tr>
                    <td>
                      <label className="signup-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="signup-input"
                        placeholder="Enter your name"
                        value={formValues.name}
                        onChange={handleInputChange}
                      />
                      {formErrors.name && (
                        <p className="error">{formErrors.name}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="signup-label">E-mail</label>
                      <input
                        type="text"
                        name="email"
                        className="signup-input"
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
                      <label className="signup-label">Password</label>
                      <div className="password-container">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          name="password"
                          className="signup-input"
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
                  <tr className="signup-btn-back">
                    <td>
                      <button className="signup-btn" type="submit">
                        signup
                      </button>
                    </td>
                    <td>
                      <button
                        className="signup-btn"
                        onClick={() => {
                          setFormValues({ email: "", password: "" });
                          setFormErrors({ email: "", password: "" });
                        }}
                      >
                        Reset
                      </button>
                    </td>
                  </tr>
                  <tr className="signup-register">
                    <td>
                      Already have an account?{" "}
                      <NavLink to="/Login">Login</NavLink>
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

export default signup;
