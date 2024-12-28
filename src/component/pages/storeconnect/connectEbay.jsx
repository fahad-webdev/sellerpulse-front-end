import { React, useState } from 'react';
import './connect.css';
import { useNavigate } from 'react-router-dom'; // Make sure you're importing navigate correctly
import EbayLogo from '../../../assets/ebay-logo.png';
import axios from 'axios';

const connectEbay = () => {
  const [FormData, setFormData] = useState({
    clientId:"",
    clientSecret:"",
    refreshToken:"",
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
      const url = 'http://localhost:3000/api/v1/connect/connect-ebay-store';
      const response = await axios.post(url, FormData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setMessage({ success: true, danger: false }); 
      console.log(response.data);
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
            Ebay Store connected successfully
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
          <img src={EbayLogo} className="shopify-logo" alt="Ebay Logo" id="connect-ebay-logo" />
        </div>
        <form onSubmit={handleSubmit}> {/* Attach submit handler to form */}
          <div>
            <label>Client ID:</label>
            <input
              className="popup-form-input"
              name="clientId"
              value={FormData.clientId}
              onChange={handleOnChange}
              type="text"
              placeholder="Client ID"
            />
          </div>
          <div>
            <label>Client Secret:</label>
            <input
              className="popup-form-input"
              name="clientSecret"
              value={FormData.clientSecret}
              onChange={handleOnChange}
              type="text"
              placeholder="Client secret"
            />
          </div>
          <div>
            <label>Refresh Token:</label>
            <input
              className="popup-form-input"
              name="refreshToken"
              value={FormData.refreshToken}
              onChange={handleOnChange}
              type="text"
              placeholder="Refresh token"
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

export default connectEbay;
