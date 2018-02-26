import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

class MessageBubble extends Component {
	render() {
		// These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
		const leftSpacer =
			this.props.direction === 'left' ? null : <View style={{ width: 70 }} />;
		const rightSpacer =
			this.props.direction === 'left' ? <View style={{ width: 70 }} /> : null;

		const bubbleStyles =
			this.props.direction === 'left'
				? [styles.messageBubble, styles.messageBubbleLeft]
				: [styles.messageBubble, styles.messageBubbleRight];

		const bubbleTextStyle =
			this.props.direction === 'left'
				? styles.messageBubbleTextLeft
				: styles.messageBubbleTextRight;

		return (
			<View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
				{leftSpacer}
				<View style={bubbleStyles}>
					<Text style={bubbleTextStyle}>{this.props.text}</Text>
				</View>
				{rightSpacer}
			</View>
		);
	}
}

export default MessageBubble;

