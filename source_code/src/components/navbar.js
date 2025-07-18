import React, { useEffect, useState, useLayoutEffect } from "react";
import logo from "../images/logo.png";
import language from "../images/language.png";
import england from "../images/England Flag.png";
import spain from "../images/Spain Flag.png";
import france from "../images/France Flag.png";
import germany from "../images/GER.png";
import italy from "../images/Italy Icon.png";
import portugal from "../images/Portugal Flag.png";
import swedon from "../images/SWE.png";
import china from "../images/CHI.png";
import japan from "../images/JPN.png";
import pakistan from "../images/Pakistan Flag.png";
import saudia from "../images/Arabia Flag.png";
import russia from "../images/Russia Flag.png";
import turkey from "../images/Turkey Flag.png";
import mobilemenu from "../images/Menu.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import changenow_black from "../images/changenow.png";
import changelly_black from "../images/changelly.png";
import changehero_black from "../images/changehero.png";
import exolix_black from "../images/exolix.png";
import godex_black from "../images/godex.png";
import letsexchange_black from "../images/letsexchange.png";
import simpleswap_black from "../images/simpleswap.png";
import stealthex_black from "../images/stealthex.png";
import "../css/navbar.css";
import SideMenue from "./sidemenu";
import homeicon from "../images/Home Icon.png";
import currencyicon from "../images/Currencies Icon.png";
import faqicon from "../images/FAQ Icon.png";
import howitworksicon from "../images/How It Works Icon.png";
import blogsicon from "../images/Our Blog Icon.png";
import aboutusicon from "../images/About Us Icon.png";
import { standerdiseStatus } from "../Js/functions.js";

const Navbar = () => {
  const navigate = useNavigate();

  //Capture route
  const location = useLocation();

  // You can use props here, for example:
  const [lang, setLanguage] = useState(localStorage.getItem("language"));
  const [orderid, setOrderId] = useState("");
  const [currentUrl, setCurrentUrl] = useState(location.pathname);
  const [homeclass, setHomeClass] = useState("");
  const [howitworksclass, setHowItWorksClass] = useState("");
  const [affiliateprogramclass, setAffiliateProgramClass] = useState("");
  const [faqclass, setFaqClass] = useState("");
  const [aboutusclass, setAboutUsClass] = useState("");
  let [visible, setVisible] = useState(false);

  // This transaction is responsible for show loader on swap tracker button
  const [btnLoader, setBtnLoader] = useState(false);

  const showNav = {
    transform: "translateX(100%)",
  };

  const hideNav = {
    transform: "translateX(0%)",
  };

  function handleClick() {
    // if (!visible) {
    //   document.body.style.overflow = "hidden"; // Disable scroll
    // } else {
    //   document.body.style.overflow = "auto"; // Enable scroll
    // }
    setVisible(!visible);
  }

  function formatCustomDate(isoDateStr) {
    const date = new Date(isoDateStr);

    // Get year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    // Get hours, minutes, and seconds
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Determine AM or PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert 24-hour time to 12-hour time
    hours = hours % 12 || 12; // If hours is 0, make it 12 (for midnight)

    // Format final string as YYYY-MM-DD H:MM:SS AM/PM
    const txdate = `${year}-${month}-${day}`;
    const txtime = `${hours}:${minutes}:${seconds} ${ampm}`;
    const formattedDate = {
      txtime: txtime,
      txdate: txdate,
    };
    return formattedDate;
  }

  useLayoutEffect(() => {
    const htmlElement = document.documentElement; // Target <html> for better compatibility

    if (visible) {
      const elements = document.getElementsByClassName("tawk-min-container");
      Array.from(elements).forEach((element) => {
        element.classList.add("hid"); // Add the class
      });

      htmlElement.classList.add("no-scroll"); // Add class to disable scroll
    } else {
      const elements = document.getElementsByClassName("tawk-min-container");
      Array.from(elements).forEach((element) => {
        element.classList.remove("hid"); // Add the class
      });
      htmlElement.classList.remove("no-scroll"); // Remove class to enable scroll
    }

    // Cleanup on unmount
    return () => {
      htmlElement.classList.remove("no-scroll");
    };
  }, [visible]);

  useEffect(() => {
    // Add CSS to mobile menu links function
    if (currentUrl == "/") {
      setHomeClass("mob-active-class");
      setHowItWorksClass("");
      setAboutUsClass("");
      setFaqClass("");
      setAffiliateProgramClass("");
    } else if (currentUrl == "/howitworks") {
      setHomeClass("");
      setHowItWorksClass("mob-active-class");
      setAboutUsClass("");
      setFaqClass("");
      setAffiliateProgramClass("");
    } else if (currentUrl == "/aboutus") {
      setHomeClass("");
      setHowItWorksClass("");
      setAboutUsClass("/mob-active-class");
      setFaqClass("");
      setAffiliateProgramClass("");
    } else if (currentUrl == "faq") {
      setHomeClass("");
      setHowItWorksClass("");
      setAboutUsClass("");
      setFaqClass("mob-active-class");
      setAffiliateProgramClass("");
    } else if (currentUrl == "/affiliateprogram") {
      setHomeClass("");
      setHowItWorksClass("");
      setAboutUsClass("");
      setFaqClass("");
      setAffiliateProgramClass("mob-active-class");
    }
  }, []);

  //Swap Tracker Warning
  const notify = async () => {
    setBtnLoader(true);
    if (orderid.length == 0) {
      setBtnLoader(false);
      toast.warn("Please enter complete order id", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        autoDismiss: true,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      try {
        const url = process.env.REACT_APP_URL + "/tx/status";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: orderid }),
        };

        const response = await fetch(url, options);
        const data = await response.json();
        //This if statement will exicute if transaction exists in database
        if (data.message == "Transaction Found") {
          setBtnLoader(false);

          const status = standerdiseStatus(data.tx.status);
          //This if statement will exicute if transaction is in process or failed
          if (
            status === "exchanging" ||
            status === "confirming" ||
            status === "refunded" ||
            status === "failed"
          ) {
            sessionStorage.setItem("ordertrackerid", data.tx.transaction_id);
            sessionStorage.setItem("txhashlink", data.tx.tx_hash_link);
            sessionStorage.setItem("txhash", data.tx.tx_hash);
            sessionStorage.setItem("depositaddress", data.tx.deposit_address);
            sessionStorage.setItem(
              "recipientaddress",
              data.tx.recipient_address
            );
            sessionStorage.setItem(
              "local_exchange_type",
              data.tx.transaction_type
            );
            sessionStorage.setItem(
              "local_send_crypto_name",
              data.tx.sell_coin_name
            );
            sessionStorage.setItem(
              "local_get_crypto_name",
              data.tx.get_coin_name
            );
            sessionStorage.setItem(
              "local_send_crypto_logo",
              data.tx.sell_coin_logo
            );
            sessionStorage.setItem(
              "local_get_crypto_logo",
              data.tx.get_coin_logo
            );
            sessionStorage.setItem("local_send_amount", data.tx.sell_amount);
            sessionStorage.setItem("local_get_amount", data.tx.get_amount);
            sessionStorage.setItem(
              "local_exchange_logo",
              data.tx.exchange_partner == "changenow"
                ? changenow_black
                : data.tx.exchange_partner == "changelly"
                ? changelly_black
                : data.tx.exchange_partner == "simpleswap"
                ? simpleswap_black
                : data.tx.exchange_partner == "simpleswap"
                ? simpleswap_black
                : data.tx.exchange_partner == "changehero"
                ? changehero_black
                : data.tx.exchange_partner == "letsexchange"
                ? letsexchange_black
                : data.tx.exchange_partner == "stealthex"
                ? stealthex_black
                : data.tx.exchange_partner == "godex"
                ? godex_black
                : exolix_black
            );
            navigate(
              `/progress?fromCurrency=${encodeURIComponent(
                data.tx.sell_coin_name
              )}&toCurrency=${encodeURIComponent(
                data.tx.get_coin_name
              )}&fromCurrencySymbol=${encodeURIComponent(
                data.tx.sell_coin
              )}&toCurrencySymbol=${encodeURIComponent(
                data.tx.get_coin
              )}&fromCurrencyNetwork=${
                data.tx.sell_coin_network
              }&toCurrencyNetwork=${
                data.tx.get_coin_network
              }&fromCurrencyImage=${encodeURIComponent(
                data.tx.sell_coin_logo
              )}&toCurrencyImage=${encodeURIComponent(
                data.tx.get_coin_logo
              )}&rate=${encodeURIComponent(
                data.tx.rate
              )}&partner=${encodeURIComponent(
                data.tx.exchange_partner
              )}&fixed=${encodeURIComponent(
                data.tx.transaction_type
              )}&sellAmount=${encodeURIComponent(
                data.tx.sell_amount
              )}&transactionId=${encodeURIComponent(
                data.tx.transaction_id
              )}&depositAddress=${encodeURIComponent(
                data.tx.deposit_address
              )}&recipientAddress=${encodeURIComponent(
                data.tx.recipient_address
              )}&depositExtraId=${encodeURIComponent(
                data.tx.deposit_extraid == null || data.tx.deposit_extraid == ""
                  ? false
                  : data.tx.deposit_extraid
              )}&recipientExtraId=${encodeURIComponent(
                data.tx.recipient_extraid == null ||
                  data.tx.recipient_extraid == ""
                  ? false
                  : data.tx.recipient_extraid
              )}&refundExtraId=${encodeURIComponent(
                data.tx.refund_extraid == null || data.tx.refund_extraid == ""
                  ? false
                  : data.tx.refund_extraid
              )}&timerValue=${encodeURIComponent(
                1
              )}&depositStatus=${encodeURIComponent(1)}&transactionHash=${
                data.tx.tx_hash
              }&transactionHashLink=${data.tx.tx_link}`
            );

            //This else if statement will exicute if transaction has successfully processed
          } else if (status === "finished") {
            sessionStorage.setItem("ordertrackerid", data.tx.transaction_id);
            sessionStorage.setItem("txhashlink", data.tx.tx_hash_link);
            sessionStorage.setItem("txhash", data.tx.tx_hash);
            sessionStorage.setItem("depositaddress", data.tx.deposit_address);
            sessionStorage.setItem(
              "recipientaddress",
              data.tx.recipient_address
            );
            sessionStorage.setItem(
              "local_exchange_type",
              data.tx.transaction_type
            );
            sessionStorage.setItem(
              "local_send_crypto_name",
              data.tx.sell_coin_name
            );
            sessionStorage.setItem(
              "local_get_crypto_name",
              data.tx.get_coin_name
            );
            sessionStorage.setItem(
              "local_send_crypto_logo",
              data.tx.sell_coin_logo
            );
            sessionStorage.setItem(
              "local_get_crypto_logo",
              data.tx.get_coin_logo
            );
            sessionStorage.setItem("local_send_amount", data.tx.sell_amount);
            sessionStorage.setItem("local_get_amount", data.tx.get_amount);
            sessionStorage.setItem(
              "completionTime",
              formatCustomDate(data.tx.completion_time).txtime
            );
            sessionStorage.setItem(
              "completionDate",
              formatCustomDate(data.tx.completion_time).txdate
            );
            sessionStorage.setItem(
              "local_exchange_logo",
              data.tx.exchange_partner == "changenow"
                ? changenow_black
                : data.tx.exchange_partner == "changelly"
                ? changelly_black
                : data.tx.exchange_partner == "simpleswap"
                ? simpleswap_black
                : data.tx.exchange_partner == "simpleswap"
                ? simpleswap_black
                : data.tx.exchange_partner == "changehero"
                ? changehero_black
                : data.tx.exchange_partner == "letsexchange"
                ? letsexchange_black
                : data.tx.exchange_partner == "stealthex"
                ? stealthex_black
                : data.tx.exchange_partner == "godex"
                ? godex_black
                : exolix_black
            );
            navigate(
              `/success?transactionId=${encodeURIComponent(
                data.tx.transaction_id
              )}&transactionHash=${encodeURIComponent(
                data.tx.tx_hash
              )}&transactionHashLink=${encodeURIComponent(
                data.tx.tx_hash_link
              )}&depositAddress=${encodeURIComponent(
                data.tx.deposit_address
              )}&recipientAddress=${encodeURIComponent(
                data.tx.recipient_address
              )}    &depositExtraId=${encodeURIComponent(
                data.tx.deposit_extraid == null || data.tx.deposit_extraid == ""
                  ? false
                  : data.tx.deposit_extraid
              )}&recipientExtraId=${encodeURIComponent(
                data.tx.recipient_extraid == null ||
                  data.tx.recipient_extraid == ""
                  ? false
                  : data.tx.recipient_extraid
              )}&refundExtraId=${encodeURIComponent(
                data.tx.refund_extraid == null || data.tx.refund_extraid == ""
                  ? false
                  : data.tx.refund_extraid
              )}   &fromCurrencySymbol=${encodeURIComponent(
                data.tx.sell_coin
              )}&fromCurrency=${encodeURIComponent(
                data.tx.sell_coin_name
              )}&sellAmount=${encodeURIComponent(
                data.tx.sell_amount
              )}&toCurrencySymbol=${encodeURIComponent(
                data.tx.get_coin
              )}&toCurrency=${encodeURIComponent(
                data.tx.get_coin_name
              )}&rate=${encodeURIComponent(data.tx.get_amount)}&partner=${
                data.tx.exchange_partner
              }&fixed=${encodeURIComponent(
                data.tx.transaction_type
              )}&fromCurrencyImage=${encodeURIComponent(
                data.tx.sell_coin_logo
              )}&toCurrencyImage=${encodeURIComponent(
                data.tx.get_coin_logo
              )}&completionTime=${encodeURIComponent(
                formatCustomDate(data.tx.completion_time).txtime
              )}&completionDate=${encodeURIComponent(
                formatCustomDate(data.tx.completion_time).txdate
              )}`
            );

            // Incase status doesnot match above provided statuses then this else statement will process and show user transaction not found message
          } else if (status === "waiting") {
            sessionStorage.setItem("ordertrackerid", data.tx.transaction_id);
            sessionStorage.setItem("txhashlink", data.tx.tx_hash_link);
            sessionStorage.setItem("txhash", data.tx.tx_hash);
            sessionStorage.setItem("depositaddress", data.tx.deposit_address);
            sessionStorage.setItem(
              "recipientaddress",
              data.tx.recipient_address
            );
            sessionStorage.setItem(
              "local_exchange_type",
              data.tx.transaction_type
            );
            sessionStorage.setItem(
              "local_send_crypto_name",
              data.tx.sell_coin_name
            );
            sessionStorage.setItem(
              "local_get_crypto_name",
              data.tx.get_coin_name
            );
            sessionStorage.setItem(
              "local_send_crypto_logo",
              data.tx.sell_coin_logo
            );
            sessionStorage.setItem(
              "local_get_crypto_logo",
              data.tx.get_coin_logo
            );
            sessionStorage.setItem("local_send_amount", data.tx.sell_amount);
            sessionStorage.setItem("local_get_amount", data.tx.get_amount);
            sessionStorage.setItem(
              "local_exchange_logo",
              data.tx.exchange_partner == "changenow"
                ? changenow_black
                : data.tx.exchange_partner == "changelly"
                ? changelly_black
                : data.tx.exchange_partner == "simpleswap"
                ? simpleswap_black
                : data.tx.exchange_partner == "simpleswap"
                ? simpleswap_black
                : data.tx.exchange_partner == "changehero"
                ? changehero_black
                : data.tx.exchange_partner == "letsexchange"
                ? letsexchange_black
                : data.tx.exchange_partner == "stealthex"
                ? stealthex_black
                : data.tx.exchange_partner == "godex"
                ? godex_black
                : exolix_black
            );

            navigate(
              `/submit?fromCurrency=${encodeURIComponent(
                data.tx.sell_coin_name
              )}&toCurrency=${encodeURIComponent(
                data.tx.get_coin_name
              )}&fromCurrencySymbol=${encodeURIComponent(
                data.tx.sell_coin
              )}&toCurrencySymbol=${encodeURIComponent(
                data.tx.get_coin
              )}&fromCurrencyNetwork=${
                data.tx.sell_coin_network
              }&toCurrencyNetwork=${
                data.tx.get_coin_network
              }&fromCurrencyImage=${encodeURIComponent(
                data.tx.sell_coin_logo
              )}&toCurrencyImage=${encodeURIComponent(
                data.tx.get_coin_logo
              )}&rate=${encodeURIComponent(
                data.tx.get_amount
              )}&partner=${encodeURIComponent(
                data.tx.exchange_partner
              )}&fixed=${encodeURIComponent(
                data.tx.transaction_type
              )}&sellAmount=${encodeURIComponent(
                data.tx.sell_amount
              )}&transactionId=${encodeURIComponent(
                data.tx.transaction_id
              )}&depositAddress=${encodeURIComponent(
                data.tx.deposit_address
              )}&recipientAddress=${encodeURIComponent(
                data.tx.recipient_address
              )}&depositExtraId=${encodeURIComponent(
                data.tx.deposit_extraid == null || data.tx.deposit_extraid == ""
                  ? false
                  : data.tx.deposit_extraid
              )}&recipientExtraId=${encodeURIComponent(
                data.tx.recipient_extraid == null ||
                  data.tx.recipient_extraid == ""
                  ? false
                  : data.tx.recipient_extraid
              )}&refundExtraId=${encodeURIComponent(
                data.tx.refund_extraid == null || data.tx.refund_extraid == ""
                  ? false
                  : data.tx.refund_extraid
              )}&timerValue=${encodeURIComponent(
                1
              )}&depositStatus=${encodeURIComponent(1)}`
            );
          }

          // This else statement will exicute if transaction doesnot exists in database
        } else {
          setBtnLoader(false);

          toast.error("Transaction not found!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
      } catch (error) {
        setBtnLoader(false);

        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
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
  };
  const links = [
    {
      name: "Home",
      icon: homeicon,
      link: "/",
    },
    {
      name: "How It Works",
      icon: howitworksicon,
      link: "/how-it-works",
    },
    {
      name: "Currencies",
      icon: currencyicon,
      link: "/best_crypto_exchange",
    },
    {
      name: "FAQ",
      icon: faqicon,
      link: "/faq",
    },
    {
      name: "Our Blog",
      icon: blogsicon,
      link: "https://coinoswap.com/blogs",
    },
    {
      name: "About Us",
      icon: aboutusicon,
      link: "/about_us",
    },
  ];

  function sidemenuNavigation(link) {
    handleClick();
    if (link !== "https://coinoswap.com/blogs") {
      navigate(link);
    } else {
      window.location.href = "https://coinoswap.com/blogs";
    }
  }
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light "
        style={{ background: "transparent" }}
      >
        <div className="logo">
          <Link className="navbar-brand" to="/">
            <img className="img-fluid" src={logo} />
          </Link>
        </div>

        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto navbar-links">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/how-it-works">
                How It Works
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/best_crypto_exchange">
                Currencies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/faq">
                FAQ
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://coinoswap.com/blogs">
                Our Blog
              </a>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about_us">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <a
                className="nav-link order-tracker-anchor"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                Order Tracker
              </a>
              <div
                className="dropdown-menu "
                id="dropdown-tracker-menu"
                aria-labelledby="dropdownMenuLink"
                style={{ borderRadius: "15px" }}
              >
                <input
                  type="txt"
                  className="form-control"
                  id="swap-tracker-input"
                  aria-describedby="emailHelp"
                  placeholder="Enter Order Tracker ID"
                  value={orderid}
                  onChange={(e) => {
                    setOrderId(e.target.value.replace(/\s+/g, ""));
                  }}
                ></input>
                <button
                  className="btn btn-primary swap-track-btn basement-font"
                  onClick={notify}
                >
                  {btnLoader ? (
                    <div className="btn-loader"></div>
                  ) : (
                    <span>Track Your Swap</span>
                  )}
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div className="flag-menu-btn">
          <div className="flag dropdown show">
            <a
              className="navbar-brand"
              href="#"
              id="flag-drop-down"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <div style={{ display: "inline-block", width: "45%" }}>
                <img className="img-fluid" src={lang} />
              </div>
              <i className="flag-drop-icon fa-solid fa-chevron-down"></i>
            </a>
            <div
              className="dropdown-menu "
              aria-labelledby="flag-drop-down"
              style={{ borderRadius: "15px" }}
            >
              <div className="scrollbox-lang">
                <a
                  className="dropdown-item"
                  href="#"
                  style={{ borderTopLeftRadius: "5px" }}
                  onClick={() => {
                    setLanguage(language);
                    localStorage.setItem("language", language);
                  }}
                >
                  <div className="lang-img">
                    <img className="img-fluid" src={language} />
                  </div>
                  EN-US
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    setLanguage(england);
                    localStorage.setItem("language", england);
                  }}
                >
                  <div className="lang-img">
                    <img className="img-fluid" src={england} />
                  </div>
                  EN-GB
                </a>
                {/* <a className="dropdown-item" href="#" onClick={()=>{setLanguage(spain); localStorage.setItem("language", spain)}}><div className='lang-img'><img className='img-fluid' src={spain}/></div>Español</a>
  <a className="dropdown-item" href="#" onClick={()=>{setLanguage(france); localStorage.setItem("language", france)}}><div className='lang-img'><img className='img-fluid' src={france}/></div>Française</a>
  <a className="dropdown-item" href="#" onClick={()=>{setLanguage(germany); localStorage.setItem("language", germany)}}><div className='lang-img'><img className='img-fluid' src={germany}/></div>Deutch</a>
  <a className="dropdown-item" href="#" onClick={()=>{setLanguage(italy); localStorage.setItem("language", italy)}}><div className='lang-img'><img className='img-fluid' src={italy}/></div>Italiana</a>
  <a className="dropdown-item" href="#" onClick={()=>{setLanguage(portugal); localStorage.setItem("language", portugal)}}><div className='lang-img'><img className='img-fluid' src={portugal}/></div>Português</a>
  <a className="dropdown-item" href="#" onClick={()=>{setLanguage(swedon); localStorage.setItem("language", swedon)}}><div className='lang-img'><img className='img-fluid' src={swedon}/></div>Svenska</a>
  <a className="dropdown-item" href="#" onClick={()=>{setLanguage(china); localStorage.setItem("language", china)}}><div className='lang-img'><img className='img-fluid' src={china}/></div>中国人</a>
  <a className="dropdown-item" href="#" onClick={()=>{setLanguage(japan); localStorage.setItem("language", japan)}}><div className='lang-img'><img className='img-fluid' src={japan}/></div>日本</a>
  <a className="dropdown-item" href="#" onClick={()=>{setLanguage(pakistan); localStorage.setItem("language", pakistan)}}><div className='lang-img'><img className='img-fluid' src={pakistan}/></div>اردو</a>
  <a className="dropdown-item" href="#" onClick={()=>{setLanguage(russia); localStorage.setItem("language", russia)}}><div className='lang-img'><img className='img-fluid' src={russia}/></div>Pусский</a>
  <a className="dropdown-item" href="#" onClick={()=>{setLanguage(turkey); localStorage.setItem("language", turkey)}}><div className='lang-img'><img className='img-fluid' src={turkey}/></div>Türk</a>
  <a className="dropdown-item" href="#" onClick={()=>{setLanguage(saudia); localStorage.setItem("language", saudia)}}><div className='lang-img'><img className='img-fluid' src={saudia}/></div>عربى</a> */}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="mobile-menu-div dropdown" style={{ display: "none" }}>
            {/* <a id="mobile-dropdown-menu" data-toggle="dropdown" aria-expanded="false"><img className='img-fluid' src={mobilemenu} style={{width:"40px"}}></img></a> */}
            <a
              id="mobile-dropdown-menu"
              onClick={() => {
                handleClick();
              }}
            >
              <img
                className="img-fluid"
                src={mobilemenu}
                style={{ width: "40px" }}
              ></img>
            </a>
          </div>
        </div>

        {visible ? (
          <SideMenue
            style={hideNav}
            links={links}
            lang={lang}
            hideshowfun={handleClick}
            selectlang={setLanguage}
            sidemenuNavigation={sidemenuNavigation}
          />
        ) : (
          <SideMenue style={showNav} links={links} lang={lang} />
        )}
      </nav>
    </>
  );
};

export default Navbar;
