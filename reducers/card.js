import { ADD_CARD } from '../actions/card'
import {saveDecks} from '../utils/api'

export default function entries ( state = {}, action ) {
    
    switch(action.type) {
        case ADD_CARD :
            const newState = {
                ...state,
                [action.decks] : {...state[action.decks],
                                    [action.decks.id]: {...state[action.decks.id],
                                        cards: [...state.cards,action.card]}}
                };
                saveDecks(newState)
            return {
                ...state,
                [action.decks] : {...state[action.decks],
                                    [action.decks.id]: {...state[action.decks.id],
                                        cards: [...state.cards,action.card]}}
            }
            
        default: 
            return state
    }
}