import React, { Component } from 'react'
import {
	TextInput,
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
	TouchableOpacity,
	Platform,
} from 'react-native'
import { connect } from 'react-redux'
import { gray, white, purple, red } from '../utils/colors'
import { addDeck } from '../actions'
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component {
	state = { title: '' }
	handleTitleChange = value => {
		this.setState({ title: value, error: '' })
	}
	createDeck = () => {
		const { addDeck, navigation } = this.props
		const { title } = this.state
		if (title === '') {
			this.setState({ error: 'Please enter a title' })
			return
		}
		addDeck(title)

		// this resets the navigation stack to include the home screen and then the deck view screen
		// this ensures that the back button from deckview returns to the correct home
		const resetAction = NavigationActions.reset({
			index: 1,
			actions: [
				NavigationActions.navigate({
					routeName: 'Home',
					actions: [NavigationActions.navigate('Decks')],
				}),
				NavigationActions.navigate({
					routeName: 'DeckView',
					params: { deckName: title },
				}),
			],
		})

		navigation.dispatch(resetAction)
	}
	render() {
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView behavior="padding" style={styles.inputs}>
					<Text style={styles.title}>
						What would you like to call your new Deck?
					</Text>
					<TextInput
						style={styles.textInput}
						underlineColorAndroid="transparent"
						placeholder="Deck Title...."
						onChangeText={title => {
							this.setState({ title })
						}}
						onSubmitEditing={this.createDeck}
						value={this.state.title}
					/>
					{this.state.error && (
						<Text style={styles.error}>{this.state.error}</Text>
					)}
					<TouchableOpacity
						style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
						onPress={this.createDeck}
					>
						<Text style={styles.btnText}>Save</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
				<View />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingBottom: 60,
	},
	title: {
		paddingBottom: 5,
		fontSize: 22,
	},
	inputs: {
		alignItems: 'stretch',
		justifyContent: 'center',
		marginBottom: 40,
	},
	textInput: {
		borderColor: gray,
		borderWidth: 1,
		backgroundColor: white,
		height: 40,
	},
	iosBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 20,
		width: 100,
		marginRight: 20,
		marginTop: 15,
		alignSelf: 'flex-end',
	},
	androidBtn: {
		backgroundColor: purple,
		padding: 10,
		paddingLeft: 10,
		paddingRight: 10,
		marginTop: 15,
		height: 45,
		width: 100,
		borderRadius: 2,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center',
	},
	error: {
		color: red,
		fontSize: 18,
	},
})

function mapDispatchToProps(dispatch) {
	return {
		addDeck: title => dispatch(addDeck(title)),
	}
}

function mapStateToProps(state) {
	return state
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)
