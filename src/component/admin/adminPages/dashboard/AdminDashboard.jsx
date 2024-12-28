import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext.jsx";
import CountUp from "react-countup";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [getUsers, setGetUsers] = useState([]); // Store user data
  const [chartData, setChartData] = useState([]); // Store data for the chart
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null); // Error state
//variables
  const {logout , authToken} = useAuth();//should import same as it is

  // Helper function to calculate users per month
  const calculateUsersPerMonth = (users) => {
    const monthCounts = {};

    users.forEach((user) => {
      const date = new Date(user.createdAt);
      const month = date.toLocaleString("default", { month: "long" }); // e.g., 'January'
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });

    return Object.entries(monthCounts).map(([month, count]) => ({
      month,
      usersAdded: count,
    }));
  };

  //function to calculate no of users added this month
  const getUsersAddedThisMonth = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0 for January, 1 for February, ...
    const currentYear = currentDate.getFullYear();
  
    // Filter users added this month
    const usersThisMonth = getUsers.filter((user) => {
      const userDate = new Date(user.createdAt);
      return (
        userDate.getMonth() === currentMonth &&
        userDate.getFullYear() === currentYear
      );
    });
  
    return usersThisMonth.length;
  };
  // Function to get the current month name
  const getCurrentMonthName = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0 for January, 1 for February, ...
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[currentMonth];
  };
  // Fetch users from the API when the component mounts
  useEffect(() => {
    if (!authToken) {
      setError('Token not found. Please log in again.');
      setLoading(false);
      logout();
      return;
    }
    const fetchUsers = async () => {
      
      try {
        const URL = "http://localhost:3000/api/v1/users/get-all-users";
        const response = await axios.get(
          URL,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
          {
            withCredentials: true, // Send cookies for authentication
          }
        );
        const users = response.data.data.users;
        setGetUsers(users);
        setChartData(calculateUsersPerMonth(users)); // Calculate chart data
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, [authToken]);

  if (loading) return <div className="loader"></div>;

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="admin-dashboard-main-back">
        <div className="admin-dashboard-main">
          <div className="admin-dashboard-info-back">
            <h1>Admin: Dashboard</h1>
            <div className="admin-dashboard-info">
              <NavLink to="/Admin/Users" className="admin-cards">
                <label htmlFor="">Total no of users</label>
                <h2> <CountUp start={0} end={getUsers.length} /></h2> 
              </NavLink>
              <NavLink to="#" className="admin-cards">
                <label htmlFor="">Users added in {getCurrentMonthName()} </label>
                <h2> <CountUp start={0} end={getUsersAddedThisMonth()} /></h2>
              </NavLink>
            </div>
          </div>
          <div className="admin-dashboard-user">
            <div id="inventory-admin-table" className="inventory-product-table-back">
              <table className="inventory-product-table">
                <thead>
                  <tr>
                    <th>IMAGE</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                  </tr>
                </thead>
                <tbody>
                  {getUsers.map((user, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          id="admin-table-profile"
                          src={user.profilePicture}
                          alt={user.name}
                        />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Graph Section */}
        <div className="admin-user-graph-back">
          <div className="admin-graph-heading-back">
            <h1>Users Per Month</h1>
          </div>
          <div className="admin-user-graph">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="usersAdded" fill="#113769" name="Users Added" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
