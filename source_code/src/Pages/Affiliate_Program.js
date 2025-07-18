import React, { useEffect, useState } from "react";
import "../css/Affiliate_Program.css";
import "../css/Affiliate_Program_responsive.css";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS
import { ToastContainer } from "react-toastify";
import yellow_star from "../images/yellow star.png";
import referral_links_icon from "../images/Referral Links Icon.png";
import exchange_widget_icon from "../images/Exchange Widget Icon.png";
import API_integration_icon from "../images/API Integration Icon.png";
import Star_Icon_black from "../images/Star_Icon_black.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

function Affiliate_Program() {
  //form js
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [valEmail, setValEmail] = useState(false);
  const [valName, setValName] = useState(false);
  const [valTerms, setValTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      email.length < 1 ? setValEmail(true) : setValEmail(false);
      fullName.length < 1 ? setValName(true) : setValName(false);
      !isChecked ? setValTerms(true) : setValTerms(false);

      if (email.length > 0 && fullName.length > 0 && isChecked === true) {
        const url = process.env.REACT_APP_URL + "/affiliate_form";
        const options = {
          email: email,
          name: fullName,
        };

        const headers = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(url, options, headers);
        if (response.data.status == 1) {
          toast.success("Form submitted successfully!", {
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
          // Clear form fields after submission
          setEmail("");
          setFullName("");
          setIsChecked(false);
        } else {
          toast.success("Form submission unsuccessful. Please try again!", {
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
    } catch (error) {
      toast.error("Form submission unsuccessful. Please try again!", {
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
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>
          Affiliate Program | Earn with CoinoSwap’s Exchange Aggregator
        </title>
        <meta
          name="description"
          content="Join the CoinoSwap Affiliate Program and earn by promoting our non-custodial crypto exchange aggregator. Enjoy high rewards for sharing convenient crypto swaps."
        />
      </Helmet>
      {/* Affiliate_Program section start */}
      <section className="Affiliate_section">
        <div className="container text-center">
          <h1 className="affiliate_heading program_heading">
            Affiliate <strong>Program</strong>
          </h1>
          <p className="affiliate_para program_para">
            Join Our Affiliate Partnership Program And Start Making Profits
            Today!
          </p>
        </div>
      </section>
      {/* Affiliate_Program section end */}

      {/*Affiliate_to_list section start*/}
      <section className="Affiliate_point_section">
        <div className="container">
          <div class="Affiliate-to-list">
            <h2 className="affiliate_heading">
              With The Coinoswap Affiliate Program
            </h2>
            <ul>
              <li>
                <img src={yellow_star} alt="Icon" />
                We Share 100% Of The Fees Equally With You For Every Exchange
                Made Using Our Affiliate Tools.
              </li>
              <li>
                <img src={yellow_star} alt="Icon" />
                We Offer Low Withdrawal Thresholds Beginning At $100.
              </li>
              <li>
                <img src={yellow_star} alt="Icon" />
                Direct Your Traffic To Utilize Your Links, Widgets, Or Your
                Integrated API.
              </li>
              <li>
                <img src={yellow_star} alt="Icon" />
                No Limit To The Amount Of Profits You Can Generate.
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/*Affiliate_to_list section start*/}

      {/*Get_Started section start*/}
      <section className="Get_Started_section">
        <div className="container text-center">
          <h1 className="Get_Started_heading affiliate_heading">
            How Can I Get Started
          </h1>
          <p className="affiliate_para Get_Started_para">
            Our Affiliate Program Is Set To Launch In The Upcoming Months,
            Providing The Following Tools For <br /> Income Generation:
          </p>
        </div>
      </section>
      {/*Get_Started section end*/}

      {/*tools section start*/}
      <section className="tools_section">
        <div class="container-fluid">
          <h1 className="affiliate_heading tool_heading">Tools</h1>
          <div className="row">
            <div className="col-lg-6">
              <div class="tool_col">
                <img
                  className="links_icon"
                  src={referral_links_icon}
                  alt="Referral Links Icon"
                />
                <div>
                  <h3 className="affiliate_heading referral_heading">
                    Referral Links
                  </h3>
                  <div className="links">
                    <div className="link_points">
                      <img className="tool_star" src={Star_Icon_black} alt="" />
                      <p className="affiliate_para tool_para">
                        Ideal for News Websites
                      </p>
                    </div>
                    <div className="link_points">
                      <img className="tool_star" src={Star_Icon_black} alt="" />
                      <p className="affiliate_para tool_para">
                        Crypto & Financial Blogs
                      </p>
                    </div>
                  </div>
                  <p className="affiliate_para earn_incom">
                    Earn income by placing referral links on your website, blog,
                    or any other platform.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div class="tool_col">
                <img
                  className="links_icon"
                  src={exchange_widget_icon}
                  alt="Exchange Widgets Icon"
                />
                <div>
                  <h3 className="affiliate_heading referral_heading">
                    Exchange Widgets
                  </h3>
                  <div className="links">
                    <div className="link_points">
                      <img className="tool_star" src={Star_Icon_black} alt="" />
                      <p className="affiliate_para tool_para">
                        Ideal for Payments Systems
                      </p>
                    </div>
                    <div className="link_points">
                      <img className="tool_star" src={Star_Icon_black} alt="" />
                      <p className="affiliate_para tool_para">News Websites</p>
                    </div>
                  </div>
                  <div className="link_points crypto_blog">
                    <img className="tool_star" src={Star_Icon_black} alt="" />
                    <p className="affiliate_para tool_para">
                      Crypto & Financial Blogs
                    </p>
                  </div>
                  <p className="affiliate_para earn_incom">
                    Incorporate an exchange widget into your website and earn
                    Bitcoin profits for every exchange made.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 API_integration">
              <div class="tool_col">
                <img
                  className="links_icon"
                  src={API_integration_icon}
                  alt="Exchange Widgets Icon"
                />
                <div>
                  <h3 className="affiliate_heading referral_heading">
                    API Integration
                  </h3>
                  <div className="links">
                    <div className="link_points">
                      <img className="tool_star" src={Star_Icon_black} alt="" />
                      <p className="affiliate_para tool_para">
                        Ideal For Crypto Swap Aggregators
                      </p>
                    </div>
                    <div className="link_points">
                      <img className="tool_star" src={Star_Icon_black} alt="" />
                      <p className="affiliate_para tool_para">
                        Payments Systems
                      </p>
                    </div>
                  </div>
                  <div className="links">
                    <div className="link_points">
                      <img className="tool_star" src={Star_Icon_black} alt="" />
                      <p className="affiliate_para tool_para">Crypto Wallets</p>
                    </div>
                    <div className="link_points">
                      <img className="tool_star" src={Star_Icon_black} alt="" />
                      <p className="affiliate_para tool_para">
                        Crypto Businesses
                      </p>
                    </div>
                  </div>
                  <p className="affiliate_para earn_incom">
                    Integrate Our Customizable White Label Solution To Monetize
                    Your Earnings From Multiple Exchange Partners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*tools section end*/}

      {/*Form section start*/}
      <section className="affiliate_form">
        <div className="container-fluid text-center">
          {/* Main Heading */}
          <h1 className="affiliate_main-heading affiliate_heading">
            Join Our Waitlist
          </h1>

          {/* Form */}
          <form className="affiliate-form" onSubmit={handleSubmit}>
            {/* Affiliate Program Label */}
            <h2 className="affiliate-subheading affiliate_heading">
              Affiliate Program
            </h2>

            {/* Form Fields in a Row */}
            <div className="affiliate_form_row">
              <div className="form_group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
                <label
                  className="affiliate-email-label"
                  style={{
                    display: valEmail === false ? "none" : "block",
                    color: "red",
                  }}
                >
                  * please fill email address
                </label>
              </div>

              <div className="form_group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                />
                <label
                  className="affiliate-name-label"
                  style={{
                    display: valName === false ? "none" : "block",
                    color: "red",
                  }}
                >
                  * please fill your name
                </label>
              </div>
            </div>

            {/* Checkbox Group */}
            <div>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  style={{ backgroundColor: "#A3A09E" }} // Checkbox background color updated
                />
                <label className="checkbox-label">
                  I have read and accept the{" "}
                  <Link to="/terms_of_use">Terms of Use</Link> and{" "}
                  <Link to="/privacy_policy">Privacy Policy</Link>.
                </label>
              </div>
              <label
                className="affiliate-terms-label"
                style={{
                  color: "red",
                  display: valTerms === false ? "none" : "block",
                }}
              >
                * please accept terms of use and privacy policy
              </label>
            </div>
            {/* Submit Button */}
            <Link to="/login">
              <button
                // type="submit"
                className="submit_button"
              >
                Send
              </button>
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}

export default Affiliate_Program;
