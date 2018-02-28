import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DotIndicator } from 'react-native-indicators';

const TypingIndicator = () => (
	<View style={styles.messageBubble}>
		<DotIndicator
			animationDuration={1000}
			color={'#898989'}
			count={3}
			size={6}
		/>
	</View>
);

const styles = StyleSheet.create({
	messageBubble: {
    width: 60,
		backgroundColor: '#E7E7E7',
		borderRadius: 16,
		marginTop: 16,
		marginRight: 8,
		marginLeft: 8,
		paddingHorizontal: 12,
		paddingVertical: 16,
	}
});

export default TypingIndicator;
