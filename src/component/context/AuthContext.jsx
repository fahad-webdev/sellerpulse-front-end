import React, { createContext, useState, useContext } from "react";

// Create a context for authentication
const AuthContext = createContext();

// Provider component that wraps your app and provides the context
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  // Function to handle login
  const login = (token) => {
    localStorage.setItem("authToken", token); // Save token to localStorage
    setAuthToken(token); // Set token to state
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
