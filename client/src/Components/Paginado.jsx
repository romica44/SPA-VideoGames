import React from 'react';
import './Paginado.css'


export default function Paginado ({gamesPerPage, allGames, paginado}){
    const pageNumbers = []
    for(let i=0; i<Math.ceil(allGames/gamesPerPage); i++){ //redondea todos los personajes por los personajes por pagina
    pageNumbers.push(i +1)
    }

    return (
        <nav>
            <ul className='paginado'>
                {pageNumbers && 
                pageNumbers.map(number => (
                    <li key={number}>
                   <button onClick={()=> paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
