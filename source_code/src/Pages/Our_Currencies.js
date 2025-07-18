import React, { useEffect, useState } from "react";
import "../css/Our_Currencies.css";
import "../css/Our_Currencies_responsive.css";
import search_icon from "../images/Search Icon.png";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

const OurCurrencies = (props) => {
  const navigate = useNavigate();
  const [coinmarketdata, setCoinMarketData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchCryptoArray, setSearchCryptoArray] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [searchStatus, setSearchStatus] = useState("Loading...");

  function formatTo15Chars(input, length) {
    // Step 1: Convert to string if it's a number
    let value = typeof input === "number" ? input.toString() : input;

    // Step 2: Trim the string to a maximum of 15 characters (including decimal point)
    value = value.slice(0, length);

    return value;
  }

  const coins = props.cryptoData;
  function getCoinIndexBySymbol(symbol) {
    const coin = coins.find((coin) => coin.symbol === symbol); // Find object by symbol
    return coin ? coin.coinindex : 0; // Return coinindex or null if not found
  }

  async function calSendAmount(sendindex, getindex) {
    try {
      const url = process.env.REACT_APP_URL + "/pricecheck";
      const options = {
        sel: cryptoData[sendindex]?.symbol,
        get: cryptoData[getindex]?.symbol,
        amount: 1,
      };

      const headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(url, options, headers);

      const data = response.data;
      let newSend =
        10 * Number(parseFloat(data.to.from.min ? data.to.from.min : 0.5));
      newSend = formatTo15Chars(newSend, 15);
      localStorage.setItem("local_send_amount", newSend);
      localStorage.setItem("local_send_index", sendindex);
      localStorage.setItem("local_get_index", getindex);
      navigate(`/home/${sendindex}/${getindex}/${newSend}`);
    } catch (error) {
      console.log(error);
    }
  }

  function formatNumber(number) {
    // Convert the number to a string and split it into the integer and decimal parts
    const parts = number.toString().split(".");

    // If there is no decimal point or there are two or fewer digits after the decimal, return the number as is
    if (parts.length === 1 || parts[1].length <= 2) {
      return number;
    }

    // If there are more than two digits after the decimal, truncate to three decimal places
    return parseFloat(number.toFixed(3));
  }

  const [currentItems, setCurrentItems] = useState([]); // New state for paginated items
  const [pageCount, setPageCount] = useState(0); // Total number of pages
  const [itemOffset, setItemOffset] = useState(0); // Offset for the current page

  // Constants
  const itemsPerPage = 30; // Define the number of items per page

  // Function to handle pagination and set the paginated items
  const handlePaginate = (items, offset) => {
    const endOffset = offset + itemsPerPage;
    setCurrentItems(items.slice(offset, endOffset)); // Slice the items array to get paginated items
    setPageCount(Math.ceil(items.length / itemsPerPage)); // Calculate the total number of pages
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Smooth scrolling behavior
    });
  };

  const handleNavigation = (ticker) => {
    let coin;
    let position;
    cryptoData.map((crypto, index) => {
      const { symbol } = crypto;
      if (symbol.toLowerCase() === ticker.toLowerCase()) {
        coin = crypto;
        position = index;
      }
    });

    if (coin) {
      calSendAmount(position, getCoinIndexBySymbol("usdttrc20"));
    } else {
      toast.error("Asset not available for swap!", {
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

  // UseEffect to paginate data when coinmarketdata or searchCryptoArray changes
  useEffect(() => {
    if (loading) {
      const dataToPaginate = searchInput ? searchCryptoArray : coinmarketdata;
      handlePaginate(dataToPaginate, itemOffset); // Paginate data
    }
  }, [loading, searchCryptoArray, coinmarketdata, itemOffset]);

  useEffect(() => {
    // getCryptoData();
    window.scrollTo(0, 0);
  }, []);

  const handleSendSearchChange = (e) => {
    setSearchInput(e.target.value);
    const searchTerm = e.target.value.toLowerCase();

    const filteredCryptos = coinmarketdata.filter((crypto) => {
      const { name, symbol, slug } = crypto;
      return (
        name.toLowerCase().includes(searchTerm) ||
        symbol.toLowerCase().includes(searchTerm) ||
        slug.toLowerCase().includes(searchTerm)
      );
    });

    const exactMatch = [];
    const partialMatch = [];

    filteredCryptos.forEach((crypto) => {
      const { name, symbol, slug } = crypto;
      if (
        name.toLowerCase() === searchTerm ||
        symbol.toLowerCase() === searchTerm ||
        slug.toLowerCase() === searchTerm
      ) {
        exactMatch.push(crypto);
      } else {
        partialMatch.push(crypto);
      }
    });

    const rearrangedCryptos = exactMatch.concat(partialMatch);
    if (rearrangedCryptos.length == 0) {
      setSearchStatus("Currency Not Available");
    } else {
      setSearchStatus("Loading...");
    }
    setSearchCryptoArray(rearrangedCryptos);
    setItemOffset(0); // Reset pagination when searching
    handlePaginate(rearrangedCryptos, 0); // Re-paginate based on search results
  };

  async function apiCall() {
    try {
      // const options = {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };
      // const response1 = await fetch(process.env.REACT_APP_URL + "/coin_market_data", options);
      // const result1 = await response1.json();
      // const dataWithIndex = result1.data.map((item, index) => ({
      //   ...item, // Spread the existing object properties
      //   tableindex: index // Add the tableindex key with the index as value
      // }));

      // setCoinMarketData(dataWithIndex);
      // setSearchCryptoArray(result1.data);
      setItemOffset(0); // Reset pagination after fetching data
      // handlePaginate(result1.data, 0); // Paginate the initial data

      if (props.CoinMarketData && props.searchCryptoArray) {
        setCoinMarketData(props.CoinMarketData);
        setSearchCryptoArray(props.searchCryptoArray);
        handlePaginate(props.searchCryptoArray, 0); // Paginate the initial data
        setItemOffset(0); // Reset pagination after fetching data
        setCryptoData(props.cryptoData);
        setLoading(true);
      }

      // const url=process.env.REACT_APP_URL+"/currencies";
      // const response2=await axios.get(url);
      // const result2=response2.data;
    } catch (error) {
      console.log("This is the error", error);
      toast.error("Network error!", {
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
  }

  useEffect(() => {
    apiCall();
  }, [props.CoinMarketData, props.searchCryptoArray]);

  // Function to handle page clicks
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) %
      (searchInput ? searchCryptoArray.length : coinmarketdata.length);
    setItemOffset(newOffset);
  };

  return (
    <>
      <Helmet>
        <title>Best Crypto Exchange | Trade & Track Top Cryptocurrencies</title>
        <meta
          name="description"
          content="Find the best crypto exchange at Coinoswap. Check live cryptocurrency prices, 24h changes, and securely exchange coins."
        />
      </Helmet>
      {/*currencies section start*/}
      <div className="container-fluid ">
        <div className="currencies-section">
          <h1 className="currencies_heading">
            Our <strong className="currencies_strong">Currencies</strong>
          </h1>
          <p className="currencies_para">
            Check the latest cryptocurrency prices, 24h changes, and exchange
            your coins here.
          </p>
        </div>
      </div>
      {/*currencies section end*/}

      {/*Currencies Table Section Start*/}
      <section className="table_section">
        <div className="container-fluid mobile_container">
          {/* Search box */}
          <div className="search-container">
            <label htmlFor="search" className="search-label">
              Search Currencies
            </label>
            <div className="search-box-wrapper">
              <input
                type="text"
                id="search"
                className="search-box"
                value={searchInput}
                placeholder="Type To Search For Cryptocurrency  .  .  ."
                onChange={(e) => handleSendSearchChange(e)}
              />
              <span className="search-icon-currencies">
                <img src={search_icon} alt="search" />
              </span>
            </div>
          </div>

          {/* Custom "div-based" table structure */}
          <div className="row table-header">
            <div className="col-lg-1 col-2 market-cap">#</div>
            <div className="col-lg-2 col-2">
              <h4>Coin Name</h4>
            </div>
            <div className="col-lg-1 col-2">
              <h4>Price</h4>
            </div>
            <div className="col-lg-2 col-2 h_market">
              <h4>24H</h4>
            </div>
            <div className="col-lg-2 col-3">
              <h4>24H Volume</h4>
            </div>
            <div className="col-lg-2 col-3 market-cap">
              <h4>Market Cap</h4>
            </div>
            <div className="col-lg-2 col-3">
              <h4>Available</h4>
            </div>
          </div>

          {/* Render paginated current items */}
          {loading && currentItems.length > 0 ? (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  width={width}
                  height={100 * currentItems.length} // Adjust height as needed
                  rowCount={currentItems.length}
                  rowHeight={100} // Adjust row height as needed
                  rowRenderer={({ index, key, style }) => {
                    const row = currentItems[index];
                    return (
                      <>
                        <div
                          key={index}
                          className="row table-row align-items-center py-3"
                        >
                          <div className="col-lg-1 market-cap">
                            {row.tableindex + 1}
                          </div>
                          <div className="col-lg-2 col-2 coin-info d-flex align-items-center">
                            <div>
                              <strong>{row.symbol}</strong>
                              <p className="coin-fullname">{row.name}</p>
                            </div>
                          </div>
                          <div className="col-lg-1 col-2 price_info t_data">
                            ${formatNumber(row.quote.USD.price)}
                          </div>
                          <div
                            className="col-lg-2 col-2 H_info t_data h_market"
                            style={{
                              color:
                                row.quote.USD.volume_change_24h < 0
                                  ? "red"
                                  : "green",
                            }}
                          >
                            {row.quote.USD.volume_change_24h}%
                          </div>
                          <div className="col-lg-2 col-3 t_data volum_data h_volume">
                            ${formatNumber(row.quote.USD.volume_24h)}
                          </div>
                          <div className="col-lg-2 col-md-3 t_data volum_data market-cap">
                            ${formatNumber(row.quote.USD.market_cap)}
                          </div>
                          <div className="col-lg-2 col-3">
                            <button
                              className="exchange-button d-flex align-items-center justify-content-center"
                              onClick={() => {
                                handleNavigation(row.symbol);
                              }}
                            >
                              <span className="exchange-icon"></span>
                              Exchange
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  }}
                />
              )}
            </AutoSizer>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "30px 0px",
                marginTop: "40px",
              }}
            >
              <div
                class="spinner-border"
                style={{
                  borderTopColor: "#ef960e",
                  borderBottomColor: "#ef960e",
                  borderRightColor: "#ef960e",
                }}
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </section>
      {/*Currencies Table Section End*/}
      <div className="currency-pagination-div">
        {/* Paginate component */}
        {loading && (
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            marginPagesDisplayed={1} // Number of pages to display at the beginning and end
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            activeClassName={"active_page"}
          />
        )}
      </div>
    </>
  );
};

export default OurCurrencies;
