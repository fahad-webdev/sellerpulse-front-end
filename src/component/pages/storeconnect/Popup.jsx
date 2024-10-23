import React from 'react';
import './Popup.css';
import { useLocation } from 'react-router-dom';
import AmazonLogo from '../../../assets/amazon-logo (2).png';
import DarazLogo from '../../../assets/daraz-logo-2.png';
import ShopifyLogo from '../../../assets/shopify-logo.png';
import eBayLogo from '../../../assets/ebay-logo.png';

const Popup = () => {

    //Hook
    const location = useLocation();
    const {platform} = location.state || {};

    return (
        <>
        
        <div className="popup-overlay">
             </div>
            <div className="popup">
                <div className="popup-header">
                <img style={{width:platform.name==="shopify"?"38px":""
                            ,marginTop:platform.name==="Amazon"?"11px":""
                }}
                src={platform.name==="shopify"?ShopifyLogo:
                         (platform.name==="daraz"?DarazLogo:
                         (platform.name==="Amazon"?AmazonLogo:
                         (platform.name==="ebay"?eBayLogo:"")))}  className="popup-logo" />
                <h2 style={{display:platform.name==="shopify"?"block":"none"}}>{platform.name}</h2>
                </div>
                <form>
                    <div>
                        <label>store name:</label>
                        <input className='popup-form-input' type="text" required placeholder='storename.myshopify.com'/>
                    </div>
                    <div>
                        <label>Client ID:</label>
                        <input className='popup-form-input' type="password" required placeholder='client ID'/>
                    </div>
                    <div>
                        <label>API token:</label>
                        <input className='popup-form-input' type="password" required placeholder='API token'/>
                    </div>
                    <button className="popup-btn" id="popup-login" type="submit">Connect</button>
                    <button className="popup-btn" id="popup-reset" type="reset">Reset</button>
                </form>
            </div>
        </>
    );
};

export default Popup;
