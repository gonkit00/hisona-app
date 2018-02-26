import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';

import AutogrowInput from 'react-native-autogrow-input';
import styles from './styles';

class ChatInput extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.text === '') {
			this.autogrowInput.resetInputText();
		}
	}

	render() {
		return (
			<View style={styles.inputBar}>
				<AutogrowInput
					style={styles.textBox}
					ref={ref => {
						this.autogrowInput = ref;
					}}
					multiline
					defaultHeight={32}
					onChangeText={text => this.props.onChangeText(text)}
					onContentSizeChange={this.props.onSizeChange}
					value={this.props.text}
          placeholder={"Ask a question..."}
				/>
				<TouchableHighlight
					style={styles.sendButton}
					onPress={() => this.props.onSendPressed()}
				>
					<Text style={{ color: 'white' }}>Send</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

export default ChatInput;
