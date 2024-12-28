import { React, useState } from 'react';
import './connect.css';
import { useNavigate } from 'react-router-dom'; // Make sure you're importing navigate correctly
import DarazLogo from '../../../assets/daraz-logo-2.png';
import axios from 'axios';

const connectDaraz = () => {
  const [FormData, setFormData] = useState({
    Store_Name:'',
    API_key: '',
    API_Secret: '',
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
      const url = 'http://localhost:3000/api/v1/connect/connect-daraz-store';
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
            Daraz Store connected successfully
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
          <img src={DarazLogo} className="shopify-logo" alt="Ebay Logo" id="connect-daraz-logo" />
        </div>
        <form onSubmit={handleSubmit}> {/*Store_Name, API_Secret , API_key Attach submit handler to form */}
         
          <div>
  <label>Store name:</label>
  <input
    className="popup-form-input"
    name="Store_Name" // Matches the key in FormData
    value={FormData.Store_Name}
    onChange={handleOnChange}
    type="text"
    placeholder="Enter your daraz store name"
  />
</div>
<div>
  <label>Client ID:</label>
  <input
    className="popup-form-input"
    name="API_key" // Matches the key in FormData
    value={FormData.API_key}
    onChange={handleOnChange}
    type="text"
    placeholder="Client ID/API key"
  />
</div>
<div>
  <label>Client Secret:</label>
  <input
    className="popup-form-input"
    name="API_Secret" // Matches the key in FormData
    value={FormData.API_Secret}
    onChange={handleOnChange}
    type="text"
    placeholder="Client Secret"
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

export default connectDaraz;
