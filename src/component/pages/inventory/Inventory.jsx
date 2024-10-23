import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Inventory.css";

const Inventory = () => {
  //Hooks
  const [addBtn, setaddBtn] = useState("unclicked");
  const [backBtn, setbackBtn] = useState("unclicked");
  const [selectedPlatform, setSelectedPlatform] = useState(
    "All",
    "shopify",
    "daraz"
  );
  const [filterOpen, setFilterOpen] = useState("close");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  //Variables
  const shopify_logo = "/public/Shopify-Logo.png";
  const daraz_logo = "/public/Daraz-logo-3.png";
  const back_icon = "/public/arrow-small-left.png";

  //Functions
  const toggleSearch = () => {
    setFilterOpen(filterOpen === "close" ? "open" : "close");
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
  };

  const toggleAddBtn = () => {
    setaddBtn(addBtn === "unclicked" ? "clicked" : "unclicked");
  };

  const toggleBackBtn = () => {
    setbackBtn(backBtn === "unclicked" ? "clicked" : "unclicked");
    setaddBtn("unclicked");
  };

  const handleSearch = () => {
    const filtered = products.filter(
      (product) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setProductsCount(filtered.length);
  };

  /*testing API to display data on product page*/
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let platformProducts = [];
      const shopify = "https://dummyjson.com/products/search?q=phone";
      const daraz = "https://dummyjson.com/products/search?q=all";
      try {
        if (selectedPlatform === "shopify") {
          const response = await fetch(shopify);
          const data = await response.json();
          platformProducts = data.products.map((product) => ({
            ...product,
            platform: { name: "shopify", logo: shopify_logo },
          })); //this Products array going to save the data that we fetch through the api
        } else if (selectedPlatform === "daraz") {
          const response = await fetch(daraz);
          const data = await response.json();
          platformProducts = data.products.map((product) => ({
            ...product,
            platform: { name: "daraz", logo: daraz_logo },
          })); //this Products array going to save the data that we fetch through the api
        } else if (selectedPlatform === "All") {
          //through this we are fetching shopify products using shopify api
          const shopifyresponse = await fetch(shopify);
          const shopifydata = await shopifyresponse.json();
          const shopifyproducts = shopifydata.products.map((product) => ({
            ...product,
            platform: { name: "shopify", logo: shopify_logo },
          })); //here we are adding new colum in array name platform

          const darazresponse = await fetch(daraz);
          const darazdata = await darazresponse.json();
          const darazproducts = darazdata.products.map((product) => ({
            ...product,
            platform: { name: "daraz", logo: daraz_logo },
          }));

          platformProducts = [...shopifyproducts, ...darazproducts]; //this Products array going to save the data that we fetch through these two api
        }
        setProducts(platformProducts);
        setFilteredProducts(platformProducts);
        setProductsCount(platformProducts.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedPlatform]);

  if (loading) return <div className="loader"></div>;

  return (
    <>
      {/* Add Product Form */}
      <div
        className="main-add-product-back"
        style={{ display: addBtn === "clicked" ? "block" : "none" }}
      >
        <div className="platform-logo-back">
          <img
            src={
              selectedPlatform === "shopify"
                ? shopify_logo
                : selectedPlatform === "daraz"
                ? daraz_logo
                : ""
            }
            alt=""
            className="platform-logo"
          />
          <img
            onClick={toggleBackBtn}
            src={back_icon}
            className="main-product-back-btn"
            alt="Back"
          />
        </div>
        <div className="add-product-form-back">
          <div className="add-product-heading">
            <h3>Add Product</h3>
          </div>
          <form className="add-product-form">
            <div className="add-product-form-half-back">
              <div className="add-product-form-half1">
                <label htmlFor="title">Title</label>
                <input
                  name="title"
                  type="text"
                  className="add-product-form-input"
                  placeholder="Enter product title"
                  required
                />
                <label htmlFor="description">Description</label>
                <textarea
                  name="body_html"
                  className="description"
                  placeholder="Enter product description"
                  required
                ></textarea>
                <label htmlFor="media">Media</label>
                <input name="media" type="file" className="add-product-image" />
              </div>
              <div className="add-product-form-half2">
                <label htmlFor="category">Category</label>
                <input
                  name="category"
                  type="text"
                  className="add-product-form-input"
                  placeholder="Enter product category"
                  required
                />
                <label htmlFor="product_type">Product Type</label>
                <input
                  name="product_type"
                  type="text"
                  className="add-product-form-input"
                  placeholder="Enter product type"
                  required
                />
                <label htmlFor="vendor">Vendor</label>
                <input
                  name="vendor"
                  type="text"
                  className="add-product-form-input"
                  placeholder="Enter product Vendor"
                  required
                />
                <label htmlFor="price">Price</label>
                <input
                  name="price"
                  type="number"
                  className="add-product-form-input"
                  placeholder="Enter product price"
                  required
                />
                <label htmlFor="sku">SKU (stock keeping unit)</label>
                <input
                  name="sku"
                  type="number"
                  className="add-product-form-input"
                  placeholder="Enter product SKU"
                  required
                />
              </div>
            </div>
            <div className="add-product-form-btn-back">
              <button className="add-product-form-btn" type="submit">
                Create
              </button>
              <button className="add-product-form-btn" type="reset">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Inventory Overview */}
      <div
        className="main-inventory-back"
        style={{ display: addBtn === "clicked" ? "none" : "block" }}
      >
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
            <h3>Inventory</h3>
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

        {/* Inventory Products */}
        <div className="inventory-product-back">
          <div className="inventory-crud-btn-back">
            <button onClick={toggleAddBtn} className="inventory-crud-btn"
            style={{display:selectedPlatform==="All"?"none":"block"}}>
              Add
            </button>
            <label className="inventory-result">
              no of products {productsCount}
            </label>
          </div>
          {/*this inventory table is to display products on individual ecommerce platform*/}
          <div
            id="inventory-product-table"
            className="inventory-product-table-back"
            style={{ display: selectedPlatform === "All" ? "none" : "block" }}
          >
            <table className="inventory-product-table">
              <thead>
                <tr>
                  <th>IMAGE</th>
                  <th>TITLE</th>
                  <th id="description">DESCRIPTION</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {products && products.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="inventory-product-image"
                        />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.description}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <div className="action-button-back">
                          <NavLink
                            to={`/Navbar/Inventory/${product.id}`}
                            state={{ platform: product.platform.name }}
                            id="inventory-update-btn"
                            className="action-button"
                          >
                            Update
                          </NavLink>
                          <button
                            id="inventory-delete-btn"
                            className="action-button"
                          >
                            Delete
                          </button>
                        </div>
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
          {/*this inventory table is to display products on all available ecommerce platform*/}
          <div
            id="inventory-all-table"
            className="inventory-product-table-back"
            style={{ display: selectedPlatform === "All" ? "block" : "none" }}
          >
            <table className="inventory-product-table">
              <thead>
                <tr>
                  <th>IMAGE</th>
                  <th>TITLE</th>
                  <th id="description">DESCRIPTION</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>PLATFORM</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {products && products.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="inventory-product-image"
                        />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.description}</td>
                      <td>{product.category}</td>
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
                        <div className="action-button-back">
                          <NavLink
                            to={`/Navbar/Inventory/${product.id}`}
                            state={{ platform_logo: product.platform.logo }}
                            id="inventory-update-btn"
                            className="action-button"
                          >
                            Update
                          </NavLink>
                          <button
                            id="inventory-delete-btn"
                            className="action-button"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">
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
      </div>
    </>
  );
};

export default Inventory;
