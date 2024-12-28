import { React, useState } from 'react';
import './connect.css';
import { useNavigate } from 'react-router-dom'; // Make sure you're importing navigate correctly
import ShopifyLogo from '../../../assets/shopify-logo.png';
import axios from 'axios';

const connectShopify = () => {
  const [FormData, setFormData] = useState({
    URL: '',
    API_key: '',
    API_Token: '',
  });
  const [message, setMessage] = useState({
    success: false,
    danger: false,
    alert: false,
  });
  const navigate = useNavigate(); // Initialize navigate

  // Handle input change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...FormData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:3000/api/v1/connect/connect-shopify-store';
      const response = await axios.post(url, FormData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Ensure cookies are included
      });
      setMessage({ success: true, danger: false }); // Reset messages on success
      console.log("store connected successfully",response.data);
    } catch (error) {
      setMessage({ success: false, danger: true });
      console.log('Error connecting with stores', error);
    }
  };

  return (
    <>
      {/* Alert for store connection successful */}
      {message.success && (
        <div className="shopify-alert-back">
          <img src="../../../public/tick.png" alt="" className="alert-logo" />
          <h3 className="shopify-alert">
            <strong>Success! </strong>
            Shopify Store connected successfully
          </h3>
          <img
            src="../../../public/close.png"
            alt=""
            className="close-logo"
            onClick={() => {
              setMessage({ success: false, danger: false, alert: false });
            }}
          />
        </div>
      )}

      {/* Alert for store connection failed */}
      {message.danger && (
        <div className="shopify-alert-back" id="store-danger-back">
          <img src="../../../public/warning.png" alt="" className="alert-logo" />
          <h3 className="shopify-alert">
            <strong>Sorry! </strong>
            Store connection failed
          </h3>
          <img
            src="../../../public/close-danger.png"
            alt=""
            className="close-logo"
            onClick={() => {
              setMessage({ success: false, danger: false, alert: false });
            }}
          />
        </div>
      )}

      <div className="popup-overlay"></div>
      <div className="popup">
        <div className="popup-header">
          <img src={ShopifyLogo} className="shopify-logo" alt="Shopify Logo" />
          <h2>Shopify</h2>
        </div>
        <form onSubmit={handleSubmit}> {/* Attach submit handler to form */}
          <div>
            <label>Store name:</label>
            <input
              className="popup-form-input"
              name="URL"
              value={FormData.URL}
              onChange={handleOnChange}
              type="text"
              placeholder="storename.myshopify.com"
            />
          </div>
          <div>
            <label>Client ID:</label>
            <input
              className="popup-form-input"
              name="API_key"
              value={FormData.API_key}
              onChange={handleOnChange}
              type="text"
              placeholder="Client ID"
            />
          </div>
          <div>
            <label>API token:</label>
            <input
              className="popup-form-input"
              name="API_Token"
              value={FormData.API_Token}
              onChange={handleOnChange}
              type="text"
              placeholder="API token"
            />
          </div>
          <button className="popup-btn" id="popup-login" type="submit" onSubmit={handleSubmit}>
            Connect
          </button>
          <button className="popup-btn" id="popup-reset" type="reset">
            Reset
          </button>
        </form>
      </div>
    </>
  );
};

export default connectShopify;
