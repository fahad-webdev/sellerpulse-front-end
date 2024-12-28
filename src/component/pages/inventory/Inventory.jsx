import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Inventory.css";
import axios from "axios";
import {useAuth } from "../../context/AuthContext"

const Inventory = () => {
  //Hooks
  const [addBtn, setaddBtn] = useState("unclicked");
  const [backBtn, setbackBtn] = useState("unclicked");
  const [selectedPlatform, setSelectedPlatform] = useState(
    "All",
    "shopify",
    "daraz",
    "ebay"
  );
  const [filterOpen, setFilterOpen] = useState("close");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setmessage] = useState(false);

  const [AddProduct, setAddProduct] = useState({
    title: "",
    body_html: "",
    vendor: "",
    product_type: "",
    variants: [{ price: "", inventory_quantity: "" }],
    imageUrl: "", // This will store the URL of the uploaded image
  });
  const authToken = useAuth();
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("variants") || name.startsWith("image")) {
      const [mainKey, subKey] = name.split(".");
      setAddProduct((prevData) => ({
        ...prevData,
        [mainKey]: {
          ...prevData[mainKey],
          [subKey]: value,
        },
      }));
    } else {
      setAddProduct((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  //handle for variant
  const handleVariantChange = (e, index) => {
    const { name, value } = e.target;

    setAddProduct((prevData) => {
      const updatedVariants = [...prevData.variants];
      updatedVariants[index] = {
        ...updatedVariants[index],
        [name.split(".")[1]]: value,
      };

      return {
        ...prevData,
        variants: updatedVariants,
      };
    });
  };

  //handle change for handling image
  const handleImageChange = (e) => {
    const file = e.target.files[0];  // Get the selected file
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      
      // Upload the image to your backend
      axios.post("http://localhost:3000/api/v1/users/uploadProfilePicture/", formData,
        {
          headers:{
            Authorization: `Bearer ${authToken}`,
          }
        },
        {
          withCredentials:true,
        }
      )
        .then(response => {
          const imageUrl = response.data.secure_url;  // Assuming the backend sends back the image URL
          setAddProduct((prevData) => ({
            ...prevData,
            imageUrl: imageUrl,  // Store the image URL in the state
          }));
        })
        .catch(error => {
          console.error("Error uploading image:", error);
        });
    }
  };
  
  //Variables
  const shopify_logo = "/public/Shopify-Logo.png";
  const daraz_logo = "/public/Daraz-logo-3.png";
  const back_icon = "/public/arrow-small-left.png";

  //Functions
  // Handle form submission (sending data to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      title: AddProduct.title,
      body_html: AddProduct.body_html,
      vendor: AddProduct.vendor,
      product_type: AddProduct.product_type,
      variants: AddProduct.variants.map((variant) => ({
        price: variant.price,
        inventory_quantity: variant.inventory_quantity,
      })),
      image: {
        src: AddProduct.imageUrl,  // Send the URL to the backend
      },
    };
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/add-shopify-product", // Your backend endpoint
        payload
      );
      alert("Product added successfully");
      console.log("Product added successfully:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  //functionn for reseting field
  const handleReset = () => {
    setAddProduct({
      title: "",
      body_html: "",
      vendor: "",
      product_type: "",
      variants: [{ inventory_quantity: "", price: "" }], // ensure this is an array
      imageUrl: "",
    });
  };

  //for setting filter state
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
  };
  const shopify_url = `http://localhost:3000/api/v1/auth/shopify-products`;
  const daraz_url = `http://localhost:3000/api/v1/auth/daraz-products`;
  const ebay_url = `http://localhost:3000/api/v1/auth/ebay-products`;
  const all_products_url = `http://localhost:3000/api/v1/auth/all-products`;

  const FetchProducts = async (url) => {
    try {
      console.log("Fetching products from:", url); // Debug URL
      const response = await axios.get(url, { withCredentials: true });
      console.log("Response data:", response.data); // Debug response
      if (response.data && response.data.products) {
        return response.data.products; // Adjust based on actual API response
      }
      throw new Error("Unexpected response structure");
    } catch (error) {
      console.error("Error fetching products:", error.message);
      return []; // Return empty array to avoid breaking the UI
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (selectedPlatform === "shopify") {
          setProducts(await FetchProducts(shopify_url));
          setFilteredProducts(await FetchProducts(shopify_url));
        } else if (selectedPlatform === "daraz") {
          setProducts(await FetchProducts(daraz_url));
          setFilteredProducts(await FetchProducts(daraz_url));
        } else if (selectedPlatform === "ebay") {
          setProducts(await FetchProducts(ebay_url));
          setFilteredProducts(await FetchProducts(ebay_url));
        } else if (selectedPlatform === "All") {
          setProducts(await FetchProducts(all_products_url));
          setFilteredProducts(await FetchProducts(all_products_url));
        }
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
      {message && (
        <div className="shopify-alert-back">
          <img src="../../../public/tick.png" alt="" className="alert-logo" />
          <h3 className="shopify-alert">
            <strong>Success! </strong>
            Product added successfully
          </h3>
          <img
            src="../../../public/close.png"
            alt=""
            className="close-logo"
            onClick={() => {
              setmessage(false);
            }}
          />
        </div>
      )}
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
        {/*this is the coding for Add product form*/}
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

              <label htmlFor="media">Image</label>
              <input
                type="file"
                onChange={handleImageChange}  // Using onChange to capture file upload
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
                      id={`price-${index}`}
                      name={`variants[${index}].price`}
                      type="number"
                      className="add-product-form-input"
                      placeholder="Enter product price"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(e, index)}
                      required
                    />

                    <label htmlFor="Inventory Quantity">Inventory Quantity</label>
                    <input
                      id={`inventory-${index}`}
                      name={`variants[${index}].inventory_quantity`}
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
              <button
                style={{ marginLeft: "70px" }}
                className="add-product-form-btn"
                onClick={handleReset}
              >
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
              <button
                className="platform-name"
                style={{
                  backgroundImage:
                    selectedPlatform === "ebay"
                      ? "linear-gradient(#1c59aa,#1c59aa)"
                      : "",
                }}
                onClick={() => handlePlatformChange("ebay")}
              >
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
              style={{ display:"none" /*selectedPlatform === "All" ? "none" : "block"*/ }}
            >
              Add
            </button>
            <label className="inventory-result">
              no of products {filteredProducts.length}
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
                          <p>{product.variants[0].inventory_quantity}</p>
                        ) : (
                          <p>{product.stock}</p>
                        )}
                      </td>

                      <td>
                        <div className="action-button-back">
                          <NavLink
                            to={`/Navbar/Inventory/${product.id}`}
                            state={{
                              platform_logo: product.platform.logo,
                              opt_name: "update",
                            }}
                            id="inventory-update-btn"
                            className="action-button"
                          >
                            Update
                          </NavLink>
                          <NavLink
                            to={`/Navbar/Inventory/${product.id}`}
                            state={{
                              platform_logo: product.platform.logo,
                              opt_name: "delete",
                            }}
                            id="inventory-delete-btn"
                            className="action-button"
                          >
                            Delete
                          </NavLink>
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
                          src={product.thumbnail || product.image}
                          alt={product.title}
                          className="inventory-product-image"
                        />
                      </td>
                      <td>{product.title}</td>
                      <td>
                        {" "}
                        {product.body_html} {product.description}
                      </td>
                      <td>
                        {product.category}
                        {product.product_type}
                      </td>
                      <td>
                        {product.brand}
                        {product.vendor}
                      </td>
                      <td>
                        {/*product.variants && product.variants.length > 0 ? (
                          <p>RS.{product.price}</p>
                        ) : (
                          <p>${product.price}</p>
                        )*/}
                        {product.price}
                      </td>
                      <td>
                        {/*product.variants && product.variants.length > 0
                          ? product.inventory_quantity
                          : product.stock*/}
                        {product.inventory_quantity}
                        {product.stock}
                      </td>
                      <td id="platform-data">
                        <img
                          src={product.platform.logo}
                          alt=""
                          className="platform-logo"
                        />
                        <h2>{/*product.platform.name*/}</h2>
                      </td>
                      <td>
                        <div className="action-button-back">
                          <NavLink
                            to={`/Navbar/Inventory/${product.id}`}
                            state={{
                              platform_logo: product.platform.logo,
                              opt_name: "update",
                            }}
                            id="inventory-update-btn"
                            className="action-button"
                          >
                            Update
                          </NavLink>
                          <NavLink
                            to={`/Navbar/Inventory/${product.id}`}
                            state={{
                              platform_logo: product.platform.logo,
                              opt_name: "delete",
                            }}
                            id="inventory-delete-btn"
                            className="action-button"
                          >
                            Delete
                          </NavLink>
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
