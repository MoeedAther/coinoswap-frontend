import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import changenow from "../images/ChangeNow Offer.png";
import changelly from "../images/changelly_offer.png";
import simpleswap from "../images/SimpleSwap Offer.png";
import changehero from "../images/Change Hero Offer.png";
import easybit from "../images/svg/Easybit_Offer.svg";
import letsexchange from "../images/LetsExchange Offer.png";
import stealthex from "../images/Stealthex Offer.png";
import godex from "../images/Godex Offers.png";
import exolix from "../images/Exolix Offer.png";
import changenow_black from "../images/changenow.png";
import changelly_black from "../images/changelly.png";
import changehero_black from "../images/changehero.png";
import exolix_black from "../images/exolix.png";
import godex_black from "../images/godex.png";
import letsexchange_black from "../images/letsexchange.png";
import simpleswap_black from "../images/simpleswap.png";
import stealthex_black from "../images/stealthex.png";
import easybit_black from "../images/svg/Easybit.svg";
import green from "../images/Not Required.png";
import yellow from "../images/On Occassion.png";
import red from "../images/Required.png";
import darkgreen from "../images/Rarely Required.png";
import rate from "../images/Rate.png";
import fourstars from "../images/fourstars.png";
import threestars from "../images/threestars.png";
import trustpilot from "../images/Trustpilot Rating Logo.png";
import swapicon from "../images/swapicon.png";
import etaicon from "../images/ETA Icon.png";

const Offer = (props) => {
  //Navigate Hook
  const navigate = useNavigate();

  function formatCharsToSpecificLength(input, length) {
    // Step 1: Convert to string if it's a number
    let value = typeof input === "number" ? input.toString() : input;

    // Step 2: Trim the string to a maximum of length characters (including decimal point)
    value = value.slice(0, length);

    return value;
  }

  return (
    <>
      <div
        className={`offer-div animate__animated ${props.elementMovementClass}`}
        style={{
          marginBottom: "18px",
          backgroundColor: props.index == "0" ? "#F9D288" : "white",
          position: "relative",
          display:
            props.offerTypeVisibility === true && props.type === "Floating"
              ? "none"
              : "block",
        }}
      >
        <div className="offer-top">
          <div className="offerlogo-offertype">
            {/* Offer Exchange Logo */}
            <div className="offer_logo d-flex">
              <img
                src={
                  props.name == "changenow"
                    ? changenow
                    : props.name == "changelly"
                    ? changelly
                    : props.name == "simpleswap"
                    ? simpleswap
                    : props.name == "simpleswap"
                    ? simpleswap
                    : props.name == "changehero"
                    ? changehero
                    : props.name == "letsexchange"
                    ? letsexchange
                    : props.name == "stealthex"
                    ? stealthex
                    : props.name == "godex"
                    ? godex
                    : props.name === "easybit"
                    ? easybit
                    : exolix
                }
                className="img-fluid"
              ></img>
            </div>

            {/* Offer Type Fixed or Float */}
            <div className="offer-type">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "40px",
                  marginRight: "6px",
                  fontSize: "0.7rem",
                  fontWeight: "600",
                }}
              >
                Rate Type:
              </div>
              <div
                className="offer-type-div"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "0.7rem",
                }}
              >
                {props.type}
              </div>
            </div>
          </div>
          <div className="eta-kyc">
            {/* ETA Time */}
            <div className="eta-time-div">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "6px",
                  fontSize: "0.7rem",
                  fontWeight: "600",
                }}
              >
                ETA:
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "18px",
                  marginRight: "6px",
                }}
              >
                <img src={etaicon} className="img-fluid"></img>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  color: "#EE3207",
                  fontSize: "0.7rem",
                }}
              >
                {props.eta}
              </div>
            </div>

            {/* KYC */}
            <div className="kyc-div">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "0.7rem",
                  fontWeight: "600",
                }}
              >
                KYC:
              </div>
              <div className="vh-center kyc-circle">
                <img
                  className="img-fluid"
                  src={
                    props.kyc === "Rarely Required"
                      ? green
                      : props.kyc === "On Occasion"
                      ? yellow
                      : props.kyc === "Not Required"
                      ? darkgreen
                      : red
                  }
                ></img>
              </div>
              <div
                className="basement-font"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "0.7rem",
                }}
              >
                {props.kyc}
              </div>
            </div>
          </div>
        </div>
        <div
          className="row offer-bottom"
          style={{
            backgroundColor: "black",
            margin: "0px 0.2px",
            borderRadius: "20px",
            alignItems: "center",
          }}
        >
          <div className="col-6 col-xl-4">
            <div className="rate-img">
              <img
                className="img-fluid"
                src={rate}
                style={{ width: "80px" }}
              ></img>
            </div>
            <div
              className="basement-font offer-rate-txt"
              id={
                props.limitType === "deposit_below_range" ||
                props.limitType === "deposit_above_range"
                  ? "thumb-cursor"
                  : ""
              }
              onClick={() => {
                if (props.limitType === "deposit_below_range") {
                  props.setMin(formatCharsToSpecificLength(props.min, 15));
                } else if (props.limitType === "deposit_above_range") {
                  props.setMin(formatCharsToSpecificLength(props.max, 15));
                }
              }}
              style={{ color: "#F0970D", fontSize: "1rem" }}
            >
              {props.limitType === "success"
                ? formatCharsToSpecificLength(props.rate, 15)
                : props.limitType === "deposit_below_range"
                ? "~min: " + formatCharsToSpecificLength(props.min, 12)
                : props.limitType === "deposit_above_range" &&
                  "~max: " + formatCharsToSpecificLength(props.max, 12)}
            </div>
          </div>
          <div
            className="col-6 col-xl-4 trustpilot-offer-component"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div>
              <div className="trustpilot-img">
                <img className="img-fluid" src={trustpilot}></img>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "75px", height: "13px", display: "flex" }}>
                  <img
                    className="img-fluid"
                    src={
                      props.rating == "4.2/5" ||
                      props.rating == "4.3/5" ||
                      props.rating == "4.5/5" ||
                      props.rating == "4.4/5" ||
                      props.rating == "4.6/5" ||
                      props.rating == "4.7/5"
                        ? fourstars
                        : threestars
                    }
                  ></img>
                </div>
                <span
                  style={{
                    color: "#928F8C",
                    marginLeft: "5px",
                    fontWeight: "bold",
                    fontSize: "0.7rem",
                  }}
                >
                  {props.rating}
                </span>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 "
            style={{ display: "flex", justifyContent: "end" }}
          >
            {/* {
                            props.dotswhilefetch?
                        } */}

            <button
              onClick={() => {
                localStorage.setItem("local_get_amount", props.rate);
                sessionStorage.setItem("local_get_amount", props.rate);
                sessionStorage.setItem("local_send_amount", props.sellAmount);
                sessionStorage.setItem("local_exchange_type", props.type);
                sessionStorage.setItem(
                  "local_exchange_logo",
                  props.name == "changenow"
                    ? changenow_black
                    : props.name == "changelly"
                    ? changelly_black
                    : props.name == "simpleswap"
                    ? simpleswap_black
                    : props.name == "simpleswap"
                    ? simpleswap_black
                    : props.name == "changehero"
                    ? changehero_black
                    : props.name == "letsexchange"
                    ? letsexchange_black
                    : props.name == "stealthex"
                    ? stealthex_black
                    : props.name == "godex"
                    ? godex_black
                    : props.name === "easybit"
                    ? easybit_black
                    : exolix_black
                );
                sessionStorage.setItem(
                  "local_exchange_logo_white",
                  props.name == "changenow"
                    ? changenow
                    : props.name == "changelly"
                    ? changelly
                    : props.name == "simpleswap"
                    ? simpleswap
                    : props.name == "simpleswap"
                    ? simpleswap
                    : props.name == "changehero"
                    ? changehero
                    : props.name == "letsexchange"
                    ? letsexchange
                    : props.name == "stealthex"
                    ? stealthex
                    : props.name == "godex"
                    ? godex
                    : exolix
                );
                sessionStorage.setItem("local_exchange_name", props.name);
                sessionStorage.setItem("local_rate_id", props.rateid);
                sessionStorage.setItem("etaTime", props.eta);
                sessionStorage.setItem("kyc", props.kyc);

                navigate(
                  `/exchange?fromCurrencySymbol=${
                    props.sellCoinTicker
                  }&fromCurrency=${props.sellCoinName}&fromCurrencyNetwork=${
                    props.sellCoinNetwork
                  }&fromCurrencyExtraIdSupported=${
                    props.sellCoinExtraIdSupported
                  }&sellAmount=${props.sellAmount}&toCurrencySymbol=${
                    props.getCoinTicker
                  }&toCurrency=${props.getCoinName}&toCurrencyNetwork=${
                    props.getCoinNetwork
                  }&toCurrencyExtraIdSupported=${
                    props.getCoinExtraIdSupported
                  }&rate=${props.rate}&partner=${props.name}&fixed=${
                    props.type
                  }&kyc=${props.kyc}&eta=${props.eta}&fromCurrencyImage=${
                    props.sellCoinImage
                  }&toCurrencyImage=${
                    props.getCoinImage
                  }&rateId=${encodeURIComponent(props.rateid)}`
                );
              }}
              className="exchange-link vh-center thumb-cursor"
              id="thumb-cursor"
              style={{
                backgroundColor: "white",
                height: "50px",
                borderRadius: "10px",
                width: "170px",
                display: props.offerED == "disable" ? "none" : "flex",
              }}
            >
              <img
                id="thumb-cursor"
                src={swapicon}
                style={{ width: "18px", marginRight: "10px" }}
              ></img>
              <span
                id="thumb-cursor"
                className="basement-font"
                style={{ color: "black", fontSize: "1rem" }}
              >
                Exchange
              </span>
            </button>

            <div
              className="dummy-exchange-link vh-center"
              style={{
                backgroundColor: "white",
                height: "50px",
                borderRadius: "10px",
                display: props.offerED == "disable" ? "flex" : "none",
              }}
            >
              <img
                src={swapicon}
                style={{ width: "18px", marginRight: "10px" }}
              ></img>
              <span
                className="basement-font"
                style={{ color: "black", fontSize: "1rem" }}
              >
                Exchange
              </span>
            </div>
          </div>
        </div>

        <div
          className="offer-type-txt"
          style={{
            width: "120px",
            backgroundColor: "#0D0D0B",
            justifyContent: "center",
            alignItems: "center",
            display: props.tagline ? "flex" : "none",
            position: "absolute",
            right: "62px",
            top: "119px",
          }}
        >
          <span
            className="basement-font"
            style={{
              color: props.index == 0 ? "#F9D288" : "white",
              fontSize: "0.8rem",
            }}
          >
            {props.tagline}
          </span>
        </div>
      </div>
    </>
  );
};

export default Offer;
