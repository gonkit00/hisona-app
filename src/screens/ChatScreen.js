import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	TextInput,
	TouchableHighlight,
	Keyboard
} from 'react-native';

import { connect } from 'react-redux';
import * as chatActions from '~/store/Chats/actions';
import * as chatSelectors from '~/store/Chats/reducer';

import { Actions } from 'react-native-router-flux';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import AutogrowInput from 'react-native-autogrow-input';

import { MessageItem } from '~/components/MessageItem';
import { TypingIndicator } from '~/components/MessageItem';
import { ChatInput } from '~/components/ChatInput';
import { ProgressBar } from '~/components/ProgressBar';

class ChatScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputBarText: ''
		};
	}

	// get the end of the ScrollView to "follow" the top of the InputBar as the keyboard rises and falls
	componentWillMount() {
		// todo: render in ChatsList
		// Actions.refresh({ title: this.props.artefact.artefact_name });

		this.keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			this.keyboardDidShow.bind(this)
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			this.keyboardDidHide.bind(this)
		);
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	// When the keyboard appears, this gets the ScrollView to move the end back "up" so the last message is visible with the keyboard up
	// Without this, whatever message is the keyboard's height from the bottom will look like the last message.
	keyboardDidShow(e) {
		this.scrollView.scrollToEnd();
	}

	// When the keyboard dissapears, this gets the ScrollView to move the last message back down.
	keyboardDidHide(e) {
		this.scrollView.scrollToEnd();
	}

	// scroll to bottom when first showing the view
	componentDidMount() {
		setTimeout(() => {
			this.scrollView.scrollToEnd();
		});
	}

	componentDidUpdate() {
		setTimeout(() => {
			this.scrollView.scrollToEnd();
		});
	}

	_onChangeInputBarText(text) {
		this.setState({
			inputBarText: text
		});
	}

	// TODO: Throttle decorator
	_onInputSizeChange() {
		setTimeout(() => {
			this.scrollView.scrollToEnd({ animated: false });
		});
	}

	_sendMessage() {
		const text = this.state.inputBarText.trim();
		const newMessage = { content_type: 'text', direction: 'right', text };

		this.props.addMessage(newMessage);
		this._getReply(text);
		this.setState({ inputBarText: '' });
	}

	_getReply(text) {
		const artefactId = this.props.currentArtefact[0].artefact_id;
		this.props.addReply(artefactId, text);
	}

	_renderMessage = (m, i) => (
		<MessageItem key={i} direction={m.direction} text={m.text} />
	);

	_renderTypingIndicator = i => <TypingIndicator key={i} />;

	_renderProgressBar = () => <ProgressBar />;

	render() {
		const { isLoading, currentThread } = this.props;
		return (
			<View style={styles.container}>
				<ScrollView
					ref={ref => {
						this.scrollView = ref;
					}}
					style={styles.messages}
				>
					{isLoading
						? this._renderProgressBar()
						: currentThread.map((m, i) => {
								if (m.content_type === 'typing_indicator') {
									return this._renderTypingIndicator(i);
								} else if (m.content_type === 'text') {
									return this._renderMessage(m, i);
								}
							})}
				</ScrollView>
				<ChatInput
					onSendPressed={() => this._sendMessage()}
					onSizeChange={() => this._onInputSizeChange()}
					onChangeText={text => this._onChangeInputBarText(text)}
					text={this.state.inputBarText}
				/>
				<KeyboardSpacer />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: '#F7F8FA'
	},

	messages: {
		flex: 1
	}
});

const mapStateToProps = state => {
	const currentArtefact = chatSelectors.getCurrentArtefact(state);
	const currentThread = chatSelectors.getCurrentThread(state);
	const isLoading = chatSelectors.isLoading(state);

	return {
		isLoading,
		currentArtefact,
		currentThread
	};
};

const mapDispatchToProps = dispatch => ({
	addMessage: newMessage => dispatch(chatActions.addMessage(newMessage)),
	addReply: (artefactId, text) =>
		dispatch(chatActions.addReply(artefactId, text))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
