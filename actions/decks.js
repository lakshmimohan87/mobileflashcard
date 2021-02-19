export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECK'
export const DELETE_DECK = 'DELETE_DECK'


export function addDeck (title) {
    return {
        type : ADD_DECK,
        deck: { title, cards: [] }
    }

}


export function receiveDecks(decks) {
    debugger;
    return {
        type : RECEIVE_DECKS,
        decks,
    }
}

export function  deleteDeck(id) {
    return {
         type : DELETE_DECK,
         id,
         
    }
    
}