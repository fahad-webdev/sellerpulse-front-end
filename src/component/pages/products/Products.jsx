import React, { useEffect, useState } from "react";
import "./Products.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(
    "All",
    "shopify",
    "daraz",
    "ebay",
  );
  const [filterOpen, setFilterOpen] = useState("close");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /*Functions and variables  */
  const shopify_logo = "/public/Shopify-Logo.png";
  const daraz_logo = "/public/Daraz-logo-3.png";
  const toggleSearch = () => {
    setFilterOpen(filterOpen === "close" ? "open" : "close");
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
  };
  //backend apis to fetch products
const shopify_url = `http://localhost:3000/api/v1/auth/shopify-products`;
  const daraz_url = `http://localhost:3000/api/v1/auth/daraz-products`;
  const ebay_url = `http://localhost:3000/api/v1/auth/ebay-products`;
  const all_products_url = `http://localhost:3000/api/v1/auth/all-products`;
//function to fetch products
const FetchProducts = async (url) =>{
  try{
    const response = await axios.get(url,{withCredentials:true});
    console.log("response: ",response.data);
    if(response.data || response.data.products){
      return response.data.products;
    }    
  }catch(error){
    console.log("error fetching product",error);
    return[];
  }
}
//fetching products using endpoint 
useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (selectedPlatform === "shopify") {
          setProducts(await FetchProducts(shopify_url));
          setFilteredProducts(await FetchProducts(shopify_url));
          setProductsCount(filteredProducts.length);
        } else if (selectedPlatform === "daraz") {
          setProducts(await FetchProducts(daraz_url));
          setFilteredProducts(await FetchProducts(daraz_url));
          setProductsCount(filteredProducts.length);
        }else if (selectedPlatform === "ebay") {
          setProducts(await FetchProducts(ebay_url));
          setFilteredProducts(await FetchProducts(ebay_url));
          setProductsCount(filteredProducts.length);
        }
         else if (selectedPlatform === "All") {
          setProducts(await FetchProducts(all_products_url));
          setFilteredProducts(await FetchProducts(all_products_url));
          setProductsCount(filteredProducts.length);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedPlatform]);
  const handleSearch = () => {
    const filtered = products.filter(
      (product) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.category||product.product_type)?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setProductsCount(filtered.length);
  };

  if (loading) return <div className="loader"></div>;

  return (
    <>
      {/*main Product page code*/}
      <div
        className="main-product-back"
        style={
          {
            /*display:(addBtn==='clicked'?'none':'block')||(backBtn==='clicked'?'block':'none')*/
          }
        }
      >
        {/*Add Product search dropdown code*/}
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
        {/*Product Main page code*/}
        <div className="product-main-overview-back">
          <div className="product-main-overview">
            <h3>Products</h3>
            <div className="product-platform-option">
              {/*shopify button */}
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
              {/*daraz button */}
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
              {/*Amazon button */}
              <button
                className="platform-name"
                onClick={() => handlePlatformChange("daraz")}
                disabled
              >
                Amazon
              </button>
              {/*ebay button */}
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
                ebay
              </button>
              {/*ebay platforms button */}
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

        <div className="product-card-back-scroll">
          <label className="product-result">
            no of products {filteredProducts.length}
          </label>
          <div className="product-card-scroll" >
           {products && products.length > 0 ? (filteredProducts.map((product) => (
              <NavLink
                to={`/Navbar/Products/${product.id}`}
                state={{//state is a prop that will allow us to send data through link
                  platform_logo: product.platform.logo,
                  platform_name: product.platform.name,
                }}
                className="product-card-back"
                key={product.id}
              >
                <div className="product-card">
                  <img
                    className="product-card-img"
                    src={(product.image?.src)||(product.image)||(product.thumbnail)}
                    alt={product.title}
                  />
                  <p id="heading">{product.title}</p>
                  <p className="product-rating">Rating: {product.rating}</p>
                  {product.variants && product.variants.length > 0 ? (
                    <p>Price: ${product.variants[0].price}</p>
                  ) :
                  (<p>Price: ${product.price}</p>)}
                  <p>Category: {product.product_type}</p>
                  <p>Platform: {product.platform.name}</p>
                </div>
              </NavLink>
            ))):
            (
                  <div className="product-unavailable">
                  <span>
                    No products available
                  </span>
                  </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
