export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const INITIALIZE_STATE = 'INITIALIZE_STATE'

export function initializeState(state) {
	return {
		type: INITIALIZE_STATE,
		state,
	}
}

export function addDeck(name) {
	return {
		type: ADD_DECK,
		name,
	}
}

export function removeDeck(name) {
	return {
		type: REMOVE_DECK,
		name,
	}
}

export function addCard(deckName, question, answer) {
	return {
		type: ADD_CARD,
		deckName,
		question,
		answer,
	}
}
