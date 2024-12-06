import React from "react";
import { useState } from "react";
import "./Navbar.css";
import { Outlet, NavLink } from "react-router-dom";


const Navbar = () => {
  //hooks
  const [sidebar, setsidebar] = useState("close");
  const [submenu, setsubmenu] = useState("close");
  const [dropProfile, setdropProfile] = useState("close");
  const [updateName, setupdateName] = useState("M.Fahad Pervaiz");
  const [updateEmail, setupdateEmail] = useState("fahadpervaiz2001@gmail.com");
  const [updateBtn, setupdateBtn] = useState(true);

  //Variable 
 
  //functions
  const toggleUpdateInfo = () => {
    setupdateBtn(updateBtn === true ? false : true);
  };
  const updateChangeName = (event) => {
    setupdateName(event.target.value);
  };
  const updateChangeEmail = (event) => {
    setupdateEmail(event.target.value);
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
                  : "",
            }}
          >
            <img
              src="/public/team-image02.jpg"
              id="nav-profile-pic"
              alt="profile pic"
            />
            <label className="nav-profile-info">{updateName}</label>
            <img
              src="/public/arrow.png"
              style={{
                transform:
                  dropProfile === "open" ? "rotate(180deg)" : "rotate(0deg)",
              }}
              alt=""
              className="profile-arrow"
            />
          </div>
        </nav>
        <div className="content-container">
          <div
            className="drop-down-profile-back"
            style={{ width: dropProfile === "open" ? "180px" : "0px" }}
          >
            <div className="dropdown-profile">
              <div className="profile-pic-back">
                <img
                  src="/public/team-image02.jpg"
                  alt=""
                  className="drop-profile-pic"
                />
              </div>
              <div className="drop-profile-info">
                <form action="">
                  <input
                    autoComplete="off"
                    type="text"
                    className="drop-profile-input"
                    value={updateName}
                    onChange={updateChangeName}
                    placeholder="Enter your name"
                    required
                    disabled={updateBtn}
                    style={{
                      border: updateBtn === false ? "1px solid grey" : "",
                    }}
                  />
                  <input
                    autoComplete="off"
                    type="email"
                    className="drop-profile-input"
                    id="drop-profile-email"
                    placeholder="Enter your @example.com"
                    value={`${updateEmail}`}
                    onChange={updateChangeEmail}
                    required
                    disabled={updateBtn}
                    style={{
                      border: updateBtn === false ? "1px solid grey" : "",
                    }}
                  />
                </form>
              </div>
              <button onClick={toggleUpdateInfo} className="drop-update-btn">
                Update info
              </button>
            </div>
          </div>

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
                    return e.isActive || location.pathname.startsWith('/Navbar/ProductReviews')? "menu-options-active" : "menu-options";
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
                <div
                  className="menu-options"
                  style={{
                    backgroundColor: submenu === "open" ? " #083166e8" : "",
                    borderRight: submenu === "open" ? "1px solid #ffffff" : "",
                  }}
                >
                  <img
                    className="store"
                    src="/public/basket-shopping-simple.png"
                  ></img>
                  <a onClick={toggleSubmenu} className="link">
                    Stores
                  </a>
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
                </div>
              </li>
              <div
                style={{
                  height:
                    sidebar === "close"
                      ? "0px"
                      : submenu === "open"
                      ? "153px"
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
                  <NavLink to="Popup" 
                   className="connect"
                   state={{platform:{name:"Amazon"}}}>
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
                  <NavLink to="Popup" className="connect"
                  state={{platform:{name:"daraz"}}}>
                    Connect
                  </NavLink>
                </li>
                <li>
                  <img src="/public/Shopify-Logo.png" alt="" className="logo" />
                  <label className="label" id="shopify-label">
                    Shopify
                  </label>
                  <NavLink to="Popup" className="connect"
                  state={{platform:{name:"shopify"}}}>

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
                  <NavLink to="Popup" className="connect"
                  state={{platform:{name:"ebay"}}}>
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
              <li>
                <NavLink
                  to="Setting"
                  className={(e) => {
                    return e.isActive ? "menu-options-active" : "menu-options";
                  }}
                >
                  <img className="guideline" src="/public/setting.png"></img>
                  <label className="link">Setting</label>
                </NavLink>
              </li>
            </ul>
            <NavLink to="/" className="logout_back">
              <img
                src="/public/insert-alt (2).png"
                alt=""
                className="logout_icon"
              />
              <div  className="logout_btn">
                Logout
              </div>
            </NavLink>
          </div>
          <div
            className="content"
            style={{
              marginLeft:
                sidebar === "open"
                  ? "-155px"
                  : "" /* width: sidebar === "open" ? "80%" : "92%"*/,
            }}
          >
            {<Outlet />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
