// src/pages/HowItWorks.js
import React, { useEffect } from "react";
import "../css/faq.css";
import "../css/faq_responsive.css";
import Faq_About_icon from "../images/Faq_About Icon.png";
import Transactions_icon from "../images/Transactions Icon.png";
import Wallet_icon from "../images/Wallet Icon.png";
import Affiliate_program_icon from "../images/Affiliate Program Icon.png";
import question_1 from "../images/Question_1.png";
import question_2 from "../images/Question_2.png";
import question_3 from "../images/Question_3.png";
import question_4 from "../images/Question_4.png";
import question_5 from "../images/Question_5.png";
import question_6 from "../images/Question_6.png";
import question_7 from "../images/Question _7.png";
import question_8 from "../images/Question_8.png";
import { Helmet } from "react-helmet";
import NavLinks from "./NavLinks";

const FAQ = () => {
  useEffect(() => {
    const sectionEls = document.querySelectorAll(".section");
    const navLinkEls = document.querySelectorAll(".nav-link");
    let currentSection = "about-coinoswap";
    window.scrollTo(0, 0);

    const handleScroll = () => {
      sectionEls.forEach((section) => {
        if (window.scrollY >= section.offsetTop) {
          currentSection = section.id;
        }
      });

      navLinkEls.forEach((link) => {
        link.classList.remove("active-context"); // Remove active class from all links
        if (link.href.includes(currentSection)) {
          link.classList.add("active-context"); // Add active class to the current section link
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <>
      <Helmet>
        <title>FAQ | CoinoSwap – Crypto Exchange Support & Help</title>
        <meta
          name="description"
          content="Get answers to frequently asked questions about CoinoSwap’s non-custodial crypto exchange aggregator. Learn about swaps, fees, security, and more."
        />
      </Helmet>
      {/*Frequently Asked Questions section start*/}
      <div className="asked_questions">
        <div className="container-fluid">
          <div className="asked_questions_inner-content text-center">
            <h2 className="faq_heading">
              Frequently Asked{" "}
              <strong className="asked_questions_heading">Questions</strong>
            </h2>
          </div>
        </div>
      </div>
      {/*Frequently Asked Questions section end*/}

      {/*Content section start*/}
      <div className="content_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              {/*about-coinoswap section start*/}
              <section className="section" id="about-coinoswap">
                <div className="about_coinoswap_item">
                  <div class="about_coinoswap_item_img">
                    <img src={Faq_About_icon} alt="" />
                  </div>
                  <h2 className="about_coinoswap_item-heading">
                    About Coinoswap
                  </h2>
                </div>
                <ul class="faq-list">
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_1} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">What Is Coinoswap?</h3>
                        <p className="faq_para">
                          CoinoSwap Is A Non-Custodial Cryptocurrency Swap
                          Exchange Aggregator. Our Platform Allows Users The
                          Ability To Swap Over 1000 Cryptocurrencies Through Our
                          Exchange Partners At Both Fixed And Floating Rates. We
                          Operate Without Any Registration Obligations Or Any
                          Additional Fees. At CoinoSwap We Provide Infinite
                          Swaps At The Best Rates.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_2} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          What Makes Coinoswap Different From Other Swap
                          Exchanges?
                        </h3>
                        <p className="faq_para">
                          CoinoSwap constantly tracks optimal exchange rates
                          from multiple cryptocurrency exchange providers,
                          giving users the ability to select the most profitable
                          choice without having to browse through numerous
                          crypto exchanges. The exchange process has been
                          optimized for speed and simplicity without any
                          additional fees.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_3} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          What Makes Coinoswap Trustworthy?
                        </h3>
                        <p className="faq_para">
                          As a non-custodial exchange, we eliminate any risks
                          related to custody in our transactions since your
                          funds are not stored on our platform.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_4} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          Is registration required to use CoinoSwap?
                        </h3>
                        <p className="faq_para">
                          You can easily perform a swap without the need for
                          registration or disclosing any personal details.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_5} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          Can I use CoinoSwap to purchase cryptocurrency with
                          fiat?
                        </h3>
                        <p className="faq_para">
                          Yes, Select The “Buy Crypto” Option In The Exchange
                          Box And Click On The “View Offers” Button And Choose
                          From The List Of Exchange Partners Of Your Choice.
                          Please Take Note Of KYC As Per Our Exchange Partners
                          Requirements.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_6} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          How much does CoinoSwap charge?
                        </h3>
                        <p className="faq_para">
                          CoinoSwap shares the commissions with the exchange
                          providers instead of adding additional fees for users.
                          This means that you won't have to pay more than what
                          you would normally pay when dealing directly with the
                          integrated exchanges. The conversion rate already
                          includes all the exchange costs, with the exception of
                          the network fees charged by miners.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
              {/*about-coinoswap section end*/}

              {/*transactions section start*/}
              <section className="section" id="transactions">
                <div className="about_coinoswap_item">
                  <div class="about_coinoswap_item_img">
                    <img src={Transactions_icon} alt="" />
                  </div>
                  <h2 className="about_coinoswap_item-heading">Transactions</h2>
                </div>
                <ul class="faq-list">
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_1} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          What is the minimum and maximum exchange amounts on
                          CoinoSwap?
                        </h3>
                        <p className="faq_para">
                          There is no maximum limit, but please be aware that
                          there are minimum restrictions in place for each coin.
                          These restrictions range from $1 to $20, depending on
                          the specific coin.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_2} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          How soon can your order be processed?
                        </h3>
                        <p className="faq_para">
                          The Time It Takes For Your Exchange Order To Finalize
                          Typically Ranges From 3 To 50 Minutes, Though It Could
                          Extend Further Due To Network Congestion. This
                          Timeframe Is Determined By The Speed At Which The
                          Network Confirms The Transaction And Creates A New
                          Block In The Blockchain Network. Note That Various
                          Coins Have Different Confirmation Times.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_3} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          What happens if I deposit a coin or token that isn't
                          supported?
                        </h3>
                        <p className="faq_para">
                          We cannot guarantee a refund if you send an asset that
                          CoinoSwap does not support. Please keep this in mind
                          to ensure the security of your funds at all times. You
                          can find a complete list of supported assets here.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_4} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          What is the expected floating exchange rate?
                        </h3>
                        <p className="faq_para">
                          The floating rate is the rate at this exact moment.
                          Please be aware that it takes time to send the deposit
                          and confirm the transaction, so given the market's
                          volatility, you can receive somewhat less or
                          substantially more than you anticipated.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_5} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          Why are the amounts received different from the
                          original estimate?
                        </h3>
                        <p className="faq_para">
                          The Swap Takes Some Time To Complete. Due To The High
                          Volatility Of Cryptocurrencies, The Floating Rate May
                          Change While Your Exchange Is Still Running. As A
                          Result, The Amount You Receive Can Differ Slightly
                          From What You Previously Anticipated.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_6} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          How can I cancel a transaction?
                        </h3>
                        <p className="faq_para">
                          Blockchain transactions cannot be undone or otherwise
                          are irreversible. The transaction cannot be stopped
                          once the funds has been sent. Before sending funds,
                          please double-check all the payment information.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_7} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          What Is a Transaction Hash?
                        </h3>
                        <p className="faq_para">
                          In The blockchain, every transaction is recorded with
                          a unique identification code known as a transaction
                          hash, often referred to as “tX”. you can use this tX
                          code to track and verify the status of your
                          transaction within the blockchain.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_8} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">Will I need to KYC?</h3>
                        <p className="faq_para">
                          At CoinoSwap, we partner with trusted crypto exchanges
                          to bring you the best rates. Please note that our
                          partners may be required to perform AML/KYC checks in
                          line with global regulations.
                          <br />
                          <br />
                          Their systems may trigger selective KYC requests if
                          any red flags or suspicious activity is detected.{" "}
                          <br />
                          <br />
                          Before swapping, check the KYC Risk Indicator (colored
                          circles, specifically green, yellow, and red) on the
                          View Offers page to see how likely a KYC check is for
                          each offer. <br />
                          <br />
                          <b>Understanding KYC Risk Indicators:</b>
                          <br />
                          <span style={{ filter: "brightness(0.4)" }}>
                            🟢
                          </span>{" "}
                          Dark Green Circle – KYC Is Not Required No personal
                          verification is expected under any normal
                          circumstances. These exchanges support fully anonymous
                          transactions.
                          <br />
                          🟢 Light Green Circle – KYC Rarely Required KYC is
                          almost never requested unless highly unusual activity
                          is detected. Most users will not be asked to verify
                          their identity.
                          <br />
                          🟡 Yellow Circle – KYC May Occasionally Be Required In
                          certain cases, such as high transaction volumes or
                          specific crypto pairings, the exchange may prompt for
                          KYC verification.
                          <br />
                          🔴 Light Red Circle – KYC Is Frequently Required Most
                          transactions on this platform are likely to trigger a
                          KYC check. You should be prepared to provide
                          identification documents if prompted.
                          <br />
                          <span style={{ filter: "brightness(0.4)" }}>
                            🔴
                          </span>{" "}
                          Dark Red Circle – KYC Is Always Required All users
                          must complete identity verification before
                          transactions can be processed. No exchanges will be
                          approved without full KYC compliance.
                          <br />
                          <br />
                          Please note that CoinoSwap itself does not require
                          registration or collect user identity information.
                          However, once you choose an offer from one of our
                          partners, you will be subject to that partner's terms
                          and KYC policy.
                          <br />
                          <br />
                          If you have any questions about the KYC policies of a
                          specific partner, feel free to contact our support
                          team or refer directly to the exchange’s compliance
                          documentation.
                          <br />
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
              {/*transactions section end*/}

              {/*
                            wallets section start*/}
              <section className="section" id="wallets">
                <div className="about_coinoswap_item">
                  <div class="about_coinoswap_item_img">
                    <img src={Wallet_icon} alt="" />
                  </div>
                  <h2 className="about_coinoswap_item-heading">Wallets</h2>
                </div>
                <ul class="faq-list">
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_1} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">What is wallet address?</h3>
                        <p className="faq_para">
                          A Cryptocurrency Wallet Address Is A Unique
                          Combination Of Letters And Numbers, Usually Spanning
                          Between 26 To 35 Characters In Length But Depending On
                          The Coin Or Token Can Be Much Longer. Typically, It
                          Appears Along The Lines Of:
                          3j98t1wpez73cnmqviecrnyiwrnqrhwnly
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_2} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          Where do I get a cryptocurrency wallet address?
                        </h3>
                        <p className="faq_para">
                          When you've chosen the cryptocurrency coin you want to
                          buy, look for a trustworthy wallet. There is usually
                          an official wallet for each cryptocurrency.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_3} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          What Is A Recipient Address And What Happens If I
                          Deposit A Coin Or Token That Isn’t Supported?
                        </h3>
                        <p className="faq_para">
                          The recipient address refers to the wallet address
                          where the funds will be sent. When exchanging or
                          purchasing cryptocurrency, it's essential to designate
                          the correct crypto wallet address for the transaction.
                          Each coin or token has its own unique wallet address.
                          Ensure you enter the correct wallet addresses in the
                          appropriate fields. <br />
                          <br /> Sending cryptocurrency to an incorrect address
                          or blockchain network, such as sending Bitcoin to an
                          Ethereum address, can result in a loss of funds. It's
                          vital to exercise extreme caution when inputting your
                          wallet addresses and to double-check them before
                          proceeding with the transaction. We cannot guarantee a
                          refund if you send an asset to the incorrect address.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_4} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          What Is A Destination Tag And Why Is It Needed?
                        </h3>

                        <p className="faq_para">
                          A Destination Tag, also known as a Memo, is additional
                          wallet address information required when transferring
                          funds to specific types of wallets or central exchange
                          platforms. It's often used in transactions with
                          cryptocurrencies such as XRP (Ripple), XLM (Stellar
                          Lumens), BNB (Binance Coin), and other crypto assets
                          using shared address systems.
                          <br />
                          <br />
                          The Destination Tag is very important and should
                          always be used when sending to a recipient address
                          that requires it. Copy the Destination Tag (Memo) from
                          your recipient’s wallet and paste it into the
                          “Destination Tag” field.
                          <br />
                          <br />
                          Be aware that failing to provide the Destination Tag
                          will almost always result in your funds not being
                          received by the intended recipient. This may lead to
                          potential loss of funds that cannot be refunded.
                          Additionally, remember to include the Destination Tag
                          Refund if there is a possibility that your sent funds
                          may need to be returned to you. Simply copy the
                          Destination Tag or Memo associated with your wallet
                          address and paste it into the "Destination Tag Refund"
                          field.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
              {/*wallets section end*/}

              {/*affiliate-program section start*/}
              <section className="section" id="affiliate-program">
                <div className="about_coinoswap_item">
                  <div class="about_coinoswap_item_img">
                    <img src={Affiliate_program_icon} alt="" />
                  </div>
                  <h2 className="about_coinoswap_item-heading">
                    Affiliate Program
                  </h2>
                </div>
                <ul class="faq-list">
                  <li>
                    <div class="faq-item">
                      <div class="faq_img">
                        <img src={question_1} alt="" />
                      </div>
                      <div class="faq-content">
                        <h3 className="faq_heading">
                          How can I join the affiliate program?
                        </h3>
                        <p className="faq_para">
                          It's easy to sign up as a CoinoSwap affiliate. You
                          only need to click the "Affiliate program" button on
                          the home page and register and select the affiliate
                          tools that are most effective for you.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
              {/*affiliate-program section end*/}
            </div>
            {/*right colum content section start*/}
            {/* <div className="col-lg-4 col-md-12 position_class"> */}
              {/* <div className="content_nav"> */}
                {/* <h2 className="content_nav_heading faq_heading">Contents</h2> */}
                {/* <nav id="navbar">
                                    <a href="#about-coinoswap" class="nav-link active-context">
                                        <img src={Faq_About_icon} alt="" className="nav-icon" />About CoinoSwap
                                    </a>
                                    <a href="#transactions" class="nav-link">
                                        <img src={Transactions_icon} alt="" className="nav-icon" />Transactions
                                    </a>
                                    <a href="#wallets" class="nav-link">
                                        <img src={Wallet_icon} alt="" className="nav-icon" />Wallets
                                    </a>
                                    <a href="#affiliate-program" class="nav-link">    
                                      <img src={Affiliate_program_icon} alt="" className="nav-icon" />Affiliate Program
                                    </a>
                                </nav>   */}
                            
                <NavLinks />
              {/* </div> */}
            {/* </div> */}
            {/*right colum content section end*/}
          </div>
        </div>
      </div>
      {/*Content section end*/}
    </>
  );
};

export default FAQ;
