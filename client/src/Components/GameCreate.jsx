import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import {Navigate} from 'react-router';
import {getGenres, createGame} from '../Actions/index';

//manejo de errores en los inputs del juego creado
function validate(input){
    let error={}
    if(!input.name){error.name = ('Name is required')
    }else if (!input.description){ error.description = ('Description is required')
    }else if(!input.rating){error.rating = ('Rating is required')
    }return error
}



//formulario de creacion de videogame
export default function CreateGame(){
    const dispatch = useDispatch();
    const genre = useSelector((state)=> state.genres) //me traigo los generos
    const [error, setError] = useState('');
    const [input, setInput] = useState ({
        name: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: []
    })

    const platforms = [
        { name: "PC" },
        { name: "PlayStation 1" },
        { name: "PlayStation 2" },
        { name: "PlayStation 3" },
        { name: "PlayStation 4" },
        { name: "PlayStation 5" },
        { name: "XBox 360" },
        { name: "XBox One" },
        { name: "XBox Series X" },
        { name: "Nintendo" },
        { name: "Wii" },
        { name: "Sega" },
      ];

    useEffect(()=>{
        dispatch(getGenres())
    }, [dispatch]);

    function handleChange(e){
        setInput({ //cada vez que cambie o se modifique el input
            ...input, //lo que ya tenia de input
            [e.target.name]: e.target.value //lo que recibo por name
        })
        setError(validate({ //setea el error y validalo o no
            ...input, [e.target.name] : e.target.value
        }))
        console.log(input)
    }

    function handleSelectPF(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }

    async function handleSubmit(e){ //cada vez que se cambie o modifica el input
        try{
            e.preventDefault(e)
            if(!Object.getOwnPropertyNames(error).length && input.name && input.description && input.released && input.rating && input.genres && input.platforms){
            dispatch(createGame(input)); //que se haga el post en esta ruta
            alert("VideoGame created successfully")
            setInput({
                name:"",
                description:"",
                released:"",
                rating:"",
                genres:[],
                platforms:[]
            });
            Navigate('/Home')
            }
        } catch (err){
            alert("VideoGame wasn't created")
        }
    }

    return (
        <div>
            <Link to='/Home'><button className='buttonCreation'>Return Home</button></Link>
            <div className='jockstick'>
            <img src="https://i.postimg.cc/jjLYpfPM/kisspng-joystick-game-controllers-video-games-xbox-36-con-5d4bbcc2dce4e3-4089880215652446109048.png" width='100px' height='150px' alt=''></img>
            </div>
            <div>
                <h1 className='titlecreateG'>Create a new Game</h1>
                <form className='formcreate' onSubmit={(e)=> handleSubmit(e)}>
                    <div>
                        <input classname='textname' placeholder='Name' type='text' name='name' required='required' 
                        value={input.name} onChange={(e)=>handleChange(e)}/>
                        {error.name && (<p className='error'>{error.name}</p>)}
                    </div>
                    <div>
                        <input classname='textdesc' placeholder='Describe your game' type='text' name='description' required='required' 
                        value={input.description} onChange={(e)=>handleChange(e)}/>
                        {error.description && (<p className='error'>{error.description}</p>)}
                    </div>
                    <div>
                        <input classname='textreleased' placeholder='Enter the creation date' type='text' name='released' required='required' 
                        value={input.released} onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div>
                        <input classname='textrating' placeholder='Rating Game' type='text' name='rating' required='required' 
                        value={input.rating} onChange={(e)=>handleChange(e)}/>
                        {error.rating && (<p className='error'>{error.rating}</p>)}
                    </div>
                    <div>
                        <select classname='select' onChange={(e)=> handleSelectPF(e)} required='required'>ç
                        <option>Genres</option>
                        {genre.map((e)=>(<option value={e.id}>{e.name}</option>))}
                        </select>   
                    </div>
                    <div>
                        <select classname='select' onChange={(e)=> handleSelectPF(e)} required='required'>ç
                        <option>Platforms</option>
                        {platforms.map((e)=>(<option value={e.name}>{e.name}</option>))}
                        </select>   
                    </div>
                    <button className='create' type='submit'>Create</button>
                </form>
            </div>
        </div>
    )
}