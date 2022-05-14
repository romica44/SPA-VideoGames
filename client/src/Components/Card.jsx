import React from 'react';
import './Card.scss'


export default function Card({name, background_image, genres}){
    return (
        <div className='card-container'>
            <div className='game-card'>
            <h1 className='title-name'>{name}</h1>
            <img src={background_image} alt= {`${name}`} width='200px' height='150px' className='game-image'/>
            <div className= 'genre-title'>Genres: </div>
            <p className='genre-title'>{genres.join("-")}</p>
            </div>
        </div>
    )
}