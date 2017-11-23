import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	FlatList,
	Platform,
} from 'react-native'
import { purple, gray, red, lightGray } from '../utils/colors'
import Swipeout from 'react-native-swipeout'
import { Ionicons } from '@expo/vector-icons'
import { removeDeck } from '../actions'

class Deck extends Component {
	render() {
		const { title, questions, navigation } = this.props
		return (
			<View style={styles.row}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('DeckView', { deckName: title })
					}}
				>
					<View style={{ alignItems: 'center' }}>
						<Text style={styles.deckTitle}>{title}</Text>
						<Text style={styles.deckCards}>
							{questions.length} card{questions.length === 1 ? '' : 's'}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

const DeckList = props => {
	const { removeDeck, decks, navigation } = props
	return (
		<View style={styles.container}>
			{decks.length > 0 ? (
				<FlatList
					data={decks}
					keyExtractor={(item, index) => item.title}
					renderItem={({ item }) => (
						<Swipeout
							style={{
								justifyContent: 'center',
								alignItems: 'stretch',
							}}
							right={[
								{
									component: (
										<View style={styles.swipeable}>
											<Ionicons
												style={{
													alignSelf: 'center',
												}}
												name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
												size={50}
												color={red}
											/>
										</View>
									),
									onPress: () => removeDeck(item.title),
								},
							]}
						>
							<Deck {...item} navigation={navigation} />
						</Swipeout>
					)}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
				/>
			) : (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text
						style={{
							fontSize: 22,
						}}
					>
						Add a deck to get started
					</Text>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch',
		backgroundColor: 'white',
	},
	row: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20,
		flex: 1,
		backgroundColor: 'white',
	},
	separator: {
		backgroundColor: gray,
		height: StyleSheet.hairlineWidth,
	},
	deckTitle: {
		fontSize: 24,
	},
	deckCards: {
		fontSize: 14,
	},
	swipeable: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: lightGray,
	},
})

function mapStateToProps(decks, stuff) {
	return { decks: Object.keys(decks).map(key => decks[key]) }
}

function mapDispatchToProps(dispatch) {
	return {
		removeDeck: title => dispatch(removeDeck(title)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
