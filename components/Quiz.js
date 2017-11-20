import React, { Component } from 'react'
import { Platform, View, StyleSheet, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'

class Quiz extends Component {
	constructor(props) {
		super(props)
		this.state = {
			index: 0,
			view: 'front',
		}
	}
	flip = () => {
		this.setState(state => ({
			view: state.view === 'front' ? 'back' : 'front',
		}))
	}
	next = () => {
		this.setState(state => ({ index: state.index + 1, view: 'front' }))
	}
	render() {
		return (
			<View>
				<Text>Question {this.state.index}</Text>
				<Text>
					{this.state.view === 'front'
						? this.props.questions[this.state.index].question
						: this.props.questions[this.state.index].answer}
				</Text>
				<Button onPress={this.flip} title="Answer" />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	iosBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		width: 180,
		marginRight: 40,
	},
	androidBtn: {
		backgroundColor: purple,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		width: 180,
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
})

function mapStateToProps(state, { navigation }) {
	const { deckName } = navigation.state.params
	return { ...state[deckName] }
}

export default connect(mapStateToProps)(Quiz)
