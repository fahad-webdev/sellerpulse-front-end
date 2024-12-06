import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Inventory.css";
import axios from "axios";

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
  const [message, setmessage] = useState(false);

  const [AddProduct, setAddProduct] = useState({//add product state
    title: "",
    body_html: "",
    vendor: "",
    product_type: "",
    images: [], // Array to hold uploaded images
    variants: [{ price: "", sku: "" , inventory_quantity: "" }], // Initial variant data
  });

   // Handle image upload
   const handleImageUpload = (event) => {
    const files = event.target.files;
    const images = [];

    // Read files and convert to Base64
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        images.push(reader.result); // Base64 image
        if (images.length === files.length) {
          setAddProduct((prevData) => ({
            ...prevData,
            images,
          }));
        }
      };
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddProduct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Handle variant input changes
  const handleVariantChange = (e, index) => {
    const { name, value } = e.target;
    const updatedVariants = [...AddProduct.variants];
    updatedVariants[index] = { ...updatedVariants[index], [name]: value };
    setAddProduct((prevProduct) => ({
        ...prevProduct,
        variants: updatedVariants,
    }));
};

  //Variables
  const shopify_logo = "/public/Shopify-Logo.png";
  const daraz_logo = "/public/Daraz-logo-3.png";
  const back_icon = "/public/arrow-small-left.png";

  //Functions
  // Handle form submission (sending data to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const shopifyUrl = 'http://localhost:5000/api/auth/add-shopify-product';
      const response = await axios.post(shopifyUrl,
            AddProduct);
      setmessage(true);
      console.log('Product added:', response.data);
    } catch (error) {
      setmessage(false);
      console.error('Error adding product:', error);
    }
  };
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
        (product.brand || product.vendor)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (product.category || product.product_type)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setProductsCount(filtered.length);
  };

  /*testing API to display data on product page*/
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let platformProducts = [];
      const shopify = "http://localhost:5000/api/auth/shopify-products";
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
    {/*Alert for product creation*/}
    {message &&  <div className="shopify-alert-back">
    <img src="../../../public/tick.png" alt="" className="alert-logo" />
    <h3 className="shopify-alert">
      <strong>Success! </strong>
      Product added successfully
    </h3>
    <img src="../../../public/close.png" alt="" className="close-logo" onClick={()=>{setmessage(false)}}/>
  </div>}
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
          <form className="add-product-form" onSubmit={handleSubmit}>
            <div className="add-product-form-half-back">
              <div className="add-product-form-half1">
                <label htmlFor="title">Title</label>
                <input
                  name="title"
                  type="text"
                  className="add-product-form-input"
                  placeholder="Enter product title"
                  value={AddProduct.title}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="description">Description</label>
                <textarea
                  name="body_html"
                  className="description"
                  placeholder="Enter product description"
                  value={AddProduct.body_html}
                  onChange={handleChange}
                  required
                ></textarea>

                <label htmlFor="media">image</label>
                <input
                  name="images"
                  type="file"
                  className="add-product-image"
                  onChange={handleImageUpload}
                  multiple
                />
              </div>

              <div className="add-product-form-half2">
                <label htmlFor="product_type">Product Type</label>
                <input
                  name="product_type"
                  type="text"
                  className="add-product-form-input"
                  placeholder="Enter product type"
                  onChange={handleChange}
                  value={AddProduct.product_type}
                  required
                />

                <label htmlFor="vendor">Vendor</label>
                <input
                  name="vendor"
                  type="text"
                  className="add-product-form-input"
                  placeholder="Enter product vendor"
                  onChange={handleChange}
                  value={AddProduct.vendor}
                  required
                />

                <div>
                  <label htmlFor="price">Price</label>
                  {AddProduct.variants.map((variant, index) => (
                    <div key={index} className="variant-group">
                      <input
                        name="price"
                        type="number"
                        className="add-product-form-input"
                        placeholder="Enter product price"
                        value={variant.price}
                        onChange={(e) => handleVariantChange(e, index)}
                        required
                      />
                      <label htmlFor="sku">SKU (stock keeping unit)</label>
                      <input
                        name="sku"
                        type="text"
                        className="add-product-form-input"
                        placeholder="Enter product SKU"
                        value={variant.sku}
                        onChange={(e) => handleVariantChange(e, index)}
                        required
                      />
                      <label htmlFor="Inventory Quantity">Inventory Quantity </label>
                      <input
                        name="inventory_quantity"
                        type="text"
                        className="add-product-form-input"
                        placeholder="Enter no of product"
                        value={variant.inventory_quantity}
                        onChange={(e) => handleVariantChange(e, index)}
                        required
                      />
                    </div>
                  ))}
                </div>
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
            <button
              onClick={toggleAddBtn}
              className="inventory-crud-btn"
              style={{ display: selectedPlatform === "All" ? "none" : "block" }}
            >
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
                  <th>VENDOR</th>
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
                          src={product.image?.src || product.thumbnail}
                          alt={product.title}
                          className="inventory-product-image"
                        />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.body_html || product.description}</td>
                      <td>{product.product_type || product.category}</td>
                      <td>{product.vendor || product.brand}</td>
                      <td>
                        {product.variants && product.variants.length > 0 ? (
                          <p>RS.{product.variants[0].price}</p>
                        ) : (
                          <p> ${product.price}</p>
                        )}
                      </td>
                      <td>
                        {product.variants && product.variants.length > 0 ? (
                          <p>{product.variants[0].sku}</p>
                        ) : (
                          <p>{product.stock}</p>
                        )}
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
          {/*this inventory table is to display products on ALL available ecommerce platform*/}
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
                  <th>VENDOR</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>PLATFORM</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={product.thumbnail || product.image?.src}
                          alt={product.title}
                          className="inventory-product-image"
                        />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.description || product.body_html}</td>
                      <td>{product.category || product.product_type}</td>
                      <td>{product.brand || product.vendor}</td>
                      <td>
                        {product.variants && product.variants.length > 0 ? (
                          <p>RS.{product.variants[0].price}</p>
                        ) : (
                          <p>${product.price}</p>
                        )}
                      </td>
                      <td>
                        {product.variants && product.variants.length > 0
                          ? product.variants[0].sku
                          : product.stock}
                      </td>
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
