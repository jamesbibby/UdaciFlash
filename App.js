import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import reducer from './reducers'
import { initializeState } from './actions'
import {
	Platform,
	StatusBar,
	StyleSheet,
	Text,
	View,
	AsyncStorage,
} from 'react-native'
import { Constants } from 'expo'
import { white, purple } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import DeckView from './components/DeckView'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { setLocalNotification } from './utils/helpers'

const FLASHCARD_KEY = 'UdaciFlash:StorageKey'

function UdaciStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

const Tabs = TabNavigator(
	{
		Decks: {
			screen: DeckList,
			navigationOptions: {
				tabBarLabel: 'Decks',
				tabBarIcon: ({ tintColor }) => (
					<Ionicons name="ios-bookmarks" size={30} color={tintColor} />
				),
			},
		},
		AddDeck: {
			screen: AddDeck,
			navigationOptions: {
				tabBarLabel: 'Add Deck',
				tabBarIcon: ({ tintColor }) => (
					<FontAwesome name="plus-square" size={30} color={tintColor} />
				),
			},
		},
	},
	{
		navigationOptions: {
			header: null,
		},
		tabBarOptions: {
			activeTintColor: Platform.OS === 'ios' ? purple : white,
			style: {
				height: 56,
				backgroundColor: Platform.OS === 'ios' ? white : purple,
				shadowColor: 'rgba(0,0,0,0.24)',
				shadowOffset: {
					width: 0,
					height: 3,
				},
				shadowRadius: 6,
				shadowOpacity: 1,
			},
		},
	}
)

const MainNavigator = StackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: { title: 'Home' },
	},
	DeckView: {
		screen: DeckView,
	},
	AddCard: {
		screen: AddCard,
		navigationOptions: { title: 'Add a Card' },
	},
	Quiz: {
		screen: Quiz,
		navigationOptions: { title: 'Quiz' },
	},
})

const store = createStore(reducer)

const handleChange = () => {
	const newState = JSON.stringify(store.getState())
	AsyncStorage.setItem(FLASHCARD_KEY, newState)
}

store.subscribe(handleChange)

export default class App extends Component {
	componentDidMount() {
		setLocalNotification()
		AsyncStorage.getItem(FLASHCARD_KEY)
			.then(JSON.parse)
			.then(savedState =>
				store.dispatch(initializeState(savedState ? savedState : {}))
			)
	}
	render() {
		const { decks } = this.props
		return (
			<Provider store={store}>
				<View style={{ flex: 1 }}>
					<UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
					<MainNavigator />
				</View>
			</Provider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
