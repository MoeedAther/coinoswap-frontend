import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar.js";
import BackgroundImage from "./components/background.js";
import Footer from "./components/footer.js";
import Home from "./Pages/Home.js";
import Offers from "./Pages/Offers.js";
import Deposit from "./Pages/Deposit.js";
import Submit from "./Pages/SubmitDeposit.js";
import Progress from "./Pages/Progress.js";
import Success from "./Pages/Success.js";
import HowItWorks from "./Pages/How-it-works.js";
import AboutUS from "./Pages/About_us.js";
import FAQ from "./Pages/FAQ.js";
import OurCurrencies from "./Pages/Our_Currencies.js";
import Contact_us from "./Pages/Contact_us";
import Listing_Your_Exchange from "./Pages/Listing_Your_Exchange.js";
import Privacy_Policy from "./Pages/Privacy_Policy.js";
import Terms_of_use from "./Pages/Terms_of_use.js";
import AvailableSoon from "./Pages/AvailableSoon.js";
import Affiliate_Program from "./Pages/Affiliate_Program.js";
import PageNotFound from "./Pages/404_PageNotFound.js";
import axios from "axios";
import { Helmet } from "react-helmet";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
import Header from "./components/Header.js";
import { toast, Bounce } from "react-toastify";

function App() {
  const [CoinMarketData, setCoinMarketData] = useState();
  const [searchCryptoArray, setSearchCryptoArray] = useState();
  const [offers, setOffers] = useState([]);
  const [dropDownCoinsLoading, setDropdownCoinsLoading] = useState(true);
  const [sendAmount, setSendAmount] = useState(0.1);
  const [getAmount, setGetAmount] = useState(0);

  // Dropdown States
  const [sendCoinObject, setSendCoinObject] = useState(null);
  const [getCoinObject, setGetCoinObject] = useState(null);

  const [cryptoData, setCryptoData] = useState([]);
  const [coinBatch, setCoinBatch] = useState(1);
  const [coinSearchTerm, setCoinSearchTerm] = useState("");

  // This function is responsible for storing send coin object on coin selection in local storage and state variable
  function storeSendCoinObject(obj) {
    setSendCoinObject(obj);
    localStorage.setItem("sendCoin", JSON.stringify(obj));
  }

  // This function is responsible for storing get coin object on coin selection in local storage and state variable
  function storeGetCoinObject(obj) {
    setGetCoinObject(obj);
    localStorage.setItem("getCoin", JSON.stringify(obj));
  }

  // This function stores send amount
  function storeSendAmount(amount) {
    localStorage.setItem("local_send_amount", amount);
    setSendAmount(amount);
  }
  // This function stores get amount
  function storeGetAmount(amount) {
    localStorage.setItem("local_get_amount", amount);
    setGetAmount(amount);
  }

  // Best offer identifier
  const [bestOfferObject, setBestOfferObject] = useState({
    name: null,
    type: null,
    tagline: null,
  });

  // Giveaway identifier
  const [giveawayObject, setGiveAwayObject] = useState({
    name: null,
    type: null,
    tagline: null,
  });

  function setBestOfferAndGiveawayObjectFun(bestoffer, giveaway) {
    setBestOfferObject(bestoffer);
    setGiveAwayObject(giveaway);
  }

  const canonicalUrl = "https://www.coinoswap.com"; // Your home page URL

  function setOffersFun(offers) {
    setOffers(offers);
  }

  // This fucntion is responsible for storing coin batch number and reset of coin batch to default first batch as well as search term
  function storeCoinBatch(index, term) {
    // Index 0 means reset of dropdown to default first batch
    if (index === 0) {
      setCoinBatch(1);
      setCoinSearchTerm("");
    }

    // If value greater then 0 then perform increment
    if (index > 0) {
      setCoinBatch(index);
      setCoinSearchTerm(term);
    }
  }

  // This useeffect is responsoble for storing send and get and send amount coin from local storage in state if local storage value is not equal to undefined or null
  useEffect(() => {
    if (
      localStorage.getItem("sendCoin") !== "null" ||
      localStorage.getItem("sendCoin") !== "undefined"
    ) {
      setSendCoinObject(JSON.parse(localStorage.getItem("sendCoin")));
    }

    if (
      localStorage.getItem("getCoin") !== "null" ||
      localStorage.getItem("getCoin") !== "undefined"
    ) {
      setGetCoinObject(JSON.parse(localStorage.getItem("getCoin")));
    }

    if (
      localStorage.getItem("local_send_amount") !== "null" ||
      localStorage.getItem("local_send_amount") !== "undefined"
    ) {
      setSendAmount(localStorage.getItem("local_send_amount"));
    }
  }, []);

  // useEffect responsible for fetching dropdown coins
  useEffect(() => {
    (async function () {
      try {
        setDropdownCoinsLoading(true);
        const url =
          process.env.REACT_APP_URL +
          "/available_currencies" +
          `?_=${new Date().getTime()}`;
        const response = await axios.post(url, {
          pageNumber: coinBatch,
          numberOfRows: 100,
          exchangesCount: "All",
          searchTerm: coinSearchTerm,
        });
        const result = response.data;

        // Defining and storing "newCoinArray" is done to find ids before which we have to create heading popular|stable|other|popular&stable
        // ******** Start *********
        let mainArray = cryptoData;
        let addArray = result.coins;

        let newCoinArray = [...mainArray, ...addArray];

        // ******** End ***********
        if (coinBatch > 1) {
          setCryptoData((prevData) => [...prevData, ...result.coins]);
        } else {
          setCryptoData(result.coins);
        }

        // Below two if condition check if user vists site for the first time then set first two coins from array in local storage
        if (
          localStorage.getItem("sendCoin") === "null" ||
          localStorage.getItem("sendCoin") === "undefined"
        ) {
          if (result.defaultSendCoin) {
            localStorage.setItem(
              "sendCoin",
              JSON.stringify(result.defaultSendCoin)
            );
            setSendCoinObject(result.defaultSendCoin);
          } else {
            localStorage.setItem("sendCoin", JSON.stringify(result.coins[0]));
            setSendCoinObject(result.coins[0]);
          }
        }

        if (
          localStorage.getItem("getCoin") === "null" ||
          localStorage.getItem("getCoin") === "undefined"
        ) {
          if (result.defaultGetCoin) {
            localStorage.setItem(
              "getCoin",
              JSON.stringify(result.defaultGetCoin)
            );
            setGetCoinObject(result.defaultGetCoin);
          } else {
            localStorage.setItem("getCoin", JSON.stringify(result.coins[1]));
            setGetCoinObject(result.coins[1]);
          }
        }

        setDropdownCoinsLoading(false);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(
          <div>
            <strong>Something went wrong</strong>
            <p style={{ fontSize: "13px", color: "#888787" }}>{errorMessage}</p>
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );

        setDropdownCoinsLoading(false);
      }
    })();
  }, [coinBatch, coinSearchTerm]);

  // useEffect responsible for fetching coins market data from Coin Market Cap
  useEffect(() => {
    async function fetchCoinMarketData() {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response1 = await fetch(
        process.env.REACT_APP_URL + "/coin_market_data",
        options
      );
      const result1 = await response1.json();
      const dataWithIndex = result1.data.map((item, index) => ({
        ...item,
        tableindex: index,
      }));
      setCoinMarketData(dataWithIndex);
      setSearchCryptoArray(result1.data);
    }
    fetchCoinMarketData();
  }, []);

  return (
    <Router scrollBehavior="auto top">
      <Helmet>
        {/* Canonical URL applied globally */}
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <BackgroundImage>
        <ToastContainer limit={1} />

        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/header" element={<Header />} />
          <Route path="/register" element={<Register />} />
          <Route
            exact
            path="/"
            element={
              <Home
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
            }
          />
          <Route exact path="/how-it-works" element={<HowItWorks />} />
          <Route exact path="/faq" element={<FAQ />} />
          {/* Currencies page */}
          <Route
            exact
            path="/best_crypto_exchange"
            element={
              <OurCurrencies
                CoinMarketData={CoinMarketData}
                searchCryptoArray={searchCryptoArray}
                cryptoData={cryptoData}
              />
            }
          />
          <Route exact path="/about_us" element={<AboutUS />} />
          <Route exact path="/contact_us" element={<Contact_us />} />
          <Route
            exact
            path="/best_crypto_to_crypto_exchange"
            element={
              <Offers
                cryptoData={cryptoData}
                offers={offers}
                setOffersFun={setOffersFun}
                bestOfferObjectFromHome={bestOfferObject}
                giveawayObjectFromHome={giveawayObject}
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
            }
          />
          <Route exact path="/exchange" element={<Deposit />} />
          <Route exact path="/submit" element={<Submit />} />
          <Route exact path="/progress" element={<Progress />} />
          <Route exact path="/success" element={<Success />} />
          <Route
            exact
            path="/listing_your_exchange"
            element={<Listing_Your_Exchange />}
          />
          <Route exact path="/terms_of_use" element={<Terms_of_use />} />
          <Route exact path="/privacy_policy" element={<Privacy_Policy />} />
          <Route exact path="/available_soon" element={<AvailableSoon />} />
          <Route
            exact
            path="/affiliate_program"
            element={<Affiliate_Program />}
          ></Route>
          <Route
            exact
            path="/page_not_found"
            element={<PageNotFound />}
          ></Route>
          <Route path="*" element={<Navigate to="/page_not_found" replace />} />
        </Routes>
        <Footer sendAmount={sendAmount} />
      </BackgroundImage>
    </Router>
  );
}

export default App;
