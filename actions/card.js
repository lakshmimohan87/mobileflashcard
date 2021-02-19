export const ADD_CARD = 'ADD_CARD'

export function addCard (id,newQuestion,newAnswer) {
    return {
        type : ADD_CARD,
        id,
        card: {
            question: newQuestion,
            answer: newAnswer
        }
    }
}