import React from 'react'
import {
	TextInput,
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
} from 'react-native'

const AddDeck = props => {
	return (
		<View style={styles.container}>
			<Text>What would you like to call your new Deck?</Text>
			<KeyboardAvoidingView behavior="padding">
				<TextInput placeholder="Pretty cool" />
				<TextInput placeholder="Wow cool" />
			</KeyboardAvoidingView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 60,
	},
})

export default AddDeck
