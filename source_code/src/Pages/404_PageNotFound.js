// src/pages/HowItWorks.js
import React, { useEffect } from "react";
import "../css/page_not_found.css";
import { Helmet } from "react-helmet";

const PageNotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="pagenotfound">
        <div>
          <h1>404</h1>
          <p>Oops... page not found.</p>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
