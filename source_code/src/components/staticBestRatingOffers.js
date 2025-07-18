import React, {useState, useEffect} from 'react';
import changenow from '../images/ChangeNow Offer.png';
import changelly from '../images/changelly_offer.png';
import simpleswap from '../images/SimpleSwap Offer.png';
import changehero from '../images/Change Hero Offer.png';
import letsexchange from '../images/LetsExchange Offer.png';
import stealthex from '../images/Stealthex Offer.png';
import godex from '../images/Godex Offers.png';
import exolix from '../images/Exolix Offer.png';
import green from '../images/Not Required.png';
import yellow from '../images/On Occassion.png';
import red from '../images/Required.png';
import rate from '../images/Rate.png';
import trustpilot from '../images/Trustpilot Rating Logo.png';
import fivestar from '../images/fivestar.png';
import swapicon from '../images/swapicon.png';
import etaicon from '../images/ETA Icon.png';
import { Link } from 'react-router-dom';


const StaticBestRatingOffers=(props)=>{


    return(<>
    <div className='offer-div' style={{marginBottom:"18px", backgroundColor:props.index=="0"?"#F9D288":"white"}}>
                <div className='offer-top'>
                <div className='offerlogo-offertype'>
                    {/* Offer Exchange Logo */}
                        <div className='offer_logo d-flex'>
                            <img style={{width:props.name=="changenow"?"50px":"110px"}} src={props.name=="changenow"?changenow:(props.name=="changelly"?changelly:(props.name=="simpleswap"?simpleswap:(props.name=="simpleswap"?simpleswap:(props.name=="changehero"?changehero:(props.name=="letsexchange"?letsexchange:(props.name=="stealthex"?stealthex:(props.name=="godex"?godex:exolix)))))))} className='img-fluid'></img>
                        </div>      

                    {/* Offer Type Fixed or Float */}                  
                    <div className='offer-type'>
                        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:"40px", marginRight:"6px", fontSize:"0.7rem"}}>Rate Type:</div>
                        <div className='offer-type-div' style={{ display:'flex', justifyContent:'center', alignItems:'center', fontSize:"0.7rem"}}>{props.type}</div>
                    </div>
                    </div>

                    <div className='eta-kyc'>
                    {/* ETA Time */}
                    <div className='eta-time-div'>
                    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', marginRight:"6px", fontSize:"0.7rem"}}>ETA:</div>
                    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width:"18px",  marginRight:"6px"}}><img src={etaicon} className='img-fluid'></img></div>
                    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', fontWeight:"bold", color:"#EE3207", fontSize:"0.7rem"}}>{props.eta}</div>
                    </div>

                    {/* KYC */}
                    <div className='kyc-div'>
                    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', fontSize:"0.7rem"}}>KYC:</div>
                    <div className='vh-center kyc-circle'>
                        <img className='img-fluid' src={props.kyc==="Rarely Required"?green:(props.kyc==="On Occassion"?yellow:red)}></img>
                    </div>
                    <div className='basement-font' style={{ display:'flex', justifyContent:'center', alignItems:'center', fontWeight:"bold", fontSize:"0.7rem"}}>{props.kyc}</div>
                    </div>
                </div>
                </div>
                <div className='row offer-bottom' style={{height:"81px", backgroundColor:"black", margin:"0px 1px",  borderRadius:"20px", alignItems: "center"}}>
                    <div className='col-6 col-xl-4'>
                        <div ><img className='img-fluid' src={rate} style={{width:"80px", display:props.nooffer?props.dotswhilefetch?"block":"none":"block"}}></img></div>
                        <div className="dot-pulse" style={{margin:"4.3% 16%", display:props.nooffer?props.dotswhilefetch?"block":"none":"block"}}></div>
                        <div className='basement-font' style={{color:"#F0970D", fontSize:"1.3rem", display:props.nooffer?props.dotswhilefetch?"none":"block":"none"}}>No Offer</div>
                    </div>
                    <div className='col-6 col-xl-4' style={{display:"flex", justifyContent:"center"}}>
                        <div>
                        <div className='trustpilot-img'><img className='img-fluid' src={trustpilot}></img></div>
                        <div style={{display:"flex", justifyContent:"center"}}>
                        <div style={{width:"75px", height:"13px", display:"flex"}}><img className='img-fluid' src={fivestar}></img></div>
                        <span style={{color:'#928F8C', marginLeft:"5px", fontWeight:"bold", fontSize:"0.7rem"}}>{props.rating}</span>
                        </div>
                        </div>
                    </div>
                    <div className='col-xl-4 ' style={{display:"flex", justifyContent:"end"}}>
                        <div className='dummy-exchange-link vh-center' style={{backgroundColor:"white", height:"50px", borderRadius:"10px"}}>
                            <img src={swapicon} style={{width:"18px", marginRight:"10px"}}></img>
                            <span className='basement-font' style={{color:"black", fontSize:"1rem"}}>Exchange</span>
                        </div>
                    </div>
                </div>
                <div className='offer-type-txt' style={{width:"100px", backgroundColor:"#0D0D0B", textAlign:"center", display:props.index=="0"?"flex":"none", position:"absolute", right:"62px", top:"184px"}}>
                <span className="basement-font" style={{color:"#F9D288", fontSize:"0.8rem", width:props.offertype=="fastestswap"?"120px":"100px"}}>{props.offertype=="fastestswap"?"Fastest Swap":(props.offertype=="bestrating"?"Best Rated":"Best Rate")}</span>
    </div>
    </div>
    </>);
}

export default StaticBestRatingOffers;