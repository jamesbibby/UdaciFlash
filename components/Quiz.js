import React, { Component } from 'react'
import {
	Platform,
	View,
	StyleSheet,
	Text,
	Button,
	TouchableOpacity,
	Animated,
} from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'
import { purple, white, lightPurp, green, red } from '../utils/colors'

class Quiz extends Component {
	constructor(props) {
		super(props)
		this.state = {
			index: 0,
			correct: 0,
			flipValue: 0,
		}
	}
	componentWillMount() {
		this.animatedValue = new Animated.Value(0)
		this.animatedValue.addListener(({ value }) => {
			this.setState({ flipValue: value })
		})
		this.frontInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['0deg', '180deg'],
		})
		this.backInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['180deg', '360deg'],
		})
	}
	componentDidMount() {
		clearLocalNotifications().then(setLocalNotification)
	}
	flip = () => {
		Animated.timing(this.animatedValue, {
			toValue: this.state.flipValue < 90 ? 180 : 0,
			friction: 8,
			tension: 10,
		}).start()
	}
	resetFlip = () => {
		Animated.timing(this.animatedValue, {
			toValue: 0,
			duration: 0,
		}).start()
	}
	next = correct => {
		this.resetFlip()
		this.setState(state => ({
			index: state.index + 1,
			correct: correct ? state.correct + 1 : state.correct,
			flipValue: 0,
		}))
	}
	getResultIcon = () => {
		const { questions } = this.props
		const { correct } = this.state
		const platform = Platform.OS === 'ios' ? 'ios' : 'md'
		const upDown = correct / questions.length >= 0.5 ? 'up' : 'down'
		const color = correct / questions.length >= 0.5 ? 'green' : 'red'
		return (
			<Ionicons name={`${platform}-thumbs-${upDown}`} size={50} color={color} />
		)
	}
	render() {
		const { questions, navigation, title } = this.props
		const { index, flipValue, correct } = this.state
		const frontAnimatedStyle = {
			transform: [{ rotateY: this.frontInterpolate }],
		}
		const backAnimatedStyle = {
			transform: [{ rotateY: this.backInterpolate }],
		}
		return index < questions.length ? (
			<View style={styles.container}>
				<View style={{ alignItems: 'center' }}>
					<Text style={{ fontSize: 18 }}>
						Question {index + 1} of {questions.length}
					</Text>
					<View>
						{flipValue > 90 ? (
							<Animated.View
								style={[
									backAnimatedStyle,
									styles.flippableCard,
									styles.flippableCardBack,
								]}
							>
								<Text style={styles.flipText}>{questions[index].answer}</Text>
							</Animated.View>
						) : (
							<Animated.View style={[styles.flippableCard, frontAnimatedStyle]}>
								<Text style={styles.flipText}>{questions[index].question}</Text>
							</Animated.View>
						)}
						<Button
							onPress={this.flip}
							title={flipValue < 90 ? 'Answer' : 'Question'}
						/>
					</View>
				</View>
				<View>
					<TouchableOpacity
						style={[
							Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
							{ backgroundColor: green },
						]}
						onPress={() => this.next(true)}
					>
						<Text style={styles.btnText}>Correct</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
							{ backgroundColor: red },
						]}
						onPress={() => this.next(false)}
					>
						<Text style={styles.btnText}>Incorrect</Text>
					</TouchableOpacity>
				</View>
			</View>
		) : (
			<View style={styles.container}>
				<View
					style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
				>
					{this.getResultIcon()}
					<Text
						style={[
							styles.result,
							{
								color: correct / questions.length >= 0.5 ? 'green' : 'red',
							},
						]}
					>
						You got {correct} correct out of {questions.length}
					</Text>
				</View>
				<View
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						paddingBottom: 40,
					}}
				>
					<TouchableOpacity
						style={[
							Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
							{ backgroundColor: green },
						]}
						onPress={() => navigation.goBack()}
					>
						<Text style={styles.btnText}>Back To Deck</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
						onPress={() =>
							this.setState({
								index: 0,
								correct: 0,
								flipValue: 0,
							})
						}
					>
						<Text style={styles.btnText}>Restart Quiz</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	iosBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		width: 180,
		marginRight: 40,
		marginBottom: 30,
	},
	androidBtn: {
		backgroundColor: purple,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		marginBottom: 30,
		height: 45,
		width: 180,
		borderRadius: 2,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnText: {
		color: white,
		fontSize: 18,
		textAlign: 'center',
	},
	flippableCard: {
		width: 200,
		height: 200,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: purple,
		backfaceVisibility: 'hidden',
	},
	flippableCardBack: {
		backgroundColor: lightPurp,
	},
	flipText: {
		color: white,
		fontSize: 22,
		textAlign: 'center',
		padding: 5,
	},
	result: {
		fontSize: 30,
		textAlign: 'center',
	},
})

function mapStateToProps(state, { navigation }) {
	const { deckName } = navigation.state.params
	return { ...state[deckName] }
}

export default connect(mapStateToProps)(Quiz)
