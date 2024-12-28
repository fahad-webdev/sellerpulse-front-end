import { React,useEffect,useState } from "react";
import "../../layout/Navbar.css";
import "./AdminPanel.css";
import axios from "axios";
import { Outlet, NavLink , useNavigate} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminPanel = () =>{
    const [sidebar, setsidebar] = useState("close");
    const [dropProfile, setdropProfile] = useState("close");
    const [userProfile , setUserProfile] = useState({
      name:"",
      email:"",
      password:"",
      profilePicture:"",
    });
    const [updateBtn, setupdateBtn] = useState(false);
    const {authToken , logout} = useAuth();
    //variable
    const navigate = useNavigate();
    //functions
    const toggleUpdateInfo = () => {
      setupdateBtn(updateBtn === true ? false : true);
      setdropProfile(updateBtn===true?"open":"close");
    };
    //to change the value of input field 
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
    const togglesidebar = () => {
      setsidebar(sidebar === "close" ? "open" : "close");
      //setdropProfile(sidebar==="open"?'close':'');
    };
    
    const toggleProfile = () => {
      setdropProfile(dropProfile === "close" ? "open" : "close");
    };
    //function to fetch loggedin user profile info
    const userInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/users/me", {
          headers: {
            Authorization: `Bearer ${authToken}`, // Send the auth token
          },
          withCredentials: true, // Include cookies if needed
        });
        console.log("User Info: ", response.data);
        // Assuming response.data.data.user contains the user object
        const user = response.data.data.user;
        setUserProfile(
          {name: user.name,
           email: user.email,
           password: user.password, 
           profilePicture:user.profilePicture,
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
    //function to logout 
    const handleLogout = async () => {
      const confirmDelete = window.confirm(
        "Are you sure you want to logout?"
      );
      if (!confirmDelete) return;
        try {
         const response = await axios.get('http://localhost:3000/api/v1/users/logout', 
         {
          headers:{
            Authorization: `Bearer ${authToken}`,
          }
         },
         {
          withCredentials: true, // Ensure the JWT cookie is sent with the request
        }
      );
          logout();
          console.log("you have logged out successfully",response);
          navigate('/');
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
      useEffect(() => {
        userInfo();
      }, [])
      
    return <>
    <div className="background"></div>
      <div className="main">
        {/*Navbar code  */}
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
                  :(updateBtn===true?" linear-gradient( rgb(192, 192, 192) , rgb(204, 204, 204))":""),
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
                  dropProfile === "open" ? "rotate(180deg)" : (updateBtn===true?"rotate(180deg)":"rotate(0deg)"),
              }}
              alt=""
              className="profile-arrow"
            />
          </div>
        </nav>
        <div className="content-container">
{/*Sidebar of left  */}
          <div
            className={`sidebar `}
            style={{ width: sidebar === "open" ? "200px" : "45px" }}
          >
            <ul>
              <li>
                <NavLink
                  to="Dashboard/"
                  className={(e) => {
                    return e.isActive ||
                      location.pathname.startsWith(
                        "/Admin/Dashboard"
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
                  to="Users"
                  className={(e) => {
                    return e.isActive 
                      ? "menu-options-active"
                      : "menu-options";
                  }}
                >
                  <img
                    className="dashboard "
                    src="../../../../public/group.png"
                  ></img>
                  <label className="link">Users</label>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="manage-users"
                  className={(e) => {
                    return e.isActive 
                      ? "menu-options-active"
                      : "menu-options";
                  }}
                >
                  <img
                    className=" admin-users"
                    src="../../../../public/user.png"
                  ></img>
                  <label className="link" >Manage </label>
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
                    : (updateBtn===true?"-180px":"")/* width: sidebar === "open" ? "80%" : "92%"*/,
            }}
          >
            {<Outlet />}
          </div>
           {/*User Profile Sidebar code  */}
           <div className="user-profile-sidebar-back" style={{width: dropProfile==="open"?"180px":(updateBtn===true?"180px":"0px")}}>
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
}
export default AdminPanel;