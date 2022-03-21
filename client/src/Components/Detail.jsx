import React, {useEffect} from 'react';
import {useDispatch, useSelector}  from 'react-redux';
import {getDetail} from "../Actions/index";
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(()=>{
        dispatch(getDetail(id)) //accedo al id de este detalle
    }, [dispatch,id]);

    const gameDetail = useSelector((state)=> state.detail)
    console.log(gameDetail)
    
    return (
        <div>
            <Link to= '/Home'>
                <button className='buttonHome'>Return Home</button>
            </Link>
            {
                gameDetail.name?
                <div className='detail'>
                    <div className='titleDetails'><p>{gameDetail}</p></div>
                    <div className='imgDetail'><img src ={gameDetail.background_image} width='300' height='400' alt=''/></div>
                    <div className='descDetail'><p className='pDescrip'>
                        {!gameDetail.create? 
                        gameDetail.description.replace(/(<([^>]+)>)/ig, ''):
                        gameDetail.description}</p></div>
                <div><h3>Released Date:{gameDetail.released}</h3></div>
                <div><h3>Rating:{gameDetail.rating}</h3></div>

                <ul>
                    <li>Genres:</li>
                    {!gameDetail.create?
                     gameDetail.genres.map(e=> <li>{e}</li>):
                     gameDetail.genres.map(e => <li>{e.name}</li>)}
                </ul>
                <ul>
                    <li>Platforms:</li>
                    {!gameDetail?.platforms?.create?
                    gameDetail.platforms.map(e => <li>{e}</li>):
                    gameDetail.platforms.map(e=> <li>{e.name}</li>)}
                </ul>
                </div>
                :null
            }
        </div>
    )
}

