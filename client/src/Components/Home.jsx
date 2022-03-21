import React, { useState, useEffect } from "react"; // los hooks a utilizar de react
import { useDispatch, useSelector } from "react-redux"; // los hooks a utilizar de react-redux
import {getAll, getGenres, filterByGenres, filterCreated, orderByName, orderByRating, } from "../Actions/index";
import { Link } from "react-router-dom";
import Card from "../Components/Card";
import Paginado from "../Components/Paginado";
import SearchBar from "../Components/SearchBar";
import './Home.css'
//import GameCreate from "../Components/GameCreate";

export default function Home() {
  const dispatch = useDispatch(); // con esto despacho mis acciones
  const allGames = useSelector((state) => state.videogames); //trae todo lo que este en la constate de videogames
  const genres = useSelector((state) => state.genres);
  
  // PAGINADO-------------------

  const [/*orden*/, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);  //seteado el estado local, la pag actual y el estado que setee la pag
  const [gamesPerPage, /*setGamesPage*/] = useState(15); //videogames por pagina
  const indexOfLastGame = currentPage * gamesPerPage; // pagina actual * cant. de game por pagina, en la primera pagina index=14
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; //indice del ultimo game - los game por pagina, 0
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame); // el arreglo del estado games, que viene del reducer, le aplica un slice, le paso el indice del primero y el ultimo personaje

  const paginado = (numberPage) => {//para poder renderizar el paginado
    setCurrentPage(numberPage);
  };

  useEffect(() => {
    //nos traemos del estado los videojuegos cuando el componente se monta co useEfect
    dispatch(getAll());
    dispatch(getGenres()); // es lo mismo que mapsdispatch
  }, [dispatch]); // se pone arreglo vacio/dispatch para que no se haga un loop infinito

  function handleClick(e) { //resetea todo y carga de nuevo
    e.preventDefault(); // evita que se refresque la pag
    dispatch(getAll()); //me despache la accion y resetea todo y me trae todo de nuevo
  }

  function handleSelect(e){
      e.preventDefault()
      setCurrentPage(1)
      dispatch(filterByGenres(e.target.value)) //accedo al valor que se hace click en la web
  }

  function handlerFilterCreate(e) {
      e.preventDefault()
    dispatch(filterCreated(e.target.value)); 
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value)); //despacho la accion
    setCurrentPage(1); //seteo para que empiece en la paina 1
    setOrden(`Ordenado ${e.target.value}`); // me modifique el estado local y se renderice si no no hace nada en el front
  }

  function handlerFilterRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value)); // lo que viene del select(payload)
    setCurrentPage(1); //seteo para que empiece en la paina 1
    setOrden(`Ordenado ${e.target.value}`);
  }

  
  

  return (
    <div>
    {currentGames.length ===0  ? 
      <div className="home">
      </div>:
       <div className="home">
       <Link to="/videogame">
         <button className="buttonCREATE">CREATE GAME</button>
       </Link>
       <Link to="/">
         <button className="buttonBACK">BACK</button>
       </Link>
       <div><button
         className="render" onClick={(e) => {handleClick(e);}}>
         RESET
       </button></div>
       <div>
         <p className="title">FIND YOUR VIDEOGAME</p>
       </div>
         <div className="all-select">
         <div className="A">
           <select onChange={(e) => handlerFilterCreate(e)}>
             <option value="All">Create by</option>
             <option value="create">For me</option>
             <option value="developers">Developers</option>
           </select>
         </div>
         <div className="B">
           <select onChange={(e) => handleSort(e)}>
             <option value="A - Z">A - Z</option>
             {/* se pone siempre value para poder acceder y preguntar si tengo opciones, si el value es ascendente hace esto */}
             <option value="Z - A">Z - A</option>
           </select>
         </div>
         <div className="C">
           <select onChange={(e) => handlerFilterRating(e)}>
             <option value="All">Rating</option>
             <option value="Better Rating">Better Rating</option>{" "}
             <option value="Worse Rating">Worse Rating</option>
           </select>
         </div>
         <div className="D">
           <select onChange={(e) => handleSelect(e)}>
             <option value="All">Genres</option>
             {genres.map((e) => (
               <option value={e.name}>{e.name}</option>
             ))}
           </select>
         </div>
       </div>
 
       <SearchBar />
       <br></br> <br></br> <br></br>
       <div className="cartas">
           {currentGames.map((e) => {
             return (
               <Link to= {"/videogames/" + e.id}>
               <Card
                 id={e.id}
                 background_image={e.background_image}
                 name={e.name} //aqui me traigo solos los componentes que ya tengo destruct. en el componente card
                 genres={e.genres}
                 key={e.id}
               />
               </Link>
             
             );
           })}
       </div>   
       <Paginado gamesPerPage={gamesPerPage} allGames={allGames.length} paginado={paginado}/>
      </div>
     }
     </div>
  );
}