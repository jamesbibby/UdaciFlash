import { ADD_DECK, REMOVE_DECK, ADD_CARD } from '../actions'

const initialState = {
	Math: {
		title: 'Math',
		questions: [
			{
				question: 'What is the sum of the interior angles of a triangle?',
				answer: '180 degrees!',
			},
		],
	},
	History: {
		title: 'History',
		questions: [
			{ question: 'When did Canada become a country?', answer: 'July 1, 1867' },
		],
	},
	Biology: {
		title: 'Biology',
		questions: [
			{
				question: 'In what Kingdom are Viruses classified?',
				answer: "Haha, they aren't considered part of life",
			},
		],
	},
	Physics: {
		title: 'Physics',
		questions: [
			{
				question: 'Which subatomic particle is reponsible for mass?',
				answer: 'The Higgs Boson',
			},
		],
	},
}

function decks(state = initialState, action) {
	switch (action.type) {
		case ADD_DECK:
			return {
				...state,
				[action.title]: { title: action.title, questions: [] },
			}
		case REMOVE_DECK:
			const newState = { ...state }
			newState[action.name] = undefined
			delete newState[action.name]
			return newState
		case ADD_CARD:
			return {
				...state,
				[action.title]: {
					title: state[action.title].title,
					questions: [
						...state[action.title].questions,
						{ question: action.question, answer: action.answer },
					],
				},
			}
		default:
			return state
	}
}

export default decks
