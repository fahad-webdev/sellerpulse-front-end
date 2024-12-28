import { React, useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is imported
import { useAuth } from '../../../context/AuthContext';
import "./User.css";
const Users = () => {
  const [GetUsers, setGetUsers] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!authToken) {
        setError('Token not found. Please log in again.');
        setLoading(false);
        logout(); // Assuming you have a logout function for clearing token and session
        return;
      }

      try {
        const URL = "http://localhost:3000/api/v1/users/get-all-users";
        console.log("authToken:", authToken); // Debugging the token value
        
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true, // Send cookies for authentication
        });

        const users = response.data.data.users;
        setGetUsers(users);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err); // Log error details
        setError(err.response?.data?.message || "Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [authToken]); // Add authToken as a dependency

  if (Loading) return <div className="loader"></div>;

  return (
    <div className="users-main-back">
      <div className="users-main">

<div className="product-card-scroll" id="user-card-scroll">

{GetUsers.map((user, index) => (
        <div className='product-card-back' key={index}>
        <div className="product-card">
          <img
            id="admin-table-profile"
            src={user.profilePicture}
            alt={user.name}
          />
          <label>{user.name}</label>
          <label>{user.email}</label>
          <label>{user.role}</label>
        </div>
        </div>
      ))}
  
</div>

      </div>
      
    </div>
  );
};

export default Users;
