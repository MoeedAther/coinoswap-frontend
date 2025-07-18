import React, { useEffect, useState } from 'react';
import logo from '../images/logo.png';
import language from '../images/language.png';
import spain from '../images/Spain Flag.png';
import france from '../images/France Flag.png';
import germany from '../images/GER.png';
import italy from '../images/Italy Icon.png';
import portugal from '../images/Portugal Flag.png';
import swedon from '../images/SWE.png';
import china from '../images/CHI.png';
import japan from '../images/JPN.png';
import pakistan from '../images/Pakistan Flag.png';
import saudia from '../images/Arabia Flag.png';
import russia from '../images/Russia Flag.png';
import turkey from '../images/Turkey Flag.png';
import mobilemenu from '../images/Menu.png';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import changenow_black from '../images/changenow.png';
import changelly_black from '../images/changelly.png';
import changehero_black from '../images/changehero.png';
import exolix_black from '../images/exolix.png';
import godex_black from '../images/godex.png';
import letsexchange_black from '../images/letsexchange.png';
import simpleswap_black from '../images/simpleswap.png';
import stealthex_black from '../images/stealthex.png';
import '../css/navbar.css';
import ordertracker from '../images/Order Tracker.png';
import unitedstates from '../images/language.png';
import england from '../images/England Flag.png';
import {standerdiseStatus} from '../Js/functions.js';

 

const SideMenue = (props) => {

    const navigate=useNavigate();
    const [orderid, setOrderId]=useState("");
    const [errorMessage, setErrorMessage]=useState("");
    const [errorVisibility, setErrorVisibility]=useState(false);
    
    function formatCustomDate(isoDateStr) {
        const date = new Date(isoDateStr);
      
        // Get year, month, and day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
      
        // Get hours, minutes, and seconds
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        // Determine AM or PM
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        // Convert 24-hour time to 12-hour time
        hours = hours % 12 || 12; // If hours is 0, make it 12 (for midnight)
      
        // Format final string as YYYY-MM-DD H:MM:SS AM/PM
        const txdate=`${year}-${month}-${day}`;
        const txtime= `${hours}:${minutes}:${seconds} ${ampm}`
        const formattedDate = {
          txtime:txtime,
          txdate:txdate
        }
        return formattedDate;
      }

    const notify=async()=>{
    
        if(orderid.length==0){

        setErrorMessage("please enter complete order id");
        setErrorVisibility(true);

        }else{
          try {
            const url=process.env.REACT_APP_URL+"/tx/status";
            const options={
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({id:orderid})
            }
          
          const response=await fetch(url, options);
          const data=await response.json();
          //This if statement will exicute if transaction exists in database
          if(data.message=="Transaction Found"){
              const status=standerdiseStatus(data.tx.status);
              //This if statement will exicute if transaction is in process or failed
              if(status==="exchanging" || status==="confirming" || status==="refunded" || status==="failed"){
                sessionStorage.setItem("ordertrackerid", data.tx.transaction_id);
                sessionStorage.setItem('txhashlink', data.tx.tx_hash_link);
                sessionStorage.setItem('txhash', data.tx.tx_hash);
                sessionStorage.setItem("depositaddress", data.tx.deposit_address);
                sessionStorage.setItem('recipientaddress', data.tx.recipient_address);
                sessionStorage.setItem("local_exchange_type", data.tx.transaction_type);
                sessionStorage.setItem("local_send_crypto_name", data.tx.sell_coin_name);
                sessionStorage.setItem("local_get_crypto_name", data.tx.get_coin_name);
                sessionStorage.setItem("local_send_crypto_logo", data.tx.sell_coin_logo);
                sessionStorage.setItem("local_get_crypto_logo", data.tx.get_coin_logo);
                sessionStorage.setItem("local_send_amount", data.tx.sell_amount);
                sessionStorage.setItem("local_get_amount", data.tx.get_amount);
                sessionStorage.setItem("local_exchange_logo", data.tx.exchange_partner=="changenow"?changenow_black:(data.tx.exchange_partner=="changelly"?changelly_black:(data.tx.exchange_partner=="simpleswap"?simpleswap_black:(data.tx.exchange_partner=="simpleswap"?simpleswap_black:(data.tx.exchange_partner=="changehero"?changehero_black:(data.tx.exchange_partner=="letsexchange"?letsexchange_black:(data.tx.exchange_partner=="stealthex"?stealthex_black:(data.tx.exchange_partner=="godex"?godex_black:exolix_black))))))));
                setErrorMessage("");
                setErrorVisibility(false);
                props.hideshowfun();
                navigate(`/progress?fromCurrency=${encodeURIComponent(data.tx.sell_coin_name)}&toCurrency=${encodeURIComponent(data.tx.get_coin_name)}&fromCurrencySymbol=${encodeURIComponent(data.tx.sell_coin)}&toCurrencySymbol=${encodeURIComponent(data.tx.get_coin)}&fromCurrencyNetwork=${data.tx.sell_coin_network}&toCurrencyNetwork=${data.tx.get_coin_network}&fromCurrencyImage=${encodeURIComponent(data.tx.sell_coin_logo)}&toCurrencyImage=${encodeURIComponent(data.tx.get_coin_logo)}&rate=${encodeURIComponent(data.tx.rate)}&partner=${encodeURIComponent(data.tx.exchange_partner)}&fixed=${encodeURIComponent(data.tx.transaction_type)}&sellAmount=${encodeURIComponent(data.tx.sell_amount)}&transactionId=${encodeURIComponent(data.tx.transaction_id)}&depositAddress=${encodeURIComponent(data.tx.deposit_address)}&recipientAddress=${encodeURIComponent(data.tx.recipient_address)}&depositExtraId=${encodeURIComponent(data.tx.deposit_extraid==null || data.tx.deposit_extraid==""?false:data.tx.deposit_extraid)}&recipientExtraId=${encodeURIComponent(data.tx.recipient_extraid ==null || data.tx.recipient_extraid==""?false:data.tx.recipient_extraid)}&refundExtraId=${encodeURIComponent(data.tx.refund_extraid==null || data.tx.refund_extraid==""?false:data.tx.refund_extraid)}&timerValue=${encodeURIComponent(1)}&depositStatus=${encodeURIComponent(1)}&transactionHash=${data.tx.tx_hash}&transactionHashLink=${data.tx.tx_link}`);
    
            //This else if statement will exicute if transaction has successfully processed
            }else if(status==="finished"){
              sessionStorage.setItem("ordertrackerid", data.tx.transaction_id);
              sessionStorage.setItem('txhashlink', data.tx.tx_hash_link);
              sessionStorage.setItem('txhash', data.tx.tx_hash);
              sessionStorage.setItem("depositaddress", data.tx.deposit_address);
              sessionStorage.setItem('recipientaddress', data.tx.recipient_address);
              sessionStorage.setItem("local_exchange_type", data.tx.transaction_type);
              sessionStorage.setItem("local_send_crypto_name", data.tx.sell_coin_name);
              sessionStorage.setItem("local_get_crypto_name", data.tx.get_coin_name); 
              sessionStorage.setItem("local_send_crypto_logo", data.tx.sell_coin_logo);
              sessionStorage.setItem("local_get_crypto_logo", data.tx.get_coin_logo);
              sessionStorage.setItem("local_send_amount", data.tx.sell_amount);
              sessionStorage.setItem("local_get_amount", data.tx.get_amount);
              sessionStorage.setItem('completionTime', formatCustomDate(data.tx.completion_time).txtime);
              sessionStorage.setItem('completionDate', formatCustomDate(data.tx.completion_time).txdate);
              sessionStorage.setItem("local_exchange_logo", data.tx.exchange_partner=="changenow"?changenow_black:(data.tx.exchange_partner=="changelly"?changelly_black:(data.tx.exchange_partner=="simpleswap"?simpleswap_black:(data.tx.exchange_partner=="simpleswap"?simpleswap_black:(data.tx.exchange_partner=="changehero"?changehero_black:(data.tx.exchange_partner=="letsexchange"?letsexchange_black:(data.tx.exchange_partner=="stealthex"?stealthex_black:(data.tx.exchange_partner=="godex"?godex_black:exolix_black))))))));
              setErrorMessage("");
              setErrorVisibility(false);
              props.hideshowfun();
              navigate(`/success?transactionId=${encodeURIComponent(data.tx.transaction_id)}&transactionHash=${encodeURIComponent(data.tx.tx_hash)}&transactionHashLink=${encodeURIComponent(data.tx.tx_hash_link)}&depositAddress=${encodeURIComponent(data.tx.deposit_address)}&recipientAddress=${encodeURIComponent(data.tx.recipient_address)}&depositExtraId=${encodeURIComponent(data.tx.deposit_extraid==null || data.tx.deposit_extraid==""?false:data.tx.deposit_extraid)}&recipientExtraId=${encodeURIComponent(data.tx.recipient_extraid ==null || data.tx.recipient_extraid==""?false:data.tx.recipient_extraid)}&refundExtraId=${encodeURIComponent(data.tx.refund_extraid==null || data.tx.refund_extraid==""?false:data.tx.refund_extraid)}&fromCurrencySymbol=${encodeURIComponent(data.tx.sell_coin)}&fromCurrency=${encodeURIComponent(data.tx.sell_coin_name)}&sellAmount=${encodeURIComponent(data.tx.sell_amount)}&toCurrencySymbol=${encodeURIComponent(data.tx.get_coin)}&toCurrency=${encodeURIComponent(data.tx.get_coin_name)}&rate=${encodeURIComponent(data.tx.get_amount)}&partner=${(data.tx.exchange_partner)}&fixed=${encodeURIComponent(data.tx.transaction_type)}&fromCurrencyImage=${encodeURIComponent(data.tx.sell_coin_logo)}&toCurrencyImage=${encodeURIComponent(data.tx.get_coin_logo)}&completionTime=${encodeURIComponent(formatCustomDate(data.tx.completion_time).txtime)}&completionDate=${encodeURIComponent(formatCustomDate(data.tx.completion_time).txdate)}`)
    
              // Incase status doesnot match above provided statuses then this else statement will process and show user transaction not found message
            }else if(status==="waiting"){
              sessionStorage.setItem("ordertrackerid", data.tx.transaction_id);
              sessionStorage.setItem('txhashlink', data.tx.tx_hash_link);
              sessionStorage.setItem('txhash', data.tx.tx_hash);
              sessionStorage.setItem("depositaddress", data.tx.deposit_address);
              sessionStorage.setItem('recipientaddress', data.tx.recipient_address);
              sessionStorage.setItem("local_exchange_type", data.tx.transaction_type);
              sessionStorage.setItem("local_send_crypto_name", data.tx.sell_coin_name);
              sessionStorage.setItem("local_get_crypto_name", data.tx.get_coin_name); 
              sessionStorage.setItem("local_send_crypto_logo", data.tx.sell_coin_logo);
              sessionStorage.setItem("local_get_crypto_logo", data.tx.get_coin_logo);
              sessionStorage.setItem("local_send_amount", data.tx.sell_amount);
              sessionStorage.setItem("local_get_amount", data.tx.get_amount);
              sessionStorage.setItem("local_exchange_logo", data.tx.exchange_partner=="changenow"?changenow_black:(data.tx.exchange_partner=="changelly"?changelly_black:(data.tx.exchange_partner=="simpleswap"?simpleswap_black:(data.tx.exchange_partner=="simpleswap"?simpleswap_black:(data.tx.exchange_partner=="changehero"?changehero_black:(data.tx.exchange_partner=="letsexchange"?letsexchange_black:(data.tx.exchange_partner=="stealthex"?stealthex_black:(data.tx.exchange_partner=="godex"?godex_black:exolix_black))))))));
              setErrorMessage("");
              setErrorVisibility(false);
              props.hideshowfun();
              navigate(`/submit?fromCurrency=${encodeURIComponent(data.tx.sell_coin_name)}&toCurrency=${encodeURIComponent(data.tx.get_coin_name)}&fromCurrencySymbol=${encodeURIComponent(data.tx.sell_coin)}&toCurrencySymbol=${encodeURIComponent(data.tx.get_coin)}&fromCurrencyNetwork=${data.tx.sell_coin_network}&toCurrencyNetwork=${data.tx.get_coin_network}&fromCurrencyImage=${encodeURIComponent(data.tx.sell_coin_logo)}&toCurrencyImage=${encodeURIComponent(data.tx.get_coin_logo)}&rate=${encodeURIComponent(data.tx.get_amount)}&partner=${encodeURIComponent(data.tx.exchange_partner)}&fixed=${encodeURIComponent(data.tx.transaction_type)}&sellAmount=${encodeURIComponent(data.tx.sell_amount)}&transactionId=${encodeURIComponent(data.tx.transaction_id)}&depositAddress=${encodeURIComponent(data.tx.deposit_address)}&recipientAddress=${encodeURIComponent(data.tx.recipient_address)}&depositExtraId=${encodeURIComponent(data.tx.deposit_extraid==null || data.tx.deposit_extraid==""?false:data.tx.deposit_extraid)}&recipientExtraId=${encodeURIComponent(data.tx.recipient_extraid ==null || data.tx.recipient_extraid==""?false:data.tx.recipient_extraid)}&refundExtraId=${encodeURIComponent(data.tx.refund_extraid==null || data.tx.refund_extraid==""?false:data.tx.refund_extraid)}&timerValue=${encodeURIComponent(1)}&depositStatus=${encodeURIComponent(1)}`);
            // Incase status doesnot match above provided statuses then this else statement will process and show user transaction not found message
            }
          
          // This else statement will exicute if transaction doesnot exists in database
          }else{
            setErrorMessage("Transaction not found!");
            setErrorVisibility(true);
          }
    
          } catch (error) {
            setErrorMessage("network error!");
            setErrorVisibility(true);
          }
        }
    
      }

  return (
    <nav className="sidebar" id="sidebar" style={props.style}>
    <div className='sidemenu_close_btn'><span onClick={()=>{props.hideshowfun()}}><i class="fa-solid fa-x"></i></span></div>
    <div className='sidebar_container'>
    <img src={ordertracker}></img>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Order Tracker ID" onChange={(e)=>{setOrderId(e.target.value)}}></input>
    <p style={{display:errorVisibility?"block":"none", color:"red", marginBottom:"10px"}}>{errorMessage}</p>
    <button type="button" class="btn sidebarbtn" onClick={()=>{notify()}}>Track Order</button>
    <div className='sidemenu_divider_one'></div>
    <ul className="sidebar--inner">
        {props.links.map((link, index) => {
          return (
            <li key={index} className="sidebar--inner-item">
              <img src={link.icon}></img>
              <Link className="sidebar--inner-item__link" onClick={(e)=>{e.preventDefault(); props.sidemenuNavigation(link.link)}}>
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className='sidemenu_divider_two'></div>
      <div id="accordion">
  <div class="card card-sidemenu">
    <div class="card-header card-header-sidemenu" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <button class="btn btn-link" style={{color:"rgb(81 78 78)"}}>
        <img src={props.lang} style={{width:"35px", marginRight:"20px"}}></img><span>English US</span>
        </button>
        <i class="fa-solid fa-chevron-down shevron-sidemenu"></i>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body flags-selection-sidemenu">
        <div className='flag-item-sidemenu' onClick={()=>{props.selectlang(unitedstates); localStorage.setItem("language", unitedstates)}}><img src={unitedstates}></img> English US</div>
        <div className='flag-item-sidemenu' onClick={()=>{props.selectlang(england); localStorage.setItem("language", england)}}><img src={england}></img> English UK</div>
      </div>
    </div>
  </div>
</div>
    </div>
    </nav>
  );
};

export default SideMenue;
