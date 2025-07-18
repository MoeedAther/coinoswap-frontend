import React, { useState, useEffect, useRef } from "react";
import "../css/SubmitDeposit.css";
import ProgressInputWalletAddress from "../components/progressInputWalletAddress.js";
import four from "../images/4.png";
import five from "../images/5.png";
import backbtn from "../images/Back Button.png";
import yellowline from "../images/yellow line.png";
import verticalline from "../images/vertical line.png";
import floatingicon from "../images/Floating Icon.png";
import fixedicon from "../images/Fixed Icon.png";
import { toast, Bounce } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import copyicon from "../images/Copy Icon_white.png";
import Draggable from "react-draggable";
import { limitCharsInNumber } from "../Js/functions.js";
import changenow from "../images/ChangeNow Offer.png";
import changelly from "../images/changelly_offer.png";
import simpleswap from "../images/SimpleSwap Offer.png";
import changehero from "../images/Change Hero Offer.png";
import letsexchange from "../images/LetsExchange Offer.png";
import stealthex from "../images/Stealthex Offer.png";
import godex from "../images/Godex Offers.png";
import exolix from "../images/Exolix Offer.png";
import easybit from "../images/svg/Easybit_Offer.svg";
import { standerdiseStatus } from "../Js/functions.js";

const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const handleToastError = (toastErrorTime, toastErrorMessage) => {
  toast.dismiss();
  toast.error(
    <div>
      <strong>Something went wrong</strong>
      <p style={{ fontSize: "13px", color: "#888787" }}>{toastErrorMessage}</p>
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
      <p style={{ fontSize: "13px", color: "#888787" }}>{toastErrorMessage}</p>
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

const Submit = () => {
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
    sellCurrencyExtraIdSupported:
      searchParams.get("fromCurrencyExtraIdSupported") === "true"
        ? true
        : false,
    buyCurrencyExtraIdSupported:
      searchParams.get("toCurrencyExtraIdSupported") === "true" ? true : false,
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
    exchangeLogoBlackBackground:
      searchParams.get("partner") == "changenow"
        ? changenow
        : searchParams.get("partner") == "changelly"
        ? changelly
        : searchParams.get("partner") == "simpleswap"
        ? simpleswap
        : searchParams.get("partner") == "simpleswap"
        ? simpleswap
        : searchParams.get("partner") == "changehero"
        ? changehero
        : searchParams.get("partner") == "letsexchange"
        ? letsexchange
        : searchParams.get("partner") == "stealthex"
        ? stealthex
        : searchParams.get("partner") == "godex"
        ? godex
        : searchParams.get("partner") === "easybit"
        ? easybit
        : exolix,
    eta: searchParams.get("eta"),
    kyc: searchParams.get("kyc"),
    rateId: searchParams.get("rateId"),
    fromPage: searchParams.get("fromPage"),
  };

  const initialSessionValue = parseInt(exchangeObject.timerValue);
  const [isRunning, setIsRunning] = useState(initialSessionValue === 1);
  const [timerseconds, setTimerSeconds] = useState("00:00:00");
  const [futuretime, setFutureTime] = useState();
  const [isfuturetimeused, setIsFutureTimeUsed] = useState(false);
  const [headingwhite, setHeadingWhite] = useState(
    exchangeObject.depositStatus == 1 ? "Scan To" : "Deposit Time"
  );
  const [headingyellow, setHeadingYellow] = useState(
    exchangeObject.depositStatus == 1 ? "Send" : "Expired!"
  );
  const [
    dragPositionRecipientWalletAddress,
    setDragPositionRecipientWalletAddress,
  ] = useState({ x: 0, y: 0 });
  const [dragDepositAddress, setDragDepositAddress] = useState({ x: 0, y: 0 });
  const [depositaddbtn, setDepositAddBtn] = useState(true);
  const [desttagbtn, setDestTagBtn] = useState(false);
  const [barcodeVal, setBarcodeVal] = useState(exchangeObject.depositAddress);

  const depositBtnRef = useRef(null);
  const destTagBtnRef = useRef(null);

  function depositbtnfun() {
    if (!depositaddbtn) {
      setDepositAddBtn(true);
      setDestTagBtn(false);
      depositBtnRef.current.style.backgroundColor = "black";
      destTagBtnRef.current.style.backgroundColor = "rgb(227, 225, 222)";
      destTagBtnRef.current.style.color = "black";
      depositBtnRef.current.style.color = "white";
      depositBtnRef.current.style.focus = "unset";
      setBarcodeVal(exchangeObject.depositAddress);
    }
  }

  function desttagbtnfun() {
    if (!desttagbtn) {
      setDepositAddBtn(false);
      setDestTagBtn(true);
      depositBtnRef.current.style.backgroundColor = "rgb(227, 225, 222)";
      destTagBtnRef.current.style.backgroundColor = "black";
      destTagBtnRef.current.style.color = "white";
      depositBtnRef.current.style.color = "black";
      destTagBtnRef.current.style.focus = "unset";
      setBarcodeVal(exchangeObject.depositExtraId);
    }
  }

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

  function formatTo15Chars(input, length) {
    // Step 1: Convert to string if it's a number
    let value = typeof input === "number" ? input.toString() : input;

    // Step 2: Trim the string to a maximum of 15 characters (including decimal point)
    value = value.slice(0, length);

    return value;
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

  let apiInterval;
  let handeonetimeerrorstate;
  let deposittimeexpirymessageshow = false;

  const handleOneTimeErrorState = (state) => {
    handeonetimeerrorstate = state;
  };

  useEffect(() => {
    let timerInterval1;
    if (isRunning && futuretime) {
      timerInterval1 = setInterval(() => {
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        const storedTimestamp = Number(futuretime);
        if (storedTimestamp >= timestamp) {
          const seconds = Math.floor((storedTimestamp - timestamp) / 1000);
          setTimerSeconds(formatTime(seconds));
        } else {
          clearInterval(timerInterval1);
          setHeadingWhite("Deposit Time");
          setHeadingYellow("Expired!");
          sessionStorage.setItem("timerValue", 0);
          setIsRunning(false);
        }
      }, 1000);
    }
    return () => clearInterval(timerInterval1);
  }, [futuretime]);

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
        if (!isfuturetimeused) {
          setFutureTime(data.tx.expiry_time);
          setIsFutureTimeUsed(true);
        }

        const status = standerdiseStatus(data.tx.status);

        if (status === "waiting") {
          // Wait for the status to change
        } else if (status === "exchanging") {
          sessionStorage.setItem("txhash", data.tx.tx_hash);
          sessionStorage.setItem("txhashlink", data.tx.tx_link);
          navigate(
            `/progress?fromCurrency=${encodeURIComponent(
              exchangeObject.sellCurrencyName
            )}&toCurrency=${encodeURIComponent(
              exchangeObject.buyCurrencyName
            )}&fromCurrencySymbol=${encodeURIComponent(
              exchangeObject.sellCurrencySymbol
            )}&toCurrencySymbol=${encodeURIComponent(
              exchangeObject.buyCurrencySymbol
            )}&fromCurrencyNetwork=${
              exchangeObject.sellCurrencyNetwork
            }&toCurrencyNetwork=${
              exchangeObject.buyCurrencyNetwork
            }&fromCurrencyImage=${encodeURIComponent(
              exchangeObject.sellCurrencyImage
            )}&toCurrencyImage=${encodeURIComponent(
              exchangeObject.buyCurrencyImage
            )}&rate=${encodeURIComponent(
              exchangeObject.rate
            )}&partner=${encodeURIComponent(
              exchangeObject.partner
            )}&fixed=${encodeURIComponent(
              exchangeObject.exchangeType
            )}&sellAmount=${encodeURIComponent(
              exchangeObject.sellAmount
            )}&transactionId=${encodeURIComponent(
              exchangeObject.transactionId
            )}&depositAddress=${encodeURIComponent(
              exchangeObject.depositAddress
            )}&recipientAddress=${encodeURIComponent(
              exchangeObject.recipientAddress
            )}&depositExtraId=${encodeURIComponent(
              exchangeObject.depositExtraId
            )}&recipientExtraId=${encodeURIComponent(
              exchangeObject.recipientExtraId
            )}&refundExtraId=${encodeURIComponent(
              exchangeObject.refundExtraId
            )}&timerValue=${encodeURIComponent(
              exchangeObject.timerValue
            )}&depositStatus=${encodeURIComponent(
              exchangeObject.depositStatus
            )}&transactionHash=${
              data.tx.tx_hash ? data.tx.tx_hash : false
            }&transactionHashLink=${data.tx.tx_link ? data.tx.tx_link : false}`
          );
        } else if (status === "confirming") {
          sessionStorage.setItem("txhash", data.tx.tx_hash);
          sessionStorage.setItem("txhashlink", data.tx.tx_link);
          navigate(
            `/progress?fromCurrency=${encodeURIComponent(
              exchangeObject.sellCurrencyName
            )}&toCurrency=${encodeURIComponent(
              exchangeObject.buyCurrencyName
            )}&fromCurrencySymbol=${encodeURIComponent(
              exchangeObject.sellCurrencySymbol
            )}&toCurrencySymbol=${encodeURIComponent(
              exchangeObject.buyCurrencySymbol
            )}&fromCurrencyNetwork=${
              exchangeObject.sellCurrencyNetwork
            }&toCurrencyNetwork=${
              exchangeObject.buyCurrencyNetwork
            }&fromCurrencyImage=${encodeURIComponent(
              exchangeObject.sellCurrencyImage
            )}&toCurrencyImage=${encodeURIComponent(
              exchangeObject.buyCurrencyImage
            )}&rate=${encodeURIComponent(
              exchangeObject.rate
            )}&partner=${encodeURIComponent(
              exchangeObject.partner
            )}&fixed=${encodeURIComponent(
              exchangeObject.exchangeType
            )}&sellAmount=${encodeURIComponent(
              exchangeObject.sellAmount
            )}&transactionId=${encodeURIComponent(
              exchangeObject.transactionId
            )}&depositAddress=${encodeURIComponent(
              exchangeObject.depositAddress
            )}&recipientAddress=${encodeURIComponent(
              exchangeObject.recipientAddress
            )}&depositExtraId=${encodeURIComponent(
              exchangeObject.depositExtraId
            )}&recipientExtraId=${encodeURIComponent(
              exchangeObject.recipientExtraId
            )}&refundExtraId=${encodeURIComponent(
              exchangeObject.refundExtraId
            )}&timerValue=${encodeURIComponent(
              exchangeObject.timerValue
            )}&depositStatus=${encodeURIComponent(
              exchangeObject.depositStatus
            )}&transactionHash=${data.tx.tx_hash}&transactionHashLink=${
              data.tx.tx_link
            }`
          );
        } else if (status === "finished") {
          sessionStorage.setItem("txhash", data.tx.tx_hash);
          sessionStorage.setItem("txhashlink", data.tx.tx_link);
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
            )}&fromCurrencySymbol=${encodeURIComponent(
              data.tx.sell_coin
            )}&fromCurrency=${encodeURIComponent(
              data.tx.sell_coin_name
            )}&fromCurrencyNetwork=${
              exchangeObject.sellCurrencyNetwork
            }&sellAmount=${encodeURIComponent(
              data.tx.sell_amount
            )}&toCurrencySymbol=${encodeURIComponent(
              data.tx.get_coin
            )}&toCurrency=${encodeURIComponent(
              data.tx.get_coin_name
            )}&toCurrencyNetwork=${
              exchangeObject.buyCurrencyNetwork
            }&rate=${encodeURIComponent(data.tx.get_amount)}&partner=${
              data.tx.exchange_partner
            }&fixed=${encodeURIComponent(
              data.tx.transaction_type
            )}&recipientExtraId=${encodeURIComponent(
              exchangeObject.recipientExtraId
            )}&depositExtraId=${encodeURIComponent(
              exchangeObject.depositExtraId
            )}&refundExtraId=${encodeURIComponent(
              exchangeObject.refundExtraId
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
          sessionStorage.setItem("txhash", data.tx.tx_hash);
          sessionStorage.setItem("txhashlink", data.tx.tx_link);
          navigate(
            `/progress?fromCurrency=${encodeURIComponent(
              exchangeObject.sellCurrencyName
            )}&toCurrency=${encodeURIComponent(
              exchangeObject.buyCurrencyName
            )}&fromCurrencySymbol=${encodeURIComponent(
              exchangeObject.sellCurrencySymbol
            )}&toCurrencySymbol=${encodeURIComponent(
              exchangeObject.buyCurrencySymbol
            )}&fromCurrencyNetwork=${
              exchangeObject.sellCurrencyNetwork
            }&toCurrencyNetwork=${
              exchangeObject.buyCurrencyNetwork
            }&fromCurrencyImage=${encodeURIComponent(
              exchangeObject.sellCurrencyImage
            )}&toCurrencyImage=${encodeURIComponent(
              exchangeObject.buyCurrencyImage
            )}&rate=${encodeURIComponent(
              exchangeObject.rate
            )}&partner=${encodeURIComponent(
              exchangeObject.partner
            )}&fixed=${encodeURIComponent(
              exchangeObject.exchangeType
            )}&sellAmount=${encodeURIComponent(
              exchangeObject.sellAmount
            )}&transactionId=${encodeURIComponent(
              exchangeObject.transactionId
            )}&depositAddress=${encodeURIComponent(
              exchangeObject.depositAddress
            )}&recipientAddress=${encodeURIComponent(
              exchangeObject.recipientAddress
            )}&depositExtraId=${encodeURIComponent(
              exchangeObject.depositExtraId
            )}&recipientExtraId=${encodeURIComponent(
              exchangeObject.recipientExtraId
            )}&refundExtraId=${encodeURIComponent(
              exchangeObject.refundExtraId
            )}&timerValue=${encodeURIComponent(
              exchangeObject.timerValue
            )}&depositStatus=${encodeURIComponent(
              exchangeObject.depositStatus
            )}&transactionHash=${data.tx.tx_hash}&transactionHashLink=${
              data.tx.tx_link
            }`
          );
        } else if (status === "refunded") {
          sessionStorage.setItem("txhash", data.tx.tx_hash);
          sessionStorage.setItem("txhashlink", data.tx.tx_link);
          navigate(
            `/progress?fromCurrency=${encodeURIComponent(
              exchangeObject.sellCurrencyName
            )}&toCurrency=${encodeURIComponent(
              exchangeObject.buyCurrencyName
            )}&fromCurrencySymbol=${encodeURIComponent(
              exchangeObject.sellCurrencySymbol
            )}&toCurrencySymbol=${encodeURIComponent(
              exchangeObject.buyCurrencySymbol
            )}&fromCurrencyNetwork=${
              exchangeObject.sellCurrencyNetwork
            }&toCurrencyNetwork=${
              exchangeObject.buyCurrencyNetwork
            }&fromCurrencyImage=${encodeURIComponent(
              exchangeObject.sellCurrencyImage
            )}&toCurrencyImage=${encodeURIComponent(
              exchangeObject.buyCurrencyImage
            )}&rate=${encodeURIComponent(
              exchangeObject.rate
            )}&partner=${encodeURIComponent(
              exchangeObject.partner
            )}&fixed=${encodeURIComponent(
              exchangeObject.exchangeType
            )}&sellAmount=${encodeURIComponent(
              exchangeObject.sellAmount
            )}&transactionId=${encodeURIComponent(
              exchangeObject.transactionId
            )}&depositAddress=${encodeURIComponent(
              exchangeObject.depositAddress
            )}&recipientAddress=${encodeURIComponent(
              exchangeObject.recipientAddress
            )}&depositExtraId=${encodeURIComponent(
              exchangeObject.depositExtraId
            )}&recipientExtraId=${encodeURIComponent(
              exchangeObject.recipientExtraId
            )}&refundExtraId=${encodeURIComponent(
              exchangeObject.refundExtraId
            )}&timerValue=${encodeURIComponent(
              exchangeObject.timerValue
            )}&depositStatus=${encodeURIComponent(
              exchangeObject.depositStatus
            )}&transactionHash=${data.tx.tx_hash}&transactionHashLink=${
              data.tx.tx_link
            }`
          );
        } else if (status == "overdue") {
          if (!deposittimeexpirymessageshow) {
            handleToastError(
              false,
              "Deposit time expired. Please create new exchange."
            );
          }
          deposittimeexpirymessageshow = true;
        } else {
          // Dont do anything on different status
        }
        handleOneTimeErrorState(false);
      } catch (error) {
        if (!handeonetimeerrorstate) {
          //Do nothing
          // handleToastError(false, "Please check your connection and try reloading the page.")
          // handleOneTimeErrorState(true);
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

    return () => clearInterval(apiInterval); // Cleanup on component unmount or when isRunning changes
  }, []);

  function copyOrderTacker() {
    if (isRunning) {
      navigator.clipboard
        .writeText(exchangeObject.transactionId)
        .then(() => {
          handleToastSuccess(3000, "Order Tracker ID copied.");
        })
        .catch((err) => {
          handleToastError(true, "Failed copying Order Tracker ID.");
        });
    }
  }

  function copyDepositAddress() {
    if (isRunning) {
      navigator.clipboard
        .writeText(exchangeObject.depositAddress)
        .then(() => {
          handleToastSuccess(3000, "Deposit Address copied.");
        })
        .catch((err) => {
          handleToastError(true, "Failed copying Deposit Address.");
        });
    }
  }

  function copyExtraId() {
    if (isRunning) {
      navigator.clipboard
        .writeText(exchangeObject.depositExtraId)
        .then(() => {
          handleToastSuccess(3000, "Destination Tag copied.");
        })
        .catch((err) => {
          handleToastError(true, "Failed copying Destination Tag.");
        });
    }
  }

  function copyRefundExtraId() {
    if (isRunning) {
      navigator.clipboard
        .writeText(exchangeObject.refundExtraId)
        .then(() => {
          handleToastSuccess(3000, "Recipient Refund Destination Tag copied.");
        })
        .catch((err) => {
          handleToastError(
            true,
            "Failed copying Recipient Refund Destination Tag."
          );
        });
    }
  }

  function copyExtraId() {
    if (isRunning) {
      navigator.clipboard
        .writeText(exchangeObject.recipientExtraId)
        .then(() => {
          handleToastSuccess(3000, "Recipient Destination Tag copied.");
        })
        .catch((err) => {
          handleToastError(true, "Failed copying Recipient Destination Tag.");
        });
    }
  }

  function copyRecipientAddress() {
    if (isRunning) {
      navigator.clipboard
        .writeText(exchangeObject.recipientAddress)
        .then(() => {
          handleToastSuccess(3000, "Recipient Address copied.");
        })
        .catch((err) => {
          handleToastError(true, "Failed copying Recipient Address.");
        });
    }
  }

  return (
    <>
      <ProgressInputWalletAddress
        progress={"submit"}
      ></ProgressInputWalletAddress>
      <div className="enter-address-text-div">
        <div
          id="thumb-cursor"
          onClick={() => {
            exchangeObject.fromPage === "deposit"
              ? navigate(
                  `/exchange?fromCurrencySymbol=${exchangeObject.sellCurrencySymbol}&fromCurrency=${exchangeObject.sellCurrencyName}&fromCurrencyNetwork=${exchangeObject.sellCurrencyNetwork}&fromCurrencyExtraIdSupported=${exchangeObject.sellCurrencyExtraIdSupported}&toCurrencyExtraIdSupported=${exchangeObject.buyCurrencyExtraIdSupported}&sellAmount=${exchangeObject.sellAmount}&toCurrencySymbol=${exchangeObject.buyCurrencySymbol}&toCurrency=${exchangeObject.buyCurrencyName}&toCurrencyNetwork=${exchangeObject.buyCurrencyNetwork}&toCurrencyExtraIdSupported=${exchangeObject.buyCurrencyExtraIdSupported}&rate=${exchangeObject.rate}&partner=${exchangeObject.partner}&fixed=${exchangeObject.exchangeType}&kyc=${exchangeObject.kyc}&eta=${exchangeObject.eta}&fromCurrencyImage=${exchangeObject.sellCurrencyImage}&toCurrencyImage=${exchangeObject.buyCurrencyImage}&rateId=${exchangeObject.rateId}`
                )
              : navigate("/");
          }}
        >
          <img className="img-fluid" src={backbtn}></img>
        </div>
        <span>{headingwhite} </span>
        <span>{headingyellow}</span>
        <span>
          Scan The QR Code Below Or Copy The Deposit Address And{" "}
          <span
            style={{
              color: "red",
              display: exchangeObject.depositExtraId ? "inline-block" : "none",
            }}
          >
            Deposit Destination Tag
          </span>{" "}
          <span
            style={{
              display: exchangeObject.depositExtraId ? "inline-block" : "none",
            }}
          >
            And
          </span>{" "}
          Send{" "}
          <span style={{ color: "white" }}>{exchangeObject.sellAmount} </span>{" "}
          <img
            className="img-fluid send-coin-logo-submit-deposit"
            src={exchangeObject.sellCurrencyImage}
          ></img>{" "}
          {exchangeObject.sellCurrencyName ===
          exchangeObject.sellCurrencyNetwork
            ? exchangeObject.sellCurrencyName
            : exchangeObject.sellCurrencyName +
              " " +
              exchangeObject.sellCurrencyNetwork}
        </span>
      </div>

      <div className="deposit-info">
        <div className="deposit-QR-container">
          <div className="deposit-QR">
            <div className="deposit-switch">
              <button
                style={{
                  width: exchangeObject.depositExtraId ? "50%" : "100%",
                }}
                ref={depositBtnRef}
                className="btn btn-primary deposit-add"
                onClick={depositbtnfun}
              >
                Deposit Address
              </button>
              <button
                style={{
                  display: exchangeObject.depositExtraId
                    ? "inline-block"
                    : "none",
                }}
                ref={destTagBtnRef}
                className="btn btn-primary destination-tag"
                onClick={desttagbtnfun}
              >
                Destination Tag
              </button>
            </div>
            <div className="QR-div">
              <QRCode
                className="QR_inner"
                value={barcodeVal}
                style={{ filter: isRunning ? "blur(0px)" : "blur(5px)" }}
              ></QRCode>
            </div>
            <div className="time-remaining">
              <p>Remaining Time:</p>
              <span>{timerseconds}</span>
            </div>
          </div>
        </div>
        <div className="tx-info-container">
          <div className="tx-info">
            {/* You Receive */}
            <div className="you-send width-distribution-exchange-process-top-info">
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

            <div className="you-receive width-distribution-exchange-process-top-info">
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
              <div className="ex-type width-distribution-exchange-process-top-info">
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
              <div className="ex-partner">
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
                id={isRunning ? "thumb-cursor" : ""}
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
            <div
              className="dest-tag-txt"
              style={{ filter: isRunning ? "blur(0px)" : "blur(3px)" }}
            >
              <span>{exchangeObject.depositExtraId}</span>
              <img
                src={copyicon}
                id={isRunning ? "thumb-cursor" : ""}
                onClick={copyExtraId}
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
                id={isRunning ? "thumb-cursor" : ""}
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
                id={isRunning ? "thumb-cursor" : ""}
                onClick={copyExtraId}
                style={{ filter: "brightness(0%)" }}
                className="copy-icon"
              ></img>
            </div>
          </div>

          <div className="order-tx-id">
            <span>Order Tracker ID:</span>
            <div className="order-tx-id-txt">
              <span style={{ filter: isRunning ? "blur(0px)" : "blur(3px)" }}>
                {exchangeObject.transactionId}
                <img
                  src={copyicon}
                  id={isRunning ? "thumb-cursor" : ""}
                  onClick={copyOrderTacker}
                  style={{ filter: "brightness(0%)" }}
                  className="copy-icon"
                ></img>
              </span>
            </div>
          </div>
        </div>

        <div
          className="row submit_uls"
          style={{ paddingRight: "60px", display: "block" }}
        >
          <ul className="submit-ul">
            <li
              className="submit-li-extraid"
              style={{
                display: exchangeObject.depositExtraId ? "list-item" : "none",
              }}
            >
              <span style={{ color: "red" }}>
                Please Note: It is important to include the Deposit Destination
                Tag to avoid the loss of your funds.
              </span>
            </li>
            <li className="submit-li">
              Kindly Send The Exact Amount To The Deposit Address.
            </li>
            <li className="submit-li">
              Your Swap Status Will Update Once The Funds Are Received.
            </li>
            <li className="submit-li">
              Swap Times Depend On Blockchain Confirmations And Network Speed.
            </li>
            <li className="submit-li">
              Keep Your Order Tracker ID Until Completion Of Your Swap.
            </li>
          </ul>
          <div className="recommendation">
            <span>
              * Questions? Feel Free To Contact{" "}
              <a
                href="mailto:support@coinoswap.com"
                style={{ color: "#EF960F" }}
                target="_blank"
              >
                support@coinoswap.com
              </a>
              .
            </span>
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
    </>
  );
};

export default Submit;
