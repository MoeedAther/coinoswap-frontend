import React, { useEffect } from 'react'
import '../css/Listing_your_exchange.css';
import '../css/Listing_exchange_responsive.css';
import Stealthex_Offer from '../images/Stealthex Offer.png';
import Exolix_logo from '../images/exolix.png';
import letsexchange from '../images/letsexchange.png';
import Godex from '../images/godex.png';
import changehero from '../images/changehero.png';
import simpleswap from '../images/simpleswap.png';
import easybit from '../images/svg/Easybit.svg';
import changelly from '../images/changelly.png';
import Change_Now_Logo from '../images/changenow.png';
import LetsExchange_Logo from '../images/letsexchange.png';
import yellow_star from '../images/yellow star.png';
import Email_Icon from '../images/Email Icon.png';
import { Helmet } from 'react-helmet';

function Listing_Your_Exchange() {

    useEffect(()=>{
        window.scrollTo(0, 0);
    });
    
  return (
    <>
    <Helmet>
    <title>List Your Exchange | Partner with CoinoSwap</title>
    <meta name="description" content="Join CoinoSwap’s Exchange Partner Network. List your exchange and earn a 50/50 profit share on fees through our non-custodial crypto exchange aggregator." />
    </Helmet>
    {/*echange_section start*/}
    <section className='echange_section'>
        <div className="container text-center">
            <h1 className='list_heading exchange_heading'>List Your <strong>Exchange</strong></h1>
            <p className='exchange_para list_para'>Join Our Exchange Partner Network By Listing Your Exchange With Coinoswap. Enhance Your Revenue Stream Through Collaboration With Us And Share Profits Generated From Exchange Fees. We Offer An Equal 50/50 Split Between Your Exchange And Coinoswap</p>
        </div>
    </section>
    {/*echange_section end*/}

    {/*echange_logo_section start*/}
    <section className='exchange_logo'>
        <div className="container">
            <div class="logo-section">
                <div class="row logo_row">
                    <div class="logo-container"><a href="https://stealthex.io/?ref=irqnpku38v" target='_blank'><img src={Stealthex_Offer} alt="StealthEX"/></a></div>
                    <div class="logo-container"><a href="https://exolix.com?ref=C790E3005081422B1D6BB7D5F8496BEC" target='_blank'><img src={Exolix_logo} alt="Exolix"/></a></div>
                    <div class="logo-container"><a href="https://easybit.com/?ref_id=hIcpnFHEd5" target='_blank'><img src={easybit} alt="Easybit" style={{width:"100%"}}/></a></div>
                </div>
                    
                <div class="row logo_row">
                    <div class="logo-container"><a href="https://godex.io/?aff_id=oWVeDq6L6iC1OUCK&utm_source=affiliate&utm_medium=Coinoswap&utm_campaign=oWVeDq6L6iC1OUCK" target='_blank'><img src={Godex} alt="Godex"/></a></div>
                    <div class="logo-container"><a href="https://changehero.io/?ref=82bf42b988334ad3ba196ca472a452b1" target='_blank'><img src={changehero} alt="ChangeHero"/></a></div>
                    <div class="logo-container"><a href="https://simpleswap.io/?ref=d5db81d8a890" target='_blank'><img src={simpleswap} alt="SimpleSwap"/></a></div>
                </div>
                    
                <div class="row logo_row">
                    <div class="logo-container"><a href="https://changelly.com/?from=btc&to=eth&amount=0.1&ref_id=hIN16twc1w1OUtVT" target='_blank'><img src={changelly} alt="Changelly"/></a></div>
                    <div class="logo-container"><a href="https://changenow.app.link/referral?link_id=d959f8dc33c43d" target='_blank'><img src={Change_Now_Logo} alt="ChangeNow"/></a></div>
                    <div class="logo-container"><a href="https://letsexchange.io/?ref_id=YCWjI7slvLMMlyHY" target='_blank'><img src={LetsExchange_Logo} alt="LetsExchange"/></a></div>
                </div>
            </div>
        </div>
    </section>
    {/*echange_logo_section end*/}

    {/*Reasons_To_List section start*/}
    <section className='reasons_section'>
        <div className="container">
            <div class="reasons-to-list">
            <h2 className='exchange_heading'>Reasons To List?</h2>
            <ul>
            <li><img src={yellow_star} alt="Icon" /> Increased Traffic, Resulting In Higher Monetization.</li>
            <li><img src={yellow_star} alt="Icon" /> Feature Alongside Established And Reliable Swap Exchanges.</li>
            <li><img src={yellow_star} alt="Icon" /> Receive Additional User Reviews For Your Swap Exchange.</li>
            <li><img src={yellow_star} alt="Icon" /> Enhance Your Overall Business Reputation.</li>
            </ul> 
            </div>
        </div>
    </section>
    {/*Reasons_To_List section start*/}

    {/*Mail section start*/}
    <section className='mail'>
        <div className="container text-center">
            <h1 className='Email_heading exchange_heading'>Email:</h1>
            <img className='mail_image' src={Email_Icon} alt="" />
            <h4 className='partnership_mail exchange_heading'><a href="mailto:Partnerships@Coinoswap.Com" target='_blank'>Partnerships@Coinoswap.Com</a></h4>
        </div>
    </section>
    {/*Mail section end*/}
    </>
  )
}

export default Listing_Your_Exchange