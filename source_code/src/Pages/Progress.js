import React, { useState, useEffect, useRef } from "react";
import "../css/progress.css";
import ProgressInputWalletAddress from "../components/progressInputWalletAddress.js";
import greydashedline from "../images/grey dashed line.png";
import guideicon from "../images/Guide Icon.png";
import three from "../images/3.png";
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
import Draggable from "react-draggable";
import changenow_black from "../images/ChangeNow Offer.png";
import changelly_black from "../images/changelly_offer.png";
import changehero_black from "../images/Change Hero Offer.png";
import exolix_black from "../images/Exolix Offer.png";
import godex_black from "../images/Godex Offers.png";
import letsexchange_black from "../images/LetsExchange Offer.png";
import simpleswap_black from "../images/SimpleSwap Offer.png";
import stealthex_black from "../images/Stealthex Offer.png";
import easybit_white from "../images/svg/Easybit_Offer.svg";
import { standerdiseStatus } from "../Js/functions.js";

const Progress = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse query parameters from URL
  const searchParams = new URLSearchParams(location.search);

  let exchangeObject = {
    sellCurrencySymbol: searchParams.get("fromCurrencySymbol"),
    buyCurrencySymbol: searchParams.get("toCurrencySymbol"),
    sellCurrencyName: searchParams.get("fromCurrency").toUpperCase(),
    buyCurrencyName: searchParams.get("toCurrency").toUpperCase(),
    sellCurrencyNetwork: searchParams.get("fromCurrencyNetwork"),
    buyCurrencyNetwork: searchParams.get("toCurrencyNetwork"),
    sellAmount: parseFloat(searchParams.get("sellAmount")),
    rate: parseFloat(searchParams.get("rate")),
    partner: searchParams.get("partner"),
    sellCurrencyImage: searchParams.get("fromCurrencyImage"),
    buyCurrencyImage: searchParams.get("toCurrencyImage"),
    exchangeType: searchParams.get("fixed"),
    exchangePartner: searchParams.get("partner"),
    depositAddress: searchParams.get("depositAddress"),
    depositExtraId:
      searchParams.get("depositExtraId") === "false"
        ? false
        : searchParams.get("depositExtraId"),
    recipientAddress: searchParams.get("recipientAddress"),
    recipientExtraId:
      searchParams.get("recipientExtraId") === "false"
        ? false
        : searchParams.get("recipientExtraId"),
    refundExtraId:
      searchParams.get("refundExtraId") === "false"
        ? false
        : searchParams.get("refundExtraId"),
    transactionId: searchParams.get("transactionId"),
    timerValue: searchParams.get("timerValue"),
    depositStatus: searchParams.get("depositStatus"),
    transactionHash:
      searchParams.get("transactionHash") === "false"
        ? false
        : searchParams.get("transactionHash"),
    transactionHashLink:
      searchParams.get("transactionHashLink") === "false"
        ? false
        : searchParams.get("transactionHashLink"),
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
        ? easybit_white
        : exolix_black,
  };

  const [exchangeheading1, setExchangeHeading1] = useState("Exchange In");
  const [exchangeheading2, setExchangeHeading2] = useState("Progress");
  const [subheading1, setSubHeading1] = useState("");
  const [subheading2, setSubHeading2] = useState("");
  const [loadingdotvisibility, setLoadingDotVisibility] = useState(true);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [
    dragPositionRecipientWalletAddress,
    setDragPositionRecipientWalletAddress,
  ] = useState({ x: 0, y: 0 });
  const [dragDepositAddress, setDragDepositAddress] = useState({ x: 0, y: 0 });

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
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;

    return formattedDate;
  }

  const handleDragRecipientWallet = (e, ui) =>
    handleDrag(
      e,
      ui,
      setDragPositionRecipientWalletAddress,
      recipientWalletRef
    );
  const handleDragDepositWallet = (e, ui) =>
    handleDrag(e, ui, setDragDepositAddress, depositWalletRef);

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

  let apiInterval;
  let handeonetimeerrorstate;

  const handleOneTimeErrorState = (state) => {
    handeonetimeerrorstate = state;
  };

  const apiCall = async (url, name) => {
    apiInterval = setInterval(async () => {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: exchangeObject.transactionId,
          }),
        };
        const response = await fetch(url, options);
        const data = await response.json(response);
        const status = standerdiseStatus(data.tx.status);

        if (status === "exchanging" || status == "confirming") {
          if (status === "exchanging") {
            setExchangeHeading1("Exchange In");
            setExchangeHeading2("Progress");
            sessionStorage.setItem("txhash", data.tx.tx_hash);
            sessionStorage.setItem("txhashlink", data.tx.tx_hash_link);
            setLoadingDotVisibility(true);
          } else if (status === "confirming") {
            setExchangeHeading1("Confirming");
            setExchangeHeading2("Deposit");
            sessionStorage.setItem("txhash", data.tx.tx_hash);
            sessionStorage.setItem("txhashlink", data.tx.tx_hash_link);
            setLoadingDotVisibility(true);
          }
        } else if (status === "finished") {
          sessionStorage.setItem(
            "completionTime",
            formatCustomDate(data.tx.completion_time)
          );
          sessionStorage.setItem("txhash", data.tx.tx_hash);
          sessionStorage.setItem("txhashlink", data.tx.tx_hash_link);

          console.log("Transaction Data: ", data);
          console.log(
            "Date of transaction: ",
            formatCustomDate(data.tx.completion_time).txdate
          );

          console.log(
            "Time of transaction: ",
            formatCustomDate(data.tx.completion_time).txtime
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
            )}&depositExtraId=${encodeURIComponent(
              exchangeObject.depositExtraId
            )}&recipientExtraId=${encodeURIComponent(
              exchangeObject.recipientExtraId
            )}&refundExtraId=${encodeURIComponent(
              exchangeObject.refundExtraId
            )}  &recipientAddress=${encodeURIComponent(
              data.tx.recipient_address
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
        } else if (status === "failed") {
          setExchangeHeading1("Exchange Unsuccessful");
          setExchangeHeading2("Refunding");
          setLoadingDotVisibility(false);
        } else if (status === "refunded") {
          setExchangeHeading1("Deposit");
          setExchangeHeading2("Refunded");
          setLoadingDotVisibility(false);
        }
        handleOneTimeErrorState(false);
      } catch (error) {
        if (!handeonetimeerrorstate) {
          //Do nothing
          // handleToastError(false, "Please check your connection and try reloading the page.")
          handleOneTimeErrorState(true);
        }
      }
    }, 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    apiCall(
      process.env.REACT_APP_URL + `/tx/${exchangeObject.partner}/status`,
      exchangeObject.partner
    );

    return () => clearInterval(apiInterval);
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

  function copyRefundExtraId() {
    navigator.clipboard
      .writeText(exchangeObject.refundExtraId)
      .then(() => {
        handleToastSuccess(3000, "Refund Recipient Destination Tag copied.");
      })
      .catch((err) => {
        handleToastError(
          true,
          "Failed copying Refund Recipient Destination Tag."
        );
      });
  }

  function copyExtraId() {
    navigator.clipboard
      .writeText(exchangeObject.recipientExtraId)
      .then(() => {
        handleToastSuccess(3000, "Recipient Destination Tag copied.");
      })
      .catch((err) => {
        handleToastError(true, "Failed copying Recipient Destination Tag.");
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
        handleToastError(3000, "Failed copying Transaction Hash.");
      });
  }

  function copyDepositExtraId() {
    navigator.clipboard
      .writeText(exchangeObject.depositExtraId)
      .then(() => {
        handleToastSuccess(3000, "Deposit ExtraID copied.");
      })
      .catch((err) => {
        handleToastError(3000, "Deposit ExtraID Transaction Hash.");
      });
  }

  return (
    <>
      <ProgressInputWalletAddress
        progress={"progress"}
      ></ProgressInputWalletAddress>
      <div className="enter-address-text-div">
        <mtspan> </mtspan>
        <span>{exchangeheading1} </span>{" "}
        <span>
          {exchangeheading2}

          <div
            style={{ display: loadingdotvisibility ? "inline-block" : "none" }}
            className="progress_loader"
          ></div>
        </span>
        <span>{subheading1}</span>
        <span>{subheading2}</span>
      </div>

      <div className="prgress_page_information_container">
        <div className="container-fluid tx-info-container">
          <div className="row tx-info">
            {/* You Receive */}
            <div className="you-send margin-distribution-exchange-process-top-info">
              <p>You Send:</p>
              <span>
                {limitCharsInNumber(exchangeObject.sellAmount, 12)} <br />{" "}
                {exchangeObject.sellCurrencyName}{" "}
                {exchangeObject.sellCurrencyName !==
                exchangeObject.sellCurrencyNetwork ? (
                  exchangeObject.sellCurrencyNetwork
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
                exchangeObject.buyCurrencyNetwork ? (
                  exchangeObject.buyCurrencyNetwork
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
                  onClick={copyRefundExtraId}
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
          </div>

          <div className="row submit_uls" style={{ paddingRight: "60px" }}>
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
          <img className="img-fluid" src={yellowline}></img>
          <img className="img-fluid" src={verticalline}></img>
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
    </>
  );
};

export default Progress;
