import React, { useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [imageIndex1, setimageIndex1] = useState(0);//image array for slider 1
  const [imageIndex2, setimageIndex2] = useState(0);//image array for slider 2
  const [sideBar, setsideBar] = useState("invisible");

  const toggleSidebar = () => {
    setsideBar(sideBar === "invisible" ? "visible" : "invisible");
  };

  //for images stored in the public folder
  const images = [
    "/multi-platform.png",
    "/product-management.png",
    "/secure-vendor-credentials.png",
  ];
  const images2 = ["/user-friendly.png", "/guideline.png", "/FAQ.png"];

  // Functions
  //these two functions are for slider in feature 1
  const NextImage1 = () => {
    setimageIndex1((prevIndex) => (prevIndex + 1) % images.length);
  };

  const PrevImage1 = () => {
    setimageIndex1((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  //these two functions are for slider in feature 1
  /*const NextImage2 =()=>{
      setimageIndex2((prevIndex)=>(prevIndex + 1) % images2.length);
    }
      const PrevImage2 = () => {
        setimageIndex2((prevIndex)=>
          prevIndex===0?images2.length-1 : prevIndex-1
      );
      }*/
  const NextImage2 = () => {
    setimageIndex2((prevIndex2) => (prevIndex2 + 1) % images2.length);
  };

  const PrevImage2 = () => {
    setimageIndex2((prevIndex2) =>
      prevIndex2 === 0 ? images2.length - 1 : prevIndex2 - 1
    );
  };

  return (
    <>
      <div id="home" className="home-main-back">
        <div className="home-main-image-back">
          <nav className="home-navbar">
            {/*this menu icon code will be active when screen width is less 770px;*/}
            <div
              className="home-menu-icon-back"
              onClick={toggleSidebar}
              style={{
                backgroundColor: sideBar === "visible" ? "#3777d1bf" : "",
              }}
            >
              <img src="/public/menu.png" alt="" className="home-menu-icon" />
            </div>

            <div className="business-logo">
              <h2>SellerPulse </h2>
              <img src="/business-logo.png" alt="" className="logo" />
            </div>
            <ul>
              <li>
                <a href="#home">HOME</a>
              </li>
              <li>
                <a href="#features">FEATURES</a>
              </li>
              <li>
                <a href="#about">ABOUT US</a>
              </li>
              <li>
                <a href="#contact">CONTACT US</a>
              </li>
            </ul>
            <div className="home-login-btn-back">
              <NavLink to="/login" className="home-login-btn">
                Login
              </NavLink>
              <NavLink to="/Signup" className="home-signup-btn">
                Signup
              </NavLink>
            </div>
          </nav>
          {/*this code will be active when screen width is less 770px;*/}
          <div
            className="home-sidebar-back"
            style={{
              transform:
                sideBar === "visible" ? " translateX(0%)" : "translateX(-100%)",
            }}
          >
            <ul>
              <li>
                <a href="#home-main-back" >HOME</a>
              </li>
              <li>
                <a href="#features">FEATURES</a>
              </li>
              <li>
                <a href="#about">ABOUT US</a>
              </li>
              <li>
                <a href="#contact">CONTACT US</a>
              </li>
            </ul>
            <div className="home-login-btn-back">
              <NavLink to="/login" className="home-login-btn">
                Login
              </NavLink>
              <NavLink to="/Signup" className="home-signup-btn">
                Signup
              </NavLink>
            </div>
          </div>
          <div className="home-welcome-content">
            <h2>Welcome to SellerPulse: </h2>
            <h2>Your Ultimate E-Commerce Dashboard</h2>
            <p>
              Welcome to SellerPulse, the all-in-one platform designed to
              streamline your e-commerce business. Whether you’re selling on
              Shopify, Daraz, or any other major platform, SellerPulse provides
              you with the tools you need to succeed.
            </p>
            <NavLink to="/Signup" className="home-get-started-btn">
              Get Started
            </NavLink>
          </div>
        </div>

        <div className="main-features-back">
          <div className="main-features1" id="features">
            <div className="main-feature-content">
              <h2>SellerPulse-Features</h2>
              <ul>
                <li>
                  <div className="main-feature-content-detail">
                    <img
                      src="/circle-1.png"
                      alt=""
                      className="feature-number-icon"
                    />
                    <h3>Multi-platform integration:</h3>
                  </div>
                  <p>
                    Connect and manage your stores across multiple e-commerce
                    platforms like Shopify, Daraz, and more, all from a single
                    dashboard.
                  </p>
                </li>
                <li>
                  <div className="main-feature-content-detail">
                    <img
                      src="/circle-2.png"
                      alt=""
                      className="feature-number-icon"
                    />
                    <h3>Product Management:</h3>
                  </div>
                  <p>
                    View and manage your entire product catalog across different
                    platforms. Easily update product details, track inventory,
                    and manage listings.
                  </p>
                </li>
                <li>
                  <div className="main-feature-content-detail">
                    <img
                      src="/circle-3.png"
                      alt=""
                      className="feature-number-icon"
                    />
                    <h3> Vendor Credentials Validation:</h3>
                  </div>
                  <p>
                    Securely connect your store by validating vendor credentials
                    such as store name, API keys, and client tokens. Ensure
                    smooth and secure integrations with different platforms.
                  </p>
                </li>
              </ul>
            </div>
            <div className="sellerpulse-features-ss-back">
              <div
                className="features-image-slider"
                style={{ transform: `translateX(-${imageIndex1 * 100}%)` }}
              >
                {images.map((image, index) => (
                  <div className="features-images" key={index}>
                    <img
                      className="images"
                      src={image}
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={PrevImage1}
                className="slide-image-btn"
                id="slide-prev-btn"
              >
                Previous
              </button>
              <button
                onClick={NextImage1}
                className="slide-image-btn"
                id="slide-next-btn"
              >
                Next
              </button>
            </div>
          </div>
          <div className="main-features2">
            <div className="sellerpulse-features-ss-back">
              <div
                className="features-image-slider"
                style={{ transform: `translateX(-${imageIndex2 * 100}%)` }}
              >
                {images2.map((image, index) => (
                  <div className="features-images" key={index}>
                    <img
                      className="images"
                      src={image}
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={PrevImage2}
                className="slide-image-btn"
                id="slide-prev-btn"
              >
                Previous
              </button>
              <button
                onClick={NextImage2}
                className="slide-image-btn"
                id="slide-next-btn"
              >
                Next
              </button>
            </div>
            <div className="main-feature-content">
              <h2>SellerPulse-Features</h2>
              <ul>
                <li>
                  <div className="main-feature-content-detail">
                    <img
                      src="/circle-4.png"
                      alt=""
                      className="feature-number-icon"
                    />
                    <h3>User-Friendly Dashboard:</h3>
                  </div>
                  <p>
                    A clean and intuitive interface that makes it easy to
                    navigate through various features, track performance, and
                    manage your stores effectively.
                  </p>
                </li>
                <li>
                  <div className="main-feature-content-detail">
                    <img
                      src="/circle-5.png"
                      alt=""
                      className="feature-number-icon"
                    />
                    <h3>Guided Onboarding:</h3>
                  </div>
                  <p>
                    Step-by-step guidance to help new users get started with
                    integrating their stores and using the platform’s features
                    effectively.
                  </p>
                </li>
                <li>
                  <div className="main-feature-content-detail">
                    <img
                      src="/circle-6.png"
                      alt=""
                      className="feature-number-icon"
                    />
                    <h3> Comprehensive FAQ and Support:</h3>
                  </div>
                  <p>
                    Access detailed FAQs and support resources to help you
                    troubleshoot common issues and learn more about using
                    SellerPulse.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="home-about-back">
          <div id="about" className="main-about-back1">
            <div className="main-about">
              <h2>SellerPulse </h2>
              <p>
                SellerPulse was founded by M. Fahad Pervaiz, a BSIT student at
                Bahria University, as part of his final year project, developed
                in collaboration with team members Tania Saleem and M. Huzaifa.
                Initially conceived by Fahad, the project aimed to create a
                unified dashboard for sellers advertising on various social
                media platforms like Facebook and Instagram. However, after
                conducting further research, Fahad shifted the focus toward
                e-commerce platforms such as Shopify, Daraz, and other prominent
                platforms, recognizing the rapid evolution of the e-commerce
                industry, especially after the COVID-19 pandemic. Fahad saw an
                opportunity to bridge the gap for vendors selling on multiple
                e-commerce platforms. The idea was to provide a tool that would
                streamline daily business operations, making them more efficient
                and manageable. SellerPulse was designed to offer features like
                product management, inventory tracking, sales monitoring, and
                user-friendly interfaces. Beyond simplifying existing
                operations, SellerPulse aims to motivate vendors to expand their
                reach by selling on multiple platforms available through the
                dashboard. This project, which evolved from an academic exercise
                to a practical business tool, stands as a testament to the
                team's commitment to enhancing the e-commerce experience for
                vendors.
              </p>
            </div>
          </div>
          <div className="main-about-back2">
            <h2>Our Developer Team</h2>
            <div className="main-about">
              {/*Card no 1*/}
              <div className="team-card-back">
                <div className="team-card-image-back">
                  <div className="image-border">
                    <img
                      src="/public/team-image02.jpg"
                      alt=""
                      className="team-card-image"
                    />
                  </div>
                  <h3>M.Fahad Pervaiz</h3>
                  <h5>Front-end Developer</h5>
                </div>
                <div className="team-card-detail">
                  <p>
                    A passionate and dedicated individual I'm constantly pushing
                    the boundaries in my projects. My commitment to innovation
                    and learning makes me a valuable asset to my team.
                  </p>
                </div>
                <div className="social-media-link-back">
                  <img
                    src="/public/instagram.png"
                    alt=""
                    className="social-media-link"
                  />
                  <img
                    src="/public/facebook.png"
                    alt=""
                    className="social-media-link"
                  />
                  <img
                    src="/public/twitter.png"
                    alt=""
                    className="social-media-link"
                  />
                </div>
              </div>
              {/*Card no 2*/}
              <div className="team-card-back">
                <div className="team-card-image-back">
                  <div className="image-border">
                    <img
                      src="/public/tania-image.jpg"
                      alt=""
                      className="team-card-image"
                    />
                  </div>
                  <h3>Tania Saleem</h3>
                  <h5>Back-end Developer</h5>
                </div>
                <div className="team-card-detail">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Recusandae temporibus assumenda quaerat rerum cupiditate
                    possimus!
                  </p>
                </div>
                <div className="social-media-link-back">
                  <img
                    src="/public/instagram.png"
                    alt=""
                    className="social-media-link"
                  />
                  <img
                    src="/public/facebook.png"
                    alt=""
                    className="social-media-link"
                  />
                  <img
                    src="/public/twitter.png"
                    alt=""
                    className="social-media-link"
                  />
                </div>
              </div>
              {/*Card no 3*/}
              <div className="team-card-back">
                <div className="team-card-image-back">
                  <div className="image-border">
                    <img
                      src="/public/huzaifa-image02.jpg"
                      alt=""
                      className="team-card-image"
                    />
                  </div>
                  <h3>M.Huzaifa</h3>
                  <h5>Documentation Specialist</h5>
                </div>
                <div className="team-card-detail">
                  <p>
                  As the Documentation Lead for SellerPulse, I craft clear, concise content to support our team and ensure a seamless user experience. I'm passionate about turning complex ideas into accessible information.  </p>
                </div>
                <div className="social-media-link-back">
                  <img
                    src="/public/instagram.png"
                    alt=""
                    className="social-media-link"
                  />
                  <img
                    src="/public/facebook.png"
                    alt=""
                    className="social-media-link"
                  />
                  <img
                    src="/public/twitter.png"
                    alt=""
                    className="social-media-link"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-contact-back" id="contact">
        <div className="home-contact">
          <div className="sellerpulse-link">
            <div className="sellerpulse-contact-back">
              <div className="sellerpulse-contact">
                <h2>SellerPulse</h2>
                <img
                  src="/sellerpulse-logo2.png"
                  alt=""
                  className="sellerpulse-logo"
                />
              </div>
              <div className="sellerpulse-socialmedia">
                <img
                  src="/public/instagram2.png"
                  alt=""
                  className="social-media-link"
                />
                <img
                  src="/public/facebook2.png"
                  alt=""
                  className="social-media-link"
                />
                <img
                  src="/public/twitter2.png"
                  alt=""
                  className="social-media-link"
                />
              </div>
            </div>
          </div>
          <div className="contact-support">
            <h3>Support </h3>
            <p>
              Have questions or need assistance? Our team at SellerPulse is
              dedicated to supporting you every step of the way. Whether you
              have a query about our platform, need technical support, or just
              want to share your feedback, we're just a message away. Reach out
              to us through the contact form, drop us an email, or connect with
              us on social media. We look forward to hearing from you!
            </p>
          </div>
          <div className="contact-info-back">
            <div className="contact-info">
              <label htmlFor="">
                <img
                  src="/phone-call.png"
                  alt=""
                  className="contact-info-logo"
                />
                Phone:
              </label>
              <input type="text" value="+92 3117769209" disabled />
              
              <label htmlFor="" id="email-label">
                <img src="/email.png" alt="" className="contact-info-logo" />
                E-mail:
              </label>
              <input type="email" value="sellerpulse2024@gmail.com" disabled />
              <div className="contact-joinnow">
                <p>join now?</p>{" "}
                <NavLink to="/Signup" className="contact-signup-btn">
                  Signup
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
