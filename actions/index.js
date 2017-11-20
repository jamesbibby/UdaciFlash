export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'

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

export function addCard(deckName, card) {
	return {
		type: ADD_CARD,
		deckName,
		card,
	}
}
