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

import KeyboardSpacer from 'react-native-keyboard-spacer';
import AutogrowInput from 'react-native-autogrow-input';

import { ScreenHeader } from '~/components/ScreenHeader';
import { MessageBubble } from '~/components/MessageBubble';
import { ChatInput } from '~/components/ChatInput';
import { Loader } from '~/components/Loader';

class ChatScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputBarText: ''
		};
	}

	// get the end of the ScrollView to "follow" the top of the InputBar as the keyboard rises and falls
	componentWillMount() {
		this.getMessages();

		this.keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			this.keyboardDidShow.bind(this)
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			this.keyboardDidHide.bind(this)
		);
	}

	getMessages() {
		this.props.getThread();
	}

	_getReply(text) {
		this.props.addReply(text);
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

	// this is a bit sloppy: this is to make sure it scrolls to the bottom when a message is added, but
	// the component could update for other reasons, for which we wouldn't want it to scroll to the bottom.
	componentDidUpdate() {
		setTimeout(() => {
			this.scrollView.scrollToEnd();
		});
	}

	_sendMessage() {
		const text = this.state.inputBarText.toLowerCase().trim();
		const newMessage = { direction: 'right', text };

		this.props.addMessage(newMessage);

		// TODO: Add typing indicator
		setTimeout(() => {
			this._getReply(text);
		}, 1000);

		Keyboard.dismiss();
		this.setState({ inputBarText: '' });
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

	_renderLoading = () => <Loader />;

	render() {
		return (
			<View style={styles.outer}>
				<ScreenHeader />
				<ScrollView
					ref={ref => {
						this.scrollView = ref;
					}}
					style={styles.messages}
				>
					{this.props.isLoading
						? this._renderLoading()
						: this.props.currentThread.map((message, index) => (
								<MessageBubble
									key={index}
									direction={message.direction}
									text={message.text}
								/>
							))}
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
	outer: {
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
	const currentThread = chatSelectors.getCurrentThread(state);
	const isLoading = chatSelectors.isLoading(state);

	return {
		isLoading,
		currentThread
	};
};

function mapDispatchToProps(dispatch) {
	return {
		getThread: () => dispatch(chatActions.getThread()),
		addMessage: newMessage => dispatch(chatActions.addMessage(newMessage)),
		addReply: text => dispatch(chatActions.addReply(text))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
