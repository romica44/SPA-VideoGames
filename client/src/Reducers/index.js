import {GET_VIDEOGAMES, GET_NAME_GAMES, GET_GENRES, FILTER_BY_GENRES, FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_RATING, GET_DETAILS, CREATE_VGAME}  from '../Actions';

const initialState = {
    videogames : [],
    genres : [],
    detail : [],
    filterGames : [],
}

function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_VIDEOGAMES:
            return{
                ...state,
                videogames:action.payload,
                filterGames:action.payload,
                detail: action.payload
            }
        case GET_NAME_GAMES:
            return{
                ...state,
                videogames: action.payload,
            }
        case GET_GENRES: //solo retorna el estado como esta porque se crea en otra ruta
            return{
                ...state,
                genres: action.payload
            }
        case FILTER_BY_GENRES:
            const allGames = state.filterGames;
            const genresFilter =
            action.payload === 'All' ? allGames:
            allGames.filter((e)=> e.genre?.includes(action.payload))

            return{
                ...state,
                videogames: genresFilter,
            }
        case FILTER_CREATED:
            const allGamesCreated = state.filterGames
            const createdFilter= action.payload === 'created'?
            allGamesCreated.filter((e)=> e.createdInDb):
            action.payload === 'api' ?
            allGamesCreated.filter((e)=> !e.createdInDb):
            action.payload === 'all' && allGamesCreated

            return{
                ...state,
                videogames: createdFilter,
            }
        case ORDER_BY_NAME:
            let order = action.payload === 'asc' ? state.videogames.sort(function (a,b){
                if (a.name > b.name){
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0;
            }):
                state.videogames.sort(function(a,b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if (b.name > a.name){
                        return 1;
                    }
                    return 0;
                });
            return{
                ...state,
                videogames: order
            }
        case ORDER_BY_RATING:
            let sortRating= action.payload === 'bestRating' ?
            state.videogames.sort ((a,b)=>{
                if(a.name > b.name){
                    return -1
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            }): 
            state.videogames.sort((a,b)=>{
                if(a.name > b.name){
                    return 1
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                videogames:sortRating
            }
        case GET_DETAILS:
                return{
                ...state,
                detail:action.payload
            }
        case CREATE_VGAME:
            return{
                ...state,
            }    
        default:
            return state;
    } 
}

export default rootReducer;