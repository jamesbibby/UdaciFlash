import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	FlatList,
} from 'react-native'
import { purple, gray } from '../utils/colors'

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
						<Text style={styles.deckCards}>{questions.length} cards</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

const DeckList = props => {
	return (
		<View style={styles.container}>
			<FlatList
				data={props.decks}
				keyExtractor={(item, index) => item.title}
				renderItem={({ item }) => (
					<Deck {...item} navigation={props.navigation} />
				)}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		paddingLeft: 20,
		paddingRight: 20,
		alignItems: 'stretch',
	},
	row: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 20,
		paddingBottom: 20,
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
})

function mapStateToProps(decks, stuff) {
	return { decks: Object.keys(decks).map(key => decks[key]) }
}

export default connect(mapStateToProps)(DeckList)
