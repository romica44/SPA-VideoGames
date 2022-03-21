import axios from 'axios';
export const GET_VIDEOGAMES= 'GET_VIDEOGAMES';
export const  GET_NAME_GAMES= 'GET_NAME_GAMES';
export const GET_GENRES= 'GET_GENRES';
export const FILTER_BY_GENRES= 'FILTER_BY_GENRES';
export const FILTER_CREATED= 'FILTER_CREATED';
export const ORDER_BY_NAME= 'ORDER_BY_NAME';
export const ORDER_BY_RATING= 'ORDER_BY_RATING';
export const GET_DETAILS= 'GET_DETAILS';
export const CREATE_VGAME= 'CREATE_VGAME';



export function getAll(){
    return async function(dispatch){
        let all= await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: all.data
        })
    }
}

export function getVGNames(){
    return async function(dispatch){
        let vgNames = await axios.get('http://localhost:3001/videogames?name=');
        return dispatch({
            type: GET_NAME_GAMES,
            payload: vgNames.data
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        let genres = await axios.get('http://localhost:3001/genres');
        return dispatch({
            type: GET_GENRES,
            payload: genres.data
        })
    }
}

export function filterByGenres (payload) {
    return {
        type: FILTER_BY_GENRES,
        payload
    }
}

export function filterCreated (payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

 export function orderByName(payload){
    return{
        type:ORDER_BY_NAME,
        payload

    }
} 
export function orderByRating(payload){
    return {
        type: ORDER_BY_RATING,
        payload
    }
}


export function getDetail(id){
    return async function(dispatch){
            var detail = await axios("https://localhost:3001/videogames/" + id)
            return dispatch({
                type: GET_DETAILS,
                payload: detail.data
                
            });
         
    }
}

export function createGame(payload){
    return async function(dispatch){

            const response = await axios.post('https://localhost:3001/videogame', payload);
            return response
    
    }
}