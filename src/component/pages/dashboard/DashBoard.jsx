import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import CountUp from "react-countup";
import { Outlet, NavLink } from "react-router-dom";

const DashBoard = () => {
  const [graphopt, setGraphopt] = useState("close");
  const [topProducts, setTopProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  const toggleGraphopt = () => {
    setGraphopt(graphopt === "close" ? "open" : "close");
  };

  const fetchProducts = async (url) => {//this function is to fetch no of products and products data
    const response = await fetch(url);
    const data = await response.json();
    return { products: data.products, count: data.products.length };
  };

  const fetchCarts = async () => {//this function is to fetch no of orders in the carts 
    const response = await fetch("https://dummyjson.com/carts");
    const data = await response.json();
    return data.carts;
  };

  const productCount = async () => {
    setLoading(true);
    try {
      const urls = [// this is the array of urls in which we define pr add our urls 
        "https://dummyjson.com/products/search?q=phone",
        "https://dummyjson.com/products/search?q=all",
      ];

      const [productsData, cartsData] = await Promise.all([
        Promise.all(urls.map((url) => fetchProducts(url))),
        fetchCarts(),
      ]);

      // Calculate total product count
      const totalCount = productsData.reduce(
        (acc, { count }) => acc + count,
        0
      );
      setProductsCount(totalCount);

      // Calculate total orders and sales
      let totalSales = 0;
      let totalOrders = 0;

      cartsData.forEach((cart) => {
        cart.products.forEach((product) => {
          totalSales += product.price * product.quantity;
        });
        totalOrders += 1;
      });

      setTotalSales(totalSales);
      setTotalOrders(totalOrders);
    } catch (error) {
      console.error("Error fetching product or cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      setLoading(true);
      try {
        const { products } = await fetchProducts(
          "https://dummyjson.com/products/search?q=phone"
        );
        const bestSellers = products.slice(0, 3);
        setTopProducts(bestSellers);
      } catch (error) {
        console.error("Error fetching top-selling products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellingProducts();
    productCount();
  }, []);

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
              <h1><CountUp start={0} end={totalOrders} /></h1> {/* Display the total number of orders */}
            </NavLink>
            <NavLink
              to="/Navbar/Products"
              className="overview-cards"
              id="total-product"
            >
              <p>Total no of product</p>
              <h1>
                <CountUp start={0} end={productsCount} />
              </h1> {/* Display the total number of products */}
            </NavLink>
            <NavLink
              to="/Navbar/Sales"
              className="overview-cards"
              id="total-sales"
            >
              <p>Total sales</p>
              <h1>
                <label>Rs.</label><CountUp start={0} end={totalSales} /> {/* Display the total sales */}
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
                  src={product.thumbnail}
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
                      DummyJSON
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
