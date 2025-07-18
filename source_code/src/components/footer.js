import "../css/footer_responsive.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import payment_method from "../images/Payment Method.png";
import arrow from "../images/Arrow Icon.png";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

const Footer = (props) => {
  const { sendAmount } = props;
  const navigate = useNavigate();

  function navFun(sendCoinObj, getCoinObj) {
    if (sendCoinObj && getCoinObj) {
      navigate(
        `/?to=${encodeURIComponent(
          getCoinObj.name
        )}&toNetwork=${encodeURIComponent(
          getCoinObj.network
        )}&from=${encodeURIComponent(
          sendCoinObj.name
        )}&fromNetwork=${encodeURIComponent(
          sendCoinObj.network
        )}&sellAmount=${encodeURIComponent(sendAmount)}&direction=${"direct"}`
      );
    } else {
      navigate(
        `/?from=${encodeURIComponent(
          sendCoinObj.name
        )}&fromNetwork=${encodeURIComponent(
          sendCoinObj.network
        )}&sellAmount=${encodeURIComponent(sendAmount)}&direction=${"direct"}`
      );
    }
  }
  return (
    <div className="container-fluid footer-container">
      <div className="row footer footerRow_desktop">
        <div className="col-xl-4 footer-about-div">
          <div className="footer-logo">
            <a className="navbar-brand" href="#">
              <img className="img-fluid" src={logo} />
            </a>
          </div>
          <p
            className="font-grey coinoswap-logo-footer-desp"
            style={{ fontSize: "15px" }}
          >
            Coinoswap Makes Swapping Crypto Fast And Easy With Options For Both
            Fixed And Floating Rates All Conveniently Available On A Single
            Platform.
          </p>
          <div className="row payment-trustpilot-div">
            <div className="col-7 payment-logo">
              <h5 className="basement-font" style={{ color: "white" }}>
                Buy Crypto With
              </h5>
              <img src={payment_method} className="img-fluid"></img>
            </div>
            {/* <div className='col-5 trustpilot-logo'>
                    <img src={trustpilot} className='img-fluid'></img>
                    </div> */}
          </div>
          <div></div>
        </div>
        <div className="col-5 col-xl-2 footer-links-div">
          <div className="company-div">
            <h3 className="txt-white basement-font footer-headings inline-block">
              Company
            </h3>
            <Link
              to="/"
              id="thumb-cursor"
              className="font-grey footer-links pt-3 inline-block"
            >
              Home
            </Link>
            <Link
              to="/about_us"
              id="thumb-cursor"
              className="font-grey footer-links inline-block"
            >
              About Us
            </Link>
            <Link
              to="/how-it-works"
              id="thumb-cursor"
              className="font-grey footer-links inline-block"
            >
              How It Works
            </Link>
            <Link
              to="/faq"
              id="thumb-cursor"
              className="font-grey footer-links inline-block"
            >
              FAQ
            </Link>
            <a
              className="font-grey footer-links inline-block"
              id="thumb-cursor"
            >
              Our Blog
            </a>
            <Link
              to="/contact_us"
              className="font-grey footer-links inline-block"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="col-7 col-xl-3 footer-links-div supported-coins">
          <div>
            <h3 className="txt-white basement-font footer-headings">
              Supported Coins
            </h3>
            <a
              className="font-grey footer-links pt-3"
              style={{ display: "block" }}
              id="thumb-cursor"
              onClick={() => {
                navFun({ name: "btc", network: "btc" }, null);
              }}
            >
              Bitcoin
            </a>
            <a
              className="font-grey footer-links"
              style={{ display: "block" }}
              id="thumb-cursor"
              onClick={() => {
                navFun({ name: "eth", network: "eth" }, null);
              }}
            >
              Ethereum
            </a>
            <a
              className="font-grey footer-links"
              style={{ display: "block" }}
              id="thumb-cursor"
              onClick={() => {
                navFun({ name: "xrp", network: "xrp" }, null);
              }}
            >
              Ripple
            </a>
            <a
              className="font-grey footer-links"
              style={{ display: "block" }}
              id="thumb-cursor"
              onClick={() => {
                navFun({ name: "sol", network: "sol" }, null);
              }}
            >
              Solana
            </a>
            <a
              className="font-grey footer-links"
              style={{ display: "block" }}
              id="thumb-cursor"
              onClick={() => {
                navFun({ name: "ada", network: "ada" }, null);
              }}
            >
              Cardano
            </a>
            <a
              className="font-grey footer-links"
              style={{ display: "block" }}
              id="thumb-cursor"
              onClick={() => {
                navFun({ name: "bnb", network: "bsc" }, null);
              }}
            >
              Binance Coin
            </a>
            <Link
              to="/best_crypto_exchange"
              className="font-grey footer-links inline-block"
            >
              All Currencies
            </Link>
          </div>
        </div>
        <div className="col-sm-12 col-xl-3  footer-links-partners-div">
          <div>
            <h3 className="txt-white basement-font footer-headings">
              Our Partners
            </h3>
            <Link
              className="font-grey footer-links pt-3"
              style={{ display: "block" }}
              to="/affiliate_program"
            >
              Affiliate Program
            </Link>
            {/* <a className='font-grey footer-links' style={{display:'block'}}>Exchange Listing</a> */}
            <Link
              to="/listing_your_exchange"
              className="font-grey footer-links"
              style={{ display: "block" }}
            >
              Exchange Listing
            </Link>
            <div className="social_links">
              <div className="follow_us_social">
                <h3 className="txt-white basement-font footer-headings follow-us-on-social">
                  Follow Us On Social
                </h3>
              </div>

              <div className="social-icons1-footer">
                <a href="https://medium.com/@CoinoSwap" target="_blank">
                  <i class="fa-brands fa-medium fa-xl"></i>
                </a>
                <a href="https://www.tiktok.com/@coinoswap" target="_blank">
                  <i class="fa-brands fa-tiktok fa-xl"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/coinoswap/"
                  target="_blank"
                >
                  <i class="fa-brands fa-linkedin fa-xl"></i>
                </a>
                <a href="https://www.instagram.com/coinoswap" target="_blank">
                  <i className="fa-brands fa-instagram fa-xl social-instagram"></i>
                </a>
                <a href="https://www.youtube.com/@coinoswap" target="_blank">
                  <i class="fa-brands fa-youtube fa-xl social-youtube"></i>
                </a>
              </div>
              <div className="social-icons2-footer">
                <a href="https://x.com/coinoswap" target="_blank">
                  <i class="fa-brands fa-x-twitter fa-xl social-twitter"></i>
                </a>
                <a href="https://www.publish0x.com/@coinoswap" target="_blank">
                  <i class="fa-solid fa-droplet fa-xl"></i>
                </a>
                <a
                  href="https://www.reddit.com/user/CoinoSwap/"
                  target="_blank"
                >
                  <i class="fa-brands fa-reddit-alien fa-xl"></i>
                </a>
                <a href="https://www.facebook.com/coinoswap" target="_blank">
                  <i class="fa-brands fa-facebook-f fa-xl"></i>
                </a>
                <a href="https://t.me/coinoswap" target="_blank">
                  <i class="fa-brands fa-telegram fa-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row footer footerRow_mobile">
        <div className="col-xl-4 footer-about-div">
          <div className="footer-logo">
            <a className="navbar-brand" href="#">
              <img className="img-fluid" src={logo} />
            </a>
          </div>
          <p
            className="font-grey coinoswap-logo-footer-desp"
            style={{ fontSize: "15px" }}
          >
            Coinoswap Makes Swapping Crypto Fast And Easy With Options For Both
            Fixed And Floating Rates All Conveniently Available On A Single
            Platform.
          </p>
          <div>
            <div className="row payment-trustpilot-div">
              <div className="col-12 payment-logo">
                <h5 className="basement-font" style={{ color: "white" }}>
                  Buy Crypto With
                </h5>
                <img src={payment_method} className="img-fluid"></img>
              </div>
              {/* <div className='col-5 trustpilot-logo'>
                    <img src={trustpilot} className='img-fluid'></img>
                    </div> */}
            </div>
          </div>
        </div>
        <div className="row footer-div-links">
          <div className="col-6">
            <div className="company-div">
              <h3 className="txt-white basement-font footer-headings inline-block">
                Company
              </h3>
              <Link
                to="/"
                id="thumb-cursor"
                className="font-grey footer-links pt-3 inline-block"
              >
                Home
              </Link>
              <Link
                to="/about_us"
                id="thumb-cursor"
                className="font-grey footer-links inline-block"
              >
                About Us
              </Link>
              <Link
                to="/how-it-works"
                id="thumb-cursor"
                className="font-grey footer-links inline-block"
              >
                How It Works
              </Link>
              <Link
                to="/faq"
                id="thumb-cursor"
                className="font-grey footer-links inline-block"
              >
                FAQ
              </Link>
              <a
                className="font-grey footer-links inline-block"
                id="thumb-cursor"
              >
                Our Blog
              </a>
              <Link
                to="/contact_us"
                className="font-grey footer-links inline-block"
              >
                Contact
              </Link>
              <a
                className="font-grey footer-links inline-block"
                id="thumb-cursor"
              >
                Track My Order
              </a>
            </div>
          </div>
          <div className="col-6  footer-links-div supported-coins">
            <div>
              <h3 className="txt-white basement-font footer-headings">
                Supported Coins
              </h3>
              <a
                className="font-grey footer-links pt-3"
                style={{ display: "block" }}
                id="thumb-cursor"
                onClick={() => {
                  navFun({ name: "btc", network: "btc" }, null);
                }}
              >
                Bitcoin
              </a>
              <a
                className="font-grey footer-links"
                style={{ display: "block" }}
                id="thumb-cursor"
                onClick={() => {
                  navFun({ name: "eth", network: "eth" }, null);
                }}
              >
                Ethereum
              </a>
              <a
                className="font-grey footer-links"
                style={{ display: "block" }}
                id="thumb-cursor"
                onClick={() => {
                  navFun({ name: "xrp", network: "xrp" }, null);
                }}
              >
                Ripple
              </a>
              <a
                className="font-grey footer-links"
                style={{ display: "block" }}
                id="thumb-cursor"
                onClick={() => {
                  navFun({ name: "sol", network: "sol" }, null);
                }}
              >
                Solana
              </a>
              <a
                className="font-grey footer-links"
                style={{ display: "block" }}
                id="thumb-cursor"
                onClick={() => {
                  navFun({ name: "ada", network: "ada" }, null);
                }}
              >
                Cardano
              </a>
              <a
                className="font-grey footer-links"
                style={{ display: "block" }}
                id="thumb-cursor"
                onClick={() => {
                  navFun({ name: "bnb", network: "bsc" }, null);
                }}
              >
                Binance Coin
              </a>
              <Link
                to="/best_crypto_exchange"
                className="font-grey footer-links inline-block"
              >
                All Currencies
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12   footer-links-partners-div">
          <div>
            <h3 className="txt-white basement-font footer-headings">
              Our Partners
            </h3>
            <Link
              className="font-grey footer-links pt-3"
              style={{ display: "block" }}
              to="/affiliate_program"
            >
              Affiliate Program
            </Link>
            {/* <a className='font-grey footer-links' style={{display:'block'}}>Exchange Listing</a> */}
            <Link
              to="/listing_your_exchange"
              className="font-grey footer-links"
              style={{ display: "block" }}
            >
              Exchange Listing
            </Link>
          </div>
        </div>
        <div className="col-12">
          <div className="social_links">
            <div className="follow_us_social">
              <h3
                className="txt-white basement-font footer-headings follow-us-on-social"
                style={{ marginTop: "35px" }}
              >
                Follow Us On Social
              </h3>
            </div>

            <div className="social-icons1-footer">
              <a href="https://medium.com/@CoinoSwap" target="_blank">
                <i class="fa-brands fa-medium fa-xl"></i>
              </a>
              <a href="https://www.tiktok.com/@coinoswap" target="_blank">
                <i class="fa-brands fa-tiktok fa-xl"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/coinoswap/"
                target="_blank"
              >
                <i class="fa-brands fa-linkedin fa-xl"></i>
              </a>
              <a href="https://www.instagram.com/coinoswap" target="_blank">
                <i className="fa-brands fa-instagram fa-xl social-instagram"></i>
              </a>
              <a href="https://www.youtube.com/@coinoswap" target="_blank">
                <i class="fa-brands fa-youtube fa-xl social-youtube"></i>
              </a>
            </div>
            <div className="social-icons2-footer">
              <a href="https://x.com/coinoswap" target="_blank">
                <i class="fa-brands fa-x-twitter fa-xl social-twitter"></i>
              </a>
              <a href="https://www.publish0x.com/@coinoswap" target="_blank">
                <i class="fa-solid fa-droplet fa-xl"></i>
              </a>
              <a href="https://www.reddit.com/user/CoinoSwap/" target="_blank">
                <i class="fa-brands fa-reddit-alien fa-xl"></i>
              </a>
              <a href="https://www.facebook.com/coinoswap" target="_blank">
                <i class="fa-brands fa-facebook-f fa-xl"></i>
              </a>
              <a href="https://t.me/coinoswap" target="_blank">
                <i class="fa-brands fa-telegram fa-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="exchange-pairs">
        <h3 className="footer-headings">Exchange Pairs</h3>
      </div>
      <div className="row pairs-row-1">
        <div
          className="col-xl-3 pair-divs-row-1"
          id="thumb-cursor"
          onClick={() => {
            navFun(
              { name: "btc", network: "btc" },
              { name: "eth", network: "eth" }
            );
          }}
        >
          {/* Pair 1 */}
          <div className="pair pair-1">
            <div className="d-flex coin-div-width">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>BTC</span>
                <span style={{ display: "block" }}>Bitcoin</span>
              </div>
            </div>
            <div className="arrow-div">
              <img className="arrow" src={arrow}></img>
            </div>
            <div className="d-flex coin-div-width eth_div">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>ETH</span>
                <span style={{ display: "block" }}>Ethereum</span>
              </div>
            </div>
          </div>
        </div>
        {/* Pair 2 */}
        <div
          className="col-xl-3 pair-divs-row-1"
          id="thumb-cursor"
          onClick={() => {
            navFun(
              { name: "usdttrc20", network: "trx" },
              { name: "xrp", network: "xrp" }
            );
          }}
        >
          <div className="pair pair-2">
            <div className="d-flex coin-div-width">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/usdttrc20_87164a7b35.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>Tether</span>
                <span style={{ display: "block" }}>USDTTRC20</span>
              </div>
            </div>
            <div className="arrow-div">
              <img className="arrow" src={arrow}></img>
            </div>
            <div className="d-flex coin-div-width">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/xrp_3b5212fd4a.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>Ripple</span>
                <span style={{ display: "block" }}>XRP</span>
              </div>
            </div>
          </div>
        </div>
        {/* Pair 3 */}
        <div
          className="col-xl-3 pair-divs-row-1"
          id="thumb-cursor"
          onClick={() => {
            navFun(
              { name: "trx", network: "trx" },
              { name: "sol", network: "sol" }
            );
          }}
        >
          <div className="pair pair-3">
            <div className="d-flex coin-div-width">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/trx_f14430166e.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>Tron</span>
                <span style={{ display: "block" }}>Trx</span>
              </div>
            </div>
            <div className="arrow-div">
              <img className="arrow" src={arrow}></img>
            </div>
            <div className="d-flex coin-div-width">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/sol_3b3f795997.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>Solana</span>
                <span style={{ display: "block" }}>SOL</span>
              </div>
            </div>
          </div>
        </div>
        {/* Pair 4 */}
        <div
          className="col-xl-3 pair-divs-row-1"
          id="thumb-cursor"
          onClick={() => {
            navFun(
              { name: "xmr", network: "xmr" },
              { name: "btc", network: "btc" }
            );
          }}
        >
          <div className="pair pair-4 pair-4-row-1">
            <div className="d-flex coin-div-width">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/xmr_f7131e8067.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>Monero</span>
                <span style={{ display: "block" }}>XMR</span>
              </div>
            </div>
            <div className="arrow-div">
              <img className="arrow" src={arrow}></img>
            </div>
            <div className="d-flex coin-div-width btc_div">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>Bitcoin</span>
                <span style={{ display: "block" }}>BTC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row pairs-row-2">
        {/* Pair 5 */}
        <div
          className="col-xl-3 pair-divs-row-2"
          id="thumb-cursor"
          onClick={() => {
            navFun(
              { name: "eth", network: "eth" },
              { name: "sol", network: "sol" }
            );
          }}
        >
          <div className="pair pair-1">
            <div className="d-flex coin-div-width">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>Ethereum</span>
                <span style={{ display: "block" }}>ETH</span>
              </div>
            </div>
            <div className="arrow-div">
              <img className="arrow" src={arrow}></img>
            </div>
            <div className="d-flex coin-div-width">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/sol_3b3f795997.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>Solana</span>
                <span style={{ display: "block" }}>SOL</span>
              </div>
            </div>
          </div>
        </div>
        {/* Pair 6 */}
        <div
          className="col-xl-3 pair-divs-row-2"
          id="thumb-cursor"
          onClick={() => {
            navFun(
              { name: "btc", network: "btc" },
              { name: "sol", network: "sol" }
            );
          }}
        >
          <div className="pair pair-2">
            <div className="d-flex coin-div-width">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>Bitcoin</span>
                <span style={{ display: "block" }}>BTC</span>
              </div>
            </div>
            <div className="arrow-div">
              <img className="arrow" src={arrow}></img>
            </div>
            <div className="d-flex coin-div-width">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/sol_3b3f795997.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>Solana</span>
                <span style={{ display: "block" }}>SOL</span>
              </div>
            </div>
          </div>
        </div>
        {/* Pair 7 */}
        <div
          className="col-xl-3 pair-divs-row-2"
          id="thumb-cursor"
          onClick={() => {
            navFun(
              { name: "usdttrc20", network: "trx" },
              { name: "btc", network: "btc" }
            );
          }}
        >
          <div className="pair pair-3">
            <div className="d-flex coin-div-width">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/usdttrc20_87164a7b35.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>Tether</span>
                <span style={{ display: "block" }}>USDTTRC20</span>
              </div>
            </div>
            <div className="arrow-div">
              <img className="arrow" src={arrow}></img>
            </div>
            <div className="d-flex coin-div-width btc_div">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>Bitcoin</span>
                <span style={{ display: "block" }}>BTC</span>
              </div>
            </div>
          </div>
        </div>
        {/* Pair 8 */}
        <div
          className="col-xl-3 pair-divs-row-2"
          id="thumb-cursor"
          onClick={() => {
            navFun(
              { name: "eth", network: "eth" },
              { name: "trx", network: "trx" }
            );
          }}
        >
          <div className="pair pair-4">
            <div className="d-flex coin-div-width">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>ETH</span>
                <span style={{ display: "block" }}>Ethereum</span>
              </div>
            </div>
            <div className="arrow-div">
              <img className="arrow" src={arrow}></img>
            </div>
            <div className="d-flex coin-div-width">
              <img
                className="img-fluid coin-logo"
                src="https://content-api.changenow.io/uploads/trx_f14430166e.svg"
              ></img>
              <div className="coin-text">
                <span style={{ display: "block" }}>Tron</span>
                <span style={{ display: "block" }}>Trx</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row footer-border"></div>

      <div className="copy-right-div">
        <div>
          <h6 className="txt-grey privacy-txt">
            © 2025 CoinoSwap By Coinoisseurs. All rights reserved
          </h6>
        </div>
        <div className="terms-privacy" style={{ width: "20%" }}>
          <Link to="/terms_of_use" className="txt-grey privacy-txt">
            Terms Of Use
          </Link>
          <Link
            to="/privacy_policy"
            className="txt-grey privacy-txt privacy-policy"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
