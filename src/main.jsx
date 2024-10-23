import * as React from "react";
import "./index.css";
import DashBoard from "./component/pages/dashboard/DashBoard";
import TotalProduct from "./component/graphs/TotalProduct";
import TotalOrder from "./component/graphs/TotalOrder";
import TotalSales from "./component/graphs/TotalSales";
import Products from "./component/pages/products/Products";
import Sales from "./component/pages/sales/Sales";
import Guideline from "./component/pages/guideline/Guideline";
import Popup from "./component/pages/storeconnect/Popup";
import Profit from "./component/pages/profit/Profit";
import Inventory from "./component/pages/inventory/Inventory";
import Setting from "./component/pages/setting/Setting";
import Navbar from "./component/layout/Navbar";
import Signup from "./component/pages/signup/Signup";
import Login from "./component/pages/login/Login";
import Home from "./component/pages/home/Home";
import ProductReviews from "./component/pages/products/ProductReviews/ProductReviews";
import UpdateProduct from "./component/pages/products/UpdateProduct/UpdateProduct.jsx";
import * as ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  // Here you would check if the user is authenticated
  const isAuthenticated = true; // Replace this with actual authentication logic
  return isAuthenticated ? children : <Navigate to="/Login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/Navbar",
    element: (
      <ProtectedRoute>
        <Navbar />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/Navbar/Dashboard",
        element: <DashBoard />,
        children: [
          {
            path: "/Navbar/Dashboard/TotalProduct",
            element: <TotalProduct />,
          },
          {
            path: "/Navbar/Dashboard/TotalOrder",
            element: <TotalOrder />,
          },
          {
            path: "/Navbar/Dashboard/TotalSales",
            element: <TotalSales />,
          },
        ],
      },
      {
        path: "/Navbar/Products",
        element: <Products />,
      },
      {
        path: "/Navbar/Inventory",
        element: <Inventory />,
      },
      {
        path: "/Navbar/Sales",
        element: <Sales />,
      },
      {
        path: "/Navbar/Profit",
        element: <Profit />,
      },
      {
        path: "/Navbar/Popup",
        element: <Popup />,
      },
      {
        path: "/Navbar/Guideline",
        element: <Guideline />,
      },
      {
        path:'/Navbar/Setting',
        element:<Setting/>,
      },
      {
        path:'/Navbar/Products/:id',
        element:<ProductReviews/>,
      },
      {
        path:'/Navbar/Inventory/:id',
        element:<UpdateProduct/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
