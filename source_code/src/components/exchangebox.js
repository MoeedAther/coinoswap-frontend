import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import swap_icon from "../images/swapicon.png";
import star_grey from "../images/Bullet Point Icon.png";
import star_gold from "../images/Bullet Point Icon Gold.png";
import credit_card from "../images/Credit Card Icon.png";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import CoinsDropDown from "../components/coinsdropdown.js";
import { apiUrl } from "../Js/static.js";
import {
  fetchCoin,
  formatTo15Chars,
  formatCharsToSpecificLength,
  handleScrollToElement,
} from "../Js/functions.js";

import { toast, Bounce } from "react-toastify";

const ExchangeBox = (props) => {
  const location = useLocation(); // gives you access to the current URL

  // Parse query parameters from URL
  const searchParams = new URLSearchParams(location.search);

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

  let coinObject = {
    sellCurrencyShortName: decodeURIComponent(searchParams.get("from")),
    getCurrencyShortName: decodeURIComponent(searchParams.get("to")),
    sellCurrencyNetwork: decodeURIComponent(searchParams.get("fromNetwork")),
    getCurrencyNetwork: decodeURIComponent(searchParams.get("toNetwork")),
    sellAmount: decodeURIComponent(searchParams.get("sellAmount")),
    direction: decodeURIComponent(searchParams.get("direction")),
  };

  //Navigate Hook
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const [senddropvisibility, setSendDropVisibility] = useState(false);
  const [getdropvisibility, setGetDropVisibility] = useState(false);
  const [loadingdots, setLoadingDots] = useState(false);
  const [exchangetab, setExchangeTab] = useState(true);
  const [buytab, setBuyTab] = useState(false);
  const [minamount, setMinAmount] = useState(0);
  const [estimatedAmount, setestimatedAmount] = useState("0.0");
  const [offerArray, setOfferArray] = useState([]);
  const [timerTrigger, setTimerTrigger] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [timeCompletionTriger, setTimeCompletionTriger] = useState(false);
  const [higherMinimum, setHigherMinimum] = useState(0);

  // This function takes selected coin and coin type accordinly and storing in sendCoinObj| getCoinObj
  function storeCoinObj(coin, type) {
    storeCoinBatch(0, "");

    if (type === "sendCoin") {
      storeSendCoinObject(coin);

      // Cosing Send dropdown
      setSendDropVisibility(false);
    } else {
      storeGetCoinObject(coin);

      // Cosing Send dropdown
      setGetDropVisibility(false);
    }
  }

  // Offer sequence type
  const [offerSequenceType, setOfferSequenceType] = useState("Best Rate");

  // This fuction allows to reset timer and then either start or stop timer
  function timerStartStopFun(runVal) {
    setIsActive((prev) => !prev);
    setTimerTrigger(runVal);
  }

  //  This function triggers offers api call on call
  function offerIntervalBaseRefreshFun() {
    setTimeCompletionTriger((prev) => !prev);
  }

  //Move to offers page
  const goToNavigatePage = () => {
    if (!loadingdots) {
      navigate("/best_crypto_to_crypto_exchange");
    }
  };

  const fetchData = async () => {
    setOfferArray([]);
    let allOffers = [];
    timerStartStopFun(false);

    // console.log("Starting API calls...");

    // Create an array of promises for all API calls
    const promises = apiUrl.map(async (obj) => {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            sell: sendCoinObject.ticker,
            get: getCoinObject.ticker,
            amount: sendAmount,
            exchangetype: obj.type,
          }),
        };

        const response = await fetch(obj.url, options);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();

        // Check if min is not equal to zero then add only those objects in array
        if (data.rateObject.min !== 0) {
          const newOffer = { ...data, type: obj.type, source: obj.url };
          allOffers.push(newOffer);

          setOfferArray((prevOffers) => {
            let updatedOffers = [...prevOffers, newOffer];
            if (offerSequenceType === "Best Rate") {
              // Separate offers
              let giveawayOffers = updatedOffers.filter(
                (offer) =>
                  offer.rateObject.giveaway !== "no_giveaway" &&
                  offer.rateObject.exchangetype === "Floating"
              );
              let inRangeOffers = updatedOffers.filter(
                (offer) =>
                  offer.message === "success" &&
                  offer.rateObject.giveaway === "no_giveaway"
              );
              let belowRangeOffers = updatedOffers.filter(
                (offer) =>
                  offer.message === "deposit_below_range" &&
                  offer.rateObject.giveaway === "no_giveaway"
              );
              let aboveRangeOffers = updatedOffers.filter(
                (offer) =>
                  offer.message === "deposit_above_range" &&
                  offer.rateObject.giveaway === "no_giveaway"
              );

              // descending order
              inRangeOffers.sort(
                (a, b) => b.rateObject.rate - a.rateObject.rate
              );

              // accending order
              belowRangeOffers.sort(
                (a, b) => a.rateObject.higher_min - b.rateObject.higher_min
              );

              // descending order
              belowRangeOffers.sort(
                (a, b) => b.rateObject.higher_max - a.rateObject.higher_max
              );

              updatedOffers = [
                ...giveawayOffers,
                ...inRangeOffers,
                ...belowRangeOffers,
                ...aboveRangeOffers,
              ];
              allOffers = [
                ...giveawayOffers,
                ...inRangeOffers,
                ...belowRangeOffers,
                ...aboveRangeOffers,
              ];
            } else {
              // Tag line logic for Best Rating
              // **Condition 1: Move "giveaway" items to index 0**
              const giveawayItemStateIndex = updatedOffers.findIndex(
                (offer) =>
                  offer.rateObject.giveaway !== "no_giveaway" &&
                  (offer.type === "Floating" || offer.type === "Fixed")
              );

              if (giveawayItemStateIndex !== -1) {
                const [giveawayItem] = updatedOffers.splice(
                  giveawayItemStateIndex,
                  1
                );
                updatedOffers.unshift(giveawayItem);
              }

              // **Condition 1: Move "giveaway" items to index 0**
              const giveawayItemArrayIndex = allOffers.findIndex(
                (offer) =>
                  offer.rateObject.giveaway !== "no_giveaway" &&
                  (offer.type === "Floating" || offer.type === "Fixed")
              );

              if (giveawayItemArrayIndex !== -1) {
                const [giveawayItem] = allOffers.splice(
                  giveawayItemArrayIndex,
                  1
                );
                allOffers.unshift(giveawayItem);
              }
            }
            return updatedOffers;
          });
        }

        return { status: "fulfilled", value: data };
      } catch (error) {
        return { status: "rejected", reason: error.message };
      }
    });

    // Wait for all promises to settle
    const results = await Promise.allSettled(promises);

    // console.log("All API calls completed:", allOffers);

    // Based on type of direction either getAmount is set else sendAmount is set
    storeGetAmount(
      allOffers.length > 0
        ? allOffers[0].message !== "deposit_below_range" &&
          allOffers[0].message !== "deposit_above_range"
          ? allOffers[0].rateObject.rate
          : 0
        : 0
    );
    setMinAmount(allOffers.length > 0 ? allOffers[0].rateObject.min : 0);
    setHigherMinimum(
      allOffers.length > 0 ? allOffers[0].rateObject.higher_min : 0
    );

    props.setOffersFun(allOffers);
    timerStartStopFun(true);
    setLoadingDots(false);
    // Check if array has objects
    if (allOffers.length > 0) {
      // Logic for finding index of giveaway object from array. If found return index else null
      const bestRateIndex =
        allOffers.length > 0
          ? allOffers.reduce(
              (maxIndex, offer, index, arr) =>
                offer.rateObject.rate > arr[maxIndex].rateObject.rate
                  ? index
                  : maxIndex,
              0 // Initial index
            )
          : null;

      // Logic for fing index of best rate object from array. If found return index else return null
      const result = allOffers.findIndex(
        (offer) => offer.rateObject.giveaway !== "no_giveaway"
      );
      const giveawayOfferIndex = result !== -1 ? result : null;

      // Check if selected sequence is best rate
      if (offerSequenceType === "Best Rate") {
        if (bestRateIndex !== null && giveawayOfferIndex !== null) {
          // Condition to check if array object count is greater then 1 and best rate object has higher rate then giveaway object
          if (
            allOffers.length > 1 &&
            allOffers[bestRateIndex].rateObject.rate >
              allOffers[giveawayOfferIndex].rateObject.rate &&
            bestRateIndex !== null &&
            giveawayOfferIndex !== null
          ) {
            props.setBestOfferAndGiveawayObjectFun(
              {
                name: allOffers[bestRateIndex].rateObject.name,
                type: allOffers[bestRateIndex].rateObject.exchangetype,
                tagline: offerSequenceType,
              },
              {
                name: allOffers[giveawayOfferIndex].rateObject.name,
                type: allOffers[giveawayOfferIndex].rateObject.exchangetype,
                tagline: allOffers[giveawayOfferIndex].rateObject.giveaway,
              }
            );
            // Condition to check if array object count is greater then 1 and giveaway object has rate higher then
          } else if (
            allOffers.length > 1 &&
            allOffers[bestRateIndex].rateObject.rate <=
              allOffers[giveawayOfferIndex].rateObject.rate &&
            bestRateIndex !== null &&
            giveawayOfferIndex !== null
          ) {
            props.setBestOfferAndGiveawayObjectFun(
              { name: null, type: null, tagline: null },
              {
                name: allOffers[giveawayOfferIndex].rateObject.name,
                type: allOffers[giveawayOfferIndex].rateObject.exchangetype,
                tagline: allOffers[giveawayOfferIndex].rateObject.giveaway,
              }
            );
            // Condition to check if there is only one object in an array and giveaway object is present
          } else if (
            allOffers.length === 1 &&
            bestRateIndex === giveawayOfferIndex &&
            giveawayOfferIndex !== null
          ) {
            props.setBestOfferAndGiveawayObjectFun(
              { name: null, type: null, tagline: null },
              {
                name: allOffers[giveawayOfferIndex].rateObject.name,
                type: allOffers[giveawayOfferIndex].rateObject.exchangetype,
                tagline: allOffers[giveawayOfferIndex].rateObject.giveaway,
              }
            );
          }
          // If giveaway object is not present in array
        } else {
          props.setBestOfferAndGiveawayObjectFun(
            {
              name: allOffers[bestRateIndex].rateObject.name,
              type: allOffers[bestRateIndex].rateObject.exchangetype,
              tagline: offerSequenceType,
            },
            { name: null, type: null, tagline: null }
          );
        }
        // If Array sequence is other then Best Rate
      } else {
        // If Give away object is present in array and array sequence other then best rate
        if (giveawayOfferIndex !== null) {
          props.setBestOfferAndGiveawayObjectFun(
            { name: null, type: null, tagline: null },
            {
              name: allOffers[giveawayOfferIndex].rateObject.name,
              type: allOffers[giveawayOfferIndex].rateObject.exchangetype,
              tagline: allOffers[giveawayOfferIndex].rateObject.giveaway,
            }
          );
          // If Giveaway object is not present and array sequence other then best rate then select first object in sequence
        } else {
          props.setBestOfferAndGiveawayObjectFun(
            {
              name: allOffers[0].rateObject.name,
              type: allOffers[0].rateObject.exchangetype,
              tagline: offerSequenceType,
            },
            { name: null, type: null, tagline: null }
          );
        }
      }
    }
  };

  // This Memo function makes sure offer api is only called only first time crypto dropdown data is available
  const cryptoDataChange = useMemo(() => {
    // compute something expensive
    if (cryptoData.length > 0) {
      return true;
    } else {
      return false;
    }
  }, [cryptoData]);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setSendDropVisibility(false);
        setGetDropVisibility(false);
        storeCoinBatch(0, "");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (cryptoData.length > 0) {
      setLoadingDots(true);
      let delay = setTimeout(() => {
        if (sendAmount > 0) fetchData();
      }, 3000);

      return () => clearTimeout(delay); // Cleanup timeout
    }
  }, [
    cryptoDataChange,
    sendAmount,
    sendCoinObject,
    getCoinObject,
    timeCompletionTriger,
  ]);

  // useEffect responsible for moving home page at the top incase sendcoin or getcoin changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [sendCoinObject, getCoinObject]);

  // This useEffect checks if sendCoin identifier is sent in url then fetch coin object from api and set coin objects
  useEffect(() => {
    (async () => {
      let sellCoinBool = false;
      let getCoinBool = false;

      if (
        coinObject.sellCurrencyShortName !== "null" &&
        coinObject.sellCurrencyShortName !== "undefined" &&
        coinObject.sellCurrencyNetwork !== "null" &&
        coinObject.sellCurrencyNetwork !== "undefined" &&
        coinObject.sellAmount !== "null" &&
        coinObject.sellAmount !== "undefined" &&
        coinObject.direction !== "null" &&
        coinObject.direction !== "undefined"
      ) {
        sellCoinBool = true;
      }

      if (
        coinObject.getCurrencyShortName !== "null" &&
        coinObject.getCurrencyShortName !== "undefined" &&
        coinObject.getCurrencyNetwork !== "null" &&
        coinObject.getCurrencyNetwork !== "undefined" &&
        coinObject.sellAmount !== "null" &&
        coinObject.sellAmount !== "undefined" &&
        coinObject.direction !== "null" &&
        coinObject.direction !== "undefined"
      ) {
        getCoinBool = true;
      }

      if (sellCoinBool && getCoinBool) {
        try {
          let sellCoinObj = (
            await fetchCoin({
              name: coinObject.sellCurrencyShortName,
              network: coinObject.sellCurrencyNetwork,
            })
          ).result;
          let getCoinObj = (
            await fetchCoin({
              name: coinObject.getCurrencyShortName,
              network: coinObject.getCurrencyNetwork,
            })
          ).result;

          if (sellCoinObj && getCoinObj) {
            storeSendCoinObject(sellCoinObj);
            storeGetCoinObject(getCoinObj);
            storeSendAmount(coinObject.sellAmount);
          }
        } catch (error) {
          const customMessage =
            error?.response?.data?.message ||
            error.message ||
            "Something went wrong";

          toast.error(customMessage, {
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
      } else if (sellCoinBool && !getCoinBool) {
        try {
          let sellCoinObj = (
            await fetchCoin({
              name: coinObject.sellCurrencyShortName,
              network: coinObject.sellCurrencyNetwork,
            })
          ).result;

          if (sellCoinObj) {
            storeSendCoinObject(sellCoinObj);
            storeSendAmount(coinObject.sellAmount);
          }
        } catch (error) {
          const customMessage =
            error?.response?.data?.message ||
            error.message ||
            "Something went wrong";

          toast.error(customMessage, {
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
    })();
  }, [coinObject.sellCurrencyShortName, coinObject.getCurrencyShortName]);

  const swapcrypto = () => {
    setestimatedAmount("0.0");
    storeSendCoinObject(getCoinObject);
    storeGetCoinObject(sendCoinObject);
  };

  return (
    <>
      <div className="exchangebox-size-adjust">
        <div className="exchange-box-div">
          <div>
            <div>Available Soon</div>
          </div>
          <div className="exchange-box-tab">
            <button
              type="button"
              className="btn  exchange-box-tab-exchange"
              style={{
                backgroundColor: exchangetab ? "black" : "#E3E1DE",
                color: exchangetab ? "#E3E1DE" : "black",
              }}
              onClick={() => {
                setExchangeTab(true);
                setBuyTab(false);
              }}
            >
              Exchange Crypto
            </button>
            <a
              className="btn  exchange-box-tab-buy"
              href="https://widget.finchpay.io/?a=30&p=EUR&c=ETH&partner_id=883cd1311926dbbee28c99b67aedf0e43b365018"
              target="_blank"
              style={{
                backgroundColor: buytab ? "black" : "#E3E1DE",
                color: buytab ? "#E3E1DE" : "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                Buy/Sell Crypto
                <img src={credit_card} className="card_icon"></img>
              </div>
            </a>
          </div>
          <div className="exchange-inputs-div">
            <div
              className="exchange-send-div"
              style={{
                border:
                  sendAmount < minamount
                    ? "1px solid red"
                    : "1px solid #2A2927",
              }}
            >
              {/* border:sendamount<minamount?"1px solid red":"1px solid red" */}
              {/* #2A2927 */}
              {!senddropvisibility && (
                <div style={{ display: "flex", width: "100%" }}>
                  <div className="exchange-send-div-input">
                    <div>
                      <label className="exchange-send-label">You Send:</label>
                      <input
                        type="txt"
                        className="form-control"
                        id="exchange-box-send-input"
                        aria-describedby="emailHelp"
                        value={sendAmount}
                        onChange={(e) => {
                          // Replace commas with periods in the input value
                          const modifiedValue = e.target.value.replace(
                            /,/g,
                            "."
                          );

                          // Regular expression to allow only numbers and a single decimal point
                          if (/^\d*\.?\d*$/.test(modifiedValue)) {
                            storeSendAmount(modifiedValue); // Update state only if input is valid (numbers and one decimal point)
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="exchange-send-div-input-drop">
                    <div
                      className="exchange-send-div-input-drop-box"
                      id="thumb-cursor"
                      onClick={() => {
                        setSendDropVisibility(true);
                      }}
                    >
                      <img
                        src={sendCoinObject && sendCoinObject.logo}
                        id="thumb-cursor"
                        className="send-crypto-img dont-close-send"
                        loading="lazy"
                      ></img>
                      <div
                        id="thumb-cursor"
                        className="dont-close-send currency-send-label-div"
                      >
                        <label
                          id="thumb-cursor"
                          className="dont-close-send btn-send-label"
                        >
                          {sendCoinObject &&
                            sendCoinObject.short_name &&
                            sendCoinObject.short_name.toUpperCase()}
                        </label>

                        {sendCoinObject && (
                          <div
                            className="network-div"
                            style={{
                              border: `1px solid ${sendCoinObject.network_color}`,
                              display: sendCoinObject.network_color,
                            }}
                          >
                            <span
                              style={{ color: sendCoinObject.network_color }}
                            >
                              {sendCoinObject.network.toUpperCase()}
                            </span>
                          </div>
                        )}
                        <i
                          id="thumb-cursor"
                          className="fa-solid fa-chevron-down dont-close-send fa-send"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {senddropvisibility && (
                <div className="search-box">
                  <i className="fa-solid fa-magnifying-glass search-icon"></i>
                  <input
                    type="txt"
                    className="form-control input-box"
                    value={coinSearchTerm}
                    ref={inputRef}
                    autofocus
                    placeholder="Type currency here"
                    onChange={(e) => {
                      // Logic to perform on coin search
                      storeCoinBatch(1, e.target.value);
                      handleScrollToElement("top-id");
                    }}
                  />
                </div>
              )}
            </div>
            <div style={{ position: "relative", width: "100%" }}>
              {/* FROM here Send Dropdown code starts */}
              {senddropvisibility && (
                <CoinsDropDown
                  cryptoData={cryptoData}
                  storeCoinObj={storeCoinObj}
                  storeCoinBatch={storeCoinBatch}
                  coinBatch={coinBatch}
                  type={"sendCoin"}
                  coinSearchTerm={coinSearchTerm}
                  dropdownRef={dropdownRef}
                  dropDownCoinsLoading={dropDownCoinsLoading}
                ></CoinsDropDown>
              )}
            </div>
            <div className="swap-btn-div">
              <div className="swap-btn" id="thumb-cursor" onClick={swapcrypto}>
                <img
                  src={swap_icon}
                  style={{ height: "24px" }}
                  loading="lazy"
                ></img>
              </div>
            </div>
            <div className="exchange-get-div">
              {!getdropvisibility && (
                <div style={{ display: "flex", width: "100%" }}>
                  <div className="exchange-get-div-input">
                    <div>
                      <label className="exchange-get-label">You Recieve:</label>
                      <input
                        type="txt"
                        className="form-control"
                        style={{ display: loadingdots ? "none" : "block" }}
                        id="exchange-box-get-input"
                        aria-describedby="emailHelp"
                        value={getAmount}
                      />
                      <div
                        className="dot-pulse"
                        style={{ display: loadingdots ? "block" : "none" }}
                      ></div>
                    </div>
                  </div>
                  <div className="exchange-get-div-input-drop">
                    <div
                      className="exchange-get-div-input-drop-box"
                      id="thumb-cursor"
                      onClick={() => {
                        setGetDropVisibility(true);
                      }}
                    >
                      <img
                        src={getCoinObject && getCoinObject.logo}
                        id="thumb-cursor"
                        className="get-crypto-img dont-close-send"
                        loading="lazy"
                      ></img>
                      <div id="thumb-cursor" className="currency-get-label-div">
                        <label id="thumb-cursor" className="btn-get-label">
                          {getCoinObject &&
                            getCoinObject.short_name &&
                            getCoinObject.short_name.toUpperCase()}
                        </label>
                        {getCoinObject && (
                          <div
                            className="network-div"
                            style={{
                              border: `1px solid ${getCoinObject.network_color}`,
                              display: getCoinObject.network_color,
                            }}
                          >
                            <span
                              style={{ color: getCoinObject.network_color }}
                            >
                              {getCoinObject.network.toUpperCase()}
                            </span>
                          </div>
                        )}
                        <i
                          id="thumb-cursor"
                          className="fa-solid fa-chevron-down fa-get"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {getdropvisibility && (
                <div className="search-box">
                  <i className="fa-solid fa-magnifying-glass search-icon"></i>
                  <input
                    type="txt"
                    className="form-control input-box"
                    value={coinSearchTerm}
                    ref={inputRef}
                    placeholder="Type currency here"
                    onChange={(e) => {
                      // Logic to perform on coin search
                      storeCoinBatch(1, e.target.value);
                      handleScrollToElement("top-id");
                    }}
                  />
                </div>
              )}
            </div>
            <div style={{ position: "relative", width: "100%" }}>
              {/* FROM here Get Dropdown code starts */}
              {getdropvisibility && (
                <CoinsDropDown
                  cryptoData={cryptoData}
                  storeCoinObj={storeCoinObj}
                  storeCoinBatch={storeCoinBatch}
                  coinBatch={coinBatch}
                  type={"getCoin"}
                  coinSearchTerm={coinSearchTerm}
                  dropdownRef={dropdownRef}
                  dropDownCoinsLoading={dropDownCoinsLoading}
                ></CoinsDropDown>
              )}
            </div>

            <div>
              <div className="min-estimate-div" style={{ marginLeft: "6px" }}>
                <span
                  className="min-amount"
                  id="thumb-cursor"
                  onClick={() => {
                    storeSendAmount(
                      formatCharsToSpecificLength(higherMinimum, 15)
                    );
                  }}
                >
                  <img
                    src={star_grey}
                    style={{ height: "24px" }}
                    loading="lazy"
                  ></img>
                  <label id="thumb-cursor" className="min-amount">
                    Min. Amount:{" "}
                    {formatCharsToSpecificLength(higherMinimum, 12)}
                  </label>
                </span>
                <span className="estimated-amount">
                  <img
                    src={star_gold}
                    style={{ height: "24px" }}
                    loading="lazy"
                  ></img>
                  <label className="est-amount">
                    Estimated: 1{" "}
                    {!sendCoinObject ? "" : sendCoinObject.ticker.toUpperCase()}{" "}
                    ~ {formatTo15Chars(estimatedAmount, 15)}{" "}
                    {!getCoinObject ? "" : getCoinObject.ticker.toUpperCase()}
                  </label>
                </span>
              </div>
              <button
                type="button"
                onClick={goToNavigatePage}
                className="btn offer-btn"
              >
                View Offers
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ visibility: "hidden", position: "absolute" }}>
        <CountdownCircleTimer
          key={isActive}
          isPlaying={timerTrigger}
          duration={60}
          colors={["rgba(244, 107, 12, 1)", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[5, 5, 2, 0]}
          size={40}
          strokeWidth={5}
          onComplete={() => {
            offerIntervalBaseRefreshFun();
          }}
        ></CountdownCircleTimer>
      </div>
    </>
  );
};

export default ExchangeBox;
