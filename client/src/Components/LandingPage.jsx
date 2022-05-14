import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.scss'


export default function LandingPage(){
    return (
        <>
        <div className='titleLanding'>SEARCH YOUR FAVORITE GAMES!</div>
        
        <div className='landing'>

            <Link to="/home">
                <button type="" className='landingBtn'>ENTER</button>
            </Link>
          
        </div>
        </>
    )
}