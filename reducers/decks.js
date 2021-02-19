import { ADD_DECK, DELETE_DECK, RECEIVE_DECKS } from '../actions/decks';
import { ADD_CARD } from '../actions/card'
import { saveDecks } from '../utils/api'

export default function entries ( state = {}, action ) {
    switch(action.type) {
        case RECEIVE_DECKS : 
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK :
            const newState = {
                ...state,
                [action.deck.title]: action.deck 
            };

            saveDecks(newState);
            return {...state,
                [action.deck.title]: action.deck};
            
        case DELETE_DECK:
         
            const deleteDeck = {
                ...state, 
            };
            deleteDeck[action.id] = undefined;
            delete deleteDeck[action.id];
            saveDecks(deleteDeck);
            return {
                ...deleteDeck
            } 
 
        case ADD_CARD :
            const newStateCards = {
                ...state,
                [action.id] : {...state[action.id],
                                        cards: [...state[action.id].cards, action.card]}};

            saveDecks(newStateCards);

            return {
                ...state,
                [action.id] : {...state[action.id],
                                        cards: [...state[action.id].cards, action.card]}};
        default:   
            return state
    } 
}