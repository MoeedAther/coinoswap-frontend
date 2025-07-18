import React, { useState, useEffect, useRef } from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS
import { ToastContainer } from "react-toastify";
import "../css/Contact_us.css";
import "../css/Contact_us_responsive.css";
import copy_icon from "../images/Copy Icon Yellow.png";
import Shevron_icon from "../images/Shevron.png";
import location_icon from "../images/Location Icon.png";
import MapComponent from "../components/map";
import axios from "axios";
import { Helmet } from "react-helmet";

const ContactUs = () => {
  const [copyMessage, setCopyMessage] = useState("");

  const copyToClipboard = (emailId, copyIconId) => {
    const email = document.getElementById(emailId).innerText;
    navigator.clipboard
      .writeText(email)
      .then(() => {
        // Show success toast message
        toast.success("Email copied successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        // Show copy message for 2 seconds
        setCopyMessage(`Email copied from ${emailId}`);
        setTimeout(() => setCopyMessage(""), 2000);
      })
      .catch(() => {
        // Show error toast message if copying fails
        toast.error("Failed to copy email!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  };

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    subject: "",
    orderId: "",
    message: "",
  });

  const [emailValidation, setEmailValidation] = useState(false);
  const [nameValidation, setNameValidation] = useState(false);
  const [subjectValidation, setSubjectValidation] = useState(false);
  const [messageValidation, setMessageValidation] = useState(false);

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let emailVal = false;
    let nameVal = false;
    let subjectVal = false;
    let messageVal = false;

    if (formData.email.length == 0) {
      setEmailValidation(true);
      emailVal = true;
      console.log("Email Validation if ", formData.email);
    } else {
      emailVal = false;
    }

    if (formData.fullName.length == 0) {
      setNameValidation(true);
      nameVal = true;
    } else {
      setNameValidation(false);
      nameVal = false;
    }

    if (
      formData.subject.length == 0 ||
      formData.subject == "Select an option"
    ) {
      setSubjectValidation(true);
      subjectVal = true;
    } else {
      setSubjectValidation(false);
      subjectVal = false;
    }

    if (formData.message.length == 0) {
      setMessageValidation(true);
      messageVal = true;
    } else {
      setMessageValidation(false);
      messageVal = false;
    }

    try {
      if (
        emailVal == false &&
        nameVal == false &&
        subjectVal == false &&
        messageVal == false
      ) {
        const url = process.env.REACT_APP_URL + "/contact_form";
        const options = {
          email: formData.email,
          name: formData.fullName,
          subject:
            formData.subject == "Support"
              ? "support@coinoswap.com"
              : formData.subject == "Marketing & PR"
              ? "pr@coinoswap.com"
              : formData.subject == "Partnerships"
              ? "partnerships@coinoswap.com"
              : "info@coinoswap.com",
          orderid: formData.orderId,
          message: formData.message,
        };

        const headers = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(url, options, headers);

        if (response.data.status == 1) {
          toast.success("Form submitted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          setFormData({
            email: "",
            fullName: "",
            subject: "",
            orderId: "",
            message: "",
          });
        } else {
          toast.error("Form submission unsuccessful. Please try again!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.success("An error occured please try again!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }

    setSelectedOption("Select an option");
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setFormData({ ...formData, subject: option });
    setDropdownVisible(false);
    toggleDropdown();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <Helmet>
        <title>Contact Us | CoinoSwap – Crypto Exchange Support</title>
        <meta
          name="description"
          content="Reach out to CoinoSwap for assistance with our non-custodial exchange aggregator. Our team is ready to help with your crypto-to-crypto exchange needs."
        />
      </Helmet>

      {/* Toast container */}
      <ToastContainer />

      {/* Contact_CoinoSwap section start */}
      <section className="contact_coinoSwap">
        <div className="container-fluid">
          <h4 className="contact_coinoSwap_heading contact_heading">
            Contact <strong>CoinoSwap</strong>
          </h4>
        </div>
      </section>
      {/* Contact_CoinoSwap section end */}
      {/* Rest of your JSX goes here */}

      {/* Get In Touch section start */}
      <div className="container-fluid mt-4 getIn_touch_section">
        <h3 className="text-center contact_heading getIn_touch">
          Get In Touch
        </h3>
        <div className="row mt-5">
          <div className="col-lg-3 col-md-12 text-left getIn_touch_cols">
            <p className="contact_para contact_links copied_heading">
              PR & Marketing:
            </p>
            <span id="pr-email" className="contact_heading copied_mail">
              <a
                href="mailto:pr@coinoswap.com"
                target="_blank"
                style={{ color: "#F4A70B", textDecoration: "none" }}
              >
                Pr@Coinoswap.Com
              </a>
            </span>
            <img
              className="copied_icon"
              src={copy_icon}
              alt="Copy Icon"
              id="pr-copy-icon"
              onClick={() => copyToClipboard("pr-email", "pr-copy-icon")}
            />
          </div>

          <div className="col-lg-3 col-md-12 text-left getIn_touch_cols">
            <p className="contact_para contact_links copied_heading">
              Support:
            </p>
            <span id="support-email" className="contact_heading copied_mail">
              <a
                href="mailto:support@coinswap.com"
                target="_blank"
                style={{ color: "#F4A70B", textDecoration: "none" }}
              >
                Support@Coinoswap.Com
              </a>
            </span>
            <img
              className="copied_icon"
              src={copy_icon}
              alt="Copy Icon"
              id="support-copy-icon"
              onClick={() =>
                copyToClipboard("support-email", "support-copy-icon")
              }
            />
          </div>

          <div className="col-lg-3 col-md-12 text-left getIn_touch_cols">
            <p className="contact_para contact_links copied_heading">
              Partnerships:
            </p>
            <span
              id="partnership-email"
              className="contact_heading copied_mail"
            >
              <a
                href="mailto:partnerships@coinswap.com"
                target="_blank"
                style={{ color: "#F4A70B", textDecoration: "none" }}
              >
                Partnerships@Coinoswap.Com
              </a>
            </span>
            <img
              className="copied_icon"
              src={copy_icon}
              alt="Copy Icon"
              id="partnership-copy-icon"
              onClick={() =>
                copyToClipboard("partnership-email", "partnership-copy-icon")
              }
            />
          </div>

          <div className="col-lg-3 col-md-12 text-left getIn_touch_cols">
            <p className="contact_para contact_links">Follow Us:</p>
            <div className="social-icon-contact-1 mt-4">
              <a href="https://medium.com/@CoinoSwap" target="_blank">
                <i class="fa-brands fa-medium fa-xl"></i>
              </a>
              <a href="https://www.tiktok.com/@coinoswap" target="_blank">
                <i class="fa-brands fa-tiktok fa-xl"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/coinoswap/"
                target="_blank"
              >
                <i class="fa-brands fa-linkedin fa-xl"></i>
              </a>
              <a href="https://www.instagram.com/coinoswap" target="_blank">
                <i className="fa-brands fa-instagram fa-xl social-instagram"></i>
              </a>
              <a href="https://www.youtube.com/@coinoswap" target="_blank">
                <i class="fa-brands fa-youtube fa-xl social-youtube"></i>
              </a>
            </div>

            <div className="social-icon-contact-2 mt-1">
              <a href="https://x.com/coinoswap" target="_blank">
                <i class="fa-brands fa-x-twitter fa-xl social-twitter"></i>
              </a>
              <a href="https://www.publish0x.com/@coinoswap" target="_blank">
                <i class="fa-solid fa-droplet fa-xl"></i>
              </a>
              <a href="https://www.reddit.com/user/CoinoSwap/" target="_blank">
                <i class="fa-brands fa-reddit-alien fa-xl"></i>
              </a>
              <a href="https://www.facebook.com/coinoswap" target="_blank">
                <i class="fa-brands fa-facebook-f fa-xl"></i>
              </a>
              <a href="https://t.me/coinoswap" target="_blank">
                <i class="fa-brands fa-telegram fa-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Get In Touch section end */}

      {/* Contact Form section start */}
      <section className="contact_form">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 form_col">
              <div className="form-container">
                <h2 className="contact_heading contact-form_heading">
                  Contact Form
                </h2>
                <form onSubmit={handleSubmit} className="contcts_form">
                  {/* Email and Full Name */}
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        className="userInfo_group"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                      />
                      <p
                        style={{
                          color: "red",
                          display: emailValidation == true ? "block" : "none",
                        }}
                      >
                        *please fill email address
                      </p>
                    </div>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        className="userInfo_group"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                      />
                      <p
                        style={{
                          color: "red",
                          display: nameValidation == true ? "block" : "none",
                        }}
                      >
                        *please fill your name
                      </p>
                    </div>
                  </div>

                  {/* Subject Dropdown */}
                  <div
                    className="custom-select-container"
                    ref={dropdownRef}
                    onClick={toggleDropdown}
                  >
                    <label htmlFor="subject" className="custom-label">
                      Subject
                    </label>
                    <div className="custom-select">
                      {/* Display selected option on the left side */}
                      <span className="selected-option">{selectedOption}</span>

                      {/* Icon click toggles the dropdown */}
                      <img
                        src={Shevron_icon}
                        className="dropdown-icon"
                        alt="dropdown-icon"
                      />
                    </div>
                    <p
                      style={{
                        color: "red",
                        display: subjectValidation == true ? "block" : "none",
                      }}
                    >
                      *please select subject
                    </p>
                    {/* Dropdown Menu */}
                    {isDropdownVisible && (
                      <ul className="select_dropdown">
                        <li onClick={() => handleOptionSelect("Support")}>
                          Support
                        </li>
                        <li
                          onClick={() => handleOptionSelect("Marketing & PR")}
                        >
                          Marketing & PR
                        </li>
                        <li onClick={() => handleOptionSelect("Partnerships")}>
                          Partnerships
                        </li>
                        <li onClick={() => handleOptionSelect("Others")}>
                          Others
                        </li>
                      </ul>
                    )}
                  </div>

                  {/* Order Tracker ID */}
                  <div className="form-group order_group_container">
                    <label>Order Tracker ID</label>
                    <input
                      className="order_group"
                      type="text"
                      name="orderId"
                      value={formData.orderId}
                      onChange={handleChange}
                      placeholder="Enter Order Tracker ID"
                    />
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      className="message_group"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message"
                    />
                    <p
                      style={{
                        color: "red",
                        display: messageValidation == true ? "block" : "none",
                      }}
                    >
                      *please fill message
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="submit-btn">
                    Send
                  </button>
                </form>
              </div>
            </div>

            {/* Map Section */}
            <div className="col-lg-6 map_col">
              <h2 className="contact_heading map_heading">Our Location</h2>
              <div className="google_map">
                <MapComponent />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Information section start */}
      <div className="contact_info_section">
        <div className="container-fluid">
          <div className="row text-center info_sec">
            <div className="col-lg-12">
              <h4 className="abou_heading contact_info_heading">
                Contact Information
              </h4>
              <img
                src={location_icon}
                alt="Location"
                className="contact_info_img"
              />
              <p className="contact_info_para about_para">
                Legal Registered Address:
              </p>
              <h4 className="contact_info_adress abou_heading">
                1309 Coffeen Avenue, Suite 16200 Sheridan, Wyoming 82801
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
