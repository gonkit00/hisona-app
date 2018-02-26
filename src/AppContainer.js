import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import ChatsListScreen from '~/screens/ChatsListScreen';
import ChatView from '~/screens/ChatView';

class AppContainer extends Component {
	render() {
		return <ChatView />;
	}
}

export default AppContainer;
