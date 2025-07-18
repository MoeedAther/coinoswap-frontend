import React, { useState, useEffect, useRef } from "react";
import "../css/Success.css";
import ProgressInputWalletAddress from "../components/progressInputWalletAddress.js";
import four from "../images/4.png";
import five from "../images/5.png";
import yellowline from "../images/yellow line.png";
import verticalline from "../images/vertical line.png";
import floatingicon from "../images/Floating Icon.png";
import fixedicon from "../images/Fixed Icon.png";
import { toast, Bounce } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { limitCharsInNumber } from "../Js/functions.js";
import copyicon from "../images/Copy Icon_white.png";
import success from "../images/Success Illustration.png";
// import txlink from "../images/Arrow Button.png";
import txlink from "../images/diagnal_arrow.png";
import toicon from "../images/To Icon.png";
import toIcon_vertical from "../images/To Icon_vertical.png";
import star_gold from "../images/Bullet Point Icon Gold.png";
import trustpilot_logo from "../images/Trustpilot Logo.png";
import Draggable from "react-draggable";
import changenow_black from "../images/ChangeNow Offer.png";
import changelly_black from "../images/changelly_offer.png";
import changehero_black from "../images/Change Hero Offer.png";
import exolix_black from "../images/Exolix Offer.png";
import godex_black from "../images/Godex Offers.png";
import letsexchange_black from "../images/LetsExchange Offer.png";
import simpleswap_black from "../images/SimpleSwap Offer.png";
import stealthex_black from "../images/Stealthex Offer.png";
import easybit_black from "../images/svg/Easybit_Offer.svg";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse query parameters from URL
  const searchParams = new URLSearchParams(location.search);

  let exchangeObject = {
    transactionId: decodeURIComponent(searchParams.get("transactionId")),
    transactionHash: decodeURIComponent(searchParams.get("transactionHash")),
    transactionHashLink: decodeURIComponent(
      searchParams.get("transactionHashLink")
    ),
    depositAddress: decodeURIComponent(searchParams.get("depositAddress")),
    depositExtraId:
      decodeURIComponent(searchParams.get("depositExtraId")) === "false"
        ? false
        : decodeURIComponent(searchParams.get("depositExtraId")),
    recipientAddress: decodeURIComponent(searchParams.get("recipientAddress")),
    recipientExtraId:
      decodeURIComponent(searchParams.get("recipientExtraId")) === "false"
        ? false
        : decodeURIComponent(searchParams.get("recipientExtraId")),
    refundExtraId:
      decodeURIComponent(searchParams.get("refundExtraId")) === "false"
        ? false
        : decodeURIComponent(searchParams.get("refundExtraId")),
    sellCurrencySymbol: decodeURIComponent(
      searchParams.get("fromCurrencySymbol")
    ).toUpperCase(),
    sellCurrencyName: decodeURIComponent(searchParams.get("fromCurrency")),
    sellAmount: parseFloat(decodeURIComponent(searchParams.get("sellAmount"))),
    buyCurrencySymbol: decodeURIComponent(
      searchParams.get("toCurrencySymbol")
    ).toUpperCase(),
    buyCurrencyName: decodeURIComponent(searchParams.get("toCurrency")),
    rate: parseFloat(decodeURIComponent(searchParams.get("rate"))),
    partner: decodeURIComponent(searchParams.get("partner")),
    fixed: decodeURIComponent(searchParams.get("fixed")),
    sellCurrencyImage: decodeURIComponent(
      searchParams.get("fromCurrencyImage")
    ),
    buyCurrencyImage: decodeURIComponent(searchParams.get("toCurrencyImage")),
    completionTime: decodeURIComponent(searchParams.get("completionTime")),
    completionDate: decodeURIComponent(searchParams.get("completionDate")),
    exchangeType: decodeURIComponent(searchParams.get("fixed")),
    exchangeLogoBlackBackground:
      searchParams.get("partner") == "changenow"
        ? changenow_black
        : searchParams.get("partner") == "changelly"
        ? changelly_black
        : searchParams.get("partner") == "simpleswap"
        ? simpleswap_black
        : searchParams.get("partner") == "simpleswap"
        ? simpleswap_black
        : searchParams.get("partner") == "changehero"
        ? changehero_black
        : searchParams.get("partner") == "letsexchange"
        ? letsexchange_black
        : searchParams.get("partner") == "stealthex"
        ? stealthex_black
        : searchParams.get("partner") == "godex"
        ? godex_black
        : searchParams.get("partner") === "easybit"
        ? easybit_black
        : exolix_black,
  };

  const [deposit_address_length, setDeposit_Address_Length] = useState();
  const [recipient_address_length, setRecipient_Address_Length] = useState();
  const [tx_hash_length, setTx_Hash_Length] = useState();
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [
    dragPositionRecipientWalletAddress,
    setDragPositionRecipientWalletAddress,
  ] = useState({ x: 0, y: 0 });
  const [dragDepositAddress, setDragDepositAddress] = useState({ x: 0, y: 0 });
  const [sendamount, setSendAmount] = useState(exchangeObject.sellAmount);
  const [getamount, setGetAmount] = useState(exchangeObject.rate);

  const txHashRef = useRef(null);
  const recipientWalletRef = useRef(null);
  const depositWalletRef = useRef(null);

  const handleDrag = (e, ui, setPosition, ref) => {
    const parentWidth = ref.current.parentElement.offsetWidth;
    const textWidth = ref.current.offsetWidth;
    const maxDragX = parentWidth - textWidth;

    setPosition((prevPosition) => {
      const newX = prevPosition.x + ui.deltaX;
      return {
        x: Math.min(0, Math.max(newX, maxDragX)), // Clamping the x position
        y: 0, // We are only moving in the x direction
      };
    });
  };

  const handleDragTxHash = (e, ui) =>
    handleDrag(e, ui, setDragPosition, txHashRef);
  const handleDragRecipientWallet = (e, ui) =>
    handleDrag(
      e,
      ui,
      setDragPositionRecipientWalletAddress,
      recipientWalletRef
    );
  const handleDragDepositWallet = (e, ui) =>
    handleDrag(e, ui, setDragDepositAddress, depositWalletRef);

  function limitToDecimals(num) {
    // Convert the number to a string
    let numStr = num.toString();

    // Check if the number contains a decimal point
    if (numStr.includes(".")) {
      let [integerPart, decimalPart] = numStr.split("."); // Split into integer and decimal parts

      // Only trim the decimal part if it has more than 16 digits
      if (decimalPart.length > 16) {
        decimalPart = decimalPart.slice(0, 16); // Trim to 16 digits
      }

      // Return the number combined as a string
      return `${integerPart}.${decimalPart}`;
    }

    // If no decimal part, return the original number
    return numStr;
  }

  const handleToastError = (toastErrorTime, toastErrorMessage) => {
    toast.dismiss();
    toast.error(
      <div>
        <strong>Something went wrong</strong>
        <p style={{ fontSize: "13px", color: "#888787" }}>
          {toastErrorMessage}
        </p>
      </div>,
      {
        position: "top-right",
        autoClose: toastErrorTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      }
    );
  };

  const handleToastSuccess = (toastErrorTime, toastErrorMessage) => {
    toast.dismiss();
    toast.success(
      <div>
        <strong>Success</strong>
        <p style={{ fontSize: "13px", color: "#888787" }}>
          {toastErrorMessage}
        </p>
      </div>,
      {
        position: "top-right",
        autoClose: toastErrorTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      }
    );
  };

  console.log("Test......", exchangeObject.recipientExtraId);
  useEffect(() => {
    window.scrollTo(0, 0);

    console.log(exchangeObject);

    setDeposit_Address_Length(exchangeObject.depositAddress.length);
    setRecipient_Address_Length(exchangeObject.recipientAddress.length);
    setTx_Hash_Length(exchangeObject.transactionHash.length);
    setSendAmount(limitToDecimals(exchangeObject.sellAmount));
    setGetAmount(limitToDecimals(exchangeObject.rate));
  }, []);

  function copyOrderTacker() {
    navigator.clipboard
      .writeText(exchangeObject.transactionId)
      .then(() => {
        handleToastSuccess(3000, "Order Tracker ID copied.");
      })
      .catch((err) => {
        handleToastError(3000, "Failed copying Order Tracker ID.");
      });
  }

  function copyDepositAddress() {
    navigator.clipboard
      .writeText(exchangeObject.depositAddress)
      .then(() => {
        handleToastSuccess(3000, "Deposit Address copied.");
      })
      .catch((err) => {
        handleToastError(3000, "Failed copying Deposit Address.");
      });
  }

  function copyExtraId() {
    navigator.clipboard
      .writeText(exchangeObject.recipientExtraId)
      .then(() => {
        handleToastSuccess(3000, "Recipient Destination Tag copied.");
      })
      .catch((err) => {
        handleToastError(3000, "Failed copying Recipient Destination Tag.");
      });
  }

  function copyRefundExtraId() {
    navigator.clipboard
      .writeText(exchangeObject.refundExtraId)
      .then(() => {
        handleToastSuccess(3000, "Recipient Refund Destination Tag copied.");
      })
      .catch((err) => {
        handleToastError(
          3000,
          "Failed copying Recipient Refund Destination Tag."
        );
      });
  }

  function copyRecipientAddress() {
    navigator.clipboard
      .writeText(exchangeObject.recipientAddress)
      .then(() => {
        handleToastSuccess(3000, "Recipient Address copied.");
      })
      .catch((err) => {
        handleToastError(3000, "Failed copying Recipient Address.");
      });
  }

  function copyTxHash() {
    navigator.clipboard
      .writeText(exchangeObject.transactionHash)
      .then(() => {
        handleToastSuccess(3000, "Transaction Hash copied.");
      })
      .catch((err) => {
        handleToastError(3000, "Failed copying Recipient Address.");
      });
  }

  function copyDepositExtraId() {
    navigator.clipboard
      .writeText(exchangeObject.depositExtraId)
      .then(() => {
        handleToastSuccess(3000, "Destination Tag copied.");
      })
      .catch((err) => {
        handleToastError(3000, "Failed copying Destination Tag.");
      });
  }

  return (
    <div className="success-pg">
      <ProgressInputWalletAddress
        progress={"success"}
      ></ProgressInputWalletAddress>

      <div className="success_page_information_container">
        <div className="success-text-heading">Exchange Successful!</div>
        <div className="success-btns">
          <button
            type="button"
            class="btn"
            onClick={() => {
              navigate("/best_crypto_to_crypto_exchange");
            }}
          >
            Create New Exchange
          </button>
          <a
            class="btn"
            href="https://www.trustpilot.com/evaluate/coinoswap.com"
            target="_blank"
          >
            Rate Us On <img src={trustpilot_logo}></img>
          </a>
        </div>
        <div className="completion_time_successx_page">
          <img src={star_gold}></img>
          <span>Completed Time: {exchangeObject.completionDate}</span>
          <span> {exchangeObject.completionTime} </span>
        </div>

        <div className="container-fluid tx-info-container">
          <div className="row tx-info">
            {/* You Receive */}
            <div className="you-send margin-distribution-exchange-process-top-info">
              <p>You Send:</p>
              <span>
                {limitCharsInNumber(exchangeObject.sellAmount, 12)} <br />{" "}
                {exchangeObject.sellCurrencyName}{" "}
                {exchangeObject.sellCurrencyName !==
                exchangeObject.sellCurrencySymbol ? (
                  exchangeObject.sellCurrencySymbol
                ) : (
                  <></>
                )}
              </span>
            </div>

            <div className="you-receive margin-distribution-exchange-process-top-info">
              <p>You Receive:</p>
              <span>
                {limitCharsInNumber(exchangeObject.rate, 12)} <br />{" "}
                {exchangeObject.buyCurrencyName}{" "}
                {exchangeObject.buyCurrencyName !==
                exchangeObject.buyCurrencySymbol ? (
                  exchangeObject.buyCurrencySymbol
                ) : (
                  <></>
                )}
              </span>
            </div>

            <div className="exchangeType_exchangePartner">
              <div className="ex-type margin-distribution-exchange-process-top-info">
                <p>Exchange Type:</p>
                <div className="ex-type">
                  <img
                    style={{ filter: "brightness(0%)" }}
                    src={
                      exchangeObject.exchangeType == "Floating"
                        ? floatingicon
                        : fixedicon
                    }
                  ></img>
                  <span>{exchangeObject.exchangeType}</span>
                </div>
              </div>
              <div className="ex-partner margin-distribution-exchange-process-top-info">
                <p>Exchange Partner:</p>
                <div className="partner-logo-exchange-process">
                  <img
                    src={exchangeObject.exchangeLogoBlackBackground}
                    className="img-fluid"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="dep-add-container">
            <div className="dep-add">
              <span>Deposit Address:</span>
              <div className="add-txt">
                <div className="submit_deposit_address_width_submitdeposit_page">
                  <Draggable
                    axis="x"
                    onDrag={handleDragDepositWallet}
                    position={{ x: dragDepositAddress.x, y: 0 }}
                  >
                    <span
                      ref={depositWalletRef}
                      style={{
                        cursor: "grab",
                        display: "inline-block",
                        transform: `translateX(${dragDepositAddress.x}px)`,
                      }}
                    >
                      {exchangeObject.depositAddress}
                    </span>
                  </Draggable>
                </div>
                <img
                  src={copyicon}
                  id="thumb-cursor"
                  onClick={copyDepositAddress}
                  style={{ filter: "brightness(0%)" }}
                  className="copy-icon"
                ></img>
              </div>
            </div>
            <div
              className="dest-tag"
              style={{
                display: exchangeObject.depositExtraId ? "block" : "none",
              }}
            >
              <span>Deposit Destination Tag:</span>
              <div className="dest-tag-txt">
                <span>{exchangeObject.depositExtraId}</span>
                <img
                  src={copyicon}
                  id="thumb-cursor"
                  onClick={copyDepositExtraId}
                  style={{ filter: "brightness(0%)" }}
                  className="copy-icon"
                ></img>
              </div>
            </div>
          </div>
          <div className="recp-add-container">
            <div className="recp-add">
              <span>Recipient Address:</span>
              <div className="resp-add-txt">
                <div className="recipient_address_submit_width_submitdeposit_page">
                  <Draggable
                    axis="x"
                    onDrag={handleDragRecipientWallet}
                    position={{ x: dragPositionRecipientWalletAddress.x, y: 0 }}
                  >
                    <span
                      ref={recipientWalletRef}
                      style={{
                        cursor: "grab",
                        display: "inline-block",
                        transform: `translateX(${dragPositionRecipientWalletAddress.x}px)`,
                      }}
                    >
                      {exchangeObject.recipientAddress}
                    </span>
                  </Draggable>
                </div>
                <img
                  src={copyicon}
                  id="thumb-cursor"
                  style={{ filter: "brightness(0%)" }}
                  onClick={copyRecipientAddress}
                  className="copy-icon"
                ></img>
              </div>
            </div>
            <div
              className="recp-destination-tag"
              style={{
                display: exchangeObject.recipientExtraId ? "block" : "none",
              }}
            >
              <span>Recipient Destination Tag:</span>
              <div className="recp-tag-txt">
                <span>{exchangeObject.recipientExtraId}</span>
                <img
                  src={copyicon}
                  id="thumb-cursor"
                  onClick={copyExtraId}
                  style={{ filter: "brightness(0%)" }}
                  className="copy-icon"
                ></img>
              </div>
            </div>

            <div className="order-tx-id">
              <span>Order Tracker ID:</span>
              <div className="order-tx-id-txt">
                <span>
                  {exchangeObject.transactionId}
                  <img
                    src={copyicon}
                    id="thumb-cursor"
                    onClick={copyOrderTacker}
                    style={{ filter: "brightness(0%)" }}
                    className="copy-icon"
                  ></img>
                </span>
              </div>
            </div>

            <div className="tx-hash">
              <span>Blockchain TX Hash:</span>
              <div className="tx-hash-container">
                <div className="tx_hash_width">
                  <Draggable
                    axis="x"
                    onDrag={handleDragRecipientWallet}
                    position={{ x: dragPositionRecipientWalletAddress.x, y: 0 }}
                  >
                    <span
                      ref={recipientWalletRef}
                      style={{
                        cursor: "grab",
                        display: "inline-block",
                        transform: `translateX(${dragPositionRecipientWalletAddress.x}px)`,
                      }}
                    >
                      {exchangeObject.transactionHash}
                    </span>
                  </Draggable>
                </div>
                <div className="tx_hash_link_btn">
                  <img
                    src={copyicon}
                    id="thumb-cursor"
                    onClick={copyTxHash}
                    style={{ filter: "brightness(0%)" }}
                    className="copy-icon tx-hash-link-success-page"
                  ></img>
                  <a
                    id="thumb-cursor"
                    href={exchangeObject.transactionHashLink}
                    target="_blank"
                  >
                    <i
                      class="fa-solid fa-square-up-right"
                      style={{ color: "#080808" }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="row submit_uols" style={{ paddingRight: "60px" }}>
              <ul className="submit-ul">
                <li className="submit-li">
                  Please Note The Exchange Times Depend On How Fast The Network
                  Confirms The Transaction And Generates A New Block On The
                  Blockchain Network. Keep In Mind That Different Coins Have
                  Different Confirmation Times.
                </li>
              </ul>
              <div className="recommendation">
                <span>
                  * It Is Recommended To Retain Your Order Tracker ID Until The
                  Completion Of The Swap. Should You Have Any Queries, Please Do
                  Not Hesitate To Reach Out To Your Support Team.{" "}
                  <a
                    href="mailto:support@coinoswap.com"
                    target="_blank"
                    style={{ color: "rgb(239, 150, 15)" }}
                  >
                    support@coinoswap.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="recipient-input-how-to">
        <span>How To Swap Crypto</span>
        <span>
          Coinoswap Is A Non-Custodial Crypto Exchange Aggregator Providing{" "}
        </span>
        <span>Convenient And Speedy Exchanges To Swap Pairs.</span>
      </div>
      <div className="three-and-four-step">
        <div>
          <img src={four}></img>
          <div>
            <span>Step 4</span>
            <span>Send The Required Deposit</span>
            <span>To The Designated</span>
            <span>Address</span>
          </div>
        </div>
        <div>
          <img className="img-fluid horizontal_line" src={yellowline}></img>
          <img
            className="img-fluid vertical_line"
            src={verticalline}
            style={{ display: "none" }}
          ></img>
        </div>
        <div>
          <img src={five}></img>
          <div>
            <span>Step 5</span>
            <span>Wait Until Your Swap</span>
            <span>Is Successfully</span>
            <span>Completed.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
