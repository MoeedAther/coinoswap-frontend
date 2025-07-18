import React, { useEffect, useState } from 'react';
import whiteline from '../images/white line.png';
import whiteyellowline from '../images/white yellow line.png';
import whitestar from '../images/white star.png';
import yellowstar from '../images/yellow star.png';
import yellowline from '../images/yellow line.png';



const ProgressInputWalletAddress=(props)=>{

    switch(props.progress){

        case 'deposit':
            return(
                <>
                        <div className='progress-div-create'>
            <div className='glow'>
                <img className='img-fluid glowing-image' src={yellowstar}></img>
            </div>
            <div className='doted-line'><img className='img-fluid ' src={whiteyellowline}></img></div>
            <div>
                <img className='img-fluid' src={whitestar}></img>
            </div>
            <div className='doted-line' ><img className='img-fluid ' src={whiteline}></img></div>
            <div>
                <img className='img-fluid' src={whitestar}></img>
            </div>
        </div>
        <div className='progress-div-create-status'><span>Creating Exchange</span><span>Awaiting Payment</span><span>Processing</span></div>
                </>
            )
        case 'submit':
            return(
                <>
                            
                    <div className='progress-div-awaiting'>
            <div><img className='img-fluid' src={yellowstar}></img></div>
            <div className='doted-line'><img className='img-fluid ' src={yellowline}></img></div>
            <div ><img className='img-fluid glowing-image' src={yellowstar}></img></div>
            <div className='doted-line' ><img className='img-fluid ' src={whiteyellowline}></img></div>
            <div ><img className='img-fluid' src={whitestar}></img></div>
        </div>
        <div className='progress-div-awating-status'><span>Creating Exchange</span><span>Awaiting Payment</span><span>Processing</span></div>
                </>
            )

        case 'progress':
            return(
                <>
                        <div className='progress-div-processing'>
            <div><img className='img-fluid' src={yellowstar}></img></div>
            <div className='doted-line'><img className='img-fluid ' src={yellowline}></img></div>
            <div ><img className='img-fluid' src={yellowstar}></img></div>
            <div className='doted-line' ><img className='img-fluid ' src={yellowline}></img></div>
            <div ><img className='img-fluid glowing-image' src={yellowstar}></img></div>
        </div>
        <div className='progress-div-processing-status'><span>Creating Exchange</span><span>Awaiting Payment</span><span>Processing</span></div>
                </>
            )

        case 'success':
            return(
                <>
                        <div className='progress-div-success'>
            <div><img className='img-fluid' src={yellowstar}></img></div>
            <div className='doted-line'><img className='img-fluid ' src={yellowline}></img></div>
            <div ><img className='img-fluid' src={yellowstar}></img></div>
            <div className='doted-line' ><img className='img-fluid ' src={yellowline}></img></div>
            <div ><img className='img-fluid' src={yellowstar}></img></div>
        </div>
        <div className='progress-div-success-status'><span>Creating Exchange</span><span>Awaiting Payment</span><span>Processing</span></div>
                </>
            )
        default:
            return(
                <>
                        <div className='progress-div-success'>
            <div><img className='img-fluid' src={yellowstar}></img></div>
            <div className='doted-line'><img className='img-fluid ' src={yellowline}></img></div>
            <div ><img className='img-fluid' src={yellowstar}></img></div>
            <div className='doted-line' ><img className='img-fluid ' src={yellowline}></img></div>
            <div ><img className='img-fluid' src={yellowstar}></img></div>
        </div>
        <div className='progress-div-success-status'><span>Creating Exchange</span><span>Awaiting Payment</span><span>Processing</span></div>
                </>
            )
        
    }
}
export default ProgressInputWalletAddress;