import { React, useState, useEffect } from "react";
import "../../inventory/Inventory.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  // Hooks
  const [productData, setproductData] = useState({
    // This hook is for updating product info
    title: "",
    body_html: "",
    vendor: "",
    product_type: "",
    variants: [{ price: "", inventory_quantity: "" }], // Add fields for variants
  });
  const [Loading, setLoading] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const { platform_logo, platform_name, opt_name } = location.state || {};
  console.log("Product ID :", id);


  // Variables
  const back_icon = "../../../public/arrow-small-left.png";
  const navigate = useNavigate();

  const url = [`http://localhost:3000/api/v1/auth/products/${id}`];

  //fetching product from backend url by id
  const FetchSingleProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });
      console.log("Products Response: ", response.data);

      if (response.data && Array.isArray(response.data)) {
        const products = response.data.filter((product) => !product.error);
        setproductData(products.length > 0 ? products[0] : null);
      } else {
        setproductData(null);
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Handle changes in nested variants (price, inventory_quantity)
    if (name.startsWith('variants')) {
      const index = parseInt(name.split('-')[1]);  // Extract index of variants array
      const field = name.split('-')[2];  // Get the field name (e.g., price, inventory_quantity)
      setproductData((prev) => {
        const updatedVariants = [...prev.variants];
        updatedVariants[index] = { ...updatedVariants[index], [field]: value };
        return { ...prev, variants: updatedVariants };
      });
    } else {
      setproductData((prev) => ({ ...prev, [name]: value }));
    }
  };
//this function is to update the product 
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Prepare product data for update (aligning with the Postman format)
  const updatedProduct = {
    id: id, // id at the root level
    title: productData.title,
    body_html: productData.body_html,
    vendor: productData.vendor,
    product_type: productData.product_type,
    variants: productData.variants.map((variant) => ({
      price: variant.price,  // Ensure this is a string as shown in Postman
      inventory_quantity: parseInt(variant.inventory_quantity, 10),  // Ensure this is an integer
    })),
  };

  try {
    // Send PUT request to update product details
    const response = await axios.put(
      `http://localhost:3000/api/v1/auth/shopify-products/${id}`,
      updatedProduct,
      { withCredentials: true }
    );
    console.log("Product updated successfully:", response.data);
    alert("Product updated successfully");
    navigate("/Navbar/Inventory");  // Navigate back to inventory after successful update
  } catch (error) {
    console.error("Error updating product:", error.response?.data || error.message);
    //alert("Failed to update product");
  } finally {
    setLoading(false);
  }
};
  // For product deletion
  const shopifyDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      console.log(`Attempting to delete product with ID: ${id}`);
      await axios.delete(
        `http://localhost:3000/api/v1/auth/delete-shopify-products/${id}`,
        {
          withCredentials: true,
        }
      );
      alert("Product deleted successfully");
      navigate("/Navbar/Inventory");
      console.log("Product deleted successfully!");
    } catch (error) {
      console.error(
        "Failed to delete product:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      await FetchSingleProduct();
    };
    fetchProduct();
  }, [id]);

  if (!productData) return <div></div>;
  if (Loading) return <div className="loader"></div>;

  return (
    <>
      {/* Update Product Form */}
      <div className="main-add-product-back" style={{ display: "block" }}>
        <div className="platform-logo-back">
          <img
            src={platform_logo}
            alt="platform icon image"
            className="platform-logo"
          />
          <img
            onClick={() => navigate("/Navbar/Inventory")}
            src={back_icon}
            className="main-product-back-btn"
            alt="Back"
          />
        </div>
        <div className="add-product-form-back">
          <div className="add-product-heading">
            <h3>{opt_name === "update" ? "Update" : "Delete"}</h3>
          </div>
          <form className="add-product-form" onSubmit={handleSubmit}>
            <div className="add-product-form-half-back">
              <div className="add-product-form-half1">
                <label htmlFor="title">Title</label>
                <input
                  onChange={handleChange}
                  name="title"
                  type="text"
                  value={productData.title }
                  className="add-product-form-input"
                  placeholder="Enter product title"
                  required={opt_name === "update"}
                  disabled={opt_name === "delete"}
                />
                <label htmlFor="description">Description</label>
                <textarea
                  onChange={handleChange}
                  value={productData.body_html || productData.description}
                  name="body_html"
                  className="description"
                  placeholder="Enter product description"
                  required={opt_name === "update"}
                  disabled={opt_name === "delete"}
                ></textarea>
              </div>
              <div className="add-product-form-half2">
                <label htmlFor="category">Category</label>
                <input
                 
                  value={productData.category || productData.product_type}
                  name="product_type"
                  type="text"
                  className="add-product-form-input"
                  placeholder="Enter product type"
                  disabled={opt_name === "delete"}
                  onChange={handleChange}
                />
                <label htmlFor="vendor">Vendor</label>
                <input
                  name="vendor"
                  type="text"
                  value={productData.brand || productData.vendor}
                  className="add-product-form-input"
                  placeholder="Enter product Vendor"
                  required={opt_name === "update"}
                  disabled={opt_name === "delete"}
                  onChange={handleChange}
                />
                <label htmlFor="price">Price</label>
                <input
                  value={productData.variants[0].price || productData.price }
                  name={"variants-0-price"}
                  type="number"
                  className="add-product-form-input"
                  placeholder="Enter product price"
                  required={opt_name === "update"}
                  disabled={opt_name === "delete"}
                  onChange={handleChange}
                />
                <label htmlFor="inventory_quantity">Quantity</label>
                <input
                  value={productData.variants[0]?.inventory_quantity || productData.stock}
                  name="variants-0-inventory_quantity"
                  type="number"
                  className="add-product-form-input"
                  placeholder="Enter product SKU"
                  required={opt_name === "update"}
                  disabled={opt_name === "delete"}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="add-product-form-btn-back">
              <button
                className="add-product-form-btn"
                type="submit"
                style={{
                  visibility: opt_name === "update" ? "visible" : "hidden",
                }}
              >
                Update
              </button>
              <button
                className="add-product-form-btn"
                onClick={() => shopifyDelete(id)}
                style={{
                  visibility: opt_name === "delete" ? "visible" : "hidden",
                }}
              >
                Delete
              </button>
              <button className="reset-product-form-btn" type="reset">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
