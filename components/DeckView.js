import React, { Component } from 'react'
import {
	Platform,
	TouchableOpacity,
	Text,
	View,
	StyleSheet,
	Button,
} from 'react-native'
import { connect } from 'react-redux'
import { white, purple } from '../utils/colors'

const Deck = props => {
	return (
		<View style={styles.container}>
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					paddingBottom: 80,
				}}
			>
				<Text style={styles.titleText}>{props.title}</Text>
				<Text style={styles.cardText}>{props.questions.length} cards</Text>
			</View>
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					paddingBottom: 40,
				}}
			>
				<TouchableOpacity
					style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
					onPress={() => props.navigation.navigate('AddCard')}
				>
					<Text style={styles.btnText}>Add a Card</Text>
				</TouchableOpacity>
			</View>
			<View>
				<TouchableOpacity
					style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
					onPress={() =>
						props.navigation.navigate('Quiz', { deckName: props.title })
					}
				>
					<Text style={styles.btnText}>Take Quiz</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

Deck.navigationOptions = ({ navigation }) => {
	const { deckName } = navigation.state.params
	return {
		title: deckName,
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleText: {
		fontSize: 34,
	},
	cardText: {
		fontSize: 14,
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
	const { entryId } = navigation.state.params
	return {
		entryId,
		metrics: state[entryId],
	}
}

function mapStateToProps(decks, { navigation }) {
	const { deckName } = navigation.state.params
	return { ...decks[deckName] }
}

export default connect(mapStateToProps)(Deck)
