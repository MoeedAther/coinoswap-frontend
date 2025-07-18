import React, { useState, useEffect, useRef, useMemo } from "react";
import Offer from "../components/offer";
import fixedicon from "../images/Fixed Icon.png";
import floatingicon from "../images/Floating Icon.png";
import step2 from "../images/step2.png";
import step2mobileui from "../images/How To Swap Crypto.png";
import swap_icon from "../images/swapicon.png";
import credit_card from "../images/Credit Card Icon.png";
import refresh_circle from "../images/Refresh Circle.png";
import CoinsDropDown from "../components/coinsdropdown.js";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { toast, Bounce } from "react-toastify";
import { Helmet } from "react-helmet";
import { apiUrl } from "../Js/static.js";
import OffersLoading from "../components/offersLoading.js";

import {
  combinedTrueElseFalse,
  handleScrollToElement,
} from "../Js/functions.js";

const Offers = (props) => {
  const {
    cryptoData,
    offers,
    setOffersFun,
    bestOfferObjectFromHome,
    giveawayObjectFromHome,
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

  const [isActive, setIsActive] = useState(false);
  const [fixedtabcolor, setFixedTabColor] = useState("transparent");
  const [fixedtabtextcolor, setFixedTabTextColor] = useState("white");
  const [floatingtabcolor, setFloatingTabColor] = useState("white");
  const [floatingtabtextcolor, setFloatingTabTextColor] = useState("black");
  const [fixedfilter, setFixedFilter] = useState("brightness(2000%)");
  const [floatingfilter, setFloatingFilter] = useState("brightness(1%)");
  const [offerSequenceType, setOfferSequenceType] = useState("Best Rate");
  const [timerTrigger, setTimerTrigger] = useState(false);
  const [timeCompletionTriger, setTimeCompletionTriger] = useState(false);
  const [isThereAnOffer, setIsThereAnOffer] = useState(true);
  const [skeletonLoading, setSkeletonLoading] = useState(false);

  // This fuction allows to reset timer and then either start or stop timer
  function timerStartStopFun(runVal) {
    setIsActive((prev) => !prev);
    setTimerTrigger(runVal);
  }

  //  This function triggers offers api call on call
  function offerIntervalBaseRefreshFun() {
    setTimeCompletionTriger((prev) => !prev);
  }

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

  const bestratesfun = () => {
    setOfferSequenceType("Best Rate");

    let updatedOffers = offerArrayNew;
    let allOffers = offerArrayNew;

    // Separate offers
    let giveawayFloatingOffer = updatedOffers.filter(
      (offer) =>
        offer.rateObject.giveaway !== "no_giveaway" &&
        offer.rateObject.exchangetype === "Floating"
    );
    let inRangeOffers = updatedOffers.filter(
      (offer) =>
        (offer.message === "success" &&
          offer.rateObject.giveaway === "no_giveaway") ||
        (offer.message === "success" &&
          offer.rateObject.giveaway !== "no_giveaway" &&
          offer.rateObject.exchangetype === "Fixed")
    );
    let belowRangeOffers = updatedOffers.filter(
      (offer) =>
        (offer.message === "deposit_below_range" &&
          offer.rateObject.giveaway === "no_giveaway") ||
        (offer.message === "deposit_below_range" &&
          offer.rateObject.giveaway !== "no_giveaway" &&
          offer.rateObject.exchangetype === "Fixed")
    );
    let aboveRangeOffers = updatedOffers.filter(
      (offer) =>
        (offer.message === "deposit_above_range" &&
          offer.rateObject.giveaway === "no_giveaway") ||
        (offer.message === "deposit_above_range" &&
          offer.rateObject.giveaway !== "no_giveaway" &&
          offer.rateObject.exchangetype === "Fixed")
    );

    // descending order
    inRangeOffers.sort((a, b) => b.rateObject.rate - a.rateObject.rate);

    // ascending order
    belowRangeOffers.sort(
      (a, b) => a.rateObject.higher_min - b.rateObject.higher_min
    );

    // descending order
    aboveRangeOffers.sort((a, b) => b.rateObject.max - a.rateObject.max);

    updatedOffers = [
      ...giveawayFloatingOffer,
      ...inRangeOffers,
      ...belowRangeOffers,
      ...aboveRangeOffers,
    ];
    allOffers = [
      ...giveawayFloatingOffer,
      ...inRangeOffers,
      ...belowRangeOffers,
      ...aboveRangeOffers,
    ];

    setOfferArrayNew(updatedOffers);

    storeGetAmount(
      allOffers.length > 0
        ? allOffers[0].message !== "deposit_below_range" &&
          allOffers[0].message !== "deposit_above_range"
          ? allOffers[0].rateObject.rate
          : 0
        : 0
    );
    // timerStartStopFun(true);
    setLoadingDots(false);

    // Show no offers message if offer length is less
    allOffers.length > 0 ? setIsThereAnOffer(true) : setIsThereAnOffer(false);

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

      if (bestRateIndex !== null && giveawayOfferIndex !== null) {
        // Condition to check if array object count is greater then 1 and best rate object has higher rate then giveaway object
        if (
          allOffers.length > 1 &&
          allOffers[bestRateIndex].rateObject.rate >
            allOffers[giveawayOfferIndex].rateObject.rate &&
          bestRateIndex !== null &&
          giveawayOfferIndex !== null
        ) {
          setBestOfferObject({
            name: allOffers[bestRateIndex].rateObject.name,
            type: allOffers[bestRateIndex].rateObject.exchangetype,
            tagline: "Best Rate",
          });
          setGiveAwayObject({
            name: allOffers[giveawayOfferIndex].rateObject.name,
            type: allOffers[giveawayOfferIndex].rateObject.exchangetype,
            tagline: allOffers[giveawayOfferIndex].rateObject.giveaway,
          });
          // Condition to check if array object count is greater then 1 and giveaway object has rate higher then
        } else if (
          allOffers.length > 1 &&
          allOffers[bestRateIndex].rateObject.rate <=
            allOffers[giveawayOfferIndex].rateObject.rate &&
          bestRateIndex !== null &&
          giveawayOfferIndex !== null
        ) {
          setBestOfferObject({ name: null, type: null, tagline: null });
          setGiveAwayObject({
            name: allOffers[giveawayOfferIndex].rateObject.name,
            type: allOffers[giveawayOfferIndex].rateObject.exchangetype,
            tagline: allOffers[giveawayOfferIndex].rateObject.giveaway,
          });
          // Condition to check if there is only one object in an array and giveaway object is present
        } else if (
          allOffers.length === 1 &&
          bestRateIndex === giveawayOfferIndex &&
          giveawayOfferIndex !== null
        ) {
          setBestOfferObject({ name: null, type: null, tagline: null });
          setGiveAwayObject({
            name: allOffers[giveawayOfferIndex].rateObject.name,
            type: allOffers[giveawayOfferIndex].rateObject.exchangetype,
            tagline: allOffers[giveawayOfferIndex].rateObject.giveaway,
          });
        }
        // If giveaway object is not present in array
      } else {
        setBestOfferObject({
          name: allOffers[bestRateIndex].rateObject.name,
          type: allOffers[bestRateIndex].rateObject.exchangetype,
          tagline: "Best Rate",
        });
        setGiveAwayObject({ name: null, type: null, tagline: null });
      }
    }
  };

  const fastestofferfun = () => {
    setOfferSequenceType("fastestswap");
  };

  let inActiveBtn = {
    backgroundColor: "transparent",
    color: "white",
  };

  let activeBtn = {
    backgroundColor: "white",
    color: "black",
  };

  const fastestratedfun = () => {
    setOfferSequenceType("Best Rated");

    let updatedOffers = offerArrayNew;
    let allOffers = offerArrayNew;

    let giveawayFloatingOffer = updatedOffers.filter(
      (offer) =>
        offer.rateObject.giveaway !== "no_giveaway" &&
        offer.rateObject.exchangetype === "Floating"
    );
    let ratingOrder = updatedOffers.filter(
      (offer) =>
        offer.rateObject.giveaway === "no_giveaway" ||
        (offer.rateObject.giveaway !== "no_giveaway" &&
          offer.rateObject.exchangetype === "Fixed")
    );

    ratingOrder.sort(
      (a, b) =>
        Number(b.rateObject.rating.split("/")[0]) -
        Number(a.rateObject.rating.split("/")[0])
    );

    updatedOffers = [...giveawayFloatingOffer, ...ratingOrder];
    allOffers = [...giveawayFloatingOffer, ...ratingOrder];

    setOfferArrayNew(updatedOffers);

    // Logic for fing index of best rate object from array. If found return index else return null
    const result = allOffers.findIndex(
      (offer) => offer.rateObject.giveaway !== "no_giveaway"
    );
    const giveawayOfferIndex = result !== -1 ? result : null;

    // If Give away object is present in array and array sequence other then best rate
    if (giveawayOfferIndex !== null) {
      setBestOfferObject({ name: null, type: null, tagline: null });
      setGiveAwayObject({
        name: allOffers[giveawayOfferIndex].rateObject.name,
        type: allOffers[giveawayOfferIndex].rateObject.exchangetype,
        tagline: allOffers[giveawayOfferIndex].rateObject.giveaway,
      });
      // If Giveaway object is not present and array sequence other then best rate then select first object in sequence
    } else {
      setBestOfferObject({
        name: allOffers[0].rateObject.name,
        type: allOffers[0].rateObject.exchangetype,
        tagline: "Best Rated",
      });
      setGiveAwayObject({ name: null, type: null, tagline: null });
    }
  };

  const fixedfun = () => {
    setFixedTabColor("white");
    setFixedTabTextColor("black");
    setFloatingTabColor("transparent");
    setFloatingTabTextColor("white");
    setFixedFilter("brightness(1%)");
    setFloatingFilter("brightness(2000%)");
    // Setting transaction types that we want to display
    setTypes(true);
  };

  const floatingfun = () => {
    setFixedTabColor("transparent");
    setFixedTabTextColor("white");
    setFloatingTabColor("white");
    setFloatingTabTextColor("black");
    setFixedFilter("brightness(2000%)");
    setFloatingFilter("brightness(1%)");
    // Setting transaction types that we want to display
    setTypes(false);
  };

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const [senddropvisibility, setSendDropVisibility] = useState(false);
  const [getdropvisibility, setGetDropVisibility] = useState(false);

  const [loadingdots, setLoadingDots] = useState(false);
  const [exchangetab, setExchangeTab] = useState(true);
  const [buytab, setBuyTab] = useState(false);

  // Offer array state
  const [offerArrayNew, setOfferArrayNew] = useState([]);

  // Offer type
  const [types, setTypes] = useState(false);

  // Best offer object identifier
  const [bestOfferObject, setBestOfferObject] = useState({
    name: null,
    type: null,
    tagline: null,
  });

  // Giveaway object identifier
  const [giveawayObject, setGiveAwayObject] = useState({
    name: null,
    type: null,
    tagline: null,
  });

  // This function is responsible for fetching offers and sequencing in array
  const fetchDataNew = async () => {
    setOfferArrayNew([]);
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

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        // Check if min is not equal to zero then add only those objects in array
        if (data.rateObject.min !== 0) {
          // If atleast one offer response is available then disable loading
          setSkeletonLoading(false);
          const newOffer = { ...data, type: obj.type, source: obj.url };
          allOffers.push(newOffer);

          setOfferArrayNew((prevOffers) => {
            let updatedOffers = [...prevOffers, newOffer];
            if (offerSequenceType === "Best Rate") {
              // Separate offers
              let giveawayFloatingOffer = updatedOffers.filter(
                (offer) =>
                  offer.rateObject.giveaway !== "no_giveaway" &&
                  offer.rateObject.exchangetype === "Floating"
              );
              let inRangeOffers = updatedOffers.filter(
                (offer) =>
                  (offer.message === "success" &&
                    offer.rateObject.giveaway === "no_giveaway") ||
                  (offer.message === "success" &&
                    offer.rateObject.giveaway !== "no_giveaway" &&
                    offer.rateObject.exchangetype === "Fixed")
              );
              let belowRangeOffers = updatedOffers.filter(
                (offer) =>
                  (offer.message === "deposit_below_range" &&
                    offer.rateObject.giveaway === "no_giveaway") ||
                  (offer.message === "deposit_below_range" &&
                    offer.rateObject.giveaway !== "no_giveaway" &&
                    offer.rateObject.exchangetype === "Fixed")
              );
              let aboveRangeOffers = updatedOffers.filter(
                (offer) =>
                  (offer.message === "deposit_above_range" &&
                    offer.rateObject.giveaway === "no_giveaway") ||
                  (offer.message === "deposit_above_range" &&
                    offer.rateObject.giveaway !== "no_giveaway" &&
                    offer.rateObject.exchangetype === "Fixed")
              );

              inRangeOffers.sort(
                (a, b) => b.rateObject.rate - a.rateObject.rate
              );
              belowRangeOffers.sort(
                (a, b) => a.rateObject.higher_min - b.rateObject.higher_min
              );
              aboveRangeOffers.sort(
                (a, b) => b.rateObject.max - a.rateObject.max
              );

              updatedOffers = [
                ...giveawayFloatingOffer,
                ...inRangeOffers,
                ...belowRangeOffers,
                ...aboveRangeOffers,
              ];
              allOffers = [
                ...giveawayFloatingOffer,
                ...inRangeOffers,
                ...belowRangeOffers,
                ...aboveRangeOffers,
              ];
            } else {
              // Tag line logic for Best Rating
              // **Condition 1: Move "giveaway" items to index 0**
              let giveawayFloatingOffer = updatedOffers.filter(
                (offer) =>
                  offer.rateObject.giveaway !== "no_giveaway" &&
                  offer.rateObject.exchangetype === "Floating"
              );
              let ratingOrder = updatedOffers.filter(
                (offer) =>
                  offer.rateObject.giveaway === "no_giveaway" ||
                  (offer.rateObject.giveaway !== "no_giveaway" &&
                    offer.rateObject.exchangetype === "Fixed")
              );

              ratingOrder.sort(
                (a, b) =>
                  Number(b.rateObject.rating.split("/")[0]) -
                  Number(a.rateObject.rating.split("/")[0])
              );
              updatedOffers = [...giveawayFloatingOffer, ...ratingOrder];
              allOffers = [...giveawayFloatingOffer, ...ratingOrder];
            }
            return updatedOffers;
          });
        }

        return { status: "fulfilled", value: data };
      } catch (error) {
        return { status: "rejected", message: error.message };
      }
    });

    try {
      // Wait for all promises to settle
      const results = await Promise.allSettled(promises);

      // ✅ Check if all promises were rejected
      const allFailed = results.every((result) => result.status === "rejected");
      if (allFailed) {
        setSkeletonLoading(false);
      }

      // console.log("All API calls completed:", allOffers);

      storeGetAmount(
        allOffers.length > 0
          ? allOffers[0].message !== "deposit_below_range" &&
            allOffers[0].message !== "deposit_above_range"
            ? allOffers[0].rateObject.rate
            : 0
          : 0
      );
      timerStartStopFun(true);
      setLoadingDots(false);

      // Show no offers message if offer length is less
      allOffers.length > 0 ? setIsThereAnOffer(true) : setIsThereAnOffer(false);

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
              setBestOfferObject({
                name: allOffers[bestRateIndex].rateObject.name,
                type: allOffers[bestRateIndex].rateObject.exchangetype,
                tagline: offerSequenceType,
              });
              setGiveAwayObject({
                name: allOffers[giveawayOfferIndex].rateObject.name,
                type: allOffers[giveawayOfferIndex].rateObject.exchangetype,
                tagline: allOffers[giveawayOfferIndex].rateObject.giveaway,
              });
              // Condition to check if array object count is greater then 1 and giveaway object has rate higher then
            } else if (
              allOffers.length > 1 &&
              allOffers[bestRateIndex].rateObject.rate <=
                allOffers[giveawayOfferIndex].rateObject.rate &&
              bestRateIndex !== null &&
              giveawayOfferIndex !== null
            ) {
              setBestOfferObject({ name: null, type: null, tagline: null });
              setGiveAwayObject({
                name: allOffers[giveawayOfferIndex].rateObject.name,
                type: allOffers[giveawayOfferIndex].rateObject.exchangetype,
                tagline: allOffers[giveawayOfferIndex].rateObject.giveaway,
              });
              // Condition to check if there is only one object in an array and giveaway object is present
            } else if (
              allOffers.length === 1 &&
              bestRateIndex === giveawayOfferIndex &&
              giveawayOfferIndex !== null
            ) {
              setBestOfferObject({ name: null, type: null, tagline: null });
              setGiveAwayObject({
                name: allOffers[giveawayOfferIndex].rateObject.name,
                type: allOffers[giveawayOfferIndex].rateObject.exchangetype,
                tagline: allOffers[giveawayOfferIndex].rateObject.giveaway,
              });
            }
            // If giveaway object is not present in array
          } else {
            setBestOfferObject({
              name: allOffers[bestRateIndex].rateObject.name,
              type: allOffers[bestRateIndex].rateObject.exchangetype,
              tagline: offerSequenceType,
            });
            setGiveAwayObject({ name: null, type: null, tagline: null });
          }

          // If Array sequence is other then Best Rate
        } else {
          // If Give away object is present in array and array sequence other then best rate
          if (giveawayOfferIndex !== null) {
            setBestOfferObject({ name: null, type: null, tagline: null });
            setGiveAwayObject({
              name: allOffers[giveawayOfferIndex].rateObject.name,
              type: allOffers[giveawayOfferIndex].rateObject.exchangetype,
              tagline: allOffers[giveawayOfferIndex].rateObject.giveaway,
            });
            // If Giveaway object is not present and array sequence other then best rate then select first object in sequence
          } else {
            setBestOfferObject({
              name: allOffers[0].rateObject.name,
              type: allOffers[0].rateObject.exchangetype,
              tagline: offerSequenceType,
            });
            setGiveAwayObject({ name: null, type: null, tagline: null });
          }
        }
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
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

  // This useEffect is responsible for updating offers and displaying
  useEffect(() => {
    if (cryptoData.length > 0) {
      if (props.offers.length > 0) {
        setOfferArrayNew(props.offers);
        setBestOfferObject(bestOfferObjectFromHome);
        setGiveAwayObject(giveawayObjectFromHome);
        storeGetAmount(offers[0].rateObject.rate);
        timerStartStopFun(true);
        setOffersFun([]);
      } else {
        // Start loading loading dots in exchange box
        setLoadingDots(true);
        // Start skeleton loading animation in offer
        setSkeletonLoading(true);

        let delay = setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth", // Smooth scrolling behavior
          });
          if (sendAmount > 0) {
            fetchDataNew();
          }
        }, 3000); // Delay of 500ms

        return () => clearTimeout(delay); // Cleanup timeout
      }
    }
  }, [
    cryptoDataChange,
    sendAmount,
    sendCoinObject,
    getCoinObject,
    timeCompletionTriger,
  ]);

  // When minimum is displayed this function allows user to set send amount equal to min displayed on click
  function setMin(val) {
    storeSendAmount(val);
  }

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

  // This function is responsible for switching of sending and receving coins on click in exchange box
  const swapcrypto = () => {
    storeSendCoinObject(getCoinObject);
    storeGetCoinObject(sendCoinObject);
  };

  return (
    <>
      <Helmet>
        <title>Best Crypto-to-Crypto Exchange | Fast & Secure Swaps</title>
        <meta
          name="description"
          content="Experience the best crypto-to-crypto exchange on Coinoswap. Enjoy fast, secure, and convenient swaps on a non-custodial platform for all your crypto needs."
        />
      </Helmet>
      <div className="container-fluid" style={{ paddingTop: "3%" }}>
        <div className="row">
          <div className="col-xl-6 animate__animated animate__fadeInLeft offer-exchangebox-parent-div">
            {/* Exchange Box */}
            <div className="exchange-box-div exchange-box-div-big-screen">
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
                <div className="exchange-send-div">
                  {!senddropvisibility && (
                    <div style={{ display: "flex", width: "100%" }}>
                      <div className="exchange-send-div-input">
                        <div>
                          <label className="exchange-send-label">
                            You Send:
                          </label>
                          <input
                            type="txt"
                            className="form-control"
                            id="exchange-box-send-input"
                            aria-describedby="emailHelp"
                            value={sendAmount}
                            onChange={(e) => {
                              // Replacing , with .
                              const modifiedValue = e.target.value.replace(
                                /,/g,
                                "."
                              );
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
                                  style={{
                                    color: sendCoinObject.network_color,
                                  }}
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
                        placeholder="Type currency here"
                        value={coinSearchTerm}
                        ref={inputRef}
                        onChange={(e) => {
                          // Resetting this coin batch to 1
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
                  <div
                    className="swap-btn"
                    id="thumb-cursor"
                    onClick={swapcrypto}
                  >
                    <img src={swap_icon} style={{ height: "24px" }}></img>
                  </div>
                </div>
                <div className="exchange-get-div">
                  {!getdropvisibility && (
                    <div style={{ display: "flex", width: "100%" }}>
                      <div className="exchange-get-div-input">
                        <div>
                          <label className="exchange-get-label">
                            You Recieve:
                          </label>
                          <input
                            type="txt"
                            className="form-control"
                            style={{ display: loadingdots ? "none" : "block" }}
                            id="exchange-box-get-input"
                            aria-describedby="emailHelp"
                            value={getAmount}
                            disable
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
                          ></img>
                          <div
                            id="thumb-cursor"
                            className="currency-get-label-div"
                          >
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
                        placeholder="Type currency here"
                        value={coinSearchTerm}
                        ref={inputRef}
                        onChange={(e) => {
                          // Resetting dropdown batch to 1
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
              </div>
            </div>

            {/* Fixed and Float Buttons */}
            <div className="row fixed-float-tab" style={{ marginTop: "36px" }}>
              <div
                className="col-6 basement-font vh-center"
                id="thumb-cursor"
                onClick={floatingfun}
                style={{
                  backgroundColor: floatingtabcolor,
                  color: floatingtabtextcolor,
                  borderRadius: "40px",
                }}
              >
                <img
                  style={{
                    width: "22px",
                    marginRight: "10px",
                    filter: floatingfilter,
                  }}
                  src={floatingicon}
                ></img>
                <span>Floating</span>
              </div>
              <div
                className="col-6 basement-font vh-center"
                id="thumb-cursor"
                onClick={fixedfun}
                style={{
                  backgroundColor: fixedtabcolor,
                  color: fixedtabtextcolor,
                  borderRadius: "40px",
                }}
              >
                <img
                  style={{
                    width: "20px",
                    marginRight: "9px",
                    filter: fixedfilter,
                  }}
                  src={fixedicon}
                ></img>
                <span>Fixed</span>
              </div>
            </div>
          </div>

          <div className="col-xl-6 animate__animated animate__fadeInRight">
            {/* Offers Tabs Buttons */}
            <div className="offer-tab-container">
              <div className="offers-type-tab row">
                <div
                  className="col-4 vh-center offer-type basement-font"
                  id="thumb-cursor"
                  onClick={bestratesfun}
                  style={
                    offerSequenceType === "Best Rate" ? activeBtn : inActiveBtn
                  }
                >
                  <span>Best Rates</span>
                </div>
                <div
                  className="col-4 vh-center offer-type basement-font"
                  id="thumb-cursor"
                  style={
                    offerSequenceType == "fastestswap" ? activeBtn : inActiveBtn
                  }
                >
                  <div>Available Soon</div>
                  <span>Fastest Swap</span>
                </div>
                <div
                  className="col-4 vh-center offer-type basement-font"
                  id="thumb-cursor"
                  onClick={fastestratedfun}
                  style={
                    offerSequenceType === "Best Rated" ? activeBtn : inActiveBtn
                  }
                >
                  <span>Best Rated</span>
                </div>
              </div>
              <div className="clock-refresh-btn-container">
                <div
                  className="timer-circle-div"
                  style={{ position: "relative" }}
                >
                  <CountdownCircleTimer
                    key={isActive}
                    isPlaying={timerTrigger}
                    duration={60}
                    colors={[
                      "rgba(244, 107, 12, 1)",
                      "#F7B801",
                      "#A30000",
                      "#A30000",
                    ]}
                    colorsTime={[5, 5, 2, 0]}
                    size={40}
                    strokeWidth={5}
                    onComplete={() => {
                      offerIntervalBaseRefreshFun();
                    }}
                  >
                    {({ remainingTime }) => (
                      <div
                        style={{
                          fontSize: 15,
                          color:
                            remainingTime <= 5
                              ? "red"
                              : "rgba(244, 107, 12, 1)",
                        }}
                      >
                        {remainingTime}
                      </div>
                    )}
                  </CountdownCircleTimer>
                  <img
                    className="img-fluid"
                    src={refresh_circle}
                    style={{ width: "50px", zIndex: "2", position: "absolute" }}
                  ></img>
                </div>

                <div className="refreshbtn-div">
                  <button
                    className="refreshbtn"
                    id="thumb-cursor"
                    onClick={offerIntervalBaseRefreshFun}
                  >
                    Refresh Search
                  </button>
                </div>
              </div>
            </div>

            {/* Offers */}
            {
              // Condition 2
              isThereAnOffer ? (
                offerArrayNew.map((offer, key) => {
                  // Get previous offer (if exists)
                  const prevOffer = key > 0 ? offerArrayNew[key - 1] : null;
                  // Determine class based on previous offer's rate
                  let movementClass = "";
                  if (prevOffer) {
                    if (
                      offer.message !== "deposit_below_range" &&
                      offer.message !== "deposit_above_range"
                    ) {
                      if (offer.rateObject.rate > prevOffer.rateObject.rate) {
                        movementClass = "animate__slideInUp";
                      } else if (
                        offer.rateObject.rate < prevOffer.rateObject.rate
                      ) {
                        movementClass = "animate__slideInDown";
                      }
                    } else {
                      if (
                        offer.rateObject.higher_min >
                        prevOffer.rateObject.higher_min
                      ) {
                        movementClass = "animate__slideInDown";
                      } else if (
                        offer.rateObject.higher_min <
                        prevOffer.rateObject.higher_min
                      ) {
                        movementClass = "animate__slideInUp";
                      }
                    }
                  }

                  if (skeletonLoading) {
                    return <OffersLoading></OffersLoading>;
                  } else {
                    if (offer.rateObject.min !== 0) {
                      return (
                        <Offer
                          offerTypeVisibility={types}
                          key={key}
                          min={offer.rateObject.higher_min}
                          max={offer.rateObject.max}
                          elementMovementClass={movementClass}
                          orignalMinimum={offer.rateObject.higher_min}
                          limitType={offer.message}
                          offerED={
                            offer.message === "deposit_below_range" ||
                            offer.message === "deposit_above_range"
                              ? "disable"
                              : "enable"
                          }
                          dotswhilefetch={loadingdots}
                          index={key}
                          rating={offer.rateObject.rating}
                          tagline={
                            offer.rateObject.name === giveawayObject.name &&
                            offer.rateObject.exchangetype ===
                              giveawayObject.type
                              ? giveawayObject.tagline
                              : offer.rateObject.name ===
                                  bestOfferObject.name &&
                                offer.rateObject.exchangetype ===
                                  bestOfferObject.type &&
                                offer.message !== "amount_not_in_range"
                              ? bestOfferObject.tagline
                              : ""
                          }
                          rateid={
                            offer.rateObject.rate_id
                              ? offer.rateObject.rate_id
                              : ""
                          }
                          setMin={setMin}
                          // Url variables
                          // Sell coin variables
                          sellCoinTicker={sendCoinObject.ticker}
                          sellCoinName={sendCoinObject.short_name}
                          sellCoinNetwork={sendCoinObject.network}
                          sellCoinExtraIdSupported={combinedTrueElseFalse(
                            sendCoinObject
                          )}
                          sellAmount={sendAmount}
                          sellCoinImage={sendCoinObject.logo}
                          // Get coin variables
                          getCoinTicker={getCoinObject.ticker}
                          getCoinName={getCoinObject.short_name}
                          getCoinNetwork={getCoinObject.network}
                          getCoinExtraIdSupported={combinedTrueElseFalse(
                            getCoinObject
                          )}
                          getCoinImage={getCoinObject.logo}
                          rate={offer.rateObject.rate}
                          name={offer.rateObject.name}
                          type={offer.rateObject.exchangetype}
                          kyc={offer.rateObject.kyc}
                          eta={offer.rateObject.eta}
                        ></Offer>
                      );
                    }
                  }
                })
              ) : (
                <div className="nooffer-div">
                  <span>
                    This Trading Pair Is Not Available. Please Choose Another
                    Pair.
                  </span>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <div className="container-fluid step2-desktop">
        <div className="row" style={{ margin: "5% 0%", marginBottom: "10%" }}>
          <img src={step2} className="img-fluid"></img>
        </div>
      </div>
      <div className="container-fluid step2-mobile">
        <div className="row" style={{ margin: "5% 0%", marginBottom: "10%" }}>
          <img src={step2mobileui} className="img-fluid"></img>
        </div>
      </div>
    </>
  );
};

export default Offers;
