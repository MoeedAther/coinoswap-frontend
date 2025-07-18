import React, { useState, useMemo } from "react";
import {
  removeTextInBrackets,
  handleScrollToElement,
} from "../Js/functions.js";

const CoinsDropDown = (props) => {
  const {
    cryptoData,
    storeCoinObj,
    storeCoinBatch,
    coinBatch,
    type,
    coinSearchTerm,
    dropdownRef,
    dropDownCoinsLoading,
  } = props;

  const [coinsType, setCoinsType] = useState("popular");

  const coinTypesObj = useMemo(() => {
    let popularArray = [];
    let stableArray = [];
    let otherArray = [];

    cryptoData.map((coin) => {
      if (coin.coinType === "popular" || coin.coinType === "popular&stable") {
        popularArray.push(coin);
      }
      if (coin.coinType === "stable") {
        stableArray.push(coin);
      }
      if (coin.coinType === "other") {
        otherArray.push(coin);
      }
    });

    const popularCoin = popularArray.length > 0 ? popularArray[0] : false;
    const stableCoin = stableArray.length > 0 ? stableArray[0] : false;
    const otherCoin = otherArray.length > 0 ? otherArray[0] : false;

    const result = {
      popularCoin: popularCoin,
      stableCoin: stableCoin,
      otherCoin: otherCoin,
    };
    return result;
  }, [cryptoData]);

  const coinTypeEnableStyle = {
    backgroundColor: "black",
    color: "rgb(227, 225, 222)",
  };

  // This function is responsible for coin type enabale and disable on select (style change) and scroll behaviour
  function handleCoinsTypeChange(type) {
    setCoinsType(type);
    // This function takes element id to which we want to scroll
    handleScrollToElement(type);
  }

  const coinTypeDisableStyle = {
    backgroundColor: "rgb(227, 225, 222)",
    color: "black",
  };

  const handleScroll = (e) => {
    const el = e.target;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight;
    const clientHeight = el.clientHeight;

    if (scrollTop === 0) {
      // Logic to be developed later
    }

    if (scrollTop + clientHeight >= scrollHeight - 1) {
      storeCoinBatch(coinBatch + 1, coinSearchTerm);
    }
  };

  return (
    <div
      className="position-absolute coins-drop-down-container"
      style={{ zIndex: 1 }}
      ref={dropdownRef}
    >
      <div className="type-of-coins-tab">
        <button
          type="button"
          className="btn  popular-currencies-btn"
          onClick={() => {
            handleCoinsTypeChange("popular");
          }}
          style={
            coinsType === "popular" ? coinTypeEnableStyle : coinTypeDisableStyle
          }
        >
          Popular Currencies
        </button>
        <button
          type="button"
          className="btn  stable-currencies-btn"
          onClick={() => {
            handleCoinsTypeChange("stable");
          }}
          style={
            coinsType === "stable" ? coinTypeEnableStyle : coinTypeDisableStyle
          }
        >
          Stable Currencies
        </button>
        <button
          type="button"
          className="btn  other-currencies-btn"
          onClick={() => {
            handleCoinsTypeChange("other");
          }}
          style={
            coinsType === "other" ? coinTypeEnableStyle : coinTypeDisableStyle
          }
        >
          Other Currencies
        </button>
      </div>
      <ul
        className="list-group  w-100 coins-unordered-list scrollable-dropdown"
        onScroll={handleScroll}
        style={{
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <li className="list-group-item list-group-item-action" id="top-id"></li>
        {cryptoData.length > 0 ? (
          cryptoData.map((coin, index) => (
            <>
              {/* below line finds matching id from passed object from App.js file and if matching found show coin type heading*/}
              {coinTypesObj.popularCoin &&
              coinTypesObj.popularCoin.id === coin.id ? (
                <div className="coin-type" id="popular">
                  <span>Popular Coins</span>
                </div>
              ) : coinTypesObj.stableCoin &&
                coinTypesObj.stableCoin.id === coin.id ? (
                <div className="coin-type" id="stable">
                  <span>Stable Coins</span>
                </div>
              ) : coinTypesObj.otherCoin &&
                coinTypesObj.otherCoin.id === coin.id ? (
                <div className="coin-type" id="other">
                  <span>Other Coins</span>
                </div>
              ) : (
                <></>
              )}

              <li
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => {
                  storeCoinObj(coin, type);
                }}
              >
                <div className="unapproved_Dropdown_approved_list">
                  <div className="dropdown-coin-ticker-image">
                    <img src={coin.logo}></img>
                    <span>
                      {coin.short_name && coin.short_name.toUpperCase()}
                    </span>
                  </div>
                  {coin.network_color !== "#161515" && (
                    <div className="dropdown-network-name">
                      <span
                        className="dropdown-network-name"
                        style={{
                          backgroundColor: coin.network_color,
                        }}
                      >
                        {coin.network.toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="dropdown-coin-name">
                    <span>{removeTextInBrackets(coin.name)}</span>
                  </div>
                </div>
                <div
                  class="coins-drop-underline"
                  style={{ width: "100%", height: "1px" }}
                  bis_skin_checked="1"
                ></div>
              </li>
            </>
          ))
        ) : (
          <li className="list-group-item text-muted">No results</li>
        )}
      </ul>
      {dropDownCoinsLoading && (
        <div className="coins_dropdown_loader">
          <span>Loading</span>
          <div class="dropdown_loader"></div>
        </div>
      )}
    </div>
  );
};

export default CoinsDropDown;
