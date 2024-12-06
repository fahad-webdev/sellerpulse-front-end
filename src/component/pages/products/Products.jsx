import React, { useEffect, useState } from "react";
import "./Products.css";
import { NavLink } from "react-router-dom";

const Products = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(
    "All",
    "shopify",
    "daraz"
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
  /*testing API to display data on product page*/
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      let platformProducts = [];
      const shopify = "http://localhost:5000/api/auth/shopify-products";
      //"https://dummyjson.com/products/search?q=phone";
      const daraz = "https://dummyjson.com/products/search?q=all";

      try {
        if (selectedPlatform === "shopify") {
          const response = await fetch(shopify);
          const shopifydata = await response.json();
          platformProducts = shopifydata.products.map((product) => ({
            ...product,
            platform: { name: "shopify", logo: shopify_logo },
          }));
        } else if (selectedPlatform === "daraz") {
          const response = await fetch(daraz);
          const darazdata = await response.json();
          platformProducts = darazdata.products.map((product) => ({
            ...product,
            platform: { name: "daraz", logo: daraz_logo },
          }));
        } else if (selectedPlatform === "All") {
          const shopifyresponse = await fetch(shopify);
          const shopifydata = await shopifyresponse.json();
          const shopifyproducts = shopifydata.products.map((product) => ({
            ...product,
            platform: { name: "shopify", logo: shopify_logo },
          }));

          const darazresponse = await fetch(daraz);
          const darazdata = await darazresponse.json();
          const darazproducts = darazdata.products.map((product) => ({
            ...product,
            platform: { name: "daraz", logo: daraz_logo },
          }));

          platformProducts = [...shopifyproducts, ...darazproducts];
        }
        console.log(platformProducts);
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
                onClick={() => handlePlatformChange("daraz")}
                disabled
              >
                ebay
              </button>
              {/*All platforms button */}
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
            no of products {productsCount}
          </label>
          <div className="product-card-scroll">
            {filteredProducts.map((product) => (
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
                    src={(product.image?.src)||(product.thumbnail)}
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
