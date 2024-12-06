import React, { useState, useEffect } from "react";
//import BarChartSales from "../../graphs/BarChartSales";
import SemiCircleSales from "../../graphs/SemiCircleSales";
import ComposedChartComponent from "../../graphs/ComposedChartComponent";
import CountUp from "react-countup";
import "./Sales.css";

const Sales = () => {
  //================================= Hooks=================================
  const [selectedPlatform, setSelectedPlatform] = useState(
    "shopify",
    "daraz",
    "All",
  );
  const [filterOpen, setFilterOpen] = useState("close");
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  //Variables
  const shopify_logo = "/public/Shopify-Logo.png";
  const daraz_logo = "/public/Daraz-logo-3.png";
  //============================== Functions==================================
  const toggleSearch = () => {
    setFilterOpen(filterOpen === "close" ? "open" : "close");
  };

  //this function is used to fetch no of orders placed
  const fetchCarts = async () => {
    const response = await fetch("https://dummyjson.com/carts");
    const data = await response.json();
    return data.carts;
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
  };
  const handleSearch = () => {
    const filtered = products.filter(
      (product) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    //setProductsCount(filtered.length);
  };
  // this function is used to fetch the products data
  const fetchProducts = async () => {
    setLoading(true);
    let PlatformProduct = [];
    const shopifyUrl = "http://localhost:5000/api/auth/shopify-products";
    const darazUrl = "https://dummyjson.com/products/search?q=all";

    try {
      if (selectedPlatform === "shopify") {
        const response = await fetch(shopifyUrl);
        const data = await response.json();
        PlatformProduct = data.products.map((product) => ({
          ...product,
          platform: { name: "shopify", logo: shopify_logo },
        }));
      } else if (selectedPlatform === "daraz") {
        const response = await fetch(darazUrl);
        const data = await response.json();
        PlatformProduct = data.products.map((product) => ({
          ...product,
          platform: { name: "daraz", logo: daraz_logo },
        }));
      } else if (selectedPlatform === "All") {
        const shopifyresponse = await fetch(shopifyUrl);
        const shopify_data = await shopifyresponse.json();
        const shopify_products = shopify_data.products.map((product) => ({
          ...product,
          platform: { name: "shopify", logo: shopify_logo },
        }));

        const darazresponse = await fetch(darazUrl);
        const daraz_data = await darazresponse.json();
        const daraz_products = daraz_data.products.map((product) => ({
          ...product,
          platform: { name: "daraz", logo: daraz_logo },
        }));

        PlatformProduct = [...shopify_products, ...daraz_products];
      }

      setProducts(PlatformProduct); // Adjust based on the API response structure
      setProductsCount(PlatformProduct.length); // to calculate no of products
      setFilteredProducts(PlatformProduct);
    } catch (error) {
      console.log("error in fetching products....", error);
    } finally {
      setLoading(false);
    }
  };
  // Function to calculate total orders for the selected platform
  const productCount = async () => {
    setLoading(true);

    let url = "https://dummyjson.com/products";

    if (selectedPlatform === "shopify") {
      url = "http://localhost:5000/api/auth/shopify-products";
    } else if (selectedPlatform === "daraz") {
      url = "https://dummyjson.com/products/search?q=all";
    }

    try {
      const productsData = await fetchProducts(url);
      const cartsData = await fetchCarts();

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

  // Fetch products based on selected platform
  useEffect(() => {
    productCount();
    fetchProducts();
  }, [selectedPlatform]);

    if (loading) return <div className="loader"></div>;

  return (
    <>
      <div className="main-sales-back">
        {/* Product Search Dropdown */}
        <div
          className="product-filter-back"
          style={{ height: filterOpen === "open" ? "78px" : "0px" }}
        >
          <div className="filter-search-back">
            <input
              type="text"
              className="filter-search-input"
              placeholder="Search product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="filter-search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        {/* Inventory Main Overview */}
        <div className="inventory-main-overview-back">
          <div className="inventory-main-overview">
            <h3>Sales</h3>
            <div className="product-platform-option">
              <button
                className="platform-name"
                style={{
                  backgroundImage:
                    selectedPlatform === "shopify"
                      ? "linear-gradient(#1c59aa,#1c59aa)"
                      : "",
                }}
                onClick={() => handlePlatformChange("shopify")}
              >
                Shopify
              </button>
              <button
                className="platform-name"
                style={{
                  backgroundImage:
                    selectedPlatform === "daraz"
                      ? "linear-gradient(#1c59aa,#1c59aa)"
                      : "",
                }}
                onClick={() => handlePlatformChange("daraz")}
              >
                Daraz
              </button>
              <button className="platform-name" disabled>
                Amazon
              </button>
              <button className="platform-name" disabled>
                eBay
              </button>
              <button
                className="platform-name"
                style={{
                  backgroundImage:
                    selectedPlatform === "All"
                      ? "linear-gradient(#1c59aa,#1c59aa)"
                      : "",
                }}
                onClick={() => handlePlatformChange("All")}
              >
                All
              </button>
            </div>
          </div>
          <button
            onClick={toggleSearch}
            className="platform-filter-btn"
            style={{
              backgroundImage:
                filterOpen === "open" ? "linear-gradient(#1c59aa,#1c59aa)" : "",
            }}
          >
            Filter
          </button>
        </div>
        <div className="sales-scrollable">
          <div className="main-sales">
            <div className="sales-overview-back">
              <div className="sales-main-overview">
                <div className="sales-overview">
                  <h2>Total Sales</h2>
                  <div className="sales-graphs-back">
                    <div className="sales-graphs">
                      <div className="sales-stats">
                        <p>
                          <CountUp start={0} end={totalSales} />
                        </p>
                        <label>Sales Increased</label>
                      </div>
                      <div className="sales-circle-graph">
                        {/* Add graph components here */}
                        <SemiCircleSales
                          percentage={85}
                          color="#0c1a3c"
                          strokeWidth={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sales-overview">
                  <h2>Total Orders</h2>
                  <div className="sales-graphs-back">
                    <div className="sales-graphs">
                      <div className="sales-stats">
                        <p>
                          <CountUp start={0} end={totalOrders} />
                        </p>
                        <label> </label>
                      </div>
                      <div className="sales-circle-graph">
                        {/* Add graph components here */}
                        <SemiCircleSales
                          percentage={totalOrders}
                          color="#0c1a3c"
                          strokeWidth={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sales-analytics-back" id="graph-for-small">
                <h2>Sales Analytics</h2>
                <div className="sales-analytics">
                  <ComposedChartComponent />
                </div>
              </div>
              {/*=====================Sales Inventory table======================== */}
              <div className="sales-product-back">
                <table
                  className="inventory-product-table"
                  id="individual-platform-table"
                  style={{
                    display: selectedPlatform === "All" ? "none" : "block",
                  }}
                >
                  <thead>
                    <tr>
                      <th>IMAGE</th>
                      <th>CATEGORY</th>
                      <th>TITLE</th>
                      <th>VENDOR</th>
                      <th>PRICE</th>
                      <th>QTY</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts && filteredProducts.length > 0 ? (
                      filteredProducts.map((product, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={product.image?.src}
                              alt={product.title}
                              className="inventory-product-image"
                            />
                          </td>
                          <td>{product.product_type}</td>
                          <td>{product.title}</td>
                          <td>{product.vendor}</td>
                          <td>{product.variants && product.variants.length>0 ?
                          (<p> RS. {product.variants[0].price} </p>):
                          (<p>${product.price}</p>)}</td>
                          <td>{product.variants && product.variants.length>0 ?
                          (<p> {product.variants[0].sku} </p>):""}</td>
                          <td>
                            <span className={product.variants[0].sku > 0 ? "in-stock" : "out-of-stock"}>
                              {product.variants[0].sku > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">
                          <span className="no-product-message">
                            No products available
                          </span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/*================================= sales All platform table======================= */}
                <table
                  className="inventory-product-table"
                  id="all-platform-table"
                  style={{
                    display: selectedPlatform === "All" ? "block" : "none",
                  }}
                >
                  <thead>
                    <tr>
                      <th>IMAGE</th>
                      <th>CATEGORY</th>
                      <th>TITLE</th>
                      <th>VENDOR</th>
                      <th>PRICE</th>
                      <th>QTY</th>
                      <th>PLATFORM</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts && filteredProducts.length > 0 ? (
                      filteredProducts.map((product, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="inventory-product-image"
                            />
                          </td>
                          <td>{product.category}</td>
                          <td>{product.title}</td>
                          <td>{product.brand}</td>
                          <td>{product.price}</td>
                          <td>{product.stock}</td>
                          <td id="platform-data">
                            <img
                              src={product.platform.logo}
                              alt=""
                              className="platform-logo"
                            />
                            <h2>{product.platform.name}</h2>
                          </td>
                          <td>
                            <span
                              className={
                                product.stock > 0 ? "in-stock" : "out-of-stock"
                              }
                            >
                              {product.stock > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">
                          <span className="no-product-message">
                            No products available
                          </span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="sales-analytics-back" id="graph-for-large">
              <h2>Sales Analytics</h2>
              <div className="sales-analytics">
                <ComposedChartComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sales;
