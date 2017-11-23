import { ADD_DECK, REMOVE_DECK, ADD_CARD, INITIALIZE_STATE } from '../actions'

const initialState = {}

function decks(state = initialState, action) {
	switch (action.type) {
		case INITIALIZE_STATE:
			return action.state
		case ADD_DECK:
			return {
				...state,
				[action.name]: { title: action.name, questions: [] },
			}
		case REMOVE_DECK:
			const newState = { ...state }
			newState[action.name] = undefined
			delete newState[action.name]
			return newState
		case ADD_CARD:
			return {
				...state,
				[action.deckName]: {
					...state[action.deckName],
					questions: [
						...state[action.deckName].questions,
						{ question: action.question, answer: action.answer },
					],
				},
			}
		default:
			return state
	}
}

export default decks
