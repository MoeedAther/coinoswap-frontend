// src/pages/HowItWorks.js
import React, {useEffect} from 'react';
import '../css/how-it-works.css';
import '../css/howItWorks_responsive.css';   // Import for styling
import number1 from '../images/Crypto Exchange Box.png'; 
import number2 from '../images/Crypto Exchange Box_2.png';
import main_Info from '../images/Main Info Box.png';
import scan_code from '../images/Scan To Code.png';
import exchange_progress from '../images/Exchange In Progress.png';
import Step_5_responsiveImg from '../images/Step 5 Image_responsive.png'; 
import CryptoExchange_step_2 from '../images/CryptoExchange step_2 respon.png'; 
import dottid_line1_img from '../images/Line 1.png'; 
import dottid_line2_img from '../images/Line 3.png';
import { useFetcher } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const HowItWorks = () => {

    useEffect(()=>{
        window.scrollTo(0, 0);
    });

    return (
        <>
    <Helmet>
    <title>How It Works | CoinoSwap – Fast Crypto Exchange Aggregator</title>
    <meta name="description" content="See how CoinoSwap, a non-custodial crypto exchange aggregator, makes crypto swaps fast and easy. Learn our process for secure, convenient exchanges." />
    </Helmet>
        <div>
            {/*coinoSwap_work section start*/}
            <div className="coinoSwap_work">
                <div className="container-fluid">
                    <div className="CoinoSwap_inner-content text-center">
                        <h2>How does <strong className='CoinoSwap_heading'>CoinoSwap</strong> work?</h2>
                        <p className='CoinoSwap_para'>There are 5 simple steps</p>
                    </div>
                </div>
            </div>
            {/*coinoSwap_work section end*/}

            {/*pair_amount section start*/}
            <div className='pair_amount'>
                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-lg-6">
                            <div className="col-lg-6 pairAmount_responsive_img">
                                <img className='img-fluid' src={number1} alt="crypto" />
                            </div>
                            <div className="pair_amount_content">
                                <h4 className='step_1'>Step 1:</h4>
                                <h4 className='selected_amount'>Select pair and amount.</h4>
                                <p className='pair_amount_para'>Choose The Currencies You Want To Trade By Clicking On The Down Arrow Next To The Currency And Enter The Amount You Want To Exchange. For Example, If You're Swapping BTC For ETH, Select BTC Using The Down Arrow Next To The Currency And Input The Amount In The 'You Send' Field. Then, Select ETH From The 'You Receive' Currency Down Arrow. Finally, Click The “View Offers” Button To Check Available Exchanges To Compare Rates.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 pair_amount_img">
                            <img className='img-fluid' src={number1} alt="crypto" />
                        </div>
                    </div>
                </div>
            </div>
            {/*pair_amount section end*/}

            {/*Dottid line_1 section start*/}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-7 dottied_img_1">
                        <img src={dottid_line1_img} alt="" />
                    </div>
                </div>
            </div>
            {/*Dottid line_1 section end*/}

             {/*exchange_services section start*/}
            <div className='exchange_services'>
                <div className="container-fluid">
                    <div className="row text-center">
                       <div className="col-lg-6 exchange_services_img_rsponsive">
                           <img className='img-fluid' src={CryptoExchange_step_2} alt="crypto" />
                        </div>
                        <div className="col-lg-6 exchange_services_img">
                           <img className='img-fluid' src={number2} alt="crypto" />
                        </div>
                        <div className="col-lg-6">
                            <div className="exchange_services_content">
                                <h4 className='step_2'>Step 2:</h4>
                                <h4 className='selected_services'>Select exchange service.</h4>
                                <p className='selected_services_para'>Select The Exchange Of Your Choice From The Available Exchange Partners. You'll Find Choices Like 'Best Rates,' 'Fastest Swap,' And 'Best Rated.' If You Choose 'Best Rates,' The Exchanges With The Cheapest Rates Will Be Listed First. 'Fastest Swap' Shows Exchanges That Offer The Quickest Transaction Times, And 'Best Rating' Displays The Highest-Rated Sites Based On User Reviews. Additionally, You Can Switch Between “Floating” To View Floating Rates And “Fixed” To See Fixed Rates By Clicking On The Fixed or Floating Buttons Below The Exchange Box.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*exchange_services section end*/}

              {/*Dottid line_2 section start*/}
              <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-7 dottied_img_2">
                        <img src={dottid_line2_img} alt="" />
                    </div>
                </div>
            </div>
            {/*Dottid line_2 section end*/}

            {/* confirm_wallet section start*/} 
            <div className='pair_amount confirm_wallet_adress'>
                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-lg-6">
                            <div className="col-lg-6 confirmWallet_responsive_img">
                            <img src={main_Info} alt="mainInfo" />
                            </div>
                            <div className="confirm_wallet_content">
                                <h4 className='step_1 step_3'>Step 3:</h4>
                                <h4 className='selected_amount'>Confirm wallet address.</h4>
                                <p className='confirm_wallet_para'>In The "Recipient Wallet Address" Field, Enter The ETH Wallet Address Where You Want To Receive Your Coins After The Exchange. Additionally, Enter Your BTC Address In The Refund Address Field. Optionally, You Can Include Your Email Address To Receive An Email Notification Once The Exchange Is Finalized.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 confirm_wallet_img">
                           <img className='img-fluid' src={main_Info} alt="mainInfo" />
                        </div>
                    </div>
                </div>
            </div>
            {/* confirm_wallet section end*/}

             {/*Dottid line_3 section start*/}
             <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-7 dottied_img_3">
                        <img src={dottid_line1_img} alt="" />
                    </div>
                </div>
            </div>
            {/*Dottid line_3 section end*/}

            {/* awaiting_payment section start*/}
            <div className='awaiting_payment'>
                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-lg-6 awaiting_payment_img">
                           <img className='img-fluid' src={scan_code} alt="crypto" />
                        </div>
                        <div className="col-lg-6">
                            <div className="awaiting_payment_content">
                                <h4 className='step_2 step_4'>Step 4:</h4>
                                <h4 className='selected_services'>Awaiting payment.</h4>
                                <p className='awaiting_payment_para'>
                                To complete the transaction, send your Bitcoin (BTC) to the Deposit address shown on the screen. For convenience, you can also scan the QR code provided on the page.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* awaiting_payment section end*/}

             {/*Dottid line_4 section start*/}
             <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-7 dottied_img_4">
                        <img src={dottid_line2_img} alt="" />
                    </div>
                </div>
            </div>
            {/*Dottid line_4 section end*/}

            {/* processing_swap section start*/}
            <div className='processing_swap'>
                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-lg-6 processingSwap_responsiv_img">
                           <img src={Step_5_responsiveImg} alt="mainInfo" />
                        </div>
                        <div className="col-lg-6">
                            <div className="processing_swap_content">
                                <h4 className='step_1 step_5'>Step 5:</h4>
                                <h4 className='selected_amount'>Processing swap.</h4>
                                <p className='confirm_wallet_para processing_swap_para'>Please Wait Until The Exchange Is Fully Processed And The Coins Appear In Your Wallet. If You Accidentally Close This Page, You Can Track The Status Of Your Exchange By Entering Your Order Tracker ID In The Order Tracker On The Homepage.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 processing_swap_img">
                           <img className='img-fluid' src={exchange_progress} alt="mainInfo" />
                        </div>
                    </div>
                </div>
            </div>
            {/* processing_swap section end*/}
        </div>
        </>
    );
};

export default HowItWorks;
