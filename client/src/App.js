import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from "./Components/LandingPage";
import Home from "./Components/Home";
import  Detail from "./Components/Detail";
import CreateGame from "./Components/GameCreate"

function App() {
  return (
    <div className="App">
    <BrowserRouter>
     <Routes>
       <Route path = "/" exact element = {<LandingPage/>}/>
       <Route path = "/home" element = {<Home/>}/>
       <Route path = "/videogame" element = {<CreateGame/>}/>
       <Route path = "/videogames/:id" element = {<Detail/>}/>
     </Routes>
     </BrowserRouter>
     </div>  
    
  );
}

export default App;