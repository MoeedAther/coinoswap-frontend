import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../css/faq.css";
import "../css/faq_responsive.css";
import Faq_About_icon from "../images/Faq_About Icon.png";
import Transactions_icon from "../images/Transactions Icon.png";
import Wallet_icon from "../images/Wallet Icon.png";
import Affiliate_program_icon from "../images/Affiliate Program Icon.png";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function NavLinks() {
  const [activeLink, setActiveLink] = useState("#about-coinoswap");
  const navRef = useRef(null);

  useEffect(() => {
    const navElement = navRef.current;

    gsap.to(navElement, {
      y: 200, // Maximum movement distance in pixels
      marginTop: "370%", // Add margin when scrolling
      ease: "none", // Linear movement with scroll
      scrollTrigger: {
        trigger: "body", // Trigger on body scroll
        start: "top top", // Start at the top
        end: "bottom 36.7%", // End at the bottom
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress < 0.25) {
            setActiveLink("#about-coinoswap");
          } else if (progress < 0.5) {
            setActiveLink("#transactions");
          } else if (progress < 0.75) {
            setActiveLink("#wallets");
          } else {
            setActiveLink("#affiliate-program");
          }
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleClick = (link) => {
    setActiveLink(link);

    const targetElement = document.querySelector(link);
    if (targetElement) {
      //  Using GSAP ScrollToPlugin (requires import)
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: targetElement,
          offsetY: 100,
        },
        ease: "power2.inOut",
      });
    }
  };

  return (
    <>
      <div
        ref={navRef}
        className="nl-wrapper col-lg-4 col-md-12 position_class"
      >
        <div className="nl-container">
          <h2 className="content_nav_heading faq_heading">Contents</h2>
          <div className="nl-nav">
            <div className="nl-links">
              <a
                href="#about-coinoswap"
                className={`nl-link ${
                  activeLink === "#about-coinoswap" ? "nl-active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick("#about-coinoswap");
                }}
              >
                <img src={Faq_About_icon} alt="" className="nl-icon" />
                About CoinoSwap
              </a>
              <a
                href="#transactions"
                className={`nl-link ${
                  activeLink === "#transactions" ? "nl-active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick("#transactions");
                }}
              >
                <img src={Transactions_icon} alt="" className="nl-icon" />
                Transactions
              </a>
              <a
                href="#wallets"
                className={`nl-link ${
                  activeLink === "#wallets" ? "nl-active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick("#wallets");
                }}
              >
                <img src={Wallet_icon} alt="" className="nl-icon" />
                Wallets
              </a>
              <a
                href="#affiliate-program"
                className={`nl-link ${
                  activeLink === "#affiliate-program" ? "nl-active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick("#affiliate-program");
                }}
              >
                <img src={Affiliate_program_icon} alt="" className="nl-icon" />
                Affiliate Program
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
