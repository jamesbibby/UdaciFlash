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
import { gray, white, purple, red } from '../utils/colors'
import { addCard } from '../actions'
import { connect } from 'react-redux'

class AddCard extends Component {
	state = {
		question: '',
		answer: '',
		error: null,
	}
	submit = () => {
		const { question, answer } = this.state
		const { navigation } = this.props
		const { deckName } = navigation.state.params
		let error = false
		if (question === '') {
			error = true
			this.setState(state => ({
				error: { ...state.error, question: 'Please enter a question' },
			}))
		}
		if (answer === '') {
			error = true
			this.setState(state => ({
				error: { ...state.error, answer: 'Please enter an answer' },
			}))
		}
		if (!error) {
			addCard(deckName, question, answer)
			navigation.goBack()
		}
	}
	render() {
		const { addCard, navigation } = this.props
		const { deckName } = navigation.state.params
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView behavior="padding" style={styles.inputs}>
					<Text style={styles.title}>Create a new Question and Answer</Text>
					<TextInput
						style={styles.textInput}
						underlineColorAndroid="transparent"
						placeholder="Question...."
						onChangeText={question => {
							this.setState({ question })
						}}
						value={this.state.question}
					/>
					{this.state.error && (
						<Text style={styles.error}>{this.state.error.question}</Text>
					)}
					<TextInput
						style={styles.textInput}
						underlineColorAndroid="transparent"
						placeholder="Answer...."
						onChangeText={answer => {
							this.setState({ answer })
						}}
						value={this.state.answer}
					/>
					{this.state.error && (
						<Text style={styles.error}>{this.state.error.answer}</Text>
					)}
					<TouchableOpacity
						style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
						onPress={this.submit}
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
		marginBottom: 10,
		marginTop: 10,
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

function mapStateToProps(state, { navigation }) {
	return state
}

function mapDispatchToProps(dispatch) {
	return {
		addCard: (deckName, question, answer) =>
			dispatch(addCard(deckName, question, answer)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
