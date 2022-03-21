import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css'


export default function LandingPage(){
    return (
        <body className='body' background="https://i.postimg.cc/6pw68VMw/game-default.jpg">
        <div className='divLanding'>
            <div className='titleLanding'>SEARCH YOUR FAVORITE GAMES!</div>
            <Link to="/home">
                <button type="" className='button'>ENTER</button>
            </Link>
        </div>
        </body>
    )
}