import { ADD_MENU, ADD_VEGAN, DELETE_MENU, GET_FOOD, GET_FOOD_ID, NEXT_PAGE, PREVIOUS_PAGE, RESET,IS_VEGAN, REMOVE_VEGAN, SEARCH_MENU, LOG_OUT } from "./types";
import axios from "axios";
const API_KEY= "9cdaf4e2adec412db3e325add40fd012"



export function getFood(){
    return (dispatch) => {
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY}&addRecipeInformation=true`)
        .then((response)=>{
            dispatch({
                type: GET_FOOD,
                payload: response.data.results
            })
        })
    }
}
export function nextPage(){
    return{
        type: NEXT_PAGE
    }
}

export function previousPage(){
    return{
        type: PREVIOUS_PAGE
    }   
}

export function reset(){
    return{
        type: RESET
    }
}


export function addMenu(data){
    return {
        type: ADD_MENU,
        payload: data
    }
}

export function isVegan(data){
    return {
        type: IS_VEGAN,
        payload: data
    }
}

export function removeVegan(data){
    return{
        type: REMOVE_VEGAN,
        payload: data
    }
}

export function deleteMenu(data){
    return{
        type: DELETE_MENU,
        payload: data
    }
}

export function searchRecipe(data){
    return {
        type: SEARCH_MENU,
        payload: data
    }
}


export function logOut(){
    return {
        type: LOG_OUT
    }
}

//--------------utilities---------------

export function centaveToDolar(price) {
    let dolar = price * 1 / 100
    return Math.round((dolar + Number.EPSILON) * 100) / 100;
}

export function menuStats(menu){
    let sumprecio = menu.map(e => e.pricePerServing).reduce((acc, red) => acc + red)
    let sumtime = menu.map(e => e.readyInMinutes).reduce((acc, red) => acc + red)
    let sumhealth = Math.floor(menu.map(e => e.healthScore).reduce((acc,red ) => acc + red)/menu.length)
    return {price: sumprecio, time: sumtime, healthScore: sumhealth}
}

export function capitalize(string) {
    return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};