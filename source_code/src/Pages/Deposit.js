import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/deposit.css";
import "../css/Deposit_responsive.css";
import ProgressInputWalletAddress from "../components/progressInputWalletAddress.js";
import greydashedline from "../images/grey dashed line.png";
import backbtn from "../images/Back Button.png";
import guideicon from "../images/Guide Icon.png";
import three from "../images/3.png";
import four from "../images/4.png";
import yellowline from "../images/yellow line.png";
import verticalline from "../images/vertical line.png";
import floatingicon from "../images/Floating Icon.png";
import fixedicon from "../images/Fixed Icon.png";
import etaicon from "../images/ETA Icon.png";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import green from "../images/Not Required.png";
import yellow from "../images/On Occassion.png";
import red from "../images/Required.png";
import darkgreen from "../images/Rarely Required.png";
import changenow_black from "../images/changenow.png";
import changelly_black from "../images/changelly.png";
import changehero_black from "../images/changehero.png";
import exolix_black from "../images/exolix.png";
import godex_black from "../images/godex.png";
import letsexchange_black from "../images/letsexchange.png";
import simpleswap_black from "../images/simpleswap.png";
import stealthex_black from "../images/stealthex.png";
import easybit_black from "../images/svg/Easybit.svg";

const Deposit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const apiInterval = useRef(null);

  // Parse query parameters from URL
  const searchParams = new URLSearchParams(location.search);

  let exchangeObject = {
    sellCurrencySymbol: searchParams.get("fromCurrencySymbol"),
    sellCurrencyName: searchParams.get("fromCurrency").toUpperCase(),
    sellCurrencyNetwork: searchParams.get("fromCurrencyNetwork").toUpperCase(),
    sellCurrencyExtraIdSupported:
      searchParams.get("fromCurrencyExtraIdSupported") === "true"
        ? true
        : false,
    sellAmount: parseFloat(searchParams.get("sellAmount")),
    buyCurrencySymbol: searchParams.get("toCurrencySymbol"),
    buyCurrencyName: searchParams.get("toCurrency").toUpperCase(),
    buyCurrencyNetwork: searchParams.get("toCurrencyNetwork").toUpperCase(),
    buyCurrencyExtraIdSupported:
      searchParams.get("toCurrencyExtraIdSupported") === "true" ? true : false,
    rate: parseFloat(searchParams.get("rate")),
    partner: searchParams.get("partner"),
    exchangeType: searchParams.get("fixed"),
    kyc: searchParams.get("kyc"),
    eta: searchParams.get("eta"),
    sellCurrencyImage: searchParams.get("fromCurrencyImage"),
    buyCurrencyImage: searchParams.get("toCurrencyImage"),
    rateId: decodeURIComponent(searchParams.get("rateId")),
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

  const [recipientaddress, setRecipientAddress] = useState("");
  const [refundaddress, setRefundAddress] = useState("");
  const [recipientextraid, setRecipientExtraId] = useState("");
  const [refundextraid, setRefundExtraId] = useState("");
  const [btntext, setBtnText] = useState("Proceed To Exchange");
  const [email, setEmail] = useState("");
  const [recipientaddressvalidation, setRecipientAddressValidation] =
    useState(false);
  const [recipientrefaddressvalidation, setRecipientRefaddressValidation] =
    useState(false);
  const [recipientaddressvalidationtext, setRecipientAddressValidationText] =
    useState("");
  const [
    recipientrefaddressvalidationtext,
    setRecipientRefaddressValidationText,
  ] = useState("");
  const [emailValidation, setEmailValidation] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [isCheckedValidation, setIsCheckedValidation] = useState(true);
  const [receiveAmount, setReceiveAmount] = useState(exchangeObject.rate);
  const [rateRefresh, setRateRefresh] = useState(false);
  const [rateId, setRateId] = useState(
    decodeURIComponent(searchParams.get("rateId"))
  );

  const handlePaste = async () => {
    return navigator.clipboard
      .readText()
      .then((text) => {
        return text; // Return the clipboard text
      })
      .catch((err) => {
        return ""; // Return an empty string or handle the error as needed
      });
  };

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

  function formatTo15Chars(input, length) {
    // Step 1: Convert to string if it's a number
    let value = typeof input === "number" ? input.toString() : input;

    // Step 2: Trim the string to a maximum of  characters (including decimal point)
    value = value.slice(0, length);

    return value;
  }

  const rateApiCall = async (url) => {
    setRateRefresh(true);
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sell: exchangeObject.sellCurrencySymbol,
          get: exchangeObject.buyCurrencySymbol,
          amount: exchangeObject.sellAmount,
          exchangetype: exchangeObject.exchangeType,
        }),
      };
      const response = await fetch(url, options);
      const data = await response.json(response);
      setRateRefresh(false);
      if (data.rateObject.rate > 0) {
        let rate = parseFloat(data.rateObject.rate);
        setReceiveAmount(rate.toFixed(7));
        exchangeObject.rate = rate.toFixed(7);
        exchangeObject.rateId = data.rateObject.rate_id;
        setRateId(data.rateObject.rate_id);
        sessionStorage.setItem("local_get_amount", rate.toFixed(7));
        sessionStorage.setItem("local_rate_id", data.rateObject.rate_id);
      }
    } catch (error) {
      // Dont Display error
      // console.log(error)
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    apiInterval.current = setInterval(() => {
      rateApiCall(
        process.env.REACT_APP_URL + `/${exchangeObject.partner}/new/price`
      );
    }, 15000);
    return () => clearInterval(apiInterval.current);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://easybit.com/js/en/payload-v1.1.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // console.log("Payload script loaded successfully.");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function calculateTimeStamp() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    if (exchangeObject.exchangeType == "Floating") {
      return timestamp + 1 * 60 * 60 * 1000;
    } else {
      return timestamp + 15 * 60 * 1000;
    }
  }

  //Data storage and navigation after successful exchange creation
  function dataStorageAndNavigation(
    transactionID,
    depositAddress,
    recipientAddress,
    depositExtraID,
    recipientExtraID,
    refundExtraID,
    timerValue,
    depositStatus
  ) {
    sessionStorage.setItem("ordertrackerid", transactionID);
    sessionStorage.setItem("depositaddress", depositAddress);
    sessionStorage.setItem("recipientaddress", recipientAddress);
    sessionStorage.setItem(
      "depositExtraID",
      exchangeObject.buyCurrencyExtraIdSupported
    );
    sessionStorage.setItem(
      "recipientExtraID",
      exchangeObject.sellCurrencyExtraIdSupported
    );
    sessionStorage.setItem("timerValue", timerValue);
    sessionStorage.setItem("depositstatus", depositStatus);
    navigate(
      `/submit?fromCurrency=${encodeURIComponent(
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
      )}&fromCurrencyExtraIdSupported=${
        exchangeObject.sellCurrencyExtraIdSupported
      }&toCurrencyExtraIdSupported=${
        exchangeObject.buyCurrencyExtraIdSupported
      }&rate=${encodeURIComponent(
        exchangeObject.rate
      )}&partner=${encodeURIComponent(
        exchangeObject.partner
      )}&fixed=${encodeURIComponent(
        exchangeObject.exchangeType
      )}&sellAmount=${encodeURIComponent(
        exchangeObject.sellAmount
      )}&transactionId=${encodeURIComponent(
        transactionID
      )}&depositAddress=${encodeURIComponent(
        depositAddress
      )}&recipientAddress=${encodeURIComponent(
        recipientAddress
      )}&depositExtraId=${encodeURIComponent(
        exchangeObject.sellCurrencyExtraIdSupported ? depositExtraID : false
      )}&recipientExtraId=${encodeURIComponent(
        exchangeObject.buyCurrencyExtraIdSupported ? recipientExtraID : false
      )}&refundExtraId=${encodeURIComponent(
        exchangeObject.sellCurrencyExtraIdSupported ? refundExtraID : false
      )}&kyc=${exchangeObject.kyc}&eta=${exchangeObject.eta}&rateId=${
        exchangeObject.rateId
      }&timerValue=${encodeURIComponent(
        timerValue
      )}&depositStatus=${encodeURIComponent(
        depositStatus
      )}&fromPage=${"deposit"}`
    );
  }

  async function performSwap() {
    setRecipientAddressValidation(false);
    setRecipientRefaddressValidation(false);
    setEmailValidation(true);
    setIsCheckedValidation(true);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailValidationVar = null;
    if (email == "") {
      emailValidationVar = true;
    } else {
      emailValidationVar = regex.test(email);
      setEmailValidation(regex.test(email));
    }

    // Function for creating an exchange
    const exchangeApiCall = async (url, name) => {
      if (
        !recipientaddress == "" &&
        !recipientaddress == " " &&
        !refundaddress == "" &&
        !refundaddress == " " &&
        emailValidationVar == true &&
        isChecked == true
      ) {
        try {
          const requestBody =
            name === "easybit" &&
            window.payloadHash &&
            typeof window.payloadHash.getHash === "function"
              ? {
                  sell: exchangeObject.sellCurrencySymbol,
                  get: exchangeObject.buyCurrencySymbol,
                  sellname: exchangeObject.sellCurrencyName,
                  getname: exchangeObject.buyCurrencyName,
                  sellcoinnetwork: exchangeObject.sellCurrencyNetwork,
                  getcoinnetwork: exchangeObject.buyCurrencyNetwork,
                  selllogo: exchangeObject.sellCurrencyImage,
                  getlogo: exchangeObject.buyCurrencyImage,
                  amount: exchangeObject.sellAmount,
                  recieving_Address: recipientaddress,
                  refund_Address: refundaddress,
                  email: email,
                  rateId: rateId,
                  extraid: recipientextraid,
                  refextraid: refundextraid,
                  expirytime: calculateTimeStamp(),
                  payload: window.payloadHash.getHash(),
                }
              : {
                  sell: exchangeObject.sellCurrencySymbol,
                  get: exchangeObject.buyCurrencySymbol,
                  sellname: exchangeObject.sellCurrencyName,
                  getname: exchangeObject.buyCurrencyName,
                  sellcoinnetwork: exchangeObject.sellCurrencyNetwork,
                  getcoinnetwork: exchangeObject.buyCurrencyNetwork,
                  selllogo: exchangeObject.sellCurrencyImage,
                  getlogo: exchangeObject.buyCurrencyImage,
                  amount: exchangeObject.sellAmount,
                  recieving_Address: recipientaddress,
                  refund_Address: refundaddress,
                  email: email,
                  rateId: rateId,
                  extraid: recipientextraid,
                  refextraid: refundextraid,
                  expirytime: calculateTimeStamp(),
                };

          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          };
          const response = await fetch(url, options);
          const data = await response.json(response);

          switch (name) {
            case "changelly":
              if (data.transaction_id) {
                // Deposit ExtraID is the one user will use to send the funds to coin which requires an extraid
                dataStorageAndNavigation(
                  data.transaction_id,
                  data.deposit_address,
                  data.recipient_address,
                  data.deposit_extraid,
                  data.recipient_extraid,
                  refundextraid,
                  1,
                  1
                );
              } else {
                if (
                  data.error.message ==
                  "rateId was expired or already used. Use method getFixRate to generate new rateId"
                ) {
                  handleToastError(5000, "Fixed rate expired.");
                } else if (data.error.message == "Address is not valid") {
                  handleToastError(
                    5000,
                    "Please recheck recipient and refund wallet addresses."
                  );
                }
              }
              break;

            case "changenow":
              if (data.transaction_id) {
                dataStorageAndNavigation(
                  data.transaction_id,
                  data.deposit_address,
                  data.recipient_address,
                  data.deposit_extraid,
                  data.recipient_extraid,
                  refundextraid,
                  1,
                  1
                );
              } else {
                if (data.error == "rate_id_not_found_or_expired") {
                  handleToastError(5000, "Fixed rate expired.");
                } else if (data.error == "not_valid_address") {
                  handleToastError(
                    5000,
                    "Please recheck recipient and refund wallet addresses."
                  );
                } else {
                  handleToastError(
                    false,
                    "Please check your connection and try reloading the page."
                  );
                }
              }
              break;

            case "changehero":
              if (data.transaction_id) {
                dataStorageAndNavigation(
                  data.transaction_id,
                  data.deposit_address,
                  data.recipient_address,
                  data.deposit_extraid,
                  data.recipient_extraid,
                  refundextraid,
                  1,
                  1
                );
              } else {
                if (data.error.message == "expired rate id") {
                  handleToastError(5000, "Fixed rate expired.");
                } else if (data.error.message == "Invalid address") {
                  handleToastError(
                    5000,
                    "Please recheck recipient and refund wallet addresses."
                  );
                } else {
                  handleToastError(
                    false,
                    "Please check your connection and try reloading the page."
                  );
                }
              }
              break;

            case "letsexchange":
              if (data.transaction_id) {
                dataStorageAndNavigation(
                  data.transaction_id,
                  data.deposit_address,
                  data.recipient_address,
                  data.deposit_extraid,
                  data.recipient_extraid,
                  refundextraid,
                  1,
                  1
                );
              } else {
                if (data.error == "Fixed rate timeout expired!") {
                  handleToastError(5000, "Fixed rate expired.");
                } else if (
                  data.error.validation.withdrawal ==
                  "Invalid destination address."
                ) {
                  handleToastError(
                    5000,
                    "Please recheck recipient and refund wallet addresses."
                  );
                } else {
                  handleToastError(
                    false,
                    "Please check your connection and try reloading the page."
                  );
                }
              }
              break;

            case "stealthex":
              if (data.transaction_id) {
                dataStorageAndNavigation(
                  data.transaction_id,
                  data.deposit_address,
                  data.recipient_address,
                  data.deposit_extraid,
                  data.recipient_extraid,
                  refundextraid,
                  1,
                  1
                );
              } else {
                if (
                  data.err.details == "Received expired or nonexistent rate id"
                ) {
                  handleToastError(5000, "Fixed rate expired.");
                } else if (data.err.details == "Invalid address") {
                  handleToastError(
                    5000,
                    "Please recheck recipient and refund wallet addresses."
                  );
                } else {
                  handleToastError(
                    false,
                    "Please check your connection and try reloading the page."
                  );
                }
              }
              break;

            case "godex":
              if (data.transaction_id) {
                dataStorageAndNavigation(
                  data.transaction_id,
                  data.deposit_address,
                  data.recipient_address,
                  data.deposit_extraid,
                  data.recipient_extraid,
                  refundextraid,
                  1,
                  1
                );
              } else {
                if (
                  data.validation.withdrawal[0] ==
                  "Invalid destination address."
                ) {
                  handleToastError(
                    5000,
                    "Please recheck recipient and refund wallet addresses."
                  );
                } else {
                  handleToastError(
                    false,
                    "Please check your connection and try reloading the page."
                  );
                }
              }
              break;

            case "exolix":
              if (data.transaction_id) {
                dataStorageAndNavigation(
                  data.transaction_id,
                  data.deposit_address,
                  data.recipient_address,
                  data.deposit_extraid,
                  data.recipient_extraid,
                  refundextraid,
                  1,
                  1
                );
              } else {
                if (data.error == "Invalid withdrawal address") {
                  handleToastError(
                    5000,
                    "Please recheck recipient and refund wallet addresses."
                  );
                } else {
                  handleToastError(
                    false,
                    "Please check your connection and try reloading the page."
                  );
                }
              }
              break;

            case "simpleswap":
              if (data.transaction_id) {
                dataStorageAndNavigation(
                  data.transaction_id,
                  data.deposit_address,
                  data.recipient_address,
                  data.deposit_extraid,
                  data.recipient_extraid,
                  refundextraid,
                  1,
                  1
                );
              } else {
                if (data.description == "Validation of 'address_to' failed") {
                  handleToastError(
                    5000,
                    "Please recheck recipient and refund wallet addresses."
                  );
                } else {
                  handleToastError(
                    false,
                    "Please check your connection and try reloading the page."
                  );
                }
              }
              break;

            case "easybit":
              if (data.transaction_id) {
                dataStorageAndNavigation(
                  data.transaction_id,
                  data.deposit_address,
                  data.recipient_address,
                  data.deposit_extraid,
                  data.recipient_extraid,
                  refundextraid,
                  1,
                  1
                );
              } else {
                if (
                  data.errorMessage == "Invalid address for specified network"
                ) {
                  handleToastError(
                    5000,
                    "Please recheck recipient and refund wallet addresses."
                  );
                } else {
                  handleToastError(
                    false,
                    "Please check your connection and try reloading the page."
                  );
                }
              }
              break;
          }
        } catch (error) {
          handleToastError(
            false,
            "Please check your connection and try reloading the page."
          );
        }
        setBtnText("Proceed To Exchange");
      } else {
        setBtnText("Proceed To Exchange");

        if (!isChecked) {
          setIsCheckedValidation(isChecked);
        }

        if (!emailValidationVar) {
          setEmailValidation(false);
        }

        if (recipientaddress == "" || recipientaddress == " ") {
          setRecipientAddressValidation(true);
          setRecipientAddressValidationText(
            "Recipient wallet address is required"
          );
        }
        // else{
        //     if(!recpaddress){
        //         setRecipientAddressValidation(true);
        //         setRecipientAddressValidationText("Invalid recipient wallet address");
        //     }
        // }
        if (refundaddress == "" || refundaddress == " ") {
          setRecipientRefaddressValidation(true);
          setRecipientRefaddressValidationText(
            "Refund wallet address is required"
          );
        }
        // else{
        //     if(!refaddress){
        //         setRecipientRefaddressValidation(true);
        //         setRecipientRefaddressValidationText("Invalid refund wallet address");
        //     }
        // }
      }
    };

    // Condition to check if offer is a fixed type then creating fixed transaction else floating
    if (exchangeObject.exchangeType == "Floating") {
      exchangeApiCall(
        process.env.REACT_APP_URL +
          `/createTransaction/${exchangeObject.partner}/float`,
        exchangeObject.partner
      );
    } else {
      exchangeApiCall(
        process.env.REACT_APP_URL +
          `/createTransaction/${exchangeObject.partner}/fixed`,
        exchangeObject.partner
      );
    }
  }

  return (
    <>
      <ProgressInputWalletAddress
        progress={"deposit"}
      ></ProgressInputWalletAddress>
      <div className="enter-address-text-div">
        <div
          id="thumb-cursor"
          onClick={() => {
            navigate("/best_crypto_to_crypto_exchange");
          }}
        >
          <img className="img-fluid" src={backbtn}></img>
        </div>
        <span>Enter The </span> <span>Wallet Address</span>
      </div>
      <div className="container-fluid">
        <div className="row">
          {/* Recipient Wallet Address Input Box */}
          <div className="col-12 col-lg-6">
            <div className="wallet-input-div">
              <div className="row recipient-amount-div">
                <div className="recipient-send-amount-div">
                  <span>You Send:</span>
                  <span>{formatTo15Chars(exchangeObject.sellAmount, 15)}</span>
                  <div className="recipient-send-coin-logos">
                    <img
                      className="img-fluid"
                      src={exchangeObject.sellCurrencyImage}
                    ></img>
                    <span>{exchangeObject.sellCurrencyName}</span>
                    <span
                      style={{
                        display:
                          exchangeObject.sellCurrencyName ===
                          exchangeObject.sellCurrencyNetwork
                            ? "none"
                            : "block",
                      }}
                      className="chainname-deposit-page"
                    >
                      {exchangeObject.sellCurrencyNetwork}
                    </span>
                  </div>
                </div>
                <div className="grey-line-div">
                  <img className="img-fluid" src={greydashedline}></img>
                </div>
                <div className="recipient-get-amount-div">
                  <span>You Receive:</span>
                  <span style={{ display: rateRefresh ? "none" : "block" }}>
                    {formatTo15Chars(receiveAmount, 15)}
                  </span>
                  <div
                    className="you-receive-loadingdots"
                    style={{ display: rateRefresh ? "flex" : "none" }}
                  >
                    <div className="loader"></div>
                  </div>
                  <div className="recipient-get-coin-logos">
                    <img
                      className="img-fluid"
                      src={exchangeObject.buyCurrencyImage}
                    ></img>
                    <span>{exchangeObject.buyCurrencyName}</span>
                    <span
                      style={{
                        display:
                          exchangeObject.sellCurrencyName ===
                          exchangeObject.sellCurrencyNetwork
                            ? "none"
                            : "block",
                      }}
                      className="chainname-deposit-page"
                    >
                      {exchangeObject.buyCurrencyNetwork}
                    </span>
                  </div>
                </div>
              </div>

              {/* Destination tag refers to buy coin if it requires an extra id */}
              <div className="input-wrapper">
                <label className="recipient-input-label" for="first">
                  Enter {exchangeObject.buyCurrencyName}{" "}
                  <span class="chain-name-deposit">
                    {exchangeObject.buyCurrencyName ==
                    exchangeObject.buyCurrencyNetwork
                      ? ""
                      : exchangeObject.buyCurrencyNetwork}
                  </span>{" "}
                  Address:
                </label>
                <input
                  type="text"
                  className="form-control deposit-input"
                  value={recipientaddress}
                  onChange={(e) => {
                    setRecipientAddress(e.target.value.replace(/\s+/g, ""));
                  }}
                  placeholder="Recipient Address  .  .  ."
                ></input>
                <button
                  class="btn paste-btn"
                  onClick={async () => {
                    setRecipientAddress(await handlePaste());
                  }}
                >
                  Paste
                </button>{" "}
              </div>
              <div
                className="validation-check"
                style={{
                  display: recipientaddressvalidation ? "block" : "none",
                }}
              >
                {recipientaddressvalidationtext}
              </div>
              <div
                className="input-wrapper"
                style={{
                  display: exchangeObject.buyCurrencyExtraIdSupported
                    ? "block"
                    : "none",
                }}
              >
                <label className="recipient-input-label" for="first">
                  Enter {exchangeObject.buyCurrencyName} Destination Tag
                  (Optional):
                </label>
                <input
                  type="text"
                  className="form-control deposit-input"
                  value={recipientextraid}
                  onChange={(e) => {
                    setRecipientExtraId(e.target.value.replace(/\s+/g, ""));
                  }}
                  placeholder="Destination Tag  .  .  ."
                ></input>
                <button
                  class="btn paste-btn"
                  onClick={async () => {
                    setRecipientExtraId(await handlePaste());
                  }}
                >
                  Paste
                </button>{" "}
              </div>
              <div className="input-wrapper">
                <label className="recipient-input-label" for="first">
                  Enter {exchangeObject.sellCurrencyName}{" "}
                  <span class="chain-name-deposit">
                    {exchangeObject.sellCurrencyName ==
                    exchangeObject.sellCurrencyNetwork
                      ? ""
                      : exchangeObject.sellCurrencyNetwork}
                  </span>{" "}
                  Refund Address:
                </label>
                <input
                  type="text"
                  className="form-control deposit-input"
                  value={refundaddress}
                  onChange={(e) => {
                    setRefundAddress(e.target.value.replace(/\s+/g, ""));
                  }}
                  placeholder="Refund Address  .  .  ."
                ></input>
                <button
                  class="btn paste-btn"
                  onClick={async () => {
                    setRefundAddress(await handlePaste());
                  }}
                >
                  Paste
                </button>{" "}
              </div>
              <div
                className="validation-check"
                style={{
                  display: recipientrefaddressvalidation ? "block" : "none",
                }}
              >
                {recipientrefaddressvalidationtext}
              </div>
              <div
                className="input-wrapper"
                style={{
                  display: exchangeObject.sellCurrencyExtraIdSupported
                    ? "block"
                    : "none",
                }}
              >
                <label className="recipient-input-label" for="first">
                  Enter {exchangeObject.sellCurrencyName} Recipient Destination
                  Tag (Optional):
                </label>
                <input
                  type="text"
                  className="form-control deposit-input"
                  value={refundextraid}
                  onChange={(e) => {
                    setRefundExtraId(e.target.value.replace(/\s+/g, ""));
                  }}
                  placeholder="Recipient Destination Tag  .  .  ."
                ></input>
                <button
                  class="btn paste-btn"
                  onClick={async () => {
                    setRefundExtraId(await handlePaste());
                  }}
                >
                  Paste
                </button>{" "}
              </div>
              <div className="input-wrapper">
                <label className="recipient-input-label" for="first">
                  Enter Your Email Address (Optional):
                </label>
                <input
                  type="email"
                  className="form-control deposit-input"
                  id="email-input"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email Address  .  .  ."
                ></input>
                <button
                  class="btn paste-btn"
                  onClick={async () => {
                    setEmail(await handlePaste());
                  }}
                >
                  Paste
                </button>{" "}
              </div>
              <div
                className="validation-check"
                style={{
                  display: emailValidation ? "none" : "block",
                  margin: "15px 0px",
                }}
              >
                Invalid email address
              </div>
              <div className="policy-check">
                <div>
                  <input
                    className="form-check-input custom-checkbox deposit-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    onChange={(e) => {
                      setIsChecked(e.target.checked);
                    }}
                    checked={isChecked}
                  ></input>
                </div>
                <div>
                  <span>I Have Read And Accepted The</span>
                  <span>
                    <Link
                      to="/terms_of_use"
                      style={{ color: "#f4a70c", textDecoration: "none" }}
                    >
                      {" "}
                      Terms Of Use{" "}
                    </Link>
                  </span>
                  <span> And</span>
                  <span>
                    <Link
                      to="/privacy_policy"
                      style={{ color: "#f4a70c", textDecoration: "none" }}
                    >
                      {" "}
                      Privacy Policy{" "}
                    </Link>
                  </span>
                </div>
              </div>
              <div
                className="validation-check"
                style={{
                  display: isCheckedValidation ? "none" : "block",
                  margin: "15px 0px",
                }}
              >
                Please accept terms and conditions
              </div>
              <button type="button" className="btn proceed-exchange-btn">
                <div
                  className="d-flex justify-content-center"
                  onClick={() => {
                    setBtnText("Processing");
                    performSwap();
                  }}
                >
                  <div>{btntext}</div>
                  <div
                    style={{
                      display:
                        btntext == "Proceed To Exchange" ? "none" : "block",
                    }}
                    className="loader"
                  ></div>
                </div>
              </button>
            </div>
          </div>
          <div className="col-12 col-lg-6 exchange-partner-recipient-input-div">
            <div className="row">
              <div className="exchange-partner-recipient-input">
                <span>Exchange Partner:</span>
                <img src={exchangeObject.exchangeLogoBlackBackground}></img>
              </div>
              <div className="exchange-type-recipient-input">
                <span>Exchange Type:</span>
                <div>
                  <img
                    style={{ filter: "brightness(2000%)" }}
                    src={
                      exchangeObject.exchangeType == "Floating"
                        ? floatingicon
                        : fixedicon
                    }
                  ></img>
                  <span>{exchangeObject.exchangeType}</span>
                </div>
              </div>
            </div>
            <div className="row eta-kyc-sec">
              <div className="exchange-partner-recipient-input">
                <span>ETA Time:</span>
                <div className="deposit-eta">
                  <img src={etaicon}></img>
                  <span> {exchangeObject.eta}</span>
                </div>
              </div>
              <div
                className="exchange-partner-recipient-input"
                style={{ marginLeft: "0px" }}
              >
                <span>KYC Risk:</span>
                <div className="deposit-kyc">
                  <img
                    src={
                      exchangeObject.kyc === "Rarely Required"
                        ? green
                        : exchangeObject.kyc === "On Occasion"
                        ? yellow
                        : exchangeObject.kyc === "Not Required"
                        ? darkgreen
                        : red
                    }
                  ></img>
                  <span>{exchangeObject.kyc}</span>
                </div>
              </div>
            </div>
            <div className="recipient-input-bullet-1">
              <div>
                <i className="fa-solid fa-circle"></i>
              </div>
              <div>
                <span>
                  {exchangeObject.exchangeType == "Floating"
                    ? "Floating Rates: "
                    : "Fixed Rates: "}
                </span>
                <span>
                  {exchangeObject.exchangeType == "Floating"
                    ? "You Have Selected A Floating Rate. Keep In Mind That The Final "
                    : "You Have Selected A Fixed Rate. Keep In Mind The Allocated Time "}
                </span>
                <span>
                  {exchangeObject.exchangeType == "Floating"
                    ? "Amount You Recieve May Vary Due To Fluctuations In Rates."
                    : "To Deposit The Funds. "}
                </span>
              </div>
            </div>

            <div className="recipient-input-bullet-3">
              <div>
                <i className="fa-solid fa-circle"></i>
              </div>
              <div>
                <span>
                  Kindly Send The Exact Amount To The Deposit Address.
                </span>
              </div>
            </div>

            <div className="recipient-input-bullet-7">
              <div>
                <i className="fa-solid fa-circle"></i>
              </div>
              <div>
                <span>
                  Questions? Feel Free To Contact{" "}
                  <a href="mailto:support@coinoswap.com" target="_blank">
                    support@coinoswap.com
                  </a>
                  .
                </span>
              </div>
            </div>

            <div className="guide-div">
              <div>
                <img className="img-fluid" src={guideicon}></img>
              </div>
              <div>
                <span>Not Sure How To Use Our Service, Click On</span>
                <span>
                  {" "}
                  <Link to="/how-it-works" className="howitworks-link">
                    "How It Works"
                  </Link>{" "}
                </span>
                <span>To Get A Tutorial Of The</span>
                <span>Swap Process.</span>
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
          <img src={three}></img>
          <div>
            <span>Step 3</span>
            <span>Provide The Wallet Address</span>
            <span>Where You Want To Receive</span>
            <span>Your Coins</span>
          </div>
        </div>
        <div>
          <img className="img-fluid Horizontal_line" src={yellowline}></img>
          <img
            className="img-fluid verticalLine"
            src={verticalline}
            style={{ display: "none" }}
          ></img>
        </div>
        <div>
          <img src={four}></img>
          <div>
            <span>Step 4</span>
            <span>Send The Required Deposit</span>
            <span>To The Designated</span>
            <span>Address.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposit;
