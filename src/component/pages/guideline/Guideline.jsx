import { React, useState } from "react";
import "./Guideline.css";

const Guideline = () => {
  const [expand1, setexpand1] = useState("close");
  const [expand2, setexpand2] = useState("close");
  const [expand3, setexpand3] = useState("close");
  const [connectVisible, setconnectVisible] = useState("invisible");
  const [credentialsVisible, setcredentialsVisible] = useState("invisible");
  const [getApiVisible, setgetApiVisible] = useState("invisible");

  
  const toggleCredentialsVisible = () => {
    setcredentialsVisible(
      credentialsVisible === "invisible" ? "visible" : "invisible"
    );
  };

  const toggleConnectVisible = () => {
    setconnectVisible(connectVisible === "invisible" ? "visible" : "invisible");
  };
  const toggleGetApiVisible = () => {
    setgetApiVisible(getApiVisible === "invisible" ? "visible" : "invisible");
  };

  const backButton = () => {
    setcredentialsVisible("invisible");
    setconnectVisible("invisible");
    setgetApiVisible("invisible");
  };

  const toggleExpand1 = () => {
    setexpand1(expand1 === "close" ? "open" : "close");
  };
  const toggleExpand2 = () => {
    setexpand2(expand2 === "close" ? "open" : "close");
  };
  const toggleExpand3 = () => {
    setexpand3(expand3 === "close" ? "open" : "close");
  };
  return (
    <>
      <div className="main-guideline-back">
        <div className="main-guideline">
          <h3 id="main-guideline-heading">
            Guideline
            <button
              onClick={backButton}
              className="guideline-backbtn"
              style={{
                display:
                  connectVisible === "visible" ||
                  credentialsVisible === "visible"||
                  getApiVisible === 'visible'
                    ? "block"
                    : "none",
              }}
            >
              back
            </button>
          </h3>
          <div className="main-guideline-scrollable">
            <ul
              style={{
                display:
                  connectVisible === "visible" ||
                  credentialsVisible === "visible"||
                  getApiVisible === 'visible'
                    ? "none"
                    : "block",
              }}
            >
              <div
                className="main-guideline-expand"
                style={{ height: expand1 === "open" ? "135px" : "39px" }}
              >
                <li onClick={toggleExpand1}>
                  1. Account Setup & Connection
                  <img
                    src="./public/expand-arrow.png"
                    alt=""
                    className="guideline-expand"
                    style={{
                      transform: expand1 === "open" ? "rotate(0deg)" : "",
                    }}
                  />
                </li>
                <div className="guideline-expand-content">
                  <a onClick={toggleConnectVisible}>
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                    How do I connect my store to SellerPulse?
                  </a>
                  <a onClick={toggleCredentialsVisible}>
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                    What credentials do I need to provide to connect my store?
                  </a>
                  <a onClick={toggleGetApiVisible}>
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                    How do I generate API keys for my Shopify or Daraz store?
                  </a>
                </div>
              </div>
              <div
                className="main-guideline-expand"
                style={{ height: expand2 === "open" ? "135px" : "39px" }}
              >
                <li onClick={toggleExpand2}>
                  2. Dashboard Features
                  <img
                    src="./public/expand-arrow.png"
                    alt=""
                    className="guideline-expand"
                    style={{
                      transform: expand2 === "open" ? "rotate(0deg)" : "",
                    }}
                  />
                </li>
                <div className="guideline-expand-content">
                  <a href="#">
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                    What information can I see on my dashboard?
                  </a>
                  <a href="#">
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                    How can I view my total sales across all platforms?
                  </a>
                  <a href="#">
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                    How can I track my best-selling products?
                  </a>
                </div>
              </div>
              <div
                className="main-guideline-expand"
                style={{ height: expand3 === "open" ? "103px" : "39px" }}
              >
                <li onClick={toggleExpand3}>
                  3. Product Management
                  <img
                    src="./public/expand-arrow.png"
                    alt=""
                    className="guideline-expand"
                    style={{
                      transform: expand2 === "open" ? "rotate(0deg)" : "",
                    }}
                  />
                </li>
                <div className="guideline-expand-content">
                  <a href="#">
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                    How do I update product information through SellerPulse?
                  </a>
                  <a href="#">
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                    Can I manage inventory directly from SellerPulse?
                  </a>
                </div>
              </div>
            </ul>
            {/*code for FAQ 1: how to connect my store to sellerpulse*/}
            <div
              className="connetstoreback"
              style={{
                display: connectVisible === "visible" ? "block" : "none",
              }}
            >
              <div className="connetstore">
                <div className="connectstore-heading">
                  <h3>Connecting Your Store to SellerPulse: A Quick Guide</h3>
                </div>
                <div className="connectstoredetail">
                  <ul>
                    Getting your store connected to SellerPulse is simple and
                    straightforward:
                    <li>
                      <h3>1. Navigate to Stores:</h3>
                      <p>
                      Start by accessing the <strong> Stores </strong> option in
                      the sidebar menu
                      </p>
                    </li>
                    <li>
                      <h3>2. Choose Your Platform: </h3>
                      <p>
                      A dropdown will reveal
                      the four supported e-commerce platforms. Each platform has
                      its own <strong>Connect</strong> button.
                      </p>
                    </li>
                    <li>
                      <h3>3. Input Your Store Details: </h3>
                      <p>
                      Select your platform, and a form will appear requesting
                      essential store details—{" "}
                      <strong> Store Name, Client ID, </strong> and{" "}
                      <strong>Token</strong>.
                      </p>
                    </li>
                    <li>
                      <h3>4. Seamlessly Connect: </h3>
                      <p>
                      Click on <strong>Connect</strong> button to link your
                      store to SellerPulse.
                      </p>
                    </li>
                  </ul>
                </div>
                
              </div>
            </div>
            {/*code for FAQ 1:what credentials do i need to provide to connect my store to sellerpulse*/}
            <div
              className="storecredentialsback"
              style={{
                display: credentialsVisible === "visible" ? "block" : "none",
              }}
            >
              <div className="storecredentials">
                <div className="storecredentials-heading">
                  <h3>Credentials required to connect Store: A Quick Guide</h3>
                </div>
                <div className="storecredentialsdetail">
                  <ul>
                    To connect your store to SellerPulse, you'll need to provide
                    the following credentials:
                    <li>
                      <h3>1. Store Name:</h3>
                      <p>
                      The unique name of your store as registered on the
                      e-commerce platform.
                      </p>
                    </li>
                    <li>
                      <h3>2. Client ID (API Key): </h3>
                      <p>
                      A unique identifier that
                      allows our platform to communicate with your store.
                      </p>
                    </li>
                    <li>
                      <h3>3. Client Token (Password): </h3>
                      <p>
                      A secure password
                      that grants our platform access to your store's data.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/*code for FAQ 1: how to get API*/}
            <div
              className="getApiback"
              style={{
                display: getApiVisible === "visible" ? "block" : "none",
              }}
            >
              <div className="getApi">
                <div className="getApi-heading">
                  <h3>
                    Generate API keys for my Shopify or Daraz store: A Quick
                    Guide
                  </h3>
                </div>
                <div className="getApidetail">
                  <ul>
                    To connect your store to SellerPulse, you'll need to provide
                    the following credentials:
                    <h3>For Shopify</h3>
                    <li>
                      <h3>1. Log in to Your Shopify Admin Panel:</h3>
                    <div className="getApi-subdetail">
                    <p>
                    Access your Shopify store by logging in at 
                    </p>
                    </div>
                    </li>
                    <li>
                      <h3>2. Navigate to Apps: </h3>
                      <div className="getApi-subdetail">
                    <li>
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                    In the left sidebar, click on "Apps."
                    </li>
                    <li>
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                    <p>
                    At the bottom of the page, select <strong> Develop apps for your store </strong> (if not already developed, you'll need to click <strong> Create an app </strong>).
                    </p>
                      </li>
                    </div>
                    </li>
                    <li>
                      <h3>3. Create a Private or Custom App: </h3>
                      <div className="getApi-subdetail">
                      <li>
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                      <p>
                      Click on <strong>Create an app</strong> in the top right corner.
                      </p>
                      </li>
                      <li>
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                     <p>
                     Enter the app name and choose the App developer (usually yourself).
                     </p>
                      </li>
                      <li>
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                      Click <strong>Create app</strong>.
                      </li>
                    </div>
                    </li>
                    <li>
                      <h3>4. Configure Admin API Scopes: </h3>
                      <div className="getApi-subdetail">
                      <li>
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                     <p>
                     In the app setup, go to the <strong>Configuration</strong> tab.
                     </p>
                      </li>
                      <li>
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                     <p>
                     Under <strong>Admin API integration</strong>, select the required API scopes like
                     <strong>'read_products', 'write_orders'</strong>, etc.
                     </p>
                      </li>
                      <li>
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                      <p>
                      Save the changes.
                      </p>
                      </li>
                    </div>
                    </li>
                    <li>
                      <h3>5. Install the App: </h3>
                      <div className="getApi-subdetail">
                      <li>
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                     <p>
                     After configuring the API scopes, click on <strong>Install app</strong>.
                     </p>
                      </li>
                      <li>
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                     <p>
                     Shopify will generate an <strong>API key</strong> and <strong>API secret key</strong>. 
                     These keys will be used to connect your store to SellerPulse.
                     </p>
                      </li>
                     
                    </div>
                    </li>
                    <li>
                      <h3>6. Copy Your API Credentials: </h3>
                      <div className="getApi-subdetail">
                      <li>
                    <img
                      src="./public/bullet.png"
                      alt=""
                      className="guideline-bullet-point"
                    />
                     <p>
                     Copy the <strong>API key</strong> and <strong>API secret</strong> from the Admin API section, and store them securely.
                     You’ll need these to integrate your Shopify store with SellerPulse.
                     </p>
                      </li>
                    </div>
                    </li>
                  </ul>
                </div>
                <div className="connectstore-guidevideo">
                  <h3>Step-by-step video guide to ensure a smooth setup.</h3>

                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/Hvzee35uVQ0?si=4rSIWf3Zqt-vik39"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Guideline;
