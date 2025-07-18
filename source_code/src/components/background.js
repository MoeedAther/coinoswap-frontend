import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation from React Router
import HomeBG from "../images/HomeBG.jpg";
import HomeMobileBG from "../images/HomeMobileBG.jpg";
import OffersBG from "../images/OffersBG.jpg";
import OffersMobileBG from "../images/OfferMobileBG.jpg";
import DepositBG from "../images/OffersBG.jpg";
import DepositMobileBG from "../images/OfferMobileBG.jpg";
import HowItWorksBG from "../images/How-It-Works-Background.png";
import HowItWorksMobileBG from "../images/svg/how-it-works-mobile.svg";
import PrivacyPolicyBG from "../images/Privacy-Policy-Page-Background.png";
import PrivacyPolicyMobileBG from "../images/svg/Privacy-Policy-Mobile-BG.svg";
import TermsOfUseBG from "../images/Terms-Of-Use-Page-Background.png";
import TermsOfUseMobileBG from "../images/svg/Terms-Of-Use-Mobile-BG.svg";

const BackgroundImage = ({ children }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  const mediaQuery = window.matchMedia("(max-width: 430px)");

  // Update isMobile state based on media query
  useEffect(() => {
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mediaQuery]);

  // Function to get the background image based on the current path
  const getBackgroundImage = () => {
    const path = location.pathname;

    if (path === "/") {
      return isMobile ? HomeMobileBG : HomeBG;
    } else if (path === "/best_crypto_to_crypto_exchange") {
      return isMobile ? OffersMobileBG : OffersBG;
    } else if (path === "/how-it-works") {
      return isMobile ? HowItWorksMobileBG : HowItWorksBG;
    } else if (path === "/privacy_policy") {
      return isMobile ? PrivacyPolicyMobileBG : PrivacyPolicyBG;
    } else if (path === "/terms_of_use") {
      return isMobile ? TermsOfUseMobileBG : TermsOfUseBG;
    } else if (path === "/faq") {
      return isMobile ? TermsOfUseMobileBG : TermsOfUseBG;
    } else if (
      path === "/deposit" ||
      path === "/submit" ||
      path === "/progress" ||
      path === "/success"
    ) {
      return isMobile ? DepositMobileBG : DepositBG;
    }

    // Default background if no match
    return isMobile ? HomeMobileBG : HomeBG;
  };

  return (
    <div
      className="desktop-bg"
      style={{
        backgroundSize: "cover",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#15100D",
      }}
    >
      {children}
    </div>
    // backgroundImage: `url(${getBackgroundImage()})`
  );
};

export default BackgroundImage;
