import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import axios from 'axios';
import CountUp from "react-countup";
import { Outlet, NavLink } from "react-router-dom";

const DashBoard = () => {
  const [graphopt, setGraphopt] = useState("close");
  const [topProducts, setTopProducts] = useState([]);
  const [TotalProduct ,setTotalProduct] = useState(0);
  const [loading, setLoading] = useState(false);

  const toggleGraphopt = () => {
    setGraphopt(graphopt === "close" ? "open" : "close");
  };

  //functions
  //to fetch all connected platform products
  const FetchAllProducts = async () => {
    setLoading(true);
    try {
      const url = `http://localhost:3000/api/v1/auth/all-products`;
      const response = await axios.get(url, { withCredentials: true });
      
      if (response.data && response.data.products) {
        const products = response.data.products;
  
        console.log("Total number of products:", products.length);
  
        // Set the total number of products
        setTotalProduct(products.length);
  
        // Assuming top 3 products are based on some criteria like highest sales
        const topSellingProducts = products
          .sort((a, b) => b.sales - a.sales) // Example sort based on sales
          .slice(0, 3); // Take the top 3
  
        setTopProducts(topSellingProducts);
      } else {
        console.error("No products found from the API.");
        setTopProducts([]);
        setTotalProduct(0);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    FetchAllProducts();
  }, [])
  
  if (loading) return <div className="loader"></div>;

  return (
    <>
      <div className="main-dashboard">
        <div className="dash-overview-back">
          <div className="overview-heading">
            <h3>Overview</h3>
          </div>
          <div className="dash-overview">
            <NavLink
              to="/Navbar/Sales"
              className="overview-cards"
              id="total-order"
            >
              <p>Total no of order</p>
              <h1><CountUp start={0} end={10} /></h1> {/* Display the total number of orders */}
            </NavLink>
            <NavLink
              to="/Navbar/Products"
              className="overview-cards"
              id="total-product"
            >
              <p>Total no of product</p>
              <h1>
                <CountUp start={0} end={TotalProduct} />
              </h1> {/* Display the total number of products */}
            </NavLink>
            <NavLink
              to="/Navbar/Sales"
              className="overview-cards"
              id="total-sales"
            >
              <p>Total sales</p>
              <h1>
                <label>Rs.</label><CountUp start={0} end={10} /> {/* Display the total sales */}
              </h1>
            </NavLink>
        
          </div>
          <div className="dash-graph">
            <div
              className="graph-opt-back"
              style={{ height: graphopt === "open" ? "85px" : "23.5px" }}
            >
              <div className="graph-cont">
                <li onClick={toggleGraphopt}>
                  <label className="graph-link">Graphs</label>
                </li>
              </div>
              <NavLink
                to="/Navbar/Dashboard/TotalOrder"
                className={(e) => {
                  return e.isActive
                    ? "graph-opt-back-li-active"
                    : "graph-opt-back-li";
                }}
              >
                <label className="graph-link">Total orders</label>
              </NavLink>
              <NavLink
                to="/Navbar/Dashboard/TotalProduct"
                className={(e) => {
                  return e.isActive
                    ? "graph-opt-back-li-active"
                    : "graph-opt-back-li";
                }}
              >
                <label className="graph-link">Total Products</label>
              </NavLink>
              <NavLink
                to="/Navbar/Dashboard/TotalSales"
                className={(e) => {
                  return e.isActive
                    ? "graph-opt-back-li-active"
                    : "graph-opt-back-li";
                }}
              >
                <label className="graph-link">Total Sales</label>
              </NavLink>
            </div>
            <div className="overview-graphs">
              <Outlet />
            </div>
          </div>
        </div>
        <div className="dash-product-back">
          <div className="product-heading">
            <h3>Top 3 Best selling product</h3>
          </div>
          <div className="scollable-container">
            {topProducts.map((product) => (
              <div key={product.id} className="dash-product-card-back">
                <img
                  src={product.thumbnail || product.image}
                  alt={product.title}
                  className="dash-product-card-img"
                />
                <div className="dash-product-detail">
                  <p className="detail-input" id="product-title">
                    {product.title}
                  </p>
                  <div className="sub-details">
                    <label>Price:</label>
                    <p
                      className="detail-input"
                      id="product-price"
                    >{`Rs.${product.price}`}</p>
                  </div>
                  <div className="sub-details">
                    <label>Category:</label>
                    <p className="detail-input" id="">
                      {product.category}
                    </p>
                  </div>
                  <div className="sub-details">
                    <label>Platform:</label>
                    <p className="detail-input" id="">
                      {product.platform.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
