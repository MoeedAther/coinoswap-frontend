// src/pages/HowItWorks.js
import React, {useEffect} from 'react';
import '../css/about_us.css';
import '../css/about_us_responsive.css';
import why_use_coinoSwap from '../images/Why Use CoinoSwap Image.png'; 
import start_Point from '../images/start_Point.png';
import roadmap_img from '../images/Roadmap-img.png';
import roadmap_responsive from '../images/Roadmap_responsive.png';
import location_icon from '../images/Location Icon.png'; 
import { Helmet } from 'react-helmet';

const AboutUs = () => {

    useEffect(()=>{
        window.scrollTo(0, 0);
    })

    return (
        <>
        <Helmet>
        <title>About Us | CoinoSwap – Crypto Exchange Aggregator</title>
        <meta name="description" content="Discover CoinoSwap, a non-custodial crypto exchange aggregator offering fast and convenient swaps. Learn more about our mission to simplify crypto-to-crypto trading." />
        </Helmet>
            {/*About_CoinoSwap section start*/}
            <div className="about_CoinoSwap">
                <div className="container-fluid">
                    <div className="about_CoinoSwap_inner-content text-center">
                        <h2 className='abou_heading'>About <strong className='about_CoinoSwap_heading'>CoinoSwap!</strong></h2>
                        <p className='about_CoinoSwap_para about_para'>CoinoSwap Is A Cryptocurrency Swap Exchange Aggregator. We Provide Options To Exchange Over 1000 Currencies At Both Fixed And Floating Rate. We Operate Without Any Restrictions,Registration <br/> Obligations Or Additional Fees.</p>
                    </div>
                </div>
            </div>
            {/*About_CoinoSwap section end*/}
            
            {/*Our_mission section start*/}
            <div className="our_mission_section">
                <div className="container-fluid">
                    <div className="row text-center">
                       <div className="col-lg-12">
                       <h4 className='our_mission_heading abou_heading'>
                        Our mission
                        </h4>
                       </div>
                       <div className="row our_mission_point">
                       <div className="col-lg-3">
                        <p className='our_mission_para about_para aggregate'>
                          We Aggregate Rates From Several Crypto Swap Exchanges Through Our Affiliate Partnerships To Give You The Customer The Best Possible Rates.
                        </p>
                       </div>
                       <div className="col-lg-3">
                        <p className='our_mission_para about_para platform_ranks'>
                        Our Platform Ranks Exchanges Based On Factors Such As Best Price, Fastest Transaction Times, And Overall Customer Experience, Ensuring You Get The Most Favorable Trading Experience.
                        </p>
                       </div>
                       <div className="col-lg-3">
                        <p className='our_mission_para about_para we_handle'>
                        We Handle All The Complex Real-Time Processes, So You Have More Time For Everything Else.
                        </p>
                       </div>
                       <div className="col-lg-3">
                        <p className='our_mission_para about_para at_Coinoswap'>
                        At Coinoswap, We Aim To Streamline The Cryptocurrency Swapping Process, Making It Efficient, Cost-Effective, And Hassle-Free For Our Users.
                        </p>
                       </div>
                       </div>
                    
                    </div>
                </div>
            </div>
            {/*Our_mission section end*/}

            {/*why_use_CoinoSwap section start*/}
            <div className='why_use_CoinoSwap'>
                <div className="container-fluid">
                    <div className="row text-center why_use_CoinoSwap_inner-content">
                        <div className="col-lg-6">
                            <div className="why_use_coinoSwap_content text-left">
                                <h4 className='why_use_coinoSwap_heading abou_heading'>Why Use CoinoSwap</h4>
                                <p className='why_use_coinoSwap_para about_para'>Aside From Being A Non-Custodial Crypto Exchange Service, We Strive To Create A Smooth User Experience With Optimal Features.
                                </p>

<div className='why_use_coinoSwap_point'>
                                <div className=' feature-item '>
                                        <img className='best_rates_img' src={start_Point} alt="star" />
                                        <span>Best Rates</span>
                                    </div>
                                    <div className=' feature-item '>
                                        <img className='best_rates_img' src={start_Point} alt="star" />
                                        <span>No Registration Requirements</span>
                                    </div>
                                    <div className=' feature-item '>
                                        <img className='best_rates_img' src={start_Point} alt="star" />
                                        <span>Over 1000+ Currencies</span>
                                    </div>

                                <div className=' feature-item '>
                                        <img className='best_rates_img' src={start_Point} alt="star" />
                                        <span>10 Exchange Partners</span>
                                    </div>
                                    <div className=' feature-item '>
                                        <img className='best_rates_img' src={start_Point} alt="star" />
                                        <span>Buy Crypto With Visa Or Mastercard</span>
                                    </div>
                                    <div className=' feature-item '>
                                        <img className='best_rates_img' src={start_Point} alt="star" />
                                        <span>Infinite Swaps</span>
                                    </div>
</div>
                                {/* <ul className='why_use_coinoSwap_point'>
                                    <li className='feature-item'>
                                        <img className='best_rates_img' src={start_Point} alt="star" />
                                        <span>Best Rates</span>
                                    </li>
                                    <li className='feature-item no_registration_item'>
                                        <img className='best_rates_img' src={start_Point} alt="star" />
                                        <span>No Registration Requirements</span>
                                    </li>
                                    <li className='feature-item'>
                                        <img className='best_rates_img' src={start_Point} alt="star" />
                                        <span>Over 1000+ Currencies</span>
                                    </li>
                                    <li className='feature-item exchange_item'>
                                        <img className='best_rates_img' src={start_Point} alt="star" />
                                        <span>10 Exchange Partners</span>
                                    </li>
                                    <li className='feature-item buy_crypto_item'>
                                        <img className='best_rates_img' src={start_Point} alt="star" />
                                        <span>Buy Crypto With Visa Or Mastercard</span>
                                    </li>
                                    <li className='feature-item infinite_swaps'>
                                        <img className='best_rates_img' src={start_Point} alt="star" />
                                        <span>Infinite Swaps</span>
                                    </li>
                                </ul> */}
                            </div>
                        </div>
                        <div className="col-lg-6 why_use_CoinoSwap_img">
                           <img src={why_use_coinoSwap} alt="why_use_CoinoSwap" />
                        </div>
                    </div>
                </div>
            </div>
            {/*why_use_CoinoSwap section end*/}

            {/*Roadmap section start*/}
            <div className="roadmap_section">
                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-lg-12">
                            <h4 className='roadmap_heading abou_heading'>Roadmap</h4>
                        </div>
                    </div>
                    <div className="row roadmap_desk_img">
                        <div className="col-lg-12">
                            <img className='roadmap_img' src={roadmap_img} alt="" />
                        </div>
                    </div>
                    <div className="row roadmap_Mob_img">
                        <div className="col-lg-12">
                            <img className='roadmap_img' src={roadmap_responsive} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {/*Roadmap section end*/}

            {/*Contact Information section start*/}
            <div className="contact_info_section">
                <div className="container-fluid">
                    <div className="row text-center info_sec">
                        <div className="col-lg-12">
                            <h4 className='abou_heading contact_info_heading'>
                            Contact Information
                            </h4>
                            <img src={location_icon} alt="" className='contact_info_img'/>
                            <p className='contact_info_para about_para'>
                            Legal Registered Address:
                            </p>
                            <h4 className='contact_info_adress abou_heading'>1309 Coffeen Avenue, Suite 16200 Sheridan, Wyoming 82801
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
             {/*Contact Information section end*/}
            
        </>
    );
};

export default AboutUs;
