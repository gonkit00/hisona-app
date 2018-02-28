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
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={onViewThread.bind(this, thread.conversation_id)}
			>
				<View style={styles.container}>
					<Image
						style={styles.artefactAvatar}
						source={require('../../../assets/ramon.png')}
					/>
					<View style={styles.containerDetails}>
						<Text style={styles.artefactName}>{thread.artefact_name}</Text>
						<Text style={styles.lastMessage}>
							{thread.last_message_subtitle}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

export default ChatItem;
