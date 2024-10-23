import React, { useState, useEffect } from "react";
import "./ProductReviews.css";
import { NavLink, useLocation, useParams } from "react-router-dom";

const ProductReviews = () => {
  //hooks
  const [Products, setProducts] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Reviews, setReviews] = useState([]);
  const location = useLocation();
  const {platform_logo , platform_name} = location.state || {};
  const { id } = useParams(); //hook from react router dom

  //Variables
  const shopify_logo = "../../../public/Shopify-Logo.png";
  const daraz_logo = "../../../public/Daraz-logo-3.png";
  const productUrl = `https://dummyjson.com/products/${id}`;
  const reviewUrl = `https://dummyjson.com/products/${id}?reviews`;


  //Functions
  console.log("product id:", id); //to see that whether id is passing successfully or not

  const FetchSingleProducts = async () => {
    //this function we used to fetch data from api
    setLoading(true);
    try {
      const response = await fetch(`${productUrl}`);
      const data = await response.json();
      setProducts(data);
      console.log("fetch product data", data);
    } catch (error) {
      console.log("error loading products ", error);
    }finally{
        setLoading(false);
    }
  };

  const FetchReviews = async () => {
 
    try {
      const response = await fetch(reviewUrl);
      const data = await response.json();
      setReviews(data.reviews || []); //since reviews are stored in array so we need to fetch them in arrays
      console.log("fetch product reviews ", data);
    } catch (error) {
        console.log("error loading product reviews ", error);
    }
}

  useEffect(() => {
    FetchSingleProducts();
    FetchReviews();
  }, []);
  if (!Products) return <div></div>;
  if (Loading) return <div className="loader"></div>;

  return (
    <div className="main-product-reviews-back">
      {/*Product Header page code*/}
      <div className="product-main-overview-back">
        <div className="product-main-overview">
          <h3>Product Reviews</h3>
        </div>
        <NavLink
          to="/Navbar/Products"
          className="back-btn platform-filter-btn"
          style={{}}
        >
          Back
        </NavLink>
      </div>
      <div className="main-product-reviews">
        <div className="productreviews-image-back">
          <h3>Image</h3>
          <img
            src={Products.thumbnail}
            alt=""
            className="productreviews-image"
          />
          <h2>
            Platform:
            <h1>
              <img src={platform_logo} alt="" className="platform-logo" />
              {platform_name}
            </h1>
          </h2>
        </div>
        <div className="productreviews-details-back">
          <h3>Details</h3>
          <div className="productreviews-details">
            <h2>Title:</h2>
           <div className="title-rating">
           <p>{Products.title}</p> <p><img src="../../../public/star.png" alt="" className="rating-logo" />{Products.rating} </p>
           </div>
            <h2>Description:</h2>
            <p>{Products.description}</p>
            <h2>Category:</h2>
            <p>{Products.category}</p>
            <h2>Brand:</h2>
            <p>{Products.brand}</p>
            <h2>Price:</h2>
            <p>${Products.price}</p>
            <h2>QTY:</h2>
            <p>{Products.stock}</p>
          </div>
        </div>
        <div className="productreviews-reviews-back">
          <h3>Reviews</h3>
          <div className="productreviews-reviews">
            <ul>
              {Reviews.length > 0 ? (
                Reviews.map((review, index) => (
                  <li key={index}>
                    <p>
                      <h5>{review.reviewerName}</h5>
                      {review.comment}
                    </p>
                   <div className="title-rating">
                   rating:
                   <img src="../../../public/star.png" alt="" className="rating-logo" />
                    {review.rating}
                   </div>
                  </li>
                ))
              ) : (
                <h3>No reviews found</h3>
              )}
            </ul>
            <ul>
              {Reviews.length > 0 ? (
                Reviews.map((review, index) => (
                  <li key={index}>
                    <p>
                      <h5>{review.reviewerName}</h5>
                      {review.comment}
                    </p>
                   <div className="title-rating">
                   rating:
                   <img src="../../../public/star.png" alt="" className="rating-logo" />
                    {review.rating}
                   </div>
                  </li>
                ))
              ) : (
                <h3>No reviews found</h3>
              )}
            </ul>
            <ul>
              {Reviews.length > 0 ? (
                Reviews.map((review, index) => (
                  <li key={index}>
                    <p>
                      <h5>{review.reviewerName}</h5>
                      {review.comment}
                    </p>
                   <div className="title-rating">
                   rating:
                   <img src="../../../public/star.png" alt="" className="rating-logo" />
                    {review.rating}
                   </div>
                  </li>
                ))
              ) : (
                <h3>No reviews found</h3>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
