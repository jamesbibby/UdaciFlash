import React from 'react'
import {
	TextInput,
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
} from 'react-native'

const AddCard = props => {
	return (
		<View style={styles.container}>
			<Text>Enter a new Question and Answer</Text>
			<KeyboardAvoidingView behavior="padding">
				<TextInput placeholder="Question" />
				<TextInput placeholder="Answer" />
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

export default AddCard
