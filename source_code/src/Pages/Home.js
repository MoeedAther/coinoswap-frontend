import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/home_responsive.css";
import "../css/home.css";
import ExchangeBox from "../components/exchangebox.js";
import changenow from "../images/changenow.png";
import changelly from "../images/changelly.png";
import changehero from "../images/changehero.png";
import exolix from "../images/exolix.png";
import godex from "../images/godex.png";
import letsexchange from "../images/letsexchange.png";
import simpleswap from "../images/simpleswap.png";
import stealthex from "../images/stealthex.png";
import easybit from "../images/svg/Easybit.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import get_wallet from "../images/Get Your Wallet Button.png";
import order_tracker from "../images/Order tracker Button.png";
import { toast, Bounce } from "react-toastify";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useNavigate } from "react-router-dom";
import changenow_black from "../images/changenow.png";
import changelly_black from "../images/changelly.png";
import changehero_black from "../images/changehero.png";
import exolix_black from "../images/exolix.png";
import godex_black from "../images/godex.png";
import letsexchange_black from "../images/letsexchange.png";
import simpleswap_black from "../images/simpleswap.png";
import stealthex_black from "../images/stealthex.png";
import order_tracker_vertical from "../images/Order Tracker_vertical.png";
import { Helmet } from "react-helmet";
import number_1 from "../images/number_1 (1).png";
import number_2 from "../images/2.png";
import number_3 from "../images/3.png";
import number_4 from "../images/4.png";
import number_5 from "../images/5.png";
import Horizontal_line_1 from "../images/Horizontal_Line 1.png";
import Horizontal_line_2 from "../images/Horizontal_Line 2.png";
import Horizontal_line_3 from "../images/Horizontal_Line 3.png";
import Dotted_Line_vertical_1 from "../images/Dotted Line 1.png";
import Dotted_Line_vertical_2 from "../images/Dotted Line 2.png";
import Dotted_Line_vertical_3 from "../images/Dotted Line 4_respon.png";
import benefit_one_para from "../images/Streamlined and Convenient Crypto Coin Swap Process.png";
import benefit_two_para from "../images/Instant Crypto Exchange for Quick Transactions.png";
import benefit_three_para from "../images/Transparent and Fair Pricing with No Hidden Fees.png";
import benefit_four_para from "../images/A Hassle-Free Way to Access the Best Crypto Exchange Options.png";
import horizontal_bar from "../images/Horizontal bar.png";
import vertical_bar from "../images/vertical bar.png";
import best_exchange_rates from "../images/Best Exchange Rates.png";
import secure_transactions from "../images/Secure Transactions.png";
import over_1000_currencies from "../images/Over 1000 Cryptocurrencies Available.png";
import no_registeration from "../images/No Registration Required.png";
import comma_right from "../images/inverted commas right.png";
import comma_left from "../images/inverted commas left.png";
import trustpilot_rating from "../images/Trustpilot Rating.png";
import { standerdiseStatus } from "../Js/functions.js";

const Home = (props) => {
  const {
    cryptoData,
    setOffersFun,
    setBestOfferAndGiveawayObjectFun,
    storeSendCoinObject,
    storeGetCoinObject,
    sendCoinObject,
    getCoinObject,
    storeCoinBatch,
    coinSearchTerm,
    coinBatch,
    dropDownCoinsLoading,
    storeSendAmount,
    storeGetAmount,
    sendAmount,
    getAmount,
  } = props;

  //Order Tracker JS
  const [isOpen, setIsOpen] = useState(false);

  const toggleOrderTracker = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [orderid, setOrderId] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);

  //Swap Tracker Warning
  const notify = async () => {
    if (orderid.length == 0) {
      setBtnLoader(false);

      toast.warn("Please enter complete order id.", {
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
        setBtnLoader(true);
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
        if (data.message === "Transaction Found") {
          const status = standerdiseStatus(data.tx.status);

          // Turn off button loading
          setBtnLoader(false);

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
              )}&fromCurrencySymbol=${encodeURIComponent(
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

            // Incase deposit has not been performed
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
            // Incase status doesnot match above provided statuses then this else statement will process and show user transaction not found message
          }

          // This else statement will exicute if transaction doesnot exists in database
        } else {
          // Turn off button loading
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

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

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

  let imageHeight = "70px";

  useEffect(() => {
    window.scrollTo(0, 0);
    // Add event listener to window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>CoinoSwap | Instant Crypto Exchange Aggregator</title>
        <meta
          name="description"
          content="Swap and buy cryptocurrencies instantly with CoinoSwap, the non-custodial crypto exchange aggregator offering the best rates. No registration required!"
        />
      </Helmet>

      <div className="container-fluid home-page">
        <div className="section1-home row">
          <div className="col-xl-6 section1-home-heading-div">
            <h1 className="section1-home-headding">
              <span>The Ultimate... </span>
              <span style={{ color: "#F0970D" }}>Crypto </span>{" "}
              <span style={{ color: "#F0970D" }}>Exchange </span>
              <span> Aggregator</span>
            </h1>

            <h2 className="freedom-txt">
              <span>Freedom To Choose Your</span> <span>Best Rates</span>
            </h2>
            {/* <p style={{color:"rgb(92 90 88)", fontSize:"1.4vw", marginBottom:"3%"}}>Best Rates <span style={{letterSpacing:"-3px"}}>---</span> Infinite Swaps</p> */}
            <div className="row wallet-ordertracker-div">
              <div
                className="col-6 get-wallet-container"
                style={{ paddingLeft: "0px" }}
              >
                <Link to="/available_soon">
                  <img
                    className="img-fluid get-wallet"
                    src={get_wallet}
                    style={{ width: "70%" }}
                    id="thumb-cursor"
                  ></img>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-12 exchangebox-align">
            <div className="exchangebox-wrapper">
              <div className="order-tracker-container">
                <div
                  className={`order-tracker-btn-wrapper ${
                    isOpen ? "open" : ""
                  }`}
                >
                  {/* Image used as button to trigger order tracker */}
                  <img
                    src={order_tracker_vertical}
                    alt="Order Tracker Icon"
                    className="tracker-logo"
                    onClick={toggleOrderTracker}
                    style={{ cursor: "pointer" }}
                  />
                  <div className={`tracker-content ${isOpen ? "visible" : ""}`}>
                    <input
                      type="text"
                      className="form-control tracker-input"
                      placeholder="Enter Order Tracker ID"
                      value={orderid}
                      onChange={(e) => {
                        setOrderId(e.target.value.replace(/\s+/g, ""));
                      }}
                    />
                    <button
                      className="btn btn-warning tracker-btn"
                      onClick={notify}
                    >
                      {btnLoader ? (
                        <div className="btn-loader"></div>
                      ) : (
                        <span>Track Your Swap</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <ExchangeBox
                cryptoData={cryptoData}
                setOffersFun={setOffersFun}
                setBestOfferAndGiveawayObjectFun={
                  setBestOfferAndGiveawayObjectFun
                }
                storeSendCoinObject={storeSendCoinObject}
                storeGetCoinObject={storeGetCoinObject}
                sendCoinObject={sendCoinObject}
                getCoinObject={getCoinObject}
                storeCoinBatch={storeCoinBatch}
                coinSearchTerm={coinSearchTerm}
                coinBatch={coinBatch}
                dropDownCoinsLoading={dropDownCoinsLoading}
                storeSendAmount={storeSendAmount}
                storeGetAmount={storeGetAmount}
                sendAmount={sendAmount}
                getAmount={getAmount}
              />
            </div>
          </div>
        </div>
        <div className="our-process-div">
          {screenWidth >= 769 ? (
            <div className="our-process-desktop">
              {/* How to swap crypto section start */}
              <div class="swap-crypto-section">
                <div class="steps_row">
                  <div class="steps">
                    <div class="left-content col-5">
                      <h2 className="swap_heading swap_crypto">
                        How To Swap Crypto
                      </h2>
                      <p className="swap_para crypto_para">
                        CoinoSwap is a non-custodial crypto exchange aggregator
                        providing convenient and speedy exchanges to swap pairs.
                      </p>
                    </div>

                    <div className="col-7 right-content">
                      <div class="Steps Step_1">
                        <div class="step-heading">
                          <img
                            src={number_1}
                            alt="Step 1"
                            class="step-number img-fluid step-1"
                          />
                          <div>
                            <h3 className="swap_heading">Step 1</h3>
                            <p className="swap_para">
                              Select the cryptocurrency pair you wish to swap.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="dotted-line dotted-line-step1">
                        <img
                          src={Horizontal_line_1}
                          alt="Dotted Line"
                          class="img-fluid"
                        />
                      </div>
                      <div class="Steps Step_2">
                        <div class="step-heading">
                          <img
                            src={number_2}
                            alt="Step 2"
                            class="step-number img-fluid"
                          />
                          <div>
                            <h3 className="swap_heading">Step 2</h3>
                            <p className="swap_para">
                              Select the exchange service of your choice.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="steps_row">
                  <div class="steps">
                    <div class="Steps Step_3 col-2">
                      <div class="step-heading">
                        <img
                          src={number_3}
                          alt="Step 3"
                          class="step-number img-fluid"
                        />
                        <div>
                          <h3 className="swap_heading">Step 3</h3>
                          <p className="swap_para">
                            Provide the wallet address where you want to receive
                            your coins.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="dotted-lines col-3">
                      <img
                        src={Horizontal_line_2}
                        alt="Dotted Line"
                        class="step3_line img-fluid"
                      />
                    </div>

                    <div class="Steps Step_4 col-2">
                      <div class="step-heading">
                        <img
                          src={number_4}
                          alt="Step 4"
                          class="step-number img-fluid"
                        />
                        <div>
                          <h3 className="swap_heading">Step 4</h3>
                          <p className="swap_para">
                            Send the required deposit to the designated address.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="dotted-lines col-3">
                      <img
                        src={Horizontal_line_3}
                        alt="Dotted Line"
                        class="img-fluid"
                      />
                    </div>

                    <div class="Steps Step_5 col-2">
                      <div class="step-heading">
                        <img
                          src={number_5}
                          alt="Step 5"
                          class="step-number img-fluid"
                        />
                        <div>
                          <h3 className="swap_heading">Step 5</h3>
                          <p className="swap_para">
                            Wait until your swap is successfully completed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* How to swap crypto section end */}
            </div>
          ) : (
            <></>
          )}
          {screenWidth <= 769 ? (
            <div className="our-process-mobile">
              <div className="how-it-works-div">
                <h3>How To Swap Crypto</h3>
                <p>
                  CoinoSwap Is A Non-Custodial Crypto Exchange Aggregator
                  Providing Convenient And Speedy Exchanges To Swap Pairs.
                </p>
              </div>
              <div class="swap-crypto-section-mobile">
                <div class="steps-mobile">
                  <div class="step-mobile">
                    <div class="step-heading-mobile">
                      <img
                        src={number_1}
                        alt="Step 1"
                        class="step-number-mobile number_1_mobile"
                      />
                      <h3>Step 1</h3>
                    </div>
                    <p>Select the cryptocurrency pair you wish to swap.</p>
                    <img
                      src={Dotted_Line_vertical_1}
                      alt="Dotted Line"
                      class="dotted-line-mobile"
                    />
                  </div>

                  <div class="step-mobile">
                    <div class="step-heading-mobile">
                      <img
                        src={number_2}
                        alt="Step 2"
                        class="step-number-mobile"
                      />
                      <h3>Step 2</h3>
                    </div>
                    <p>Select the exchange service of your choice.</p>
                    <img
                      src={Dotted_Line_vertical_2}
                      alt="Dotted Line"
                      class="dotted-lines-mobile"
                    />
                  </div>

                  <div class="step-mobile">
                    <div class="step-heading-mobile">
                      <img
                        src={number_3}
                        alt="Step 3"
                        class="step-number-mobile"
                      />
                      <h3>Step 3</h3>
                    </div>
                    <p>
                      Provide the wallet address where you want to receive your
                      coins.
                    </p>
                    <img
                      src={Dotted_Line_vertical_2}
                      alt="Dotted Line"
                      class="dotted-lines-mobile"
                    />
                  </div>

                  <div class="step-mobile">
                    <div class="step-heading-mobile">
                      <img
                        src={number_4}
                        alt="Step 4"
                        class="step-number-mobile"
                      />
                      <h3>Step 4</h3>
                    </div>
                    <p>Send the required deposit to the designated address.</p>
                    <img
                      src={Dotted_Line_vertical_3}
                      alt="Dotted Line"
                      class="dotted-line-mobile"
                    />
                  </div>

                  <div class="step-mobile">
                    <div class="step-heading-mobile">
                      <img
                        src={number_5}
                        alt="Step 5"
                        class="step-number-mobile"
                      />
                      <h3>Step 5</h3>
                    </div>
                    <p>Wait until your swap is successfully completed.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {screenWidth >= 769 ? (
          <div className="why-coinoswap-div">
            <h2 className="why-coinoswap-heading">
              <span>CoinoSwap: A Seamless Crypto</span>
              <br />
              <span>Exchange Experience</span>
            </h2>
            <p className="why-coinoswap-para">
              CoinoSwap acts as a crypto exchange aggregator, bringing you the
              most competitive rates from a variety of reliable and trusted
              crypto exchange providers. By continuously monitoring the market,
              we ensure that you always get access to the best crypto exchange
              rates available. This means you can easily swap your digital
              assets at the best possible price without the need to browse
              through multiple platforms.
            </p>

            <div className="why-coinoswap-div-points">
              <div className="why-coinoswap-div-points-container">
                <div className="why-coinoswap-div-left">
                  <div className="benefit-one-desc">
                    <h3 className="basement-font text-white">
                      Streamlined And Convenient Crypto Coin Swap Process
                    </h3>
                    <p>
                      We’ve designed our platform to provide a smooth, intuitive
                      experience for all users. Whether you're new to crypto or
                      an experienced trader, crypto swap has never been easier.
                      CoinoSwap allows you to quickly exchange your crypto
                      without the hassle of complex processes. Our platform
                      connects you with the most efficient crypto exchange
                      services, ensuring a crypto coin swap that’s as simple as
                      it is effective.
                    </p>
                  </div>
                </div>
                <div className="why-coinoswap-div-right benefit-one-img">
                  <div>
                    <img src={benefit_one_para} className="img-fluid"></img>
                  </div>
                </div>
              </div>

              <div className="why-coinoswap-div-points-container">
                <div className="why-coinoswap-div-left benefit-one-img">
                  <div>
                    <img src={benefit_two_para} className="img-fluid"></img>
                  </div>
                </div>
                <div className="why-coinoswap-div-right">
                  <div className="benefit-one-desc">
                    <h3 className="basement-font text-white">
                      Instant Crypto Exchange for Quick Transactions
                    </h3>
                    <p>
                      At CoinoSwap, we prioritize speed and convenience. That's
                      why we offer a crypto instant exchange feature, allowing
                      you to complete your crypto swap in just a few minutes. No
                      need to wait around or deal with slow transaction
                      times—get your coins swapped instantly, whenever you need
                      them.
                    </p>
                  </div>
                </div>
              </div>

              <div className="why-coinoswap-div-points-container">
                <div className="why-coinoswap-div-left">
                  <div className="benefit-one-desc">
                    <h3 className="basement-font text-white">
                      Transparent and Fair Pricing with No Hidden Fees
                    </h3>
                    <p>
                      We believe in complete transparency, so you can be
                      confident in your exchanges. The transaction fees are set
                      by our crypto exchange partners and are displayed upfront.
                      At CoinoSwap, there are no additional hidden fees for
                      using our service—just the clear and fair rates provided
                      by our trusted exchange partners. When you use CoinoSwap
                      for your crypto coin swap, you can rest assured that there
                      are no surprise charges.
                    </p>
                  </div>
                </div>
                <div className="why-coinoswap-div-right benefit-one-img">
                  <div>
                    <img src={benefit_three_para} className="img-fluid"></img>
                  </div>
                </div>
              </div>

              <div className="why-coinoswap-div-points-container">
                <div className="why-coinoswap-div-left benefit-one-img">
                  <img src={benefit_four_para} className="img-fluid"></img>
                </div>
                <div className="why-coinoswap-div-right">
                  <div className="benefit-one-desc">
                    <h3 className="basement-font text-white">
                      A Hassle-Free Way to Access the Best Crypto Exchange
                      Options
                    </h3>
                    <p>
                      Why waste time navigating multiple exchanges when
                      CoinoSwap does the hard work for you? As a crypto exchange
                      aggregator, we gather the best offers from leading
                      exchanges, so you don’t have to spend time comparing
                      platforms. Simply use CoinoSwap to access a wide selection
                      of crypto instant exchange services, and choose the best
                      deal available for your trade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {screenWidth <= 768 ? (
          <div className="why-coinoswap-div-mobile">
            <h2 className="why-coinoswap-heading">
              <span>CoinoSwap: A Seamless Crypto</span>
              <span> </span>
              <span>Exchange Experience</span>
            </h2>
            <p className="why-coinoswap-para">
              CoinoSwap acts as a crypto exchange aggregator, bringing you the
              most competitive rates from a variety of reliable and trusted
              crypto exchange providers. By continuously monitoring the market,
              we ensure that you always get access to the best crypto exchange
              rates available. This means you can easily swap your digital
              assets at the best possible price without the need to browse
              through multiple platforms.
            </p>

            <div className="why-coinoswap-div-points">
              <div className="why-coinoswap-div-points-container">
                <div className="why-coinoswap-child">
                  <div className="benefit-one-desc">
                    <h3 className="basement-font text-white">
                      Streamlined And Convenient Crypto Coin Swap Process
                    </h3>
                    <p>
                      We’ve designed our platform to provide a smooth, intuitive
                      experience for all users. Whether you're new to crypto or
                      an experienced trader, crypto swap has never been easier.
                      CoinoSwap allows you to quickly exchange your crypto
                      without the hassle of complex processes. Our platform
                      connects you with the most efficient crypto exchange
                      services, ensuring a crypto coin swap that’s as simple as
                      it is effective.
                    </p>
                  </div>
                </div>
                <div className="why-coinoswap-child benefit-one-img">
                  <div>
                    <img src={benefit_one_para} className="img-fluid"></img>
                  </div>
                </div>
              </div>

              <div className="why-coinoswap-div-points-container">
                <div className="why-coinoswap-child">
                  <div className="benefit-one-desc">
                    <h3 className="basement-font text-white">
                      Instant Crypto Exchange for Quick Transactions
                    </h3>
                    <p>
                      At CoinoSwap, we prioritize speed and convenience. That's
                      why we offer a crypto instant exchange feature, allowing
                      you to complete your crypto swap in just a few minutes. No
                      need to wait around or deal with slow transaction
                      times—get your coins swapped instantly, whenever you need
                      them.
                    </p>
                  </div>
                </div>
                <div className="why-coinoswap-child benefit-one-img">
                  <div>
                    <img src={benefit_two_para} className="img-fluid"></img>
                  </div>
                </div>
              </div>

              <div className="why-coinoswap-div-points-container">
                <div className="why-coinoswap-child">
                  <div className="benefit-one-desc">
                    <h3 className="basement-font text-white">
                      Transparent and Fair Pricing with No Hidden Fees
                    </h3>
                    <p>
                      We believe in complete transparency, so you can be
                      confident in your exchanges. The transaction fees are set
                      by our crypto exchange partners and are displayed upfront.
                      At CoinoSwap, there are no additional hidden fees for
                      using our service—just the clear and fair rates provided
                      by our trusted exchange partners. When you use CoinoSwap
                      for your crypto coin swap, you can rest assured that there
                      are no surprise charges.
                    </p>
                  </div>
                </div>
                <div className="why-coinoswap-child benefit-one-img">
                  <div>
                    <img src={benefit_three_para} className="img-fluid"></img>
                  </div>
                </div>
              </div>

              <div className="why-coinoswap-div-points-container">
                <div className="why-coinoswap-child">
                  <div className="benefit-one-desc">
                    <h3 className="basement-font text-white">
                      A Hassle-Free Way to Access the Best Crypto Exchange
                      Options
                    </h3>
                    <p>
                      Why waste time navigating multiple exchanges when
                      CoinoSwap does the hard work for you? As a crypto exchange
                      aggregator, we gather the best offers from leading
                      exchanges, so you don’t have to spend time comparing
                      platforms. Simply use CoinoSwap to access a wide selection
                      of crypto instant exchange services, and choose the best
                      deal available for your trade.
                    </p>
                  </div>
                </div>
                <div className="why-coinoswap-child benefit-one-img">
                  <img src={benefit_four_para} className="img-fluid"></img>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div className="review-carousal-container">
                <h2
                  className="basement-font"
                  style={{ color: "white", textAlign: "center" }}
                >
                  What Our Users Are Saying about Us
                </h2>
                <div className="user-review">
                  <div className="user-dp">
                    {/* <img src={review_image} className="img-fluid"></img> */}
                    <span>R</span>
                  </div>
                  <div>
                    <h6 className="basement-font">Ralph Williams</h6>
                    <span>28 November 2024</span>
                  </div>
                </div>
                <div className="user-review-decription">
                  <div className="left-comma">
                    <img src={comma_left} className="img-fluid"></img>
                  </div>
                  <p>
                    Fast and easy! Pretty straightforward and no complications
                    along the way.
                  </p>
                  <div className="right-comma">
                    <img src={comma_right} className="img-fluid"></img>
                  </div>
                </div>
                {/* <div className="trustpilot-rating"><a href="https://www.trustpilot.com/review/coinoswap.com" target="_blank"><img src={trustpilot_rating}></img></a></div> */}
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>

        <div className="why-choose-container">
          <div className="row why-choose-heading">
            <h2 className="basement-font">Why Choose CoinoSwap</h2>
          </div>
          <div className="row why-choose-desktop">
            {/* Why choose 1 */}
            <div className="col-3 why-div">
              <div className="why-div-img">
                <div>
                  <img src={best_exchange_rates} className="img-fluid"></img>
                </div>
                <div>
                  <img src={horizontal_bar} className="img-fluid"></img>
                </div>
              </div>
              <h3>Best Exchange Rates</h3>
              <p>
                As a leading crypto exchange aggregator, we partner with the
                most trusted and efficient crypto exchange providers to ensure
                you get the best crypto exchange rates for your trades. Choose
                the perfect offer for your crypto coin swap!
              </p>
            </div>

            {/* Why choose 2 */}
            <div className="col-3 why-div">
              <div className="why-div-img">
                <div>
                  <img src={secure_transactions} className="img-fluid"></img>
                </div>
                <div>
                  <img src={horizontal_bar} className="img-fluid"></img>
                </div>
              </div>
              <h3>Secure Transactions</h3>
              <p>
                Your security is our priority. We carefully vet all exchange
                services to safeguard your funds, ensuring that every crypto
                swap is smooth and secure. With our commitment to secure
                transactions, you can trade with confidence.
              </p>
            </div>

            {/* Why choose 3 */}
            <div className="col-3 why-div">
              <div className="why-div-img">
                <div>
                  <img src={over_1000_currencies} className="img-fluid"></img>
                </div>
                <div>
                  <img src={horizontal_bar} className="img-fluid"></img>
                </div>
              </div>
              <h3>Over 1000 Cryptocurrencies Available</h3>
              <p>
                With over 1000+ cryptocurrencies to choose from, CoinoSwap makes
                it easy to find and trade the crypto you need. Whether you're
                looking for a popular coin or a niche token, you’ll find it here
                for your instant crypto exchange needs.
              </p>
            </div>

            {/* Why choose 4 */}
            <div className="col-3 why-div">
              <div className="why-div-img">
                <div>
                  <img src={no_registeration} className="img-fluid"></img>
                </div>
                <div>
                  <img
                    src={horizontal_bar}
                    className="img-fluid"
                    style={{ visibility: "hidden" }}
                  ></img>
                </div>
              </div>
              <h3>No Registration Required</h3>
              <p>
                Enjoy the convenience of swapping cryptocurrencies without the
                hassle of creating an account. With no registration required,
                you can quickly and securely perform your crypto coin swap.
                Simple, fast, and secure – just swap and go!
              </p>
            </div>
          </div>

          <div className="row why-choose-mobile">
            {/* Why choose 1 */}
            <div className="col-12 why-div">
              <div className="why-div-img">
                <div>
                  <img src={best_exchange_rates} className="img-fluid"></img>
                </div>
              </div>
              <h3>Best Exchange Rates</h3>
              <p>
                As a leading crypto exchange aggregator, we partner with the
                most trusted and efficient crypto exchange providers to ensure
                you get the best crypto exchange rates for your trades. Choose
                the perfect offer for your crypto coin swap!
              </p>
              <div className="vertical-bar">
                <img src={vertical_bar} className="img-fluid"></img>
              </div>
            </div>

            {/* Why choose 2 */}
            <div className="col-12 why-div">
              <div className="why-div-img">
                <div>
                  <img src={secure_transactions} className="img-fluid"></img>
                </div>
              </div>
              <h3>Secure Transactions</h3>
              <p>
                Your security is our priority. We carefully vet all exchange
                services to safeguard your funds, ensuring that every crypto
                swap is smooth and secure. With our commitment to secure
                transactions, you can trade with confidence.
              </p>
              <div className="vertical-bar">
                <img src={vertical_bar} className="img-fluid"></img>
              </div>
            </div>

            {/* Why choose 3 */}
            <div className="col-12 why-div">
              <div className="why-div-img">
                <div>
                  <img src={over_1000_currencies} className="img-fluid"></img>
                </div>
              </div>
              <h3>Over 1000 Cryptocurrencies Available</h3>
              <p>
                With over 1000+ cryptocurrencies to choose from, CoinoSwap makes
                it easy to find and trade the crypto you need. Whether you're
                looking for a popular coin or a niche token, you’ll find it here
                for your instant crypto exchange needs.
              </p>
              <div className="vertical-bar">
                <img src={vertical_bar} className="img-fluid"></img>
              </div>
            </div>

            {/* Why choose 4 */}
            <div className="col-12 why-div">
              <div className="why-div-img">
                <div>
                  <img src={no_registeration} className="img-fluid"></img>
                </div>
              </div>
              <h3>No Registration Required</h3>
              <p>
                Enjoy the convenience of swapping cryptocurrencies without the
                hassle of creating an account. With no registration required,
                you can quickly and securely perform your crypto coin swap.
                Simple, fast, and secure – just swap and go!
              </p>
            </div>
          </div>
        </div>

        <div className="faq-heading">
          <h2 className="basement-font">Frequently Asked Questions (FAQs)</h2>
        </div>

        <div className="faq-home">
          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#why-coino-swap"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            What is CoinoSwap?
          </button>
          <div class="collapse faq-home-desc" id="why-coino-swap">
            <div class="card card-body">
              CoinoSwap is the ultimate instant crypto exchange aggregator that
              connects users to the best crypto exchange rates across multiple
              trusted platforms. By gathering real-time data, we provide an
              efficient and cost-effective way to perform crypto swaps for a
              wide variety of coins. Our goal is to simplify your crypto coin
              swap experience with the best market rates, low fees, and a
              streamlined process.{" "}
            </div>
          </div>

          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#how-it-works"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            How Does CoinoSwap Work?
          </button>
          <div class="collapse faq-home-desc" id="how-it-works">
            <div class="card card-body">
              CoinoSwap aggregates rates from various exchanges and presents
              them in a simple format, allowing you to easily compare and select
              the best offers for your crypto swap. We allow you to make
              seamless cross-chain swaps both quickly and securely, without the
              need to create multiple accounts across different platforms. After
              choosing the cryptocurrencies you wish to exchange, CoinoSwap
              instantly shows available offers from different instant crypto
              exchange partners. This ensures you always find the best crypto
              exchange rates and options in one place, saving you time and
              effort.
            </div>
          </div>

          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#need-account"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Do I Need to Create an Account on CoinoSwap?
          </button>
          <div class="collapse faq-home-desc" id="need-account">
            <div class="card card-body">
              No, you don’t need to create an account with CoinoSwap. Our
              service is designed for maximum convenience and privacy. You can
              perform an instant crypto exchange without signing up, making it
              quick and easy to trade your cryptocurrencies.
            </div>
          </div>

          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#how-can-i"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            How Can I Be Sure I'm Getting the Best Rates?
          </button>
          <div class="collapse faq-home-desc" id="how-can-i">
            <div class="card card-body">
              As an Instant crypto exchange aggregator, CoinoSwap ensures you're
              presented with the best crypto exchange rates by comparing
              multiple offers from reliable exchanges. We provide key details
              such as fees, transaction times, and user ratings to help you
              choose the most favorable deal for your crypto coin swap. You can
              further choose between fixed-rate and floating-rate options,
              depending on whether you want to lock in a rate or take advantage
              of potential price fluctuations. This flexibility makes CoinoSwap
              a great tool for anyone looking to perform a crypto swap or buy
              with confidence.
            </div>
          </div>

          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#fee"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Are There Any Hidden Fees When Using CoinoSwap?
          </button>
          <div class="collapse faq-home-desc" id="fee">
            <div class="card card-body">
              No, CoinoSwap does not charge any hidden fees. All fees are set by
              the crypto exchange partners we work with and are included in the
              rates displayed on our platform. This means you can trust that the
              price you see is the price you'll pay for your crypto coin swap.
            </div>
          </div>

          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#time"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            How Long Does It Take to Complete a Swap?
          </button>
          <div class="collapse faq-home-desc" id="time">
            <div class="card card-body">
              The time it takes to complete your crypto swap varies depending on
              the exchange and the network speed of the cryptocurrencies being
              swapped. On average, a crypto instant exchange via CoinoSwap can
              be completed in as little as 5 minutes. We also display the ETA
              (estimated time of arrival) for each offer, so you know what to
              expect before you confirm your trade.
            </div>
          </div>

          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#how-do"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            How Do I Choose the Right Crypto Exchange on CoinoSwap?
          </button>
          <div class="collapse faq-home-desc" id="how-do">
            <div class="card card-body">
              CoinoSwap displays multiple exchange offers for your chosen crypto
              swap, allowing you to compare based on a range of factors:
              <ul>
                <li>
                  Transaction Fees: Look for exchanges with the lowest fees to
                  get the best deal on your trade.
                </li>
                <li>
                  ETA (Estimated Time of Arrival): If speed is important, choose
                  exchanges with the fastest transaction times.
                </li>
                <li>
                  Reviews & Ratings: User feedback helps you make informed
                  decisions. Exchanges with higher ratings tend to offer better
                  experiences.
                </li>
                <li>
                  Best Rate Tag: The exchange offering the most favorable rate
                  for your crypto coin swap will be tagged with the 'Best Rate'
                  label.
                </li>
              </ul>
            </div>
          </div>

          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#what-crypto"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            What Cryptocurrencies Can I Swap on CoinoSwap?
          </button>
          <div class="collapse faq-home-desc" id="what-crypto">
            <div class="card card-body">
              CoinoSwap supports over 1000 cryptocurrencies, ensuring you have
              access to a wide range of options for your crypto coin swap.
              Whether you're trading popular tokens or niche coins, you can find
              them all with our platform. From Bitcoin (BTC) to Ethereum (ETH),
              and many altcoins in between, CoinoSwap helps you swap crypto
              instantly at the best available rates.
            </div>
          </div>

          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#is-coinoswap"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Is CoinoSwap Secure?
          </button>
          <div class="collapse faq-home-desc" id="is-coinoswap">
            <div class="card card-body">
              Yes, CoinoSwap prioritizes your security. We only work with crypto
              exchange providers that are reputable and secure. Additionally,
              our platform is non-custodial, meaning your funds are never held
              by us, reducing the risk of theft or loss. You always remain in
              control of your assets during every instant crypto exchange
              transaction.
            </div>
          </div>

          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#how-do-i"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            How Do I Start a Crypto Swap on CoinoSwap?
          </button>
          <div class="collapse faq-home-desc" id="how-do-i">
            <div class="card card-body">
              Starting a crypto swap on CoinoSwap is easy. Just follow these
              steps:
              <ol type="1">
                <li>
                  Select the cryptocurrencies and enter the amount you want to
                  exchange.
                </li>
                <li>
                  Compare the rates from various crypto exchanges to find the
                  best deal.
                </li>
                <li>Provide the wallet address for the receiving crypto.</li>
                <li>
                  Confirm the transaction, and your crypto instant exchange will
                  be processed.
                </li>
              </ol>
            </div>
          </div>

          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#can-use"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Can I Use CoinoSwap on My Website?
          </button>
          <div class="collapse faq-home-desc" id="can-use">
            <div class="card card-body">
              Yes! CoinoSwap offers an Instant Crypto Exchange Aggregator Widget
              that you can integrate into your platform. This allows your users
              to perform crypto swaps at the best market rates directly on your
              site. By embedding this widget, you can provide a seamless instant
              crypto exchange experience, attract more users, and enhance the
              value of your platform.
            </div>
          </div>

          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#how-are"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            How Are the Rates Determined?
          </button>
          <div class="collapse faq-home-desc" id="how-are">
            <div class="card card-body">
              Rates are sourced from multiple crypto exchanges and compared in
              real-time to ensure you get the most up-to-date and competitive
              offers. We analyze parameters like price, transaction speed, and
              user feedback, so you can select the offer that best suits your
              needs. Whether you prefer fixed-rate or floating-rate options,
              CoinoSwap gives you the flexibility to choose how you want to
              trade.
            </div>
          </div>
        </div>

        <div
          className="partners-slider"
          style={{ marginTop: "6.5%", marginLeft: "15%", marginRight: "15%" }}
        >
          <h3 className="why-coinoswap-heading">Join Our Partners</h3>

          <Swiper
            style={{ marginTop: "2.8%" }}
            slidesPerView={screenWidth > 993 ? 6 : 2}
            spaceBetween={30}
            freeMode={true}
            autoplay={{
              delay: 2600,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={godex}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={changelly}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={stealthex}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={easybit}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={changenow}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={changehero}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={simpleswap}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={exolix}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={letsexchange}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={changehero}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={changelly}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={stealthex}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={godex}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={simpleswap}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={changenow}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={letsexchange}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={exolix}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: imageHeight,
                }}
              >
                <img
                  src={easybit}
                  className="slider-img"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Home;
