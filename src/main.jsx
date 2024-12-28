import * as React from "react";
import "./index.css";
import DashBoard from "./component/pages/dashboard/DashBoard";
import TotalProduct from "./component/graphs/TotalProduct";
import TotalOrder from "./component/graphs/TotalOrder";
import TotalSales from "./component/graphs/TotalSales";
import Products from "./component/pages/products/Products";
import Sales from "./component/pages/sales/Sales";
import Guideline from "./component/pages/guideline/Guideline";
import Profit from "./component/pages/profit/Profit";
import Inventory from "./component/pages/inventory/Inventory";
import Setting from "./component/pages/setting/Setting";
import Navbar from "./component/layout/Navbar";
import Signup from "./component/pages/signup/Signup";
import Login from "./component/pages/login/Login";
import Home from "./component/pages/home/Home";
import ProductReviews from "./component/pages/products/ProductReviews/ProductReviews";
import UpdateProduct from "./component/pages/products/UpdateProduct/UpdateProduct.jsx";
import PageNotFound from "./component/pages/pagenotfound/PageNotFound.jsx";
import PrivacyPolicy from "./component/pages/privay-policy/PrivacyPolicy.jsx";
import Connectshopify from "./component/pages/storeconnect/connectShopify";
import ConnectEbay from "./component/pages/storeconnect/connectEbay.jsx"
import * as ReactDOM from "react-dom/client";
import AdminPanel from "./component/admin/adminLayout/AdminPanel.jsx";
import AdminDashboard from "./component/admin/adminPages/dashboard/AdminDashboard.jsx";
import ManageUsers from "./component/admin/adminPages/manageUsers/ManageUsers.jsx";
import Users from "./component/admin/adminPages/users/Users.jsx";
import UpdateUsers from "./component/admin/adminPages/updateUsers/UpdateUsers.jsx";
import {AuthProvider , useAuth} from "./component/context/AuthContext.jsx";
import ConnectDaraz from "./component/pages/storeconnect/connectDaraz.jsx";


import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const {authToken} = useAuth();
  const isAuthenticated = authToken? true : false  
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
    path:"/Admin",
    element: <AdminPanel/>,
    children:[
      {
        path:'/Admin/Dashboard',
        element:<AdminDashboard/>
      },
      {
        path:'/Admin/Users',
        element:<Users/>
      },
      {
        path:'/Admin/manage-users',
        element:<ManageUsers/>
      },
    ]
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
        path: "/Navbar/connect-shopify",
        element: <Connectshopify />,
      },
      {
        path: "/Navbar/connect-daraz",
        element: <ConnectDaraz />,
      },
      {
        path: "/Navbar/connect-ebay",
        element: <ConnectEbay/>
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
  {
    path:'/PrivacyPolicy',
    element:<PrivacyPolicy/>,
  },
  {
    path:'*',
    element:<PageNotFound/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
