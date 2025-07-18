import React, {useEffect} from "react";
import '../css/availablesoon.css';
import '../css/availablesoon_responsive.css';
import { Helmet } from "react-helmet";


function AvailableSoon(){

    useEffect(()=>{
        window.scrollTo(0, 0);
    })

    return(
        <>
    <Helmet>
    <title>Coming Soon | New Features on CoinoSwap Exchange</title>
    <meta name="description" content="Stay tuned for new features on CoinoSwap’s non-custodial crypto exchange aggregator. We’re expanding to offer more convenient crypto-to-crypto options." />
    </Helmet>
        <div className="avaiable-soon">
            <h1>Preferred Wallet Partner Integration!</h1>
            <p>We're teaming up with a trusted wallet provider to offer you the ability to safely store your crypto after completing swaps or making crypto purchases on CoinoSwap. With our upcoming partnership, you'll have seamless, secure storage right at your fingertips. Stay tuned for the big announcement of our preferred wallet partner.</p>
        </div>
        </>
    );

}
export default AvailableSoon;