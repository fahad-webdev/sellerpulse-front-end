import React, { useState, useEffect } from "react";
import "./ProductReviews.css";
import { NavLink, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Sentiment from "sentiment";

const ProductReviews = () => {
  const [Products, setProducts] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Reviews, setReviews] = useState([]);
  const [sentimentResult, setSentimentResult] = useState({
    positivePercentage: 0,
    negativePercentage: 0,
    neutralPercentage: 0,
  });

  const { id } = useParams();
  const location = useLocation();
  const { platform_name, platform_logo } = location.state || {};

  const reviewUrl = `http://localhost:3000/api/v1/auth/shopify-product-reviews/${id}`;
  const sentiment = new Sentiment();

  const url = `http://localhost:3000/api/v1/auth/products/${id}`;

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
        setProducts(products.length > 0 ? products[0] : null); 
      } else {
        setProducts(null);
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };
  //fetching reviews for each product
  const getSingleProductReviews = async () => {
    try {
      const response = await axios.get(reviewUrl, { withCredentials: true });
      const reviews = response.data.reviews || [];
      setReviews(reviews);
      analyzeSentiments(reviews);
    } catch (error) {
      console.log("error fetching product reviews", error);
    }
  };
//sentiment analysis for product reviews
  const analyzeSentiments = (reviews) => {
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;
    let totalRating = 0;

    reviews.forEach((review) => {
      const result = sentiment.analyze(review.comment);
      if (result.score > 0) {
        positiveCount++;
      } else if (result.score < 0) {
        negativeCount++;
      } else {
        neutralCount++;
      }
      totalRating += review.rating;
    });

    const positivePercentage = (positiveCount / reviews.length) * 100 || 0;
    const negativePercentage = (negativeCount / reviews.length) * 100 || 0;
    const neutralPercentage = (neutralCount / reviews.length) * 100 || 0;
    const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;

    setSentimentResult({
      positivePercentage,
      negativePercentage,
      neutralPercentage,
      averageRating,
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      await FetchSingleProduct();
    };
    fetchProduct();
    getSingleProductReviews();
  }, [id]);

  if (Loading) return <div className="loader"></div>;

  if (!Products) return <div>No product found</div>;

  return (
    <div className="main-product-reviews-back">
      <div className="product-main-overview-back">
        <div className="product-main-overview">
          <h3>Product Reviews</h3>
        </div>
        <NavLink to="/Navbar/Products" className="back-btn platform-filter-btn">
          Back
        </NavLink>
      </div>
      <div className="main-product-reviews">
        <div className="productreviews-image-back">
          <h3>Image</h3>
          <img src={Products.image?.src || Products.thumbnail} alt="Product" className="productreviews-image" />
          <h2>
            Platform:
            <h1>
              <img src={platform_logo} alt="Platform Logo" className="platform-logo" />
              {platform_name}
            </h1>
          </h2>
        </div>
        <div className="productreviews-details-back">
          <h3>Details</h3>
          <div className="productreviews-details">
            <h2>Title:</h2>
            <div className="title-rating">
              <p>{Products.title || "No Title"}</p>
              <p>
                <img src="../../../public/star.png" alt="Rating" className="rating-logo" />
                {Products.rating || sentimentResult.averageRating || "N/A"}
              </p>
            </div>
            <h2>Description:</h2>
            <p>{Products.body_html || Products.description}</p>
            <h2>Category:</h2>
            <p>{Products.product_type || Products.category}</p>
            <h2>Vendor:</h2>
            <p>{Products.vendor || Products.brand}</p>
            <h2>Price:</h2>
            <p>RS. {Products.variants?.[0]?.price || Products.price || "N/A"}</p>
            <h2>QTY:</h2>
            <p>{Products.variants?.[0]?.inventory_quantity || Products.stock || "N/A"}</p>
          </div>
        </div>
        <div className="productreviews-reviews-back">
          <div className="sentiment-analysis-back">
            <h3>Reviews</h3>
            <div className="sentiment-analysis">
              <label id="positive" htmlFor="">
                Positive: {sentimentResult.positivePercentage.toFixed(2)}%
              </label>
              <label id="neutral" htmlFor="">
                Neutral: {sentimentResult.neutralPercentage.toFixed(2)}%
              </label>
              <label id="negative" htmlFor="">
                Negative: {sentimentResult.negativePercentage.toFixed(2)}%
              </label>
            </div>
          </div>
          <div className="productreviews-reviews">
            <ul>
              {Reviews.length > 0 ? (
                Reviews.map((review, index) => (
                  <li key={index}>
                    <p>
                      <h5>{review.reviewer}</h5>
                      {review.comment}
                    </p>
                    <div className="title-rating">
                      Rating:
                      <img src="../../../public/star.png" alt="Rating" className="rating-logo" />
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
