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

class ChatView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			inputBarText: ''
		};
	}

	static navigationOptions = {
		title: 'Chat'
	};

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
		fetch(`http:localhost:8081/api/v1/user/conversations/thread`)
			.then(response => response.json())
			.then(result => {
				this.setState({
					messages: result || [],
					isLoading: false
				});
			})
			.catch(err => console.error(err));
	}

	getReply(text) {
		const opts = {
			artefact_id: '2_es_pub_christophercolumbus',
			msgStr: text
		};

		fetch(`http:localhost:8081/api/v1/classification/construe/incoming`, {
			method: 'POST',
			body: JSON.stringify(opts)
		})
			.then(response => response.json())
			.then(result => {
				console.log(result);

				const newReplyMessage = {
					direction: 'left',
					text: result.reply[0].body
				};

				this.setState({
					messages: [...this.state.messages, newReplyMessage]
				});
			})
			.catch(err => console.error(err));
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
		const text = this.state.inputBarText.toLowerCase();
		const newMessage = {
			direction: 'right',
			text
		};

		console.log(this.state.messages);

		const reply = this.getReply(text);

		this.setState({
			messages: [...this.state.messages, newMessage],
			inputBarText: ''
		});
	}

	_onChangeInputBarText(text) {
		this.setState({
			inputBarText: text
		});
	}

	// This event fires way too often.
	// We need to move the last message up if the input bar expands due to the user's new message exceeding the height of the box.
	// We really only need to do anything when the height of the InputBar changes, but AutogrowInput can't tell us that.
	// The real solution here is probably a fork of AutogrowInput that can provide this information.
	_onInputSizeChange() {
		setTimeout(() => {
			this.scrollView.scrollToEnd({ animated: false });
		});
	}

	render() {
		const messages = [];

		this.state.messages.forEach((message, index) => {
			messages.push(
				<MessageBubble
					key={index}
					direction={message.direction}
					text={message.text}
				/>
			);
		});

		return (
			<View style={styles.outer}>
				<ScreenHeader />
				<ScrollView
					ref={ref => {
						this.scrollView = ref;
					}}
					style={styles.messages}
				>
					{messages}
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
	// const [eventsById, eventsByIdArray] = eventSelectors.getEvents(state);
	const isFetching = chatSelectors.isFetching(state);

	return {
		isFetching
	};
};

export default connect(mapStateToProps)(ChatView);
