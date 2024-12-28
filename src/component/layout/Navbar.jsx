import { React, useState, useEffect } from "react";
import "./Navbar.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  //hooks
  const [sidebar, setsidebar] = useState("close");
  const [submenu, setsubmenu] = useState("close");
  const [dropProfile, setdropProfile] = useState("close");
  const [updateBtn, setupdateBtn] = useState(false);
  const { authToken, logout } = useAuth();
  const [userProfile, setUserProfile] = useState({
    //for displaying user info
    name: "",
    email: "",
    profilePicture: "",
  });
  //variable
  const navigate = useNavigate();
  //functions
  const toggleUpdateInfo = () => {
    setupdateBtn(updateBtn === true ? false : true);
    setdropProfile(updateBtn === true ? "open" : "close");
  };
  const togglesidebar = () => {
    setsidebar(sidebar === "close" ? "open" : "close");
    //setdropProfile(sidebar==="open"?'close':'');
  };
  const toggleSubmenu = () => {
    setsubmenu(submenu === "close" ? "open" : "close");
  };
  const toggleProfile = () => {
    setdropProfile(dropProfile === "close" ? "open" : "close");
  };
  //to change the value of input field 
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  
  //function to fetch loggedin user profile info
  const userInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/me",
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Send the auth token
          },
          withCredentials: true, // Include cookies if needed
        }
      );
      console.log("User Info: ", response.data);
      // Assuming response.data.data.user contains the user object
      const user = response.data.data.user;
      setUserProfile({
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      });
    } catch (error) {
      console.error("Error fetching user information", error);
    }
  };
  //function to update user profile info
  const UpdateUser = async ()=>{
    try {

      const url = `http://localhost:3000/api/v1/users/manage-profile`;
      const response = await axios.put(url,
        userProfile,
        {
          headers:{
            Authorization: `Bearer ${authToken}`,
          }
        },
        {
        withCredentials:true,
        }
      );
      alert("User info updated successfully");
      console.log("User info updated successfully",response.data);
    } catch (error) {
      console.log("error updating user info",error);
    }
  }
  //function to handle logout
  const handleLogout = async () => {
    const confirmDelete = window.confirm("Are you sure you want to logout?");
    if (!confirmDelete) return;
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/logout",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
        {
          withCredentials: true, // Ensure the JWT cookie is sent with the request
        }
      );
      logout();
      console.log("you have logged out successfully", response);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  useEffect(() => {
    userInfo();
  }, []);

  return (
    <>
      <div className="background"></div>
      <div className="main">
        <nav className="navbar">
          <div className="navbar-container">
            <div
              onClick={togglesidebar}
              className="menu-container"
              style={{
                backgroundColor:
                  sidebar === "open"
                    ? "  rgba(8, 49, 102, 0.911)"
                    : "  rgb(2, 8, 16)",
              }}
            >
              <img className="menu-icon" src="/public/menu.png" alt="" />
            </div>
            <ul>
              <li>
                SellerPulse
                <img
                  className="logo"
                  src="/public/shopping-cart-right-arrow-button.png"
                ></img>
              </li>
            </ul>
          </div>
          <div
            onClick={toggleProfile}
            className="nav-profile"
            style={{
              backgroundImage:
                dropProfile === "open"
                  ? " linear-gradient( rgb(192, 192, 192) , rgb(204, 204, 204))"
                  : updateBtn === true
                  ? " linear-gradient( rgb(192, 192, 192) , rgb(204, 204, 204))"
                  : "",
            }}
          >
            <img
              src={userProfile.profilePicture}
              id="nav-profile-pic"
              alt="profile pic"
            />
            <label className="nav-profile-info">{userProfile.name}</label>
            <img
              src="/public/arrow.png"
              style={{
                transform:
                  dropProfile === "open"
                    ? "rotate(180deg)"
                    : updateBtn === true
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
              alt=""
              className="profile-arrow"
            />
          </div>
        </nav>
        <div className="content-container">
          <div
            className={`sidebar `}
            style={{ width: sidebar === "open" ? "200px" : "45px" }}
          >
            <ul>
              <li>
                <NavLink
                  to="Dashboard/TotalProduct"
                  className={(e) => {
                    return e.isActive ||
                      location.pathname.startsWith(
                        "/Navbar/Dashboard/TotalOrder"
                      ) ||
                      location.pathname.startsWith(
                        "/Navbar/Dashboard/TotalSales"
                      )
                      ? "menu-options-active"
                      : "menu-options";
                  }}
                >
                  <img
                    className="dashboard"
                    src="/public/dashboard_1.png"
                  ></img>
                  <label className="link">Dashboard</label>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="Products"
                  className={(e) => {
                    return e.isActive ||
                      location.pathname.startsWith("/Navbar/ProductReviews")
                      ? "menu-options-active"
                      : "menu-options";
                  }}
                >
                  <img className="products" src="/public/product.png"></img>
                  <label className="link">Products</label>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="Inventory"
                  className={(e) => {
                    return e.isActive ? "menu-options-active" : "menu-options";
                  }}
                >
                  <img className="inventory" src="/public/inventory.png"></img>
                  <label className="link">Inventory</label>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="Sales"
                  className={(e) => {
                    return e.isActive ? "menu-options-active" : "menu-options";
                  }}
                >
                  <img className="sales" src="/public/sales.png"></img>
                  <label className="link">Sales</label>
                </NavLink>
              </li>
              <li className="store-back">
                <NavLink
                  to="/Navbar/connect-shopify"
                  className={(e) => {
                    return e.isActive ||
                      location.pathname.startsWith("connect-shopify") ||
                      location.pathname.startsWith("connect-daraz") ||
                      location.pathname.startsWith("connect-ebay")
                      ? "menu-options-active"
                      : "menu-options";
                  }}
                  style={{
                    backgroundColor: submenu === "open" ? " #083166e8" : "",
                    borderRight: submenu === "open" ? "1px solid #ffffff" : "",
                  }}
                >
                  <img
                    className="store"
                    src="/public/basket-shopping-simple.png"
                  ></img>
                  <span onClick={toggleSubmenu} className="link">
                    Stores
                  </span>
                  <img
                    onClick={toggleSubmenu}
                    src="/public/right-arrow.png"
                    alt=""
                    style={{
                      display: sidebar === "open" ? "inline" : "none",
                      transform:
                        submenu === "open" ? "rotate(90deg)" : "rotate(270deg)",
                    }}
                    className="arrow"
                  />
                </NavLink>
              </li>
              <div
                style={{
                  height:
                    sidebar === "close"
                      ? "0px"
                      : submenu === "open"
                      ? "145px"
                      : "0px",
                }}
                className="dropdown"
              >
                <li>
                  <img
                    src="/public/amazon111.jpg"
                    alt=""
                    className="logo"
                    id="amazon-logo"
                  />
                  <label className="label" id="amazon-label">
                    Amazon
                  </label>
                  <NavLink to="connect" className="connect">
                    Connect
                  </NavLink>
                </li>
                <li>
                  <img
                    src="/public/Daraz-logo-3.png"
                    alt=""
                    className="logo"
                    id="daraz-logo"
                  />
                  <label className="label" id="daraz-label">
                    Daraz
                  </label>
                  <NavLink to="connect-daraz" className="connect">
                    Connect
                  </NavLink>
                </li>
                <li>
                  <img src="/public/Shopify-Logo.png" alt="" className="logo" />
                  <label className="label" id="shopify-label">
                    Shopify
                  </label>
                  <NavLink to="connect-shopify" className="connect">
                    Connect
                  </NavLink>
                </li>
                <li>
                  <img
                    src="/public/ebay-logo.png"
                    alt=""
                    className="logo"
                    id="ebay-logo"
                  />
                  <label className="label" id="ebay-label">
                    ebay
                  </label>
                  <NavLink to="connect-ebay" className="connect">
                    Connect
                  </NavLink>
                </li>
              </div>
              <li>
                <NavLink
                  to="Guideline"
                  className={(e) => {
                    return e.isActive ? "menu-options-active" : "menu-options";
                  }}
                >
                  <img className="guideline" src="/public/guide.png"></img>
                  <label className="link">Guidelines</label>
                </NavLink>
              </li>
            </ul>
            <button className="logout_back" onClick={handleLogout}>
              <img
                src="/public/insert-alt (2).png"
                alt=""
                className="logout_icon"
              />
              <div className="logout_btn">Logout</div>
            </button>
          </div>
          <div
            className="content"
            style={{
              marginLeft:
                sidebar === "open"
                  ? "-155px"
                  : "" /* width: sidebar === "open" ? "80%" : "92%"*/,
              marginRight:
                dropProfile === "open"
                  ? "-180px"
                  : updateBtn === true
                  ? "-180px"
                  : "" /* width: sidebar === "open" ? "80%" : "92%"*/,
            }}
          >
            {<Outlet />}
          </div>
          {/*User Profile Sidebar code  */}
          <div
            className="user-profile-sidebar-back"
            style={{
              width:
                dropProfile === "open"
                  ? "180px"
                  : updateBtn === true
                  ? "180px"
                  : "0px",
            }}
          >
            <div className="user-profile-info-back">
              <div className="user-profile-pic-back">
                <img
                  src={userProfile.profilePicture}
                  className="user-profile-pic"
                  alt=""
                />
              </div>
              <div
                className="user-profile-info"
                style={{ height: updateBtn === false ? "100px" : "140px" }}
              >
                <input
                  onChange={handleOnChange}
                  disabled={updateBtn === true ? false : true}
                  className="user-profile-input"
                  type="text"
                  name="name"
                  style={{
                    border:
                      updateBtn === true ? "1px solid rgb(76, 76, 76)" : "none",
                  }}
                  value={userProfile.name}
                />
                <input
                  onChange={handleOnChange}
                  disabled={updateBtn === true ? false : true}
                  className="user-profile-input"
                  type="text"
                  name="email"
                  style={{
                    border:
                      updateBtn === true ? "1px solid rgb(76, 76, 76)" : "none",
                  }}
                  value={userProfile.email}
                />
                <input
                  className="user-profile-input"
                  type="file"
                  style={{
                    visibility: updateBtn === true ? "visible" : "hidden",
                    border:
                      updateBtn === true ? "1px solid rgb(76, 76, 76)" : "none",
                  }}
                />
              </div>
              <div className="user-profile-btn-back">
                <button
                  className="user-profile-btn"
                  onClick={toggleUpdateInfo}
                  style={{
                    visibility: updateBtn === true ? "hidden" : "visible",
                  }}
                >
                  Update Info
                </button>
                <button
                onClick={UpdateUser}
                  id="confirm-btn"
                  className="user-profile-btn"
                  style={{
                    visibility: updateBtn === true ? "visible" : "hidden",
                  }}
                >
                  Confirm
                </button>
                <button
                  id="cancel-btn"
                  className="user-profile-btn"
                  onClick={toggleUpdateInfo}
                  style={{
                    visibility: updateBtn === true ? "visible" : "hidden",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
