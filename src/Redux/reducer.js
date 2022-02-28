import { GET_FOOD, GET_FOOD_ID, RESET,NEXT_PAGE, PREVIOUS_PAGE, ADD_MENU, DELETE_MENU, IS_VEGAN, REMOVE_VEGAN, SEARCH_MENU, LOG_OUT, LOG_IN  } from "./types";

const initialState = {
    allFood: [],
    backupFood: [],
    filteredFood: [],
    page: 0,
    menu: [],
    isVegan: [],
    notVegan: [],
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case LOG_OUT:
            return {...state, userToken: null}
        case GET_FOOD:
            return { ...state, allFood: payload, backupFood: payload }
        case RESET:
            return { ...state, page: 0 }
        case NEXT_PAGE:
            return { ...state, page: state.page + 6 }
        case PREVIOUS_PAGE:
            if (state.page === 0) return state;
            else return { ...state, page: state.page - 6 }
        case ADD_MENU:
            return {...state, menu: [...state.menu, payload] }
        case IS_VEGAN:
            if(payload.vegan === true) return {...state, isVegan: [...state.isVegan, payload]}
            if(payload.vegan === false) return {...state, notVegan: [...state.notVegan, payload]}
        case REMOVE_VEGAN:
            if(state.isVegan.some(e => e.id === payload) === true){
                let removeVegan= state.isVegan.filter(j => {return j.id !== payload})
                return {...state, isVegan: removeVegan} 
            }
            else if(state.notVegan.some(e => e.id === payload) === true){
                let removeVegan= state.notVegan.filter(j => {return j.id !== payload})
                return {...state, notVegan: removeVegan} 
            } else return {...state}
        case DELETE_MENU:
            let remove = state.menu.filter((e) =>{ return e.id !== payload})
            return {...state, menu: remove}
        case SEARCH_MENU:
            state.allFood = state.backupFood
            state.filteredFood = state.allFood.filter((e) => e.title.includes(payload))
            return {...state, allFood: state.filteredFood}
        default:
            return state
    }
}