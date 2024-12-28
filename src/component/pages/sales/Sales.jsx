import React, { useState, useEffect } from "react";
//import BarChartSales from "../../graphs/BarChartSales";
import SemiCircleSales from "../../graphs/SemiCircleSales";
import ComposedChartComponent from "../../graphs/ComposedChartComponent";
import CountUp from "react-countup";
import "./Sales.css";
import axios from "axios";

const Sales = () => {
  //================================= Hooks=================================
  const [selectedPlatform, setSelectedPlatform] = useState(
    "All",
    "shopify",
    "daraz",
    "ebay",
  );
  const [filterOpen, setFilterOpen] = useState("close");
  const [products, setProducts] = useState([]);
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
  // Function to calculate total orders for the selected platform
  const productCount = async () => {
    setLoading(true);

    let url = "https://dummyjson.com/products";

    if (selectedPlatform === "shopify") {
      url = "http://localhost:3000/api/v1/auth/shopify-products";
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
  //backend APIs 
  const shopify_url = `http://localhost:3000/api/v1/auth/shopify-products`;
  const daraz_url = `http://localhost:3000/api/v1/auth/daraz-products`;
  const ebay_url = `http://localhost:3000/api/v1/auth/ebay-products`;
  const all_products_url = `http://localhost:3000/api/v1/auth/all-products`;
  //function to fetch products from individual and all platforms
  const FetchProducts = async (url)=>{
    try {
      const response = await axios.get(url,{
        withCredentials:true,
      });
      console.log("Products: ", response.data);
      if(response.data && response.data.products){
        return response.data.products;
      }
    } catch (error) {
      console.log("Error fetching products", error);
      return [];
    }
  }
  // Fetch products based on selected platform
  useEffect(() => {
    setLoading(true);
  const fetchproducts = async () =>{
    try {
      if(selectedPlatform==="shopify"){
        setProducts(await FetchProducts(shopify_url));
        setFilteredProducts(await FetchProducts(shopify_url));
      }else if(selectedPlatform==="daraz"){
        setProducts(await FetchProducts(daraz_url));
        setFilteredProducts(await FetchProducts(daraz_url));
      }else if(selectedPlatform==="ebay"){
        setProducts(await FetchProducts(ebay_url));
        setFilteredProducts(await FetchProducts(ebay_url));
      }else if(selectedPlatform==="All"){
        setProducts(await FetchProducts(all_products_url));
        setFilteredProducts(await FetchProducts(all_products_url));
      }
    } catch (error) {
      console.log("Error fetching products", error);
    }finally{
      setLoading(false);
    }
  }
  fetchproducts();
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
              <button className="platform-name"
                style={{
                  backgroundImage:
                    selectedPlatform === "ebay"
                      ? "linear-gradient(#1c59aa,#1c59aa)"
                      : "",
                }}
                onClick={() => handlePlatformChange("ebay")} >
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
                          percentage={0}
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
                      <th>{selectedPlatform==="shopify"?"PRODUCT TYPE":(selectedPlatform==="daraz"?"CATEGORY":"")}</th>
                      <th >TITLE</th>
                      <th>{selectedPlatform==="shopify"?"VENDOR":(selectedPlatform==="daraz"?"BRAND":"")}</th>
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
                              src={ product.image?.src || product.thumbnail}
                              alt={product.title}
                              className="inventory-product-image"
                            />
                          </td>
                          <td>{product.product_type || product.category}</td>
                          <td>{product.title}</td>
                          <td>{product.vendor || product.brand}</td>
                          <td>{product.variants && product.variants.length>0 ?
                          (<p> RS. {product.variants[0].price} </p>):
                          (<p>${product.price}</p>)}</td>
                          <td>{product.variants && product.variants.length>0 ?
                          (<p> {product.variants[0].inventory_quantity} </p>):(
                            <p>{product.stock}</p>
                          )}</td>
                          <td>
                          <span
        className={
            product.variants?.[0]?.inventory_quantity || product.stock> 0
                ? "in-stock"
                : "out-of-stock"
        }
    >
        {product.variants?.[0]?.inventory_quantity ||product.stock> 0
            ? "In Stock"
            : "Out of Stock"}
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
                              src={(product.image) || (product.image?.src) || (product.thumbnail)}
                              alt={product.title}
                              className="inventory-product-image"
                            />
                          </td>
                          <td>{product.category||product.product_type}</td>
                          <td>{product.title}</td>
                          <td>{product.vendor || product.brand}</td>
                          <td><p>RS. {product.price}</p></td>
                           <td><p>{ product.inventory_quantity}{product.stock}</p></td>
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
            product.inventory_quantity || product.stock> 0
                ? "in-stock"
                : "out-of-stock"
        }
    >
        {product.inventory_quantity ||product.stock> 0
            ? "In Stock"
            : "Out of Stock"}
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
