import React from 'react';
import './Card.css'


export default function Card({name, background_image, genres}){
    return (
        <div className='cardcontainer'>
            <div className='card'>
            <h1 className='info'>{name}</h1>
            <img src={background_image} alt= {`${name}`} width='200px' height='150px' className='imageGame'/>
            <h3 className= 'info'>{genres}</h3>
            </div>
        </div>
    )
}