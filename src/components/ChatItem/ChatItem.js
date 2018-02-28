import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

class ChatItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { thread, onViewThread } = this.props;
		return (
			<View style={styles.container}>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={onViewThread.bind(this, thread.conversation_id)}
				>
					<Text>{thread.artefact_name}</Text>
					<Text>{thread.last_message_date}</Text>
					<Text>{thread.last_message_subtitle}</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default ChatItem;
