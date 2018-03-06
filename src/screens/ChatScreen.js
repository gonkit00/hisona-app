import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';

import { connect } from 'react-redux';
import * as chatActions from '~/store/Chats/actions';
import * as chatSelectors from '~/store/Chats/reducer';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import { MessageItem } from '~/components/MessageItem';
import TypingIndicator from '~/components/MessageItem/TypingIndicator';
import { ChatInput } from '~/components/ChatInput';
import { ProgressBar } from '~/components/ProgressBar';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputBarText: '',
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide.bind(this),
    );
  }

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

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onChangeInputBarText(text) {
    this.setState({
      inputBarText: text,
    });
  }

  // TODO: Throttle decorator
  onInputSizeChange() {
    setTimeout(() => {
      this.scrollView.scrollToEnd({ animated: false });
    });
  }

  getReply(text) {
    const artefactId = this.props.currentArtefact[0].artefact_id;
    this.props.addReply(artefactId, text);
  }

  keyboardDidShow() {
    this.scrollView.scrollToEnd();
  }

  keyboardDidHide() {
    this.scrollView.scrollToEnd();
  }

  sendMessage() {
    const text = this.state.inputBarText.trim();
    const newMessage = { content_type: 'text', direction: 'right', text };

    this.props.addMessage(newMessage);
    this.getReply(text);
    this.setState({ inputBarText: '' });
  }

  renderMessages = () =>
    this.props.currentThread.map((m, i) => {
      if (m.content_type === 'typing_indicator') {
        return this.renderTypingIndicator(i);
      } else if (m.content_type === 'text') {
        return this.renderMessage(m, i);
      }
    });

  renderMessage = (m, i) => <MessageItem key={i} direction={m.direction} text={m.text} />;

  renderTypingIndicator = i => <TypingIndicator key={i} />;

  renderProgressBar = () => <ProgressBar />;

  render() {
    const { isLoading, currentThread } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          ref={(ref) => {
            this.scrollView = ref;
          }}
          style={styles.messages}
        >
          {isLoading ? this.renderProgressBar() : this.renderMessages()}
        </ScrollView>
        <ChatInput
          onSendPressed={() => this.sendMessage()}
          onSizeChange={() => this.onInputSizeChange()}
          onChangeText={text => this.onChangeInputBarText(text)}
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
    backgroundColor: '#F7F8FA',
  },
  messages: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  const currentArtefact = chatSelectors.getCurrentArtefact(state);
  const currentThread = chatSelectors.getCurrentThread(state);
  const isLoading = chatSelectors.isLoading(state);

  return {
    isLoading,
    currentArtefact,
    currentThread,
  };
};

const mapDispatchToProps = dispatch => ({
  addMessage: newMessage => dispatch(chatActions.addMessage(newMessage)),
  addReply: (artefactId, text) => dispatch(chatActions.addReply(artefactId, text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
